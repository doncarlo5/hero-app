import { DateTimePicker } from "@expo/ui/community/datetime-picker";
import { Picker } from "@expo/ui/community/picker";
import { format } from "date-fns";
import { fr } from "date-fns/locale/fr";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useRef, useState } from "react";
import {
	ActivityIndicator,
	Alert,
	Modal,
	Platform,
	Pressable,
	RefreshControl,
	ScrollView,
	TextInput,
	View,
} from "react-native";

import { Button } from "heroui-native";
import { errorMessage } from "@/lib/errors";
import { Text } from "@/components/ui/text";
import { useActiveProgram } from "@/lib/queries/programs";
import { prescriptionLabels } from "@/lib/queries/types";
import {
	useDeleteSession,
	usePreviousSession,
	useSession,
	useUpdateSession,
} from "@/lib/queries/sessions";
import type { Session } from "@/lib/queries/types";
import { useThemeColors } from "@/lib/theme";
import { useColorScheme } from "@/lib/useColorScheme";
import {
	ArrowLeftIcon,
	CalendarIcon,
	CheckCircleIcon,
	ChevronRightIcon,
	ChevronsRight,
	Gauge,
	PlayIcon,
	PlusIcon,
	SaveIcon,
	TrashIcon,
	XIcon,
} from "lucide-react-native";

type FormState = {
	body_weight: string;
	comment: string;
	date_session: string;
};

// Weight options for picker (30kg to 200kg with 0.1kg increments)
const weightOptions = Array.from(
	{ length: 1701 },
	(_, i) => `${(i / 10 + 30).toFixed(1)} kg`,
);

function formFromSession(session: Session): FormState {
	return {
		body_weight: String(session.body_weight || ""),
		comment: session.comment ?? "",
		date_session: session.date_session,
	};
}

