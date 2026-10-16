-- A user's own settings for a library movement: library rows are shared and read-only, so whether the
-- movement is done one side at a time and the load step it progresses by are kept per user. A null column
-- keeps the library value. The user's own movements keep these settings on their row.

create table public.movement_settings (
  user_id uuid not null default auth.uid() references public.profiles (id) on delete cascade,
  movement_id uuid not null references public.movements (id) on delete cascade,
  unilateral boolean,
  increment_kg numeric check (increment_kg > 0 and increment_kg <= 50),
  updated_at timestamptz not null default now(),
  primary key (user_id, movement_id)
);

comment on table public.movement_settings is
  'Per-user overrides of a library movement (unilateral, increment_kg); null keeps the library value.';

create index movement_settings_movement_idx on public.movement_settings (movement_id);

alter table public.movement_settings enable row level security;

-- Only library movements take settings here
create policy movement_settings_select_own on public.movement_settings for select to authenticated
  using (user_id = (select auth.uid()));
create policy movement_settings_insert_own on public.movement_settings for insert to authenticated
  with check (
    user_id = (select auth.uid())
    and exists (select 1 from public.movements m where m.id = movement_id and m.owner_id is null)
  );
create policy movement_settings_update_own on public.movement_settings for update to authenticated
  using (user_id = (select auth.uid()))
  with check (
    user_id = (select auth.uid())
    and exists (select 1 from public.movements m where m.id = movement_id and m.owner_id is null)
  );
create policy movement_settings_delete_own on public.movement_settings for delete to authenticated
  using (user_id = (select auth.uid()));

grant select, insert, update, delete on public.movement_settings to authenticated;
