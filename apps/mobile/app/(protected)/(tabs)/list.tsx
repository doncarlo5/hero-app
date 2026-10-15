import { LegendList } from "@legendapp/list";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
	ActivityIndicator,
	RefreshControl,
	TouchableOpacity,
	View,
} from "react-native";

import NewSessionButton from "@/components/new-session-button";
import { Text } from "@/components/ui/text";
import { TypeSessionBadge } from "@/components/ui/type-session-badge";
import { useSessionsPages } from "@/lib/queries/sessions";
import { useThemeColors } from "@/lib/theme";
import { MessageSquareText } from "lucide-react-native";

export default function List() {
	const themeColors = useThemeColors();
	const router = useRouter();
	const sessionsPages = useSessionsPages();
	const [refreshing, setRefreshing] = useState(false);

	const sessions = sessionsPages.data?.pages.flat() ?? [];
	const isLoading = sessionsPages.isLoading;
	const isLoadingMore = sessionsPages.isFetchingNextPage;

	const onRefresh = async () => {
		setRefreshing(true);
		await sessionsPages.refetch();
		setRefreshing(false);
	};

	const loadMore = () => {
		if (sessionsPages.hasNextPage && !sessionsPages.isFetchingNextPage) {
			sessionsPages.fetchNextPage();
		}
	};

	const handleSessionPress = (sessionId: string) => {
		router.push(`/session/${sessionId}`);
	};

	return (
		<View className="flex-1 items-center justify-center bg-background p-4 w-full gap-y-4">
			{isLoading && sessions.length === 0 ? (
				<ActivityIndicator size="large" color={themeColors.primary} />
			) : (
				<LegendList
					style={{ width: "100%" }}
					data={sessions}
					keyExtractor={(item) => item.id}
					estimatedItemSize={60}
					onEndReached={loadMore}
					onEndReachedThreshold={0.5}
					refreshControl={
						<RefreshControl
							refreshing={refreshing}
							onRefresh={onRefresh}
							tintColor={themeColors.mutedForeground}
							colors={[themeColors.mutedForeground]}
						/>
					}
					renderItem={({ item }) => (
						<TouchableOpacity
							className="flex-row items-center px-2 py-2 border-b border-border w-full"
							onPress={() => handleSessionPress(item.id)}
						>
							<View
								className={`h-3 w-3 rounded-full mr-3 ${
									item.is_done ? "bg-green-500" : "bg-orange-500"
								}`}
							/>
							<Text className="mr-3 text-foreground">
								<MessageSquareText
									color={themeColors.foreground}
									opacity={!item.comment ? 0.3 : 1}
								/>
							</Text>
							<Text className="mr-3 text-foreground">
								{new Date(item.date_session).toLocaleDateString("fr-FR")}
							</Text>
							<TypeSessionBadge label={item.label} />
							<Text className="text-center mr-3 text-foreground">
								{item.logged_exercises[0]?.count ?? 0}
							</Text>
						</TouchableOpacity>
					)}
					ListEmptyComponent={
						sessionsPages.error ? (
							<Text
								onPress={() => sessionsPages.refetch()}
								className="text-center text-foreground py-6"
							>
								Impossible de charger les séances. Toucher pour réessayer.
							</Text>
						) : !isLoading ? (
							<Text className="text-center text-foreground py-6">
								Aucune séance pour le moment.
							</Text>
						) : null
					}
					ListFooterComponent={
						isLoadingMore ? (
							<View className="py-4">
								<ActivityIndicator size="small" color={themeColors.primary} />
							</View>
						) : null
					}
				/>
			)}
			<NewSessionButton />
		</View>
	);
}
