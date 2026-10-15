import BottomSheet, {
	BottomSheetBackdrop,
	type BottomSheetBackdropProps,
	BottomSheetScrollView,
} from "@gorhom/bottom-sheet";
import { format } from "date-fns";
import { useLocalSearchParams, useRouter } from "expo-router";
import {
	AlignJustifyIcon,
	CheckIcon,
	EditIcon,
	HistoryIcon,
	InfoIcon,
	StarIcon,
	XIcon,
} from "lucide-react-native";
import React, { useRef, useState } from "react";
import {
	ActivityIndicator,
	Alert,
	Keyboard,
	KeyboardAvoidingView,
	Platform,
	ScrollView,
	TouchableOpacity,
	View,
} from "react-native";

import { CountDownTimer } from "@/components/countdown-timer";
import { SafeAreaView } from "@/components/safe-area-view";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Text } from "@/components/ui/text";
import { Textarea } from "@/components/ui/textarea";
import { useLastExercise, useSaveExercise } from "@/lib/queries/exercises";
import { useExerciseTypes } from "@/lib/queries/exercise-types";
import { useSession } from "@/lib/queries/sessions";
import { setsToArrays, type ExerciseType } from "@/lib/queries/types";
import { useThemeColors } from "@/lib/theme";
import { useColorScheme } from "@/lib/useColorScheme";
import { Pressable } from "react-native-gesture-handler";

// "12,5" and "12.5" are both accepted; empty or invalid input counts as 0
function parseNumber(value: string) {
	if (!value || value.trim() === "") return 0;
	const parsed = parseFloat(value.replace(",", "."));
	return Number.isNaN(parsed) ? 0 : parsed;
}

function CheckboxComponent(props: { isChecked: boolean; onPress: () => void }) {
	return (
		<TouchableOpacity
			onPress={props.onPress}
			className={`h-8 w-8 rounded border-2 border-dashed transition-all ${
				props.isChecked
					? "bg-teal-700 border-teal-700"
					: "border-gray-400 bg-transparent"
			}`}
		>
			{props.isChecked && (
				<View className="flex-1 items-center justify-center">
					<CheckIcon size={20} color="white" strokeWidth={4} />
				</View>
			)}
		</TouchableOpacity>
	);
}

