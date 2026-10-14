-- Données de référence (portées depuis apps/api/constants/*.js) + clé de définition sur exercise_types.

create table public.default_exercise_types (
  key text primary key,
  name text not null,
  advice text,
  timer_seconds integer not null,
  rep_range_1 text not null,
  rep_range_2 text not null,
  rep_range_3 text not null,
  rep_range_4 text,
  session_types public.session_type[] not null default '{}',
  trophy_locked boolean not null default false,
  sort_order integer not null
);

create table public.default_program_exercises (
  session_type public.session_type not null,
  position integer not null,
  exercise_key text not null references public.default_exercise_types (key),
  alternative_keys text[] not null default '{}',
  primary key (session_type, position)
);

create table public.trophy_definitions (
  exercise_key text not null references public.default_exercise_types (key),
  level integer not null,
  trophy_type text not null,
  weight_multiplier numeric not null,
  reps_goal integer not null,
  description text not null,
  reward_text text,
  primary key (exercise_key, level)
);

-- Lecture seule pour les utilisateurs connectés, écriture réservée aux migrations
alter table public.default_exercise_types enable row level security;
alter table public.default_program_exercises enable row level security;
alter table public.trophy_definitions enable row level security;
create policy default_exercise_types_read on public.default_exercise_types for select to authenticated using (true);
create policy default_program_exercises_read on public.default_program_exercises for select to authenticated using (true);
create policy trophy_definitions_read on public.trophy_definitions for select to authenticated using (true);

insert into public.default_exercise_types (key, name, advice, timer_seconds, rep_range_1, rep_range_2, rep_range_3, rep_range_4, session_types, trophy_locked, sort_order) values
  ('Rowing bucheron', 'Rowing bucheron', '1 min gauche puis 1 min droite', 60, '8-12', '8-12', '8-12', null, '{"Upper A"}'::public.session_type[], false, 1),
  ('Développé incliné - Barre', 'Développé incliné - Barre', 'Top set puis -10% du poids à chaque série', 150, '4-6', '6-8', '8-10', null, '{"Séance A","Upper A"}'::public.session_type[], true, 2),
  ('Leg Extension', 'Leg Extension', '30" de chaque avec Leg Curl', 30, '8-12', '8-12', '8-12', null, '{"Lower"}'::public.session_type[], false, 3),
  ('Développé couché - Haltères', 'Développé couché - Haltères', 'Top set puis -10% du poids à chaque série', 120, '4-6', '6-8', '8-10', null, '{"Upper B"}'::public.session_type[], false, 4),
  ('Fentes Bulgare - Haltères', 'Fentes Bulgare - Haltères', '', 90, '10-15', '10-15', '10-15', null, '{"Lower"}'::public.session_type[], false, 5),
  ('Tractions lestées', 'Tractions lestées', 'Top set puis 10% du poids à chaque série', 120, '4-6', '6-8', '8-10', null, '{"Upper A"}'::public.session_type[], true, 6),
  ('Élévation frontale - Poulie vis-à-vis', 'Élévation frontale - Poulie vis-à-vis', 'Pic de contraction 2" en haut', 90, '10-15', '10-15', '10-15', null, '{"Upper A"}'::public.session_type[], false, 7),
  ('Romanian Deadlift - Haltères', 'Romanian Deadlift - Haltères', '', 90, '10-15', '10-15', '10-15', null, '{"Lower","Séance B"}'::public.session_type[], false, 8),
  ('Fentes - Barre', 'Fentes - Barre', '', 90, '10-15', '10-15', '10-15', null, '{"Lower"}'::public.session_type[], false, 9),
  ('Fentes - Haltères', 'Fentes - Haltères', '', 90, '10-15', '10-15', '10-15', null, '{"Lower"}'::public.session_type[], false, 10),
  ('Développé couché - Barre', 'Développé couché - Barre', 'Top set puis -10% du poids à chaque série', 120, '4-6', '6-8', '8-10', null, '{"Upper B"}'::public.session_type[], true, 11),
  ('Tractions Neutres', 'Tractions Neutres', 'Tirer avec les bras, pas avec le dos', 90, '8-12', '8-12', '8-12', null, '{"Upper B"}'::public.session_type[], false, 12),
  ('Face Pull - Poulie Haute', 'Face Pull - Poulie Haute', '', 60, '15-20', '15-20', '15-20', null, '{"Upper B"}'::public.session_type[], false, 13),
  ('Face Pull - Rotation', 'Face Pull - Rotation', '', 60, '10-15', '10-15', '10-15', null, '{"Upper B"}'::public.session_type[], false, 14),
  ('Développé incliné - Haltères', 'Développé incliné - Haltères', 'Top set puis 10% du poids à chaque série', 150, '4-6', '6-8', '8-10', null, '{"Upper A","Séance A"}'::public.session_type[], false, 15),
  ('Curl Incliné - Barre EZ', 'Curl Incliné - Barre EZ', '', 90, '8-12', '8-12', '8-12', null, '{"Upper A","Séance A"}'::public.session_type[], false, 16),
  ('Élévation latérales - Haltères', 'Élévation latérales - Haltères', 'Raptor Set: Dernière série en dégressive mécanique -> Upright Row', 60, '15-20', '10-15', '8-10', null, '{"Upper A"}'::public.session_type[], false, 17),
  ('Dead Lift - Trap Bar', 'Dead Lift - Trap Bar', '', 120, '6-10', '6-10', '6-10', null, '{"Lower"}'::public.session_type[], false, 18),
  ('Mollets - Barre Guidée', 'Mollets - Barre Guidée', 'Tempo 1-2-2-1', 60, '12-15', '8-12', '6-10', null, '{"Lower"}'::public.session_type[], false, 19),
  ('Overhead Press - Barre', 'Overhead Press - Barre', 'Top set puis -10% du poids à chaque série', 150, '4-6', '6-8', '8-10', null, '{"Upper B"}'::public.session_type[], true, 20),
  ('Curl Marteau - Haltères', 'Curl Marteau - Haltères', '', 90, '8-12', '8-12', '8-12', null, '{"Upper B"}'::public.session_type[], false, 21),
  ('Élévation frontale - Haltères', 'Élévation frontale - Haltères', 'Pic de contraction 2" en haut', 90, '10-15', '10-15', '10-15', null, '{"Upper A"}'::public.session_type[], false, 22),
  ('Curl Incliné - Haltères', 'Curl Incliné - Haltères', 'Viser épaule avec petit doigt', 90, '8-12', '8-12', '8-12', null, '{"Upper A"}'::public.session_type[], false, 23),
  ('Curl Incliné - Poulie', 'Curl Incliné - Poulie', '', 60, '8-12', '8-12', '8-12', null, '{"Upper A"}'::public.session_type[], false, 24),
  ('Squat - Barre', 'Squat - Barre', '', 120, '6-10', '6-10', '6-10', null, '{"Lower"}'::public.session_type[], false, 25),
  ('Press', 'Press', '75kg à vide', 120, '6-10', '6-10', '6-10', null, '{"Lower"}'::public.session_type[], false, 26),
  ('Leg Curl', 'Leg Curl', '30" de chaque avec Leg Extension', 30, '8-12', '8-12', '8-12', null, '{"Lower"}'::public.session_type[], false, 27),
  ('Upright Row Penché', 'Upright Row Penché', 'Augmenter le poids à chaque série. Dernière série dégressive AMRAP', 60, '15-20', '10-15', '6-10', null, '{"Lower"}'::public.session_type[], false, 28),
  ('Développé assis - Haltères', 'Développé assis - Haltères', 'Top set puis -10% du poids à chaque série', 150, '4-6', '6-8', '8-10', null, '{"Upper B"}'::public.session_type[], false, 29),
  ('Oiseau assis - Haltères', 'Oiseau assis - Haltères', 'Coudes perpendiculaires au corps', 60, '10-15', '10-15', '10-15', null, '{"Upper B"}'::public.session_type[], false, 30),
  ('Upright Row - Haltères', 'Upright Row - Haltères', 'Augmenter le poids à chaque série. Dernière série dégressive AMRAP', 60, '12-15', '8-12', '6-10', null, '{"Upper B"}'::public.session_type[], false, 31),
  ('Tractions lestées prise neutre - Séance A', 'Tractions lestées prise neutre - Séance A', 'Top set puis -10% du poids à chaque série', 120, '4-6', '6-8', '8-10', null, '{"Séance A"}'::public.session_type[], false, 32),
  ('ATG Split Squat - Haltères', 'ATG Split Squat - Haltères', '45 secondes de chaque côté', 45, '10-15', '10-15', '10-15', null, '{"Séance A"}'::public.session_type[], false, 33),
  ('Upright Row - Haltères - Séance A', 'Upright Row - Haltères - Séance A', '', 60, '10-15', '10-15', '10-15', null, '{"Séance A"}'::public.session_type[], false, 34),
  ('Curl Incliné - Haltères - Séance A', 'Curl Incliné - Haltères - Séance A', '1 mega série - 10s entre chaque - 4 séries', 10, '10-15', '4-6', '4-6', null, '{"Séance A"}'::public.session_type[], false, 35),
  ('Dips lestées', 'Dips lestées', 'Top set puis -10% du poids à chaque série', 150, '4-6', '6-8', '8-10', null, '{"Séance B"}'::public.session_type[], false, 36),
  ('Rowing Bucheron - Haltères', 'Rowing Bucheron - Haltères', 'Top set puis -10% du poids à chaque série - 1min de chaque côté', 60, '4-6', '6-8', '8-10', null, '{"Séance B"}'::public.session_type[], false, 37),
  ('Romanian Deadlift - Barre', 'Romanian Deadlift - Barre', 'Rétraction, menton sur la clavicule et s''arreter en dessous des genoux', 90, '10-15', '10-15', '10-15', null, '{"Séance B","Lower"}'::public.session_type[], false, 38),
  ('Upright Row - Haltères - Séance B', 'Upright Row - Haltères - Séance B', '', 60, '10-15', '10-15', '10-15', null, '{"Séance B"}'::public.session_type[], false, 39),
  ('Extension Triceps Nuque - Haltères', 'Extension Triceps Nuque - Haltères', '1 mega série - 10s entre chaque - 4 séries', 10, '10-15', '4-6', '4-6', null, '{"Séance B"}'::public.session_type[], false, 40);

-- Ignorés car absents des types par défaut (déjà ignorés par l'ancienne API) : Mollets - Barre, Mollets - Leg Press, Tractions lestées prise neutre, Dips lestés
insert into public.default_program_exercises (session_type, position, exercise_key, alternative_keys) values
  ('Upper A', 1, 'Développé incliné - Barre', '{"Développé incliné - Haltères"}'::text[]),
  ('Upper A', 2, 'Tractions lestées', '{"Rowing Bucheron - Haltères"}'::text[]),
  ('Upper A', 3, 'Élévation frontale - Haltères', '{}'::text[]),
  ('Upper A', 4, 'Curl Incliné - Haltères', '{"Curl Incliné - Barre EZ","Curl Incliné - Poulie"}'::text[]),
  ('Upper A', 5, 'Élévation latérales - Haltères', '{}'::text[]),
  ('Lower', 1, 'Squat - Barre', '{}'::text[]),
  ('Lower', 2, 'Press', '{"Dead Lift - Trap Bar","Fentes - Haltères","Fentes - Barre","Romanian Deadlift - Haltères"}'::text[]),
  ('Lower', 3, 'Leg Curl', '{}'::text[]),
  ('Lower', 4, 'Leg Extension', '{}'::text[]),
  ('Lower', 5, 'Mollets - Barre Guidée', '{}'::text[]),
  ('Lower', 6, 'Upright Row Penché', '{}'::text[]),
  ('Upper B', 1, 'Overhead Press - Barre', '{"Développé assis - Haltères"}'::text[]),
  ('Upper B', 2, 'Développé couché - Barre', '{"Développé couché - Haltères"}'::text[]),
  ('Upper B', 3, 'Tractions Neutres', '{"Curl Marteau - Haltères"}'::text[]),
  ('Upper B', 4, 'Oiseau assis - Haltères', '{"Face Pull - Poulie Haute","Face Pull - Rotation"}'::text[]),
  ('Upper B', 5, 'Upright Row - Haltères', '{}'::text[]),
  ('Séance A', 1, 'Développé incliné - Barre', '{"Développé incliné - Haltères"}'::text[]),
  ('Séance A', 2, 'Tractions lestées', '{}'::text[]),
  ('Séance A', 3, 'ATG Split Squat - Haltères', '{}'::text[]),
  ('Séance A', 4, 'Upright Row - Haltères', '{}'::text[]),
  ('Séance A', 5, 'Curl Incliné - Haltères', '{"Curl Incliné - Barre EZ","Curl Incliné - Poulie"}'::text[]),
  ('Séance B', 1, 'Rowing Bucheron - Haltères', '{}'::text[]),
  ('Séance B', 2, 'Romanian Deadlift - Barre', '{}'::text[]),
  ('Séance B', 3, 'Upright Row - Haltères', '{}'::text[]),
  ('Séance B', 4, 'Extension Triceps Nuque - Haltères', '{}'::text[]);

insert into public.trophy_definitions (exercise_key, level, trophy_type, weight_multiplier, reps_goal, description, reward_text) values
  ('Overhead Press - Barre', 1, 'silver', 0.5, 10, '50% du poids de corps', 'Congrats!'),
  ('Overhead Press - Barre', 2, 'gold', 0.6, 10, '60% du poids de corps', 'Amazing!'),
  ('Overhead Press - Barre', 3, 'platinum', 0.7, 10, '70% du poids de corps', 'Awesome!'),
  ('Overhead Press - Barre', 4, 'diamond', 0.8, 10, '80% du poids de corps', 'Fantastic!'),
  ('Overhead Press - Barre', 5, 'master', 0.9, 10, '90% du poids de corps', 'Outstanding!'),
  ('Overhead Press - Barre', 6, 'challenger', 1, 10, '100% du poids de corps', 'Unbelievable!'),
  ('Tractions lestées', 1, 'silver', 0, 5, 'Poids de corps', 'Great job!'),
  ('Tractions lestées', 2, 'gold', 0.1, 5, 'Poids de corps +10%', 'Keep going!'),
  ('Tractions lestées', 3, 'platinum', 0.2, 5, 'Poids de corps +20%', 'Superb!'),
  ('Tractions lestées', 4, 'diamond', 0.3, 5, 'Poids de corps +30%', 'Remarkable!'),
  ('Tractions lestées', 5, 'master', 0.4, 5, 'Poids de corps +40%', 'Exceptional!'),
  ('Tractions lestées', 6, 'grand master', 0.5, 5, 'Poids de corps +50%', 'Incredible!'),
  ('Tractions lestées', 7, 'challenger', 0.6, 5, 'Poids de corps +60%', 'Phenomenal!'),
  ('Développé incliné - Barre', 1, 'silver', 0.6, 5, '60% du poids de corps', 'Well done!'),
  ('Développé incliné - Barre', 2, 'gold', 0.75, 5, '75% du poids de corps', 'Excellent!'),
  ('Développé incliné - Barre', 3, 'platinum', 0.9, 5, '90% du poids de corps', 'Super!'),
  ('Développé incliné - Barre', 4, 'diamond', 1.05, 5, '105% du poids de corps', 'Fantastic!'),
  ('Développé incliné - Barre', 5, 'master', 1.2, 5, '120% du poids de corps', 'Terrific!'),
  ('Développé incliné - Barre', 6, 'grand master', 1.35, 5, '135% du poids de corps', 'Amazing!'),
  ('Développé incliné - Barre', 7, 'challenger', 1.5, 5, '150% du poids de corps', 'Unstoppable!'),
  ('Développé couché - Barre', 1, 'silver', 0.6, 5, '60% du poids du corps', 'Nice work!'),
  ('Développé couché - Barre', 2, 'gold', 0.8, 5, '80% du poids de corps', 'Great job!'),
  ('Développé couché - Barre', 3, 'platinum', 1, 5, '100% du poids de corps', 'Excellent!'),
  ('Développé couché - Barre', 4, 'diamond', 1.2, 5, '120% du poids de corps', 'Fantastic!'),
  ('Développé couché - Barre', 5, 'master', 1.4, 5, '140% du poids de corps', 'Awesome!'),
  ('Développé couché - Barre', 6, 'grand master', 1.6, 5, '160% du poids de corps', 'Unbelievable!'),
  ('Développé couché - Barre', 7, 'challenger', 1.8, 5, '180% du poids de corps', 'Incredible!');

-- Lien stable entre un type d'exercice utilisateur et sa définition (survit au renommage)
alter table public.exercise_types add column definition_key text references public.default_exercise_types (key) on delete set null;
update public.exercise_types et set definition_key = et.name where exists (select 1 from public.default_exercise_types d where d.key = et.name);
create index exercise_types_definition_key_idx on public.exercise_types (definition_key);
