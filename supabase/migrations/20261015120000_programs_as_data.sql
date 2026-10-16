-- Programs as data (docs/adr/0001-programs-as-data.md)
--
-- * The tables of the Mongo-era model move to the `legacy` schema, unchanged. They are not exposed to
--   clients; scripts/sync-mongo-delta.js keeps writing there until the Supabase build ships.
-- * New model: movements, programs → program_days → slots → set_prescriptions / slot_alternatives,
--   sessions → logged_exercises → logged_sets. Trophies are keyed by movement.
-- * private.migrate_legacy() converts legacy rows into the new model, idempotently (legacy wins for
--   legacy-derived rows). It runs at the end of this migration and after each sync.
-- * Defaults no longer carry a coach's program or wording: new users get the movement list and an
--   empty program.

-- Legacy schema -------------------------------------------------------------------------------------
create schema legacy;
revoke all on schema legacy from public, anon, authenticated;

-- Trophies point to exercise types / exercise users: detach before the move, re-keyed below
alter table public.trophies drop constraint trophies_exercise_type_id_fkey;
alter table public.trophies drop constraint trophies_exercise_user_id_fkey;

do $$
declare t text;
begin
  foreach t in array array['exercise_types', 'sessions', 'exercise_users', 'exercise_sets', 'programs',
                           'program_exercises', 'program_exercise_alternatives'] loop
    execute format('alter table public.%I set schema legacy', t);
  end loop;
end $$;

-- Legacy tables are a staging copy: no client access, no trophy evaluation (updated_at stays maintained)
do $$
declare r record;
begin
  for r in select policyname, tablename from pg_policies where schemaname = 'legacy' loop
    execute format('drop policy %I on legacy.%I', r.policyname, r.tablename);
  end loop;
  for r in
    select tgname, c.relname from pg_trigger g join pg_class c on c.oid = g.tgrelid
    join pg_namespace n on n.oid = c.relnamespace
    where n.nspname = 'legacy' and not g.tgisinternal and g.tgname <> 'set_updated_at'
  loop
    execute format('drop trigger %I on legacy.%I', r.tgname, r.relname);
  end loop;
end $$;
revoke all on all tables in schema legacy from public, anon, authenticated;

drop function private.on_exercise_sets_change();
drop function private.on_exercise_users_change();
drop function private.on_exercise_types_insert();
drop function private.on_sessions_change();
drop function private.evaluate_trophies_for_exercise_users(uuid[]);
drop function private.evaluate_trophies(uuid, uuid);
drop function private.init_trophies(uuid, uuid);
drop function private.set_definition_key();
drop function private.owns_exercise_type(uuid);
drop function private.owns_exercise_user(uuid);
drop function private.owns_program(uuid);
drop function private.owns_program_exercise(uuid);
drop function private.owns_session(uuid);
drop function public.save_exercise(uuid, jsonb, uuid, text, uuid);
drop function public.save_program(public.session_type, jsonb);

-- Legacy movement ids → movement ids (a legacy type can land on a movement created by setup_user)
create table legacy.movement_map (
  legacy_id uuid primary key,
  movement_id uuid not null
);

-- Defaults: no coach program, no coach wording ---------------------------------------------------
drop table public.default_program_exercises;
alter table public.default_exercise_types
  drop column advice, drop column timer_seconds, drop column rep_range_1, drop column rep_range_2,
  drop column rep_range_3, drop column rep_range_4, drop column session_types;

-- Enums ------------------------------------------------------------------------------------------
create type public.load_type as enum ('external', 'bodyweight_plus', 'assisted');
create type public.progression_rule as enum ('per_set', 'all_sets', 'manual');
create type public.load_rule as enum ('none', 'same', 'percent', 'step');
create type public.finisher_kind as enum ('drop_sets', 'cheat_reps', 'switch', 'mini_sets');
create type public.alternative_reason as enum ('preference', 'equipment', 'pain', 'stagnation', 'connection');
create type public.set_kind as enum ('warmup', 'working', 'drop', 'cheat', 'switch', 'mini');
create type public.body_side as enum ('left', 'right');

-- Movements --------------------------------------------------------------------------------------
-- owner_id null = shared library (read-only for clients)
create table public.movements (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid references public.profiles (id) on delete cascade,
  name text not null check (length(trim(name)) > 0),
  definition_key text references public.default_exercise_types (key) on delete set null,
  equipment text,
  load_type public.load_type not null default 'external',
  unilateral boolean not null default false,
  increment_kg numeric check (increment_kg > 0),
  notes text,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);
create index movements_owner_idx on public.movements (owner_id);
create index movements_definition_key_idx on public.movements (definition_key);

-- Programs ---------------------------------------------------------------------------------------
create table public.programs (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references public.profiles (id) on delete cascade,
  name text not null check (length(trim(name)) > 0),
  -- '3x' / '2x' for programs converted from the legacy session types, null otherwise
  legacy_key text,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now()),
  unique (owner_id, legacy_key)
);
create index programs_owner_idx on public.programs (owner_id);

alter table public.profiles
  add column active_program_id uuid references public.programs (id) on delete set null;

create table public.program_days (
  id uuid primary key default gen_random_uuid(),
  program_id uuid not null references public.programs (id) on delete cascade,
  name text not null check (length(trim(name)) > 0),
  position integer not null,
  legacy_session_type public.session_type,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);
create index program_days_program_idx on public.program_days (program_id);
create unique index program_days_legacy_idx on public.program_days (program_id, legacy_session_type)
  where legacy_session_type is not null;

