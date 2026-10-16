# Flows

How a user moves through the mobile app: first as built today (screens in `apps/mobile/app/`), then the v1 target from [PRODUCT.md](PRODUCT.md) and [ADR-0001](adr/0001-programs-as-data.md). Terms in **bold** are defined in [GLOSSARY.md](../GLOSSARY.md).

## Today

### Sign in

```mermaid
flowchart LR
  launch[App launch] --> hasSession{Supabase session?}
  hasSession -- yes --> home["Home tab<br/>(protected)/(tabs)/index"]
  hasSession -- no --> welcome[welcome]
  welcome --> signIn[sign-in: email, Apple, Google]
  welcome --> signUp[sign-up]
  signIn --> home
  signUp --> home
  oauth[auth: OAuth callback] --> home
```

Sign-up runs `private.setup_user` in the database: profile, default exercise types, programs and trophies.

### Train a session

```mermaid
flowchart TD
  home[Home] --> newSession[New session button]
  newSession --> pickType["Pick a session type<br/>3 days: Upper A · Lower · Upper B<br/>2 days: Séance A · Séance B"]
  pickType --> session["session/[id]<br/>date · body weight (last one) · comment"]
  session --> next["Next exercise card<br/>first program exercise not logged yet, with alternatives"]
  session --> add[Add exercise]
  next --> log
  add --> log["do-exercise<br/>pick exercise type · rep ranges · advice<br/>last performance prefilled · rest countdown"]
  log --> save["save_exercise RPC<br/>exercise + sets in one transaction"]
  save --> trophy{New trophies?}
  trophy -- yes --> alert[Trophy alert] --> session
  trophy -- no --> session
  session --> edit["exercise/[id]: edit a logged exercise"]
  session --> done[Mark done] --> home
```

- The exercise picker only lists exercise types tagged with the session's type.
- Sets are typed into up to four columns of reps and weights; the prescription is shown as text (`4-6`, `Top set puis -10 %…`). The app does not compute targets.
- Body weight is copied from the previous session and editable on the session screen.

### Around the sessions

- **Home**: previous session (opens the Séances tab), trophy progress, shortcut to create an exercise type.
- **Séances** tab: list of sessions, newest first.
- **Settings** tab: Mes exercices (exercise library and editor), Stats, Trophées, Timer, Informations (profile), Programme (order and alternatives per session type, saved with `save_program`), feedback, theme, sign out.

## v1 target

### Set up a program

```mermaid
flowchart TD
  start[First launch or Programme screen] --> pick{"Start from"}
  pick -- template --> copy[Copy a program template]
  pick -- blank --> write["Write a program:<br/>program days → slots → set prescriptions"]
  copy --> choices["Make the choices<br/>e.g. squat or leg press, which decides slot 2"]
  write --> choices
  choices --> schedule[Optional: preferred weekdays]
  schedule --> ready[Program active]
```

Editing a program never rewrites history: performances belong to movements, and past sessions keep the program day they were done on.

### Train a session

```mermaid
flowchart TD
  home[Home: next program day suggested] --> start[Start session]
  start --> bw[Confirm body weight]
  bw --> slot[Current slot: movement, image, tempo, setup notes]
  slot --> warm{First heavy slot?}
  warm -- yes --> ramp[Warm-up ramp generated from the top set target] --> set
  warm -- no --> set
  set["Set card: target load × reps<br/>from last performance + progression rule"] --> logSet[Log load and reps]
  logSet --> rest[Rest timer starts automatically]
  rest --> more{More sets in slot?}
  more -- yes --> set
  more -- "no, finisher" --> fin["Finisher: drops · cheat reps · switch · mini-sets"] --> nextSlot
  more -- no --> nextSlot{Next slot}
  nextSlot -- "superset partner" --> set
  nextSlot -- "next slot" --> slot
  nextSlot -- "day done" --> finish["Finish: summary, new records, trophies"]
```

- Validating a set is the main action and starts the rest; the next set's target is already on screen.
- A superset alternates its two slots with the prescribed short rest; a unilateral slot rests after each side.
- With no history on a movement, the set card is in **calibration**: no target, a hint to start light.

### Swap a movement

```mermaid
flowchart LR
  slot[Slot] --> why{Reason}
  why -- "equipment taken" --> once[Alternative for this session only]
  why -- "pain or preference" --> keep[Alternative until changed back]
  why -- stagnation --> stag[Alternative suggested by the app]
  stag --> back["Back to the original movement later:<br/>target restarts about 5 % lower"]
```

**Stagnation** is detected on key lifts: the same performance for a set number of sessions. The app suggests the slot's alternative; the lifter accepts or ignores it.

### Track the body (v2)

- Morning body weight, daily, with a weekly average; the last value prefills a session.
- Measurements and progress photos, every few weeks.
- Steps from HealthKit.
