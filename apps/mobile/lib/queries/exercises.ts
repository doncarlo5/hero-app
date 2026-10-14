import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { supabase } from "@/config/supabase";

import { queryKeys, unwrap, unwrapMaybe } from "./client";
import type { ExerciseWithSession, Trophy } from "./types";

const EXERCISE_SELECT =
	"*, exercise_sets(set_order, weight, reps), exercise_types(*), sessions(id, date_session)";

export function useExercise(id: string) {
	return useQuery({
		queryKey: queryKeys.exercise(id),
		queryFn: async (): Promise<ExerciseWithSession> =>
			unwrap(
				await supabase
					.from("exercise_users")
					.select(EXERCISE_SELECT)
					.eq("id", id)
					.single(),
			),
	});
}

// Every recorded exercise of a type, oldest first (progress chart)
export function useExerciseHistory(typeId: string | null) {
	return useQuery({
		queryKey: [...queryKeys.exercises, "history", typeId],
		enabled: Boolean(typeId),
		queryFn: async (): Promise<ExerciseWithSession[]> =>
			unwrap(
				await supabase
					.from("exercise_users")
					.select(EXERCISE_SELECT)
					.eq("type_id", typeId as string)
					.order("created_at", { ascending: true }),
			),
	});
}

// Most recent exercise of a type (prefills the next one)
export function useLastExercise(typeId: string | null) {
	return useQuery({
		queryKey: [...queryKeys.exercises, "last", typeId],
		enabled: Boolean(typeId),
		queryFn: async (): Promise<ExerciseWithSession | null> =>
			unwrapMaybe(
				await supabase
					.from("exercise_users")
					.select(EXERCISE_SELECT)
					.eq("type_id", typeId as string)
					.order("created_at", { ascending: false })
					.limit(1)
					.maybeSingle(),
			),
	});
}

export type SaveExerciseInput = {
	id?: string;
	typeId: string;
	sessionId?: string;
	comment: string;
	sets: { weight: number; reps: number }[];
};

// save_exercise writes the exercise and its sets in one transaction; trophies are
// re-evaluated by the database and the ones this save unlocked are returned
export function useSaveExercise() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async (
			input: SaveExerciseInput,
		): Promise<{ id: string; new_trophies: Trophy[] }> => {
			const result = unwrap(
				await supabase.rpc("save_exercise", {
					p_type_id: input.typeId,
					p_sets: input.sets,
					p_session_id: input.sessionId,
					p_comment: input.comment,
					p_id: input.id,
				}),
			);
			return result as unknown as { id: string; new_trophies: Trophy[] };
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: queryKeys.exercises });
			queryClient.invalidateQueries({ queryKey: queryKeys.sessions });
			queryClient.invalidateQueries({ queryKey: queryKeys.trophies });
		},
	});
}

export function useDeleteExercise() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async (id: string) =>
			unwrap(await supabase.from("exercise_users").delete().eq("id", id)),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: queryKeys.exercises });
			queryClient.invalidateQueries({ queryKey: queryKeys.sessions });
			queryClient.invalidateQueries({ queryKey: queryKeys.trophies });
		},
	});
}
