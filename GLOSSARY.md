# Hero App

A strength training logbook that runs a user's program: it proposes each set's target, records what was lifted, and computes the next target. Terms in English are canonical; the French words lifters use are listed under _Avoid_ when they name the same thing.

## Movements

**Movement**:
A way of moving a load, independent of any program, such as "incline bench press, barbell". History, records and trophies belong to a movement.
_Avoid_: exercise type, exercice

**Load type**:
How a movement's load is counted: an external load, body weight plus an added load (weighted pull-ups, dips), or body weight minus an assistance.
_Avoid_: lest (for the added load itself, say "added load")

**Increment**:
The smallest load step available for a movement at the user's gym, such as 2.5 kg on a barbell or 2 kg between dumbbells.
_Avoid_: step, palier

## Programs

**Program template**:
A reusable program definition that a user can copy, such as "3 days: Upper A, Lower, Upper B".
_Avoid_: plan, routine

**Program**:
A user's own copy of a program template, with their choices made and free to edit.
_Avoid_: programme

**Program day**:
One of a program's training days, with its ordered slots.
_Avoid_: session type, séance type, split

**Slot**:
A position in a program day that one movement fills, with the sets it prescribes.
_Avoid_: program exercise, exercise

**Choice**:
A slot that offers several movements, where the user picks one for the whole program; a choice can decide another slot's movement (trap bar deadlift first, so lunges second).
_Avoid_: option, variant

**Alternative**:
A movement that may replace a slot's movement for a while, for a stated reason: equipment, preference, pain, stagnation or poor mind-muscle connection.
_Avoid_: substitute, swap

**Key lift**:
A slot whose progression is the priority of its program day, usually a heavy compound movement done first.
_Avoid_: main lift, exo clé

## Sets

**Set prescription**:
What one set of a slot asks for: a rep range, a load relative to the previous set, and the rest after it.
_Avoid_: set target (a target is computed, a prescription is written)

**Rep range**:
The number of repetitions a set aims for, such as 6-8.
_Avoid_: fourchette, rep goal

**Set scheme**:
The pattern formed by a slot's set prescriptions: top set with back-off sets, straight sets, or ascending sets.
_Avoid_: technique, méthode

**Top set**:
The first and heaviest working set of a slot, in its lowest rep range.

**Back-off set**:
A set after the top set, lighter by a percentage (usually about 10 %) and in a higher rep range.

**Straight sets**:
Sets that share one load and one rep range.
_Avoid_: séries classiques

**Ascending sets**:
Sets whose load goes up by a fixed step while the rep range goes down.
_Avoid_: progressive sets, pyramide montante

**Working set**:
A set that counts toward performance and progression.

**Warm-up set**:
A lighter set done before the first working set of a movement; it never counts toward performance.

**Warm-up ramp**:
The sequence of warm-up sets from the empty bar to near the working load, with fewer reps as the load rises.
_Avoid_: gammes montantes

**Finisher**:
An extension of a slot's last set beyond failure: drop sets, cheat reps, a switch or mini-sets.
_Avoid_: intensification technique

**Drop set**:
A continuation of a set at a lower load with no rest, repeated once or twice.
_Avoid_: dégressive, strip set

**Cheat reps**:
Extra repetitions after strict failure, helped by body momentum, on an isolation movement only.
_Avoid_: triche

**Switch**:
A continuation of a set, after failure, on an easier movement that works the same muscle (lateral raises into upright rows).
_Avoid_: mechanical drop set

**Mini-sets**:
Short sets of the same movement separated by about ten seconds, counted as one set.
_Avoid_: méga série, rest-pause, cluster

**Superset**:
Two slots done alternately, with a short rest between the two movements.

**Rest**:
The pause after a set before the next one; for a unilateral movement it can be taken after each side.
_Avoid_: repos, timer

**Tempo**:
The prescribed speed of a repetition's phases, such as a two-second hold at the top.

## Progression

**Performance**:
The loads and repetitions logged for a movement in one session.
_Avoid_: result, perf

**Target**:
The load and repetitions proposed for a set, computed from the last performance and the slot's progression rule.
_Avoid_: objective, goal

**Progression rule**:
The rule that decides when a set's load goes up: each set on its own once it reaches the top of its rep range, or all sets together once they are all in the upper half of the rep range.
_Avoid_: double progression (too vague)

**Stagnation**:
A key lift whose performance has not improved for a set number of sessions while sleep and food are on track.
_Avoid_: plateau

**Calibration**:
The first sessions on a movement without history, used to find working loads, starting light.

## Sessions

**Session**:
One training occurrence on a date, for one program day, with the lifter's body weight.
_Avoid_: workout, séance, training

**Logged exercise**:
A movement performed in a session, with its logged sets and comment.
_Avoid_: exercise user

**Logged set**:
One set as actually performed: kind (warm-up or working), load, repetitions, side, and any finisher parts.

## Tracking

**Body weight**:
The lifter's weight, measured in the morning; it scales trophies and body-weight load types.

**Trophy**:
A level reached on a key lift movement, defined as repetitions at a multiple of body weight.
_Avoid_: achievement, badge
