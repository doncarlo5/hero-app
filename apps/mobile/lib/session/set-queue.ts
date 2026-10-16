// Set queue of a guided session: the order in which a program day's sets are done, and the rest after
// each one. Pure functions, no React or Supabase import, unit-tested with `npm test`. Terms follow
// GLOSSARY.md (slot, superset, round, rest).

export type QueueSlot = {
	id: string;
	movementId: string;
	position: number;
	/** Slots sharing a group are a superset: done alternately, round by round */
	supersetGroup: number | null;
	/** Rest after each set, unless the set prescribes its own */
	restSeconds: number | null;
	/** Unilateral movement: each set is done once per side */
	unilateral: boolean;
	/** Unilateral only: rest after each side instead of only after the second one */
	restPerSide: boolean;
	sets: { position: number; restSeconds: number | null }[];
	/** Warm-up ramp before the first working set (key lifts), already computed from its target */
	warmup?: { weight: number; reps: number }[];
	/** Extension of the last set: drops, cheat reps, a switch to another movement, mini-sets */
	finisher?: {
		kind: FinisherKind;
		/** Drops or mini-sets; 1 for cheat reps and a switch */
		count: number;
		/** Pause between the parts; none by default, about ten seconds for mini-sets */
		restSeconds: number | null;
		/** Switch only: the easier movement */
		movementId: string | null;
	} | null;
};

export type FinisherKind = "drop_sets" | "cheat_reps" | "switch" | "mini_sets";

/** Kind of a logged set, as stored in logged_sets.kind */
export type StepKind =
	| "warmup"
	| "working"
	| "drop"
	| "cheat"
	| "switch"
	| "mini";

const FINISHER_STEP_KIND: Record<FinisherKind, StepKind> = {
	drop_sets: "drop",
	cheat_reps: "cheat",
	switch: "switch",
	mini_sets: "mini",
};

export type QueueStep = {
	/** Stable id of the step: `${slotId}:${setIndex}:${side}`, `w` / `f` prefixes for warm-up and finisher parts */
	key: string;
	kind: StepKind;
	slotId: string;
	movementId: string;
	/** Index of the set in the slot's prescriptions, from 0 (of the part for warm-up and finisher steps) */
	setIndex: number;
	side: "left" | "right" | null;
	/** Superset round, from 0 (equals setIndex for a lone slot) */
	round: number;
	/** Rest before the next step; 0 after the last step */
	restAfterSeconds: number;
	/** Last step of its slot: the logged exercise can be written */
	isLastOfSlot: boolean;
};

export const DEFAULT_REST_SECONDS = 90;
/** Pause between two movements of a superset, when the set does not prescribe one */
export const DEFAULT_SUPERSET_TRANSITION_SECONDS = 15;
/** Rest between warm-up sets */
export const WARMUP_REST_SECONDS = 60;
/** Pause between mini-sets when the slot does not prescribe one */
export const MINI_SET_REST_SECONDS = 10;

export function stepKey(
	slotId: string,
	setIndex: number,
	side: QueueStep["side"],
): string {
	return `${slotId}:${setIndex}:${side ?? "-"}`;
}

/** Lone slots and supersets, in the order of their first slot */
function blocks(slots: QueueSlot[]): QueueSlot[][] {
	const ordered = [...slots].sort((a, b) => a.position - b.position);
	const result: QueueSlot[][] = [];
	const byGroup = new Map<number, QueueSlot[]>();
	for (const slot of ordered) {
		if (slot.supersetGroup === null) {
			result.push([slot]);
			continue;
		}
		const group = byGroup.get(slot.supersetGroup);
		if (group) {
			group.push(slot);
		} else {
			const created = [slot];
			byGroup.set(slot.supersetGroup, created);
			result.push(created);
		}
	}
	return result;
}

type Draft = Omit<QueueStep, "restAfterSeconds" | "isLastOfSlot"> & {
	/** Rest when the step ends a round (or a lone slot's set) */
	fullRest: number;
	/** Rest when another movement of the superset follows in the same round */
	transitionRest: number;
	/** The other side of the same set follows */
	sideRest: number | null;
	/** Rest that does not depend on what follows (warm-up sets, parts of a finisher) */
	fixedRest: number | null;
};

/**
 * Steps of a program day.
 *
 * - A lone slot: its sets in order.
 * - A superset: round by round, each slot's set of that round (A1, B1, A2, B2). A slot with fewer
 *   sets drops out of the last rounds. The full rest comes after the round, a short transition
 *   between its movements.
 * - A unilateral slot: left then right for each set; without rest per side, the switch is immediate.
 * - Warm-up sets come before the slot's first working set, with a short rest between them.
 * - A finisher follows the slot's last working set with no rest (a short pause for mini-sets); the
 *   rest the last set would have had comes after the finisher.
 */
