import { LegendList } from "@legendapp/list";
import { useRouter } from "expo-router";
import React, { useCallback, useEffect, useRef, useState } from "react";
import {
	ActivityIndicator,
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

const PAGE_SIZE = 30;

export default function List() {
	const router = useRouter();
	const [isLoading, setIsLoading] = useState(false);
	const [refreshing, setRefreshing] = useState(false);
	const [sessions, setSessions] = useState<Session[]>([]);
	const [hasMore, setHasMore] = useState(true);
	const [isLoadingMore, setIsLoadingMore] = useState(false);
	const currentPageRef = useRef(1);

	// If you never change this, it can be a const instead of state
	const sortField = "date_session";
	const sortOrder = "desc";

	const inFlightRef = useRef(false);
	const loadingMoreRef = useRef(false);

	const fetchUserSessions = useCallback(
		async (page: number = 1, signal?: AbortSignal, append: boolean = false) => {
			if (inFlightRef.current || (append && loadingMoreRef.current)) return;
			if (append) {
				loadingMoreRef.current = true;
			} else {
				inFlightRef.current = true;
			}
			try {
				if (!append) {
					setIsLoading(true);
				} else {
					setIsLoadingMore(true);
				}
				const res = await fetchApi(
					`/api/sessions?page=${page}&limit=${PAGE_SIZE}&sortBy=${sortField}:${sortOrder}`,
					{ noStore: true, signal },
				);
				const newSessions = res ?? [];

				if (append) {
					setSessions((prev) => [...prev, ...newSessions]);
				} else {
					setSessions(newSessions);
					currentPageRef.current = 1;
				}

				// If we got fewer items than requested, we've reached the end
				setHasMore(newSessions.length === PAGE_SIZE);
				if (append) {
					currentPageRef.current = page;
				}
			} catch (error: any) {
				if (error?.name !== "AbortError") {
					console.error("Fetch error: ", error);
				}
			} finally {
				if (!append) {
					setIsLoading(false);
					inFlightRef.current = false;
				} else {
					setIsLoadingMore(false);
					loadingMoreRef.current = false;
				}
			}
		},
		[],
	);

	// Run once on mount
	useEffect(() => {
		const ac = new AbortController();
		fetchUserSessions(1, ac.signal, false);
		return () => ac.abort();
	}, [fetchUserSessions]);

	const onRefresh = useCallback(async () => {
		setRefreshing(true);
		setHasMore(true);
		const ac = new AbortController();
		await fetchUserSessions(1, ac.signal, false);
		setRefreshing(false);
	}, [fetchUserSessions]);

	const loadMore = useCallback(
		async (info?: { distanceFromEnd: number }) => {
			if (!hasMore || isLoadingMore || loadingMoreRef.current) return;
			const nextPage = currentPageRef.current + 1;
			const ac = new AbortController();
			await fetchUserSessions(nextPage, ac.signal, true);
		},
		[hasMore, isLoadingMore, fetchUserSessions],
	);

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
				<LegendList
					className="w-full"
					data={sessions}
					keyExtractor={(item) => item._id}
					estimatedItemSize={60}
					onEndReached={loadMore}
					onEndReachedThreshold={0.5}
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
					ListFooterComponent={
						isLoadingMore ? (
							<View className="py-4">
								<ActivityIndicator size="small" color={colors.light.primary} />
							</View>
						) : null
					}
				/>
			)}
			<NewSessionButton />
		</View>
	);
}
