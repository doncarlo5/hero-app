import { useLocalSearchParams, useRouter } from "expo-router";
import { Check, Trash2 } from "lucide-react-native";
import { useState } from "react";
import {
	ActivityIndicator,
	Alert,
	Pressable,
	ScrollView,
	Switch,
	View,
} from "react-native";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Text } from "@/components/ui/text";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/context/supabase-provider";
import {
	useCreateExerciseType,
	useDeleteExerciseType,
	useExerciseType,
	useUpdateExerciseType,
} from "@/lib/queries/exercise-types";
import type { SessionType } from "@/lib/queries/types";
import { useColorScheme } from "@/lib/useColorScheme";
import { cn } from "@/lib/utils";

interface FormState {
	name: string;
	advice: string;
	timer: string;
	repRange1: string;
	repRange2: string;
	repRange3: string;
	repRange4: string;
	type_session: SessionType[];
}

export default function ExerciseTypeDetail() {
	const { id } = useLocalSearchParams<{ id: string }>();
	const router = useRouter();
	const { session } = useAuth();
	const { isDarkColorScheme } = useColorScheme();

	const isCreating = id === "new";
	const exerciseTypeQuery = useExerciseType(id, { enabled: !isCreating });
	const createExerciseType = useCreateExerciseType();
	const updateExerciseType = useUpdateExerciseType();
	const deleteExerciseType = useDeleteExerciseType();
	const exerciseType = exerciseTypeQuery.data ?? null;
	const isLoading = !isCreating && exerciseTypeQuery.isLoading;
	const isSaving = createExerciseType.isPending || updateExerciseType.isPending;
	const [addRepRange4, setAddRepRange4] = useState(false);
	const [isRepRange4, setIsRepRange4] = useState(false);

	const [formState, setFormState] = useState<FormState>({
		name: "",
		advice: "",
		timer: "",
		repRange1: "",
		repRange2: "",
		repRange3: "",
		repRange4: "",
		type_session: [],
	});

	// Fill the form from the loaded exercise type (again only if it actually changed)
	const [filledFrom, setFilledFrom] = useState<typeof exerciseType>(null);
	if (exerciseType && exerciseType !== filledFrom) {
		setFilledFrom(exerciseType);
		setFormState({
			name: exerciseType.name,
			advice: exerciseType.advice || "",
			timer: exerciseType.timer_seconds.toString(),
			repRange1: exerciseType.rep_range_1,
			repRange2: exerciseType.rep_range_2,
			repRange3: exerciseType.rep_range_3,
			repRange4: exerciseType.rep_range_4 || "",
			type_session: exerciseType.session_types,
		});
		setIsRepRange4(Boolean(exerciseType.rep_range_4));
	}

	const handleInputChange = (field: string, value: string) => {
		setFormState((prev) => ({ ...prev, [field]: value }));
	};

	const handleCheckboxChange = (checked: boolean, sessionType: SessionType) => {
		setFormState((prevState) => {
			const updatedTypeSession = checked
				? [...prevState.type_session, sessionType]
				: prevState.type_session.filter((session) => session !== sessionType);
			return { ...prevState, type_session: updatedTypeSession };
		});
	};

	const handleSave = async () => {
		if (formState.name.trim() === "") {
			Alert.alert("Error", "Exercise name is required.");
			return;
		}

		if (formState.timer.trim() === "") {
			Alert.alert("Error", "Rest time is required.");
			return;
		}

		if (
			formState.repRange1.trim() === "" ||
			formState.repRange2.trim() === "" ||
			formState.repRange3.trim() === ""
		) {
			Alert.alert("Error", "All rep ranges are required.");
			return;
		}

		if (formState.type_session.length === 0) {
			Alert.alert("Error", "You must select at least one session type.");
			return;
		}

		const timerValue = parseInt(formState.timer, 10);
		if (Number.isNaN(timerValue)) {
			Alert.alert("Error", "Rest time must be a number.");
			return;
		}
		if (isSaving) return;

		const changes = {
			name: formState.name.trim(),
			advice: formState.advice || null,
			timer_seconds: timerValue,
			rep_range_1: formState.repRange1,
			rep_range_2: formState.repRange2,
			rep_range_3: formState.repRange3,
			rep_range_4: formState.repRange4 || null,
			session_types: formState.type_session,
		};

		if (isCreating) {
			if (!session) return;
			createExerciseType.mutate(
				{ ...changes, owner_id: session.user.id },
				{
					onSuccess: () =>
						Alert.alert("Success", "Exercise type created successfully!", [
							{ text: "OK", onPress: () => router.back() },
						]),
					onError: () => Alert.alert("Error", "Failed to create exercise type"),
				},
			);
			return;
		}

		if (!exerciseType) return;
		updateExerciseType.mutate(
			{ id: exerciseType.id, changes },
			{
				onSuccess: () =>
					Alert.alert("Success", "Exercise type updated successfully!"),
				onError: () => Alert.alert("Error", "Failed to update exercise type"),
			},
		);
	};

	const handleDelete = () => {
		if (!exerciseType || isCreating) return;

		Alert.alert(
			"Delete Exercise Type",
			"Are you sure you want to delete this exercise type? Its history and trophies will be deleted too. This action cannot be undone.",
			[
				{ text: "Cancel", style: "cancel" },
				{
					text: "Delete",
					style: "destructive",
					onPress: () =>
						deleteExerciseType.mutate(exerciseType.id, {
							onSuccess: () => router.back(),
							onError: () =>
								Alert.alert("Error", "Failed to delete exercise type"),
						}),
				},
			],
		);
	};

	if (isLoading) {
		return (
			<View className="flex-1 bg-background items-center justify-center">
				<ActivityIndicator size="large" />
			</View>
		);
	}

	if (!isCreating && !exerciseType) {
		return (
			<View className="flex-1 bg-background items-center justify-center">
				<Text>Exercise type not found</Text>
			</View>
		);
	}

	return (
		<View className="flex-1 bg-background">
			<ScrollView className="flex-1 p-4">
				{/* Header for create mode */}
				{isCreating && (
					<View className="mb-6">
						<Text className="text-2xl font-bold mb-2">New Exercise Type</Text>
						<Text className="text-sm text-gray-500 dark:text-gray-400">
							Create a new exercise type for your workouts
						</Text>
					</View>
				)}
				{/* Name */}
				<View className="mb-4">
					<Text className="text-sm font-medium mb-2">
						Exercise Name{" "}
						{isCreating && <Text className="text-red-500">*</Text>}
					</Text>
					<Input
						value={formState.name}
						onChangeText={(value) => handleInputChange("name", value)}
						placeholder="Exercise name"
						className="mb-2"
					/>
				</View>

				{/* Session Types */}
				<View className="mb-4">
					<Text className="text-sm font-medium mb-2">
						Session Types{" "}
						{isCreating && <Text className="text-red-500">*</Text>}
					</Text>
					<View className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
						<View className="flex-row justify-between">
							<View className="flex-1">
								<View className="flex-row items-center mb-2">
									<Switch
										value={formState.type_session.includes("Upper A")}
										onValueChange={(checked: boolean) =>
											handleCheckboxChange(checked, "Upper A")
										}
									/>
									<Text className="ml-2">Upper A</Text>
								</View>
								<View className="flex-row items-center mb-2">
									<Switch
										value={formState.type_session.includes("Lower")}
										onValueChange={(checked: boolean) =>
											handleCheckboxChange(checked, "Lower")
										}
									/>
									<Text className="ml-2">Lower</Text>
								</View>
								<View className="flex-row items-center mb-2">
									<Switch
										value={formState.type_session.includes("Upper B")}
										onValueChange={(checked: boolean) =>
											handleCheckboxChange(checked, "Upper B")
										}
									/>
									<Text className="ml-2">Upper B</Text>
								</View>
							</View>
							<View className="flex-1">
								<View className="flex-row items-center mb-2">
									<Switch
										value={formState.type_session.includes("Séance A")}
										onValueChange={(checked: boolean) =>
											handleCheckboxChange(checked, "Séance A")
										}
									/>
									<Text className="ml-2">Séance A</Text>
								</View>
								<View className="flex-row items-center mb-2">
									<Switch
										value={formState.type_session.includes("Séance B")}
										onValueChange={(checked: boolean) =>
											handleCheckboxChange(checked, "Séance B")
										}
									/>
									<Text className="ml-2">Séance B</Text>
								</View>
							</View>
						</View>
					</View>
				</View>

				{/* Timer */}
				<View className="mb-4">
					<Text className="text-sm font-medium mb-2">
						Rest Time (seconds){" "}
						{isCreating && <Text className="text-red-500">*</Text>}
					</Text>
					<Input
						value={formState.timer}
						onChangeText={(value) => handleInputChange("timer", value)}
						placeholder="Rest time"
						keyboardType="numeric"
					/>
				</View>

				{/* Rep Ranges */}
				<View className="mb-4 bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
					<View className="flex-row items-center justify-between mb-4">
						<Text className="text-lg font-medium">Repetition Ranges</Text>
						<Pressable
							onPress={() => setAddRepRange4(!addRepRange4)}
							className="text-sm text-blue-500"
						>
							<Text
								className={cn(addRepRange4 ? "text-red-500" : "text-blue-500")}
							>
								{addRepRange4 ? "- Remove a set" : "+ Add a set"}
							</Text>
						</Pressable>
					</View>

					<View className="mb-2">
						<Text className="text-sm font-medium mb-1">
							Set 1 {isCreating && <Text className="text-red-500">*</Text>}
						</Text>
						<Input
							value={formState.repRange1}
							onChangeText={(value) => handleInputChange("repRange1", value)}
							placeholder="e.g., 8-12"
						/>
					</View>

					<View className="mb-2">
						<Text className="text-sm font-medium mb-1">
							Set 2 {isCreating && <Text className="text-red-500">*</Text>}
						</Text>
						<Input
							value={formState.repRange2}
							onChangeText={(value) => handleInputChange("repRange2", value)}
							placeholder="e.g., 8-12"
						/>
					</View>

					<View className="mb-2">
						<Text className="text-sm font-medium mb-1">
							Set 3 {isCreating && <Text className="text-red-500">*</Text>}
						</Text>
						<Input
							value={formState.repRange3}
							onChangeText={(value) => handleInputChange("repRange3", value)}
							placeholder="e.g., 8-12"
						/>
					</View>

					{(isRepRange4 || addRepRange4) && (
						<View className="mb-2">
							<Text className="text-sm font-medium mb-1">Set 4</Text>
							<Input
								value={formState.repRange4}
								onChangeText={(value) => handleInputChange("repRange4", value)}
								placeholder="e.g., 8-12"
							/>
						</View>
					)}
				</View>

				{/* Advice */}
				<View className="mb-6">
					<Text className="text-sm font-medium mb-2">Advice / Notes</Text>
					<Textarea
						value={formState.advice}
						onChangeText={(value) => handleInputChange("advice", value)}
						placeholder="No advice."
						maxLength={200}
						className="min-h-[100]"
					/>
				</View>

				{/* Action Buttons */}
				<View className="flex-row gap-2 mb-20">
					{!isCreating && (
						<Button
							variant="outline"
							onPress={handleDelete}
							className="flex-row w-1/2 gap-2 items-center justify-center"
						>
							<Trash2 size={20} color="#EF4444" strokeWidth={1.7} />
							<Text className="text-red-600 dark:text-red-500">Delete</Text>
						</Button>
					)}
					<Button
						variant="default"
						onPress={handleSave}
						disabled={isSaving}
						className={cn(
							"flex-row items-center justify-center gap-2",
							isCreating ? "w-full" : "w-1/2",
						)}
					>
						{isSaving ? (
							<ActivityIndicator
								size="small"
								color={isDarkColorScheme ? "#1F2937" : "white"}
							/>
						) : (
							<Check
								color={isDarkColorScheme ? "#1F2937" : "#fff"}
								strokeWidth={1.7}
								size={20}
							/>
						)}
						<Text className="text-primary-foreground">
							{isSaving
								? isCreating
									? "Creating..."
									: "Saving..."
								: isCreating
									? "Create Exercise Type"
									: "Save"}
						</Text>
					</Button>
				</View>
			</ScrollView>
		</View>
	);
}
