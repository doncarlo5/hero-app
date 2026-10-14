-- Baseline: schema as it existed on 2026-10-14 (created outside migrations during the Mongo → Supabase copy).
-- Already present in prod: registered as applied, do not replay it on prod.

create type public.session_type as enum ('Upper A', 'Lower', 'Upper B', 'Other', 'Séance A', 'Séance B');

create table public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  email text not null unique,
  first_name text,
  last_name text,
  has_seen_onboarding boolean not null default false,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table public.exercise_types (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references public.profiles (id) on delete cascade,
  name text not null,
  advice text,
  timer_seconds integer not null,
  rep_range_1 text not null,
  rep_range_2 text not null,
  rep_range_3 text not null,
  rep_range_4 text,
  session_types public.session_type[] not null default '{}',
  trophy_locked boolean not null default false,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);
create index exercise_types_owner_idx on public.exercise_types (owner_id);

create table public.sessions (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references public.profiles (id) on delete cascade,
  date_session timestamptz not null,
  type_session public.session_type not null,
  body_weight numeric not null,
  is_done boolean not null default false,
  comment text,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);
create index sessions_owner_idx on public.sessions (owner_id);

create table public.exercise_users (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references public.profiles (id) on delete cascade,
  type_id uuid not null references public.exercise_types (id) on delete cascade,
  session_id uuid references public.sessions (id) on delete cascade,
  comment text,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);
create index exercise_users_owner_idx on public.exercise_users (owner_id);

create table public.exercise_sets (
  id uuid primary key default gen_random_uuid(),
  exercise_user_id uuid not null references public.exercise_users (id) on delete cascade,
  set_order integer not null,
  weight numeric not null,
  reps integer not null,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now()),
  unique (exercise_user_id, set_order)
);
create index exercise_sets_exercise_user_idx on public.exercise_sets (exercise_user_id);

create table public.programs (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references public.profiles (id) on delete cascade,
  session_type public.session_type not null,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now()),
  unique (owner_id, session_type)
);
create index programs_owner_idx on public.programs (owner_id);

create table public.program_exercises (
  id uuid primary key default gen_random_uuid(),
  program_id uuid not null references public.programs (id) on delete cascade,
  exercise_type_id uuid not null references public.exercise_types (id) on delete cascade,
  "order" integer not null,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table public.program_exercise_alternatives (
  program_exercise_id uuid not null references public.program_exercises (id) on delete cascade,
  exercise_type_id uuid not null references public.exercise_types (id) on delete cascade,
  primary key (program_exercise_id, exercise_type_id)
);

create table public.trophies (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references public.profiles (id) on delete cascade,
  exercise_type_id uuid not null references public.exercise_types (id) on delete cascade,
  exercise_user_id uuid references public.exercise_users (id) on delete set null,
  trophy_type text not null,
  level integer not null,
  reps_goal integer,
  weight_multiplier numeric,
  achieved boolean not null default false,
  description text not null,
  reps_user integer not null default 0,
  weight_user numeric not null default 0,
  best_reps integer not null default 0,
  best_weight numeric not null default 0,
  awarded_at timestamptz,
  reward_text text,
  body_weight numeric,
  name text not null,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now()),
  unique (owner_id, exercise_type_id, level)
);
create index trophies_owner_exercise_type_level_idx on public.trophies (owner_id, exercise_type_id, level);

create table public.feedbacks (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references public.profiles (id) on delete cascade,
  subject text not null,
  message text,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);
create index feedbacks_owner_idx on public.feedbacks (owner_id);

-- RLS: every table is "own rows" (replaced by 20261014183648_rls_hardening.sql)
alter table public.profiles enable row level security;
alter table public.exercise_types enable row level security;
alter table public.sessions enable row level security;
alter table public.exercise_users enable row level security;
alter table public.exercise_sets enable row level security;
alter table public.programs enable row level security;
alter table public.program_exercises enable row level security;
alter table public.program_exercise_alternatives enable row level security;
alter table public.trophies enable row level security;
alter table public.feedbacks enable row level security;

