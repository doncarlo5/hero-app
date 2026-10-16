# Product

Hero App is a strength training logbook that tells you what to lift today. You bring a program (written by you or by a coach), the app runs it session after session: it shows each set's target, logs what you actually did, and computes the next target from the program's progression rules.

Words in **bold** are defined in [GLOSSARY.md](../GLOSSARY.md). User flows are in [FLOWS.md](FLOWS.md), the data model decision in [ADR-0001](adr/0001-programs-as-data.md).

## Who it is for

Someone who trains 2 to 4 times a week on a fixed **program** of compound and isolation lifts, and who progresses by beating last week's numbers. Today they carry the program in a PDF and the numbers in a paper notebook or a spreadsheet, and they do the math between sets: "last week 80 kg × 6 on the top set, so +2.5 kg; the back-off set is 10 % lighter; set 2 only made 7 reps, so it stays".

The app removes that bookkeeping. The lifter only lifts, types two numbers, and rests.

## Principles

1. **The logbook is the product.** Logging a set takes seconds and happens during the rest, one-handed: validating a set starts the rest timer.
2. **The app proposes, the lifter decides.** The **target** of each set is computed from the last **performance** and the **progression rule**. The lifter can always log something else; nothing is blocked.
3. **Programs are data.** Any program the user can write on paper can be entered without a code change: number of days, set schemes, rep ranges, rest, supersets, finishers, choices and alternatives.
4. **Progress is per movement.** History, records and trophies follow the **movement** (incline bench press), not the program slot it was done in.
5. **Generic, no third-party content.** The app ships a neutral movement library. Coaches' programs, texts and technique names are never bundled; a user's program is private data on their account. An official template only comes from an agreement with its author, imported as data.
6. **Native and calm.** iOS-first, native controls (Expo UI) and HeroUI Native components, dark mode, no clutter mid-session.

## What exists today

- Email, Apple and Google sign-in (Supabase Auth).
- Sessions of a given type (`Upper A`, `Lower`, `Upper B`, `Séance A`, `Séance B`), with body weight, comment and done state.
- Exercise logging with up to 4 sets, prefilled with the last performance of the same exercise, and a rest timer.
- A program per session type, with ordered exercises and alternatives, and a "next exercise" suggestion during a session.
- Per-user exercise types (copied from defaults at sign-up), stats, trophies relative to body weight (evaluated in SQL), feedback form.

Its limits are the reason for [ADR-0001](adr/0001-programs-as-data.md): session types are a hard-coded enum, set schemes and techniques are free text, the same movement is duplicated per program, and the default data contains a coach's wording.

## Scope

### v1: run any program

- Programs as data: **program template**, **program days**, **slots**, **set prescriptions**, **set schemes** and **progression rules**.
- A user picks or writes a program, makes its **choices** (squat or leg press), and sees today's **session** with a **target** for every set.
- Each set shows its target; validating it starts the rest timer.
- Supersets, drop sets, cheat-then-switch finishers and rest-pause mini-sets are guided.
- **Alternatives** with a reason (equipment, preference, pain, stagnation); **stagnation** is detected and an alternative suggested.
- **Warm-up ramp** generated from the working weight; warm-up sets do not count in stats.
- Neutral movement library with images (free-exercise-db, public domain).
- Migration of existing accounts without losing history.

### v2: body tracking

- Daily body weight with a weekly average, measurements, progress photos.
- Daily steps from HealthKit.

### Later, maybe

- Calorie and macro calculator (maintenance estimate, deficit or surplus phases).
- Official coach templates, if a partnership exists.
- Apple Watch logging.

### Not planned

- Meal plans, recipes, supplements.
- Social feed, AI coach, cardio tracking.
- Bundling any third-party program, text or video.

## Open questions

- Offline: the app talks to Supabase directly. Gyms often have poor signal; logging a set offline needs a local queue. Decide before v1 ships.
- Where the progression engine runs: proposed in the app (pure TypeScript), see ADR-0001.
- Trophies: keep the body-weight-relative levels per **key lift**, or let a program define its own.
