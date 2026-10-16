import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import {
	ActivityIndicator,
	Alert,
	RefreshControl,
	ScrollView,
	TouchableOpacity,
	View,
} from "react-native";

import { Button, Input, TextArea } from "heroui-native";
import { errorMessage } from "@/lib/errors";
import { Text } from "@/components/ui/text";
import { applyEditedSets } from "@/lib/logged-sets";
import {
	useDeleteExercise,
	useLoggedExercise,
	useSaveExercise,
} from "@/lib/queries/exercises";
import { isLibraryMovement } from "@/lib/movement-library";
import { useMovements } from "@/lib/queries/movements";
import {
	setsToArrays,
	type LoggedExerciseWithSession,
	type Movement,
	type SetKind,
} from "@/lib/queries/types";
import { useThemeColors } from "@/lib/theme";
import { useColorScheme } from "@/lib/useColorScheme";
import {
	CheckIcon,
	EditIcon,
	InfoIcon,
	TrashIcon,
	XIcon,
} from "lucide-react-native";

type FormSet = { count: string; weight: string };

// One row per working set, however many were logged (a unilateral pair is one row, see setsToArrays)
function formFromExercise(exercise: LoggedExerciseWithSession) {
	const { reps, weights } = setsToArrays(exercise.logged_sets);
	const sets: FormSet[] = reps.map((count, i) => ({
		count: count.toString(),
		weight: weights[i]?.toString() ?? "",
	}));
	return {
		sets: sets.length > 0 ? sets : [{ count: "", weight: "" }],
		comment: exercise.comment || "",
	};
}

// "12,5" and "12.5" are both accepted; empty or invalid input counts as 0
function parseNumber(value: string) {
	const parsed = parseFloat(value.replace(",", "."));
	return Number.isNaN(parsed) ? 0 : parsed;
}

