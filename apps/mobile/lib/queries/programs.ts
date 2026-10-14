import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { supabase } from "@/config/supabase";

import { queryKeys, unwrap, unwrapMaybe } from "./client";
import type { Program, SessionType } from "./types";

// sessionType is undefined while the screen still loads what it depends on
export function useProgram(sessionType: SessionType | undefined) {
	return useQuery({
		queryKey: queryKeys.program(sessionType ?? "none"),
		enabled: Boolean(sessionType),
		// Programs only change through useSaveProgram, which invalidates them: no
		// background refetch that could reset a draft being edited
		staleTime: Infinity,
		queryFn: async (): Promise<Program | null> =>
			unwrapMaybe(
				await supabase
					.from("programs")
					.select(
						"id, session_type, program_exercises(id, order, exercise_types(id, name), program_exercise_alternatives(position, exercise_types(id, name)))",
					)
					.eq("session_type", sessionType as SessionType)
					.order("order", { referencedTable: "program_exercises" })
					.order("position", {
						referencedTable: "program_exercises.program_exercise_alternatives",
					})
					.maybeSingle(),
			),
	});
}

export function useSaveProgram() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async (input: {
			sessionType: SessionType;
			exercises: { exerciseTypeId: string; alternativeIds: string[] }[];
		}) =>
			unwrap(
				await supabase.rpc("save_program", {
					p_session_type: input.sessionType,
					p_exercises: input.exercises.map((exercise) => ({
						exercise_type_id: exercise.exerciseTypeId,
						alternative_ids: exercise.alternativeIds,
					})),
				}),
			),
		onSuccess: () =>
			queryClient.invalidateQueries({ queryKey: queryKeys.programs }),
	});
}
