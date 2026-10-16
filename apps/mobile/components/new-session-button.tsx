import {
	BottomSheet,
	BottomSheetScrollView,
} from "@expo/ui/community/bottom-sheet";
import { differenceInCalendarDays } from "date-fns";
import { useRouter } from "expo-router";
import { Zap } from "lucide-react-native";
import React, { useCallback, useRef, useState } from "react";
import { ActivityIndicator, Alert, Pressable, Text, View } from "react-native";

import { useAuth } from "@/context/supabase-provider";
import { lastSessionByDay, nextProgramDay } from "@/lib/program/rotation";
import { useActiveProgram } from "@/lib/queries/programs";
import {
	useCreateSession,
	useLastSession,
	useProgramDaySessions,
} from "@/lib/queries/sessions";
import { cn } from "@/lib/utils";
import { sheetBackgroundStyle, useThemeColors } from "@/lib/theme";
import { useColorScheme } from "@/lib/useColorScheme";

// "aujourd'hui", "hier", "il y a 3 j": how long ago a day was last done
function daysAgo(date: string) {
	const days = differenceInCalendarDays(new Date(), new Date(date));
	if (days <= 0) return "aujourd’hui";
	if (days === 1) return "hier";
	return `il y a ${days} j`;
}

export default function NewSessionButton() {
	const { session } = useAuth();
	const program = useActiveProgram();
	const createSession = useCreateSession();
	const lastSession = useLastSession();
	const days = program.data?.program_days ?? [];
	const daySessions = useProgramDaySessions(days.map((d) => d.id));
	const isLoading = createSession.isPending;
	const [open, setOpen] = useState(false);
	const { isDarkColorScheme } = useColorScheme();
	const themeColors = useThemeColors();

	// Bottom sheet ref and snap points
	const sheetRef = useRef<BottomSheet>(null);

	const router = useRouter();

	// Dynamic colors based on theme
	const iconColor = themeColors.mutedForeground;
	const fabBgColor = isDarkColorScheme
		? "rgba(51, 65, 85, 0.5)"
		: "rgba(243, 244, 246, 0.5)"; // slate-700/50 : gray-100/50
	const fabBorderColor = isDarkColorScheme
		? "rgba(71, 85, 105, 0.5)"
		: "rgba(243, 244, 246, 0.5)"; // slate-600/50 : gray-100/50

	// Bottom sheet callbacks
	const handleSnapPress = useCallback((index: number) => {
		sheetRef.current?.snapToIndex(index);
	}, []);

	const handleClosePress = useCallback(() => {
		sheetRef.current?.close();
	}, []);

	// The day after the last one done, in the program's order
	const nextDayId = daySessions.data
		? nextProgramDay(days, daySessions.data)
		: null;
	const lastDone = lastSessionByDay(days, daySessions.data ?? []);

	// day null: a free session outside the program
	const handleCreateSession = (day: { id: string; name: string } | null) => {
		if (!session || createSession.isPending) return;
		createSession.mutate(
			{
				ownerId: session.user.id,
				dayId: day?.id ?? null,
				label: day?.name ?? "Séance libre",
				// Start from the last known body weight; editable on the session screen
				bodyWeight: lastSession.data?.body_weight ?? 0,
			},
			{
				onSuccess: (created) => {
					// The native sheet stays presented over the next screen otherwise
					handleClosePress();
					router.push(`/session/${created.id}`);
				},
				onError: (error) =>
					Alert.alert(
						"Erreur",
						error.message || "Impossible de créer la séance.",
					),
			},
		);
	};

	return (
		<>
			{/* FAB */}
			{!open && (
				<Pressable
					onPress={() => {
						sheetRef.current?.snapToIndex(0); // Open to content size
						setOpen(true);
					}}
					className="absolute bottom-10 right-10 z-50"
				>
					<View
						style={{
							borderColor: fabBorderColor,
							backgroundColor: fabBgColor,
						}}
						className="flex h-16 w-16 items-center justify-center rounded-full border-2 shadow-lg"
					>
						<Zap color={iconColor} size={28} strokeWidth={1.7} />
					</View>
				</Pressable>
			)}

			{/* Bottom-sheet */}
			<BottomSheet
				ref={sheetRef}
				index={-1}
				enableDynamicSizing={true}
				enablePanDownToClose={true}
				onClose={() => setOpen(false)}
				backgroundStyle={sheetBackgroundStyle(themeColors)}
				handleIndicatorStyle={{
					backgroundColor: themeColors.mutedForeground,
				}}
			>
				<BottomSheetScrollView
					contentContainerStyle={{
						padding: 16,
						flexGrow: 1,
					}}
				>
					<View>
						{isLoading ? (
							<View className="pt-14 items-center justify-center">
								<ActivityIndicator size="large" />
							</View>
						) : (
							<View>
								<Text className="text-xl font-bold text-foreground mb-1">
									Nouvelle séance
								</Text>
								{program.data && (
									<Text className="text-sm text-muted mb-4">
										{program.data.name}
									</Text>
								)}
								<View className="gap-2">
									{days.map((day) => {
										const isNext = day.id === nextDayId;
										const last = lastDone.get(day.id);
										return (
											<Pressable
												key={day.id}
												onPress={() => handleCreateSession(day)}
												accessibilityRole="button"
												accessibilityHint={
													isNext ? "Séance suivante du programme" : undefined
												}
												className={cn(
													"flex-row items-center justify-between rounded-md border bg-surface px-4 py-3 active:opacity-70",
													isNext ? "border-accent" : "border-border",
												)}
											>
												<View className="flex-1 gap-0.5">
													<View className="flex-row items-center gap-2">
														<Text className="text-lg font-medium text-foreground">
															{day.name}
														</Text>
														{isNext && (
															<View className="rounded-full bg-accent px-2 py-0.5">
																<Text className="text-xs font-medium text-accent-foreground">
																	Suivante
																</Text>
															</View>
														)}
													</View>
													<Text className="text-sm text-muted">
														{last ? `Dernière : ${daysAgo(last)}` : "Pas encore faite"}
													</Text>
												</View>
												<Text className="text-sm text-muted">
													{day.slots.length} exercice
													{day.slots.length > 1 ? "s" : ""}
												</Text>
											</Pressable>
										);
									})}
									<Pressable
										onPress={() => handleCreateSession(null)}
										className="rounded-md border border-dashed border-border px-4 py-3 active:opacity-70"
									>
										<Text className="text-base text-muted">
											Séance libre, hors programme
										</Text>
									</Pressable>
								</View>
							</View>
						)}
					</View>
				</BottomSheetScrollView>
			</BottomSheet>
		</>
	);
}