create table public.slots (
  id uuid primary key default gen_random_uuid(),
  program_day_id uuid not null references public.program_days (id) on delete cascade,
  position integer not null,
  movement_id uuid not null references public.movements (id) on delete cascade,
  is_key_lift boolean not null default false,
  superset_group smallint,
  progression_rule public.progression_rule not null default 'all_sets',
  rest_seconds integer check (rest_seconds >= 0),
  rest_per_side boolean not null default false,
  tempo text,
  note text,
  finisher_kind public.finisher_kind,
  finisher_count smallint check (finisher_count > 0),
  -- kg removed per drop; null = back to the first set's load, then the same step
  finisher_load_step numeric,
  finisher_movement_id uuid references public.movements (id) on delete set null,
  finisher_rest_seconds integer check (finisher_rest_seconds >= 0),
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);
create index slots_day_idx on public.slots (program_day_id);
create index slots_movement_idx on public.slots (movement_id);
create index slots_finisher_movement_idx on public.slots (finisher_movement_id);

create table public.set_prescriptions (
  id uuid primary key default gen_random_uuid(),
  slot_id uuid not null references public.slots (id) on delete cascade,
  position integer not null,
  rep_min integer check (rep_min >= 0),
  rep_max integer check (rep_max >= rep_min),
  -- load relative to the previous set: none (first set), same, percent (+/-), step (+/- kg)
  load_rule public.load_rule not null default 'same',
  load_value numeric,
  -- overrides the slot's rest after this set
  rest_seconds integer check (rest_seconds >= 0),
  -- free text when the legacy rep range could not be parsed
  label text,
  unique (slot_id, position)
);

create table public.slot_alternatives (
  slot_id uuid not null references public.slots (id) on delete cascade,
  movement_id uuid not null references public.movements (id) on delete cascade,
  position integer not null,
  reason public.alternative_reason,
  primary key (slot_id, movement_id)
);
create index slot_alternatives_movement_idx on public.slot_alternatives (movement_id);

-- Sessions and logs ------------------------------------------------------------------------------
create table public.sessions (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references public.profiles (id) on delete cascade,
  program_day_id uuid references public.program_days (id) on delete set null,
  -- day name when the session was created: kept if the day is renamed or deleted
  label text,
  date_session timestamptz not null,
  body_weight numeric not null check (body_weight >= 0),
  is_done boolean not null default false,
  comment text,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);
create index sessions_owner_date_idx on public.sessions (owner_id, date_session desc);
create index sessions_day_idx on public.sessions (program_day_id);

create table public.logged_exercises (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references public.profiles (id) on delete cascade,
  session_id uuid references public.sessions (id) on delete cascade,
  movement_id uuid not null references public.movements (id) on delete cascade,
  slot_id uuid references public.slots (id) on delete set null,
  comment text check (length(comment) <= 200),
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);
create index logged_exercises_owner_movement_idx on public.logged_exercises (owner_id, movement_id, created_at desc);
create index logged_exercises_session_idx on public.logged_exercises (session_id);
create index logged_exercises_movement_idx on public.logged_exercises (movement_id);
create index logged_exercises_slot_idx on public.logged_exercises (slot_id);

create table public.logged_sets (
  id uuid primary key default gen_random_uuid(),
  logged_exercise_id uuid not null references public.logged_exercises (id) on delete cascade,
  set_order integer not null,
  kind public.set_kind not null default 'working',
  weight numeric not null check (weight >= 0),
  reps integer not null check (reps >= 0),
  side public.body_side,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now()),
  unique (logged_exercise_id, set_order)
);

-- Trophies: re-keyed by movement ---------------------------------------------------------------
alter table public.trophies rename column exercise_type_id to movement_id;
alter table public.trophies rename column exercise_user_id to logged_exercise_id;
alter table public.trophies rename constraint trophies_owner_id_exercise_type_id_level_key to trophies_owner_movement_level_key;
alter index public.trophies_exercise_type_idx rename to trophies_movement_idx;
alter index public.trophies_exercise_user_idx rename to trophies_logged_exercise_idx;

