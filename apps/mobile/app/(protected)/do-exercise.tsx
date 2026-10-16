import {
	BottomSheet,
	BottomSheetScrollView,
} from "@expo/ui/community/bottom-sheet";
import { format } from "date-fns";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Button, Input, TextArea } from "heroui-native";
import {
	AlignJustifyIcon,
	ArrowUpIcon,
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
	Pressable,
	ScrollView,
	TouchableOpacity,
	View,
} from "react-native";

import { errorMessage } from "@/lib/errors";
import { CountDownTimer } from "@/components/countdown-timer";
import { MovementPicker } from "@/components/movement-picker";
import { SafeAreaView } from "@/components/safe-area-view";
import { Text } from "@/components/ui/text";
import { useLastPerformance, useSaveExercise } from "@/lib/queries/exercises";
import {
	slotWithMovementSettings,
	withMovementSettings,
} from "@/lib/movement-settings";
import { useMovementSettings, useMovements } from "@/lib/queries/movements";
import { useActiveProgram } from "@/lib/queries/programs";
import { useSession } from "@/lib/queries/sessions";
import {
	prescriptionLabels,
	setsToArrays,
	type Slot,
} from "@/lib/queries/types";
import { targetsFor } from "@/lib/progression/slot-targets";
import { sheetBackgroundStyle, useThemeColors } from "@/lib/theme";
import { useColorScheme } from "@/lib/useColorScheme";

// Fixed height: the picker can list more movements than fit on screen
const PICKER_SNAP_POINTS = ["90%"];

const DEFAULT_REST_SECONDS = 90;

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

type SetDraft = { reps: string; weight: string; done: boolean };

