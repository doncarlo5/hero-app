import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { supabase } from "@/config/supabase";

import { queryKeys, unwrap, unwrapMaybe } from "./client";
import { useProfile } from "./profile";
import type { Program, ProgramDay } from "./types";

// slots has two foreign keys to movements (movement, finisher): name the one to embed
const PROGRAM_SELECT =
	"*, program_days(*, slots(*, movement:movements!slots_movement_id_fkey(*), alternatives:slot_alternatives(position, reason, movement:movements(*)), set_prescriptions(*)))";

const byPosition = (a: { position: number }, b: { position: number }) =>
	a.position - b.position;

function sortProgram(program: Program): Program {
	return {
		...program,
		program_days: [...program.program_days].sort(byPosition).map((day) => ({
			...day,
			slots: [...day.slots].sort(byPosition).map((slot) => ({
				...slot,
				alternatives: [...slot.alternatives].sort(byPosition),
				set_prescriptions: [...slot.set_prescriptions].sort(byPosition),
			})),
		})),
	};
}

// The program the user trains with, its days in order, each day's slots with their movement,
// alternatives and set prescriptions
export function useActiveProgram() {
	const profile = useProfile();
	const programId = profile.data?.active_program_id ?? null;
	const query = useQuery({
		queryKey: queryKeys.program(programId ?? "none"),
		enabled: Boolean(programId),
		// Programs only change through the mutations below, which invalidate them: no background
		// refetch that could reset a draft being edited
		staleTime: Infinity,
		queryFn: async (): Promise<Program | null> => {
			const program = unwrapMaybe<Program>(
				await supabase
					.from("programs")
					.select(PROGRAM_SELECT)
					.eq("id", programId as string)
					.maybeSingle(),
			);
			return program ? sortProgram(program) : null;
		},
	});
	return {
		...query,
		isLoading: profile.isLoading || query.isLoading,
		data: programId ? query.data : null,
	};
}

export type SlotDraft = {
	id?: string;
	movementId: string;
	alternativeIds: string[];
};

// Saves a day's slots in order: existing slots keep their prescriptions, new ones get 3 × 8-12
export function useSaveProgramDay() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async (input: { dayId: string; slots: SlotDraft[] }) =>
			unwrap(
				await supabase.rpc("save_program_day", {
					p_day_id: input.dayId,
					p_slots: input.slots.map((slot) => ({
						...(slot.id ? { id: slot.id } : {}),
						movement_id: slot.movementId,
						alternative_ids: slot.alternativeIds,
					})),
				}),
			),
		onSuccess: () =>
			queryClient.invalidateQueries({ queryKey: queryKeys.programs }),
	});
}

export function useCreateProgramDay() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async (input: {
			programId: string;
			name: string;
			position: number;
		}): Promise<Omit<ProgramDay, "slots">> =>
			unwrap(
				await supabase
					.from("program_days")
					.insert({
						program_id: input.programId,
						name: input.name,
						position: input.position,
					})
					.select()
					.single(),
			),
		onSuccess: () =>
			queryClient.invalidateQueries({ queryKey: queryKeys.programs }),
	});
}

export function useRenameProgramDay() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async (input: { id: string; name: string }) =>
			unwrap(
				await supabase
					.from("program_days")
					.update({ name: input.name })
					.eq("id", input.id),
			),
		onSuccess: () =>
			queryClient.invalidateQueries({ queryKey: queryKeys.programs }),
	});
}

// Sessions of the day keep their label; their link to the day is cleared
export function useDeleteProgramDay() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async (id: string) =>
			unwrap(await supabase.from("program_days").delete().eq("id", id)),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: queryKeys.programs });
			queryClient.invalidateQueries({ queryKey: queryKeys.sessions });
		},
	});
}
