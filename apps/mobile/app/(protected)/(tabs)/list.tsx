import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
	ActivityIndicator,
	FlatList,
	TouchableOpacity,
	View,
} from "react-native";

import NewSessionButton from "@/components/new-session-button";
import { Text } from "@/components/ui/text";
import { TypeSessionBadge } from "@/components/ui/type-session-badge";
import { colors } from "@/constants/colors";
import { fetchApi } from "@/lib/api-handler";
import { MessageSquareText } from "lucide-react-native";

export default function List() {
	const router = useRouter();
	const [isLoadingSessions, setIsLoadingSessions] = useState(false);
	const [sessions, setSessions] = useState<any[]>([]);
	const [sortConfig] = useState({
		field: "date_session",
		order: "desc",
	});

	const fetchUserSessions = async () => {
		try {
			setIsLoadingSessions(true);
			const response = await fetchApi(
				`/api/sessions?limit=1000&sortBy=${sortConfig.field}:${sortConfig.order}`,
			);
			setSessions(response);
		} catch (error: any) {
			console.error("Fetch error: ", error);
		} finally {
			setIsLoadingSessions(false);
		}
	};

	useEffect(() => {
		fetchUserSessions();
	}, []);

	const handleSessionPress = (sessionId: string) => {
		router.push(`/session/${sessionId}`);
	};

	return (
		<View className="flex-1 items-center justify-center bg-background dark:bg-background-dark p-4 w-full gap-y-4">
			{isLoadingSessions ? (
				<ActivityIndicator size="large" color={colors.light.primary} />
			) : (
				<FlatList
					className="w-full"
					data={sessions}
					keyExtractor={(item) => item._id}
					renderItem={({ item }) => (
						<TouchableOpacity
							className="flex-row items-center px-2 py-2 border-b border-border dark:border-border-dark w-full"
							onPress={() => handleSessionPress(item._id)}
						>
							<View
								className={`h-3 w-3 rounded-full mr-3 ${item.is_done ? "bg-green-500" : "bg-orange-500"}`}
							/>
							<Text className="mr-3 text-foreground dark:text-foreground-dark">
								<MessageSquareText opacity={!item.comment ? 0.3 : 1} />
							</Text>
							<Text className="mr-3 text-foreground dark:text-foreground-dark">
								{new Date(item.date_session).toLocaleDateString("fr-FR")}
							</Text>
							<TypeSessionBadge type_session={item.type_session} />
							<Text className="text-center mr-3 text-foreground dark:text-foreground-dark">
								{item.exercise_user_list.length}
							</Text>
						</TouchableOpacity>
					)}
				/>
			)}
			<NewSessionButton />
		</View>
	);
}
