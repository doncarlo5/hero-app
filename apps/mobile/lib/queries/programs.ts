import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { supabase } from "@/config/supabase";

import { queryKeys, unwrap, unwrapMaybe } from "./client";
import { useProfile } from "./profile";
import type {
	FinisherKind,
	LoadRule,
	Program,
	ProgramDay,
	ProgressionRule,
} from "./types";

// slots has two foreign keys to movements (movement, finisher): each embed names its own
const PROGRAM_SELECT =
	"*, program_days(*, slots(*, movement:movements!slots_movement_id_fkey(*), finisher_movement:movements!slots_finisher_movement_id_fkey(*), alternatives:slot_alternatives(position, reason, movement:movements(*)), set_prescriptions(*)))";

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
		isError: profile.isError || query.isError,
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

export type SlotSettings = {
	progressionRule: ProgressionRule;
	restSeconds: number | null;
	restPerSide: boolean;
	tempo: string;
	note: string;
	/** Another slot of the same day to do as a superset with, or null */
	supersetWith: string | null;
	isKeyLift: boolean;
	finisher: {
		kind: FinisherKind;
		count: number | null;
		/** Drop sets: kg removed per drop */
		loadStep: number | null;
		restSeconds: number | null;
		/** Switch: the easier movement */
		movementId: string | null;
	} | null;
};

export type SetPrescriptionDraft = {
	repMin: number | null;
	repMax: number | null;
	loadRule: LoadRule;
	loadValue: number | null;
	restSeconds: number | null;
	label: string | null;
};

// save_slot writes the slot's settings and replaces its set prescriptions in one transaction
export function useSaveSlot() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async (input: {
			slotId: string;
			settings: SlotSettings;
			sets: SetPrescriptionDraft[];
		}) =>
			unwrap(
				await supabase.rpc("save_slot", {
					p_slot_id: input.slotId,
					p_slot: {
						progression_rule: input.settings.progressionRule,
						rest_seconds: input.settings.restSeconds,
						rest_per_side: input.settings.restPerSide,
						tempo: input.settings.tempo,
						note: input.settings.note,
						superset_with: input.settings.supersetWith,
						is_key_lift: input.settings.isKeyLift,
						finisher_kind: input.settings.finisher?.kind ?? null,
						finisher_count: input.settings.finisher?.count ?? null,
						finisher_load_step: input.settings.finisher?.loadStep ?? null,
						finisher_rest_seconds: input.settings.finisher?.restSeconds ?? null,
						finisher_movement_id: input.settings.finisher?.movementId ?? null,
					},
					p_sets: input.sets.map((set) => ({
						rep_min: set.repMin,
						rep_max: set.repMax,
						load_rule: set.loadRule,
						load_value: set.loadValue,
						rest_seconds: set.restSeconds,
						label: set.label,
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
