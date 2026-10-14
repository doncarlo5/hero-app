-- Local development data only (`supabase start` / `supabase db reset`). Never run against prod.
-- Test account: test@hero.local / hero-local-test

-- Auth user: the on_auth_user_created trigger creates the profile, default
-- exercise types, programs and trophies
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

-- Three past Upper A sessions (80 kg body weight); trophies are evaluated by the triggers
do $$
declare
  v_uid uuid := '11111111-1111-1111-1111-111111111111';
  v_session uuid;
  v_exercise uuid;
  v_day int;
  v_pullups uuid;
  v_incline uuid;
begin
  select id into v_pullups from public.exercise_types where owner_id = v_uid and definition_key = 'Tractions lestées';
  select id into v_incline from public.exercise_types where owner_id = v_uid and definition_key = 'Développé incliné - Barre';

  for v_day in 1..3 loop
    insert into public.sessions (owner_id, date_session, type_session, body_weight, is_done, comment)
    values (v_uid, now() - make_interval(days => 21 - v_day * 7), 'Upper A', 80, true,
            case when v_day = 3 then 'Bonne séance' end)
    returning id into v_session;

    insert into public.exercise_users (owner_id, type_id, session_id)
    values (v_uid, v_incline, v_session) returning id into v_exercise;
    insert into public.exercise_sets (exercise_user_id, set_order, weight, reps)
    values (v_exercise, 1, 50 + v_day * 5, 6), (v_exercise, 2, 50, 8), (v_exercise, 3, 45, 10);

    insert into public.exercise_users (owner_id, type_id, session_id, comment)
    values (v_uid, v_pullups, v_session, 'Prise large') returning id into v_exercise;
    insert into public.exercise_sets (exercise_user_id, set_order, weight, reps)
    values (v_exercise, 1, v_day * 5, 6), (v_exercise, 2, 0, 8), (v_exercise, 3, 0, 8);
  end loop;
end $$;
