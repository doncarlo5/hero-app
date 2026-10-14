import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";
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
	ScrollView,
	TouchableOpacity,
	View,
} from "react-native";

import { SafeAreaView } from "@/components/safe-area-view";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { colors } from "@/constants/colors";
import { useExerciseTypes } from "@/lib/queries/exercise-types";
import { useProgram, useSaveProgram } from "@/lib/queries/programs";
import {
	SESSION_TYPES,
	type ExerciseTypeRef,
	type SessionType,
} from "@/lib/queries/types";
import { useColorScheme } from "@/lib/useColorScheme";
import { Pressable } from "react-native-gesture-handler";

interface ExerciseProgram {
	exerciseType: ExerciseTypeRef;
	alternatives: ExerciseTypeRef[];
	order: number;
}

export default function ProgramPage() {
	const { colorScheme } = useColorScheme();

	// Bottom sheet ref
	const bottomSheetRef = useRef<BottomSheet>(null);

	const [sessionType, setSessionType] = useState<SessionType>("Upper A");
	const programQuery = useProgram(sessionType);
	const exerciseTypesQuery = useExerciseTypes(sessionType);
	const saveProgramMutation = useSaveProgram();
	// Local draft, edited until saved
	const [exercises, setExercises] = useState<ExerciseProgram[]>([]);
	const [targetExercise, setTargetExercise] = useState<number | null>(null);

	const availableExercises = exerciseTypesQuery.data ?? [];
	const isLoading = programQuery.isLoading;
	const isLoadingTypes = exerciseTypesQuery.isLoading;
	const isSaving = saveProgramMutation.isPending;
	const router = useRouter();

	// Reset the draft from the saved program when it loads, is saved, or the session
	// type changes (an empty program is null for several session types)
	const [draftFrom, setDraftFrom] = useState<{
		sessionType: SessionType;
		program: typeof programQuery.data;
	} | null>(null);
	if (
		programQuery.data !== undefined &&
		(draftFrom?.sessionType !== sessionType ||
			draftFrom.program !== programQuery.data)
	) {
		setDraftFrom({ sessionType, program: programQuery.data });
		const programExercises = programQuery.data?.program_exercises ?? [];
		setExercises(
			programExercises.map((programExercise, index) => ({
				exerciseType: programExercise.exercise_types,
				alternatives: programExercise.program_exercise_alternatives.map(
					(alternative) => alternative.exercise_types,
				),
				order: index + 1,
			})),
		);
	}

	const openAddExercise = () => {
		setTargetExercise(null);
		bottomSheetRef.current?.snapToIndex(0);
	};

	const openAddAlternative = (index: number) => {
		setTargetExercise(index);
		bottomSheetRef.current?.snapToIndex(0);
	};

	const handleSelect = (exercise: ExerciseTypeRef) => {
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
		if (isSaving) return;
		saveProgramMutation.mutate(
			{
				sessionType,
				exercises: exercises.map((ex) => ({
					exerciseTypeId: ex.exerciseType.id,
					alternativeIds: ex.alternatives.map((alt) => alt.id),
				})),
			},
			{
				onSuccess: () => {
					Alert.alert("Success", "Program saved successfully");
					router.back();
				},
				onError: () => Alert.alert("Error", "Failed to save program"),
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
					headerStyle: {
						backgroundColor:
							colorScheme === "dark"
								? colors.dark.background
								: colors.light.background,
					},
					headerTintColor:
						colorScheme === "dark"
							? colors.dark.foreground
							: colors.light.foreground,
					headerShadowVisible: true,
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
								{SESSION_TYPES.map((type) => (
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
													? "text-primary-foreground font-medium"
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
						<PlusCircle
							size={18}
							color={colorScheme === "dark" ? "#000000" : "#ffffff"}
						/>
						<Text className="ml-2 text-primary-foreground font-medium">
							Add Exercise
						</Text>
					</Button>

					{/* Exercises List */}
					{isLoading ? (
						<View className="flex-1 items-center justify-center py-8">
							<ActivityIndicator size="large" />
							<Text className="text-muted-foreground dark:text-gray-400 mt-2">
								Loading program...
							</Text>
						</View>
					) : exercises.length === 0 ? (
						<View className="bg-muted/30 rounded-lg p-6 items-center">
							<Text className="text-muted-foreground dark:text-gray-400 text-center">
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
												<PlusCircle
													size={16}
													color={colorScheme === "dark" ? "#0891b2" : "#0891b2"}
												/>
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
						disabled={isSaving || exercises.length === 0}
						size="icon"
						className="h-16 w-16 rounded-full items-center justify-center p-0"
					>
						{isSaving ? (
							<ActivityIndicator
								size="small"
								color={colorScheme === "dark" ? "#000000" : "#ffffff"}
							/>
						) : (
							<SaveIcon
								size={28}
								color={colorScheme === "dark" ? "#000000" : "#ffffff"}
							/>
						)}
					</Button>
				</View>

				{/* Exercise Picker BottomSheet */}
				<BottomSheet
					ref={bottomSheetRef}
					index={-1}
					enableDynamicSizing={true}
					enablePanDownToClose={true}
					maxDynamicContentSize={600}
					backgroundStyle={{
						backgroundColor:
							colorScheme === "dark" ? colors.dark.card : colors.light.card,
					}}
					handleIndicatorStyle={{
						backgroundColor: colorScheme === "dark" ? "#6B7280" : "#9CA3AF",
					}}
				>
					<BottomSheetScrollView
						contentContainerStyle={{
							padding: 24,
							paddingBottom: 24,
							backgroundColor:
								colorScheme === "dark" ? colors.dark.card : colors.light.card,
							flexGrow: 1,
						}}
					>
						<Text className="text-xl font-bold mb-4">
							{targetExercise === null
								? "Select Exercise"
								: "Select Alternative"}
						</Text>
						{isLoadingTypes ? (
							<View className="items-center py-8">
								<ActivityIndicator size="large" />
								<Text className="text-muted-foreground dark:text-gray-400 mt-2">
									Loading exercises...
								</Text>
							</View>
						) : availableExercises.length === 0 ? (
							<View className="bg-muted/30 rounded-lg p-6 items-center">
								<Text className="text-muted-foreground dark:text-gray-400 text-center">
									No exercises available for this session type.
								</Text>
							</View>
						) : (
							<View>
								{availableExercises.map((ex) => (
									<Pressable key={ex.id} onPress={() => handleSelect(ex)}>
										<View className="flex-row items-center p-3 border-b border-border">
											<Text className="text-foreground flex-1">{ex.name}</Text>
										</View>
									</Pressable>
								))}
							</View>
						)}
						<Button
							onPress={() => bottomSheetRef.current?.close()}
							variant="outline"
							className="mt-4"
						>
							<XIcon size={16} color="#6b7280" />
							<Text className="ml-2">Close</Text>
						</Button>
					</BottomSheetScrollView>
				</BottomSheet>
			</SafeAreaView>
		</>
	);
}
