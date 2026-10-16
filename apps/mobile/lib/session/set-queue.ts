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
};

export type QueueStep = {
	/** Stable id of the step: `${slotId}:${setIndex}:${side}` */
	key: string;
	slotId: string;
	movementId: string;
	/** Index of the set in the slot's prescriptions, from 0 */
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
};

/**
 * Steps of a program day.
 *
 * - A lone slot: its sets in order.
 * - A superset: round by round, each slot's set of that round (A1, B1, A2, B2). A slot with fewer
 *   sets drops out of the last rounds. The full rest comes after the round, a short transition
 *   between its movements.
 * - A unilateral slot: left then right for each set; without rest per side, the switch is immediate.
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
				const sides: QueueStep["side"][] = slot.unilateral
					? ["left", "right"]
					: [null];
				for (const side of sides) {
					drafts.push({
						key: stepKey(slot.id, round, side),
						slotId: slot.id,
						movementId: slot.movementId,
						setIndex: round,
						side,
						round,
						fullRest,
						transitionRest: set.restSeconds ?? transition,
						sideRest:
							side === "left" ? (slot.restPerSide ? fullRest : 0) : null,
					});
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
		else if (draft.sideRest !== null && next.slotId === draft.slotId)
			restAfterSeconds = draft.sideRest;
		else if (next.round === draft.round && next.slotId !== draft.slotId)
			restAfterSeconds = sameBlock(draft, next, slots)
				? draft.transitionRest
				: draft.fullRest;
		else restAfterSeconds = draft.fullRest;
		const { fullRest, transitionRest, sideRest, ...step } = draft;
		return { ...step, restAfterSeconds, isLastOfSlot };
	});
}

function sameBlock(a: Draft, b: Draft, slots: QueueSlot[]): boolean {
	const groupOf = (slotId: string) =>
		slots.find((s) => s.id === slotId)?.supersetGroup ?? null;
	const group = groupOf(a.slotId);
	return group !== null && group === groupOf(b.slotId);
}
