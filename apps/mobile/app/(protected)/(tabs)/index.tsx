import { format } from "date-fns";
import { fr } from "date-fns/locale/fr";
import { Flame, Gauge, Plus, Trophy } from "lucide-react-native";
import { useState } from "react";
import {
	RefreshControl,
	SafeAreaView,
	ScrollView,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import Svg, { Circle, Defs, LinearGradient, Stop } from "react-native-svg";

import { TypeSessionBadge } from "@/components/ui/type-session-badge";
import WeekActivityCarousel from "@/components/week-activity-carousel";
import { useQueryClient } from "@tanstack/react-query";

import { useProfile } from "@/lib/queries/profile";
import { useLastSession, useSessionsCount } from "@/lib/queries/sessions";
import { useTrophies } from "@/lib/queries/trophies";
import { useColorScheme } from "@/lib/useColorScheme";
import { router } from "expo-router";

const CircularProgress = ({
	progress,
	size = 80,
	strokeWidth = 8,
}: {
	progress: number;
	size?: number;
	strokeWidth?: number;
}) => {
	const { isDarkColorScheme } = useColorScheme();
	const radius = (size - strokeWidth) / 2;
	const circumference = radius * 2 * Math.PI; // Full circle

	// Define colors based on color scheme
	const backgroundStroke = isDarkColorScheme
		? "rgb(51 65 85)" // slate-700
		: "rgb(209 213 219)"; // gray-300

	const gradientStart = isDarkColorScheme ? "#2dd4bf" : "#38b2ac"; // teal-400 : teal-500
	const gradientEnd = isDarkColorScheme ? "#5eead4" : "#4fd1c5"; // teal-300 : teal-400

	return (
		<View className="items-center">
			<View className="relative">
				<Svg width={size} height={size}>
					<Defs>
						<LinearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
							<Stop offset="0%" stopColor={gradientStart} />
							<Stop offset="100%" stopColor={gradientEnd} />
						</LinearGradient>
					</Defs>

					{/* Background circle (gray) */}
					<Circle
						cx={size / 2}
						cy={size / 2}
						r={radius}
						stroke={backgroundStroke}
						strokeWidth={strokeWidth}
						fill="transparent"
						strokeDasharray={circumference}
						strokeDashoffset={0}
						strokeLinecap="round"
						transform={`rotate(-90 ${size / 2} ${size / 2})`}
					/>

					{/* Progress circle (gradient) */}
					<Circle
						cx={size / 2}
						cy={size / 2}
						r={radius}
						stroke="url(#gradient)"
						strokeWidth={strokeWidth}
						fill="transparent"
						strokeDasharray={`${(progress / 100) * circumference} ${circumference}`}
						strokeDashoffset={0}
						strokeLinecap="round"
						transform={`rotate(-90 ${size / 2} ${size / 2})`}
					/>
				</Svg>

				{/* Percentage text centered inside circle */}
				<View className="absolute inset-0 items-center justify-center">
					<Text className="text-lg font-bold text-slate-700 dark:text-gray-300">
						{progress.toFixed(0)}%
					</Text>
				</View>
			</View>
		</View>
	);
};

export default function Home() {
	const { isDarkColorScheme } = useColorScheme();
	const queryClient = useQueryClient();
	const profile = useProfile();
	const lastSessionQuery = useLastSession();
	const sessionsCount = useSessionsCount();
	const trophiesQuery = useTrophies();
	const [refreshing, setRefreshing] = useState(false);

	const onRefresh = async () => {
		setRefreshing(true);
		await queryClient.invalidateQueries();
		setRefreshing(false);
	};

	const lastSession = lastSessionQuery.data ?? null;
	const trophies = trophiesQuery.data ?? [];
	const achievedTrophies = trophies.filter((t) => t.achieved).length;
	// One trophy per tier of each exercise that has trophies (27 with the defaults)
	const totalTrophies = trophies.length || 27;
	const isLoadingTrophies = trophiesQuery.isLoading;
	const isLoadingSession = lastSessionQuery.isLoading;

	return (
		<SafeAreaView className="flex-1 bg-background">
			<ScrollView
				contentContainerStyle={{ padding: 16 }}
				showsVerticalScrollIndicator={false}
				refreshControl={
					<RefreshControl
						refreshing={refreshing}
						onRefresh={onRefresh}
						tintColor="rgb(71 85 105)"
						colors={["rgb(71 85 105)"]}
					/>
				}
			>
				<View className="">
					<Text className="text-4xl font-bold tracking-tighter mb-4 dark:text-gray-300">
						Bienvenue {profile.data?.first_name || ""}
					</Text>

					{isLoadingSession ? (
						<View className="rounded-2xl bg-slate-100/80 dark:bg-slate-900/80 shadow-md p-3 mb-6">
							<View className="flex-col justify-between gap-4">
								<View className="flex-row items-center justify-between">
									<View className="h-5 w-32 rounded bg-gray-200 dark:bg-slate-700" />
									<View className="h-4 w-5 rounded-full bg-gray-200 dark:bg-slate-700" />
								</View>
								<View className="flex-row items-center gap-2">
									<View className="h-7 w-16 rounded bg-gray-200 dark:bg-slate-700" />
									<View className="h-4 w-28 rounded bg-gray-200 dark:bg-slate-700" />
								</View>
							</View>
						</View>
					) : (
						<TouchableOpacity
							onPress={() => {
								if (lastSession) {
									router.push("/(protected)/(tabs)/list");
								}
							}}
							disabled={!lastSession}
							activeOpacity={lastSession ? 0.7 : 1}
						>
							<View className="rounded-2xl bg-slate-100/80 dark:bg-slate-900/80 shadow-md p-3 mb-6">
								<View className="flex-col justify-between gap-4">
									<View className="flex-row items-center justify-between">
										<Text className="text-xs font-semibold uppercase tracking-tight text-muted-foreground">
											{lastSession ? "Séance précédente" : "Aucune séance"}
										</Text>
										<View className="bg-slate-800/30 rounded-full h-5 w-5 flex justify-center items-center">
											<Text className="text-xs text-white dark:text-gray-400">
												↗
											</Text>
										</View>
									</View>

									{lastSession && (
										<View className="flex-row items-center gap-2">
											<TypeSessionBadge
												type_session={lastSession.type_session}
											/>
											<Text className="capitalize text-slate-600 dark:text-gray-400 text-sm">
												{format(
													new Date(lastSession.date_session),
													"EEE d MMMM yyyy",
													{ locale: fr },
												)}
											</Text>
										</View>
									)}
								</View>
							</View>
						</TouchableOpacity>
					)}

					<WeekActivityCarousel />

					<Text className="text-2xl font-bold mb-3 dark:text-gray-300">
						Progression
					</Text>

					<View className="flex-row gap-3">
						<View className="flex-1 gap-3">
							<View className="rounded-2xl gap-1 bg-slate-100/80 dark:bg-slate-900/80 shadow-md p-3 justify-between h-20">
								<View className="flex-row items-center gap-1">
									<Flame
										color={isDarkColorScheme ? "#94a3b8" : "rgb(71 85 105)"}
										height={17}
										width={17}
										strokeWidth={2.2}
									/>
									<Text className="text-slate-600 dark:text-gray-400 text-sm">
										Total séances
									</Text>
								</View>
								<Text className="text-3xl font-extrabold tracking-tighter dark:text-gray-300">
									{sessionsCount.data ?? "–"}
								</Text>
							</View>

							{isLoadingTrophies ? (
								<View className="rounded-2xl bg-slate-100/80 dark:bg-slate-900/80 shadow-md p-3 flex-1 justify-between">
									<View className="flex-row items-center gap-1.5 mb-3">
										<View className="h-[17px] w-[17px] rounded bg-gray-200 dark:bg-slate-700" />
										<View className="h-4 w-24 rounded bg-gray-200 dark:bg-slate-700" />
									</View>

									<View className="items-center">
										<View className="h-[74px] w-[70px] rounded-full bg-gray-200 dark:bg-slate-700" />
										<View className="h-6 w-12 rounded bg-gray-200 dark:bg-slate-700 mt-2" />
									</View>
								</View>
							) : (
								<TouchableOpacity
									onPress={() => router.push("/(protected)/trophy")}
									activeOpacity={0.7}
									className="rounded-2xl bg-slate-100/80 dark:bg-slate-900/80 shadow-md p-3 flex-1 justify-between"
								>
									<View className="flex-row items-center gap-1.5 mb-3">
										<Trophy
											color={isDarkColorScheme ? "#94a3b8" : "rgb(71 85 105)"}
											height={17}
											width={17}
											strokeWidth={2.2}
										/>
										<Text className="text-slate-600 dark:text-gray-400 text-sm">
											Total trophées
										</Text>
									</View>

									<View className="items-center">
										<CircularProgress
											progress={(achievedTrophies / totalTrophies) * 100}
											size={70}
											strokeWidth={6}
										/>
										<Text className="text-xl font-extrabold text-center mt-2 dark:text-gray-300">
											{achievedTrophies}/{totalTrophies}
										</Text>
									</View>
								</TouchableOpacity>
							)}
						</View>

						<View className="flex-1 gap-3">
							<TouchableOpacity
								onPress={() => router.push("/(protected)/exercise-type/new")}
								activeOpacity={0.7}
								className="rounded-2xl bg-slate-100/80 dark:bg-slate-900/80 shadow-md p-3 flex-1 items-center justify-center"
							>
								<View className="items-center gap-2">
									<View className="items-center">
										<Text className="leading-4 text-muted-foreground text-sm">
											Créer un
										</Text>
										<Text className="font-bold leading-4 tracking-tighter text-sm dark:text-gray-300">
											NOUVEL EXERCICE
										</Text>
									</View>
									<Plus
										height={30}
										width={30}
										strokeWidth={1.5}
										color={isDarkColorScheme ? "#94a3b8" : "rgb(71 85 105)"}
									/>
								</View>
							</TouchableOpacity>

							<View className="rounded-2xl bg-slate-100/80 dark:bg-slate-900/80 shadow-md p-3 h-24 justify-between">
								<View className="flex-row gap-1.5">
									<Gauge
										color={isDarkColorScheme ? "#94a3b8" : "rgb(71 85 105)"}
										height={17}
										width={17}
										strokeWidth={2.2}
									/>
									<Text className="text-slate-600 dark:text-gray-400 text-sm">
										Poids
									</Text>
								</View>
								<View className="flex-row items-end space-x-1">
									<Text className="text-3xl font-medium dark:text-gray-300">
										{lastSession?.body_weight}
									</Text>
									<Text className="text-xl font-extralight dark:text-gray-400">
										KG
									</Text>
								</View>
								{lastSession && (
									<Text className="text-[0.7rem] font-extralight capitalize text-slate-600 dark:text-gray-400">
										{format(
											new Date(lastSession.date_session),
											"EEE d MMMM yyyy",
											{ locale: fr },
										)}
									</Text>
								)}
							</View>
						</View>
					</View>
				</View>
			</ScrollView>
		</SafeAreaView>
	);
}
