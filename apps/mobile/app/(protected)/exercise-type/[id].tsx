import { useLocalSearchParams, useRouter } from "expo-router";
import { Check, Trash2 } from "lucide-react-native";
import { useEffect, useState } from "react";
import {
	ActivityIndicator,
	Alert,
	Pressable,
	ScrollView,
	View,
} from "react-native";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Text } from "@/components/ui/text";
import { Textarea } from "@/components/ui/textarea";
import { fetchApi } from "@/lib/api-handler";
import { cn } from "@/lib/utils";
import { Switch } from "@expo/ui/swift-ui";

interface ExerciseType {
	_id: string;
	name: string;
	advice?: string;
	timer: number;
	repRange1: string;
	repRange2: string;
	repRange3: string;
	repRange4?: string;
	type_session: string[];
	trophyLocked?: boolean;
	owner?: string;
}

interface FormState {
	id: string;
	name: string;
	advice: string;
	timer: string;
	repRange1: string;
	repRange2: string;
	repRange3: string;
	repRange4: string;
	type_session: string[];
}

export default function ExerciseTypeDetail() {
	const { id } = useLocalSearchParams<{ id: string }>();
	const router = useRouter();

	const isCreating = id === "new";
	const [isLoading, setIsLoading] = useState(!isCreating);
	const [isSaving, setIsSaving] = useState(false);
	const [exerciseType, setExerciseType] = useState<ExerciseType | null>(null);
	const [addRepRange4, setAddRepRange4] = useState(false);
	const [isRepRange4, setIsRepRange4] = useState(false);

	const [formState, setFormState] = useState<FormState>({
		id: "",
		name: "",
		advice: "",
		timer: "",
		repRange1: "",
		repRange2: "",
		repRange3: "",
		repRange4: "",
		type_session: [],
	});

	const fetchExerciseType = async () => {
		if (!id || isCreating) return;
		try {
			const response: ExerciseType = await fetchApi(`/api/exercise-type/${id}`);
			setExerciseType(response);
			setFormState({
				id: response._id,
				name: response.name,
				advice: response.advice || "",
				timer: response.timer.toString(),
				repRange1: response.repRange1,
				repRange2: response.repRange2,
				repRange3: response.repRange3,
				repRange4: response.repRange4 || "",
				type_session: response.type_session,
			});
			if (response.repRange4) {
				setIsRepRange4(true);
			}
		} catch (error) {
			console.error("Fetch exercise type error:", error);
			Alert.alert("Error", "Failed to load exercise type");
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		if (!isCreating) {
			fetchExerciseType();
		}
	}, [id, isCreating]);

	const handleInputChange = (field: string, value: string) => {
		setFormState((prev) => ({ ...prev, [field]: value }));
	};

	const handleCheckboxChange = (checked: boolean, sessionType: string) => {
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

		setIsSaving(true);
		try {
			const timerValue = parseInt(formState.timer);

			if (isCreating) {
				// Create new exercise type
				await fetchApi(`/api/exercise-type`, {
					method: "POST",
					body: JSON.stringify({
						name: formState.name,
						advice: formState.advice,
						timer: timerValue,
						repRange1: formState.repRange1,
						repRange2: formState.repRange2,
						repRange3: formState.repRange3,
						repRange4: formState.repRange4,
						type_session: formState.type_session,
					}),
				});
				Alert.alert("Success", "Exercise type created successfully!", [
					{
						text: "OK",
						onPress: () => router.back(),
					},
				]);
			} else {
				// Update existing exercise type
				if (!exerciseType) return;
				await fetchApi(`/api/exercise-type/${exerciseType._id}`, {
					method: "PUT",
					body: JSON.stringify({
						name: formState.name,
						advice: formState.advice,
						timer: timerValue,
						repRange1: formState.repRange1,
						repRange2: formState.repRange2,
						repRange3: formState.repRange3,
						repRange4: formState.repRange4,
						type_session: formState.type_session,
					}),
				});
				await fetchExerciseType();
				Alert.alert("Success", "Exercise type updated successfully!");
			}
		} catch (error) {
			console.error(
				isCreating
					? "Create exercise type error:"
					: "Update exercise type error:",
				error,
			);
			Alert.alert(
				"Error",
				isCreating
					? "Failed to create exercise type"
					: "Failed to update exercise type",
			);
		} finally {
			setIsSaving(false);
		}
	};

	const handleDelete = () => {
		if (!exerciseType || isCreating) return;

		Alert.alert(
			"Delete Exercise Type",
			"Are you sure you want to delete this exercise type? This action cannot be undone.",
			[
				{ text: "Cancel", style: "cancel" },
				{
					text: "Delete",
					style: "destructive",
					onPress: async () => {
						try {
							await fetchApi(`/api/exercise-type/${exerciseType._id}`, {
								method: "DELETE",
							});
							router.back();
						} catch (error) {
							console.error("Delete exercise type error:", error);
							Alert.alert("Error", "Failed to delete exercise type");
						}
					},
				},
			],
		);
	};

	if (isLoading) {
		return (
			<View className="flex-1 bg-background dark:bg-background-dark items-center justify-center">
				<ActivityIndicator size="large" />
			</View>
		);
	}

	if (!isCreating && !exerciseType) {
		return (
			<View className="flex-1 bg-background dark:bg-background-dark items-center justify-center">
				<Text>Exercise type not found</Text>
			</View>
		);
	}

	return (
		<View className="flex-1 bg-background dark:bg-background-dark">
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
										variant="switch"
									/>
									<Text className="ml-2">Upper A</Text>
								</View>
								<View className="flex-row items-center mb-2">
									<Switch
										value={formState.type_session.includes("Lower")}
										onValueChange={(checked: boolean) =>
											handleCheckboxChange(checked, "Lower")
										}
										variant="switch"
									/>
									<Text className="ml-2">Lower</Text>
								</View>
								<View className="flex-row items-center mb-2">
									<Switch
										value={formState.type_session.includes("Upper B")}
										onValueChange={(checked: boolean) =>
											handleCheckboxChange(checked, "Upper B")
										}
										variant="switch"
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
										variant="switch"
									/>
									<Text className="ml-2">Séance A</Text>
								</View>
								<View className="flex-row items-center mb-2">
									<Switch
										value={formState.type_session.includes("Séance B")}
										onValueChange={(checked: boolean) =>
											handleCheckboxChange(checked, "Séance B")
										}
										variant="switch"
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
							<ActivityIndicator size="small" color="white" />
						) : (
							<Check color="#fff" strokeWidth={1.7} size={20} />
						)}
						<Text className="text-white">
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