export default function SessionDetail() {
	const { id } = useLocalSearchParams<{
		id: string;
		fromExercise?: string;
	}>();
	const router = useRouter();
	const { isDarkColorScheme } = useColorScheme();
	const themeColors = useThemeColors();

	const commentTextareaRef = useRef<TextInput>(null);

	const sessionQuery = useSession(id);
	const previousSessionQuery = usePreviousSession(id);
	const programQuery = useActiveProgram();
	const updateSession = useUpdateSession();
	const deleteSession = useDeleteSession();

	const session = sessionQuery.data ?? null;
	const lastSession = previousSessionQuery.data ?? null;
	// The session's day in the active program (null for a free session or another program's day)
	const day =
		programQuery.data?.program_days.find(
			(d) => d.id === sessionQuery.data?.program_day_id,
		) ?? null;
	const isLoading = sessionQuery.isLoading;
	const isSaving = updateSession.isPending;
	const isDeleting = deleteSession.isPending;
	const [skippedExercises, setSkippedExercises] = useState<string[]>([]);
	const [isCompleting, setIsCompleting] = useState(false);
	const [refreshing, setRefreshing] = useState(false);
	const [isCalendarOpen, setIsCalendarOpen] = useState(false);
	const [isWeightPickerOpen, setIsWeightPickerOpen] = useState(false);
	const [isExerciseInfoOpen, setIsExerciseInfoOpen] = useState(false);
	const [isCommentSheetOpen, setIsCommentSheetOpen] = useState(false);
	const [commentDraft, setCommentDraft] = useState<string>("");

	// Handle exercise info modal open
	const handleOpenExerciseInfo = () => {
		setIsExerciseInfoOpen(true);
	};

	// Handle comment modal open
	const handleOpenCommentSheet = () => {
		setIsCommentSheetOpen(true);
		setCommentDraft(formState.comment);
		// Auto focus textarea after a short delay
		setTimeout(() => {
			commentTextareaRef.current?.focus();
		}, 150);
	};

	const [selectedDate, setSelectedDate] = useState<Date | null>(null);
	const [selectedWeight, setSelectedWeight] = useState<string>("");
	const [selectedWeightIndex, setSelectedWeightIndex] = useState<number>(0);

	const [formState, setFormState] = useState<FormState>({
		body_weight: "",
		comment: "",
		date_session: "",
	});
	const [originalFormState, setOriginalFormState] = useState<FormState>({
		body_weight: "",
		comment: "",
		date_session: "",
	});

	// First slot of the day not logged yet in this session (nor skipped), in program order
	const getNextExercise = () => {
		if (!day || !session) return null;

		const loggedMovementIds = session.logged_exercises.map(
			(exercise) => exercise.movement_id,
		);
		const loggedSlotIds = session.logged_exercises.map(
			(exercise) => exercise.slot_id,
		);

		const nextSlot = day.slots.find(
			(slot) =>
				!loggedSlotIds.includes(slot.id) &&
				!loggedMovementIds.includes(slot.movement_id) &&
				!skippedExercises.includes(slot.id),
		);
		if (!nextSlot) return null;

		return {
			slotId: nextSlot.id,
			exerciseType: nextSlot.movement,
			alternatives: nextSlot.alternatives.map(
				(alternative) => alternative.movement,
			),
		};
	};

	const handleSkipExercise = () => {
		const nextExercise = getNextExercise();
		if (nextExercise) {
			setSkippedExercises([...skippedExercises, nextExercise.slotId]);
		}
	};

	// Sync the form with the loaded session (also after each save that changed it)
	const [syncedFrom, setSyncedFrom] = useState<typeof session>(null);
	if (session && session !== syncedFrom) {
		setSyncedFrom(session);
		const newFormState = formFromSession(session);
		setFormState(newFormState);
		setOriginalFormState(newFormState);
		setSelectedDate(new Date(session.date_session));
		setSelectedWeight(String(session.body_weight || ""));
		const weightValue = String(session.body_weight || "70.0");
		const weightIndex = weightOptions.findIndex(
			(option) => option === `${parseFloat(weightValue).toFixed(1)} kg`,
		);
		setSelectedWeightIndex(weightIndex >= 0 ? weightIndex : 400); // Default to 70.0kg (index 400)
	}

	const onRefresh = async () => {
		setRefreshing(true);
		await sessionQuery.refetch();
		setRefreshing(false);
	};

	// Persists the form fields; resolves false (and alerts) on failure
	const saveFields = async (fields: FormState & { is_done?: boolean }) => {
		if (!session) return false;
		try {
			await updateSession.mutateAsync({
				id: session.id,
				changes: {
					body_weight: parseFloat(fields.body_weight) || 0,
					comment: fields.comment,
					date_session: fields.date_session,
					...(fields.is_done !== undefined ? { is_done: fields.is_done } : {}),
				},
			});
			setOriginalFormState({
				body_weight: fields.body_weight,
				comment: fields.comment,
				date_session: fields.date_session,
			});
			return true;
		} catch (error) {
			Alert.alert(
				"Erreur",
				errorMessage(error, "Impossible d’enregistrer la séance. Réessaie."),
			);
			return false;
		}
	};

	// Enhanced form state management - track dirty state
	const hasChanges = () => {
		return (
			formState.body_weight !== originalFormState.body_weight ||
			formState.comment !== originalFormState.comment ||
			formState.date_session !== originalFormState.date_session
		);
	};

	// Auto-save functionality
	const handleSave = async () => {
		if (!session || !hasChanges()) return;
		await saveFields(formState);
	};

	// Handle comment save
	const handleCommentSave = async () => {
		setFormState((prev) => ({ ...prev, comment: commentDraft }));
		setIsCommentSheetOpen(false);
		await saveFields({ ...formState, comment: commentDraft });
	};

	// Handle comment clear
	const handleCommentClear = () => {
		setCommentDraft("");
		commentTextareaRef.current?.focus();
	};

	const handleCompleteSession = async () => {
		if (!session) return;

		Alert.alert(
			"Complete Session",
			"Are you sure you want to mark this session as completed?",
			[
				{ text: "Cancel", style: "cancel" },
				{
					text: "Complete",
					style: "default",
					onPress: async () => {
						setIsCompleting(true);
						const saved = await saveFields({ ...formState, is_done: true });
						setIsCompleting(false);
						if (saved) {
							router.replace("/(protected)/(tabs)");
						}
					},
				},
			],
		);
	};

	const handleDeleteSession = async () => {
		if (!session) return;

		Alert.alert(
			"Delete Session",
			"This action cannot be undone. All exercises in this session will also be deleted.",
			[
				{ text: "Cancel", style: "cancel" },
				{
					text: "Delete",
					style: "destructive",
					onPress: () =>
						deleteSession.mutate(session.id, {
							onSuccess: () => router.back(),
							onError: () =>
								Alert.alert(
									"Error",
									"Failed to delete session. Please try again.",
								),
						}),
				},
			],
		);
	};

	const handleDateSelect = (date: Date) => {
		setSelectedDate(date);
		setFormState((prev) => ({
			...prev,
			date_session: date.toISOString(),
		}));
	};

	const handleWeightValueChange = (itemValue: string, itemIndex: number) => {
		setSelectedWeightIndex(itemIndex);
		const selectedWeightValue = itemValue.replace(" kg", "");
		setSelectedWeight(selectedWeightValue);
		setFormState((prev) => ({
			...prev,
			body_weight: selectedWeightValue,
		}));
	};

	const handleWeightDone = async () => {
		// Get the current weight from the picker based on selectedWeightIndex
		const currentWeightOption = weightOptions[selectedWeightIndex];
		const currentWeightValue = currentWeightOption.replace(" kg", "");

		// Update formState with the current selection
		setSelectedWeight(currentWeightValue);
		const updatedFormState = {
			...formState,
			body_weight: currentWeightValue,
		};
		setFormState(updatedFormState);

		setIsWeightPickerOpen(false);

		// Save the session if there are changes
		if (session && currentWeightValue !== originalFormState.body_weight) {
			await saveFields(updatedFormState);
		}
	};

	if (isLoading) {
		return (
			<View className="flex-1 items-center justify-center bg-background">
				<ActivityIndicator />
			</View>
		);
	}

	if (!session) {
		return (
			<View className="flex-1 items-center justify-center bg-background">
				<Text className="text-foreground">Session not found</Text>
			</View>
		);
	}

	return (
		<View className="flex-1 bg-background">
			<View style={{ position: "relative", flex: 1 }}>
				<ScrollView
					className="flex-1"
					refreshControl={
						<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
					}
					contentContainerStyle={{ padding: 16, paddingBottom: 120 }}
				>
					{/* Session Header */}
					<View className="flex-row items-center justify-between mb-4">
						<View className="">
							<Pressable
								onPress={handleOpenExerciseInfo}
								android_ripple={{ color: "rgba(0,0,0,0.1)" }}
								hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
								className="flex-row w-fit items-center gap-3 active:opacity-50"
							>
								<Text className="text-2xl font-bold text-foreground mb-1">
									{session.program_day?.name ?? session.label ?? "Séance libre"}
								</Text>
								<Text className="text-sm text-muted">What{"'"}s next?</Text>
							</Pressable>
							<Text className="text-sm text-muted">
								{format(new Date(session.date_session), "EEEE d MMMM yyyy", {
									locale: fr,
								})}
							</Text>
						</View>
						<View
							className={`rounded-full px-4 py-2 ${
								session.is_done
									? "bg-green-100 dark:bg-green-900/30"
									: "bg-orange-100 dark:bg-orange-900/30"
							}`}
						>
							<Text
								className={`text-sm font-medium ${
									session.is_done
										? "text-green-700 dark:text-green-300"
										: "text-orange-700 dark:text-orange-300"
								}`}
							>
								{session.is_done ? "Completed" : "In Progress"}
							</Text>
						</View>
					</View>

					{/* Editable Fields */}
					<View className="space-y-4 mb-6">
						{/* Date Picker */}
						<View className="flex-row items-center gap-2 mb-2">
							<View className="flex-1">
								{Platform.OS === "ios" ? (
									<View className="flex-row items-center w-full bg-default rounded-md justify-between px-2 h-12">
										<DateTimePicker
											value={selectedDate || new Date()}
											mode="date"
											display="compact"
											accentColor={themeColors.brand}
											onValueChange={(_event, date) => handleDateSelect(date)}
											style={{ flex: 1, height: 40 }}
										/>
									</View>
								) : (
									<Pressable
										onPress={() => setIsCalendarOpen(true)}
										className="flex-row items-center w-full bg-default rounded-md justify-between px-4 h-12"
									>
										<Text className="text-foreground">
											{selectedDate
												? format(selectedDate, "d MMM yyyy", { locale: fr })
												: "Select date"}
										</Text>
										<CalendarIcon
											size={20}
											color={themeColors.foreground}
											strokeWidth={1.5}
										/>
									</Pressable>
								)}
								{Platform.OS === "android" && isCalendarOpen && (
									<DateTimePicker
										value={selectedDate || new Date()}
										mode="date"
										onValueChange={(_event, date) => {
											setIsCalendarOpen(false);
											handleDateSelect(date);
										}}
										onDismiss={() => setIsCalendarOpen(false)}
									/>
								)}
							</View>

							{/* Body Weight */}
							<View className="flex-1">
								<Pressable
									onPress={() => setIsWeightPickerOpen(true)}
									className="flex-row items-center w-full bg-default rounded-md justify-between px-4 h-12"
								>
									<Text className="text-foreground">
										{selectedWeight ? `${selectedWeight} kg` : "Select weight"}
									</Text>
									<Gauge
										size={20}
										color={themeColors.foreground}
										strokeWidth={1.5}
									/>
								</Pressable>
							</View>
						</View>

						{/* Comment with last session reference */}
						<Pressable
							onPress={handleOpenCommentSheet}
							android_ripple={{ color: "rgba(0,0,0,0.1)" }}
							hitSlop={{ top: 5, bottom: 5, left: 5, right: 5 }}
							className="bg-default rounded-lg py-3 px-4 active:opacity-70"
						>
							<Text className="text-sm underline text-muted font-semibold">
								{formState.comment ||
									(lastSession?.comment
										? `Your last notes: ${lastSession.comment}`
										: "Add note")}
							</Text>
						</Pressable>
					</View>

					{/* EXERCISES */}
					<View>
						<View className="flex-row items-center justify-between">
							<View className="flex-1">
								<Text className="text-2xl font-bold text-foreground">
									Exercises
								</Text>
								<Text className="text-sm text-muted">
									{session.logged_exercises.length} exercise
									{session.logged_exercises.length !== 1 ? "s" : ""} completed
								</Text>
							</View>
						</View>

						{session.program_day_id && !session.is_done && (
							<Button
								onPress={() =>
									router.push(
										`/(protected)/guided-session?sessionId=${session.id}`,
									)
								}
								className="mt-4"
							>
								<PlayIcon size={16} color={themeColors.accentForeground} />
								<Button.Label>Séance guidée</Button.Label>
							</Button>
						)}
						<Button
							variant={
								session.program_day_id && !session.is_done
									? "secondary"
									: "primary"
							}
							onPress={() =>
								router.push(`/(protected)/do-exercise?sessionId=${session.id}`)
							}
							className="my-4"
						>
							<PlusIcon
								size={16}
								color={
									session.program_day_id && !session.is_done
										? themeColors.foreground
										: themeColors.accentForeground
								}
							/>
							<Button.Label>Add an exercise</Button.Label>
						</Button>

						{/* A session holds a handful of exercises: a plain list inside the scroll view */}
						{session.logged_exercises.map((item) => (
							<Pressable
								key={item.id}
								onPress={() => router.push(`/exercise/${item.id}`)}
								className="mb-4 overflow-hidden rounded-xl bg-background shadow-sm border border-default/20"
							>
								{/* Exercise Header */}
								<View className="flex-row items-center justify-between mb-3 ">
									<View className="flex-1">
										<Text className="font-bold text-lg text-foreground">
											{item.movement.name}
										</Text>
									</View>
									<ChevronRightIcon
										size={20}
										color={themeColors.mutedForeground}
									/>
								</View>

								<View className="mb-3">
									<View className="flex-row gap-2 w-full">
										{item.logged_sets
											.filter((set) => set.kind === "working")
											.sort((a, b) => a.set_order - b.set_order)
											.map((set, index) => {
												// Only show sets with actual data
												if (
													(set.duration_seconds ?? set.reps) <= 0 ||
													set.weight < 0
												)
													return null;

												return (
													<View
														key={index}
														className="bg-foreground/5 flex-1 rounded-lg px-3 py-2 border border-foreground/10"
													>
														<Text className="text-xs font-medium text-foreground">
															Set {index + 1}
															{set.side === "left"
																? " · G"
																: set.side === "right"
																	? " · D"
																	: ""}
														</Text>
														<Text className="text-sm font-bold text-foreground">
															{set.duration_seconds != null
																? `${set.duration_seconds} s`
																: `${set.reps} reps`}
														</Text>
														<Text className="text-xs text-muted">
															{set.weight} kg
														</Text>
													</View>
												);
											})}
									</View>
								</View>

								{item.logged_sets.some((set) => set.kind !== "working") && (
									<Text className="text-xs text-muted mb-3">
										{[
											["warmup", "échauffement"],
											["drop", "drop"],
											["cheat", "reps trichées"],
											["switch", "switch"],
											["mini", "mini-série"],
										]
											.map(([kind, label]) => {
												const count = item.logged_sets.filter(
													(set) => set.kind === kind,
												).length;
												return count > 0 ? `${count} × ${label}` : null;
											})
											.filter(Boolean)
											.join(" · ")}
									</Text>
								)}

								{item.comment && (
									<View className="bg-default/20 rounded-lg mb-4">
										<Text className="text-sm text-foreground">
											{item.comment}
										</Text>
									</View>
								)}
							</Pressable>
						))}

						{/* Next Exercise Suggestion */}
						{day && getNextExercise() && (
							<View className="mt-6">
								<Text className="text-lg font-semibold text-foreground mb-3">
									Next Exercise:
								</Text>

								{/* Main exercise button */}
								<View className="flex-row gap-2 mb-3">
									<Button
										onPress={() => {
											const nextExercise = getNextExercise();
											if (nextExercise && nextExercise.exerciseType) {
												router.push(
													`/(protected)/do-exercise?sessionId=${session.id}&movementId=${nextExercise.exerciseType.id}&slotId=${nextExercise.slotId}`,
												);
											}
										}}
										variant="outline"
										className="flex-1 border-2 border-dotted bg-slate-100/20 dark:bg-slate-900/20"
									>
										<Button.Label>
											{getNextExercise()?.exerciseType?.name}
										</Button.Label>
									</Button>

									{/* Skip button */}
									<Button
										onPress={handleSkipExercise}
										variant="outline"
										className="w-20 border-none bg-slate-100/60 dark:bg-slate-900/60"
									>
										<Button.Label>Skip</Button.Label>
										<ChevronsRight
											size={16}
											color={themeColors.mutedForeground}
										/>
									</Button>
								</View>

								{/* Alternative exercises */}
								{(getNextExercise()?.alternatives?.length ?? 0) > 0 && (
									<View className="mb-3">
										<Text className="text-sm font-medium text-muted mb-2">
											Alternatives:
										</Text>
										{getNextExercise()?.alternatives?.map((alt) => (
											<Button
												key={alt.id}
												onPress={() =>
													router.push(
														`/(protected)/do-exercise?sessionId=${session.id}&movementId=${alt.id}&slotId=${getNextExercise()?.slotId ?? ""}`,
													)
												}
												variant="outline"
												className="mb-2 border-2 border-dotted bg-slate-100/20 dark:bg-slate-900/20"
											>
												<Button.Label>{alt.name}</Button.Label>
											</Button>
										))}
									</View>
								)}
							</View>
						)}
					</View>

					{/* Bottom Action Buttons */}
					<View className="flex-row gap-2 mt-4">
						<Button
							variant="outline"
							onPress={handleDeleteSession}
							isDisabled={isDeleting}
							className="flex-1"
						>
							<TrashIcon size={16} color="#ef4444" />
							<Button.Label>
								{isDeleting ? "Deleting..." : "Delete"}
							</Button.Label>
						</Button>

						{!session.is_done ? (
							<Button
								onPress={handleCompleteSession}
								isDisabled={isCompleting}
								className="flex-1"
							>
								<CheckCircleIcon
									size={16}
									color={themeColors.accentForeground}
								/>
								<Button.Label>
									{isCompleting ? "Completing..." : "Complete"}
								</Button.Label>
							</Button>
						) : (
							<Button
								onPress={() => router.replace("/(protected)/(tabs)")}
								className="flex-1"
							>
								<ArrowLeftIcon size={16} color={themeColors.accentForeground} />
								<Button.Label>Go back to list</Button.Label>
							</Button>
						)}
					</View>
				</ScrollView>

				{/* Floating Save Button */}
				{hasChanges() && (
					<View className="absolute bottom-10 right-10">
						<Pressable
							onPress={handleSave}
							disabled={isSaving}
							className={`w-14 h-14 rounded-full items-center justify-center shadow-lg ${
								isSaving ? "bg-foreground/50" : "bg-foreground"
							}`}
						>
							{isSaving ? (
								<ActivityIndicator
									size="small"
									color={themeColors.primaryForeground}
								/>
							) : (
								<SaveIcon size={24} color={themeColors.primaryForeground} />
							)}
						</Pressable>
					</View>
				)}
			</View>

			{/* Weight Picker Modal */}
			<Modal
				visible={isWeightPickerOpen}
				transparent={true}
				animationType="fade"
				onRequestClose={() => setIsWeightPickerOpen(false)}
			>
				<Pressable
					style={{
						flex: 1,
						backgroundColor: "rgba(0, 0, 0, 0.5)",
						justifyContent: "center",
						alignItems: "center",
					}}
					onPress={() => setIsWeightPickerOpen(false)}
				>
					<Pressable
						style={{
							backgroundColor: themeColors.popover,
							borderRadius: 24,
							padding: 24,
							width: "90%",
							maxWidth: 400,
							maxHeight: "70%",
						}}
						onPress={(e) => e.stopPropagation()}
					>
						<View className="flex-row items-center justify-between mb-4">
							<Text className="text-lg font-bold">Select Body Weight</Text>
							<Pressable
								onPress={() => setIsWeightPickerOpen(false)}
								className="p-2"
							>
								<XIcon
									size={20}
									color={themeColors.foreground}
									strokeWidth={2}
								/>
							</Pressable>
						</View>
						<Picker
							selectedValue={(() => {
								if (selectedWeight) {
									const formattedWeight = `${parseFloat(selectedWeight).toFixed(1)} kg`;
									// Validate that the weight exists in options, otherwise fall back to validated index
									return weightOptions.includes(formattedWeight)
										? formattedWeight
										: weightOptions[selectedWeightIndex];
								}
								return weightOptions[selectedWeightIndex];
							})()}
							onValueChange={handleWeightValueChange}
							style={{
								height: 200,
							}}
						>
							{weightOptions.map((option, index) => (
								<Picker.Item key={index} label={option} value={option} />
							))}
						</Picker>
						<Button
							onPress={handleWeightDone}
							isDisabled={isSaving}
							className="mt-4"
						>
							{isSaving ? (
								<ActivityIndicator
									size="small"
									color={themeColors.accentForeground}
								/>
							) : (
								<Button.Label>Done</Button.Label>
							)}
						</Button>
					</Pressable>
				</Pressable>
			</Modal>

			{/* Exercise Info Modal */}
			<Modal
				visible={isExerciseInfoOpen}
				transparent={true}
				animationType="fade"
				onRequestClose={() => setIsExerciseInfoOpen(false)}
			>
				<Pressable
					style={{
						flex: 1,
						backgroundColor: "rgba(0, 0, 0, 0.5)",
						justifyContent: "center",
						alignItems: "center",
					}}
					onPress={() => setIsExerciseInfoOpen(false)}
				>
					<Pressable
						style={{
							backgroundColor: themeColors.popover,
							borderRadius: 24,
							padding: 24,
							width: "90%",
							maxWidth: 400,
							maxHeight: "70%",
						}}
						onPress={(e) => e.stopPropagation()}
					>
						<View className="flex-row items-center justify-between mb-4">
							<Text className="text-lg font-bold text-foreground">
								{day?.name ?? session?.label ?? "Séance libre"}
							</Text>
							<Pressable
								onPress={() => setIsExerciseInfoOpen(false)}
								className="p-2"
							>
								<XIcon
									size={20}
									color={themeColors.foreground}
									strokeWidth={2}
								/>
							</Pressable>
						</View>
						<ScrollView
							contentContainerStyle={{
								paddingBottom: 24,
							}}
						>
							<View>
								{(day?.slots ?? []).length === 0 && (
									<Text className="text-muted">
										Pas de programme pour cette séance.
									</Text>
								)}
								{(day?.slots ?? []).map((slot, index) => (
									<View
										key={slot.id}
										className="flex-row items-center gap-3 mb-2"
									>
										<View className="w-6 h-6 rounded-full bg-foreground/10 items-center justify-center">
											<Text className="text-xs font-bold text-foreground">
												{index + 1}
											</Text>
										</View>
										<View className="flex-1">
											<Text className="text-foreground">
												{slot.movement.name}
											</Text>
											<Text className="text-xs text-muted">
												{prescriptionLabels(slot).join(" / ")}
											</Text>
										</View>
									</View>
								))}
							</View>
						</ScrollView>
					</Pressable>
				</Pressable>
			</Modal>

			{/* Comment Modal */}
			<Modal
				visible={isCommentSheetOpen}
				transparent={true}
				animationType="fade"
				onRequestClose={() => {
					setIsCommentSheetOpen(false);
					setCommentDraft("");
				}}
			>
				<Pressable
					style={{
						flex: 1,
						backgroundColor: "rgba(0, 0, 0, 0.5)",
						justifyContent: "center",
						alignItems: "center",
					}}
					onPress={() => {
						setIsCommentSheetOpen(false);
						setCommentDraft("");
					}}
				>
					<Pressable
						style={{
							backgroundColor: themeColors.popover,
							borderRadius: 24,
							padding: 24,
							width: "90%",
							maxWidth: 400,
							maxHeight: "70%",
						}}
						onPress={(e) => e.stopPropagation()}
					>
						<View className="flex-row items-center justify-between mb-4">
							<Text className="text-lg font-bold text-foreground">
								Add note
							</Text>
							<Pressable
								onPress={() => {
									setIsCommentSheetOpen(false);
									setCommentDraft("");
								}}
								className="p-2"
							>
								<XIcon
									size={20}
									color={themeColors.foreground}
									strokeWidth={2}
								/>
							</Pressable>
						</View>

						<View style={{ marginBottom: 16 }}>
							<TextInput
								ref={commentTextareaRef}
								value={commentDraft}
								onChangeText={setCommentDraft}
								placeholder="Enter your note..."
								style={{
									minHeight: 60,
									maxHeight: 120,
									padding: 12,
									borderRadius: 8,
									borderWidth: 1,
									borderColor: themeColors.input,
									backgroundColor: themeColors.background,
									color: themeColors.foreground,
									fontSize: 16,
									textAlignVertical: "top",
								}}
								placeholderTextColor={themeColors.mutedForeground}
								multiline={true}
								numberOfLines={2}
								blurOnSubmit={false}
							/>
						</View>

						<View className="flex-row gap-3">
							<Button
								onPress={handleCommentClear}
								variant="outline"
								isDisabled={!commentDraft.trim()}
								className="flex-1"
							>
								<Button.Label>Clear</Button.Label>
							</Button>
							<Button
								onPress={handleCommentSave}
								isDisabled={isSaving}
								className="flex-1"
							>
								{isSaving ? (
									<ActivityIndicator
										size="small"
										color={themeColors.accentForeground}
									/>
								) : (
									<Button.Label>Done</Button.Label>
								)}
							</Button>
						</View>
					</Pressable>
				</Pressable>
			</Modal>
		</View>
	);
}