export function buildSetQueue(
	slots: QueueSlot[],
	options: {
		defaultRestSeconds?: number;
		supersetTransitionSeconds?: number;
	} = {},
): QueueStep[] {
	const defaultRest = options.defaultRestSeconds ?? DEFAULT_REST_SECONDS;
	const transition =
		options.supersetTransitionSeconds ?? DEFAULT_SUPERSET_TRANSITION_SECONDS;

	const drafts: Draft[] = [];
	for (const block of blocks(slots)) {
		const setsBySlot = block.map((slot) =>
			[...slot.sets].sort((a, b) => a.position - b.position),
		);
		const rounds = Math.max(0, ...setsBySlot.map((sets) => sets.length));
		for (let round = 0; round < rounds; round++) {
			block.forEach((slot, i) => {
				const set = setsBySlot[i][round];
				if (!set) return;
				const fullRest = set.restSeconds ?? slot.restSeconds ?? defaultRest;
				const transitionRest = set.restSeconds ?? transition;
				const common = { slotId: slot.id, round, fullRest, transitionRest };
				if (round === 0) {
					(slot.warmup ?? []).forEach((_, w) =>
						drafts.push({
							...common,
							key: `${slot.id}:w${w}:-`,
							kind: "warmup",
							movementId: slot.movementId,
							setIndex: w,
							side: null,
							sideRest: null,
							fixedRest: WARMUP_REST_SECONDS,
						}),
					);
				}
				const sides: QueueStep["side"][] = slot.unilateral
					? ["left", "right"]
					: [null];
				for (const side of sides) {
					drafts.push({
						...common,
						key: stepKey(slot.id, round, side),
						kind: "working",
						movementId: slot.movementId,
						setIndex: round,
						side,
						sideRest:
							side === "left" ? (slot.restPerSide ? fullRest : 0) : null,
						fixedRest: null,
					});
				}
				const finisher = slot.finisher;
				if (finisher && round === setsBySlot[i].length - 1) {
					const parts =
						finisher.kind === "cheat_reps" || finisher.kind === "switch"
							? 1
							: Math.max(1, finisher.count);
					const pause =
						finisher.restSeconds ??
						(finisher.kind === "mini_sets" ? MINI_SET_REST_SECONDS : 0);
					drafts[drafts.length - 1].fixedRest = pause;
					for (let f = 0; f < parts; f++) {
						drafts.push({
							...common,
							key: `${slot.id}:f${f}:-`,
							kind: FINISHER_STEP_KIND[finisher.kind],
							movementId:
								finisher.kind === "switch" && finisher.movementId
									? finisher.movementId
									: slot.movementId,
							setIndex: f,
							side: null,
							sideRest: null,
							fixedRest: f < parts - 1 ? pause : null,
						});
					}
				}
			});
		}
	}

	return drafts.map((draft, i) => {
		const next = drafts[i + 1];
		const isLastOfSlot = !drafts
			.slice(i + 1)
			.some((d) => d.slotId === draft.slotId);
		let restAfterSeconds: number;
		if (!next) restAfterSeconds = 0;
		else if (draft.fixedRest !== null) restAfterSeconds = draft.fixedRest;
		else if (draft.sideRest !== null && next.slotId === draft.slotId)
			restAfterSeconds = draft.sideRest;
		else if (next.round === draft.round && next.slotId !== draft.slotId)
			restAfterSeconds = sameBlock(draft, next, slots)
				? draft.transitionRest
				: draft.fullRest;
		else restAfterSeconds = draft.fullRest;
		const { fullRest, transitionRest, sideRest, fixedRest, ...step } = draft;
		return { ...step, restAfterSeconds, isLastOfSlot };
	});
}

function sameBlock(a: Draft, b: Draft, slots: QueueSlot[]): boolean {
	const groupOf = (slotId: string) =>
		slots.find((s) => s.id === slotId)?.supersetGroup ?? null;
	const group = groupOf(a.slotId);
	return group !== null && group === groupOf(b.slotId);
}

/** How a step is named on screen: "série 2", "échauffement 1", "drop 1"… */
export function partLabel(step: Pick<QueueStep, "kind" | "setIndex">): string {
	const n = step.setIndex + 1;
	switch (step.kind) {
		case "warmup":
			return `échauffement ${n}`;
		case "drop":
			return `drop ${n}`;
		case "cheat":
			return "reps trichées";
		case "switch":
			return "switch";
		case "mini":
			return `mini-série ${n}`;
		default:
			return `série ${n}`;
	}
}
