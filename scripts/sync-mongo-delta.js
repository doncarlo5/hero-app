#!/usr/bin/env node
// Final Mongo → Supabase delta sync, run right before the Supabase build of the mobile app ships.
// Copies what the store app wrote to MongoDB Atlas since the original copy (2026-04-06):
// users (profiles), exercise types, sessions, exercise users + sets, programs, feedbacks.
// Trophies are not copied: the Supabase triggers evaluate them from the copied sets.
//
// Safe to re-run: Mongo documents are matched to existing rows by owner + created_at
// (the first copy kept Mongo's timestamps), exercise types also by name, programs by session type.
// A matched row is only updated when its content differs and Mongo holds the newer version.
//
// Usage:
//   SUPABASE_DB_URL=postgresql://... node scripts/sync-mongo-delta.js --dry-run
//   SUPABASE_DB_URL=postgresql://... node scripts/sync-mongo-delta.js --yes
// Options: --dry-run (read-only transaction, prints what would change), --since=YYYY-MM-DD,
//          --yes (required to write to a non-local database).
// MONGODB_URI comes from the root .env (or the environment); SUPABASE_DB_URL is never stored.

require("../apps/api/config/load-env");
const crypto = require("crypto");
const { MongoClient } = require("mongodb");
const { Client } = require("pg");

// Before the original copy: overlap is harmless since existing rows are matched and skipped
const DEFAULT_SINCE = "2026-03-01";
const TABLES = ["profiles", "exercise_types", "sessions", "exercise_users", "exercise_sets", "programs", "feedbacks"];

const ms = (d) => (d ? new Date(d).getTime() : null);
const text = (s) => (s == null || s === "" ? null : String(s));
const sameJson = (a, b) => JSON.stringify(a) === JSON.stringify(b);
const isLocalHost = (url) => ["localhost", "127.0.0.1", "[::1]"].includes(new URL(url).hostname);

function parseArgs(argv) {
  const args = { dryRun: false, yes: false, since: DEFAULT_SINCE };
  for (const a of argv) {
    if (a === "--dry-run") args.dryRun = true;
    else if (a === "--yes") args.yes = true;
    else if (a.startsWith("--since=")) args.since = a.slice("--since=".length);
    else throw new Error(`Unknown option ${a}`);
  }
  if (Number.isNaN(new Date(args.since).getTime())) throw new Error(`Invalid --since ${args.since}`);
  return args;
}

function groupBy(rows, keyFn) {
  const map = new Map();
  for (const r of rows) {
    const k = keyFn(r);
    if (!map.has(k)) map.set(k, []);
    map.get(k).push(r);
  }
  return map;
}

// Index of Supabase rows by created_at. Rows created in bulk (default exercise types, sign-up data)
// share the same millisecond, so a timestamp alone does not identify a row: take() only returns a row
// that `prefer` accepts, or the only unclaimed row at that timestamp. A row is never returned twice.
function createdAtIndex(rows, claimed = new Set()) {
  const byCreated = groupBy(rows, (r) => ms(r.created_at));
  return {
    claimed,
    take(createdMs, prefer, { allowSingle = true } = {}) {
      const candidates = (byCreated.get(createdMs) || []).filter((r) => !claimed.has(r.id));
      const match = candidates.find(prefer) ?? (allowSingle && candidates.length === 1 ? candidates[0] : null);
      if (match) claimed.add(match.id);
      return match ?? null;
    },
  };
}

// Mongo arrays weight[] / rep[] → one row per set, set_order from 1
function mongoSets(doc) {
  const weights = doc.weight || [];
  const reps = doc.rep || [];
  const sets = [];
  for (let i = 0; i < Math.min(weights.length, reps.length); i++) {
    if (reps[i] == null) continue;
    sets.push({ weight: Number(weights[i] ?? 0), reps: Math.round(Number(reps[i])) });
  }
  return sets;
}

// ---------------------------------------------------------------------------
// Supabase state

