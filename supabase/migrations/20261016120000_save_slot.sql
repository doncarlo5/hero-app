-- Slot editor: saves a slot's settings and its set prescriptions in one transaction.
-- * p_slot: progression_rule, rest_seconds, rest_per_side, tempo, note, is_key_lift, and superset_with
--   (another slot of the same day, or null to leave the superset). Pairing reuses the partner's group or
--   opens a new one; a group left with a single slot is dissolved.
-- * p_sets: the prescriptions in order ({rep_min, rep_max, load_rule, load_value, rest_seconds, label}).
--   The first set has no load rule; the others default to "same".

create function public.save_slot(p_slot_id uuid, p_slot jsonb, p_sets jsonb)
returns uuid language plpgsql set search_path = '' as $$
declare
  v_day uuid;
  v_partner uuid := nullif(p_slot ->> 'superset_with', '')::uuid;
  v_group smallint;
begin
  if (select auth.uid()) is null then
    raise exception 'Not authenticated' using errcode = '28000';
  end if;
  if not private.owns_slot(p_slot_id) then
    raise exception 'Slot not found' using errcode = 'P0002';
  end if;
  if p_slot is null or jsonb_typeof(p_slot) <> 'object' then
    raise exception 'Slot settings must be an object' using errcode = '22023';
  end if;
  if p_sets is null or jsonb_typeof(p_sets) <> 'array'
     or jsonb_array_length(p_sets) not between 1 and 20 then
    raise exception 'Between 1 and 20 sets are required' using errcode = '22023';
  end if;
  if exists (
    select 1 from jsonb_array_elements(p_sets) e
    where jsonb_typeof(e) <> 'object'
       or coalesce(jsonb_typeof(e -> 'rep_min'), 'null') not in ('number', 'null')
       or coalesce(jsonb_typeof(e -> 'rep_max'), 'null') not in ('number', 'null')
       or coalesce(jsonb_typeof(e -> 'load_value'), 'null') not in ('number', 'null')
       or coalesce(jsonb_typeof(e -> 'rest_seconds'), 'null') not in ('number', 'null')
       or coalesce(e ->> 'load_rule', 'same') not in ('none', 'same', 'percent', 'step')
       or (e ->> 'rep_min')::numeric < 0
       or (e ->> 'rep_min')::numeric <> trunc((e ->> 'rep_min')::numeric)
       or (e ->> 'rep_max')::numeric <> trunc((e ->> 'rep_max')::numeric)
       or (e ->> 'rep_max')::numeric < (e ->> 'rep_min')::numeric
       or (e ->> 'rest_seconds')::numeric < 0
  ) then
    raise exception 'Each set needs integer reps (min <= max), a valid load rule and a rest >= 0'
      using errcode = '22023';
  end if;
  if coalesce(p_slot ->> 'progression_rule', 'all_sets') not in ('per_set', 'all_sets', 'manual')
     or coalesce(jsonb_typeof(p_slot -> 'rest_seconds'), 'null') not in ('number', 'null')
     or (p_slot ->> 'rest_seconds')::numeric < 0 then
    raise exception 'Invalid progression rule or rest' using errcode = '22023';
  end if;

  select program_day_id into v_day from public.slots where id = p_slot_id;

  if v_partner is not null then
    if v_partner = p_slot_id or not exists (
      select 1 from public.slots where id = v_partner and program_day_id = v_day
    ) then
      raise exception 'The superset partner must be another slot of the same day' using errcode = '22023';
    end if;
    select superset_group into v_group from public.slots where id = v_partner;
    if v_group is null then
      select coalesce(max(superset_group), 0) + 1 into v_group
      from public.slots where program_day_id = v_day;
      update public.slots set superset_group = v_group where id = v_partner;
    end if;
  end if;

  update public.slots
  set progression_rule = coalesce((p_slot ->> 'progression_rule')::public.progression_rule, progression_rule),
      rest_seconds = (p_slot ->> 'rest_seconds')::int,
      rest_per_side = coalesce((p_slot ->> 'rest_per_side')::boolean, false),
      is_key_lift = coalesce((p_slot ->> 'is_key_lift')::boolean, is_key_lift),
      tempo = nullif(trim(p_slot ->> 'tempo'), ''),
      note = nullif(trim(p_slot ->> 'note'), ''),
      superset_group = v_group
  where id = p_slot_id;

  -- A superset needs two slots
  update public.slots s
  set superset_group = null
  where s.program_day_id = v_day
    and s.superset_group is not null
    and (select count(*) from public.slots o
         where o.program_day_id = v_day and o.superset_group = s.superset_group) = 1;

  delete from public.set_prescriptions where slot_id = p_slot_id;
  insert into public.set_prescriptions (slot_id, position, rep_min, rep_max, load_rule, load_value, rest_seconds, label)
  select p_slot_id, x.ord::int, (x.e ->> 'rep_min')::int, (x.e ->> 'rep_max')::int,
         case when x.ord = 1 then 'none' else coalesce(x.e ->> 'load_rule', 'same') end::public.load_rule,
         case when x.ord = 1 then null else (x.e ->> 'load_value')::numeric end,
         (x.e ->> 'rest_seconds')::int,
         nullif(trim(x.e ->> 'label'), '')
  from jsonb_array_elements(p_sets) with ordinality as x(e, ord);

  return p_slot_id;
end;
$$;

revoke execute on function public.save_slot(uuid, jsonb, jsonb) from public, anon;
grant execute on function public.save_slot(uuid, jsonb, jsonb) to authenticated;
