// End-to-end test of sync-mongo-delta.js against LOCAL databases only:
//   supabase start
//   docker run -d --rm --name hero-delta-mongo -p 127.0.0.1:27099:27017 mongo:7
//   TEST_MONGODB_URI=mongodb://127.0.0.1:27099/hero-delta-test \
//   TEST_SUPABASE_DB_URL=postgresql://postgres:postgres@127.0.0.1:54322/postgres \
//   node --test scripts/sync-mongo-delta.test.js
// Each run creates fresh users, so it does not need a `supabase db reset`.

const assert = require("node:assert/strict");
const crypto = require("node:crypto");
const { test } = require("node:test");
const { MongoClient, ObjectId } = require("mongodb");
const { Client } = require("pg");
const { run } = require("./sync-mongo-delta");

const mongoUri = process.env.TEST_MONGODB_URI || "mongodb://127.0.0.1:27099/hero-delta-test";
const supabaseDbUrl = process.env.TEST_SUPABASE_DB_URL || "postgresql://postgres:postgres@127.0.0.1:54322/postgres";
for (const url of [mongoUri, supabaseDbUrl]) {
  if (!["localhost", "127.0.0.1"].includes(new URL(url).hostname))
    throw new Error(`Refusing non-local database ${url}`);
}

const d = (s) => new Date(s);
const SINCE = "2026-04-06";
const quiet = () => {};

async function createAuthUser(pg, id, email, fullName) {
  await pg.query(
    `insert into auth.users (instance_id, id, aud, role, email, encrypted_password, email_confirmed_at,
       raw_app_meta_data, raw_user_meta_data, created_at, updated_at, confirmation_token, email_change,
       email_change_token_new, recovery_token)
     values ('00000000-0000-0000-0000-000000000000', $1, 'authenticated', 'authenticated', $2, '', now(),
       '{"provider": "email", "providers": ["email"]}', $3, now(), now(), '', '', '', '')`,
    [id, email, JSON.stringify({ full_name: fullName })],
  );
}

// The April copy, as it sits in the legacy schema: one shared created_at, like the sign-up bulk insert
async function insertLegacyTypes(pg, owner, names, createdAt) {
  const ids = {};
  for (const name of names) {
    ids[name] = (
      await pg.query(
        `insert into legacy.exercise_types (owner_id, name, timer_seconds, rep_range_1, rep_range_2, rep_range_3,
           session_types, definition_key, created_at, updated_at)
         values ($1, $2, 120, '6-8', '8-10', '10-12', '{"Upper A"}', $3, $4, $4) returning id`,
        [owner, name, name, createdAt],
      )
    ).rows[0].id;
  }
  return ids;
}

const LEGACY = ["exercise_types", "sessions", "exercise_users", "programs"];
const CURRENT = ["movements", "programs", "sessions", "logged_exercises"];

async function counts(pg, ids) {
  const out = {};
  const count = async (sql) => Number((await pg.query(sql, [ids])).rows[0].count);
  out.profiles = await count("select count(*) from public.profiles where id = any($1)");
  for (const t of LEGACY) out[`legacy.${t}`] = await count(`select count(*) from legacy.${t} where owner_id = any($1)`);
  for (const t of [...CURRENT, "feedbacks", "trophies"])
    out[t] = await count(`select count(*) from public.${t} where owner_id = any($1)`);
  out["legacy.exercise_sets"] = await count(
    `select count(*) from legacy.exercise_sets s join legacy.exercise_users eu on eu.id = s.exercise_user_id
     where eu.owner_id = any($1)`,
  );
  out.logged_sets = await count(
    `select count(*) from public.logged_sets s join public.logged_exercises le on le.id = s.logged_exercise_id
     where le.owner_id = any($1)`,
  );
  return out;
}