const SELECTS = {
  types: `
    select id, owner_id, name, advice, timer_seconds, rep_range_1, rep_range_2, rep_range_3, rep_range_4,
           session_types::text[] as session_types, trophy_locked, created_at, updated_at,
           updated_at = created_at as untouched
    from public.exercise_types`,
  sessions: `
    select id, owner_id, date_session, type_session::text as type_session, body_weight::float8 as body_weight,
           is_done, comment, created_at, updated_at, updated_at = created_at as untouched
    from public.sessions`,
  exerciseUsers: `
    select eu.id, eu.owner_id, eu.type_id, eu.session_id, eu.comment, eu.created_at, eu.updated_at,
           eu.updated_at = eu.created_at as untouched,
           coalesce((select json_agg(json_build_object('weight', s.weight::float8, 'reps', s.reps) order by s.set_order)
                     from public.exercise_sets s where s.exercise_user_id = eu.id), '[]') as sets
    from public.exercise_users eu`,
  programs: `
    select p.id, p.owner_id, p.session_type::text as session_type, p.created_at, p.updated_at,
           p.updated_at = p.created_at as untouched,
           coalesce((select json_agg(json_build_object(
                       'type', pe.exercise_type_id,
                       'alts', coalesce((select json_agg(a.exercise_type_id order by a.position)
                                         from public.program_exercise_alternatives a
                                         where a.program_exercise_id = pe.id), '[]'))
                     order by pe."order", pe.created_at, pe.id)
                     from public.program_exercises pe where pe.program_id = p.id), '[]') as exercises
    from public.programs p`,
  feedbacks: `
    select id, owner_id, subject, message, created_at, updated_at, updated_at = created_at as untouched
    from public.feedbacks`,
};

async function loadOwnerState(pg, ownerId) {
  const state = {};
  for (const [name, sql] of Object.entries(SELECTS)) {
    const alias = name === "exerciseUsers" ? "eu." : name === "programs" ? "p." : "";
    const { rows } = await pg.query(`${sql} where ${alias}owner_id = $1`, [ownerId]);
    state[name] = rows;
  }
  return state;
}

async function loadAllState(pg) {
  const byOwner = new Map();
  for (const [name, sql] of Object.entries(SELECTS)) {
    const { rows } = await pg.query(sql);
    for (const r of rows) {
      if (!byOwner.has(r.owner_id)) byOwner.set(r.owner_id, emptyState());
      byOwner.get(r.owner_id)[name].push(r);
    }
  }
  return byOwner;
}

const emptyState = () => ({ types: [], sessions: [], exerciseUsers: [], programs: [], feedbacks: [] });

// Dry run: what private.setup_user would create for a user without profile
function simulateSetup(defaults) {
  const now = new Date();
  const idByKey = new Map();
  const types = defaults.types.map((d) => {
    const id = crypto.randomUUID();
    idByKey.set(d.key, id);
    return { ...d, id, created_at: now, updated_at: now, untouched: true };
  });
  const programs = [...groupBy(defaults.programs, (p) => p.session_type)].map(([sessionType, rows]) => ({
    id: crypto.randomUUID(),
    session_type: sessionType,
    created_at: now,
    updated_at: now,
    untouched: true,
    exercises: rows
      .filter((r) => idByKey.has(r.exercise_key))
      .map((r) => ({
        type: idByKey.get(r.exercise_key),
        alts: r.alternative_keys.filter((k) => idByKey.has(k)).map((k) => idByKey.get(k)),
      })),
  }));
  return { ...emptyState(), types, programs };
}

// ---------------------------------------------------------------------------
// Sync

