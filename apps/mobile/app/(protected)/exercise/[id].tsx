import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
	ActivityIndicator,
	Alert,
	RefreshControl,
	ScrollView,
	TouchableOpacity,
	View,
} from "react-native";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Text } from "@/components/ui/text";
import { Textarea } from "@/components/ui/textarea";
import {
	useDeleteExercise,
	useExercise,
	useSaveExercise,
} from "@/lib/queries/exercises";
import { useExerciseTypes } from "@/lib/queries/exercise-types";
import {
	setsToArrays,
	type ExerciseType,
	type ExerciseWithSession,
} from "@/lib/queries/types";
import {
	CheckIcon,
	EditIcon,
	InfoIcon,
	TrashIcon,
	XIcon,
} from "lucide-react-native";

function formFromExercise(exercise: ExerciseWithSession) {
	const { reps, weights } = setsToArrays(exercise.exercise_sets);
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
	const { id } = useLocalSearchParams<{ id: string }>();
	const router = useRouter();

	const exerciseQuery = useExercise(id);
	const exerciseTypesQuery = useExerciseTypes();
	const saveExercise = useSaveExercise();
	const deleteExercise = useDeleteExercise();

	const exercise = exerciseQuery.data ?? null;
	const session = exercise?.sessions ?? null;
	const exerciseTypes = exerciseTypesQuery.data ?? [];
	const isLoading = exerciseQuery.isLoading;
	const isSaving = saveExercise.isPending;
	const [refreshing, setRefreshing] = useState(false);
	const [isEditable, setIsEditable] = useState(false);
	const [selectedExerciseType, setSelectedExerciseType] =
		useState<ExerciseType | null>(null);
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

	const resetForm = (loaded: ExerciseWithSession) => {
		setFormState(formFromExercise(loaded));
		const reps = setsToArrays(loaded.exercise_sets).reps;
		setIsRep4(Boolean(reps[3] && reps[3] > 0));
		setSelectedExerciseType(loaded.exercise_types);
	};

	// Fill the form when the exercise loads (not while the user is editing it)
	useEffect(() => {
		if (exercise && !isEditable) {
			resetForm(exercise);
		}
	}, [exercise]);

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
				typeId: selectedExerciseType.id,
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
							onSuccess: () => {
								if (session) {
									router.push(`/session/${session.id}`);
								} else {
									router.back();
								}
							},
							onError: () => Alert.alert("Error", "Failed to delete exercise"),
						}),
				},
			],
		);
	};

	if (isLoading) {
		return (
			<View className="flex-1 items-center justify-center bg-background dark:bg-background-dark">
				<ActivityIndicator />
			</View>
		);
	}

	if (!exercise) {
		return (
			<View className="flex-1 items-center justify-center bg-background dark:bg-background-dark">
				<Text className="text-foreground dark:text-foreground-dark">
					Exercise not found
				</Text>
			</View>
		);
	}

	const { reps: exerciseReps, weights: exerciseWeights } = setsToArrays(
		exercise.exercise_sets,
	);
	const exerciseType = exercise.exercise_types;

	return (
		<ScrollView
			className="flex-1 bg-background dark:bg-background-dark"
			refreshControl={
				<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
			}
			contentContainerStyle={{ padding: 16, paddingBottom: 32 }}
		>
			{/* Header with back button */}
			<View className="flex-row items-center mb-6">
				<View className="flex-1">
					<Text className="text-2xl font-bold text-foreground dark:text-foreground-dark">
						{exerciseType.name}
					</Text>
					{session && (
						<Text className="text-sm text-muted-foreground dark:text-muted-foreground-dark">
							Session: {new Date(session.date_session).toLocaleDateString()}
						</Text>
					)}
				</View>
			</View>

			{/* Exercise Type Selector (when editing) */}
			{isEditable && (
				<View className="mb-6">
					<Text className="text-sm font-medium text-foreground dark:text-foreground-dark mb-2">
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
											? "bg-primary border-primary"
											: "bg-muted/30 border-muted dark:bg-muted-dark/30 dark:border-muted-dark"
									}`}
								>
									<Text
										className={`text-sm ${
											selectedExerciseType?.id === type.id
												? "text-primary-foreground"
												: "text-foreground dark:text-foreground-dark"
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
			{exerciseType.advice && (
				<View className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 mb-6 flex-row items-center gap-2">
					<InfoIcon size={15} color="#1e40af" />
					<Text className="text-sm text-blue-700 dark:text-blue-200">
						{exerciseType.advice}
					</Text>
				</View>
			)}

			{/* Sets Form */}
			<View className="mb-6">
				<Text className="text-xl font-bold text-foreground dark:text-foreground-dark mb-4">
					{isEditable ? "Edit Sets" : "Sets Detail"}
				</Text>

				{isEditable ? (
					<View className="space-y-4">
						{/* Set 1 */}
						<View className="bg-primary/5 dark:bg-primary-dark/5 rounded-lg p-4 border border-primary/10 dark:border-primary-dark/10">
							<Text className="text-sm font-medium text-primary dark:text-primary-dark mb-3">
								Set 1
							</Text>
							<View className="flex-row space-x-3">
								<View className="flex-1">
									<Text className="text-xs text-muted-foreground dark:text-muted-foreground-dark mb-1">
										Reps
									</Text>
									<Input
										value={formState.rep1}
										onChangeText={(value) => handleInputChange("rep1", value)}
										placeholder="0"
										keyboardType="numeric"
										className="text-center"
									/>
								</View>
								<View className="flex-1">
									<Text className="text-xs text-muted-foreground dark:text-muted-foreground-dark mb-1">
										Weight (kg)
									</Text>
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
						<View className="bg-primary/5 dark:bg-primary-dark/5 rounded-lg p-4 border border-primary/10 dark:border-primary-dark/10">
							<Text className="text-sm font-medium text-primary dark:text-primary-dark mb-3">
								Set 2
							</Text>
							<View className="flex-row space-x-3">
								<View className="flex-1">
									<Text className="text-xs text-muted-foreground dark:text-muted-foreground-dark mb-1">
										Reps
									</Text>
									<Input
										value={formState.rep2}
										onChangeText={(value) => handleInputChange("rep2", value)}
										placeholder="0"
										keyboardType="numeric"
										className="text-center"
									/>
								</View>
								<View className="flex-1">
									<Text className="text-xs text-muted-foreground dark:text-muted-foreground-dark mb-1">
										Weight (kg)
									</Text>
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
						<View className="bg-primary/5 dark:bg-primary-dark/5 rounded-lg p-4 border border-primary/10 dark:border-primary-dark/10">
							<Text className="text-sm font-medium text-primary dark:text-primary-dark mb-3">
								Set 3
							</Text>
							<View className="flex-row space-x-3">
								<View className="flex-1">
									<Text className="text-xs text-muted-foreground dark:text-muted-foreground-dark mb-1">
										Reps
									</Text>
									<Input
										value={formState.rep3}
										onChangeText={(value) => handleInputChange("rep3", value)}
										placeholder="0"
										keyboardType="numeric"
										className="text-center"
									/>
								</View>
								<View className="flex-1">
									<Text className="text-xs text-muted-foreground dark:text-muted-foreground-dark mb-1">
										Weight (kg)
									</Text>
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
							<View className="bg-primary/5 dark:bg-primary-dark/5 rounded-lg p-4 border border-primary/10 dark:border-primary-dark/10">
								<Text className="text-sm font-medium text-primary dark:text-primary-dark mb-3">
									Set 4
								</Text>
								<View className="flex-row space-x-3">
									<View className="flex-1">
										<Text className="text-xs text-muted-foreground dark:text-muted-foreground-dark mb-1">
											Reps
										</Text>
										<Input
											value={formState.rep4}
											onChangeText={(value) => handleInputChange("rep4", value)}
											placeholder="0"
											keyboardType="numeric"
											className="text-center"
										/>
									</View>
									<View className="flex-1">
										<Text className="text-xs text-muted-foreground dark:text-muted-foreground-dark mb-1">
											Weight (kg)
										</Text>
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
								className="bg-muted/30 dark:bg-muted-dark/30 rounded-lg p-4 border border-dashed border-muted dark:border-muted-dark"
							>
								<Text className="text-center text-muted-foreground dark:text-muted-foreground-dark">
									+ Add Set 4
								</Text>
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
										className="bg-primary/5 flex-1 dark:bg-primary-dark/5 rounded-lg px-3 py-2 border border-primary/10 dark:border-primary-dark/10"
									>
										<Text className="text-xs font-medium text-primary dark:text-primary-dark">
											Set {index + 1}
										</Text>
										<Text className="text-sm font-bold text-foreground dark:text-foreground-dark">
											{rep} reps
										</Text>
										<Text className="text-xs text-muted-foreground dark:text-muted-foreground-dark">
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
				<Text className="text-xl font-bold text-foreground dark:text-foreground-dark mb-4">
					Notes
				</Text>
				{isEditable ? (
					<Textarea
						value={formState.comment}
						onChangeText={(value) => handleInputChange("comment", value)}
						placeholder="Add notes about this exercise..."
						className="bg-muted/20 dark:bg-muted-dark/20 rounded-lg p-4"
						multiline
						numberOfLines={4}
					/>
				) : (
					<View className="bg-muted/20 dark:bg-muted-dark/20 rounded-lg p-4">
						<Text className="text-sm text-foreground dark:text-foreground-dark">
							{exercise.comment || "No notes added"}
						</Text>
					</View>
				)}
			</View>

			{/* Exercise Type Information */}
			<View className="mb-6">
				<Text className="text-xl font-bold text-foreground dark:text-foreground-dark mb-4">
					Exercise Information
				</Text>
				<View className="bg-muted/20 dark:bg-muted-dark/20 rounded-lg p-4 space-y-3">
					<View className="flex-row justify-between">
						<Text className="text-sm text-muted-foreground dark:text-muted-foreground-dark">
							Timer:
						</Text>
						<Text className="text-sm font-medium text-foreground dark:text-foreground-dark">
							{exerciseType.timer_seconds} seconds
						</Text>
					</View>
					<View className="flex-row justify-between">
						<Text className="text-sm text-muted-foreground dark:text-muted-foreground-dark">
							Rep Range 1:
						</Text>
						<Text className="text-sm font-medium text-foreground dark:text-foreground-dark">
							{exerciseType.rep_range_1}
						</Text>
					</View>
					<View className="flex-row justify-between">
						<Text className="text-sm text-muted-foreground dark:text-muted-foreground-dark">
							Rep Range 2:
						</Text>
						<Text className="text-sm font-medium text-foreground dark:text-foreground-dark">
							{exerciseType.rep_range_2}
						</Text>
					</View>
					<View className="flex-row justify-between">
						<Text className="text-sm text-muted-foreground dark:text-muted-foreground-dark">
							Rep Range 3:
						</Text>
						<Text className="text-sm font-medium text-foreground dark:text-foreground-dark">
							{exerciseType.rep_range_3}
						</Text>
					</View>
					{exerciseType.rep_range_4 && (
						<View className="flex-row justify-between">
							<Text className="text-sm text-muted-foreground dark:text-muted-foreground-dark">
								Rep Range 4:
							</Text>
							<Text className="text-sm font-medium text-foreground dark:text-foreground-dark">
								{exerciseType.rep_range_4}
							</Text>
						</View>
					)}
					<View className="flex-row justify-between">
						<Text className="text-sm text-muted-foreground dark:text-muted-foreground-dark">
							Session Types:
						</Text>
						<Text className="text-sm font-medium text-foreground dark:text-foreground-dark">
							{exerciseType.session_types.join(", ")}
						</Text>
					</View>
				</View>
			</View>

			{/* Action Buttons */}
			<View className="flex-row gap-2 mb-6">
				<Button
					variant="outline"
					onPress={handleDelete}
					className="flex-1 flex-row items-center justify-center dark:bg-background-dark dark:text-foreground-dark"
				>
					<TrashIcon size={16} color="#ef4444" />
					<Text className="ml-2 text-red-500">Delete</Text>
				</Button>

				{!isEditable ? (
					<Button
						onPress={() => setIsEditable(true)}
						className="flex-1 dark:bg-transparent flex-row items-center justify-center dark:bg-background-dark dark:text-foreground-dark"
					>
						<EditIcon size={16} color="white" />
						<Text className="ml-2">Edit</Text>
					</Button>
				) : (
					<View className="flex-1 flex-row gap-2">
						<Button
							variant="outline"
							onPress={() => {
								setIsEditable(false);
								resetForm(exercise);
							}}
							disabled={isSaving}
							className="flex-1 flex-row items-center justify-center dark:bg-background-dark dark:text-foreground-dark"
						>
							<XIcon size={16} color="#6b7280" />
							<Text className="ml-2 text-muted-foreground dark:text-muted-foreground-dark">
								Cancel
							</Text>
						</Button>
						<Button
							onPress={handleSave}
							disabled={isSaving}
							className="flex-1 dark:bg-transparent flex-row items-center justify-center dark:bg-background-dark dark:text-foreground-dark"
						>
							{isSaving ? (
								<ActivityIndicator size="small" color="white" />
							) : (
								<CheckIcon size={16} color="white" />
							)}
							<Text className="ml-2">{isSaving ? "Saving..." : "Save"}</Text>
						</Button>
					</View>
				)}
			</View>
		</ScrollView>
	);
}
