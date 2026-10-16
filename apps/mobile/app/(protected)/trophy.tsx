import {
	BottomSheet,
	BottomSheetScrollView,
} from "@expo/ui/community/bottom-sheet";
import { Lock } from "lucide-react-native";
import { useRef, useState } from "react";
import { ActivityIndicator, Pressable, ScrollView, View } from "react-native";

import TrophyIcon from "@/components/trophy-icon";
import { Text } from "@/components/ui/text";
import { useTrophies } from "@/lib/queries/trophies";
import type { Trophy } from "@/lib/queries/types";
import { useThemeColors } from "@/lib/theme";
import { useColorScheme } from "@/lib/useColorScheme";

export default function TrophyScreen() {
	const trophiesQuery = useTrophies();
	const [selected, setSelected] = useState<Trophy | null>(null);
	const { colorScheme } = useColorScheme();
	const themeColors = useThemeColors();

	// Bottom sheet ref
	const bottomSheetRef = useRef<BottomSheet>(null);

	const handleTrophyPress = (trophy: Trophy) => {
		setSelected(trophy);
		bottomSheetRef.current?.snapToIndex(0);
	};

	const trophies = trophiesQuery.data ?? [];
	const grouped = trophies.reduce((acc: Record<string, Trophy[]>, t) => {
		const key = t.exercise_types?.name ?? "Autres";
		if (!acc[key]) acc[key] = [];
		acc[key].push(t);
		return acc;
	}, {});

	return (
		<View className="flex-1">
			<ScrollView
				className="flex-1"
				style={{
					backgroundColor: themeColors.background,
				}}
				contentContainerStyle={{ padding: 16, paddingBottom: 32 }}
			>
				{trophiesQuery.data === undefined &&
					(trophiesQuery.error ? (
						<Pressable onPress={() => trophiesQuery.refetch()} className="py-8">
							<Text className="text-center text-muted">
								Impossible de charger les trophées. Toucher pour réessayer.
							</Text>
						</Pressable>
					) : (
						<ActivityIndicator className="py-8" />
					))}
				{Object.keys(grouped).map((groupName) => {
					const list = grouped[groupName];
					const achievedCount = list.filter((t) => t.achieved).length;
					const totalCount = list.length;
					return (
						<View key={groupName} className="mb-6">
							<Text className="mb-2 text-lg font-medium">
								{groupName}{" "}
								<Text className="text-muted">
									({achievedCount}/{totalCount})
								</Text>
							</Text>
							<View className="flex-row flex-wrap">
								{list.map((trophy) => (
									<Pressable
										key={trophy.id}
										onPress={() => handleTrophyPress(trophy)}
										className="w-1/2 p-2"
									>
										<View
											className="items-center rounded-xl border p-3"
											style={{
												borderColor: themeColors.border,
												backgroundColor: themeColors.background,
												opacity: trophy.achieved ? 1 : 0.5,
											}}
										>
											{/* Placeholder icon for grid view */}
											<View
												className="h-16 w-16 items-center justify-center rounded-full"
												style={{
													backgroundColor: trophy.achieved
														? colorScheme === "dark"
															? "#4B5563"
															: "#E5E7EB"
														: colorScheme === "dark"
															? "#374151"
															: "#F3F4F6",
												}}
											>
												{trophy.achieved ? (
													<Text className="text-2xl">🏆</Text>
												) : (
													<Lock size={24} color={themeColors.mutedForeground} />
												)}
											</View>
											<Text className="mt-2 text-center text-base font-semibold capitalize">
												{trophy.achieved
													? `Trophée ${trophy.trophy_type}`
													: "???"}
											</Text>
											{trophy.achieved ? (
												<Text className="text-xs text-muted">
													Obtenu le{" "}
													{trophy.awarded_at
														? new Date(trophy.awarded_at).toLocaleDateString()
														: ""}
												</Text>
											) : (
												<View className="mt-1 flex-row items-center gap-1">
													<Lock size={14} color={themeColors.mutedForeground} />
													<Text className="text-xs text-muted">
														{trophy.reps_goal} reps min
													</Text>
												</View>
											)}
										</View>
									</Pressable>
								))}
							</View>
						</View>
					);
				})}
			</ScrollView>

			{/* Bottom Sheet for trophy details */}
			<BottomSheet
				ref={bottomSheetRef}
				index={-1}
				enableDynamicSizing={true}
				enablePanDownToClose={true}
				onClose={() => setSelected(null)}
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
					{selected && (
						<>
							{selected.achieved ? (
								<View className="items-center">
									{/* Full SVG trophy only visible in bottom sheet */}
									<TrophyIcon
										level={selected.level}
										achieved={selected.achieved}
									/>
									<Text className="mt-3 text-center text-2xl font-semibold">
										{selected.reward_text}
									</Text>
									<Text className="mt-2 text-center text-muted">
										Tu as obtenu le trophée {selected.trophy_type} pour
										l&apos;exercice {selected.exercise_types?.name} avec{" "}
										{selected.reps_user} reps.
									</Text>
									<View
										className="mt-4 flex-row items-center gap-2 rounded-lg border px-3 py-2"
										style={{
											borderColor:
												colorScheme === "dark" ? "#374151" : "#D1D5DB",
											backgroundColor:
												colorScheme === "dark"
													? "rgba(107, 114, 128, 0.2)"
													: "rgba(107, 114, 128, 0.1)",
										}}
									>
										<Lock size={16} color={themeColors.mutedForeground} />
										<View className="flex-1">
											<Text className="text-xs text-muted">
												{selected.description}
											</Text>
											<Text className="text-xs text-muted">
												{selected.reps_goal} reps min requises
											</Text>
										</View>
									</View>
								</View>
							) : (
								<View className="items-center py-8">
									<View
										className="mb-6 h-24 w-24 items-center justify-center rounded-full"
										style={{
											backgroundColor:
												colorScheme === "dark" ? "#374151" : "#F3F4F6",
										}}
									>
										<Lock size={48} color={themeColors.mutedForeground} />
									</View>
									<Text className="mb-2 text-center text-xl font-semibold text-gray-700 dark:text-gray-300">
										Trophée verrouillé
									</Text>
									<Text className="mb-4 text-center text-base text-muted">
										{selected.description}
									</Text>
									<View
										className="mt-2 rounded-lg border px-4 py-3"
										style={{
											borderColor:
												colorScheme === "dark" ? "#374151" : "#E5E7EB",
											backgroundColor:
												colorScheme === "dark" ? "#1F2937" : "#F9FAFB",
										}}
									>
										<Text className="text-center text-sm font-medium text-gray-700 dark:text-gray-300">
											Objectif requis
										</Text>
										<Text className="mt-1 text-center text-lg font-bold text-foreground">
											{selected.reps_goal} reps
										</Text>
										<Text className="mt-1 text-center text-xs text-muted">
											pour l&apos;exercice {selected.exercise_types?.name}
										</Text>
									</View>
								</View>
							)}
						</>
					)}
				</BottomSheetScrollView>
			</BottomSheet>
		</View>
	);
}
