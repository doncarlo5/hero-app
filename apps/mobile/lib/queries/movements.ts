import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { supabase } from "@/config/supabase";

import type { MovementSetting } from "@/lib/movement-settings";

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

// The user's settings for library movements (one side at a time, load step), by movement id
export function useMovementSettings() {
	return useQuery({
		queryKey: queryKeys.movementSettings,
		// Rows are cached (and kept on the device for the guided session); the Map is built on read
		queryFn: async (): Promise<MovementSetting[]> =>
			unwrap(
				await supabase
					.from("movement_settings")
					.select("movement_id, unilateral, increment_kg"),
			),
		select: (rows) =>
			new Map(rows.map((row) => [row.movement_id, row] as const)),
	});
}

/** Saves the user's settings for a library movement; all nulls remove them */
export function useSaveMovementSetting() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async (setting: MovementSetting) => {
			if (setting.unilateral === null && setting.increment_kg === null) {
				unwrap(
					await supabase
						.from("movement_settings")
						.delete()
						.eq("movement_id", setting.movement_id),
				);
				return;
			}
			unwrap(
				await supabase
					.from("movement_settings")
					.upsert(
						{ ...setting, updated_at: new Date().toISOString() },
						{ onConflict: "user_id,movement_id" },
					),
			);
		},
		// The new row is shown at once: a second change made before the refetch starts from it
		onMutate: async (setting) => {
			await queryClient.cancelQueries({ queryKey: queryKeys.movementSettings });
			const previous = queryClient.getQueryData<MovementSetting[]>(
				queryKeys.movementSettings,
			);
			const others = (previous ?? []).filter(
				(row) => row.movement_id !== setting.movement_id,
			);
			const cleared =
				setting.unilateral === null && setting.increment_kg === null;
			queryClient.setQueryData<MovementSetting[]>(
				queryKeys.movementSettings,
				cleared ? others : [...others, setting],
			);
			return { previous };
		},
		onError: (_error, _setting, context) =>
			queryClient.setQueryData(queryKeys.movementSettings, context?.previous),
		onSettled: () =>
			queryClient.invalidateQueries({ queryKey: queryKeys.movementSettings }),
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
		// Deleting a movement cascades to its logs, program slots and trophies. Its own queries are dropped
		// (a refetch would fail and retry); the rest refresh without the caller waiting for them.
		onSuccess: (_data, id) => {
			queryClient.removeQueries({ queryKey: queryKeys.movement(id) });
			queryClient.invalidateQueries();
		},
	});
}
