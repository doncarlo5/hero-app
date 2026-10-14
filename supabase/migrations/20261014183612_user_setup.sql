-- Creates a user's profile and default data (port of apps/api/api/createUser.js)
-- Runs on sign-up (auth.users); ensure_profile() lets the client recover from a failure.

-- Some accounts (Apple, phone) have no email: it stays unique but becomes optional
alter table public.profiles alter column email drop not null;

create function private.setup_user(p_uid uuid)
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

  -- Trophies are initialized by the init_trophies trigger on exercise_types
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
      select v_program_id, et.id, dpe.position
      from public.default_program_exercises dpe
      join public.exercise_types et on et.owner_id = p_uid and et.definition_key = dpe.exercise_key
      where dpe.session_type = r.session_type
      returning id, "order"
    )
    insert into public.program_exercise_alternatives (program_exercise_id, exercise_type_id)
    select pe.id, alt.id
    from pe
    join public.default_program_exercises dpe
      on dpe.session_type = r.session_type and dpe.position = pe."order"
    cross join lateral unnest(dpe.alternative_keys) as k(key)
    join public.exercise_types alt on alt.owner_id = p_uid and alt.definition_key = k.key
    on conflict do nothing;
  end loop;
end;
$$;

-- Sign-up trigger: must never block account creation
create function private.on_auth_user_created()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  begin
    perform private.setup_user(new.id);
  exception when others then
    raise warning 'setup_user(%) failed: %', new.id, sqlerrm;
  end;
  return new;
end;
$$;

create trigger on_auth_user_created after insert on auth.users
  for each row execute function private.on_auth_user_created();

-- Recovery RPC, called by the client after sign-in; returns the profile
create function public.ensure_profile()
returns public.profiles
language plpgsql
security definer
set search_path = ''
as $$
declare v_profile public.profiles;
begin
  if auth.uid() is null then
    raise exception 'Not authenticated' using errcode = '28000';
  end if;
  perform private.setup_user(auth.uid());
  select * into v_profile from public.profiles where id = auth.uid();
  return v_profile;
end;
$$;

revoke execute on function public.ensure_profile() from public, anon;
grant execute on function public.ensure_profile() to authenticated;

-- Backfill: auth users without a profile (signed up after the Mongo copy, or never went through the API)
select private.setup_user(u.id)
from auth.users u
where not exists (select 1 from public.profiles p where p.id = u.id);
