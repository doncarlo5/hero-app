-- Local development data only (`supabase start` / `supabase db reset`). Never run against prod.
-- Test account: test@hero.local / hero-local-test

-- Auth user: the on_auth_user_created trigger creates the profile, the default movements (with their
-- trophies) and an empty program
insert into auth.users (
  instance_id, id, aud, role, email, encrypted_password, email_confirmed_at,
  raw_app_meta_data, raw_user_meta_data, created_at, updated_at,
  confirmation_token, email_change, email_change_token_new, recovery_token
) values (
  '00000000-0000-0000-0000-000000000000', '11111111-1111-1111-1111-111111111111',
  'authenticated', 'authenticated', 'test@hero.local',
  extensions.crypt('hero-local-test', extensions.gen_salt('bf')), now(),
  '{"provider": "email", "providers": ["email"]}', '{"full_name": "Test Hero"}',
  now(), now(), '', '', '', ''
);

insert into auth.identities (id, user_id, provider_id, identity_data, provider, last_sign_in_at, created_at, updated_at)
values (
  gen_random_uuid(), '11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111',
  '{"sub": "11111111-1111-1111-1111-111111111111", "email": "test@hero.local", "email_verified": true}',
  'email', now(), now(), now()
);

-- A two-day program and three past sessions of day A (80 kg body weight); trophies are evaluated by
-- the triggers
do $$
declare
  v_uid uuid := '11111111-1111-1111-1111-111111111111';
  v_program uuid;
  v_day_a uuid;
  v_day_b uuid;
  v_incline uuid;
  v_incline_db uuid;
  v_pullups uuid;
  v_curl uuid;
  v_squat uuid;
  v_slot_incline uuid;
  v_slot_pullups uuid;
  v_slot uuid;
  v_session uuid;
  v_exercise uuid;
  v_week int;
  v_date timestamptz;
begin
  select id into v_incline from public.movements where owner_id = v_uid and definition_key = 'Développé incliné - Barre';
  select id into v_incline_db from public.movements where owner_id = v_uid and definition_key = 'Développé incliné - Haltères';
  select id into v_pullups from public.movements where owner_id = v_uid and definition_key = 'Tractions lestées';
  select id into v_curl from public.movements where owner_id = v_uid and definition_key = 'Curl Incliné - Haltères';
  select id into v_squat from public.movements where owner_id = v_uid and definition_key = 'Squat - Barre';

  select active_program_id into v_program from public.profiles where id = v_uid;
  update public.programs set name = 'Programme test' where id = v_program;
  update public.program_days set name = 'Haut A' where program_id = v_program returning id into v_day_a;
  insert into public.program_days (program_id, name, position) values (v_program, 'Bas', 2) returning id into v_day_b;

  -- Top set then back-off sets, each set progressing on its own
  insert into public.slots (program_day_id, position, movement_id, is_key_lift, progression_rule, rest_seconds)
  values (v_day_a, 1, v_incline, true, 'per_set', 150) returning id into v_slot_incline;
  insert into public.set_prescriptions (slot_id, position, rep_min, rep_max, load_rule, load_value) values
    (v_slot_incline, 1, 4, 6, 'none', null), (v_slot_incline, 2, 6, 8, 'percent', -10),
    (v_slot_incline, 3, 8, 10, 'percent', -10);
  insert into public.slot_alternatives (slot_id, movement_id, position, reason)
  values (v_slot_incline, v_incline_db, 1, 'stagnation');

  insert into public.slots (program_day_id, position, movement_id, is_key_lift, progression_rule, rest_seconds)
  values (v_day_a, 2, v_pullups, true, 'per_set', 120) returning id into v_slot_pullups;
  insert into public.set_prescriptions (slot_id, position, rep_min, rep_max, load_rule, load_value) values
    (v_slot_pullups, 1, 4, 6, 'none', null), (v_slot_pullups, 2, 6, 8, 'percent', -10),
    (v_slot_pullups, 3, 8, 10, 'percent', -10);

  -- Straight sets
  insert into public.slots (program_day_id, position, movement_id, progression_rule, rest_seconds)
  values (v_day_a, 3, v_curl, 'all_sets', 90) returning id into v_slot;
  insert into public.set_prescriptions (slot_id, position, rep_min, rep_max, load_rule)
  select v_slot, g, 8, 12, case when g = 1 then 'none'::public.load_rule else 'same' end from generate_series(1, 3) g;

  insert into public.slots (program_day_id, position, movement_id, is_key_lift, progression_rule, rest_seconds)
  values (v_day_b, 1, v_squat, true, 'all_sets', 120) returning id into v_slot;
  insert into public.set_prescriptions (slot_id, position, rep_min, rep_max, load_rule)
  select v_slot, g, 6, 10, case when g = 1 then 'none'::public.load_rule else 'same' end from generate_series(1, 3) g;

  for v_week in 1..3 loop
    -- created_at follows the session date so "last performance" lookups see a real history
    v_date := now() - make_interval(days => 21 - v_week * 7);
    insert into public.sessions (owner_id, program_day_id, label, date_session, body_weight, is_done, comment, created_at)
    values (v_uid, v_day_a, 'Haut A', v_date, 80, true, case when v_week = 3 then 'Bonne séance' end, v_date)
    returning id into v_session;

    insert into public.logged_exercises (owner_id, session_id, movement_id, slot_id, created_at)
    values (v_uid, v_session, v_incline, v_slot_incline, v_date) returning id into v_exercise;
    insert into public.logged_sets (logged_exercise_id, set_order, weight, reps)
    values (v_exercise, 1, 50 + v_week * 5, 6), (v_exercise, 2, 50, 8), (v_exercise, 3, 45, 10);

    insert into public.logged_exercises (owner_id, session_id, movement_id, slot_id, comment, created_at)
    values (v_uid, v_session, v_pullups, v_slot_pullups, 'Prise large', v_date) returning id into v_exercise;
    insert into public.logged_sets (logged_exercise_id, set_order, weight, reps)
    values (v_exercise, 1, v_week * 5, 6), (v_exercise, 2, 0, 8), (v_exercise, 3, 0, 8);
  end loop;
end $$;
