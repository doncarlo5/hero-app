import { useRouter } from "expo-router";
import React, { useCallback, useEffect, useRef, useState } from "react";
import {
	ActivityIndicator,
	FlatList,
	RefreshControl,
	TouchableOpacity,
	View,
} from "react-native";

import NewSessionButton from "@/components/new-session-button";
import { Text } from "@/components/ui/text";
import { TypeSessionBadge } from "@/components/ui/type-session-badge";
import { colors } from "@/constants/colors";
import { fetchApi } from "@/lib/api-handler";
import { MessageSquareText } from "lucide-react-native";

type Session = {
	_id: string;
	date_session: string;
	type_session: string;
	is_done: boolean;
	comment?: string;
	exercise_user_list: any[];
};

export default function List() {
	const router = useRouter();
	const [isLoading, setIsLoading] = useState(false);
	const [refreshing, setRefreshing] = useState(false);
	const [sessions, setSessions] = useState<Session[]>([]);

	// If you never change this, it can be a const instead of state
	const sortField = "date_session";
	const sortOrder = "desc";

	const inFlightRef = useRef(false);

	const fetchUserSessions = useCallback(async (signal?: AbortSignal) => {
		if (inFlightRef.current) return;
		inFlightRef.current = true;
		try {
			setIsLoading(true);
			const res = await fetchApi(
				`/api/sessions?limit=1000&sortBy=${sortField}:${sortOrder}`,
				{ noStore: true, signal },
			);
			setSessions(res ?? []);
		} catch (error: any) {
			if (error?.name !== "AbortError") {
				console.error("Fetch error: ", error);
			}
		} finally {
			setIsLoading(false);
			inFlightRef.current = false;
		}
	}, []);

	// Run once on mount
	useEffect(() => {
		const ac = new AbortController();
		fetchUserSessions(ac.signal);
		return () => ac.abort();
	}, [fetchUserSessions]);

	const onRefresh = useCallback(async () => {
		setRefreshing(true);
		const ac = new AbortController();
		await fetchUserSessions(ac.signal);
		setRefreshing(false);
	}, [fetchUserSessions]);

	const handleSessionPress = useCallback(
		(sessionId: string) => {
			router.push(`/session/${sessionId}`);
		},
		[router],
	);

	return (
		<View className="flex-1 items-center justify-center bg-background dark:bg-background-dark p-4 w-full gap-y-4">
			{isLoading && sessions.length === 0 ? (
				<ActivityIndicator size="large" color={colors.light.primary} />
			) : (
				<FlatList
					className="w-full"
					data={sessions}
					keyExtractor={(item) => item._id}
					refreshControl={
						<RefreshControl
							refreshing={refreshing}
							onRefresh={onRefresh}
							tintColor="rgb(71 85 105)"
							colors={["rgb(71 85 105)"]}
						/>
					}
					renderItem={({ item }) => (
						<TouchableOpacity
							className="flex-row items-center px-2 py-2 border-b border-border dark:border-border-dark w-full"
							onPress={() => handleSessionPress(item._id)}
						>
							<View
								className={`h-3 w-3 rounded-full mr-3 ${
									item.is_done ? "bg-green-500" : "bg-orange-500"
								}`}
							/>
							<Text className="mr-3 text-foreground dark:text-foreground-dark">
								<MessageSquareText opacity={!item.comment ? 0.3 : 1} />
							</Text>
							<Text className="mr-3 text-foreground dark:text-foreground-dark">
								{new Date(item.date_session).toLocaleDateString("fr-FR")}
							</Text>
							<TypeSessionBadge type_session={item.type_session} />
							<Text className="text-center mr-3 text-foreground dark:text-foreground-dark">
								{item.exercise_user_list?.length ?? 0}
							</Text>
						</TouchableOpacity>
					)}
					ListEmptyComponent={
						!isLoading ? (
							<Text className="text-center text-foreground dark:text-foreground-dark py-6">
								Aucune séance pour le moment.
							</Text>
						) : null
					}
				/>
			)}
			<NewSessionButton />
		</View>
	);
}