export default function DoExercise() {
	const router = useRouter();
	const { isDarkColorScheme } = useColorScheme();
	const themeColors = useThemeColors();
	const { sessionId, exerciseTypeId } = useLocalSearchParams<{
		sessionId: string;
		exerciseTypeId?: string;
	}>();

	// Bottom sheet ref
	const bottomSheetRef = useRef<BottomSheet>(null);
	// ScrollView ref for keyboard handling
	const scrollViewRef = useRef<ScrollView>(null);

	const sessionQuery = useSession(sessionId);
	const exerciseTypesQuery = useExerciseTypes(sessionQuery.data?.type_session);
	const saveExercise = useSaveExercise();
	const [pickedTypeId, setPickedTypeId] = useState<string | null>(
		exerciseTypeId ?? null,
	);

	const allExerciseTypes = sessionQuery.data
		? (exerciseTypesQuery.data ?? [])
		: [];
	const isLoadingTypes = sessionQuery.isLoading || exerciseTypesQuery.isLoading;
	const oneExerciseType: ExerciseType | null =
		allExerciseTypes.find((type) => type.id === pickedTypeId) ?? null;
	const selectedExerciseIndex = oneExerciseType
		? allExerciseTypes.indexOf(oneExerciseType)
		: null;

	const lastExerciseQuery = useLastExercise(oneExerciseType?.id ?? null);
	const isLoadingLastExercise = lastExerciseQuery.isLoading;
	const lastExerciseData = lastExerciseQuery.data ?? null;
	// Previous sets as arrays, plus the date of the session they were done in
	const lastExercise = lastExerciseData
		? {
				rep: setsToArrays(lastExerciseData.exercise_sets).reps,
				weight: setsToArrays(lastExerciseData.exercise_sets).weights,
				comment: lastExerciseData.comment,
				date: lastExerciseData.sessions?.date_session ?? null,
			}
		: null;
	const isLoading = saveExercise.isPending;

	const [showPrefillButton, setShowPrefillButton] = useState(false);
	const [addRep4, setAddRep4] = useState(false);

	// Handle backdrop press to close sheet
	const renderBackdrop = (props: BottomSheetBackdropProps) => (
		<BottomSheetBackdrop
			{...props}
			disappearsOnIndex={-1}
			appearsOnIndex={0}
			opacity={0.5}
		/>
	);

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

	const [completedSets, setCompletedSets] = useState({
		set1: false,
		set2: false,
		set3: false,
		set4: false,
	});

	// Prefill with the previous sets of this exercise type, once per loaded exercise
	const [prefilledFrom, setPrefilledFrom] = useState<string | null>(null);
	if (lastExerciseData && lastExerciseData.id !== prefilledFrom) {
		setPrefilledFrom(lastExerciseData.id);
		const { reps, weights } = setsToArrays(lastExerciseData.exercise_sets);
		setFormState({
			rep1: reps[0]?.toString() || "",
			weight1: weights[0]?.toString() || "",
			rep2: reps[1]?.toString() || "",
			weight2: weights[1]?.toString() || "",
			rep3: reps[2]?.toString() || "",
			weight3: weights[2]?.toString() || "",
			rep4: reps[3]?.toString() || "",
			weight4: weights[3]?.toString() || "",
			comment: "",
		});
		setAddRep4(Boolean(reps[3]));
	}

	const onExerciseTypeChange = (exerciseType: ExerciseType) => {
		setPickedTypeId(exerciseType.id);
	};

	const handleInputChange = (field: string, value: string) => {
		setFormState({ ...formState, [field]: value });

		if (field === "weight1") {
			setShowPrefillButton(true);
		}
	};

	const handlePrefillWeights = () => {
		const newFormState = {
			...formState,
			weight2: formState.weight1,
			weight3: formState.weight1,
		};

		if (oneExerciseType?.rep_range_4 || addRep4) {
			newFormState.weight4 = formState.weight1;
		}

		setFormState(newFormState);
		setShowPrefillButton(false);
	};

	const handleSubmit = () => {
		if (!oneExerciseType || !sessionId || isLoading) return;

		// Same shape as before: three or four sets, in order, empty ones as 0
		const showsSet4 = Boolean(addRep4 || oneExerciseType.rep_range_4);
		const sets = [
			{ reps: formState.rep1, weight: formState.weight1 },
			{ reps: formState.rep2, weight: formState.weight2 },
			{ reps: formState.rep3, weight: formState.weight3 },
			...(showsSet4
				? [{ reps: formState.rep4, weight: formState.weight4 }]
				: []),
		].map((set) => ({
			reps: Math.round(parseNumber(set.reps)),
			weight: parseNumber(set.weight),
		}));

		saveExercise.mutate(
			{
				typeId: oneExerciseType.id,
				sessionId,
				comment: formState.comment,
				sets,
			},
			{
				onSuccess: (result) => {
					const goToSession = () =>
						router.replace({
							pathname: "/(protected)/session/[id]",
							params: { id: sessionId, fromExercise: "true" },
						});
					if (result.new_trophies.length > 0) {
						const names = result.new_trophies
							.map((trophy) => `${trophy.trophy_type} (${trophy.description})`)
							.join("\n");
						Alert.alert("Nouveau trophée ! 🏆", names, [
							{ text: "OK", onPress: goToSession },
						]);
					} else {
						goToSession();
					}
				},
				// The form keeps its values so the user can retry
				onError: (error) =>
					Alert.alert("Error", error.message || "Failed to save exercise"),
			},
		);
	};

	const toggleSet = (setNumber: 1 | 2 | 3 | 4) => {
		setCompletedSets((prev) => ({
			...prev,
			[`set${setNumber}`]: !prev[`set${setNumber}` as keyof typeof prev],
		}));
	};

	return (
		<SafeAreaView className="flex-1 bg-background" edges={["bottom"]}>
			<KeyboardAvoidingView
				behavior={Platform.OS === "ios" ? "padding" : "height"}
				className="flex-1"
				keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
			>
				<ScrollView
					ref={scrollViewRef}
					className="flex-1 px-4 pt-4"
					keyboardShouldPersistTaps="handled"
					contentContainerStyle={{ paddingBottom: 100 }}
					showsVerticalScrollIndicator={true}
				>
					{/* Exercise Type Selection */}
					<View className="mb-4">
						{isLoadingTypes ? (
							<View className="bg-muted/30 rounded-lg p-4">
								<ActivityIndicator size="small" />
							</View>
						) : allExerciseTypes.length === 0 ? (
							<View className="bg-muted/30 rounded-lg p-4">
								<Text className="text-muted-foreground text-center">
									Please create an exercise for this session type.
								</Text>
							</View>
						) : (
							<Button
								onPress={() => {
									bottomSheetRef.current?.snapToIndex(0);
								}}
								variant="ghost"
								className="flex-row w-full items-center bg-muted rounded-md justify-between p-4"
							>
								<Text className="text-foreground">
									{oneExerciseType
										? oneExerciseType.name
										: "Select an exercise"}
								</Text>
								<AlignJustifyIcon
									size={20}
									color={themeColors.foreground}
									strokeWidth={1.5}
								/>
							</Button>
						)}
					</View>

					{/* Last Exercise Date */}
					{lastExercise?.date && (
						<View className="flex-row items-center justify-end gap-1 px-2 py-1 mb-3">
							<HistoryIcon size={14} color={themeColors.mutedForeground} />
							<Text className="text-sm text-muted-foreground">
								{isLoadingLastExercise
									? "Loading..."
									: format(new Date(lastExercise.date), "dd/MM/yyyy")}
							</Text>
						</View>
					)}

					{/* Advice */}
					{oneExerciseType?.advice && (
						<View className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 mb-5 flex-row items-start gap-2">
							<InfoIcon
								size={16}
								color={isDarkColorScheme ? "#60a5fa" : "#1e40af"}
							/>
							<Text className="text-sm text-blue-700 dark:text-blue-200 flex-1">
								{oneExerciseType.advice}
							</Text>
						</View>
					)}

					{oneExerciseType && (
						<CountDownTimer exerciseTypeTimer={oneExerciseType.timer_seconds} />
					)}

					{/* Exercise Form */}
					{oneExerciseType && (
						<View>
							{/* Prefill Button */}
							{showPrefillButton && (
								<View className="flex-row gap-2 mb-2">
									<Button
										variant="outline"
										onPress={handlePrefillWeights}
										className="flex-1 flex-row items-center justify-center"
									>
										<StarIcon size={16} color={themeColors.mutedForeground} />
										<Text className="ml-1">
											All sets to {formState.weight1} KG
										</Text>
									</Button>
									<Button
										variant="outline"
										size="icon"
										onPress={() => setShowPrefillButton(false)}
									>
										<XIcon size={16} color={themeColors.mutedForeground} />
									</Button>
								</View>
							)}

							{/* Sets Form */}
							<View className="bg-slate-50 dark:bg-slate-900/40 rounded-2xl py-4 px-2 mb-5">
								<View className="flex-row justify-between gap-1 px-2">
									{/* Reps Column */}
									<View className="flex-1 max-w-[25%]">
										<Text className="text-sm text-muted-foreground text-center mb-2">
											Reps
										</Text>
										<View className="gap-1">
											<Input
												value={formState.rep1}
												onChangeText={(value) =>
													handleInputChange("rep1", value)
												}
												placeholder={lastExercise?.rep[0]?.toString() || "0"}
												keyboardType="numeric"
												returnKeyType="done"
												blurOnSubmit
												onSubmitEditing={Keyboard.dismiss}
												className="h-12 text-center text-3xl font-black"
											/>
											<Input
												value={formState.rep2}
												onChangeText={(value) =>
													handleInputChange("rep2", value)
												}
												placeholder={lastExercise?.rep[1]?.toString() || "0"}
												keyboardType="numeric"
												returnKeyType="done"
												blurOnSubmit
												onSubmitEditing={Keyboard.dismiss}
												className="h-12 text-center text-3xl font-black"
											/>
											<Input
												value={formState.rep3}
												onChangeText={(value) =>
													handleInputChange("rep3", value)
												}
												placeholder={lastExercise?.rep[2]?.toString() || "0"}
												keyboardType="numeric"
												returnKeyType="done"
												blurOnSubmit
												onSubmitEditing={Keyboard.dismiss}
												className="h-12 text-center text-3xl font-black"
											/>
											{(addRep4 || oneExerciseType.rep_range_4) && (
												<Input
													value={formState.rep4}
													onChangeText={(value) =>
														handleInputChange("rep4", value)
													}
													placeholder={lastExercise?.rep[3]?.toString() || "0"}
													keyboardType="numeric"
													returnKeyType="done"
													blurOnSubmit
													onSubmitEditing={Keyboard.dismiss}
													className="h-12 text-center text-3xl font-black"
												/>
											)}
										</View>
									</View>

									{/* Weight Column */}
									<View className="flex-1 max-w-[35%]">
										<Text className="text-sm text-muted-foreground text-center mb-2">
											KG
										</Text>
										<View className="gap-1">
											<Input
												value={formState.weight1}
												onChangeText={(value) =>
													handleInputChange("weight1", value)
												}
												placeholder={lastExercise?.weight[0]?.toString() || "0"}
												keyboardType="numeric"
												returnKeyType="done"
												blurOnSubmit
												onSubmitEditing={Keyboard.dismiss}
												className="h-12 text-center text-3xl font-black"
											/>
											<Input
												value={formState.weight2}
												onChangeText={(value) =>
													handleInputChange("weight2", value)
												}
												placeholder={lastExercise?.weight[1]?.toString() || "0"}
												keyboardType="numeric"
												returnKeyType="done"
												blurOnSubmit
												onSubmitEditing={Keyboard.dismiss}
												className="h-12 text-center text-3xl font-black"
											/>
											<Input
												value={formState.weight3}
												onChangeText={(value) =>
													handleInputChange("weight3", value)
												}
												placeholder={lastExercise?.weight[2]?.toString() || "0"}
												keyboardType="numeric"
												returnKeyType="done"
												blurOnSubmit
												onSubmitEditing={Keyboard.dismiss}
												className="h-12 text-center text-3xl font-black"
											/>
											{(addRep4 || oneExerciseType.rep_range_4) && (
												<Input
													value={formState.weight4}
													onChangeText={(value) =>
														handleInputChange("weight4", value)
													}
													placeholder={
														lastExercise?.weight[3]?.toString() || "0"
													}
													keyboardType="numeric"
													returnKeyType="done"
													blurOnSubmit
													onSubmitEditing={Keyboard.dismiss}
													className="h-12 text-center text-2xl font-bold"
												/>
											)}
										</View>
									</View>

									{/* Range Column */}
									<View className="flex-1 max-w-[20%]">
										<Text className="text-sm text-muted-foreground text-center mb-2">
											Range
										</Text>
										<View className="gap-1">
											<View className="h-12 items-center justify-center">
												<Text className="text-gray-700 dark:text-gray-300 font-light">
													{oneExerciseType.rep_range_1}
												</Text>
											</View>
											<View className="h-12 items-center justify-center">
												<Text className="text-gray-700 dark:text-gray-300 font-light">
													{oneExerciseType.rep_range_2}
												</Text>
											</View>
											<View className="h-12 items-center justify-center">
												<Text className="text-gray-700 dark:text-gray-300 font-light">
													{oneExerciseType.rep_range_3}
												</Text>
											</View>
											{(addRep4 || oneExerciseType.rep_range_4) && (
												<View className="h-12 items-center justify-center">
													<Text className="text-gray-700 dark:text-gray-300 font-light">
														{oneExerciseType.rep_range_4}
													</Text>
												</View>
											)}
										</View>
									</View>

									{/* Checkbox Column */}
									<View className="flex-1 max-w-[20%]">
										<Text className="text-sm text-muted-foreground text-center mb-2">
											Set
										</Text>
										<View className="gap-1">
											<View className="h-12 items-center justify-center">
												<CheckboxComponent
													isChecked={completedSets.set1}
													onPress={() => toggleSet(1)}
												/>
											</View>
											<View className="h-12 items-center justify-center">
												<CheckboxComponent
													isChecked={completedSets.set2}
													onPress={() => toggleSet(2)}
												/>
											</View>
											<View className="h-12 items-center justify-center">
												<CheckboxComponent
													isChecked={completedSets.set3}
													onPress={() => toggleSet(3)}
												/>
											</View>
											{(addRep4 || oneExerciseType.rep_range_4) && (
												<View className="h-12 items-center justify-center">
													<CheckboxComponent
														isChecked={completedSets.set4}
														onPress={() => toggleSet(4)}
													/>
												</View>
											)}
										</View>
									</View>
								</View>

								{/* Add/Remove Set 4 Button */}
								{!oneExerciseType.rep_range_4 && (
									<TouchableOpacity
										onPress={() => setAddRep4(!addRep4)}
										className="mt-4 items-center"
									>
										<Text className="text-xs italic text-gray-400 dark:text-gray-500">
											{addRep4 ? "Reduce by one set ↑" : "Add one set ↓"}
										</Text>
									</TouchableOpacity>
								)}
							</View>

							{/* Notes Section */}
							<View className="bg-slate-50 dark:bg-slate-900/40 rounded-2xl p-4 mb-20">
								<View className="flex-row items-center gap-2 mb-3">
									<EditIcon size={16} color={themeColors.mutedForeground} />
									<Text className="text-muted-foreground">Notes</Text>
									{lastExercise?.comment && (
										<View className="w-2 h-2 bg-teal-500 rounded-full" />
									)}
								</View>
								<Textarea
									value={formState.comment}
									onChangeText={(value) => handleInputChange("comment", value)}
									placeholder={
										lastExercise?.comment
											? `Previous note: ${lastExercise.comment}`
											: "Previous note: None."
									}
									maxLength={200}
									className="min-h-[80px]"
								/>
							</View>
						</View>
					)}
				</ScrollView>
			</KeyboardAvoidingView>

			{/* Submit Button */}
			{oneExerciseType && (
				<View className="absolute bottom-20 right-10">
					<Button
						onPress={handleSubmit}
						disabled={isLoading}
						size="icon"
						className="h-16 w-16 rounded-full items-center justify-center p-0"
					>
						{isLoading ? (
							<ActivityIndicator
								size="small"
								color={themeColors.primaryForeground}
							/>
						) : (
							<CheckIcon size={28} color={themeColors.primaryForeground} />
						)}
					</Button>
				</View>
			)}

			{/* Exercise Picker BottomSheet */}
			<BottomSheet
				ref={bottomSheetRef}
				index={-1}
				enableDynamicSizing={true}
				enablePanDownToClose={true}
				maxDynamicContentSize={600}
				backdropComponent={renderBackdrop}
				backgroundStyle={{
					backgroundColor: themeColors.popover,
				}}
				handleIndicatorStyle={{
					backgroundColor: themeColors.mutedForeground,
				}}
			>
				<BottomSheetScrollView
					contentContainerStyle={{
						padding: 24,
						paddingBottom: 24,
						backgroundColor: themeColors.popover,
						flexGrow: 1,
					}}
				>
					<Text className="text-xl font-bold mb-4">Select Exercise</Text>
					<View>
						{allExerciseTypes.map((type, index) => (
							<Pressable
								key={type.id}
								onPress={() => {
									onExerciseTypeChange(type);
									bottomSheetRef.current?.close();
								}}
							>
								<View className="flex-row items-center p-3">
									<View
										className={`rounded-full border border-gray-300 dark:border-gray-600 p-2 ${
											selectedExerciseIndex === index
												? "bg-gray-700 dark:bg-gray-500"
												: "bg-transparent"
										}`}
									/>
									<Text
										className={`ml-2 ${
											selectedExerciseIndex === index
												? "text-primary font-semibold"
												: "text-foreground"
										}`}
									>
										{type.name}
									</Text>
								</View>
							</Pressable>
						))}
					</View>
				</BottomSheetScrollView>
			</BottomSheet>
		</SafeAreaView>
	);
}
