-- Program editing from the mobile app:
-- * program_exercise_alternatives.position keeps the alternatives order (the Mongo model stored an ordered array)
-- * save_program RPC replaces a program's exercises and alternatives in one transaction
-- * setup_user seeds alternatives with their position

alter table public.program_exercise_alternatives add column position integer;

-- Backfill with the insertion order of the Mongo copy (closest to the original array order)
update public.program_exercise_alternatives a
set position = r.position
from (
  select ctid as row_id, row_number() over (partition by program_exercise_id order by ctid) as position
  from public.program_exercise_alternatives
) r
where a.ctid = r.row_id;

alter table public.program_exercise_alternatives alter column position set not null;

-- Alternatives are replaced as a whole by save_program: allow updates of the position from the client too
create policy program_exercise_alternatives_update_own on public.program_exercise_alternatives for update to authenticated
  using (private.owns_program_exercise(program_exercise_id))
  with check (private.owns_program_exercise(program_exercise_id) and private.owns_exercise_type(exercise_type_id));

-- p_exercises: [{"exercise_type_id": "<uuid>", "alternative_ids": ["<uuid>", ...]}, ...] in program order
create function public.save_program(p_session_type public.session_type, p_exercises jsonb)
returns uuid
language plpgsql
security invoker
set search_path = ''
as $$
declare
  v_uid uuid := auth.uid();
  v_program_id uuid;
  v_program_exercise_id uuid;
  r record;
begin
  if v_uid is null then
    raise exception 'Not authenticated' using errcode = '28000';
  end if;
  if p_exercises is null or jsonb_typeof(p_exercises) <> 'array' then
    raise exception 'Exercises must be an array' using errcode = '22023';
  end if;

  insert into public.programs (owner_id, session_type)
  values (v_uid, p_session_type)
  on conflict (owner_id, session_type) do update set updated_at = timezone('utc', now())
  returning id into v_program_id;

  -- Cascades to the alternatives
  delete from public.program_exercises where program_id = v_program_id;

  for r in
    select x.e, x.ord
    from jsonb_array_elements(p_exercises) with ordinality as x(e, ord)
  loop
    insert into public.program_exercises (program_id, exercise_type_id, "order")
    values (v_program_id, (r.e ->> 'exercise_type_id')::uuid, r.ord)
    returning id into v_program_exercise_id;

    insert into public.program_exercise_alternatives (program_exercise_id, exercise_type_id, position)
    select v_program_exercise_id, a.value::uuid, a.ord
    from jsonb_array_elements_text(coalesce(r.e -> 'alternative_ids', '[]'::jsonb)) with ordinality as a(value, ord)
    on conflict do nothing;
  end loop;

  return v_program_id;
end;
$$;

revoke execute on function public.save_program(public.session_type, jsonb) from public, anon;
grant execute on function public.save_program(public.session_type, jsonb) to authenticated;

-- setup_user: same as before, alternatives now carry their position
create or replace function private.setup_user(p_uid uuid)
returns void
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_meta jsonb;
  v_email text;
  v_first text;
  v_last text;
  v_full text;
  v_program_id uuid;
  r record;
begin
  select u.email, coalesce(u.raw_user_meta_data, '{}'::jsonb)
  into v_email, v_meta
  from auth.users u where u.id = p_uid;
  if not found then
    return;
  end if;

  v_full := nullif(trim(coalesce(v_meta ->> 'full_name', v_meta ->> 'name', '')), '');
  if v_full is not null then
    v_first := split_part(v_full, ' ', 1);
    v_last := nullif(trim(substr(v_full, length(v_first) + 1)), '');
  else
    v_first := nullif(trim(v_meta ->> 'firstName'), '');
    v_last := nullif(trim(v_meta ->> 'lastName'), '');
  end if;

  begin
    insert into public.profiles (id, email, first_name, last_name)
    values (p_uid, lower(v_email), v_first, v_last)
    on conflict (id) do nothing;
  exception when unique_violation then
    -- email already used by another profile: create the profile without email
    insert into public.profiles (id, email, first_name, last_name)
    values (p_uid, null, v_first, v_last)
    on conflict (id) do nothing;
  end;

  -- Default data only for a user who has no exercise type yet
  if exists (select 1 from public.exercise_types where owner_id = p_uid) then
    return;
  end if;

  -- Trophies are initialized by the init_trophies_after_insert trigger on exercise_types
  insert into public.exercise_types (owner_id, name, advice, timer_seconds, rep_range_1, rep_range_2,
                                     rep_range_3, rep_range_4, session_types, trophy_locked, definition_key)
  select p_uid, d.name, d.advice, d.timer_seconds, d.rep_range_1, d.rep_range_2,
         d.rep_range_3, d.rep_range_4, d.session_types, d.trophy_locked, d.key
  from public.default_exercise_types d
  order by d.sort_order;

  for r in select distinct session_type from public.default_program_exercises loop
    insert into public.programs (owner_id, session_type)
    values (p_uid, r.session_type)
    on conflict (owner_id, session_type) do nothing
    returning id into v_program_id;
    continue when v_program_id is null;

    with pe as (
      insert into public.program_exercises (program_id, exercise_type_id, "order")
      select v_program_id, et.id, row_number() over (order by dpe.position)
      from public.default_program_exercises dpe
      join public.exercise_types et on et.owner_id = p_uid and et.definition_key = dpe.exercise_key
      where dpe.session_type = r.session_type
      returning id, exercise_type_id
    )
    insert into public.program_exercise_alternatives (program_exercise_id, exercise_type_id, position)
    select pe.id, alt.id, k.position
    from pe
    join public.exercise_types main on main.id = pe.exercise_type_id
    join public.default_program_exercises dpe
      on dpe.session_type = r.session_type and dpe.exercise_key = main.definition_key
    cross join lateral unnest(dpe.alternative_keys) with ordinality as k(key, position)
    join public.exercise_types alt on alt.owner_id = p_uid and alt.definition_key = k.key
    on conflict do nothing;
  end loop;
end;
$$;

revoke execute on function private.setup_user(uuid) from public, anon, authenticated;