-- updated_at ------------------------------------------------------------------------------------
do $$
declare t text;
begin
  foreach t in array array['movements', 'programs', 'program_days', 'slots', 'sessions', 'logged_exercises',
                           'logged_sets'] loop
    execute format('create trigger set_updated_at before update on public.%I
                    for each row execute function private.set_updated_at()', t);
  end loop;
end $$;

-- Trophies -------------------------------------------------------------------------------------
create function private.init_trophies(p_owner uuid, p_movement uuid)
returns void language sql security definer set search_path = '' as $$
  insert into public.trophies (owner_id, movement_id, name, trophy_type, level, reps_goal,
                               weight_multiplier, description, reward_text)
  select m.owner_id, m.id, d.exercise_key, d.trophy_type, d.level, d.reps_goal,
         d.weight_multiplier, d.description, d.reward_text
  from public.movements m
  join public.trophy_definitions d on d.exercise_key = m.definition_key
  where m.id = p_movement and m.owner_id = p_owner
  on conflict (owner_id, movement_id, level) do nothing;
$$;

-- Best working set at or above each level's goal; an achieved trophy keeps its award date
create function private.evaluate_trophies(p_owner uuid, p_movement uuid)
returns void language plpgsql security definer set search_path = '' as $$
begin
  if not exists (select 1 from public.movements where id = p_movement and owner_id = p_owner) then
    return;
  end if;

  perform private.init_trophies(p_owner, p_movement);

  with best as (
    select t.id as trophy_id, b.logged_exercise_id, b.weight, b.reps, b.body_weight
    from public.trophies t
    left join lateral (
      select le.id as logged_exercise_id, ls.weight, ls.reps, s.body_weight
      from public.logged_exercises le
      join public.sessions s on s.id = le.session_id
      join public.logged_sets ls on ls.logged_exercise_id = le.id
      where le.owner_id = p_owner
        and le.movement_id = p_movement
        and ls.kind = 'working'
        and s.body_weight > 0
        and ls.weight >= s.body_weight * t.weight_multiplier
        and ls.reps >= t.reps_goal
      order by ls.weight desc, ls.reps desc, le.created_at, ls.set_order
      limit 1
    ) b on true
    where t.owner_id = p_owner and t.movement_id = p_movement
  )
  update public.trophies t set
    achieved           = b.logged_exercise_id is not null,
    awarded_at         = case
                           when b.logged_exercise_id is null then null
                           when t.achieved then t.awarded_at
                           else timezone('utc', now())
                         end,
    logged_exercise_id = b.logged_exercise_id,
    reps_user          = coalesce(b.reps, 0),
    weight_user        = coalesce(b.weight, 0),
    body_weight        = b.body_weight
  from best b
  where b.trophy_id = t.id
    and (t.achieved is distinct from (b.logged_exercise_id is not null)
      or t.logged_exercise_id is distinct from b.logged_exercise_id
      or t.reps_user is distinct from coalesce(b.reps, 0)
      or t.weight_user is distinct from coalesce(b.weight, 0)
      or t.body_weight is distinct from b.body_weight);
end;
$$;

create function private.evaluate_trophies_for(p_pairs jsonb)
returns void language plpgsql security definer set search_path = '' as $$
declare r record;
begin
  for r in
    select distinct (e ->> 'owner_id')::uuid as owner_id, (e ->> 'movement_id')::uuid as movement_id
    from jsonb_array_elements(coalesce(p_pairs, '[]')) e
  loop
    perform private.evaluate_trophies(r.owner_id, r.movement_id);
  end loop;
end;
$$;

create function private.on_logged_sets_change()
returns trigger language plpgsql security definer set search_path = '' as $$
declare v_pairs jsonb;
begin
  if current_setting('hero.defer_trophies', true) = 'on' then
    return null;
  end if;
  if tg_op = 'DELETE' then
    select jsonb_agg(distinct jsonb_build_object('owner_id', le.owner_id, 'movement_id', le.movement_id))
    into v_pairs from old_rows o join public.logged_exercises le on le.id = o.logged_exercise_id;
  else
    select jsonb_agg(distinct jsonb_build_object('owner_id', le.owner_id, 'movement_id', le.movement_id))
    into v_pairs from new_rows n join public.logged_exercises le on le.id = n.logged_exercise_id;
  end if;
  perform private.evaluate_trophies_for(v_pairs);
  return null;
end;
$$;
create trigger evaluate_trophies_after_insert after insert on public.logged_sets
  referencing new table as new_rows for each statement execute function private.on_logged_sets_change();
create trigger evaluate_trophies_after_update after update on public.logged_sets
  referencing new table as new_rows for each statement execute function private.on_logged_sets_change();
create trigger evaluate_trophies_after_delete after delete on public.logged_sets
  referencing old table as old_rows for each statement execute function private.on_logged_sets_change();

create function private.on_logged_exercises_change()
returns trigger language plpgsql security definer set search_path = '' as $$
declare v_pairs jsonb;
begin
  if current_setting('hero.defer_trophies', true) = 'on' then
    return null;
  end if;
  -- Deleted rows only exist in the transition table
  if tg_op = 'DELETE' then
    select jsonb_agg(distinct jsonb_build_object('owner_id', owner_id, 'movement_id', movement_id))
    into v_pairs from old_rows;
  else
    select jsonb_agg(distinct x) into v_pairs from (
      select jsonb_build_object('owner_id', owner_id, 'movement_id', movement_id) x from old_rows
      union all
      select jsonb_build_object('owner_id', owner_id, 'movement_id', movement_id) from new_rows
    ) u;
  end if;
  perform private.evaluate_trophies_for(v_pairs);
  return null;
end;
$$;
create trigger evaluate_trophies_after_update after update on public.logged_exercises
  referencing old table as old_rows new table as new_rows
  for each statement execute function private.on_logged_exercises_change();
create trigger evaluate_trophies_after_delete after delete on public.logged_exercises
  referencing old table as old_rows for each statement execute function private.on_logged_exercises_change();

create function private.on_sessions_change()
returns trigger language plpgsql security definer set search_path = '' as $$
declare v_pairs jsonb;
begin
  if current_setting('hero.defer_trophies', true) = 'on' then
    return null;
  end if;
  select jsonb_agg(distinct jsonb_build_object('owner_id', le.owner_id, 'movement_id', le.movement_id))
  into v_pairs
  from new_rows n
  join old_rows o on o.id = n.id
  join public.logged_exercises le on le.session_id = n.id
  where n.body_weight is distinct from o.body_weight;
  perform private.evaluate_trophies_for(v_pairs);
  return null;
end;
$$;
create trigger evaluate_trophies_after_update after update on public.sessions
  referencing old table as old_rows new table as new_rows
  for each statement execute function private.on_sessions_change();

-- A movement named like a default gets its definition key (and so its trophies)
create function private.set_definition_key()
returns trigger language plpgsql set search_path = '' as $$
begin
  if new.definition_key is null and new.owner_id is not null then
    select d.key into new.definition_key from public.default_exercise_types d where d.key = new.name;
  end if;
  return new;
end;
$$;
create trigger set_definition_key before insert on public.movements
  for each row execute function private.set_definition_key();

create function private.on_movements_insert()
returns trigger language plpgsql security definer set search_path = '' as $$
begin
  if new.owner_id is not null then
    perform private.init_trophies(new.owner_id, new.id);
  end if;
  return null;
end;
$$;
create trigger init_trophies_after_insert after insert on public.movements
  for each row execute function private.on_movements_insert();

-- Legacy → new model ---------------------------------------------------------------------------
create function private.parse_rep_range(p_text text, out rep_min integer, out rep_max integer, out label text)
language plpgsql immutable set search_path = '' as $$
declare m text[];
begin
  m := regexp_match(coalesce(p_text, ''), '^\s*(\d+)\s*-\s*(\d+)\s*$');
  if m is not null and m[1]::int <= m[2]::int then
    rep_min := m[1]::int; rep_max := m[2]::int; return;
  end if;
  m := regexp_match(coalesce(p_text, ''), '^\s*(\d+)\s*$');
  if m is not null then
    rep_min := m[1]::int; rep_max := m[1]::int; return;
  end if;
  label := nullif(trim(p_text), '');
end;
$$;

-- Idempotent conversion of the legacy rows. The newest version wins, as in the sync script: a converted row
-- is only refreshed when its legacy source changed after it (rows edited in the new model are kept).
-- Never deletes rows created in the new model.
create function private.migrate_legacy()
returns jsonb language plpgsql security definer set search_path = '' as $$
declare
  v_counts jsonb := '{}'::jsonb;
  v_n integer;
  v_movement record;
begin
  -- Trophy triggers wait until the end: replacing a log's sets must not reset award dates
  perform set_config('hero.defer_trophies', 'on', true);

  -- Movements: a legacy type lands on its own id, or on a setup_user movement with the same key/name
  insert into legacy.movement_map (legacy_id, movement_id)
  select et.id, coalesce(
           (select m.id from public.movements m
            where m.owner_id = et.owner_id
              and not exists (select 1 from legacy.movement_map mm where mm.movement_id = m.id)
              and (m.definition_key = coalesce(et.definition_key, et.name) or lower(m.name) = lower(et.name))
            order by m.created_at limit 1),
           et.id)
  from legacy.exercise_types et
  where not exists (select 1 from legacy.movement_map mm where mm.legacy_id = et.id)
    and exists (select 1 from public.profiles p where p.id = et.owner_id);

  insert into public.movements (id, owner_id, name, definition_key, load_type, notes, created_at, updated_at)
  select distinct on (mm.movement_id) mm.movement_id, et.owner_id, et.name, et.definition_key,
         case when et.name ilike '%lest%' then 'bodyweight_plus'::public.load_type else 'external' end,
         nullif(trim(et.advice), ''), et.created_at, et.updated_at
  from legacy.exercise_types et
  join legacy.movement_map mm on mm.legacy_id = et.id
  order by mm.movement_id, et.updated_at desc
  on conflict (id) do update set
    name = excluded.name,
    notes = excluded.notes,
    definition_key = coalesce(excluded.definition_key, public.movements.definition_key)
  where excluded.updated_at > public.movements.updated_at
    and (public.movements.name, public.movements.notes) is distinct from (excluded.name, excluded.notes);
  get diagnostics v_n = row_count;
  v_counts := v_counts || jsonb_build_object('movements', v_n);

  -- Programs: the 3-day and 2-day session types become two programs, one day per session type
  insert into public.programs (owner_id, name, legacy_key)
  select distinct x.owner_id,
         case x.legacy_key when '3x' then 'Programme 3 jours' else 'Programme 2 jours' end,
         x.legacy_key
  from (
    select owner_id, case when session_type in ('Upper A', 'Lower', 'Upper B') then '3x' else '2x' end as legacy_key
    from legacy.programs where session_type <> 'Other'
    union
    select owner_id, case when type_session in ('Upper A', 'Lower', 'Upper B') then '3x' else '2x' end
    from legacy.sessions where type_session <> 'Other'
  ) x
  where exists (select 1 from public.profiles p where p.id = x.owner_id)
  on conflict (owner_id, legacy_key) do nothing;

  insert into public.program_days (program_id, name, position, legacy_session_type)
  select distinct p.id, x.session_type::text,
         array_position(array['Upper A', 'Lower', 'Upper B', 'Séance A', 'Séance B']::text[], x.session_type::text),
         x.session_type
  from (
    select owner_id, session_type from legacy.programs where session_type <> 'Other'
    union
    select owner_id, type_session from legacy.sessions where type_session <> 'Other'
  ) x
  join public.programs p
    on p.owner_id = x.owner_id
   and p.legacy_key = case when x.session_type in ('Upper A', 'Lower', 'Upper B') then '3x' else '2x' end
  on conflict (program_id, legacy_session_type) where legacy_session_type is not null do nothing;

  -- Days whose legacy program changed since their last refresh (or never got their slots)
  if to_regclass('pg_temp.refresh_days') is not null then
    drop table pg_temp.refresh_days;
  end if;
  create temporary table refresh_days on commit drop as
  select d.id as day_id, lp.id as legacy_program_id
  from public.program_days d
  join public.programs p on p.id = d.program_id
  join legacy.programs lp on lp.owner_id = p.owner_id and lp.session_type = d.legacy_session_type
  where d.legacy_session_type is not null
    and (lp.updated_at > d.updated_at or not exists (select 1 from public.slots s where s.program_day_id = d.id));

  delete from public.slots s
  using pg_temp.refresh_days r
  where s.program_day_id = r.day_id
    and not exists (select 1 from legacy.program_exercises pe where pe.id = s.id);

  insert into public.slots (id, program_day_id, position, movement_id, is_key_lift, progression_rule,
                            rest_seconds, created_at)
  select pe.id, r.day_id, pe."order", mm.movement_id, et.trophy_locked,
         case when et.advice ilike '%top set%' then 'per_set'::public.progression_rule else 'all_sets' end,
         et.timer_seconds, pe.created_at
  from pg_temp.refresh_days r
  join legacy.program_exercises pe on pe.program_id = r.legacy_program_id
  join legacy.exercise_types et on et.id = pe.exercise_type_id
  join legacy.movement_map mm on mm.legacy_id = et.id
  on conflict (id) do update set
    position = excluded.position,
    movement_id = excluded.movement_id,
    is_key_lift = excluded.is_key_lift,
    progression_rule = excluded.progression_rule,
    rest_seconds = excluded.rest_seconds
  where (public.slots.position, public.slots.movement_id, public.slots.is_key_lift,
         public.slots.progression_rule, public.slots.rest_seconds)
        is distinct from
        (excluded.position, excluded.movement_id, excluded.is_key_lift, excluded.progression_rule,
         excluded.rest_seconds);
  get diagnostics v_n = row_count;
  v_counts := v_counts || jsonb_build_object('slots', v_n);

  -- Prescriptions and alternatives of the refreshed slots are rebuilt from legacy
  delete from public.set_prescriptions sp
  using public.slots s, pg_temp.refresh_days r
  where sp.slot_id = s.id and s.program_day_id = r.day_id;
  insert into public.set_prescriptions (slot_id, position, rep_min, rep_max, load_rule, load_value, label)
  select pe.id, rr.pos, pr.rep_min, pr.rep_max,
         case
           when rr.pos = 1 then 'none'::public.load_rule
           when et.advice ilike '%top set%' then 'percent'
           when et.advice ilike '%augmenter le poids%' then 'step'
           else 'same'
         end,
         case when rr.pos > 1 and et.advice ilike '%top set%' then -10 end,
         pr.label
  from pg_temp.refresh_days r
  join legacy.program_exercises pe on pe.program_id = r.legacy_program_id
  join legacy.exercise_types et on et.id = pe.exercise_type_id
  join public.slots s on s.id = pe.id
  cross join lateral (values (1, et.rep_range_1), (2, et.rep_range_2), (3, et.rep_range_3), (4, et.rep_range_4))
    as rr(pos, txt)
  cross join lateral private.parse_rep_range(rr.txt) pr
  where nullif(trim(rr.txt), '') is not null;

  delete from public.slot_alternatives sa
  using public.slots s, pg_temp.refresh_days r
  where sa.slot_id = s.id and s.program_day_id = r.day_id;
  insert into public.slot_alternatives (slot_id, movement_id, position)
  select a.program_exercise_id, mm.movement_id, a.position
  from pg_temp.refresh_days r
  join legacy.program_exercises pe on pe.program_id = r.legacy_program_id
  join legacy.program_exercise_alternatives a on a.program_exercise_id = pe.id
  join public.slots s on s.id = pe.id
  join legacy.movement_map mm on mm.legacy_id = a.exercise_type_id
  where mm.movement_id <> s.movement_id
  on conflict do nothing;

  update public.program_days d set updated_at = timezone('utc', now())
  from pg_temp.refresh_days r where d.id = r.day_id;

  -- Sessions
  insert into public.sessions (id, owner_id, program_day_id, label, date_session, body_weight, is_done, comment,
                               created_at, updated_at)
  select ls.id, ls.owner_id, d.id, ls.type_session::text, ls.date_session, ls.body_weight, ls.is_done, ls.comment,
         ls.created_at, ls.updated_at
  from legacy.sessions ls
  left join public.programs p
    on p.owner_id = ls.owner_id
   and p.legacy_key = case when ls.type_session in ('Upper A', 'Lower', 'Upper B') then '3x' else '2x' end
  left join public.program_days d on d.program_id = p.id and d.legacy_session_type = ls.type_session
  where exists (select 1 from public.profiles pr where pr.id = ls.owner_id)
  on conflict (id) do update set
    date_session = excluded.date_session,
    body_weight = excluded.body_weight,
    is_done = excluded.is_done,
    comment = excluded.comment
  where excluded.updated_at > public.sessions.updated_at
    and (public.sessions.date_session, public.sessions.body_weight, public.sessions.is_done,
         public.sessions.comment)
        is distinct from
        (excluded.date_session, excluded.body_weight, excluded.is_done, excluded.comment);
  get diagnostics v_n = row_count;
  v_counts := v_counts || jsonb_build_object('sessions', v_n);

  -- Logged exercises: linked to the slot of their session's day that uses (or offers) the movement
  insert into public.logged_exercises (id, owner_id, session_id, movement_id, slot_id, comment, created_at, updated_at)
  select eu.id, eu.owner_id, eu.session_id, mm.movement_id,
         (select s.id from public.slots s
          join public.sessions se on se.id = eu.session_id
          where s.program_day_id = se.program_day_id
            and (s.movement_id = mm.movement_id
                 or exists (select 1 from public.slot_alternatives sa
                            where sa.slot_id = s.id and sa.movement_id = mm.movement_id))
          order by (s.movement_id = mm.movement_id) desc, s.position
          limit 1),
         left(eu.comment, 200), eu.created_at, eu.updated_at
  from legacy.exercise_users eu
  join legacy.movement_map mm on mm.legacy_id = eu.type_id
  where (eu.session_id is null or exists (select 1 from public.sessions se where se.id = eu.session_id))
  on conflict (id) do update set
    session_id = excluded.session_id,
    movement_id = excluded.movement_id,
    comment = excluded.comment
  where excluded.updated_at > public.logged_exercises.updated_at
    and (public.logged_exercises.session_id, public.logged_exercises.movement_id, public.logged_exercises.comment)
        is distinct from
        (excluded.session_id, excluded.movement_id, excluded.comment);
  get diagnostics v_n = row_count;
  v_counts := v_counts || jsonb_build_object('logged_exercises', v_n);

  -- Sets: replaced when the legacy sets differ and are newer than the logged exercise's last edit
  if to_regclass('pg_temp.changed_logs') is not null then
    drop table pg_temp.changed_logs;
  end if;
  create temporary table changed_logs on commit drop as
  select eu.id
  from legacy.exercise_users eu
  join public.logged_exercises le on le.id = eu.id
  where coalesce((select jsonb_agg(jsonb_build_array(es.set_order, es.weight, es.reps) order by es.set_order)
                  from legacy.exercise_sets es where es.exercise_user_id = eu.id), '[]')
        is distinct from
        coalesce((select jsonb_agg(jsonb_build_array(ls.set_order, ls.weight, ls.reps) order by ls.set_order)
                  from public.logged_sets ls where ls.logged_exercise_id = eu.id), '[]')
    and (not exists (select 1 from public.logged_sets ls where ls.logged_exercise_id = eu.id)
         or greatest(eu.updated_at, (select max(es.updated_at) from legacy.exercise_sets es
                                     where es.exercise_user_id = eu.id)) > le.updated_at);

  delete from public.logged_sets ls using pg_temp.changed_logs c where ls.logged_exercise_id = c.id;
  insert into public.logged_sets (id, logged_exercise_id, set_order, weight, reps, created_at, updated_at)
  select es.id, es.exercise_user_id, es.set_order, es.weight, es.reps, es.created_at, es.updated_at
  from legacy.exercise_sets es
  join pg_temp.changed_logs c on c.id = es.exercise_user_id;
  get diagnostics v_n = row_count;
  v_counts := v_counts || jsonb_build_object('logged_sets', v_n);

  -- Active program: the 3-day one, else the 2-day one; then drop setup_user's empty program
  update public.profiles pr set active_program_id = coalesce(
    (select id from public.programs where owner_id = pr.id and legacy_key = '3x'),
    (select id from public.programs where owner_id = pr.id and legacy_key = '2x'))
  where exists (select 1 from public.programs where owner_id = pr.id and legacy_key is not null)
    and (pr.active_program_id is null
         or exists (select 1 from public.programs p where p.id = pr.active_program_id and p.legacy_key is null
                    and not exists (select 1 from public.program_days d join public.slots s on s.program_day_id = d.id
                                    where d.program_id = p.id)));
  delete from public.programs p
  where p.legacy_key is null
    and exists (select 1 from public.programs l where l.owner_id = p.owner_id and l.legacy_key is not null)
    and not exists (select 1 from public.program_days d join public.slots s on s.program_day_id = d.id
                    where d.program_id = p.id)
    and not exists (select 1 from public.program_days d join public.sessions s on s.program_day_id = d.id
                    where d.program_id = p.id);

  -- Trophies exist only for movements with a definition key: re-evaluate those
  perform set_config('hero.defer_trophies', 'off', true);
  for v_movement in
    select owner_id, id from public.movements where owner_id is not null and definition_key is not null
  loop
    perform private.evaluate_trophies(v_movement.owner_id, v_movement.id);
  end loop;

  return v_counts;
end;
$$;

-- New users: profile, the default movement list and an empty program -----------------------------
create or replace function private.setup_user(p_uid uuid)
returns void language plpgsql security definer set search_path = '' as $$
declare
  v_meta jsonb;
  v_email text;
  v_first text;
  v_last text;
  v_full text;
  v_program_id uuid;
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
    insert into public.profiles (id, email, first_name, last_name)
    values (p_uid, null, v_first, v_last)
    on conflict (id) do nothing;
  end;

  if exists (select 1 from public.movements where owner_id = p_uid) then
    return;
  end if;

  -- Trophies are initialized by the init_trophies_after_insert trigger on movements
  insert into public.movements (owner_id, name, definition_key, load_type)
  select p_uid, d.name, d.key,
         case when d.name ilike '%lest%' then 'bodyweight_plus'::public.load_type else 'external' end
  from public.default_exercise_types d
  order by d.sort_order;

  insert into public.programs (owner_id, name) values (p_uid, 'Mon programme') returning id into v_program_id;
  insert into public.program_days (program_id, name, position) values (v_program_id, 'Séance 1', 1);
  update public.profiles set active_program_id = v_program_id where id = p_uid and active_program_id is null;
end;
$$;

-- RPCs ------------------------------------------------------------------------------------------
-- Writes a logged exercise and its sets in one transaction; returns the trophies it unlocked
create function public.save_exercise(
  p_movement_id uuid,
  p_sets jsonb,
  p_session_id uuid default null,
  p_comment text default null,
  p_id uuid default null,
  p_slot_id uuid default null
) returns jsonb language plpgsql set search_path = '' as $$
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
            when jsonb_typeof(e) = 'object'
             and jsonb_typeof(e -> 'weight') = 'number'
             and jsonb_typeof(e -> 'reps') = 'number'
            then (e ->> 'weight')::numeric < 0
              or (e ->> 'reps')::numeric < 0
              or (e ->> 'reps')::numeric <> trunc((e ->> 'reps')::numeric)
              or coalesce(e ->> 'kind', 'working') not in ('warmup', 'working', 'drop', 'cheat', 'switch', 'mini')
              or coalesce(e ->> 'side', 'left') not in ('left', 'right')
            else true
          end
  ) then
    raise exception 'Each set needs a numeric "weight" >= 0, an integer "reps" >= 0, a valid "kind" and "side"'
      using errcode = '22023';
  end if;

  select coalesce(array_agg(id), '{}') into v_before
  from public.trophies where owner_id = v_uid and achieved;

  if p_id is null then
    insert into public.logged_exercises (owner_id, movement_id, session_id, slot_id, comment)
    values (v_uid, p_movement_id, p_session_id, p_slot_id, p_comment)
    returning id into v_id;
  else
    update public.logged_exercises
    set movement_id = p_movement_id,
        session_id = coalesce(p_session_id, session_id),
        slot_id = coalesce(p_slot_id, slot_id),
        comment = p_comment
    where id = p_id and owner_id = v_uid
    returning id into v_id;
    if v_id is null then
      raise exception 'Exercise not found' using errcode = 'P0002';
    end if;
    delete from public.logged_sets where logged_exercise_id = v_id;
  end if;

  insert into public.logged_sets (logged_exercise_id, set_order, kind, weight, reps, side)
  select v_id, x.ord::int, coalesce(x.e ->> 'kind', 'working')::public.set_kind,
         (x.e ->> 'weight')::numeric, (x.e ->> 'reps')::int, (x.e ->> 'side')::public.body_side
  from jsonb_array_elements(p_sets) with ordinality as x(e, ord);

  select coalesce(jsonb_agg(to_jsonb(t) order by t.level), '[]'::jsonb) into v_new
  from public.trophies t
  where t.owner_id = v_uid and t.achieved and not (t.id = any (v_before));

  return jsonb_build_object('id', v_id, 'new_trophies', v_new);
