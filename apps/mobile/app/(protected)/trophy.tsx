import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { Lock } from "lucide-react-native";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Pressable, ScrollView, View } from "react-native";

import TrophyIcon from "@/components/trophy-icon";
import { Text } from "@/components/ui/text";
import { colors } from "@/constants/colors";
import { fetchApi } from "@/lib/api-handler";
import { useColorScheme } from "@/lib/useColorScheme";

type TrophyType = {
	_id: string;
	name: string;
	exerciseType: { name: string };
	repsGoal: number;
	awardedAt: string | null;
	achieved: boolean;
	description: string;
	repsUser: number;
	trophyType: string;
	level: number;
	rewardText: string;
};

export default function TrophyScreen() {
	const [trophies, setTrophies] = useState<TrophyType[]>([]);
	const [selected, setSelected] = useState<TrophyType | null>(null);
	const { colorScheme } = useColorScheme();

	// Bottom sheet ref and snap points
	const bottomSheetRef = useRef<BottomSheet>(null);
	const snapPoints = useMemo(() => ["50%", "75%"], []);

	useEffect(() => {
		const run = async () => {
			try {
				const data: TrophyType[] = await fetchApi("/api/trophies");
				setTrophies(data);
			} catch (e) {
				console.error(e);
			}
		};
		run();
	}, []);

	// Handle trophy selection
	const handleTrophyPress = useCallback((trophy: TrophyType) => {
		setSelected(trophy);
		bottomSheetRef.current?.expand();
	}, []);

	// Handle bottom sheet close
	const handleSheetChanges = useCallback((index: number) => {
		if (index === -1) {
			setSelected(null);
		}
	}, []);

	const grouped = trophies.reduce((acc: Record<string, TrophyType[]>, t) => {
		const key = t.exerciseType?.name ?? "Autres";
		if (!acc[key]) acc[key] = [];
		acc[key].push(t);
		return acc;
	}, {});

	return (
		<View className="flex-1">
			<ScrollView
				className="flex-1"
				style={{
					backgroundColor:
						colorScheme === "dark"
							? colors.dark.background
							: colors.light.background,
				}}
				contentContainerStyle={{ padding: 16, paddingBottom: 32 }}
			>
				{Object.keys(grouped).map((groupName) => {
					const list = grouped[groupName];
					const achievedCount = list.filter((t) => t.achieved).length;
					const totalCount = list.length;
					return (
						<View key={groupName} className="mb-6">
							<Text className="mb-2 text-lg font-medium">
								{groupName}{" "}
								<Text className="text-gray-500">
									({achievedCount}/{totalCount})
								</Text>
							</Text>
							<View className="flex-row flex-wrap">
								{list.map((trophy) => (
									<Pressable
										key={trophy._id}
										onPress={() => handleTrophyPress(trophy)}
										className="w-1/2 p-2"
									>
										<View
											className="items-center rounded-xl border p-3"
											style={{
												borderColor:
													colorScheme === "dark"
														? colors.dark.border
														: colors.light.border,
												backgroundColor:
													colorScheme === "dark"
														? colors.dark.background
														: colors.light.background,
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
													<Lock
														size={24}
														color={
															colorScheme === "dark" ? "#9CA3AF" : "#6B7280"
														}
													/>
												)}
											</View>
											<Text className="mt-2 text-center text-base font-semibold capitalize">
												{trophy.achieved
													? `Trophée ${trophy.trophyType}`
													: "???"}
											</Text>
											{trophy.achieved ? (
												<Text className="text-xs text-gray-500">
													Obtenu le{" "}
													{trophy.awardedAt
														? new Date(trophy.awardedAt).toLocaleDateString()
														: ""}
												</Text>
											) : (
												<View className="mt-1 flex-row items-center gap-1">
													<Lock size={14} />
													<Text className="text-xs text-gray-500">
														{trophy.repsGoal} reps min
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
				snapPoints={snapPoints}
				onChange={handleSheetChanges}
				enablePanDownToClose
				backgroundStyle={{
					backgroundColor:
						colorScheme === "dark" ? colors.dark.card : colors.light.card,
				}}
				handleIndicatorStyle={{
					backgroundColor: colorScheme === "dark" ? "#6B7280" : "#9CA3AF",
				}}
			>
				<BottomSheetView className="flex-1 px-6 pb-6">
					{selected && (
						<View className="items-center">
							{/* Full SVG trophy only visible in bottom sheet */}
							<TrophyIcon level={selected.level} achieved={selected.achieved} />
							<Text className="mt-3 text-center text-2xl font-semibold">
								{selected.rewardText}
							</Text>
							<Text className="mt-2 text-center text-gray-600">
								Tu as obtenu le trophée {selected.trophyType} pour
								l&apos;exercice {selected.exerciseType.name}
								{selected.achieved ? ` avec ${selected.repsUser} reps.` : "."}
							</Text>
							<Text className="mt-3 text-xs text-gray-500">
								{selected.description}
							</Text>
						</View>
					)}
				</BottomSheetView>
			</BottomSheet>
		</View>
	);
}
