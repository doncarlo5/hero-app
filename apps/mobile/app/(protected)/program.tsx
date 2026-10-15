import {
	BottomSheet,
	BottomSheetScrollView,
} from "@expo/ui/community/bottom-sheet";
import { Stack, useRouter } from "expo-router";
import {
	ChevronDown,
	ChevronUp,
	Minus,
	PlusCircle,
	SaveIcon,
	XIcon,
} from "lucide-react-native";
import React, { useRef, useState } from "react";
import {
	ActivityIndicator,
	Alert,
	Platform,
	ScrollView,
	TouchableOpacity,
	View,
} from "react-native";

import { MovementPicker } from "@/components/movement-picker";
import { SafeAreaView } from "@/components/safe-area-view";
import { Button } from "heroui-native";
import { Text } from "@/components/ui/text";
import { useMovements } from "@/lib/queries/movements";
import {
	useActiveProgram,
	useCreateProgramDay,
	useSaveProgramDay,
} from "@/lib/queries/programs";
import {
	prescriptionLabels,
	type Movement,
	type ProgramDay,
} from "@/lib/queries/types";
import { useThemeColors } from "@/lib/theme";
import { useColorScheme } from "@/lib/useColorScheme";

// Fixed height: the picker can list more movements than fit on screen
const PICKER_SNAP_POINTS = ["90%"];

type MovementRef = Pick<Movement, "id" | "name">;

interface ExerciseProgram {
	/** Existing slot: keeps its set prescriptions when saved */
	slotId?: string;
	/** "3 × 4-6 / 6-8 / 8-10", for existing slots */
	summary?: string;
	exerciseType: MovementRef;
	alternatives: MovementRef[];
	order: number;
}

