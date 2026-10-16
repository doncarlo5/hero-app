import type { Movement, Slot } from "@/lib/queries/types";

import { computeTargets, DEFAULT_INCREMENT, type SetTarget } from "./engine";

export const DEFAULT_SET_COUNT = 3;

// Targets of the slot from the last performance; without a slot, the last loads are repeated
export function targetsFor(
	slot: Slot | null,
	movement: Movement,
	lastSets: { weight: number; reps: number }[],
): SetTarget[] {
	if (slot && slot.set_prescriptions.length > 0) {
		return computeTargets({
			prescriptions: slot.set_prescriptions.map((p) => ({
				position: p.position,
				repMin: p.rep_min,
				repMax: p.rep_max,
				loadRule: p.load_rule,
				loadValue: p.load_value,
			})),
			progressionRule: slot.progression_rule,
			lastSets,
			increment: movement.increment_kg ?? DEFAULT_INCREMENT,
		});
	}
	const count = Math.max(lastSets.length, DEFAULT_SET_COUNT);
	return Array.from({ length: count }, (_, i) => ({
		position: i + 1,
		weight: lastSets[i]?.weight ?? null,
		repMin: null,
		repMax: null,
		reason: lastSets[i] ? "repeat" : "calibration",
	}));
}
