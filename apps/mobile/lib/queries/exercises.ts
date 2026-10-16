import {
	useMutation,
	useQueries,
	useQuery,
	useQueryClient,
} from "@tanstack/react-query";

import { supabase } from "@/config/supabase";

import { queryKeys, unwrap, unwrapMaybe } from "./client";
import type { LoggedExerciseWithSession, SetKind, Trophy } from "./types";

const EXERCISE_SELECT =
	"*, logged_sets(set_order, weight, reps, kind, side), movement:movements(*), sessions(id, date_session)";

export function useLoggedExercise(id: string) {
	return useQuery({
		queryKey: queryKeys.exercise(id),
		queryFn: async (): Promise<LoggedExerciseWithSession> =>
			unwrap(
				await supabase
					.from("logged_exercises")
					.select(EXERCISE_SELECT)
					.eq("id", id)
					.single(),
			),
	});
}

// Every logged exercise of a movement, oldest first (progress chart)
export function useMovementHistory(movementId: string | null) {
	return useQuery({
		queryKey: [...queryKeys.exercises, "history", movementId],
		enabled: Boolean(movementId),
		queryFn: async (): Promise<LoggedExerciseWithSession[]> =>
			unwrap(
				await supabase
					.from("logged_exercises")
					.select(EXERCISE_SELECT)
					.eq("movement_id", movementId as string)
					.order("created_at", { ascending: true }),
			),
	});
}

// Movement of the most recent logged exercise (default of the stats screen)
export function useLastLoggedMovementId() {
	return useQuery({
		queryKey: [...queryKeys.exercises, "last-movement"],
		queryFn: async (): Promise<string | null> => {
			const row: { movement_id: string } | null = unwrapMaybe(
				await supabase
					.from("logged_exercises")
					.select("movement_id")
					.order("created_at", { ascending: false })
					.limit(1)
					.maybeSingle(),
			);
			return row?.movement_id ?? null;
		},
	});
}

// Last performance on a movement: the base of the next targets
export function useLastPerformance(movementId: string | null) {
	return useQuery({
		queryKey: [...queryKeys.exercises, "last", movementId],
		enabled: Boolean(movementId),
		queryFn: async (): Promise<LoggedExerciseWithSession | null> =>
			unwrapMaybe(
				await supabase
					.from("logged_exercises")
					.select(EXERCISE_SELECT)
					.eq("movement_id", movementId as string)
					.order("created_at", { ascending: false })
					.limit(1)
					.maybeSingle(),
			),
	});
}

// Last performance of several movements before a session (guided session): the session's own
// exercises are left out, so its targets do not change while it is being done
export function useLastPerformances(
	movementIds: string[],
	beforeSessionId: string,
) {
	return useQueries({
		queries: movementIds.map((movementId) => ({
			queryKey: [
				...queryKeys.exercises,
				"last",
				movementId,
				"before",
				beforeSessionId,
			],
			queryFn: async (): Promise<LoggedExerciseWithSession | null> =>
				unwrapMaybe(
					await supabase
						.from("logged_exercises")
						.select(EXERCISE_SELECT)
						.eq("movement_id", movementId)
						.or(`session_id.is.null,session_id.neq.${beforeSessionId}`)
						.order("created_at", { ascending: false })
						.limit(1)
						.maybeSingle(),
				),
		})),
		combine: (results) => ({
			// undefined: not loaded yet (or not cached offline); null: never performed
			byMovement: new Map(movementIds.map((id, i) => [id, results[i]?.data])),
			isLoading: results.some((result) => result.isLoading),
		}),
	});
}

export type SaveExerciseInput = {
	id?: string;
	movementId: string;
	slotId?: string | null;
	sessionId?: string;
	comment: string;
	sets: {
		weight: number;
		reps: number;
		kind?: SetKind;
		side?: "left" | "right" | null;
		completed_at?: string;
		target_weight?: number | null;
		target_rep_min?: number | null;
		target_rep_max?: number | null;
		target_reason?: "increase" | "repeat" | "derived" | "calibration" | null;
	}[];
};

// save_exercise writes the logged exercise and its sets in one transaction; trophies are
// re-evaluated by the database and the ones this save unlocked are returned
export function useSaveExercise() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async (
			input: SaveExerciseInput,
		): Promise<{ id: string; new_trophies: Trophy[] }> => {
			const result = unwrap(
				await supabase.rpc("save_exercise", {
					p_movement_id: input.movementId,
					p_sets: input.sets,
					p_session_id: input.sessionId,
					p_comment: input.comment,
					p_id: input.id,
					p_slot_id: input.slotId ?? undefined,
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
			unwrap(await supabase.from("logged_exercises").delete().eq("id", id)),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: queryKeys.exercises });
			queryClient.invalidateQueries({ queryKey: queryKeys.sessions });
			queryClient.invalidateQueries({ queryKey: queryKeys.trophies });
		},
	});
}
