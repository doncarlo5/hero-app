-- Cleanup after the phase 0 review:
-- * trophy_type becomes an enum (fixed set of tiers), like session_type
-- * best_reps / best_weight dropped: always equal to reps_user / weight_user, read by no client
-- * best set ordered by weight then reps (instead of weight * 1000 + reps)
-- * one trigger function per table (TG_OP), consistent trigger/function names
-- * save_exercise validates each set and returns a readable error
-- * program_exercises."order" renumbered 1..n (the old API kept gaps when a default exercise was skipped)
-- * policy names aligned on <table>_<command>_<scope>

-- Trophy tiers -----------------------------------------------------------------
create type public.trophy_type as enum ('silver', 'gold', 'platinum', 'diamond', 'master', 'grand master', 'challenger');

alter table public.trophies alter column trophy_type type public.trophy_type using trophy_type::public.trophy_type;
alter table public.trophy_definitions alter column trophy_type type public.trophy_type using trophy_type::public.trophy_type;

-- Evaluation without best_* -----------------------------------------------------
create or replace function private.evaluate_trophies(p_owner uuid, p_type uuid)
returns void
language plpgsql
security definer
set search_path = ''
as $$
begin
  -- Type or profile being deleted (cascade): nothing to evaluate
  if not exists (select 1 from public.exercise_types where id = p_type and owner_id = p_owner) then
    return;
  end if;

  perform private.init_trophies(p_owner, p_type);

  with best as (
    select t.id as trophy_id, b.exercise_user_id, b.weight, b.reps, b.body_weight
    from public.trophies t
    left join lateral (
      select eu.id as exercise_user_id, es.weight, es.reps, s.body_weight
      from public.exercise_users eu
      join public.sessions s on s.id = eu.session_id
      join public.exercise_sets es on es.exercise_user_id = eu.id
      where eu.owner_id = p_owner
        and eu.type_id = p_type
        and s.body_weight > 0
        and es.weight >= s.body_weight * t.weight_multiplier
        and es.reps >= t.reps_goal
      order by es.weight desc, es.reps desc, eu.created_at, es.set_order
      limit 1
    ) b on true
    where t.owner_id = p_owner and t.exercise_type_id = p_type
  )
  update public.trophies t set
    achieved         = b.exercise_user_id is not null,
    awarded_at       = case
                         when b.exercise_user_id is null then null
                         when t.achieved then t.awarded_at
                         else timezone('utc', now())
                       end,
    exercise_user_id = b.exercise_user_id,
    reps_user        = coalesce(b.reps, 0),
    weight_user      = coalesce(b.weight, 0),
    body_weight      = b.body_weight
  from best b
  where b.trophy_id = t.id
    and (t.achieved is distinct from (b.exercise_user_id is not null)
      or t.exercise_user_id is distinct from b.exercise_user_id
      or t.reps_user is distinct from coalesce(b.reps, 0)
      or t.weight_user is distinct from coalesce(b.weight, 0)
      or t.body_weight is distinct from b.body_weight);
end;
$$;

alter table public.trophies drop column best_reps, drop column best_weight;

-- Shared helper: evaluate every (owner, type) pair touched by a set of exercise_users
create function private.evaluate_trophies_for_exercise_users(p_exercise_user_ids uuid[])
returns void
language plpgsql
security definer
set search_path = ''
as $$
declare r record;
begin
  for r in
    select distinct eu.owner_id, eu.type_id
    from public.exercise_users eu
    where eu.id = any (p_exercise_user_ids)
  loop
    perform private.evaluate_trophies(r.owner_id, r.type_id);
  end loop;
end;
$$;

-- exercise_sets: one function for insert / update / delete --------------------
drop trigger evaluate_trophies_on_insert on public.exercise_sets;
drop trigger evaluate_trophies_on_update on public.exercise_sets;
drop trigger evaluate_trophies_on_delete on public.exercise_sets;
drop function private.on_exercise_sets_insert();
drop function private.on_exercise_sets_delete();

create function private.on_exercise_sets_change()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
declare v_ids uuid[];
begin
  -- Each trigger declares only the transition table its event provides
  if tg_op = 'DELETE' then
    select array_agg(distinct exercise_user_id) into v_ids from old_rows;
  else
    select array_agg(distinct exercise_user_id) into v_ids from new_rows;
  end if;
  perform private.evaluate_trophies_for_exercise_users(v_ids);
  return null;
end;
$$;

-- PG15: a trigger with transition tables handles a single event
create trigger evaluate_trophies_after_insert after insert on public.exercise_sets
  referencing new table as new_rows
  for each statement execute function private.on_exercise_sets_change();
create trigger evaluate_trophies_after_update after update on public.exercise_sets
  referencing new table as new_rows
  for each statement execute function private.on_exercise_sets_change();
create trigger evaluate_trophies_after_delete after delete on public.exercise_sets
  referencing old table as old_rows
  for each statement execute function private.on_exercise_sets_change();

-- exercise_users: one function for update / delete -----------------------------
drop trigger evaluate_trophies_on_update on public.exercise_users;
drop trigger evaluate_trophies_on_delete on public.exercise_users;
drop function private.on_exercise_users_update();
drop function private.on_exercise_users_delete();

