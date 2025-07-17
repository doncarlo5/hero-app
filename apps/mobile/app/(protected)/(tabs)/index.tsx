import { format } from "date-fns";
import { fr } from "date-fns/locale/fr";
import { Flame, Gauge, Plus, Trophy } from "lucide-react-native";
import { useEffect, useState } from "react";
import {
	ActivityIndicator,
	RefreshControl,
	SafeAreaView,
	ScrollView,
	Text,
	View,
} from "react-native";
import Svg, { Circle, Defs, LinearGradient, Stop } from "react-native-svg";

import { TypeSessionBadge } from "@/components/ui/type-session-badge";
import { fetchApi } from "@/lib/api-handler";

type User = {
	_id: string;
	firstName: string;
	lastName: string;
	email: string;
	hasSeenOnboarding: boolean;
};

type Session = {
	_id: string;
	date_session: string;
	type_session: string;
	body_weight: string;
	is_done: boolean;
	comment?: string;
	exercise_user_list: string[];
};

type TrophyType = {
	_id: string;
	name: string;
	achieved: boolean;
	level: number;
	description: string;
};

const CircularProgress = ({
	progress,
	size = 80,
	strokeWidth = 8,
}: {
	progress: number;
	size?: number;
	strokeWidth?: number;
}) => {
	const radius = (size - strokeWidth) / 2;
	const circumference = radius * 2 * Math.PI; // Full circle

	return (
		<View className="items-center">
			<View className="relative">
				<Svg width={size} height={size}>
					<Defs>
						<LinearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
							<Stop offset="0%" stopColor="#38b2ac" />
							<Stop offset="100%" stopColor="#4fd1c5" />
						</LinearGradient>
					</Defs>

					{/* Background circle (gray) */}
					<Circle
						cx={size / 2}
						cy={size / 2}
						r={radius}
						stroke="rgb(209 213 219)"
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
	const [user, setUser] = useState<User | null>(null);
	const [lastSession, setLastSession] = useState<Session | null>(null);
	const [allSessions, setAllSessions] = useState<Session[]>([]);
	const [trophies, setTrophies] = useState<TrophyType[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [refreshing, setRefreshing] = useState(false);

	const fetchData = async () => {
		try {
			setIsLoading(true);

			// Fetch user data
			const userResponse = await fetchApi("/api/auth/verify");
			setUser(userResponse.user);

			// Fetch last session
			const lastSessionResponse = await fetchApi(
				"/api/sessions?limit=1&sortBy=date_session:desc",
			);
			setLastSession(lastSessionResponse[0] || null);

			// Fetch all sessions
			const allSessionsResponse = await fetchApi(
				"/api/sessions?limit=1000&sortBy=date_session:desc",
			);
			setAllSessions(allSessionsResponse);

			// Fetch trophies
			const trophiesResponse = await fetchApi("/api/trophies");
			setTrophies(trophiesResponse);
		} catch (error) {
			console.error("Error fetching data:", error);
		} finally {
			setIsLoading(false);
		}
	};

	const onRefresh = async () => {
		setRefreshing(true);
		await fetchData();
		setRefreshing(false);
	};

	useEffect(() => {
		fetchData();
	}, []);

	const achievedTrophies = trophies.filter((t) => t.achieved).length;

	if (isLoading) {
		return (
			<SafeAreaView className="flex-1 items-center justify-center bg-background dark:bg-background-dark p-4">
				<ActivityIndicator size="large" />
				<Text className="mt-4 text-sm text-muted-foreground">Chargement…</Text>
			</SafeAreaView>
		);
	}

	return (
		<SafeAreaView className="flex-1 bg-background dark:bg-background-dark">
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
					<Text className="text-4xl font-bold tracking-tighter mb-4">
						Bienvenue {user?.firstName}
					</Text>

					<View className="rounded-2xl bg-slate-100/80 dark:bg-slate-900/80 shadow-md p-3 mb-6">
						<View className="flex-col justify-between gap-4">
							<View className="flex-row items-center justify-between">
								<Text className="text-xs font-semibold uppercase tracking-tight text-gray-500 dark:text-gray-400">
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
									<TypeSessionBadge type_session={lastSession.type_session} />
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

					<Text className="text-2xl font-bold mb-3">Progression</Text>

					<View className="flex-row gap-3">
						<View className="flex-1 gap-3">
							<View className="rounded-2xl gap-1 bg-slate-100/80 dark:bg-slate-900/80 shadow-md p-3 justify-between h-20">
								<View className="flex-row items-center gap-1">
									<Flame
										color="rgb(71 85 105)"
										height={17}
										width={17}
										strokeWidth={2.2}
									/>
									<Text className="text-slate-600 dark:text-gray-400 text-sm">
										Total séances
									</Text>
								</View>
								<Text className="text-3xl font-extrabold tracking-tighter">
									{allSessions.length}
								</Text>
							</View>

							<View className="rounded-2xl bg-slate-100/80 dark:bg-slate-900/80 shadow-md p-3 flex-1 justify-between">
								<View className="flex-row items-center gap-1.5 mb-3">
									<Trophy
										color="rgb(71 85 105)"
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
										progress={(achievedTrophies / 27) * 100}
										size={70}
										strokeWidth={6}
									/>
									<Text className="text-xl font-extrabold text-center mt-2">
										{achievedTrophies}/27
									</Text>
								</View>
							</View>
						</View>

						<View className="flex-1 gap-3">
							<View className="rounded-2xl bg-slate-100/80 dark:bg-slate-900/80 shadow-md p-3 flex-1 items-center justify-center">
								<View className="items-center gap-2">
									<View className="items-center">
										<Text className="leading-4 text-gray-500 dark:text-gray-400 text-sm">
											Créer un
										</Text>
										<Text className="font-bold leading-4 tracking-tighter text-sm">
											NOUVEL EXERCICE
										</Text>
									</View>
									<Plus
										height={30}
										width={30}
										strokeWidth={1.5}
										color="rgb(71 85 105)"
									/>
								</View>
							</View>

							<View className="rounded-2xl bg-slate-100/80 dark:bg-slate-900/80 shadow-md p-3 h-24 justify-between">
								<View className="flex-row gap-1.5">
									<Gauge
										color="rgb(71 85 105)"
										height={17}
										width={17}
										strokeWidth={2.2}
									/>
									<Text className="text-slate-600 dark:text-gray-400 text-sm">
										Poids
									</Text>
								</View>
								<View className="flex-row items-end space-x-1">
									<Text className="text-3xl font-medium">
										{lastSession?.body_weight}
									</Text>
									<Text className="text-xl font-extralight">KG</Text>
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