end;
$$;

-- Saves a day's slots in order. Slots keep their id (and so their prescriptions) when "id" is passed;
-- new slots get the default prescription (3 sets of 8-12); slots not listed are deleted.
create function public.save_program_day(p_day_id uuid, p_slots jsonb)
returns uuid language plpgsql set search_path = '' as $$
declare
  v_uid uuid := auth.uid();
  v_slot_id uuid;
  r record;
begin
  if v_uid is null then
    raise exception 'Not authenticated' using errcode = '28000';
  end if;
  if p_slots is null or jsonb_typeof(p_slots) <> 'array' then
    raise exception 'Slots must be an array' using errcode = '22023';
  end if;
  if not exists (
    select 1 from public.program_days d join public.programs p on p.id = d.program_id
    where d.id = p_day_id and p.owner_id = v_uid
  ) then
    raise exception 'Program day not found' using errcode = 'P0002';
  end if;

  delete from public.slots
  where program_day_id = p_day_id
    and id not in (select (e ->> 'id')::uuid from jsonb_array_elements(p_slots) e
                   where jsonb_typeof(e -> 'id') = 'string');

  for r in select x.e, x.ord from jsonb_array_elements(p_slots) with ordinality as x(e, ord) loop
    v_slot_id := (r.e ->> 'id')::uuid;
    if v_slot_id is not null then
      update public.slots
      set position = r.ord, movement_id = (r.e ->> 'movement_id')::uuid
      where id = v_slot_id and program_day_id = p_day_id;
      if not found then
        raise exception 'Slot % not found in this day', v_slot_id using errcode = 'P0002';
      end if;
    else
      insert into public.slots (program_day_id, position, movement_id)
      values (p_day_id, r.ord, (r.e ->> 'movement_id')::uuid)
      returning id into v_slot_id;
      insert into public.set_prescriptions (slot_id, position, rep_min, rep_max, load_rule)
      select v_slot_id, g, 8, 12, case when g = 1 then 'none'::public.load_rule else 'same' end
      from generate_series(1, 3) g;
    end if;

    delete from public.slot_alternatives where slot_id = v_slot_id;
    insert into public.slot_alternatives (slot_id, movement_id, position)
    select v_slot_id, a.value::uuid, a.ord
    from jsonb_array_elements_text(coalesce(r.e -> 'alternative_ids', '[]'::jsonb)) with ordinality as a(value, ord)
    where a.value::uuid <> (r.e ->> 'movement_id')::uuid
    on conflict do nothing;
  end loop;

  return p_day_id;
