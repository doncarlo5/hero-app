import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { supabase } from "@/config/supabase";

import { queryKeys, unwrap } from "./client";
import type { ExerciseType, SessionType } from "./types";

export type ExerciseTypeInput = Pick<
	ExerciseType,
	| "name"
	| "advice"
	| "timer_seconds"
	| "rep_range_1"
	| "rep_range_2"
	| "rep_range_3"
	| "rep_range_4"
	| "session_types"
>;

// Most recently edited first; optionally only the types of one session type
export function useExerciseTypes(sessionType?: SessionType) {
	return useQuery({
		queryKey: [...queryKeys.exerciseTypes, "list", sessionType ?? "all"],
		queryFn: async (): Promise<ExerciseType[]> => {
			const query = supabase.from("exercise_types").select("*");
			const filtered = sessionType
				? query.contains("session_types", [sessionType])
				: query;
			return unwrap(await filtered.order("updated_at", { ascending: false }));
		},
	});
}

export function useExerciseType(id: string, options: { enabled: boolean }) {
	return useQuery({
		queryKey: queryKeys.exerciseType(id),
		enabled: options.enabled,
		queryFn: async (): Promise<ExerciseType> =>
			unwrap(
				await supabase.from("exercise_types").select("*").eq("id", id).single(),
			),
	});
}

export function useCreateExerciseType() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async (input: ExerciseTypeInput & { owner_id: string }) =>
			unwrap(
				await supabase.from("exercise_types").insert(input).select().single(),
			),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: queryKeys.exerciseTypes });
			// A type named like a default exercise gets its trophies initialized
			queryClient.invalidateQueries({ queryKey: queryKeys.trophies });
		},
	});
}

export function useUpdateExerciseType() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async (input: { id: string; changes: ExerciseTypeInput }) =>
			unwrap(
				await supabase
					.from("exercise_types")
					.update(input.changes)
					.eq("id", input.id),
			),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: queryKeys.exerciseTypes });
			// Names are shown in sessions, exercises, programs and trophies
			queryClient.invalidateQueries({ queryKey: queryKeys.sessions });
			queryClient.invalidateQueries({ queryKey: queryKeys.exercises });
			queryClient.invalidateQueries({ queryKey: queryKeys.programs });
			queryClient.invalidateQueries({ queryKey: queryKeys.trophies });
		},
	});
}

export function useDeleteExerciseType() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async (id: string) =>
			unwrap(await supabase.from("exercise_types").delete().eq("id", id)),
		// Deleting a type cascades to its exercises, program entries and trophies
		onSuccess: () => queryClient.invalidateQueries(),
	});
}
