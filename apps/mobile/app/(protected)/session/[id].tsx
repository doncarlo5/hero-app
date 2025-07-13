import { BottomSheet, DateTimePicker } from "@expo/ui/swift-ui";
import { format } from "date-fns";
import { fr } from "date-fns/locale/fr";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import {
	ActivityIndicator,
	Alert,
	FlatList,
	Pressable,
	RefreshControl,
	ScrollView,
	View,
} from "react-native";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Text } from "@/components/ui/text";
import { Textarea } from "@/components/ui/textarea";
import { fetchApi } from "@/lib/api-handler";
import {
	ArrowLeftIcon,
	CalendarIcon,
	CheckCircleIcon,
	ChevronRightIcon,
	PlusIcon,
	SaveIcon,
	TrashIcon,
} from "lucide-react-native";

type ExerciseUser = {
	_id: string;
	type: {
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
	};
	rep: number[];
	weight: number[];
	comment?: string;
};

type Session = {
	_id: string;
	date_session: string;
	type_session: string;
	body_weight: string;
	is_done: boolean;
	comment?: string;
	exercise_user_list: ExerciseUser[];
};

type FormState = {
	body_weight: string;
	comment: string;
	date_session: string;
};

export default function SessionDetail() {
	const { id } = useLocalSearchParams<{
		id: string;
		fromExercise?: string;
	}>();
	const router = useRouter();

	const [session, setSession] = useState<Session | null>(null);
	const [lastSession, setLastSession] = useState<Session | null>(null);
	const [isLoading, setIsLoading] = useState(true);
	const [isSaving, setIsSaving] = useState(false);
	const [isCompleting, setIsCompleting] = useState(false);
	const [isDeleting, setIsDeleting] = useState(false);
	const [refreshing, setRefreshing] = useState(false);
	const [isCalendarOpen, setIsCalendarOpen] = useState(false);

	// Debug: Log state changes
	useEffect(() => {
		console.log("isCalendarOpen state changed to:", isCalendarOpen);
	}, [isCalendarOpen]);
	const [selectedDate, setSelectedDate] = useState<Date | null>(null);

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

	const fetchLastSession = async () => {
		try {
			const response = await fetchApi(
				`/api/sessions?limit=2&sortBy=date_session:desc`,
			);
			if (response && response.length > 1) {
				setLastSession(response[1]); // Get the second most recent session
			}
		} catch (error) {
			console.error("Error fetching last session:", error);
		}
	};

	const fetchSession = async () => {
		if (!id) return;
		try {
			const response: Session = await fetchApi(`/api/sessions/${id}`);
			setSession(response);

			const newFormState = {
				body_weight: String(response.body_weight || ""),
				comment: response.comment ?? "",
				date_session: response.date_session,
			};

			setFormState(newFormState);
			setOriginalFormState(newFormState);
			setSelectedDate(new Date(response.date_session));
		} catch (error) {
			console.error("Fetch session error:", error);
		} finally {
			setIsLoading(false);
			setRefreshing(false);
		}
	};

	useEffect(() => {
		fetchSession();
		fetchLastSession();
	}, [id]);

	// Enhanced form state management - track dirty state
	const hasChanges = useCallback(() => {
		return (
			formState.body_weight !== originalFormState.body_weight ||
			formState.comment !== originalFormState.comment ||
			formState.date_session !== originalFormState.date_session
		);
	}, [formState, originalFormState]);

	// Auto-save functionality
	const handleSave = async () => {
		if (!session || !hasChanges()) return;

		try {
			setIsSaving(true);
			await fetchApi(`/api/sessions/${session._id}`, {
				method: "PUT",
				body: JSON.stringify({
					body_weight: formState.body_weight,
					comment: formState.comment,
					date_session: formState.date_session,
				}),
			});

			// Update original state after successful save
			setOriginalFormState(formState);
			console.log("formState", formState);
			await fetchSession(); // Refresh data
		} catch (error) {
			console.error("Save session error:", error);
			Alert.alert("Error", "Failed to save changes. Please try again.");
		} finally {
			setIsSaving(false);
		}
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
						try {
							setIsCompleting(true);
							await fetchApi(`/api/sessions/${session._id}`, {
								method: "PUT",
								body: JSON.stringify({
									...formState,
									is_done: true,
								}),
							});
							await fetchSession();
							router.replace("/(protected)/(tabs)");
						} catch (error) {
							console.error("Complete session error:", error);
							Alert.alert(
								"Error",
								"Failed to complete session. Please try again.",
							);
						} finally {
							setIsCompleting(false);
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
					onPress: async () => {
						try {
							setIsDeleting(true);
							await fetchApi(`/api/sessions/${session._id}`, {
								method: "DELETE",
							});
							router.back();
						} catch (error) {
							console.error("Delete session error:", error);
							Alert.alert(
								"Error",
								"Failed to delete session. Please try again.",
							);
						} finally {
							setIsDeleting(false);
						}
					},
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

	if (isLoading) {
		return (
			<View className="flex-1 items-center justify-center bg-background dark:bg-background-dark">
				<ActivityIndicator />
			</View>
		);
	}

	if (!session) {
		return (
			<View className="flex-1 items-center justify-center bg-background dark:bg-background-dark">
				<Text className="text-foreground dark:text-foreground-dark">
					Session not found
				</Text>
			</View>
		);
	}

	return (
		<View className="flex-1 bg-background dark:bg-background-dark">
			<View style={{ position: "relative", flex: 1 }}>
				<ScrollView
					className="flex-1"
					refreshControl={
						<RefreshControl
							refreshing={refreshing}
							onRefresh={() => {
								setRefreshing(true);
								fetchSession();
							}}
						/>
					}
					contentContainerStyle={{ padding: 16, paddingBottom: 120 }}
				>
					{/* Session Header */}
					<View className="flex-row items-center justify-between mb-4">
						<View className="flex-1">
							<Text className="text-2xl font-bold text-foreground dark:text-foreground-dark mb-1">
								{session.type_session}
							</Text>
							<Text className="text-sm text-muted-foreground dark:text-muted-foreground-dark">
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
						<View>
							<Button
								onPress={() => {
									setIsCalendarOpen(true);
								}}
								variant="ghost"
								className="flex-row items-center border border-gray-300 dark:border-gray-700 rounded-md justify-between"
							>
								<Text className="text-foreground dark:text-foreground-dark">
									{selectedDate
										? format(selectedDate, "d MMM yyyy", { locale: fr })
										: "Select date"}
								</Text>
								<CalendarIcon size={20} color="gray" strokeWidth={1.5} />
							</Button>
						</View>

						{/* Body Weight */}
						<View>
							<Text className="text-sm font-medium text-muted-foreground dark:text-muted-foreground-dark mb-2">
								Body Weight (kg)
							</Text>
							<Input
								value={formState.body_weight || ""}
								onChangeText={(text) =>
									setFormState((prev) => ({ ...prev, body_weight: text }))
								}
								keyboardType="numeric"
								placeholder="Enter your weight"
								className="text-foreground dark:text-foreground-dark"
							/>
						</View>

						{/* Comment with last session reference */}
						<View>
							<Text className="text-sm font-medium text-muted-foreground dark:text-muted-foreground-dark mb-2">
								Session Notes
							</Text>
							<Textarea
								value={formState.comment}
								onChangeText={(text) =>
									setFormState((prev) => ({ ...prev, comment: text }))
								}
								placeholder={
									lastSession?.comment
										? `Previous session: ${lastSession.comment}`
										: "Add notes about your session..."
								}
								className="text-foreground dark:text-foreground-dark"
								numberOfLines={4}
							/>
						</View>
					</View>

					{/* EXERCISES */}
					<View>
						<View className="flex-row items-center justify-between mb-6">
							<View className="flex-1">
								<Text className="text-2xl font-bold text-foreground dark:text-foreground-dark">
									Exercises
								</Text>
								<Text className="text-sm text-muted-foreground dark:text-muted-foreground-dark">
									{session.exercise_user_list.length} exercise
									{session.exercise_user_list.length !== 1 ? "s" : ""} completed
								</Text>
							</View>
						</View>

						{/* Add New Exercise Button */}

						<Button
							onPress={() =>
								router.push(`/(protected)/do-exercise?sessionId=${session._id}`)
							}
							variant="default"
							className="flex-row items-center justify-center gap-2"
						>
							<PlusIcon size={16} color="white" />
							<Text>Add an exercise</Text>
						</Button>

						<FlatList
							data={session.exercise_user_list}
							keyExtractor={(item) => item._id}
							renderItem={({ item }) => (
								<Pressable
									onPress={() => router.push(`/exercise/${item._id}`)}
									className="mb-4 overflow-hidden rounded-xl bg-background dark:bg-background-dark shadow-sm border border-muted/20 dark:border-muted-dark/20"
								>
									{/* Exercise Header */}
									<View className="flex-row items-center justify-between mb-3 ">
										<View className="flex-1">
											<Text className="font-bold text-lg text-foreground dark:text-foreground-dark">
												{item.type.name}
											</Text>
										</View>
										<ChevronRightIcon size={20} color="#6b7280" />
									</View>

									<View className="mb-3">
										<View className="flex-row gap-2 w-full">
											{item.rep.map((rep, index) => {
												// Only show sets with actual data
												if (rep <= 0 || item.weight[index] <= 0) return null;

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
															{item.weight[index]} kg
														</Text>
													</View>
												);
											})}
										</View>
									</View>

									{item.comment && (
										<View className="bg-muted/20 dark:bg-muted-dark/20 rounded-lg mb-4">
											<Text className="text-sm text-foreground dark:text-foreground-dark">
												{item.comment}
											</Text>
										</View>
									)}
								</Pressable>
							)}
							scrollEnabled={false}
						/>
					</View>

					{/* Bottom Action Buttons */}
					<View className="flex-row gap-2 mb-6">
						<Button
							variant="outline"
							onPress={handleDeleteSession}
							disabled={isDeleting}
							className="flex-1 flex-row items-center justify-center dark:bg-background-dark dark:text-foreground-dark"
						>
							<TrashIcon size={16} color="#ef4444" />
							<Text className="ml-2 text-red-500">
								{isDeleting ? "Deleting..." : "Delete"}
							</Text>
						</Button>

						{!session.is_done ? (
							<Button
								onPress={handleCompleteSession}
								disabled={isCompleting}
								className="flex-1 dark:bg-transparent flex-row items-center justify-center dark:bg-background-dark dark:text-foreground-dark"
							>
								<CheckCircleIcon size={16} color="white" />
								<Text className="ml-2">
									{isCompleting ? "Completing..." : "Complete"}
								</Text>
							</Button>
						) : (
							<Button
								onPress={() => router.replace("/(protected)/(tabs)")}
								className="flex-1 dark:bg-transparent flex-row items-center justify-center dark:bg-background-dark dark:text-foreground-dark"
							>
								<ArrowLeftIcon size={16} color="white" />
								<Text className="ml-2">Go back to list</Text>
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
								isSaving
									? "bg-muted dark:bg-muted-dark"
									: "bg-primary dark:bg-primary-dark"
							}`}
						>
							{isSaving ? (
								<ActivityIndicator size="small" color="white" />
							) : (
								<SaveIcon size={24} color="white" />
							)}
						</Pressable>
					</View>
				)}
			</View>

			{/* Calendar BottomSheet - Moved outside main content */}
			{isCalendarOpen && (
				<BottomSheet
					isOpened={isCalendarOpen}
					onIsOpenedChange={(e) => {
						console.log("BottomSheet onIsOpenedChange:", e);
						setIsCalendarOpen(e);
					}}
				>
					<View className="bg-background dark:bg-background-dark p-6">
						<DateTimePicker
							onDateSelected={handleDateSelect}
							displayedComponents="date"
							initialDate={
								selectedDate?.toISOString() || new Date().toISOString()
							}
							variant="wheel"
							title=""
						/>
					</View>
				</BottomSheet>
			)}
		</View>
	);
}