end;
$$;

-- RLS ---------------------------------------------------------------------------------------------
create function private.owns_program(p_id uuid)
returns boolean language sql stable security definer set search_path = '' as $$
  select exists (select 1 from public.programs where id = p_id and owner_id = (select auth.uid()));
$$;
create function private.owns_program_day(p_id uuid)
returns boolean language sql stable security definer set search_path = '' as $$
  select exists (
    select 1 from public.program_days d join public.programs p on p.id = d.program_id
    where d.id = p_id and p.owner_id = (select auth.uid())
  );
$$;
create function private.owns_slot(p_id uuid)
returns boolean language sql stable security definer set search_path = '' as $$
  select exists (
    select 1 from public.slots s
    join public.program_days d on d.id = s.program_day_id
    join public.programs p on p.id = d.program_id
    where s.id = p_id and p.owner_id = (select auth.uid())
  );
$$;
create function private.can_use_movement(p_id uuid)
returns boolean language sql stable security definer set search_path = '' as $$
  select exists (
    select 1 from public.movements where id = p_id and (owner_id is null or owner_id = (select auth.uid()))
  );
$$;
create function private.owns_session(p_id uuid)
returns boolean language sql stable security definer set search_path = '' as $$
  select exists (select 1 from public.sessions where id = p_id and owner_id = (select auth.uid()));
