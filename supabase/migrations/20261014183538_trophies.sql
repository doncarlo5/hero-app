-- Logique des trophées en SQL (port de apps/api/services/trophy-service.js)
-- Les trophées sont recalculés par des triggers à chaque changement de séries, d'exercices ou de poids de corps.
-- Le client ne lit que la table trophies ; la RPC save_exercise renvoie les trophées nouvellement obtenus.

create schema if not exists private;
revoke all on schema private from public, anon, authenticated;

-- updated_at automatique ------------------------------------------------------
create function private.set_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at := timezone('utc', now());
  return new;
end;
$$;

do $$
declare t text;
begin
  foreach t in array array['profiles', 'exercise_types', 'sessions', 'exercise_users', 'exercise_sets',
                           'programs', 'program_exercises', 'trophies', 'feedbacks'] loop
    execute format('create trigger set_updated_at before update on public.%I for each row execute function private.set_updated_at()', t);
  end loop;
end $$;

-- definition_key : rempli depuis le nom à la création (comme l'ancienne API, qui matchait par nom)
create function private.set_definition_key()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  if new.definition_key is null then
    select d.key into new.definition_key from public.default_exercise_types d where d.key = new.name;
  end if;
  return new;
end;
$$;

create trigger set_definition_key before insert on public.exercise_types
  for each row execute function private.set_definition_key();

-- Initialisation des paliers d'un type d'exercice ----------------------------
create function private.init_trophies(p_owner uuid, p_type uuid)
returns void
language sql
security definer
set search_path = ''
as $$
  insert into public.trophies (owner_id, exercise_type_id, name, trophy_type, level, reps_goal,
                               weight_multiplier, description, reward_text)
  select et.owner_id, et.id, d.exercise_key, d.trophy_type, d.level, d.reps_goal,
         d.weight_multiplier, d.description, d.reward_text
  from public.exercise_types et
  join public.trophy_definitions d on d.exercise_key = et.definition_key
  where et.id = p_type and et.owner_id = p_owner
  on conflict (owner_id, exercise_type_id, level) do nothing;
$$;

-- Évaluation : pour chaque palier, meilleure série qualifiante (poids puis reps)
-- sur toutes les séances du type ; une séance sans poids de corps ne compte pas.
create function private.evaluate_trophies(p_owner uuid, p_type uuid)
returns void
language plpgsql
security definer
set search_path = ''
as $$
begin
  -- Type ou profil en cours de suppression (cascade) : rien à évaluer
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
      order by es.weight * 1000 + es.reps desc, eu.created_at, es.set_order
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
    best_reps        = coalesce(b.reps, 0),
    best_weight      = coalesce(b.weight, 0),
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

-- Triggers ---------------------------------------------------------------------
create function private.on_exercise_type_insert()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  perform private.init_trophies(new.owner_id, new.id);
  return null;
end;
$$;

create trigger init_trophies after insert on public.exercise_types
  for each row execute function private.on_exercise_type_insert();

-- Séries : un recalcul par (owner, type) touché, au niveau de l'instruction
-- (PG15 : une seule table de transition par trigger, d'où un trigger par événement)
create function private.on_exercise_sets_insert()
returns trigger language plpgsql security definer set search_path = '' as $$
declare r record;
begin
  for r in select distinct eu.owner_id, eu.type_id from public.exercise_users eu
           where eu.id in (select exercise_user_id from new_rows) loop
    perform private.evaluate_trophies(r.owner_id, r.type_id);
  end loop;
  return null;
end;
$$;

create function private.on_exercise_sets_delete()
returns trigger language plpgsql security definer set search_path = '' as $$
declare r record;
begin
  for r in select distinct eu.owner_id, eu.type_id from public.exercise_users eu
           where eu.id in (select exercise_user_id from old_rows) loop
    perform private.evaluate_trophies(r.owner_id, r.type_id);
  end loop;
  return null;
end;
$$;

create trigger evaluate_trophies_on_insert after insert on public.exercise_sets
  referencing new table as new_rows
  for each statement execute function private.on_exercise_sets_insert();
create trigger evaluate_trophies_on_update after update on public.exercise_sets
  referencing new table as new_rows
  for each statement execute function private.on_exercise_sets_insert();
create trigger evaluate_trophies_on_delete after delete on public.exercise_sets
  referencing old table as old_rows
  for each statement execute function private.on_exercise_sets_delete();

-- Exercices : suppression ou changement de type / séance
create function private.on_exercise_users_delete()
returns trigger language plpgsql security definer set search_path = '' as $$
declare r record;
begin
  for r in select distinct owner_id, type_id from old_rows loop
    perform private.evaluate_trophies(r.owner_id, r.type_id);
  end loop;
  return null;
end;
$$;

create function private.on_exercise_users_update()
returns trigger language plpgsql security definer set search_path = '' as $$
declare r record;
begin
  for r in
    select owner_id, type_id from old_rows
    union
    select owner_id, type_id from new_rows
  loop
    perform private.evaluate_trophies(r.owner_id, r.type_id);
  end loop;
  return null;
end;
$$;

create trigger evaluate_trophies_on_delete after delete on public.exercise_users
  referencing old table as old_rows
  for each statement execute function private.on_exercise_users_delete();
create trigger evaluate_trophies_on_update after update on public.exercise_users
  referencing old table as old_rows new table as new_rows
  for each statement execute function private.on_exercise_users_update();

-- Séances : changement de poids de corps
create function private.on_sessions_update()
returns trigger language plpgsql security definer set search_path = '' as $$
declare r record;
begin
  for r in
    select distinct eu.owner_id, eu.type_id
    from new_rows n
    join old_rows o on o.id = n.id
    join public.exercise_users eu on eu.session_id = n.id
    where n.body_weight is distinct from o.body_weight
  loop
    perform private.evaluate_trophies(r.owner_id, r.type_id);
  end loop;
  return null;
end;
$$;

create trigger evaluate_trophies_on_update after update on public.sessions
  referencing old table as old_rows new table as new_rows
  for each statement execute function private.on_sessions_update();

-- RPC : enregistrer un exercice et ses séries en une transaction --------------
-- p_sets : [{"weight": 80, "reps": 10}, ...] dans l'ordre des séries.
-- Renvoie {"id": <exercise_user id>, "new_trophies": [<trophées obtenus par cet enregistrement>]}.
create function public.save_exercise(
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

revoke execute on function public.save_exercise(uuid, jsonb, uuid, text, uuid) from public, anon;
grant execute on function public.save_exercise(uuid, jsonb, uuid, text, uuid) to authenticated;
