import type { Enums, Tables } from "@/types/database";

export type Profile = Tables<"profiles">;
export type Movement = Tables<"movements">;
export type Session = Tables<"sessions">;
export type LoadType = Enums<"load_type">;
export type ProgressionRule = Enums<"progression_rule">;
export type LoadRule = Enums<"load_rule">;
export type SetKind = Enums<"set_kind">;
export type SetPrescriptionRow = Tables<"set_prescriptions">;

export type LoggedSet = Pick<
	Tables<"logged_sets">,
	"set_order" | "weight" | "reps" | "kind" | "side"
>;

export type SlotAlternative = {
	position: number;
	reason: Enums<"alternative_reason"> | null;
	movement: Movement;
};

export type Slot = Tables<"slots"> & {
	movement: Movement;
	alternatives: SlotAlternative[];
	set_prescriptions: SetPrescriptionRow[];
};

export type ProgramDay = Tables<"program_days"> & { slots: Slot[] };

export type Program = Tables<"programs"> & { program_days: ProgramDay[] };

export type Trophy = Tables<"trophies"> & {
	movement: Pick<Movement, "name"> | null;
};

export type LoggedExercise = Tables<"logged_exercises"> & {
	logged_sets: LoggedSet[];
	movement: Movement;
};

export type LoggedExerciseWithSession = LoggedExercise & {
	sessions: Pick<Session, "id" | "date_session"> | null;
};

export type SessionWithExercises = Session & {
	program_day: Pick<ProgramDay, "id" | "name" | "program_id"> | null;
	logged_exercises: LoggedExercise[];
};

export type SessionListItem = Pick<
	Session,
	"id" | "date_session" | "label" | "is_done" | "comment"
> & {
	logged_exercises: { count: number }[];
};

// Working sets as parallel arrays, ordered by set_order (shape the screens and charts use). A
// unilateral set is logged once per side: the left side stands for the set.
export function setsToArrays(sets: LoggedSet[]) {
	const ordered = sets
		.filter((set) => set.kind === "working" && set.side !== "right")
		.sort((a, b) => a.set_order - b.set_order);
	return {
		reps: ordered.map((set) => set.reps),
		weights: ordered.map((set) => set.weight),
	};
}

// A slot's sets as "6-8" labels, for screens that show the prescription as text
export function prescriptionLabels(slot: Pick<Slot, "set_prescriptions">) {
	return [...slot.set_prescriptions]
		.sort((a, b) => a.position - b.position)
		.map((p) => {
			if (p.rep_min === null || p.rep_max === null) return p.label ?? "";
			return p.rep_min === p.rep_max
				? String(p.rep_min)
				: `${p.rep_min}-${p.rep_max}`;
		});
}