$$;
create function private.owns_logged_exercise(p_id uuid)
returns boolean language sql stable security definer set search_path = '' as $$
  select exists (select 1 from public.logged_exercises where id = p_id and owner_id = (select auth.uid()));
$$;

revoke execute on all functions in schema private from public, anon, authenticated;
grant execute on function private.owns_program(uuid), private.owns_program_day(uuid), private.owns_slot(uuid),
  private.can_use_movement(uuid), private.owns_session(uuid), private.owns_logged_exercise(uuid)
  to authenticated;
revoke execute on function public.save_exercise(uuid, jsonb, uuid, text, uuid, uuid) from public, anon;
grant execute on function public.save_exercise(uuid, jsonb, uuid, text, uuid, uuid) to authenticated;
revoke execute on function public.save_program_day(uuid, jsonb) from public, anon;
grant execute on function public.save_program_day(uuid, jsonb) to authenticated;

alter table public.movements enable row level security;
create policy movements_select on public.movements for select to authenticated
  using (owner_id is null or owner_id = (select auth.uid()));
create policy movements_insert_own on public.movements for insert to authenticated
  with check (owner_id = (select auth.uid()));
create policy movements_update_own on public.movements for update to authenticated
  using (owner_id = (select auth.uid())) with check (owner_id = (select auth.uid()));
