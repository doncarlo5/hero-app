---
status: accepted
---

# The session in progress lives on the device, and each logged exercise is written once

A guided session runs for an hour in a gym, often with poor reception, and the phone locks or kills the app between sets. Until now each exercise was typed on one screen and sent when the lifter tapped save: an app killed mid-exercise lost the typed sets, a lost response made a retry log the exercise twice, and the rest timer counted ticks in a component, so it stopped in the background.

We decide that the guided session's state is a draft stored on the device, rebuilt from stored times, and that the server receives one write per logged exercise. Terms follow [GLOSSARY.md](../../GLOSSARY.md).

## Shape

- **Draft on the device** (`apps/mobile/lib/session/draft.ts`, AsyncStorage). It holds the current step, the done and skipped sets with when each was done, the rest timer, and one entry per slot: the logged exercise id, a revision bumped on every change, and the revision the server confirmed. It is saved after every change and carries a version number; an unknown version is dropped.
- **Set queue** (`set-queue.ts`). A pure function turns the program day's slots into steps: lone slots in order, supersets round by round, unilateral sets per side, with the rest after each step.
- **One write per logged exercise.** When every set of a slot is done or skipped, the app calls `save_exercise` with the id it generated. `save_exercise` upserts on that id, so a retry after a lost response rewrites the same row. An edit after the write bumps the revision and the exercise is sent again. Finishing the session sends unfinished slots too.
- **Rest from stored times** (`rest.ts`). The timer is its start and its duration; the time left is recomputed from the clock on every render and when the app returns to the foreground. One local notification with a fixed id is scheduled for the end and replaced whenever the timer changes.
- **Resume.** A pointer to the session in progress lets the app offer to resume it at launch, or, after four hours without a change, to finish or discard it.
- `logged_sets.completed_at` and `sessions.started_at` / `ended_at` record the times; actual rest is the gap between two sets.

## Considered options

- **Write each set to the server as it is done.** The server always has the latest set and another device could follow along, but every set needs reception, `save_exercise` replaces a whole exercise (trophies are evaluated per set by triggers), and a set-level RPC plus conflict handling would be needed. One write per exercise keeps the RPC and the trophy logic unchanged.
- **A local database (SQLite) as the source of truth, synced to Supabase.** The most robust offline model (LiftLog, MuscleQuest, Skulpt), but it duplicates the schema and needs a sync protocol. The draft only covers the session in progress, which is the part that must survive offline today; history keeps coming from the server.
- **Keep the in-progress session in memory (TanStack Query mutations only).** Simple, but a killed app loses the typed sets and a paused mutation is not persisted.

## Consequences

- A session done on two phones at once is not supported: each phone has its own draft, and the last write of an exercise wins.
- Abandoning a draft with unsent exercises loses them; the app warns before.
- Signing out drops every guided session draft and cancels the rest notification, so another account on the same phone is never offered the previous user's session. The app warns before signing out when the draft has unsent exercises. A sign-out forced by a rejected refresh token drops them without warning.
- The notification and keep-awake need `expo-notifications` and `expo-keep-awake` in the dev and store builds. Android exact alarms and a Live Activity are left for later.
- The draft alone is not enough to open the screen offline: the session, the active program (and the profile pointing to it) and the last performance per movement come from the server. The TanStack Query cache of those queries only is persisted to AsyncStorage (`apps/mobile/lib/queries/persist.ts`): 24 h max age, dropped on a new app version, never mutations, cleared on sign-out. A session that was never opened online on this phone cannot be opened offline; the screen says so after 10 s instead of spinning. Unknown history shows no target rather than a calibration hint.
- Offline launches must not depend on the auth server: the app starts on the stored session even when its access token has expired, auth requests time out after 10 s, and supabase-js refreshes the token once the network is back. A refresh token rejected by the server still signs the user out.
