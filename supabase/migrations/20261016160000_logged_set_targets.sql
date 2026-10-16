-- What the app proposed for each logged set, and why: kept beside what was lifted so the app can explain
-- a target ("Pourquoi cette charge ?"), compare plan and performance, and debug the progression engine.
-- * target_weight, target_rep_min, target_rep_max: the target shown when the set was done (null when none).
-- * target_reason: increase (top of the range reached last time), repeat, derived (from the previous
--   set's target) or calibration (no history).
-- save_exercise accepts the four keys on each set.

alter table public.logged_sets
  add column target_weight numeric check (target_weight >= 0),
  add column target_rep_min integer check (target_rep_min >= 0),
  add column target_rep_max integer check (target_rep_max >= target_rep_min),
  add column target_reason text check (target_reason in ('increase', 'repeat', 'derived', 'calibration'));

create or replace function public.save_exercise(
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
             and coalesce(jsonb_typeof(e -> 'completed_at'), 'string') in ('string', 'null')
            then (e ->> 'weight')::numeric < 0
              or (e ->> 'reps')::numeric < 0
              or (e ->> 'reps')::numeric <> trunc((e ->> 'reps')::numeric)
              or coalesce(e ->> 'kind', 'working') not in ('warmup', 'working', 'drop', 'cheat', 'switch', 'mini')
              or coalesce(e ->> 'side', 'left') not in ('left', 'right')
              or (e ->> 'completed_at') is not null and not pg_input_is_valid(e ->> 'completed_at', 'timestamptz')
              or coalesce(jsonb_typeof(e -> 'target_weight'), 'null') not in ('number', 'null')
              or (e ->> 'target_weight')::numeric < 0
              or coalesce(jsonb_typeof(e -> 'target_rep_min'), 'null') not in ('number', 'null')
              or coalesce(jsonb_typeof(e -> 'target_rep_max'), 'null') not in ('number', 'null')
              or coalesce(e ->> 'target_reason', 'increase') not in ('increase', 'repeat', 'derived', 'calibration')
            else true
          end
  ) then
    raise exception 'Each set needs a numeric "weight" >= 0, an integer "reps" >= 0, a valid "kind", "side" and "completed_at"'
      using errcode = '22023';
  end if;

  select coalesce(array_agg(id), '{}') into v_before
  from public.trophies where owner_id = v_uid and achieved;

  if p_id is null then
    insert into public.logged_exercises (owner_id, movement_id, session_id, slot_id, comment)
    values (v_uid, p_movement_id, p_session_id, p_slot_id, p_comment)
    returning id into v_id;
  else
    -- Insert with the id the app chose, or update it. RLS keeps another user's row out of reach.
    insert into public.logged_exercises as le (id, owner_id, movement_id, session_id, slot_id, comment)
    values (p_id, v_uid, p_movement_id, p_session_id, p_slot_id, p_comment)
    on conflict (id) do update
    set movement_id = excluded.movement_id,
        session_id = coalesce(excluded.session_id, le.session_id),
        slot_id = coalesce(excluded.slot_id, le.slot_id),
        comment = excluded.comment
    where le.owner_id = v_uid
    returning id into v_id;
    if v_id is null then
      raise exception 'Exercise not found' using errcode = 'P0002';
    end if;
    delete from public.logged_sets where logged_exercise_id = v_id;
  end if;

  insert into public.logged_sets (logged_exercise_id, set_order, kind, weight, reps, side, completed_at,
                                  target_weight, target_rep_min, target_rep_max, target_reason)
  select v_id, x.ord::int, coalesce(x.e ->> 'kind', 'working')::public.set_kind,
         (x.e ->> 'weight')::numeric, (x.e ->> 'reps')::int, (x.e ->> 'side')::public.body_side,
         (x.e ->> 'completed_at')::timestamptz,
         (x.e ->> 'target_weight')::numeric, (x.e ->> 'target_rep_min')::int,
         (x.e ->> 'target_rep_max')::int, x.e ->> 'target_reason'
  from jsonb_array_elements(p_sets) with ordinality as x(e, ord);

  select coalesce(jsonb_agg(to_jsonb(t) order by t.level), '[]'::jsonb) into v_new
  from public.trophies t
  where t.owner_id = v_uid and t.achieved and not (t.id = any (v_before));

  return jsonb_build_object('id', v_id, 'new_trophies', v_new);
end;
$$;