create policy movements_delete_own on public.movements for delete to authenticated
  using (owner_id = (select auth.uid()));

alter table public.programs enable row level security;
create policy programs_select_own on public.programs for select to authenticated
  using (owner_id = (select auth.uid()));
create policy programs_insert_own on public.programs for insert to authenticated
  with check (owner_id = (select auth.uid()));
create policy programs_update_own on public.programs for update to authenticated
  using (owner_id = (select auth.uid())) with check (owner_id = (select auth.uid()));
create policy programs_delete_own on public.programs for delete to authenticated
  using (owner_id = (select auth.uid()));

alter table public.program_days enable row level security;
create policy program_days_select_own on public.program_days for select to authenticated
  using (private.owns_program(program_id));
create policy program_days_insert_own on public.program_days for insert to authenticated
  with check (private.owns_program(program_id));
create policy program_days_update_own on public.program_days for update to authenticated
  using (private.owns_program(program_id)) with check (private.owns_program(program_id));
create policy program_days_delete_own on public.program_days for delete to authenticated
  using (private.owns_program(program_id));

alter table public.slots enable row level security;
create policy slots_select_own on public.slots for select to authenticated
  using (private.owns_program_day(program_day_id));
create policy slots_insert_own on public.slots for insert to authenticated
  with check (private.owns_program_day(program_day_id) and private.can_use_movement(movement_id)
              and (finisher_movement_id is null or private.can_use_movement(finisher_movement_id)));
