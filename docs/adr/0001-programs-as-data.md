---
status: proposed
---

# Programs, set schemes and progression rules are data, and movements are separate from prescriptions

The schema inherited from the Mongo app encodes one program: session types are a Postgres enum (`Upper A`, `Lower`, `Upper B`, `Séance A`, `Séance B`), an `exercise_types` row mixes the movement with how a program uses it (`rep_range_1..4`, `timer_seconds`, `advice`, `session_types`), and techniques live in free text (`Top set puis -10 % du poids à chaque série`). So the same movement exists twice when two program days prescribe it differently, history splits with it, a new program needs a migration, and the app cannot compute what to lift next. The default data also carries a coach's wording, which a public app cannot ship.

We decide to model programs as data, with the movement on one side and the prescription on the other, and to compute set targets in the app from typed progression rules. Terms follow [GLOSSARY.md](../../GLOSSARY.md).

## Shape

- **Movements.** A shared, read-only library seeded from a public domain source (free-exercise-db: name, muscles, equipment, images), plus custom movements owned by a user. A movement has a load type, a default increment from its equipment, and whether it is unilateral. Per-user settings (increment at their gym, setup notes such as bench angle) sit beside it, not in it.
- **Programs.** `program templates` → `program days` (ordered) → `slots` (ordered, key lift flag, optional superset group) → `set prescriptions` (rep range, load relative to the previous set: same, minus a percentage, plus a step; rest after, rest per side). A slot also has its progression rule, its finisher, its choices (movement options, with an optional dependency on another slot's choice), its alternatives with their reason, a tempo and a coaching note. Everything the engine reads is a typed column; free text is only for notes.
- **A user's program is a copy** of a template, made when they start it, with their choices recorded. Editing it never touches the template, and template changes do not propagate.
- **Sessions** reference a program day (null for an ad hoc session) instead of the enum. A logged exercise references a movement and, when it came from the program, the slot. A logged set gains a kind (warm-up, working, drop, cheat, switch, mini-set), a side, and an order within its set.
- **Progression engine.** A pure TypeScript module in the mobile app takes a slot, its prescriptions and the movement's last performance, and returns the target of each set, the warm-up ramp, and whether the movement stagnates. Targets are computed on display, not stored. It is the first unit-tested code in the mobile app.
- **Trophies** stay in SQL, evaluated by triggers, but are keyed by movement instead of exercise type.
- **Seeds** contain only neutral data: the movement library and, at most, a starter template written for this app. No third-party program, text or technique name.

## Considered options

- **Keep the enum and add columns to `exercise_types`.** Cheapest now, but every new program or set scheme is a migration, and duplicated movements keep splitting history.
- **One JSON document per program.** Easy to edit as a whole, but no foreign keys to movements, and "every performance on this slot" or "every program using this movement" become document scans.
- **Progression engine in SQL**, like trophies. Authoritative, but targets are suggestions the lifter may ignore, they must be available offline in a gym, and the rules will change often: TypeScript is quicker to iterate on and to test. Trophies stay in SQL because they are awarded once and must not depend on the client.

## Consequences

- Existing accounts are migrated in place: each exercise type becomes a library movement (matched by name) or a custom movement; the programs of one account become one program with one program day per former session type; `rep_range_1..4` and `timer_seconds` become set prescriptions; `advice` becomes the slot note; sessions and logged exercises are repointed. The owner's current program, including the coach's wording, survives as that user's private data only.
- `scripts/sync-mongo-delta.js` writes into today's tables and runs once more before the Supabase build ships. The schema change lands after that final sync, or the script is updated in the same change.
- `save_exercise` and `save_program` are rewritten for the new tables; `apps/mobile/types/database.ts` is regenerated.
