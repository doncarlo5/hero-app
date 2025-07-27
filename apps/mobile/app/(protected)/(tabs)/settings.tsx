import {
	Activity,
	BarChart3,
	LogOut,
	LucidePencilRuler,
	Star,
	Timer,
	Trophy,
	UserCog,
} from "lucide-react-native";
import { useState } from "react";
import { Pressable, View } from "react-native";

import { Text } from "@/components/ui/text";
import { useAuth } from "@/context/supabase-provider";
import { useRouter } from "expo-router";
import FeedbackModal from "../feedback-modal";

export default function Settings() {
	const { signOut } = useAuth();
	const router = useRouter();
	const [feedbackModalVisible, setFeedbackModalVisible] = useState(false);

	return (
		<View className="flex-1 bg-background dark:bg-background-dark p-4 flex flex-col gap-4 justify-center">
			<View className="flex-row flex-wrap">
				<View className="w-1/2 pr-1 pb-2">
					<Pressable
						onPress={() => router.push("/(protected)/exercise-types")}
						className="h-32 rounded-md border flex items-center justify-center border-border dark:border-border-dark bg-background dark:bg-background-dark"
					>
						<View className="flex flex-col items-center gap-1">
							<LucidePencilRuler size={32} strokeWidth={1.1} />
							<Text>Mes exercices</Text>
						</View>
					</Pressable>
				</View>

				<View className="w-1/2 pl-1 pb-2">
					<Pressable
						onPress={() => router.push("/(protected)/stats")}
						className="h-32 rounded-md border flex items-center justify-center border-border dark:border-border-dark bg-background dark:bg-background-dark"
					>
						<View className="flex flex-col items-center gap-1">
							<BarChart3 size={32} strokeWidth={1.1} />
							<Text>Stats</Text>
						</View>
					</Pressable>
				</View>

				<View className="w-1/2 pr-1 pb-2">
					<Pressable className="h-32 rounded-md border flex items-center justify-center border-border dark:border-border-dark bg-background dark:bg-background-dark">
						<View className="flex flex-col items-center gap-1">
							<Trophy size={32} strokeWidth={1.1} />
							<Text>Trophées</Text>
						</View>
					</Pressable>
				</View>

				<View className="w-1/2 pl-1 pb-2">
					<Pressable
						onPress={() => router.push("/(protected)/timer")}
						className="h-32 rounded-md border flex items-center justify-center border-border dark:border-border-dark bg-background dark:bg-background-dark"
					>
						<View className="flex flex-col items-center gap-1">
							<Timer size={32} strokeWidth={1.1} />
							<Text>Timer</Text>
						</View>
					</Pressable>
				</View>

				<View className="w-1/2 pr-1 pb-2">
					<Pressable className="h-32 rounded-md border flex items-center justify-center border-border dark:border-border-dark bg-background dark:bg-background-dark">
						<View className="flex flex-col items-center gap-1">
							<UserCog size={32} strokeWidth={1.1} />
							<Text>Informations</Text>
						</View>
					</Pressable>
				</View>

				<View className="w-1/2 pl-1 pb-2">
					<Pressable className="h-32 rounded-md border flex items-center justify-center border-border dark:border-border-dark bg-background dark:bg-background-dark">
						<View className="flex flex-col items-center gap-1">
							<Activity size={32} strokeWidth={1.1} />
							<Text>Programme</Text>
						</View>
					</Pressable>
				</View>

				<View className="w-1/2 pr-1 pb-2">
					<Pressable
						onPress={() => setFeedbackModalVisible(true)}
						className="h-32 rounded-md border flex items-center justify-center border-border dark:border-border-dark bg-background dark:bg-background-dark"
					>
						<View className="flex flex-col items-center gap-1">
							<Star size={32} strokeWidth={1.1} />
							<Text>Feedback</Text>
						</View>
					</Pressable>
				</View>

				<View className="w-1/2 pl-1 pb-2">
					<Pressable
						className="h-32 rounded-md border flex items-center justify-center border-border dark:border-border-dark bg-background dark:bg-background-dark"
						onPress={async () => {
							await signOut();
						}}
					>
						<View className="flex flex-col items-center gap-1">
							<LogOut size={32} strokeWidth={1.1} />
							<Text>Déconnexion</Text>
						</View>
					</Pressable>
				</View>
			</View>

			<FeedbackModal
				visible={feedbackModalVisible}
				onClose={() => setFeedbackModalVisible(false)}
			/>
		</View>
	);
}