export default function DoExercise() {
	const router = useRouter();
	const { isDarkColorScheme } = useColorScheme();
	const themeColors = useThemeColors();
	const params = useLocalSearchParams<{
		sessionId: string;
		movementId?: string;
		slotId?: string;
	}>();
	const sessionId = params.sessionId;

	const bottomSheetRef = useRef<BottomSheet>(null);
	const scrollViewRef = useRef<ScrollView>(null);

	const sessionQuery = useSession(sessionId);
	const programQuery = useActiveProgram();
	const movementsQuery = useMovements();
	const settingsQuery = useMovementSettings();
	const saveExercise = useSaveExercise();
	const [pickedMovementId, setPickedMovementId] = useState<string | null>(
		params.movementId ?? null,
	);

	const day =
		programQuery.data?.program_days.find(
			(d) => d.id === sessionQuery.data?.program_day_id,
		) ?? null;
	const allMovements = movementsQuery.data ?? [];
	const isLoadingMovements =
		sessionQuery.isLoading ||
		movementsQuery.isLoading ||
		programQuery.isLoading;
	const settings = settingsQuery.data ?? new Map();
	const pickedMovement = allMovements.find((m) => m.id === pickedMovementId);
	// With the user's settings for a library movement (load step)
	const movement = pickedMovement
		? withMovementSettings(pickedMovement, settings)
		: null;

	// The slot this exercise fills: the one passed by the session screen, else the day's slot that
	// uses or offers the movement
	const daySlot: Slot | null =
		day?.slots.find((s) => s.id === params.slotId) ??
		day?.slots.find(
			(s) =>
				s.movement_id === pickedMovementId ||
				s.alternatives.some((a) => a.movement.id === pickedMovementId),
		) ??
		null;
	const slot = daySlot ? slotWithMovementSettings(daySlot, settings) : null;

	// Movements of the day are pinned first in the picker (slot movements and their alternatives)
	const dayMovementIds = new Set(
		(day?.slots ?? []).flatMap((s) => [
			s.movement_id,
			...s.alternatives.map((a) => a.movement.id),
		]),
	);
	const dayMovements = allMovements.filter((m) => dayMovementIds.has(m.id));

	const lastPerformanceQuery = useLastPerformance(movement?.id ?? null);
	const lastPerformance = lastPerformanceQuery.data ?? null;
	const lastSets = lastPerformance
		? (() => {
				const { reps, weights } = setsToArrays(lastPerformance.logged_sets);
				return reps.map((r, i) => ({ reps: r, weight: weights[i] }));
			})()
		: [];
	const targets = movement ? targetsFor(slot, movement, lastSets) : [];
	const rangeLabels = slot ? prescriptionLabels(slot) : [];
	const isLoading = saveExercise.isPending;

	const [showPrefillButton, setShowPrefillButton] = useState(false);
	const [sets, setSets] = useState<SetDraft[]>([]);
	const [comment, setComment] = useState("");

	// Prefill once per movement, slot and last performance: target loads, reps left to the lifter
	const prefillKey = movement
		? `${movement.id}:${slot?.id ?? "-"}:${lastPerformance?.id ?? "-"}`
		: null;
	const [prefilledFrom, setPrefilledFrom] = useState<string | null>(null);
	if (
		prefillKey &&
		prefillKey !== prefilledFrom &&
		!lastPerformanceQuery.isLoading
	) {
		setPrefilledFrom(prefillKey);
		setSets(
			targets.map((target) => ({
				reps: "",
				weight: target.weight?.toString() ?? "",
				done: false,
			})),
		);
	}

	const updateSet = (index: number, changes: Partial<SetDraft>) => {
		setSets((prev) =>
			prev.map((s, i) => (i === index ? { ...s, ...changes } : s)),
		);
		if (index === 0 && changes.weight !== undefined) {
			setShowPrefillButton(true);
		}
	};

	const handlePrefillWeights = () => {
		setSets((prev) =>
			prev.map((s) => ({ ...s, weight: prev[0]?.weight ?? "" })),
		);
		setShowPrefillButton(false);
	};

	const handleSubmit = () => {
		if (!movement || !sessionId || isLoading) return;

		saveExercise.mutate(
			{
				movementId: movement.id,
				slotId: slot?.id ?? null,
				sessionId,
				comment,
				// A timed movement's first column is seconds
				sets: sets.map((s) =>
					movement.measure === "duration"
						? {
								reps: 0,
								duration_seconds: Math.round(parseNumber(s.reps)),
								weight: parseNumber(s.weight),
							}
						: {
								reps: Math.round(parseNumber(s.reps)),
								weight: parseNumber(s.weight),
							},
				),
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
					Alert.alert(
						"Erreur",
						errorMessage(error, "Impossible d’enregistrer l’exercice."),
					),
			},
		);
	};

	const notes = [movement?.notes, slot?.note].filter(Boolean).join("\n");
	const hasCalibration = targets.some((t) => t.reason === "calibration");

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
					{/* Movement selection */}
					<View className="mb-4">
						{isLoadingMovements ? (
							<View className="bg-default/30 rounded-lg p-4">
								<ActivityIndicator size="small" />
							</View>
						) : allMovements.length === 0 ? (
							<View className="bg-default/30 rounded-lg p-4">
								<Text className="text-muted text-center">
									Crée d&apos;abord un exercice dans « Mes exercices ».
								</Text>
							</View>
						) : (
							<Pressable
								onPress={() => {
									bottomSheetRef.current?.snapToIndex(0);
								}}
								className="flex-row items-center w-full bg-default rounded-md justify-between p-4"
							>
								<Text className="text-foreground">
									{movement ? movement.name : "Choisir un exercice"}
								</Text>
								<AlignJustifyIcon
									size={20}
									color={themeColors.foreground}
									strokeWidth={1.5}
								/>
							</Pressable>
						)}
					</View>

					{/* Last performance date */}
					{lastPerformance?.sessions?.date_session && (
						<View className="flex-row items-center justify-end gap-1 px-2 py-1 mb-3">
							<HistoryIcon size={14} color={themeColors.mutedForeground} />
							<Text className="text-sm text-muted">
								{format(
									new Date(lastPerformance.sessions.date_session),
									"dd/MM/yyyy",
								)}
							</Text>
						</View>
					)}

					{/* Notes of the movement and the slot */}
					{notes.length > 0 && (
						<View className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 mb-5 flex-row items-start gap-2">
							<InfoIcon
								size={16}
								color={isDarkColorScheme ? "#60a5fa" : "#1e40af"}
							/>
							<Text className="text-sm text-blue-700 dark:text-blue-200 flex-1">
								{notes}
							</Text>
						</View>
					)}

					{movement && (
						<CountDownTimer
							exerciseTypeTimer={slot?.rest_seconds ?? DEFAULT_REST_SECONDS}
						/>
					)}

					{movement && hasCalibration && (
						<Text className="text-sm text-muted mb-3">
							Première fois sur cet exercice : trouve ta charge en partant
							léger.
						</Text>
					)}

					{/* Sets form */}
					{movement && (
						<View>
							{showPrefillButton && (
								<View className="flex-row gap-2 mb-2">
									<Button
										variant="outline"
										onPress={handlePrefillWeights}
										className="flex-1"
									>
										<StarIcon size={16} color={themeColors.mutedForeground} />
										<Button.Label>
											Toutes les séries à {sets[0]?.weight} kg
										</Button.Label>
									</Button>
									<Button
										variant="outline"
										isIconOnly
										onPress={() => setShowPrefillButton(false)}
									>
										<XIcon size={16} color={themeColors.mutedForeground} />
									</Button>
								</View>
							)}

							<View className="bg-slate-50 dark:bg-slate-900/40 rounded-2xl py-4 px-2 mb-5">
								<View className="flex-row justify-between gap-1 px-2 mb-2">
									<Text className="flex-1 max-w-[25%] text-sm text-muted text-center">
										{movement?.measure === "duration" ? "Sec" : "Reps"}
									</Text>
									<Text className="flex-1 max-w-[35%] text-sm text-muted text-center">
										KG
									</Text>
									<Text className="flex-1 max-w-[20%] text-sm text-muted text-center">
										Objectif
									</Text>
									<Text className="flex-1 max-w-[20%] text-sm text-muted text-center">
										Série
									</Text>
								</View>
								{sets.map((set, index) => {
									const target = targets[index];
									return (
										<View
											key={index}
											className="flex-row justify-between items-center gap-1 px-2 mb-1"
										>
											<View className="flex-1 max-w-[25%]">
												<Input
													value={set.reps}
													onChangeText={(reps) => updateSet(index, { reps })}
													placeholder={lastSets[index]?.reps.toString() || "0"}
													keyboardType="numeric"
													returnKeyType="done"
													blurOnSubmit
													onSubmitEditing={Keyboard.dismiss}
													className="h-12 text-center text-3xl font-black"
												/>
											</View>
											<View className="flex-1 max-w-[35%]">
												<Input
													value={set.weight}
													onChangeText={(weight) =>
														updateSet(index, { weight })
													}
													placeholder={
														lastSets[index]?.weight.toString() || "0"
													}
													keyboardType="numeric"
													returnKeyType="done"
													blurOnSubmit
													onSubmitEditing={Keyboard.dismiss}
													className="h-12 text-center text-3xl font-black"
												/>
											</View>
											<View className="flex-1 max-w-[20%] h-12 flex-row items-center justify-center gap-1">
												<Text className="text-gray-700 dark:text-gray-300 font-light">
													{rangeLabels[index] ?? "–"}
												</Text>
												{target?.reason === "increase" && (
													<ArrowUpIcon size={14} color={themeColors.brand} />
												)}
											</View>
											<View className="flex-1 max-w-[20%] h-12 items-center justify-center">
												<CheckboxComponent
													isChecked={set.done}
													onPress={() => updateSet(index, { done: !set.done })}
												/>
											</View>
										</View>
									);
								})}

								<View className="flex-row justify-center gap-6 mt-4">
									<TouchableOpacity
										onPress={() =>
											setSets((prev) => [
												...prev,
												{
													reps: "",
													weight: prev.at(-1)?.weight ?? "",
													done: false,
												},
											])
										}
									>
										<Text className="text-xs italic text-gray-400 dark:text-gray-500">
											Ajouter une série ↓
										</Text>
									</TouchableOpacity>
									{sets.length > 1 && (
										<TouchableOpacity
											onPress={() => setSets((prev) => prev.slice(0, -1))}
										>
											<Text className="text-xs italic text-gray-400 dark:text-gray-500">
												Retirer une série ↑
											</Text>
										</TouchableOpacity>
									)}
								</View>
							</View>

							{/* Notes */}
							<View className="bg-slate-50 dark:bg-slate-900/40 rounded-2xl p-4 mb-20">
								<View className="flex-row items-center gap-2 mb-3">
									<EditIcon size={16} color={themeColors.mutedForeground} />
									<Text className="text-muted">Notes</Text>
									{lastPerformance?.comment && (
										<View className="w-2 h-2 bg-teal-500 rounded-full" />
									)}
								</View>
								<TextArea
									value={comment}
									onChangeText={setComment}
									placeholder={
										lastPerformance?.comment
											? `Note précédente : ${lastPerformance.comment}`
											: "Note précédente : aucune."
									}
									maxLength={200}
									className="min-h-[80px]"
								/>
							</View>
						</View>
					)}
				</ScrollView>
			</KeyboardAvoidingView>

			{/* Submit */}
			{movement && (
				<View className="absolute bottom-20 right-10">
					<Button
						onPress={handleSubmit}
						isDisabled={isLoading || sets.length === 0}
						isIconOnly
						className="h-16 w-16 rounded-full"
					>
						{isLoading ? (
							<ActivityIndicator
								size="small"
								color={themeColors.accentForeground}
							/>
						) : (
							<CheckIcon size={28} color={themeColors.accentForeground} />
						)}
					</Button>
				</View>
			)}

			{/* Movement picker */}
			<BottomSheet
				ref={bottomSheetRef}
				index={-1}
				snapPoints={PICKER_SNAP_POINTS}
				enableDynamicSizing={false}
				enablePanDownToClose={true}
				backgroundStyle={sheetBackgroundStyle(themeColors)}
				handleIndicatorStyle={{
					backgroundColor: themeColors.mutedForeground,
				}}
			>
				<BottomSheetScrollView
					keyboardShouldPersistTaps="handled"
					contentContainerStyle={{
						padding: 24,
						paddingBottom: 24,
						flexGrow: 1,
					}}
				>
					<MovementPicker
						movements={allMovements}
						selectedId={pickedMovementId}
						onPick={(m) => {
							setPickedMovementId(m.id);
							bottomSheetRef.current?.close();
						}}
						pinned={
							day ? { title: day.name, movements: dayMovements } : undefined
						}
					/>
				</BottomSheetScrollView>
			</BottomSheet>
		</SafeAreaView>
	);
}
