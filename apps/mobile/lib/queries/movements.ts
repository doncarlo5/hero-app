import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { supabase } from "@/config/supabase";

import { queryKeys, unwrap } from "./client";
import type { Movement } from "./types";

export type MovementInput = Pick<
	Movement,
	"name" | "notes" | "load_type" | "increment_kg" | "unilateral"
>;

// The user's movements and the shared library, by name
export function useMovements() {
	return useQuery({
		queryKey: [...queryKeys.movements, "list"],
		queryFn: async (): Promise<Movement[]> =>
			unwrap(
				await supabase
					.from("movements")
					.select("*")
					.order("name", { ascending: true }),
			),
	});
}

export function useMovement(id: string, options: { enabled: boolean }) {
	return useQuery({
		queryKey: queryKeys.movement(id),
		enabled: options.enabled,
		queryFn: async (): Promise<Movement> =>
			unwrap(
				await supabase.from("movements").select("*").eq("id", id).single(),
			),
	});
}

export function useCreateMovement() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async (input: MovementInput & { owner_id: string }) =>
			unwrap(await supabase.from("movements").insert(input).select().single()),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: queryKeys.movements });
			// A movement named like a default exercise gets its trophies initialized
			queryClient.invalidateQueries({ queryKey: queryKeys.trophies });
		},
	});
}

export function useUpdateMovement() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async (input: { id: string; changes: MovementInput }) =>
			unwrap(
				await supabase
					.from("movements")
					.update(input.changes)
					.eq("id", input.id),
			),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: queryKeys.movements });
			// Names are shown in sessions, exercises, programs and trophies
			queryClient.invalidateQueries({ queryKey: queryKeys.sessions });
			queryClient.invalidateQueries({ queryKey: queryKeys.exercises });
			queryClient.invalidateQueries({ queryKey: queryKeys.programs });
			queryClient.invalidateQueries({ queryKey: queryKeys.trophies });
		},
	});
}

export function useDeleteMovement() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async (id: string) =>
			unwrap(await supabase.from("movements").delete().eq("id", id)),
		// Deleting a movement cascades to its logs, program slots and trophies
		onSuccess: () => queryClient.invalidateQueries(),
	});
}