test("delta sync copies Mongo changes to Supabase and is idempotent", async () => {
  const pg = new Client({ connectionString: supabaseDbUrl });
  await pg.connect();
  const mongo = await MongoClient.connect(mongoUri);
  const db = mongo.db();
  await db.dropDatabase();

  const suffix = crypto.randomUUID().slice(0, 8);
  const A = crypto.randomUUID(); // copied in April, kept using the store app
  const B = crypto.randomUUID(); // signed up after the copy: auth user but no profile yet
  const C = crypto.randomUUID(); // Mongo user whose auth user does not exist
  const mA = new ObjectId(),
    mB = new ObjectId(),
    mC = new ObjectId();

  try {
    // --- Supabase: A went through the first copy -------------------------------------
    await createAuthUser(pg, A, `a-${suffix}@hero.local`, "Alice Copied");
    await createAuthUser(pg, B, `b-${suffix}@hero.local`, "Bob New");
    await pg.query("delete from public.profiles where id = $1", [B]); // as if the trigger had not run yet

    const legacyTypes = await insertLegacyTypes(
      pg,
      A,
      ["Tractions lestées", "Développé incliné - Barre", "Squat - Barre"],
      d("2025-01-01T00:00:00.000Z"),
    );
    const pullups = legacyTypes["Tractions lestées"];
    const incline = legacyTypes["Développé incliné - Barre"];

    const insertSession = async (created, fields) =>
      (
        await pg.query(
          `insert into legacy.sessions (owner_id, date_session, type_session, body_weight, is_done, comment, created_at, updated_at)
         values ($1, $2, 'Upper A', $3, $4, $5, $6, $6) returning id`,
          [A, created, fields.body_weight, fields.is_done, fields.comment ?? null, created],
        )
      ).rows[0].id;
    const sbS1 = await insertSession(d("2026-02-01T10:00:00.123Z"), { body_weight: 80, is_done: false });
    const sbS3 = await insertSession(d("2026-02-03T10:00:00.456Z"), { body_weight: 80, is_done: true, comment: "old" });
    // Edited from the new app after the Mongo edit: Supabase must win
    await pg.query("update legacy.sessions set comment = 'edited in supabase' where id = $1", [sbS3]);

    const insertEu = async (created, type, session, sets) => {
      const id = (
        await pg.query(
          `insert into legacy.exercise_users (owner_id, type_id, session_id, created_at, updated_at)
         values ($1, $2, $3, $4, $4) returning id`,
          [A, type, session, created],
        )
      ).rows[0].id;
      for (const [i, [w, r]] of sets.entries()) {
        await pg.query(
          "insert into legacy.exercise_sets (exercise_user_id, set_order, weight, reps) values ($1, $2, $3, $4)",
          [id, i + 1, w, r],
        );
      }
      return id;
    };
    const sbEu1 = await insertEu(d("2026-02-01T10:05:00.000Z"), incline, sbS1, [
      [60, 8],
      [60, 8],
    ]);
    const sbEu3 = await insertEu(d("2026-02-01T10:10:00.000Z"), pullups, sbS1, [[0, 5]]);

    // --- Mongo ---------------------------------------------------------------------------
    const tA1 = new ObjectId(),
      tA2 = new ObjectId(),
      tACustom = new ObjectId();
    const tB1 = new ObjectId(),
      tBCustom = new ObjectId();
    const s0 = new ObjectId(),
      s1 = new ObjectId(),
      s2 = new ObjectId(),
      s3 = new ObjectId(),
      sB = new ObjectId();
    const old = d("2025-01-01T00:00:00.000Z");
    const typeDoc = (_id, owner, name, createdAt, extra = {}) => ({
      _id,
      owner,
      name,
      timer: 120,
      repRange1: "6-8",
      repRange2: "8-10",
      repRange3: "10-12",
      type_session: ["Upper A"],
      createdAt,
      updatedAt: createdAt,
      ...extra,
    });
    await db.collection("users").insertMany([
      { _id: mA, supabaseId: A, email: `a-${suffix}@hero.local`, createdAt: old, updatedAt: old },
      {
        _id: mB,
        supabaseId: B,
        email: `b-${suffix}@hero.local`,
        firstName: "Bob",
        lastName: "New",
        hasSeenOnboarding: true,
        createdAt: d("2026-06-01T00:00:00Z"),
        updatedAt: d("2026-06-02T00:00:00Z"),
      },
      {
        _id: mC,
        supabaseId: C,
        email: `c-${suffix}@hero.local`,
        createdAt: d("2026-06-03T00:00:00Z"),
        updatedAt: d("2026-06-03T00:00:00Z"),
      },
    ]);
    await db
      .collection("exercisetypes")
      .insertMany([
        typeDoc(tA1, mA, "Développé incliné - Barre", old),
        typeDoc(tA2, mA, "Tractions lestées", old),
        typeDoc(tACustom, mA, "Curl marteau", d("2026-05-01T00:00:00Z")),
        typeDoc(tB1, mB, "Tractions lestées", d("2026-06-01T00:00:00Z")),
        typeDoc(tBCustom, mB, "Face pull", d("2026-06-01T00:00:01Z")),
        typeDoc(new ObjectId(), mC, "Squat", d("2026-06-03T00:00:00Z")),
      ]);
    await db.collection("sessions").insertMany([
      // Old and never copied, only referenced by a new exercise
      {
        _id: s0,
        owner: mA,
        date_session: d("2026-01-15"),
        type_session: "Lower",
        body_weight: 81,
        is_done: true,
        createdAt: d("2026-01-15T09:00:00Z"),
        updatedAt: d("2026-01-15T09:00:00Z"),
        exercise_user_list: [],
      },
      // Copied, then finished in Mongo after the copy
      {
        _id: s1,
        owner: mA,
        date_session: d("2026-02-01T10:00:00.123Z"),
        type_session: "Upper A",
        body_weight: 80,
        is_done: true,
        createdAt: d("2026-02-01T10:00:00.123Z"),
        updatedAt: d("2026-05-01T00:00:00Z"),
      },
      {
        _id: s2,
        owner: mA,
        date_session: d("2026-05-02"),
        type_session: "Upper A",
        body_weight: 79,
        is_done: true,
        comment: "new",
        createdAt: d("2026-05-02T10:00:00Z"),
        updatedAt: d("2026-05-02T11:00:00Z"),
      },
      {
        _id: s3,
        owner: mA,
        date_session: d("2026-02-03T10:00:00.456Z"),
        type_session: "Upper A",
        body_weight: 80,
        is_done: true,
        comment: "edited in mongo",
        createdAt: d("2026-02-03T10:00:00.456Z"),
        updatedAt: d("2026-05-03T00:00:00Z"),
      },
      {
        _id: sB,
        owner: mB,
        date_session: d("2026-06-05"),
        type_session: "Upper A",
        body_weight: 70,
        is_done: true,
        createdAt: d("2026-06-05T10:00:00Z"),
        updatedAt: d("2026-06-05T10:00:00Z"),
      },
      {
        owner: new ObjectId(),
        date_session: d("2026-06-05"),
        type_session: "Lower",
        body_weight: 70,
        createdAt: d("2026-06-05T10:00:00Z"),
        updatedAt: d("2026-06-05T10:00:00Z"),
      }, // orphan
    ]);
    await db.collection("exerciseusers").insertMany([
      // Copied, unchanged
      {
        owner: mA,
        type: tA1,
        session: s1,
        weight: [60, 60],
        rep: [8, 8],
        createdAt: d("2026-02-01T10:05:00.000Z"),
        updatedAt: d("2026-02-01T10:05:00.000Z"),
      },
      // Copied, sets edited in Mongo after the copy
      {
        owner: mA,
        type: tA2,
        session: s1,
        weight: [10, 5, 0],
        rep: [5, 6, 8],
        createdAt: d("2026-02-01T10:10:00.000Z"),
        updatedAt: d("2026-05-01T00:00:00Z"),
      },
      // New, heavy enough for trophies (body weight 79)
      {
        owner: mA,
        type: tA2,
        session: s2,
        weight: [40, 30, 20],
        rep: [6, 8, 10],
        comment: "PR",
        createdAt: d("2026-05-02T10:05:00Z"),
        updatedAt: d("2026-05-02T10:05:00Z"),
      },
      {
        owner: mA,
        type: tACustom,
        session: s2,
        weight: [14, 14],
        rep: [12, 10],
        createdAt: d("2026-05-02T10:10:00Z"),
        updatedAt: d("2026-05-02T10:10:00Z"),
      },
      // New, in a session that was never copied
      {
        owner: mA,
        type: tA1,
        session: s0,
        weight: [50],
        rep: [10],
        createdAt: d("2026-05-04T10:00:00Z"),
        updatedAt: d("2026-05-04T10:00:00Z"),
      },
      {
        owner: mB,
        type: tBCustom,
        session: sB,
        weight: [20, 20],
        rep: [15, 15],
        createdAt: d("2026-06-05T10:05:00Z"),
        updatedAt: d("2026-06-05T10:05:00Z"),
      },
      {
        owner: mB,
        type: tB1,
        session: sB,
        weight: [0, 0],
        rep: [10, 9],
        createdAt: d("2026-06-05T10:06:00Z"),
        updatedAt: d("2026-06-05T10:06:00Z"),
      },
      {
        owner: new ObjectId(),
        type: new ObjectId(),
        weight: [1],
        rep: [1],
        createdAt: d("2026-06-05T10:06:00Z"),
        updatedAt: d("2026-06-05T10:06:00Z"),
      }, // orphan
    ]);
    await db.collection("programs").insertMany([
      {
        owner: mA,
        sessionType: "Upper A",
        createdAt: old,
        updatedAt: d("2026-05-05T00:00:00Z"),
        exercises: [
          { exerciseType: tACustom, order: 1, alternatives: [] },
          { exerciseType: tA2, order: 2, alternatives: [tA1] },
        ],
      },
      {
        owner: mB,
        sessionType: "Other",
        createdAt: d("2026-06-01T00:00:00Z"),
        updatedAt: d("2026-06-06T00:00:00Z"),
        exercises: [{ exerciseType: tBCustom, order: 1, alternatives: [] }],
      },
    ]);
    await db.collection("feedbacks").insertMany([
      {
        owner: mA,
        subject: "Bug",
        message: "Timer stops",
        createdAt: d("2026-05-06T00:00:00Z"),
        updatedAt: d("2026-05-06T00:00:00Z"),
      },
      { owner: mB, subject: "Merci", createdAt: d("2026-06-07T00:00:00Z"), updatedAt: d("2026-06-07T00:00:00Z") },
    ]);

    // --- Dry run: plans everything, writes nothing --------------------------------------
    const before = await counts(pg, [A, B]);
    const dry = await run({ mongoUri, supabaseDbUrl, dryRun: true, since: SINCE, log: quiet });
    assert.deepEqual(await counts(pg, [A, B]), before);

    // --- Real run ---------------------------------------------------------------------
    const real = await run({ mongoUri, supabaseDbUrl, since: SINCE, log: quiet });
    assert.deepEqual(dry.stats, real.stats, "dry run predicts the real run");
    assert.deepEqual(real.stats.profiles, { inserted: 1, updated: 0, unchanged: 0 });
    assert.deepEqual(real.stats.exercise_types, { inserted: 3, updated: 0, unchanged: 0 }); // Curl marteau, Face pull, B's Tractions (B has no legacy rows)
    assert.deepEqual(real.stats.sessions, { inserted: 3, updated: 1, unchanged: 1 }); // s0 s2 sB | s1 | s3
    assert.deepEqual(real.stats.exercise_users, { inserted: 5, updated: 1, unchanged: 0 }); // the untouched copied exercise is not a candidate
    assert.deepEqual(real.stats.programs, { inserted: 2, updated: 0, unchanged: 0 }); // A's Upper A, B's Other (no legacy programs yet)
    assert.deepEqual(real.stats.feedbacks, { inserted: 2, updated: 0, unchanged: 0 });
    assert.equal(real.skipped.orphanOwner, 2);
    assert.equal(real.skipped.ownerWithoutAuthUser, 1);
    assert.equal(real.skipped.missingExerciseType, 0);

    // Copied session finished in Mongo; Supabase-edited session kept
    for (const schema of ["legacy", "public"]) {
      assert.equal((await pg.query(`select is_done from ${schema}.sessions where id = $1`, [sbS1])).rows[0].is_done, true);
      assert.equal(
        (await pg.query(`select comment from ${schema}.sessions where id = $1`, [sbS3])).rows[0].comment,
        "edited in supabase",
      );
    }
    // Sets replaced, one row per set from 1
    assert.deepEqual(
      (
        await pg.query(
          "select set_order, weight::float8 as weight, reps from public.logged_sets where logged_exercise_id = $1 order by set_order",
          [sbEu3],
        )
      ).rows,
      [
        { set_order: 1, weight: 10, reps: 5 },
        { set_order: 2, weight: 5, reps: 6 },
        { set_order: 3, weight: 0, reps: 8 },
      ],
    );
    assert.equal(
      Number(
        (await pg.query("select count(*) from public.logged_sets where logged_exercise_id = $1", [sbEu1])).rows[0]
          .count,
      ),
      2,
    );
    // Exercise in a never-copied session is attached to the inserted session
    const s0Row = (
      await pg.query(
        `select s.label, d.name as day, s.body_weight::float8 from public.logged_exercises le
       join public.sessions s on s.id = le.session_id left join public.program_days d on d.id = s.program_day_id
       where le.owner_id = $1 and le.created_at = '2026-05-04T10:00:00Z'`,
        [A],
      )
    ).rows[0];
    assert.deepEqual(s0Row, { label: "Lower", day: "Lower", body_weight: 81 });
    // Trophies evaluated by the triggers: 40 kg × 6 at 79 kg body weight
    const achieved = (
      await pg.query(
        `select count(*) from public.trophies t join legacy.movement_map mm on mm.movement_id = t.movement_id
         where t.owner_id = $1 and mm.legacy_id = $2 and t.achieved`,
        [A, pullups],
      )
    ).rows[0].count;
    assert.ok(Number(achieved) > 0, "pull-up trophies awarded from the copied sets");
    // Program replaced in Mongo order with alternatives, converted into the Upper A day's slots
    const program = (
      await pg.query(
        `select m.name, (select array_agg(alt.name order by a.position) from public.slot_alternatives a
                        join public.movements alt on alt.id = a.movement_id where a.slot_id = s.id) as alts
       from public.programs p join public.program_days d on d.program_id = p.id
       join public.slots s on s.program_day_id = d.id join public.movements m on m.id = s.movement_id
       where p.owner_id = $1 and d.name = 'Upper A' order by s.position`,
        [A],
      )
    ).rows;
    assert.deepEqual(program, [
      { name: "Curl marteau", alts: null },
      { name: "Tractions lestées", alts: ["Développé incliné - Barre"] },
    ]);
    // B: profile created with the default movements, onboarding flag copied, custom data attached.
    // B's Mongo "Tractions lestées" lands on the default movement instead of duplicating it.
    const profileB = (await pg.query("select first_name, has_seen_onboarding from public.profiles where id = $1", [B]))
      .rows[0];
    assert.deepEqual(profileB, { first_name: "Bob", has_seen_onboarding: true });
    const movementsB = (
      await pg.query("select name from public.movements where owner_id = $1", [B])
    ).rows.map((r) => r.name);
    assert.ok(movementsB.length > 10);
    assert.equal(movementsB.filter((n) => n === "Tractions lestées").length, 1);
    assert.ok(movementsB.includes("Face pull"));
    assert.equal(
      Number((await pg.query("select count(*) from public.logged_exercises where owner_id = $1", [B])).rows[0].count),
      2,
    );

    // --- Second run: nothing left to do, and edits made in the new app are kept ---------
    await pg.query("update public.sessions set comment = 'edited in the new app' where id = $1", [sbS1]);
    await pg.query("update public.logged_exercises set comment = 'new app' where id = $1", [sbEu1]);
    const after = await counts(pg, [A, B]);
    const again = await run({ mongoUri, supabaseDbUrl, since: SINCE, log: quiet });
    for (const [table, s] of Object.entries(again.stats)) {
      assert.equal(s.inserted + s.updated, 0, `${table} changed on the second run`);
    }
    for (const [table, n] of Object.entries(again.converted)) {
      assert.equal(n, 0, `${table} re-converted on the second run`);
    }
    assert.deepEqual(await counts(pg, [A, B]), after);
    assert.equal(
      (await pg.query("select comment from public.sessions where id = $1", [sbS1])).rows[0].comment,
      "edited in the new app",
    );
    assert.equal(
      (await pg.query("select comment from public.logged_exercises where id = $1", [sbEu1])).rows[0].comment,
      "new app",
    );
  } finally {
    await pg.query("delete from auth.users where id = any($1)", [[A, B]]);
    await pg.end();
    await mongo.close();
  }
});