export default function ExerciseDetail() {
	const themeColors = useThemeColors();
	const { isDarkColorScheme } = useColorScheme();
	const { id } = useLocalSearchParams<{ id: string }>();
	const router = useRouter();

	const exerciseQuery = useLoggedExercise(id);
	const exerciseTypesQuery = useMovements();
	const saveExercise = useSaveExercise();
	const deleteExercise = useDeleteExercise();

	const exercise = exerciseQuery.data ?? null;
	const session = exercise?.sessions ?? null;
	// The user's movements and the one logged: the library is picked from when doing an exercise
	const exerciseTypes = (exerciseTypesQuery.data ?? []).filter(
		(type) => !isLibraryMovement(type) || type.id === exercise?.movement_id,
	);
	const isLoading = exerciseQuery.isLoading;
	const isSaving = saveExercise.isPending;
	const [refreshing, setRefreshing] = useState(false);
	const [isEditable, setIsEditable] = useState(false);
	const [selectedExerciseType, setSelectedExerciseType] =
		useState<Movement | null>(null);
	const [formState, setFormState] = useState<{
		sets: FormSet[];
		comment: string;
	}>({ sets: [], comment: "" });

	const resetForm = (loaded: LoggedExerciseWithSession) => {
		setFormState(formFromExercise(loaded));
		setSelectedExerciseType(loaded.movement);
	};

	// Fill the form when the exercise loads or changes (not while the user is editing it)
	const [filledFrom, setFilledFrom] = useState<typeof exercise>(null);
	if (exercise && exercise !== filledFrom && !isEditable) {
		setFilledFrom(exercise);
		resetForm(exercise);
	}

	const onRefresh = async () => {
		setRefreshing(true);
		await exerciseQuery.refetch();
		setRefreshing(false);
	};

	const handleSetChange = (index: number, field: keyof FormSet, value: string) => {
		setFormState((prev) => ({
			...prev,
			sets: prev.sets.map((set, i) =>
				i === index ? { ...set, [field]: value } : set,
			),
		}));
	};

	// A new set starts at the last set's weight
	const addSet = () => {
		setFormState((prev) => ({
			...prev,
			sets: [
				...prev.sets,
				{ count: "", weight: prev.sets[prev.sets.length - 1]?.weight ?? "" },
			],
		}));
	};

	const removeSet = (index: number) => {
		setFormState((prev) => ({
			...prev,
			sets: prev.sets.filter((_, i) => i !== index),
		}));
	};

	const handleSave = () => {
		if (!exercise || !selectedExerciseType || isSaving) return;

		const edited = formState.sets.map((set) => ({
			count: Math.round(parseNumber(set.count)),
			weight: parseNumber(set.weight),
		}));
		// The edit only touches working sets: warm-ups, finishers, sides and targets are kept
		const sets = applyEditedSets(
			exercise.logged_sets,
			edited,
			selectedExerciseType.measure,
		).map((set) => ({
			weight: set.weight,
			reps: set.reps,
			kind: set.kind as SetKind,
			side: set.side,
			duration_seconds: set.duration_seconds,
			completed_at: set.completed_at ?? undefined,
			target_weight: set.target_weight ?? null,
			target_rep_min: set.target_rep_min ?? null,
			target_rep_max: set.target_rep_max ?? null,
			target_reason: (set.target_reason ?? null) as
				| "increase"
				| "repeat"
				| "derived"
				| "calibration"
				| null,
		}));

		saveExercise.mutate(
			{
				id: exercise.id,
				movementId: selectedExerciseType.id,
				comment: formState.comment,
				sets,
			},
			{
				onSuccess: () => setIsEditable(false),
				// The edited values stay in the form so the user can retry
				onError: (error) =>
					Alert.alert(
						"Erreur",
						errorMessage(error, "Impossible d’enregistrer l’exercice."),
					),
			},
		);
	};

	const handleDelete = () => {
		if (!exercise) return;

		Alert.alert(
			"Delete Exercise",
			"Are you sure you want to delete this exercise? This action cannot be undone.",
			[
				{ text: "Cancel", style: "cancel" },
				{
					text: "Delete",
					style: "destructive",
					onPress: () =>
						deleteExercise.mutate(exercise.id, {
							// Back to the screen that opened it (the session), not a new copy of it
							onSuccess: () => router.back(),
							onError: (error) =>
								Alert.alert(
									"Erreur",
									errorMessage(error, "Impossible de supprimer l’exercice."),
								),
						}),
				},
			],
		);
	};

	if (isLoading) {
		return (
			<View className="flex-1 items-center justify-center bg-background">
				<ActivityIndicator />
			</View>
		);
	}

	if (!exercise) {
		return (
			<View className="flex-1 items-center justify-center bg-background">
				<Text className="text-foreground">Exercise not found</Text>
			</View>
		);
	}

	const { reps: exerciseReps, weights: exerciseWeights } = setsToArrays(
		exercise.logged_sets,
	);
	const exerciseType = exercise.movement;

	return (
		<ScrollView
			className="flex-1 bg-background"
			refreshControl={
				<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
			}
			contentContainerStyle={{ padding: 16, paddingBottom: 32 }}
		>
			{/* Header with back button */}
			<View className="flex-row items-center mb-6">
				<View className="flex-1">
					<Text className="text-2xl font-bold text-foreground">
						{exerciseType.name}
					</Text>
					{session && (
						<Text className="text-sm text-muted">
							Session: {new Date(session.date_session).toLocaleDateString()}
						</Text>
					)}
				</View>
			</View>

			{/* Exercise Type Selector (when editing) */}
			{isEditable && (
				<View className="mb-6">
					<Text className="text-sm font-medium text-foreground mb-2">
						Exercise Type
					</Text>
					<ScrollView horizontal showsHorizontalScrollIndicator={false}>
						<View className="flex-row space-x-2">
							{exerciseTypes.map((type) => (
								<TouchableOpacity
									key={type.id}
									onPress={() => setSelectedExerciseType(type)}
									className={`px-4 py-2 rounded-lg border ${
										selectedExerciseType?.id === type.id
											? "bg-foreground border-foreground"
											: "bg-default/30 border-default"
									}`}
								>
									<Text
										className={`text-sm ${
											selectedExerciseType?.id === type.id
												? "text-background"
												: "text-foreground"
										}`}
									>
										{type.name}
									</Text>
								</TouchableOpacity>
							))}
						</View>
					</ScrollView>
				</View>
			)}

			{/* Advice */}
			{exerciseType.notes && (
				<View className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 mb-6 flex-row items-center gap-2">
					<InfoIcon
						size={15}
						color={isDarkColorScheme ? "#60a5fa" : "#1e40af"}
					/>
					<Text className="text-sm text-blue-700 dark:text-blue-200">
						{exerciseType.notes}
					</Text>
				</View>
			)}

			{/* Sets Form */}
			<View className="mb-6">
				<Text className="text-xl font-bold text-foreground mb-4">
					{isEditable ? "Edit Sets" : "Sets Detail"}
				</Text>

				{isEditable ? (
					<View className="gap-4">
						{formState.sets.map((set, index) => (
							<View
								key={index}
								className="bg-foreground/5 rounded-lg p-4 border border-foreground/10"
							>
								<View className="flex-row items-center justify-between mb-3">
									<Text className="text-sm font-medium text-foreground">
										Set {index + 1}
									</Text>
									{formState.sets.length > 1 && (
										<TouchableOpacity
											onPress={() => removeSet(index)}
											accessibilityRole="button"
											accessibilityLabel={`Remove set ${index + 1}`}
											hitSlop={8}
										>
											<XIcon size={16} color={themeColors.mutedForeground} />
										</TouchableOpacity>
									)}
								</View>
								<View className="flex-row gap-3">
									<View className="flex-1">
										<Text className="text-xs text-muted mb-1">
											{selectedExerciseType?.measure === "duration"
												? "Sec"
												: "Reps"}
										</Text>
										<Input
											value={set.count}
											onChangeText={(value) =>
												handleSetChange(index, "count", value)
											}
											placeholder="0"
											keyboardType="numeric"
											className="text-center"
										/>
									</View>
									<View className="flex-1">
										<Text className="text-xs text-muted mb-1">Weight (kg)</Text>
										<Input
											value={set.weight}
											onChangeText={(value) =>
												handleSetChange(index, "weight", value)
											}
											placeholder="0"
											keyboardType="decimal-pad"
											className="text-center"
										/>
									</View>
								</View>
							</View>
						))}

						<TouchableOpacity
							onPress={addSet}
							className="bg-default/30 rounded-lg p-4 border border-dashed border-default"
						>
							<Text className="text-center text-muted">+ Add a set</Text>
						</TouchableOpacity>
					</View>
				) : (
					<View className="space-y-3">
						<View className="flex-row flex-wrap gap-2 w-full">
							{exerciseReps.map((rep, index) => {
								// Bodyweight sets have 0 kg: only empty sets are hidden
								if (rep <= 0 || exerciseWeights[index] < 0) return null;

								return (
									<View
										key={index}
										className="bg-foreground/5 flex-1 min-w-[22%] rounded-lg px-3 py-2 border border-foreground/10"
									>
										<Text className="text-xs font-medium text-foreground">
											Set {index + 1}
										</Text>
										<Text className="text-sm font-bold text-foreground">
											{rep}{" "}
											{selectedExerciseType?.measure === "duration"
												? "s"
												: "reps"}
										</Text>
										<Text className="text-xs text-muted">
											{exerciseWeights[index]} kg
										</Text>
									</View>
								);
							})}
						</View>
					</View>
				)}
			</View>

			{/* Comment */}
			<View className="mb-6">
				<Text className="text-xl font-bold text-foreground mb-4">Notes</Text>
				{isEditable ? (
					<TextArea
						value={formState.comment}
						onChangeText={(value) =>
							setFormState((prev) => ({ ...prev, comment: value }))
						}
						placeholder="Add notes about this exercise..."
						className="bg-default/20 rounded-lg p-4"
						multiline
						numberOfLines={4}
					/>
				) : (
					<View className="bg-default/20 rounded-lg p-4">
						<Text className="text-sm text-foreground">
							{exercise.comment || "No notes added"}
						</Text>
					</View>
				)}
			</View>

			{/* Action Buttons */}
			<View className="flex-row gap-2 mb-6">
				{/* While editing, only Cancel and Save: three buttons do not fit a phone's width */}
				{!isEditable && (
					<Button variant="outline" onPress={handleDelete} className="flex-1">
						<TrashIcon size={16} color="#ef4444" />
						<Button.Label>Delete</Button.Label>
					</Button>
				)}

				{!isEditable ? (
					<Button onPress={() => setIsEditable(true)} className="flex-1">
						<EditIcon size={16} color={themeColors.accentForeground} />
						<Button.Label>Edit</Button.Label>
					</Button>
				) : (
					<View className="flex-1 flex-row gap-2">
						<Button
							variant="outline"
							onPress={() => {
								setIsEditable(false);
								resetForm(exercise);
							}}
							isDisabled={isSaving}
							className="flex-1"
						>
							<XIcon size={16} color={themeColors.mutedForeground} />
							<Button.Label>Cancel</Button.Label>
						</Button>
						<Button
							onPress={handleSave}
							isDisabled={isSaving}
							className="flex-1"
						>
							{isSaving ? (
								<ActivityIndicator
									size="small"
									color={themeColors.accentForeground}
								/>
							) : (
								<CheckIcon size={16} color={themeColors.accentForeground} />
							)}
							<Button.Label>{isSaving ? "Saving..." : "Save"}</Button.Label>
						</Button>
					</View>
				)}
			</View>
		</ScrollView>
	);
}