export default function ProgramPage() {
	const { colorScheme } = useColorScheme();
	const themeColors = useThemeColors();

	// Bottom sheet ref
	const bottomSheetRef = useRef<BottomSheet>(null);

	const programQuery = useActiveProgram();
	const days = programQuery.data?.program_days ?? [];
	const [selectedDayId, setSelectedDayId] = useState<string | null>(null);
	const day = days.find((d) => d.id === selectedDayId) ?? days[0] ?? null;
	const exerciseTypesQuery = useMovements();
	const saveProgramMutation = useSaveProgramDay();
	const createDay = useCreateProgramDay();
	// Local draft, edited until saved
	const [exercises, setExercises] = useState<ExerciseProgram[]>([]);
	const [targetExercise, setTargetExercise] = useState<number | null>(null);

	const availableExercises = exerciseTypesQuery.data ?? [];
	const isLoading = programQuery.isLoading;
	const isLoadingTypes = exerciseTypesQuery.isLoading;
	const isSaving = saveProgramMutation.isPending;
	const router = useRouter();

	// Reset the draft from the saved day when it loads, is saved, or another day is selected
	const [draftFrom, setDraftFrom] = useState<ProgramDay | null>(null);
	if (day && draftFrom !== day) {
		setDraftFrom(day);
		setExercises(
			day.slots.map((slot, index) => {
				const labels = prescriptionLabels(slot);
				return {
					slotId: slot.id,
					summary:
						labels.length > 0
							? `${labels.length} × ${labels.join(" / ")}`
							: undefined,
					exerciseType: slot.movement,
					alternatives: slot.alternatives.map(
						(alternative) => alternative.movement,
					),
					order: index + 1,
				};
			}),
		);
	}

	const addDay = (name: string) => {
		const programId = programQuery.data?.id;
		if (!programId || !name.trim()) return;
		createDay.mutate(
			{ programId, name: name.trim(), position: days.length + 1 },
			{
				onSuccess: (created) => setSelectedDayId(created.id),
				onError: () => Alert.alert("Erreur", "Impossible d'ajouter le jour."),
			},
		);
	};

	const promptNewDay = () => {
		const fallback = `Jour ${days.length + 1}`;
		if (Platform.OS === "ios") {
			Alert.prompt("Nouveau jour", "Nom du jour d'entraînement", (name) =>
				addDay(name || fallback),
			);
		} else {
			addDay(fallback);
		}
	};

	const openAddExercise = () => {
		setTargetExercise(null);
		bottomSheetRef.current?.snapToIndex(0);
	};

	const openAddAlternative = (index: number) => {
		setTargetExercise(index);
		bottomSheetRef.current?.snapToIndex(0);
	};

	const handleSelect = (exercise: MovementRef) => {
		if (targetExercise === null) {
			const newOrder = exercises.length + 1;
			setExercises([
				...exercises,
				{ exerciseType: exercise, order: newOrder, alternatives: [] },
			]);
		} else {
			const updated = [...exercises];
			updated[targetExercise].alternatives.push(exercise);
			setExercises(updated);
		}
		bottomSheetRef.current?.close();
	};

	const moveExerciseUp = (index: number) => {
		if (index === 0) return;
		const updated = [...exercises];
		const temp = updated[index - 1];
		updated[index - 1] = updated[index];
		updated[index] = temp;
		setExercises(updated.map((e, i) => ({ ...e, order: i + 1 })));
	};

	const moveExerciseDown = (index: number) => {
		if (index === exercises.length - 1) return;
		const updated = [...exercises];
		const temp = updated[index + 1];
		updated[index + 1] = updated[index];
		updated[index] = temp;
		setExercises(updated.map((e, i) => ({ ...e, order: i + 1 })));
	};

	const removeExercise = (index: number) => {
		const updated = exercises
			.filter((_, i) => i !== index)
			.map((e, i) => ({ ...e, order: i + 1 }));
		setExercises(updated);
	};

	const moveAlternativeUp = (exerciseIndex: number, altIndex: number) => {
		if (altIndex === 0) return;
		const updated = [...exercises];
		const alts = updated[exerciseIndex].alternatives;
		const temp = alts[altIndex - 1];
		alts[altIndex - 1] = alts[altIndex];
		alts[altIndex] = temp;
		setExercises(updated);
	};

	const moveAlternativeDown = (exerciseIndex: number, altIndex: number) => {
		const updated = [...exercises];
		const alts = updated[exerciseIndex].alternatives;
		if (altIndex === alts.length - 1) return;
		const temp = alts[altIndex + 1];
		alts[altIndex + 1] = alts[altIndex];
		alts[altIndex] = temp;
		setExercises(updated);
	};

	const removeAlternative = (exerciseIndex: number, altIndex: number) => {
		const updated = [...exercises];
		updated[exerciseIndex].alternatives = updated[
			exerciseIndex
		].alternatives.filter((_, i) => i !== altIndex);
		setExercises(updated);
	};

	const saveProgram = () => {
		if (isSaving || !day) return;
		saveProgramMutation.mutate(
			{
				dayId: day.id,
				slots: exercises.map((ex) => ({
					id: ex.slotId,
					movementId: ex.exerciseType.id,
					alternativeIds: ex.alternatives.map((alt) => alt.id),
				})),
			},
			{
				onSuccess: () => router.back(),
				onError: () =>
					Alert.alert("Erreur", "Impossible d'enregistrer le jour."),
			},
		);
	};

	return (
		<>
			<Stack.Screen
				options={{
					title: "Programme",
					headerShown: true,
					headerBackTitle: "Back",
					headerShadowVisible: true,
				}}
			/>
			<SafeAreaView className="flex-1 bg-background" edges={["bottom"]}>
				<ScrollView className="flex-1 px-4 pt-4">
					{/* Program days */}
					<View className="mb-4">
						<Text className="text-lg font-semibold text-foreground">
							{programQuery.data?.name ?? "Programme"}
						</Text>
						<Text className="text-sm text-muted mb-3">
							Jours d&apos;entraînement
						</Text>
						<ScrollView
							horizontal
							showsHorizontalScrollIndicator={false}
							className="mb-4"
						>
							<View className="flex-row gap-2">
								{days.map((d) => (
									<TouchableOpacity
										key={d.id}
										onPress={() => setSelectedDayId(d.id)}
										className={`px-4 py-2 rounded-lg border ${
											day?.id === d.id
												? "bg-foreground border-foreground"
												: "border-border bg-default/30"
										}`}
									>
										<Text
											className={
												day?.id === d.id
													? "text-background font-medium"
													: "text-foreground"
											}
										>
											{d.name}
										</Text>
									</TouchableOpacity>
								))}
								<TouchableOpacity
									onPress={promptNewDay}
									className="px-4 py-2 rounded-lg border border-dashed border-border"
								>
									<Text className="text-muted">+ Jour</Text>
								</TouchableOpacity>
							</View>
						</ScrollView>
					</View>

					{/* Add Exercise Button */}
					<Button onPress={openAddExercise} className="mb-4">
						<PlusCircle size={18} color={themeColors.accentForeground} />
						<Button.Label>Ajouter un exercice</Button.Label>
					</Button>

					{/* Exercises List */}
					{isLoading ? (
						<View className="flex-1 items-center justify-center py-8">
							<ActivityIndicator size="large" />
							<Text className="text-muted mt-2">Chargement du programme…</Text>
						</View>
					) : exercises.length === 0 ? (
						<View className="bg-default/30 rounded-lg p-6 items-center">
							<Text className="text-muted text-center">
								Aucun exercice ce jour-là. Ajoute le premier !
							</Text>
						</View>
					) : (
						<View className="mb-20">
							{exercises.map((exercise, index) => (
								<View
									key={index}
									className="mb-3 rounded-xl border border-border bg-surface p-4"
								>
									<View className="flex-row items-center justify-between">
										<View className="flex-1">
											<Text className="text-lg font-semibold text-foreground">
												{exercise.order}. {exercise.exerciseType.name}
											</Text>
											<Text className="text-sm text-muted">
												{exercise.summary ?? "3 × 8-12 (par défaut)"}
											</Text>
										</View>
										<View className="flex-row items-center gap-1">
											<TouchableOpacity
												onPress={() => openAddAlternative(index)}
												className="p-2 rounded-lg bg-foreground/10"
											>
												<PlusCircle size={16} color="#0891b2" />
											</TouchableOpacity>
											<TouchableOpacity
												disabled={index === 0}
												onPress={() => moveExerciseUp(index)}
												className={`p-2 rounded-lg ${
													index === 0 ? "bg-default/30" : "bg-default/50"
												}`}
											>
												<ChevronUp
													size={16}
													color={
														index === 0
															? themeColors.mutedForeground
															: themeColors.foreground
													}
												/>
											</TouchableOpacity>
											<TouchableOpacity
												disabled={index === exercises.length - 1}
												onPress={() => moveExerciseDown(index)}
												className={`p-2 rounded-lg ${
													index === exercises.length - 1
														? "bg-default/30"
														: "bg-default/50"
												}`}
											>
												<ChevronDown
													size={16}
													color={
														index === exercises.length - 1
															? themeColors.mutedForeground
															: themeColors.foreground
													}
												/>
											</TouchableOpacity>
											<TouchableOpacity
												onPress={() => removeExercise(index)}
												className="p-2 rounded-lg bg-red-100 dark:bg-red-900/30"
											>
												<Minus
													size={16}
													color={colorScheme === "dark" ? "#fca5a5" : "#dc2626"}
												/>
											</TouchableOpacity>
										</View>
									</View>

									{exercise.alternatives.length > 0 && (
										<View className="mt-3 ml-4">
											{exercise.alternatives.map((alt, altIndex) => (
												<View
													key={alt.id}
													className="flex-row items-center justify-between border-l-2 border-border py-2 px-3 bg-default/20 rounded-r-lg"
												>
													<Text className="text-foreground flex-1">
														{exercise.order}.{altIndex + 1}. {alt.name}
													</Text>
													<View className="flex-row items-center gap-1">
														<TouchableOpacity
															disabled={altIndex === 0}
															onPress={() => moveAlternativeUp(index, altIndex)}
															className={`p-1 rounded ${
																altIndex === 0
																	? "bg-default/30"
																	: "bg-default/50"
															}`}
														>
															<ChevronUp
																size={14}
																color={
																	altIndex === 0
																		? themeColors.mutedForeground
																		: themeColors.foreground
																}
															/>
														</TouchableOpacity>
														<TouchableOpacity
															disabled={
																altIndex === exercise.alternatives.length - 1
															}
															onPress={() =>
																moveAlternativeDown(index, altIndex)
															}
															className={`p-1 rounded ${
																altIndex === exercise.alternatives.length - 1
																	? "bg-default/30"
																	: "bg-default/50"
															}`}
														>
															<ChevronDown
																size={14}
																color={
																	altIndex === exercise.alternatives.length - 1
																		? themeColors.mutedForeground
																		: themeColors.foreground
																}
															/>
														</TouchableOpacity>
														<TouchableOpacity
															onPress={() => removeAlternative(index, altIndex)}
															className="p-1 rounded bg-red-100 dark:bg-red-900/30"
														>
															<Minus
																size={14}
																color={
																	colorScheme === "dark" ? "#fca5a5" : "#dc2626"
																}
															/>
														</TouchableOpacity>
													</View>
												</View>
											))}
										</View>
									)}
								</View>
							))}
						</View>
					)}
				</ScrollView>

				{/* Save Button */}
				<View className="absolute bottom-20 right-10">
					<Button
						onPress={saveProgram}
						isDisabled={isSaving || !day}
						isIconOnly
						className="h-16 w-16 rounded-full"
					>
						{isSaving ? (
							<ActivityIndicator
								size="small"
								color={themeColors.accentForeground}
							/>
						) : (
							<SaveIcon size={28} color={themeColors.accentForeground} />
						)}
					</Button>
				</View>

				{/* Exercise Picker BottomSheet */}
				<BottomSheet
					ref={bottomSheetRef}
					index={-1}
					snapPoints={PICKER_SNAP_POINTS}
					enableDynamicSizing={false}
					enablePanDownToClose={true}
					backgroundStyle={{
						backgroundColor: themeColors.popover,
					}}
					handleIndicatorStyle={{
						backgroundColor: themeColors.mutedForeground,
					}}
				>
					<BottomSheetScrollView
						keyboardShouldPersistTaps="handled"
						contentContainerStyle={{
							padding: 24,
							paddingBottom: 24,
							backgroundColor: themeColors.popover,
							flexGrow: 1,
						}}
					>
						<Text className="text-xl font-bold mb-4">
							{targetExercise === null
								? "Choisir un exercice"
								: "Choisir une alternative"}
						</Text>
						{isLoadingTypes ? (
							<View className="items-center py-8">
								<ActivityIndicator size="large" />
								<Text className="text-muted mt-2">Chargement…</Text>
							</View>
						) : availableExercises.length === 0 ? (
							<View className="bg-default/30 rounded-lg p-6 items-center">
								<Text className="text-muted text-center">
									Aucun exercice. Crée-en un dans « Mes exercices ».
								</Text>
							</View>
						) : (
							<MovementPicker
								movements={availableExercises}
								selectedId={null}
								onPick={handleSelect}
							/>
						)}
						<Button
							onPress={() => bottomSheetRef.current?.close()}
							variant="outline"
							className="mt-4"
						>
							<XIcon size={16} color={themeColors.mutedForeground} />
							<Button.Label>Fermer</Button.Label>
						</Button>
					</BottomSheetScrollView>
				</BottomSheet>
			</SafeAreaView>
		</>
	);
}
