-- Default movements are shipped content and must stay generic (AGENTS.md): drop the four named after
-- a specific program's sessions. New users no longer get them; existing copies are the user's data and
-- stay (none has ever been logged, used in a slot or an alternative, or earned a trophy).
delete from public.default_exercise_types
where key in (
  'Tractions lestées prise neutre - Séance A',
  'Upright Row - Haltères - Séance A',
  'Curl Incliné - Haltères - Séance A',
  'Upright Row - Haltères - Séance B'
);
