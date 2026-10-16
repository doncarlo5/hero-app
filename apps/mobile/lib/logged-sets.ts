// Editing a logged exercise from its detail screen: the screen shows one value per working set (the left
// side standing for a unilateral pair, see setsToArrays). The edit is applied to the stored sets so that
// warm-ups, finisher parts, sides, targets and times survive the save. Pure, unit-tested with `npm test`.

export type StoredSet = {
	set_order: number;
	kind: string;
	weight: number;
	reps: number;
	side: "left" | "right" | null;
	duration_seconds: number | null;
	completed_at?: string | null;
	target_weight?: number | null;
	target_rep_min?: number | null;
	target_rep_max?: number | null;
	target_reason?: string | null;
};

export type EditedSet = { weight: number; count: number };

/** The sets to send to save_exercise: every stored set, with the edited working values applied */
export function applyEditedSets(
	stored: StoredSet[],
	edited: EditedSet[],
	measure: "reps" | "duration",
): Omit<StoredSet, "set_order">[] {
	const toSet = (base: Omit<StoredSet, "set_order">, value: EditedSet) => ({
		...base,
		weight: value.weight,
		reps: measure === "duration" ? 0 : value.count,
		duration_seconds: measure === "duration" ? value.count : null,
	});

	const ordered = [...stored].sort((a, b) => a.set_order - b.set_order);
	const result: Omit<StoredSet, "set_order">[] = [];
	let working = -1;
	for (const { set_order: _order, ...set } of ordered) {
		if (set.kind !== "working") {
			result.push(set);
			continue;
		}
		// A right side follows its left side: both take the edited value of the set
		if (set.side !== "right") working += 1;
		const value = edited[working];
		// A working set removed in the form is dropped
		if (!value) continue;
		result.push(toSet(set, value));
	}
	// Sets added in the form; the form's empty rows are not sets
	for (let i = working + 1; i < edited.length; i++) {
		if (edited[i].count <= 0) continue;
		result.push(
			toSet(
				{
					kind: "working",
					weight: 0,
					reps: 0,
					side: null,
					duration_seconds: null,
				},
				edited[i],
			),
		);
	}
	return result;
}
