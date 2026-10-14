import type { Enums, Tables } from "@/types/database";

export type SessionType = Enums<"session_type">;
export type Profile = Tables<"profiles">;
export type Session = Tables<"sessions">;
export type ExerciseType = Tables<"exercise_types">;
export type ExerciseSet = Pick<
	Tables<"exercise_sets">,
	"set_order" | "weight" | "reps"
>;
export type Trophy = Tables<"trophies"> & {
	exercise_types: Pick<ExerciseType, "name"> | null;
};

export type ExerciseUser = Tables<"exercise_users"> & {
	exercise_sets: ExerciseSet[];
	exercise_types: ExerciseType;
};

export type ExerciseWithSession = ExerciseUser & {
	sessions: Pick<Session, "id" | "date_session"> | null;
};

export type SessionWithExercises = Session & {
	exercise_users: ExerciseUser[];
};

export type SessionListItem = Pick<
	Session,
	"id" | "date_session" | "type_session" | "is_done" | "comment"
> & {
	exercise_users: { count: number }[];
};

export type ExerciseTypeRef = Pick<ExerciseType, "id" | "name">;

export type ProgramExercise = {
	id: string;
	order: number;
	exercise_types: ExerciseTypeRef;
	program_exercise_alternatives: {
		position: number;
		exercise_types: ExerciseTypeRef;
	}[];
};

export type Program = {
	id: string;
	session_type: SessionType;
	program_exercises: ProgramExercise[];
};

export const SESSION_TYPES: SessionType[] = [
	"Upper A",
	"Lower",
	"Upper B",
	"Séance A",
	"Séance B",
];

// Sets as parallel arrays, ordered by set_order (shape the screens and charts use)
export function setsToArrays(sets: ExerciseSet[]) {
	const ordered = [...sets].sort((a, b) => a.set_order - b.set_order);
	return {
		reps: ordered.map((set) => set.reps),
		weights: ordered.map((set) => set.weight),
	};
}