create function private.on_exercise_users_change()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
declare r record;
begin
  -- Rows are read from the transition tables: deleted exercise_users no longer exist in the table
  if tg_op = 'DELETE' then
    for r in select distinct owner_id, type_id from old_rows loop
      perform private.evaluate_trophies(r.owner_id, r.type_id);
    end loop;
  else
    for r in
      select owner_id, type_id from old_rows
      union
      select owner_id, type_id from new_rows
    loop
      perform private.evaluate_trophies(r.owner_id, r.type_id);
    end loop;
  end if;
  return null;
end;
$$;

create trigger evaluate_trophies_after_update after update on public.exercise_users
  referencing old table as old_rows new table as new_rows
  for each statement execute function private.on_exercise_users_change();
create trigger evaluate_trophies_after_delete after delete on public.exercise_users
  referencing old table as old_rows
  for each statement execute function private.on_exercise_users_change();

-- sessions / exercise_types: names aligned with the rest ----------------------
alter trigger evaluate_trophies_on_update on public.sessions rename to evaluate_trophies_after_update;
alter function private.on_sessions_update() rename to on_sessions_change;
alter trigger init_trophies on public.exercise_types rename to init_trophies_after_insert;
alter function private.on_exercise_type_insert() rename to on_exercise_types_insert;

revoke execute on all functions in schema private from public, anon, authenticated;
grant execute on function private.owns_session(uuid), private.owns_exercise_type(uuid),
  private.owns_exercise_user(uuid), private.owns_program(uuid), private.owns_program_exercise(uuid)
  to authenticated;

-- save_exercise: readable validation of each set ------------------------------
create or replace function public.save_exercise(
  p_type_id uuid,
  p_sets jsonb,
  p_session_id uuid default null,
  p_comment text default null,
  p_id uuid default null
)
returns jsonb
language plpgsql
security invoker
set search_path = ''
as $$
declare
  v_uid uuid := auth.uid();
  v_id uuid;
  v_before uuid[];
  v_new jsonb;
begin
  if v_uid is null then
    raise exception 'Not authenticated' using errcode = '28000';
  end if;
  if p_comment is not null and length(p_comment) > 200 then
    raise exception 'Comment should be less than 200 characters' using errcode = '22001';
  end if;
  if p_sets is null or jsonb_typeof(p_sets) <> 'array' or jsonb_array_length(p_sets) = 0 then
    raise exception 'At least one set is required' using errcode = '22023';
  end if;
  if exists (
    select 1 from jsonb_array_elements(p_sets) e
    where case
            -- casts only once the JSON types are known (SQL does not short-circuit OR)
            when jsonb_typeof(e) = 'object'
             and jsonb_typeof(e -> 'weight') = 'number'
             and jsonb_typeof(e -> 'reps') = 'number'
            then (e ->> 'weight')::numeric < 0
              or (e ->> 'reps')::numeric < 0
              or (e ->> 'reps')::numeric <> trunc((e ->> 'reps')::numeric)
            else true
          end
  ) then
    raise exception 'Each set needs a numeric "weight" >= 0 and an integer "reps" >= 0' using errcode = '22023';
  end if;

  select coalesce(array_agg(id), '{}') into v_before
  from public.trophies where owner_id = v_uid and achieved;

  if p_id is null then
    insert into public.exercise_users (owner_id, type_id, session_id, comment)
    values (v_uid, p_type_id, p_session_id, p_comment)
    returning id into v_id;
  else
    update public.exercise_users
    set type_id = p_type_id,
        session_id = coalesce(p_session_id, session_id),
        comment = p_comment
    where id = p_id and owner_id = v_uid
    returning id into v_id;
    if v_id is null then
      raise exception 'Exercise not found' using errcode = 'P0002';
    end if;
    delete from public.exercise_sets where exercise_user_id = v_id;
  end if;

  insert into public.exercise_sets (exercise_user_id, set_order, weight, reps)
  select v_id, x.ord::int, (x.e ->> 'weight')::numeric, (x.e ->> 'reps')::int
  from jsonb_array_elements(p_sets) with ordinality as x(e, ord);

  select coalesce(jsonb_agg(to_jsonb(t) order by t.level), '[]'::jsonb) into v_new
  from public.trophies t
  where t.owner_id = v_uid and t.achieved and not (t.id = any (v_before));

  return jsonb_build_object('id', v_id, 'new_trophies', v_new);
end;
$$;

-- Program order: contiguous 1..n, relative order preserved ---------------------
update public.program_exercises pe
set "order" = r.position
from (
  select id, row_number() over (partition by program_id order by "order", created_at, id) as position
  from public.program_exercises
) r
where r.id = pe.id and pe."order" <> r.position;

-- Policy names -------------------------------------------------------------------
alter policy program_alternatives_select_own on public.program_exercise_alternatives
  rename to program_exercise_alternatives_select_own;
alter policy program_alternatives_insert_own on public.program_exercise_alternatives
  rename to program_exercise_alternatives_insert_own;
alter policy program_alternatives_delete_own on public.program_exercise_alternatives
  rename to program_exercise_alternatives_delete_own;
alter policy default_exercise_types_read on public.default_exercise_types
  rename to default_exercise_types_select_all;
alter policy default_program_exercises_read on public.default_program_exercises
  rename to default_program_exercises_select_all;
alter policy trophy_definitions_read on public.trophy_definitions
  rename to trophy_definitions_select_all;