create policy profiles_select_own on public.profiles for select to authenticated using (auth.uid() = id);
create policy profiles_insert_own on public.profiles for insert to authenticated with check (auth.uid() = id);
create policy profiles_update_own on public.profiles for update to authenticated using (auth.uid() = id) with check (auth.uid() = id);
create policy profiles_delete_own on public.profiles for delete to authenticated using (auth.uid() = id);

do $$
declare t text;
begin
  foreach t in array array['exercise_types', 'sessions', 'exercise_users', 'programs', 'trophies', 'feedbacks'] loop
    execute format('create policy %1$s_select_own on public.%1$s for select to authenticated using (auth.uid() = owner_id)', t);
    execute format('create policy %1$s_insert_own on public.%1$s for insert to authenticated with check (auth.uid() = owner_id)', t);
    execute format('create policy %1$s_update_own on public.%1$s for update to authenticated using (auth.uid() = owner_id) with check (auth.uid() = owner_id)', t);
    execute format('create policy %1$s_delete_own on public.%1$s for delete to authenticated using (auth.uid() = owner_id)', t);
  end loop;
end $$;

create policy exercise_sets_select_own on public.exercise_sets for select to authenticated
  using (exists (select 1 from public.exercise_users eu where eu.id = exercise_user_id and eu.owner_id = auth.uid()));
create policy exercise_sets_insert_own on public.exercise_sets for insert to authenticated
  with check (exists (select 1 from public.exercise_users eu where eu.id = exercise_user_id and eu.owner_id = auth.uid()));
create policy exercise_sets_update_own on public.exercise_sets for update to authenticated
  using (exists (select 1 from public.exercise_users eu where eu.id = exercise_user_id and eu.owner_id = auth.uid()))
  with check (exists (select 1 from public.exercise_users eu where eu.id = exercise_user_id and eu.owner_id = auth.uid()));
create policy exercise_sets_delete_own on public.exercise_sets for delete to authenticated
  using (exists (select 1 from public.exercise_users eu where eu.id = exercise_user_id and eu.owner_id = auth.uid()));

create policy program_exercises_select_own on public.program_exercises for select to authenticated
  using (exists (select 1 from public.programs p where p.id = program_id and p.owner_id = auth.uid()));
create policy program_exercises_insert_own on public.program_exercises for insert to authenticated
  with check (exists (select 1 from public.programs p where p.id = program_id and p.owner_id = auth.uid()));
create policy program_exercises_update_own on public.program_exercises for update to authenticated
  using (exists (select 1 from public.programs p where p.id = program_id and p.owner_id = auth.uid()))
  with check (exists (select 1 from public.programs p where p.id = program_id and p.owner_id = auth.uid()));
create policy program_exercises_delete_own on public.program_exercises for delete to authenticated
  using (exists (select 1 from public.programs p where p.id = program_id and p.owner_id = auth.uid()));

create policy program_alternatives_select_own on public.program_exercise_alternatives for select to authenticated
  using (exists (select 1 from public.program_exercises pe join public.programs p on p.id = pe.program_id where pe.id = program_exercise_id and p.owner_id = auth.uid()));
create policy program_alternatives_insert_own on public.program_exercise_alternatives for insert to authenticated
  with check (exists (select 1 from public.program_exercises pe join public.programs p on p.id = pe.program_id where pe.id = program_exercise_id and p.owner_id = auth.uid()));
create policy program_alternatives_update_own on public.program_exercise_alternatives for update to authenticated
  using (exists (select 1 from public.program_exercises pe join public.programs p on p.id = pe.program_id where pe.id = program_exercise_id and p.owner_id = auth.uid()))
  with check (exists (select 1 from public.program_exercises pe join public.programs p on p.id = pe.program_id where pe.id = program_exercise_id and p.owner_id = auth.uid()));
create policy program_alternatives_delete_own on public.program_exercise_alternatives for delete to authenticated
  using (exists (select 1 from public.program_exercises pe join public.programs p on p.id = pe.program_id where pe.id = program_exercise_id and p.owner_id = auth.uid()));