async function run({ mongoUri, supabaseDbUrl, dryRun = false, since = DEFAULT_SINCE, log = console.log }) {
  const sinceMs = new Date(since).getTime();
  const touched = (doc) => ms(doc.createdAt) >= sinceMs || ms(doc.updatedAt) >= sinceMs;
  // Mongo wins when the Supabase row was never edited in Supabase, or is older than the Mongo version
  const mongoWins = (row, doc) => row.untouched || ms(doc.updatedAt) > ms(row.updated_at);

  const stats = Object.fromEntries(TABLES.map((t) => [t, { inserted: 0, updated: 0, unchanged: 0 }]));
  const skipped = { orphanOwner: 0, ownerWithoutAuthUser: 0, missingExerciseType: 0, missingSessionRef: 0 };
  const warnings = [];

  const mongo = await MongoClient.connect(mongoUri);
  const pg = new Client({ connectionString: supabaseDbUrl });
  await pg.connect();
  try {
    const db = mongo.db();
    const [users, mTypes, mSessions, mExerciseUsers, mPrograms, mFeedbacks] = await Promise.all(
      ["users", "exercisetypes", "sessions", "exerciseusers", "programs", "feedbacks"].map((c) =>
        db.collection(c).find({}).toArray(),
      ),
    );

    await pg.query(dryRun ? "begin transaction read only" : "begin");

    const authIds = new Set((await pg.query("select id from auth.users")).rows.map((r) => r.id));
    const profiles = new Map(
      (await pg.query("select id, first_name, last_name, has_seen_onboarding from public.profiles")).rows.map((r) => [
        r.id,
        r,
      ]),
    );
    const defaults = {
      types: (
        await pg.query(`select key, name, advice, timer_seconds, rep_range_1, rep_range_2, rep_range_3, rep_range_4,
                               session_types::text[] as session_types, trophy_locked, key as definition_key
                        from public.default_exercise_types order by sort_order`)
      ).rows,
      programs: (
        await pg.query(`select session_type::text as session_type, exercise_key, alternative_keys
                        from public.default_program_exercises order by session_type, position`)
      ).rows,
    };
    const stateByOwner = await loadAllState(pg);

    const mongoUserIds = new Set(users.map((u) => String(u._id)));
    const docsByOwner = (docs) => groupBy(docs, (d) => String(d.owner));
    const typesByOwner = docsByOwner(mTypes);
    const sessionsByOwner = docsByOwner(mSessions);
    const exerciseUsersByOwner = docsByOwner(mExerciseUsers);
    const programsByOwner = docsByOwner(mPrograms);
    const feedbacksByOwner = docsByOwner(mFeedbacks);

    // Documents whose owner no longer exists in Mongo: skipped, as in the first copy
    for (const docs of [mTypes, mSessions, mExerciseUsers, mPrograms, mFeedbacks]) {
      skipped.orphanOwner += docs.filter((d) => touched(d) && !mongoUserIds.has(String(d.owner))).length;
    }

    for (const user of users) {
      const mongoId = String(user._id);
      const uid = user.supabaseId;
      const owned = [typesByOwner, sessionsByOwner, exerciseUsersByOwner, programsByOwner, feedbacksByOwner].map(
        (m) => m.get(mongoId) || [],
      );

      if (!uid || !authIds.has(uid)) {
        const pending = owned.flat().filter(touched).length;
        if (touched(user) || pending > 0) {
          skipped.ownerWithoutAuthUser += pending;
          warnings.push(
            `user ${mongoId}: no Supabase auth user (${uid ? "unknown supabaseId" : "no supabaseId"}), ${pending} document(s) skipped`,
          );
        }
        continue;
      }
      const [uTypes, uSessions, uExerciseUsers, uPrograms, uFeedbacks] = owned;

      // Profile ---------------------------------------------------------------
      let state;
      let profile = profiles.get(uid);
      const created = !profile;
      if (created) {
        // Same path as a sign-up: profile (names from the auth metadata), default types, programs, trophies
        stats.profiles.inserted++;
        if (dryRun) {
          state = simulateSetup(defaults);
        } else {
          await pg.query("select private.setup_user($1)", [uid]);
          profile = (
            await pg.query("select id, first_name, last_name, has_seen_onboarding from public.profiles where id = $1", [
              uid,
            ])
          ).rows[0];
          state = await loadOwnerState(pg, uid);
        }
      } else {
        state = stateByOwner.get(uid) || emptyState();
      }
      const patch = {};
      const current = profile || { first_name: null, last_name: null, has_seen_onboarding: false };
      if (!current.first_name && text(user.firstName)) patch.first_name = text(user.firstName);
      if (!current.last_name && text(user.lastName)) patch.last_name = text(user.lastName);
      if (!current.has_seen_onboarding && user.hasSeenOnboarding) patch.has_seen_onboarding = true;
      if (Object.keys(patch).length > 0) {
        if (!created) stats.profiles.updated++;
        if (!dryRun) {
          const cols = Object.keys(patch);
          await pg.query(
            `update public.profiles set ${cols.map((c, i) => `${c} = $${i + 2}`).join(", ")} where id = $1`,
            [uid, ...cols.map((c) => patch[c])],
          );
        }
      } else if (!created && touched(user)) {
        stats.profiles.unchanged++;
      }

      // Rows referenced by documents we are about to copy must exist even if older than --since
      const exerciseUsersToSync = uExerciseUsers.filter(touched);
      const programsToSync = uPrograms.filter(touched);
      const neededTypes = new Set();
      const neededSessions = new Set();
      for (const eu of exerciseUsersToSync) {
        neededTypes.add(String(eu.type));
        if (eu.session) neededSessions.add(String(eu.session));
      }
      for (const p of programsToSync) {
        for (const e of p.exercises || []) {
          neededTypes.add(String(e.exerciseType));
          for (const a of e.alternatives || []) neededTypes.add(String(a));
        }
      }

      // Exercise types --------------------------------------------------------
      const typeMap = new Map();
      const claimed = new Set();
      const typeRow = (t) => ({
        name: t.name,
        advice: text(t.advice),
        timer_seconds: Math.round(Number(t.timer ?? 0)),
        rep_range_1: text(t.repRange1),
        rep_range_2: text(t.repRange2),
        rep_range_3: text(t.repRange3),
        rep_range_4: text(t.repRange4),
        session_types: t.type_session || [],
        trophy_locked: !!t.trophyLocked,
      });
      const sbTypeRow = (r) => ({
        name: r.name,
        advice: text(r.advice),
        timer_seconds: r.timer_seconds,
        rep_range_1: text(r.rep_range_1),
        rep_range_2: text(r.rep_range_2),
        rep_range_3: text(r.rep_range_3),
        rep_range_4: text(r.rep_range_4),
        session_types: r.session_types,
        trophy_locked: r.trophy_locked,
      });
      // Default types are created in bulk and share timestamps, so matching goes in three passes:
      // timestamp + name, then name alone, then a timestamp held by a single row (type renamed in Mongo)
      const sameName = (t) => (r) => r.name === t.name || (r.definition_key && r.definition_key === t.name);
      const typesByCreated = createdAtIndex(state.types, claimed);
      const pendingTypes = uTypes.map((t) => [
        t,
        typesByCreated.take(ms(t.createdAt), sameName(t), { allowSingle: false }),
      ]);
      for (const entry of pendingTypes) {
        if (entry[1]) continue;
        const match = state.types.find((r) => !claimed.has(r.id) && sameName(entry[0])(r));
        if (match) {
          claimed.add(match.id);
          entry[1] = match;
        }
      }
      for (const entry of pendingTypes) {
        if (!entry[1]) entry[1] = typesByCreated.take(ms(entry[0].createdAt), () => false);
        if (entry[1]) typeMap.set(String(entry[0]._id), entry[1].id);
      }
      for (const [t, match] of pendingTypes) {
        const row = typeRow(t);
        if (match) {
          if (!touched(t)) continue;
          if (!sameJson(row, sbTypeRow(match)) && mongoWins(match, t)) {
            stats.exercise_types.updated++;
            if (!dryRun) {
              await pg.query(
                `update public.exercise_types set name = $2, advice = $3, timer_seconds = $4, rep_range_1 = $5,
                   rep_range_2 = $6, rep_range_3 = $7, rep_range_4 = $8, session_types = $9::public.session_type[],
                   trophy_locked = $10 where id = $1`,
                [match.id, ...Object.values(row)],
              );
            }
          } else stats.exercise_types.unchanged++;
          continue;
        }
        if (!touched(t) && !neededTypes.has(String(t._id))) continue;
        stats.exercise_types.inserted++;
        let id = crypto.randomUUID();
        if (!dryRun) {
          // definition_key is set by the set_definition_key trigger, trophies by init_trophies
          ({ id } = (
            await pg.query(
              `insert into public.exercise_types (owner_id, name, advice, timer_seconds, rep_range_1, rep_range_2,
                 rep_range_3, rep_range_4, session_types, trophy_locked, created_at, updated_at)
               values ($1, $2, $3, $4, $5, $6, $7, $8, $9::public.session_type[], $10, $11, $12) returning id`,
              [uid, ...Object.values(row), t.createdAt || new Date(), t.updatedAt || t.createdAt || new Date()],
            )
          ).rows[0]);
        }
        typeMap.set(String(t._id), id);
      }

      // Sessions --------------------------------------------------------------
      const sessionMap = new Map();
      const sessionsByCreated = createdAtIndex(state.sessions);
      for (const s of uSessions) {
        const row = {
          date_session: ms(s.date_session),
          type_session: s.type_session,
          body_weight: Number(s.body_weight ?? 0),
          is_done: !!s.is_done,
          comment: text(s.comment),
        };
        const match = sessionsByCreated.take(
          ms(s.createdAt),
          (r) => r.type_session === row.type_session && ms(r.date_session) === row.date_session,
        );
        if (match) {
          sessionMap.set(String(s._id), match.id);
          if (!touched(s)) continue;
          const current = {
            date_session: ms(match.date_session),
            type_session: match.type_session,
            body_weight: match.body_weight,
            is_done: match.is_done,
            comment: text(match.comment),
          };
          if (!sameJson(row, current) && mongoWins(match, s)) {
            stats.sessions.updated++;
            if (!dryRun) {
              await pg.query(
                `update public.sessions set date_session = $2, type_session = $3, body_weight = $4, is_done = $5,
                   comment = $6 where id = $1`,
                [match.id, new Date(row.date_session), row.type_session, row.body_weight, row.is_done, row.comment],
              );
            }
          } else stats.sessions.unchanged++;
          continue;
        }
        if (!touched(s) && !neededSessions.has(String(s._id))) continue;
        stats.sessions.inserted++;
        let id = crypto.randomUUID();
        if (!dryRun) {
          ({ id } = (
            await pg.query(
              `insert into public.sessions (owner_id, date_session, type_session, body_weight, is_done, comment,
                 created_at, updated_at)
               values ($1, $2, $3, $4, $5, $6, $7, $8) returning id`,
              [
                uid,
                new Date(row.date_session),
                row.type_session,
                row.body_weight,
                row.is_done,
                row.comment,
                s.createdAt || new Date(),
                s.updatedAt || s.createdAt || new Date(),
              ],
            )
          ).rows[0]);
        }
        sessionMap.set(String(s._id), id);
      }

      // Exercise users + sets -------------------------------------------------
      const insertSets = async (exerciseUserId, sets) => {
        if (dryRun || sets.length === 0) return;
        await pg.query(
          `insert into public.exercise_sets (exercise_user_id, set_order, weight, reps)
           select $1, x.o, x.w, x.r from unnest($2::numeric[], $3::int[]) with ordinality as x(w, r, o)`,
          [exerciseUserId, sets.map((s) => s.weight), sets.map((s) => s.reps)],
        );
      };
      const exerciseUsersByCreated = createdAtIndex(state.exerciseUsers);
      for (const eu of exerciseUsersToSync) {
        const typeId = typeMap.get(String(eu.type));
        if (!typeId) {
          skipped.missingExerciseType++;
          warnings.push(`exercise user ${eu._id}: exercise type ${eu.type} not found, skipped`);
          continue;
        }
        let sessionId = null;
        if (eu.session) {
          sessionId = sessionMap.get(String(eu.session)) ?? null;
          if (!sessionId) {
            skipped.missingSessionRef++;
            warnings.push(`exercise user ${eu._id}: session ${eu.session} not found, copied without session`);
          }
        }
        const row = { type_id: typeId, session_id: sessionId, comment: text(eu.comment) };
        const sets = mongoSets(eu);
        const match = exerciseUsersByCreated.take(ms(eu.createdAt), (r) => r.type_id === row.type_id);
        if (!match) {
          stats.exercise_users.inserted++;
          let id = crypto.randomUUID();
          if (!dryRun) {
            ({ id } = (
              await pg.query(
                `insert into public.exercise_users (owner_id, type_id, session_id, comment, created_at, updated_at)
                 values ($1, $2, $3, $4, $5, $6) returning id`,
                [
                  uid,
                  row.type_id,
                  row.session_id,
                  row.comment,
                  eu.createdAt || new Date(),
                  eu.updatedAt || eu.createdAt || new Date(),
                ],
              )
            ).rows[0]);
          }
          stats.exercise_sets.inserted += sets.length;
          await insertSets(id, sets);
          continue;
        }
        const current = { type_id: match.type_id, session_id: match.session_id, comment: text(match.comment) };
        const rowChanged = !sameJson(row, current);
        const setsChanged = !sameJson(sets, match.sets);
        if ((rowChanged || setsChanged) && mongoWins(match, eu)) {
          stats.exercise_users.updated++;
          if (!dryRun && rowChanged) {
            await pg.query(
              "update public.exercise_users set type_id = $2, session_id = $3, comment = $4 where id = $1",
              [match.id, row.type_id, row.session_id, row.comment],
            );
          }
          if (setsChanged) {
            // Sets are replaced as a whole: counted as updated
            stats.exercise_sets.updated += sets.length;
            if (!dryRun) await pg.query("delete from public.exercise_sets where exercise_user_id = $1", [match.id]);
            await insertSets(match.id, sets);
          }
        } else stats.exercise_users.unchanged++;
      }

      // Programs --------------------------------------------------------------
      for (const p of programsToSync) {
        const seen = new Set();
        const exercises = [...(p.exercises || [])]
          .sort((a, b) => a.order - b.order)
          .map((e) => {
            const type = typeMap.get(String(e.exerciseType));
            const alts = [];
            for (const a of e.alternatives || []) {
              const id = typeMap.get(String(a));
              if (id && id !== type && !alts.includes(id)) alts.push(id);
            }
            return { type, alts };
          })
          .filter((e) => e.type && !seen.has(e.type) && seen.add(e.type));
        const match = state.programs.find((r) => r.session_type === p.sessionType);
        if (match && (sameJson(exercises, match.exercises) || !mongoWins(match, p))) {
          stats.programs.unchanged++;
          continue;
        }
        stats.programs[match ? "updated" : "inserted"]++;
        if (dryRun) continue;
        let programId = match?.id;
        if (match) {
          await pg.query("delete from public.program_exercises where program_id = $1", [programId]);
          await pg.query("update public.programs set updated_at = now() where id = $1", [programId]);
        } else {
          ({ id: programId } = (
            await pg.query(
              `insert into public.programs (owner_id, session_type, created_at, updated_at)
               values ($1, $2, $3, $4) returning id`,
              [uid, p.sessionType, p.createdAt || new Date(), p.updatedAt || p.createdAt || new Date()],
            )
          ).rows[0]);
        }
        for (const [i, e] of exercises.entries()) {
          const { id: peId } = (
            await pg.query(
              `insert into public.program_exercises (program_id, exercise_type_id, "order") values ($1, $2, $3) returning id`,
              [programId, e.type, i + 1],
            )
          ).rows[0];
          if (e.alts.length > 0) {
            await pg.query(
              `insert into public.program_exercise_alternatives (program_exercise_id, exercise_type_id, position)
               select $1, x.t, x.o from unnest($2::uuid[]) with ordinality as x(t, o)`,
              [peId, e.alts],
            );
          }
        }
      }

      // Feedbacks -------------------------------------------------------------
      const feedbacksByCreated = createdAtIndex(state.feedbacks);
      for (const f of uFeedbacks.filter(touched)) {
        const row = { subject: f.subject, message: text(f.message) };
        const match = feedbacksByCreated.take(ms(f.createdAt), (r) => r.subject === row.subject);
        if (!match) {
          stats.feedbacks.inserted++;
          if (!dryRun) {
            await pg.query(
              `insert into public.feedbacks (owner_id, subject, message, created_at, updated_at) values ($1, $2, $3, $4, $5)`,
              [uid, row.subject, row.message, f.createdAt || new Date(), f.updatedAt || f.createdAt || new Date()],
            );
          }
        } else if (!sameJson(row, { subject: match.subject, message: text(match.message) }) && mongoWins(match, f)) {
          stats.feedbacks.updated++;
          if (!dryRun)
            await pg.query("update public.feedbacks set subject = $2, message = $3 where id = $1", [
              match.id,
              row.subject,
              row.message,
            ]);
        } else stats.feedbacks.unchanged++;
      }
    }

    if (dryRun) await pg.query("rollback");
    else await pg.query("commit");
  } catch (error) {
    await pg.query("rollback").catch(() => {});
    throw error;
  } finally {
    await pg.end();
    await mongo.close();
  }

  log(
    `\n${dryRun ? "DRY RUN (read-only transaction, nothing written)" : "Committed"} — Mongo documents created or updated since ${since}\n`,
  );
  log("table            inserted  updated  unchanged");
  for (const t of TABLES) {
    const s = stats[t];
    log(
      `${t.padEnd(16)} ${String(s.inserted).padStart(8)} ${String(s.updated).padStart(8)} ${String(s.unchanged).padStart(10)}`,
    );
  }
  log("\nskipped");
  log(`  orphan documents (owner no longer in Mongo users) ${skipped.orphanOwner}`);
  log(`  documents of users without Supabase auth user     ${skipped.ownerWithoutAuthUser}`);
  log(`  exercise users with a missing exercise type       ${skipped.missingExerciseType}`);
  log(`  exercise users copied without their session       ${skipped.missingSessionRef}`);
  if (warnings.length > 0) {
    log(`\nwarnings (${warnings.length})`);
    for (const w of warnings.slice(0, 50)) log(`  ${w}`);
    if (warnings.length > 50) log(`  … ${warnings.length - 50} more`);
  }
  log("\nTrophies are evaluated by the database triggers from the copied sets.");
  return { stats, skipped, warnings };
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const mongoUri = process.env.MONGODB_URI;
  const supabaseDbUrl = process.env.SUPABASE_DB_URL;
  if (!mongoUri) throw new Error("MONGODB_URI is missing (root .env)");
  if (!supabaseDbUrl)
    throw new Error("SUPABASE_DB_URL is missing: pass the Supabase connection string in the environment");
  const target = new URL(supabaseDbUrl).hostname;
  console.log(`Mongo:    ${new URL(mongoUri).hostname}`);
  console.log(`Supabase: ${target}${args.dryRun ? " (dry run)" : ""}`);
  if (!args.dryRun && !isLocalHost(supabaseDbUrl) && !args.yes) {
    throw new Error("Writing to a non-local database: run with --dry-run first, then add --yes to write");
  }
  await run({ mongoUri, supabaseDbUrl, dryRun: args.dryRun, since: args.since });
}

if (require.main === module) {
  main().catch((error) => {
    console.error(`\n✖ ${error.message}`);
    process.exit(1);
  });
}

module.exports = { run };