test("rows created in bulk with the same created_at are matched by content, not swapped", async () => {
  const pg = new Client({ connectionString: supabaseDbUrl });
  await pg.connect();
  const mongo = await MongoClient.connect(mongoUri);
  const db = mongo.db();
  await db.dropDatabase();

  // The sign-up trigger creates every default type and program in one transaction: one shared created_at
  const D = crypto.randomUUID();
  const mD = new ObjectId();
  try {
    await createAuthUser(pg, D, `d-${crypto.randomUUID().slice(0, 8)}@hero.local`, "Dana Bulk");
    const names = (await pg.query("select name from public.default_exercise_types order by sort_order")).rows.map(
      (r) => r.name,
    );
    await insertLegacyTypes(pg, D, names, d("2026-05-01T12:00:00.000Z")); // inside the --since window
    const types = (
      await pg.query(
        `select id, name, advice, timer_seconds, rep_range_1, rep_range_2, rep_range_3, rep_range_4,
                session_types::text[] as session_types, trophy_locked, created_at
         from legacy.exercise_types where owner_id = $1`,
        [D],
      )
    ).rows;
    assert.ok(types.length > 10);
    assert.equal(new Set(types.map((t) => t.created_at.getTime())).size, 1, "expected one shared created_at");

    // Mongo holds the same data (the first copy kept Mongo's timestamps), in another order (rotated by one)
    const mongoIds = new Map(types.map((t) => [t.id, new ObjectId()]));
    await db.collection("users").insertOne({ _id: mD, supabaseId: D, createdAt: types[0].created_at, updatedAt: types[0].created_at });
    await db.collection("exercisetypes").insertMany(
      [...types.slice(1), types[0]].map((t) => ({
        _id: mongoIds.get(t.id),
        owner: mD,
        name: t.name,
        advice: t.advice,
        timer: t.timer_seconds,
        repRange1: t.rep_range_1,
        repRange2: t.rep_range_2,
        repRange3: t.rep_range_3,
        repRange4: t.rep_range_4,
        type_session: t.session_types,
        trophyLocked: t.trophy_locked,
        createdAt: t.created_at,
        updatedAt: t.created_at,
      })),
    );
    // As in prod, the legacy rows were converted when the migration ran
    await pg.query("select private.migrate_legacy()");

    const before = await counts(pg, [D]);
    const result = await run({ mongoUri, supabaseDbUrl, since: SINCE, log: quiet });
    for (const [table, s] of Object.entries(result.stats)) {
      assert.equal(s.inserted + s.updated, 0, `${table}: ${JSON.stringify(s)}`);
    }
    assert.equal(result.stats.exercise_types.unchanged, types.length);
    assert.deepEqual(await counts(pg, [D]), before);
  } finally {
    await pg.query("delete from auth.users where id = $1", [D]);
    await pg.end();
    await mongo.close();
  }
});
