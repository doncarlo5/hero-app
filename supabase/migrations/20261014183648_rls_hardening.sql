-- RLS durcie + index
-- * (select auth.uid()) : évalué une fois par requête au lieu d'une fois par ligne
-- * trophies : lecture seule côté client (écrits uniquement par les fonctions de private.*)
-- * vérifie que les références (séance, type d'exercice, programme) appartiennent à l'utilisateur

-- Suppression des policies de la baseline -------------------------------------
do $$
declare p record;
begin
  for p in
    select policyname, tablename from pg_policies
    where schemaname = 'public'
      and tablename in ('profiles', 'exercise_types', 'sessions', 'exercise_users', 'exercise_sets', 'programs',
                        'program_exercises', 'program_exercise_alternatives', 'trophies', 'feedbacks')
  loop
    execute format('drop policy %I on public.%I', p.policyname, p.tablename);
  end loop;
end $$;

-- Helpers d'appartenance (security definer : évite la récursion RLS et reste rapide)
create function private.owns_session(p_id uuid)
returns boolean language sql stable security definer set search_path = '' as $$
  select exists (select 1 from public.sessions where id = p_id and owner_id = (select auth.uid()));
$$;
create function private.owns_exercise_type(p_id uuid)
returns boolean language sql stable security definer set search_path = '' as $$
  select exists (select 1 from public.exercise_types where id = p_id and owner_id = (select auth.uid()));
$$;
create function private.owns_exercise_user(p_id uuid)
returns boolean language sql stable security definer set search_path = '' as $$
  select exists (select 1 from public.exercise_users where id = p_id and owner_id = (select auth.uid()));
$$;
create function private.owns_program(p_id uuid)
returns boolean language sql stable security definer set search_path = '' as $$
  select exists (select 1 from public.programs where id = p_id and owner_id = (select auth.uid()));
$$;
create function private.owns_program_exercise(p_id uuid)
returns boolean language sql stable security definer set search_path = '' as $$
  select exists (
    select 1 from public.program_exercises pe
    join public.programs p on p.id = pe.program_id
    where pe.id = p_id and p.owner_id = (select auth.uid())
  );
$$;

-- Les policies appellent ces helpers avec les droits de l'utilisateur
grant usage on schema private to authenticated;
revoke execute on all functions in schema private from public, anon, authenticated;
grant execute on function private.owns_session(uuid), private.owns_exercise_type(uuid),
  private.owns_exercise_user(uuid), private.owns_program(uuid), private.owns_program_exercise(uuid)
  to authenticated;

-- profiles ---------------------------------------------------------------------
create policy profiles_select_own on public.profiles for select to authenticated
  using (id = (select auth.uid()));
create policy profiles_insert_own on public.profiles for insert to authenticated
  with check (id = (select auth.uid()));
create policy profiles_update_own on public.profiles for update to authenticated
  using (id = (select auth.uid())) with check (id = (select auth.uid()));

-- Tables simples "owner_id" ----------------------------------------------------
do $$
declare t text;
begin
  foreach t in array array['exercise_types', 'sessions', 'programs', 'feedbacks'] loop
    execute format('create policy %1$s_select_own on public.%1$I for select to authenticated using (owner_id = (select auth.uid()))', t);
    execute format('create policy %1$s_insert_own on public.%1$I for insert to authenticated with check (owner_id = (select auth.uid()))', t);
    execute format('create policy %1$s_update_own on public.%1$I for update to authenticated using (owner_id = (select auth.uid())) with check (owner_id = (select auth.uid()))', t);
    execute format('create policy %1$s_delete_own on public.%1$I for delete to authenticated using (owner_id = (select auth.uid()))', t);
  end loop;
end $$;

-- exercise_users : type et séance doivent appartenir à l'utilisateur ------------
create policy exercise_users_select_own on public.exercise_users for select to authenticated
  using (owner_id = (select auth.uid()));
create policy exercise_users_insert_own on public.exercise_users for insert to authenticated
  with check (
    owner_id = (select auth.uid())
    and private.owns_exercise_type(type_id)
    and (session_id is null or private.owns_session(session_id))
  );
create policy exercise_users_update_own on public.exercise_users for update to authenticated
  using (owner_id = (select auth.uid()))
  with check (
    owner_id = (select auth.uid())
    and private.owns_exercise_type(type_id)
    and (session_id is null or private.owns_session(session_id))
  );
create policy exercise_users_delete_own on public.exercise_users for delete to authenticated
  using (owner_id = (select auth.uid()));

-- exercise_sets ----------------------------------------------------------------
create policy exercise_sets_select_own on public.exercise_sets for select to authenticated
  using (private.owns_exercise_user(exercise_user_id));
create policy exercise_sets_insert_own on public.exercise_sets for insert to authenticated
  with check (private.owns_exercise_user(exercise_user_id));
create policy exercise_sets_update_own on public.exercise_sets for update to authenticated
  using (private.owns_exercise_user(exercise_user_id)) with check (private.owns_exercise_user(exercise_user_id));
create policy exercise_sets_delete_own on public.exercise_sets for delete to authenticated
  using (private.owns_exercise_user(exercise_user_id));

-- program_exercises / alternatives ---------------------------------------------
create policy program_exercises_select_own on public.program_exercises for select to authenticated
  using (private.owns_program(program_id));
create policy program_exercises_insert_own on public.program_exercises for insert to authenticated
  with check (private.owns_program(program_id) and private.owns_exercise_type(exercise_type_id));
create policy program_exercises_update_own on public.program_exercises for update to authenticated
  using (private.owns_program(program_id))
  with check (private.owns_program(program_id) and private.owns_exercise_type(exercise_type_id));
create policy program_exercises_delete_own on public.program_exercises for delete to authenticated
  using (private.owns_program(program_id));

create policy program_alternatives_select_own on public.program_exercise_alternatives for select to authenticated
  using (private.owns_program_exercise(program_exercise_id));
create policy program_alternatives_insert_own on public.program_exercise_alternatives for insert to authenticated
  with check (private.owns_program_exercise(program_exercise_id) and private.owns_exercise_type(exercise_type_id));
create policy program_alternatives_delete_own on public.program_exercise_alternatives for delete to authenticated
  using (private.owns_program_exercise(program_exercise_id));

-- trophies : lecture seule -----------------------------------------------------
create policy trophies_select_own on public.trophies for select to authenticated
  using (owner_id = (select auth.uid()));

-- Index ------------------------------------------------------------------------
-- Clés étrangères non indexées
create index exercise_users_type_idx on public.exercise_users (type_id);
create index exercise_users_session_idx on public.exercise_users (session_id);
create index exercise_users_owner_type_idx on public.exercise_users (owner_id, type_id);
create index trophies_exercise_type_idx on public.trophies (exercise_type_id);
create index trophies_exercise_user_idx on public.trophies (exercise_user_id);
create index program_exercises_program_idx on public.program_exercises (program_id);
create index program_exercises_exercise_type_idx on public.program_exercises (exercise_type_id);
create index program_exercise_alternatives_exercise_type_idx on public.program_exercise_alternatives (exercise_type_id);
-- Liste des séances par date
create index sessions_owner_date_idx on public.sessions (owner_id, date_session desc);
drop index public.sessions_owner_idx;
-- Doublons des contraintes uniques
drop index public.trophies_owner_exercise_type_level_idx;
drop index public.exercise_sets_exercise_user_idx;
