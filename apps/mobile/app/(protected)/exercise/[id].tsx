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
import { Text } from "@/components/ui/text";
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

function formFromExercise(exercise: LoggedExerciseWithSession) {
	const { reps, weights } = setsToArrays(exercise.logged_sets);
	return {
		rep1: reps[0]?.toString() || "",
		rep2: reps[1]?.toString() || "",
		rep3: reps[2]?.toString() || "",
		rep4: reps[3]?.toString() || "",
		weight1: weights[0]?.toString() || "",
		weight2: weights[1]?.toString() || "",
		weight3: weights[2]?.toString() || "",
		weight4: weights[3]?.toString() || "",
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
	const [isRep4, setIsRep4] = useState(false);

	const [formState, setFormState] = useState({
		rep1: "",
		rep2: "",
		rep3: "",
		rep4: "",
		weight1: "",
		weight2: "",
		weight3: "",
		weight4: "",
		comment: "",
	});

	const resetForm = (loaded: LoggedExerciseWithSession) => {
		setFormState(formFromExercise(loaded));
		const reps = setsToArrays(loaded.logged_sets).reps;
		setIsRep4(Boolean(reps[3] && reps[3] > 0));
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

	const handleInputChange = (field: string, value: string) => {
		setFormState((prev) => ({ ...prev, [field]: value }));
	};

	const handleSave = () => {
		if (!exercise || !selectedExerciseType || isSaving) return;

		const sets = [
			{
				reps: parseNumber(formState.rep1),
				weight: parseNumber(formState.weight1),
			},
			{
				reps: parseNumber(formState.rep2),
				weight: parseNumber(formState.weight2),
			},
			{
				reps: parseNumber(formState.rep3),
				weight: parseNumber(formState.weight3),
			},
		];
		if (isRep4) {
			sets.push({
				reps: parseNumber(formState.rep4),
				weight: parseNumber(formState.weight4),
			});
		}

		saveExercise.mutate(
			{
				id: exercise.id,
				movementId: selectedExerciseType.id,
				comment: formState.comment,
				sets: sets.map((set) => ({ ...set, reps: Math.round(set.reps) })),
			},
			{
				onSuccess: () => setIsEditable(false),
				// The edited values stay in the form so the user can retry
				onError: (error) =>
					Alert.alert("Error", error.message || "Failed to update exercise"),
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
							onError: () => Alert.alert("Error", "Failed to delete exercise"),
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
					<View className="space-y-4">
						{/* Set 1 */}
						<View className="bg-foreground/5 rounded-lg p-4 border border-foreground/10">
							<Text className="text-sm font-medium text-foreground mb-3">
								Set 1
							</Text>
							<View className="flex-row space-x-3">
								<View className="flex-1">
									<Text className="text-xs text-muted mb-1">Reps</Text>
									<Input
										value={formState.rep1}
										onChangeText={(value) => handleInputChange("rep1", value)}
										placeholder="0"
										keyboardType="numeric"
										className="text-center"
									/>
								</View>
								<View className="flex-1">
									<Text className="text-xs text-muted mb-1">Weight (kg)</Text>
									<Input
										value={formState.weight1}
										onChangeText={(value) =>
											handleInputChange("weight1", value)
										}
										placeholder="0"
										keyboardType="numeric"
										className="text-center"
									/>
								</View>
							</View>
						</View>

						{/* Set 2 */}
						<View className="bg-foreground/5 rounded-lg p-4 border border-foreground/10">
							<Text className="text-sm font-medium text-foreground mb-3">
								Set 2
							</Text>
							<View className="flex-row space-x-3">
								<View className="flex-1">
									<Text className="text-xs text-muted mb-1">Reps</Text>
									<Input
										value={formState.rep2}
										onChangeText={(value) => handleInputChange("rep2", value)}
										placeholder="0"
										keyboardType="numeric"
										className="text-center"
									/>
								</View>
								<View className="flex-1">
									<Text className="text-xs text-muted mb-1">Weight (kg)</Text>
									<Input
										value={formState.weight2}
										onChangeText={(value) =>
											handleInputChange("weight2", value)
										}
										placeholder="0"
										keyboardType="numeric"
										className="text-center"
									/>
								</View>
							</View>
						</View>

						{/* Set 3 */}
						<View className="bg-foreground/5 rounded-lg p-4 border border-foreground/10">
							<Text className="text-sm font-medium text-foreground mb-3">
								Set 3
							</Text>
							<View className="flex-row space-x-3">
								<View className="flex-1">
									<Text className="text-xs text-muted mb-1">Reps</Text>
									<Input
										value={formState.rep3}
										onChangeText={(value) => handleInputChange("rep3", value)}
										placeholder="0"
										keyboardType="numeric"
										className="text-center"
									/>
								</View>
								<View className="flex-1">
									<Text className="text-xs text-muted mb-1">Weight (kg)</Text>
									<Input
										value={formState.weight3}
										onChangeText={(value) =>
											handleInputChange("weight3", value)
										}
										placeholder="0"
										keyboardType="numeric"
										className="text-center"
									/>
								</View>
							</View>
						</View>

						{/* Set 4 (conditional) */}
						{isRep4 && (
							<View className="bg-foreground/5 rounded-lg p-4 border border-foreground/10">
								<Text className="text-sm font-medium text-foreground mb-3">
									Set 4
								</Text>
								<View className="flex-row space-x-3">
									<View className="flex-1">
										<Text className="text-xs text-muted mb-1">Reps</Text>
										<Input
											value={formState.rep4}
											onChangeText={(value) => handleInputChange("rep4", value)}
											placeholder="0"
											keyboardType="numeric"
											className="text-center"
										/>
									</View>
									<View className="flex-1">
										<Text className="text-xs text-muted mb-1">Weight (kg)</Text>
										<Input
											value={formState.weight4}
											onChangeText={(value) =>
												handleInputChange("weight4", value)
											}
											placeholder="0"
											keyboardType="numeric"
											className="text-center"
										/>
									</View>
								</View>
							</View>
						)}

						{/* Add Set 4 button */}
						{!isRep4 && (
							<TouchableOpacity
								onPress={() => setIsRep4(true)}
								className="bg-default/30 rounded-lg p-4 border border-dashed border-default"
							>
								<Text className="text-center text-muted">+ Add Set 4</Text>
							</TouchableOpacity>
						)}
					</View>
				) : (
					<View className="space-y-3">
						<View className="flex-row gap-2 w-full">
							{exerciseReps.map((rep, index) => {
								if (rep <= 0 || exerciseWeights[index] <= 0) return null;

								return (
									<View
										key={index}
										className="bg-foreground/5 flex-1 rounded-lg px-3 py-2 border border-foreground/10"
									>
										<Text className="text-xs font-medium text-foreground">
											Set {index + 1}
										</Text>
										<Text className="text-sm font-bold text-foreground">
											{rep} reps
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
						onChangeText={(value) => handleInputChange("comment", value)}
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
				<Button variant="outline" onPress={handleDelete} className="flex-1">
					<TrashIcon size={16} color="#ef4444" />
					<Button.Label>Delete</Button.Label>
				</Button>

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
