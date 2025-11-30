import BottomSheet, {
	BottomSheetBackdrop,
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
import React, { useCallback, useEffect, useRef, useState } from "react";
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
import { colors } from "@/constants/colors";
import { fetchApi } from "@/lib/api-handler";
import { useColorScheme } from "@/lib/useColorScheme";
import { Pressable } from "react-native-gesture-handler";

type ExerciseType = {
	_id: string;
	name: string;
	advice?: string;
	timer: number;
	repRange1: string;
	repRange2: string;
	repRange3: string;
	repRange4?: string;
	type_session: string[];
};

type LastExercise = {
	_id: string;
	rep: number[];
	weight: number[];
	comment?: string;
	session: {
		_id: string;
		date_session: string;
	};
};

type ExerciseUserSummary = {
	_id?: string;
	id?: string;
};

type Session = {
	_id: string;
	name?: string;
	type_session: string;
	exercise_user_list: (string | ExerciseUserSummary)[];
};

export default function DoExercise() {
	const router = useRouter();
	const { isDarkColorScheme, colorScheme } = useColorScheme();
	const { sessionId, exerciseTypeId } = useLocalSearchParams<{
		sessionId: string;
		exerciseTypeId?: string;
	}>();

	// Bottom sheet ref
	const bottomSheetRef = useRef<BottomSheet>(null);
	// ScrollView ref for keyboard handling
	const scrollViewRef = useRef<ScrollView>(null);

	const [oneExerciseType, setOneExerciseType] = useState<ExerciseType | null>(
		null,
	);
	const [lastExercise, setLastExercise] = useState<LastExercise | null>(null);
	const [allExerciseTypes, setAllExerciseTypes] = useState<ExerciseType[]>([]);
	const [session, setSession] = useState<Session | null>(null);
	const [showPrefillButton, setShowPrefillButton] = useState(false);
	const [addRep4, setAddRep4] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [isLoadingTypes, setIsLoadingTypes] = useState(true);
	const [isLoadingLastExercise, setIsLoadingLastExercise] = useState(true);
	const [selectedExerciseIndex, setSelectedExerciseIndex] = useState<
		number | null
	>(null);
	const [isExercisePickerOpen, setIsExercisePickerOpen] = useState(false);

	// Handle sheet changes
	const handleSheetChange = useCallback((index: number) => {
		setIsExercisePickerOpen(index >= 0);
	}, []);

	// Handle backdrop press to close sheet
	const renderBackdrop = useCallback(
		(props: any) => (
			<BottomSheetBackdrop
				{...props}
				disappearsOnIndex={-1}
				appearsOnIndex={0}
				opacity={0.5}
			/>
		),
		[],
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

	useEffect(() => {
		if (lastExercise) {
			setFormState({
				rep1: lastExercise.rep[0]?.toString() || "",
				weight1: lastExercise.weight[0]?.toString() || "",
				rep2: lastExercise.rep[1]?.toString() || "",
				weight2: lastExercise.weight[1]?.toString() || "",
				rep3: lastExercise.rep[2]?.toString() || "",
				weight3: lastExercise.weight[2]?.toString() || "",
				rep4: lastExercise.rep[3]?.toString() || "",
				weight4: lastExercise.weight[3]?.toString() || "",
				comment: "",
			});
			if (lastExercise.rep[3]) {
				setAddRep4(true);
			} else {
				setAddRep4(false);
			}
		}
	}, [lastExercise]);

	const onExerciseTypeChange = async (exerciseType: ExerciseType) => {
		setOneExerciseType(exerciseType);
		setIsLoadingLastExercise(true);
		try {
			const response = await fetchApi(
				`/api/exercise-user?limit=1&sort=-createdAt&type=${exerciseType._id}`,
			);
			setLastExercise(response[0] || null);
		} catch (error: any) {
			console.error("Fetch error: ", error);
		} finally {
			setIsLoadingLastExercise(false);
		}
	};

	const fetchAllExerciseTypes = async (sessionData: Session) => {
		try {
			const response = await fetchApi(
				`/api/exercise-type?type_session=${sessionData.type_session}&limit=1000`,
			);
			return response;
		} catch (error: any) {
			console.error("Fetch error: ", error);
			return [];
		} finally {
			setIsLoadingTypes(false);
		}
	};

	useEffect(() => {
		const fetchOneSession = async () => {
			if (!sessionId) return null;
			try {
				const response = await fetchApi(`/api/sessions/${sessionId}`);
				return response;
			} catch (error: any) {
				console.error("Fetch error: ", error);
				return null;
			}
		};

		const fetchInitialData = async () => {
			const sessionData = await fetchOneSession();
			if (sessionData) {
				setSession(sessionData);
				const exerciseTypes = await fetchAllExerciseTypes(sessionData);
				setAllExerciseTypes(exerciseTypes);

				// Check if exerciseTypeId exists in URL, and auto-select the exercise type
				if (exerciseTypeId) {
					const selectedExerciseType = exerciseTypes.find(
						(type: ExerciseType) => type._id === exerciseTypeId,
					);
					if (selectedExerciseType) {
						const selectedIndex = exerciseTypes.findIndex(
							(type: ExerciseType) => type._id === exerciseTypeId,
						);
						setSelectedExerciseIndex(selectedIndex);
						await onExerciseTypeChange(selectedExerciseType);
					}
				}
			}
		};

		fetchInitialData();
	}, [exerciseTypeId, sessionId]);

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

		if (oneExerciseType?.repRange4 || addRep4) {
			newFormState.weight4 = formState.weight1;
		}

		setFormState(newFormState);
		setShowPrefillButton(false);
	};

	const handleSubmit = async () => {
		if (!oneExerciseType || !sessionId) return;

		try {
			setIsLoading(true);

			const response = await fetchApi("/api/exercise-user", {
				method: "POST",
				body: JSON.stringify({
					type: oneExerciseType._id,
					rep: [formState.rep1, formState.rep2, formState.rep3, formState.rep4],
					weight: [
						formState.weight1,
						formState.weight2,
						formState.weight3,
						formState.weight4,
					],
					comment: formState.comment,
					session: sessionId,
				}),
			});

			if (session) {
				const existingExerciseIds = (session.exercise_user_list || []).map(
					(exercise) =>
						typeof exercise === "string"
							? exercise
							: exercise?._id || exercise?.id,
				);

				const updatedSession = {
					exercise_user_list: [
						...existingExerciseIds.filter(Boolean),
						response._id,
					],
				};

				await fetchApi(`/api/sessions/${sessionId}`, {
					method: "PUT",
					body: JSON.stringify(updatedSession),
				});
			}

			router.replace({
				pathname: "/(protected)/session/[id]",
				params: { id: sessionId, fromExercise: "true" },
			});
		} catch (error: any) {
			console.error(error);
			Alert.alert("Error", "Failed to save exercise");
		} finally {
			setIsLoading(false);
		}
	};

	const toggleSet = (setNumber: 1 | 2 | 3 | 4) => {
		setCompletedSets((prev) => ({
			...prev,
			[`set${setNumber}`]: !prev[`set${setNumber}` as keyof typeof prev],
		}));
	};

	const CheckboxComponent = ({
		isChecked,
		onPress,
	}: {
		isChecked: boolean;
		onPress: () => void;
	}) => (
		<TouchableOpacity
			onPress={onPress}
			className={`h-8 w-8 rounded border-2 border-dashed transition-all ${
				isChecked
					? "bg-teal-700 border-teal-700"
					: "border-gray-400 bg-transparent"
			}`}
		>
			{isChecked && (
				<View className="flex-1 items-center justify-center">
					<CheckIcon size={20} color="white" strokeWidth={4} />
				</View>
			)}
		</TouchableOpacity>
	);

	return (
		<SafeAreaView
			className="flex-1 bg-background dark:bg-background-dark"
			edges={["bottom"]}
		>
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
							<View className="bg-muted/30 dark:bg-muted-dark/30 rounded-lg p-4">
								<ActivityIndicator size="small" />
							</View>
						) : allExerciseTypes.length === 0 ? (
							<View className="bg-muted/30 dark:bg-muted-dark/30 rounded-lg p-4">
								<Text className="text-muted-foreground dark:text-gray-400 text-center">
									Please create an exercise for this session type.
								</Text>
							</View>
						) : (
							<Button
								onPress={() => {
									bottomSheetRef.current?.snapToIndex(0);
									setIsExercisePickerOpen(true);
								}}
								variant="ghost"
								className="flex-row w-full items-center dark:text-foreground-dark bg-gray-100 dark:bg-gray-700 rounded-md justify-between p-4"
							>
								<Text className="text-foreground dark:text-foreground-dark">
									{oneExerciseType
										? oneExerciseType.name
										: "Select an exercise"}
								</Text>
								<AlignJustifyIcon
									size={20}
									color={isDarkColorScheme ? "#9CA3AF" : "#252525"}
									strokeWidth={1.5}
								/>
							</Button>
						)}
					</View>

					{/* Last Exercise Date */}
					{lastExercise && (
						<View className="flex-row items-center justify-end gap-1 px-2 py-1 mb-3">
							<HistoryIcon
								size={14}
								color={isDarkColorScheme ? "#9CA3AF" : "#6b7280"}
							/>
							<Text className="text-sm text-muted-foreground dark:text-gray-400">
								{isLoadingLastExercise
									? "Loading..."
									: format(
											new Date(lastExercise.session.date_session),
											"dd/MM/yyyy",
										)}
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
						<CountDownTimer exerciseTypeTimer={oneExerciseType.timer} />
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
										<StarIcon
											size={16}
											color={isDarkColorScheme ? "#9CA3AF" : "#6b7280"}
										/>
										<Text className="ml-1">
											All sets to {formState.weight1} KG
										</Text>
									</Button>
									<Button
										variant="outline"
										size="icon"
										onPress={() => setShowPrefillButton(false)}
									>
										<XIcon size={16} color="#6b7280" />
									</Button>
								</View>
							)}

							{/* Sets Form */}
							<View className="bg-slate-50 dark:bg-slate-900/40 rounded-2xl py-4 px-2 mb-5">
								<View className="flex-row justify-between gap-1 px-2">
									{/* Reps Column */}
									<View className="flex-1 max-w-[25%]">
										<Text className="text-sm text-muted-foreground dark:text-gray-400 text-center mb-2">
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
											{(addRep4 || oneExerciseType.repRange4) && (
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
										<Text className="text-sm text-muted-foreground dark:text-gray-400 text-center mb-2">
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
											{(addRep4 || oneExerciseType.repRange4) && (
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
										<Text className="text-sm text-muted-foreground dark:text-gray-400 text-center mb-2">
											Range
										</Text>
										<View className="gap-1">
											<View className="h-12 items-center justify-center">
												<Text className="text-gray-700 dark:text-gray-300 font-light">
													{oneExerciseType.repRange1}
												</Text>
											</View>
											<View className="h-12 items-center justify-center">
												<Text className="text-gray-700 dark:text-gray-300 font-light">
													{oneExerciseType.repRange2}
												</Text>
											</View>
											<View className="h-12 items-center justify-center">
												<Text className="text-gray-700 dark:text-gray-300 font-light">
													{oneExerciseType.repRange3}
												</Text>
											</View>
											{(addRep4 || oneExerciseType.repRange4) && (
												<View className="h-12 items-center justify-center">
													<Text className="text-gray-700 dark:text-gray-300 font-light">
														{oneExerciseType.repRange4}
													</Text>
												</View>
											)}
										</View>
									</View>

									{/* Checkbox Column */}
									<View className="flex-1 max-w-[20%]">
										<Text className="text-sm text-muted-foreground dark:text-gray-400 text-center mb-2">
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
											{(addRep4 || oneExerciseType.repRange4) && (
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
								{!oneExerciseType.repRange4 && (
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
									<EditIcon
										size={16}
										color={isDarkColorScheme ? "#9CA3AF" : "#6b7280"}
									/>
									<Text className="text-muted-foreground dark:text-gray-400">
										Notes
									</Text>
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
								color={isDarkColorScheme ? "#000000" : "#ffffff"}
							/>
						) : (
							<CheckIcon
								size={28}
								color={isDarkColorScheme ? "#000000" : "#ffffff"}
							/>
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
				onChange={handleSheetChange}
				onClose={() => setIsExercisePickerOpen(false)}
				backdropComponent={renderBackdrop}
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
					<Text className="text-xl font-bold mb-4">Select Exercise</Text>
					<View>
						{allExerciseTypes.map((type, index) => (
							<Pressable
								key={type._id}
								onPress={() => {
									setSelectedExerciseIndex(index);
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
												: "text-foreground dark:text-foreground-dark"
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
