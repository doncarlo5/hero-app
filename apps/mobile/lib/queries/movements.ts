import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { supabase } from "@/config/supabase";

import { queryKeys, unwrap } from "./client";
import type { Movement } from "./types";

export type MovementInput = Pick<
	Movement,
	"name" | "notes" | "load_type" | "increment_kg" | "unilateral"
>;

const PAGE_SIZE = 1000;
const IMAGE_BUCKET = "movement-images";

// Public URL of a library image (an object path in image_paths)
export function movementImageUrl(path: string) {
	return supabase.storage.from(IMAGE_BUCKET).getPublicUrl(path).data.publicUrl;
}

// The user's movements and the shared library, by name. Paged: the library alone is close to the
// API's row limit.
export function useMovements() {
	return useQuery({
		queryKey: [...queryKeys.movements, "list"],
		queryFn: async (): Promise<Movement[]> => {
			const movements: Movement[] = [];
			for (let from = 0; ; from += PAGE_SIZE) {
				const page = unwrap(
					await supabase
						.from("movements")
						.select("*")
						.order("name", { ascending: true })
						.order("id", { ascending: true })
						.range(from, from + PAGE_SIZE - 1),
				);
				movements.push(...page);
				if (page.length < PAGE_SIZE) return movements;
			}
		},
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