create policy slots_update_own on public.slots for update to authenticated
  using (private.owns_program_day(program_day_id))
  with check (private.owns_program_day(program_day_id) and private.can_use_movement(movement_id)
              and (finisher_movement_id is null or private.can_use_movement(finisher_movement_id)));
create policy slots_delete_own on public.slots for delete to authenticated
  using (private.owns_program_day(program_day_id));

alter table public.set_prescriptions enable row level security;
create policy set_prescriptions_select_own on public.set_prescriptions for select to authenticated
  using (private.owns_slot(slot_id));
create policy set_prescriptions_insert_own on public.set_prescriptions for insert to authenticated
  with check (private.owns_slot(slot_id));
create policy set_prescriptions_update_own on public.set_prescriptions for update to authenticated
  using (private.owns_slot(slot_id)) with check (private.owns_slot(slot_id));
create policy set_prescriptions_delete_own on public.set_prescriptions for delete to authenticated
  using (private.owns_slot(slot_id));

alter table public.slot_alternatives enable row level security;
create policy slot_alternatives_select_own on public.slot_alternatives for select to authenticated
  using (private.owns_slot(slot_id));
create policy slot_alternatives_insert_own on public.slot_alternatives for insert to authenticated
  with check (private.owns_slot(slot_id) and private.can_use_movement(movement_id));
create policy slot_alternatives_update_own on public.slot_alternatives for update to authenticated
  using (private.owns_slot(slot_id)) with check (private.owns_slot(slot_id) and private.can_use_movement(movement_id));
create policy slot_alternatives_delete_own on public.slot_alternatives for delete to authenticated
  using (private.owns_slot(slot_id));

alter table public.sessions enable row level security;
create policy sessions_select_own on public.sessions for select to authenticated
  using (owner_id = (select auth.uid()));
create policy sessions_insert_own on public.sessions for insert to authenticated
  with check (owner_id = (select auth.uid())
              and (program_day_id is null or private.owns_program_day(program_day_id)));
create policy sessions_update_own on public.sessions for update to authenticated
  using (owner_id = (select auth.uid()))
  with check (owner_id = (select auth.uid())
              and (program_day_id is null or private.owns_program_day(program_day_id)));
create policy sessions_delete_own on public.sessions for delete to authenticated
  using (owner_id = (select auth.uid()));

alter table public.logged_exercises enable row level security;
create policy logged_exercises_select_own on public.logged_exercises for select to authenticated
  using (owner_id = (select auth.uid()));
create policy logged_exercises_insert_own on public.logged_exercises for insert to authenticated
  with check (owner_id = (select auth.uid()) and private.can_use_movement(movement_id)
              and (session_id is null or private.owns_session(session_id))
              and (slot_id is null or private.owns_slot(slot_id)));
create policy logged_exercises_update_own on public.logged_exercises for update to authenticated
  using (owner_id = (select auth.uid()))
  with check (owner_id = (select auth.uid()) and private.can_use_movement(movement_id)
              and (session_id is null or private.owns_session(session_id))
              and (slot_id is null or private.owns_slot(slot_id)));
create policy logged_exercises_delete_own on public.logged_exercises for delete to authenticated
  using (owner_id = (select auth.uid()));

alter table public.logged_sets enable row level security;
create policy logged_sets_select_own on public.logged_sets for select to authenticated
  using (private.owns_logged_exercise(logged_exercise_id));
create policy logged_sets_insert_own on public.logged_sets for insert to authenticated
  with check (private.owns_logged_exercise(logged_exercise_id));
create policy logged_sets_update_own on public.logged_sets for update to authenticated
  using (private.owns_logged_exercise(logged_exercise_id)) with check (private.owns_logged_exercise(logged_exercise_id));
create policy logged_sets_delete_own on public.logged_sets for delete to authenticated
  using (private.owns_logged_exercise(logged_exercise_id));

-- Convert the existing data --------------------------------------------------------------------
select private.migrate_legacy();

-- Trophies of users whose legacy types had no profile cannot be re-keyed: drop them
delete from public.trophies t where not exists (select 1 from public.movements m where m.id = t.movement_id);
update public.trophies t set logged_exercise_id = null
where logged_exercise_id is not null
  and not exists (select 1 from public.logged_exercises le where le.id = t.logged_exercise_id);

alter table public.trophies
  add constraint trophies_movement_id_fkey foreign key (movement_id) references public.movements (id) on delete cascade,
  add constraint trophies_logged_exercise_id_fkey foreign key (logged_exercise_id)
    references public.logged_exercises (id) on delete set null;
