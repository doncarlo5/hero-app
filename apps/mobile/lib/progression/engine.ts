// Progression engine: from a slot's prescription and the last performance on its movement, computes the
// target of each set, the warm-up ramp and stagnation. Pure functions, no React or Supabase import, so the
// rules run anywhere and are unit-tested (`npm test`). Terms follow GLOSSARY.md.

export type LoadRule = "none" | "same" | "percent" | "step";
export type ProgressionRule = "per_set" | "all_sets" | "manual";

export type SetPrescription = {
	position: number;
	repMin: number | null;
	repMax: number | null;
	/** Load relative to the previous set's target */
	loadRule: LoadRule;
	/** percent: -10 means 10 % lighter; step: kg added (negative = lighter) */
	loadValue: number | null;
};

export type PerformedSet = { weight: number; reps: number };

export type TargetReason =
	/** the set reached the top of its rep range last time: load goes up */
	| "increase"
	/** same load as last time, aim for more reps */
	| "repeat"
	/** no history for this set: computed from the previous set's target */
	| "derived"
	/** no history on the movement: the lifter finds the load, starting light */
	| "calibration";

export type SetTarget = {
	position: number;
	weight: number | null;
	repMin: number | null;
	repMax: number | null;
	reason: TargetReason;
};

export const DEFAULT_INCREMENT = 2.5;

/** Rounds to the closest load the gym allows (a multiple of the increment), never below zero */
export function roundToIncrement(
	weight: number,
	increment = DEFAULT_INCREMENT,
): number {
	if (increment <= 0) return Math.max(0, weight);
	return Math.max(0, Math.round(weight / increment) * increment);
}

/** First rep count of the upper half of a range: 8-12 → 10, 10-15 → 13 */
export function upperHalfThreshold(repMin: number, repMax: number): number {
	return Math.ceil((repMin + repMax) / 2);
}

function derive(
	previous: number | null,
	prescription: SetPrescription,
	increment: number,
): number | null {
	if (previous === null) return null;
	switch (prescription.loadRule) {
		case "none":
			return null;
		case "same":
			return previous;
		case "percent":
			return roundToIncrement(
				previous * (1 + (prescription.loadValue ?? 0) / 100),
				increment,
			);
		case "step":
			return roundToIncrement(
				previous + (prescription.loadValue ?? 0),
				increment,
			);
	}
}

/**
 * Targets for the next session of a slot.
 *
 * - per_set: each set progresses on its own: +increment once it reached the top of its range.
 * - all_sets: every set gets +increment once all sets are in the upper half of their range.
 * - manual: last loads are repeated.
 * Sets without history are derived from the previous set's target through their load rule.
 */
export function computeTargets(input: {
	prescriptions: SetPrescription[];
	progressionRule: ProgressionRule;
	/** Working sets of the last performance on the movement, in order */
	lastSets: PerformedSet[];
	increment?: number;
}): SetTarget[] {
	const increment = input.increment ?? DEFAULT_INCREMENT;
	const prescriptions = [...input.prescriptions].sort(
		(a, b) => a.position - b.position,
	);

	if (input.lastSets.length === 0) {
		return prescriptions.map((p) => ({
			position: p.position,
			weight: null,
			repMin: p.repMin,
			repMax: p.repMax,
			reason: "calibration",
		}));
	}

	const allSetsUp =
		input.progressionRule === "all_sets" &&
		prescriptions.every((p, i) => {
			const last = input.lastSets[i];
			if (!last) return false;
			if (p.repMin === null || p.repMax === null) return false;
			return last.reps >= upperHalfThreshold(p.repMin, p.repMax);
		});

	const targets: SetTarget[] = [];
	let previous: number | null = null;
	for (const [i, p] of prescriptions.entries()) {
		const last = input.lastSets[i];
		let weight: number | null;
		let reason: TargetReason;
		if (!last) {
			weight = derive(previous, p, increment);
			reason = "derived";
		} else if (input.progressionRule === "per_set") {
			const reachedTop = p.repMax !== null && last.reps >= p.repMax;
			weight = reachedTop ? last.weight + increment : last.weight;
			reason = reachedTop ? "increase" : "repeat";
		} else if (input.progressionRule === "all_sets") {
			weight = allSetsUp ? last.weight + increment : last.weight;
			reason = allSetsUp ? "increase" : "repeat";
		} else {
			weight = last.weight;
			reason = "repeat";
		}
		targets.push({
			position: p.position,
			weight,
			repMin: p.repMin,
			repMax: p.repMax,
			reason,
		});
		previous = weight;
	}
	return targets;
}

/** True when a performance beats another: more load on a set, or more reps at the same load */
export function improves(
	next: PerformedSet[],
	previous: PerformedSet[],
): boolean {
	return next.some((set, i) => {
		const before = previous[i];
		if (!before) return true;
		return (
			set.weight > before.weight ||
			(set.weight === before.weight && set.reps > before.reps)
		);
	});
}

/**
 * Stagnation: no improvement over the last `sessions` performances (2 by default: the same numbers two
 * weeks in a row). `history` is newest first.
 */
export function isStagnating(history: PerformedSet[][], sessions = 2): boolean {
	if (history.length < sessions + 1) return false;
	for (let i = 0; i < sessions; i++) {
		if (improves(history[i], history[i + 1])) return false;
	}
	return true;
}

/** Load to restart with when coming back to a movement after an alternative: about 5 % lighter */
export function reentryWeight(
	lastWeight: number,
	increment = DEFAULT_INCREMENT,
): number {
	return roundToIncrement(lastWeight * 0.95, increment);
}

/**
 * Warm-up ramp toward a working load: from the empty bar, adding `stepPerSide` kg on each side, fewer
 * reps as the load rises, last set close to the working load.
 */
export function warmupRamp(input: {
	workingWeight: number;
	barWeight?: number;
	stepPerSide?: number;
}): PerformedSet[] {
	const bar = input.barWeight ?? 20;
	const step = (input.stepPerSide ?? 5) * 2;
	if (input.workingWeight <= bar) return [];
	const repsFor = (weight: number) => {
		const ratio = weight / input.workingWeight;
		if (ratio >= 0.85) return 1;
		if (ratio >= 0.7) return 3;
		if (ratio >= 0.5) return 5;
		return 8;
	};
	const sets: PerformedSet[] = [];
	for (let weight = bar; weight < input.workingWeight * 0.92; weight += step) {
		sets.push({ weight, reps: repsFor(weight) });
	}
	return sets;
}
