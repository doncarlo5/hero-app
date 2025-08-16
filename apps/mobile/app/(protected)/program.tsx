import { BottomSheet } from "@expo/ui/swift-ui";
import { Stack, useRouter } from "expo-router";
import {
	ChevronDown,
	ChevronUp,
	Minus,
	PlusCircle,
	SaveIcon,
	XIcon,
} from "lucide-react-native";
import React, { useEffect, useState } from "react";
import {
	ActivityIndicator,
	Alert,
	ScrollView,
	TouchableOpacity,
	View,
} from "react-native";

import { SafeAreaView } from "@/components/safe-area-view";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { fetchApi } from "@/lib/api-handler";
import { Pressable } from "react-native-gesture-handler";

interface ExerciseType {
	_id: string;
	name: string;
}

interface ExerciseProgram {
	exerciseType: ExerciseType;
	alternatives: ExerciseType[];
	order: number;
	_id?: string;
}

const sessionOptions = ["Upper A", "Lower", "Upper B", "Séance A", "Séance B"];

export default function ProgramPage() {
	const [sessionType, setSessionType] = useState("Upper A");
	const [exercises, setExercises] = useState<ExerciseProgram[]>([]);
	const [availableExercises, setAvailableExercises] = useState<ExerciseType[]>(
		[],
	);
	const [isExercisePickerOpen, setIsExercisePickerOpen] = useState(false);
	const [targetExercise, setTargetExercise] = useState<number | null>(null);
	const [isLoading, setIsLoading] = useState(false);
	const [isLoadingTypes, setIsLoadingTypes] = useState(true);
	const [isSaving, setIsSaving] = useState(false);
	const router = useRouter();

	const fetchAllExerciseTypes = async (type: string) => {
		setIsLoadingTypes(true);
		try {
			const res = await fetchApi(
				`/api/exercise-type?type_session=${type}&limit=1000`,
			);
			setAvailableExercises(res || []);
		} catch (e) {
			console.error("Error fetching exercise types", e);
		} finally {
			setIsLoadingTypes(false);
		}
	};

	const fetchProgram = async () => {
		setIsLoading(true);
		try {
			const res = await fetchApi(`/api/program/${sessionType}`);
			setExercises(res?.exercises || []);
		} catch (e) {
			console.error("Error fetching program", e);
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		fetchProgram();
		fetchAllExerciseTypes(sessionType);
	}, [sessionType]);

	const openAddExercise = () => {
		setTargetExercise(null);
		setIsExercisePickerOpen(true);
	};

	const openAddAlternative = (index: number) => {
		setTargetExercise(index);
		setIsExercisePickerOpen(true);
	};

	const handleSelect = (exercise: ExerciseType) => {
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
		setIsExercisePickerOpen(false);
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

	const saveProgram = async () => {
		try {
			setIsSaving(true);
			await fetchApi("/api/program", {
				method: "POST",
				body: JSON.stringify({
					sessionType,
					exercises: exercises.map((ex) => ({
						exerciseType: ex.exerciseType._id,
						order: ex.order,
						alternatives: ex.alternatives.map((alt) => alt._id),
					})),
				}),
			});
			Alert.alert("Success", "Program saved successfully");
			router.back();
		} catch (e) {
			console.error("Error saving program", e);
			Alert.alert("Error", "Failed to save program");
		} finally {
			setIsSaving(false);
		}
	};

	return (
		<>
			<Stack.Screen
				options={{
					title: "Programme",
					headerShown: true,
					headerBackTitle: "Back",
				}}
			/>
			<SafeAreaView className="flex-1 bg-background" edges={["bottom"]}>
				<ScrollView className="flex-1 px-4 pt-4">
					{/* Session Type Selection */}
					<View className="mb-4">
						<Text className="text-lg font-semibold text-foreground mb-3">
							Session Type
						</Text>
						<ScrollView
							horizontal
							showsHorizontalScrollIndicator={false}
							className="mb-4"
						>
							<View className="flex-row gap-2">
								{sessionOptions.map((type) => (
									<TouchableOpacity
										key={type}
										onPress={() => setSessionType(type)}
										className={`px-4 py-2 rounded-lg border ${
											sessionType === type
												? "bg-primary border-primary"
												: "border-border bg-muted/30"
										}`}
									>
										<Text
											className={
												sessionType === type
													? "text-white font-medium"
													: "text-foreground"
											}
										>
											{type}
										</Text>
									</TouchableOpacity>
								))}
							</View>
						</ScrollView>
					</View>

					{/* Add Exercise Button */}
					<Button
						onPress={openAddExercise}
						className="mb-4 flex-row items-center justify-center"
					>
						<PlusCircle size={18} color="white" />
						<Text className="ml-2 text-white font-medium">Add Exercise</Text>
					</Button>

					{/* Exercises List */}
					{isLoading ? (
						<View className="flex-1 items-center justify-center py-8">
							<ActivityIndicator size="large" />
							<Text className="text-muted-foreground mt-2">
								Loading program...
							</Text>
						</View>
					) : exercises.length === 0 ? (
						<View className="bg-muted/30 rounded-lg p-6 items-center">
							<Text className="text-muted-foreground text-center">
								No exercises in this program yet. Add your first exercise!
							</Text>
						</View>
					) : (
						<View className="mb-20">
							{exercises.map((exercise, index) => (
								<View
									key={index}
									className="mb-3 rounded-xl border border-border bg-card p-4"
								>
									<View className="flex-row items-center justify-between">
										<View className="flex-1">
											<Text className="text-lg font-semibold text-foreground">
												{exercise.order}. {exercise.exerciseType.name}
											</Text>
										</View>
										<View className="flex-row items-center gap-1">
											<TouchableOpacity
												onPress={() => openAddAlternative(index)}
												className="p-2 rounded-lg bg-primary/10"
											>
												<PlusCircle size={16} color="#0891b2" />
											</TouchableOpacity>
											<TouchableOpacity
												disabled={index === 0}
												onPress={() => moveExerciseUp(index)}
												className={`p-2 rounded-lg ${
													index === 0 ? "bg-muted/30" : "bg-muted/50"
												}`}
											>
												<ChevronUp
													size={16}
													color={index === 0 ? "#9ca3af" : "#374151"}
												/>
											</TouchableOpacity>
											<TouchableOpacity
												disabled={index === exercises.length - 1}
												onPress={() => moveExerciseDown(index)}
												className={`p-2 rounded-lg ${
													index === exercises.length - 1
														? "bg-muted/30"
														: "bg-muted/50"
												}`}
											>
												<ChevronDown
													size={16}
													color={
														index === exercises.length - 1
															? "#9ca3af"
															: "#374151"
													}
												/>
											</TouchableOpacity>
											<TouchableOpacity
												onPress={() => removeExercise(index)}
												className="p-2 rounded-lg bg-red-100"
											>
												<Minus size={16} color="#dc2626" />
											</TouchableOpacity>
										</View>
									</View>

									{exercise.alternatives.length > 0 && (
										<View className="mt-3 ml-4">
											{exercise.alternatives.map((alt, altIndex) => (
												<View
													key={alt._id}
													className="flex-row items-center justify-between border-l-2 border-border py-2 px-3 bg-muted/20 rounded-r-lg"
												>
													<Text className="text-foreground flex-1">
														{exercise.order}.{altIndex + 1}. {alt.name}
													</Text>
													<View className="flex-row items-center gap-1">
														<TouchableOpacity
															disabled={altIndex === 0}
															onPress={() => moveAlternativeUp(index, altIndex)}
															className={`p-1 rounded ${
																altIndex === 0 ? "bg-muted/30" : "bg-muted/50"
															}`}
														>
															<ChevronUp
																size={14}
																color={altIndex === 0 ? "#9ca3af" : "#374151"}
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
																	? "bg-muted/30"
																	: "bg-muted/50"
															}`}
														>
															<ChevronDown
																size={14}
																color={
																	altIndex === exercise.alternatives.length - 1
																		? "#9ca3af"
																		: "#374151"
																}
															/>
														</TouchableOpacity>
														<TouchableOpacity
															onPress={() => removeAlternative(index, altIndex)}
															className="p-1 rounded bg-red-100"
														>
															<Minus size={14} color="#dc2626" />
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
						disabled={isSaving || exercises.length === 0}
						size="icon"
						className="h-16 w-16 rounded-full items-center justify-center p-0"
					>
						{isSaving ? (
							<ActivityIndicator size="small" color="white" />
						) : (
							<SaveIcon size={28} color="white" />
						)}
					</Button>
				</View>

				{/* Exercise Picker BottomSheet */}
				{isExercisePickerOpen && (
					<BottomSheet
						isOpened={isExercisePickerOpen}
						onIsOpenedChange={(e: boolean) => {
							setIsExercisePickerOpen(e);
						}}
					>
						<View className="bg-background dark:bg-background-dark p-6">
							<View className="w-12 h-1 bg-gray-300 dark:bg-gray-600 rounded-full mx-auto mb-4" />
							<Text className="text-xl font-bold text-foreground dark:text-foreground-dark mb-4">
								{targetExercise === null
									? "Select Exercise"
									: "Select Alternative"}
							</Text>
							{isLoadingTypes ? (
								<View className="items-center py-8">
									<ActivityIndicator size="large" />
									<Text className="text-muted-foreground mt-2">
										Loading exercises...
									</Text>
								</View>
							) : availableExercises.length === 0 ? (
								<View className="bg-muted/30 rounded-lg p-6 items-center">
									<Text className="text-muted-foreground text-center">
										No exercises available for this session type.
									</Text>
								</View>
							) : (
								<ScrollView showsVerticalScrollIndicator={false}>
									<View>
										{availableExercises.map((ex) => (
											<Pressable key={ex._id} onPress={() => handleSelect(ex)}>
												<View className="flex-row items-center p-3 border-b border-border">
													<Text className="text-foreground dark:text-foreground-dark flex-1">
														{ex.name}
													</Text>
												</View>
											</Pressable>
										))}
									</View>
								</ScrollView>
							)}
							<Button
								onPress={() => setIsExercisePickerOpen(false)}
								variant="outline"
								className="mt-4"
							>
								<XIcon size={16} color="#6b7280" />
								<Text className="ml-2">Close</Text>
							</Button>
						</View>
					</BottomSheet>
				)}
			</SafeAreaView>
		</>
	);
}
