import {
	Activity,
	BarChart3,
	LogOut,
	MessageSquareText,
	Settings as SettingsIcon,
	Timer,
	Trophy,
	User,
} from "lucide-react-native";
import { View } from "react-native";

import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { H1 } from "@/components/ui/typography";
import { useAuth } from "@/context/supabase-provider";

export default function Settings() {
	const { signOut } = useAuth();

	return (
		<View className="flex-1 bg-background dark:bg-background-dark p-4">
			<View className="flex-1">
				<H1 className="text-center text-foreground dark:text-foreground-dark mb-6">
					Paramètres
				</H1>

				<View className="flex-1 justify-center">
					<View className="flex-row flex-wrap">
						<View className="w-1/2 pr-1 pb-2">
							<Button variant="outline" className="h-24 rounded-md">
								<View className="flex flex-col items-center justify-center gap-1">
									<User size={32} />
									<Text className="text-xs">Profil</Text>
								</View>
							</Button>
						</View>

						<View className="w-1/2 pl-1 pb-2">
							<Button variant="outline" className="h-24 rounded-md">
								<View className="flex flex-col items-center justify-center gap-1">
									<BarChart3 size={32} />
									<Text className="text-xs">Statistiques</Text>
								</View>
							</Button>
						</View>

						<View className="w-1/2 pr-1 pb-2">
							<Button variant="outline" className="h-24 rounded-md">
								<View className="flex flex-col items-center justify-center gap-1">
									<Trophy size={32} />
									<Text className="text-xs">Trophées</Text>
								</View>
							</Button>
						</View>

						<View className="w-1/2 pl-1 pb-2">
							<Button variant="outline" className="h-24 rounded-md">
								<View className="flex flex-col items-center justify-center gap-1">
									<Timer size={32} />
									<Text className="text-xs">Timer</Text>
								</View>
							</Button>
						</View>

						<View className="w-1/2 pr-1 pb-2">
							<Button variant="outline" className="h-24 rounded-md">
								<View className="flex flex-col items-center justify-center gap-1">
									<SettingsIcon size={32} />
									<Text className="text-xs">Préférences</Text>
								</View>
							</Button>
						</View>

						<View className="w-1/2 pl-1 pb-2">
							<Button variant="outline" className="h-24 rounded-md">
								<View className="flex flex-col items-center justify-center gap-1">
									<Activity size={32} />
									<Text className="text-xs">Programme</Text>
								</View>
							</Button>
						</View>

						<View className="w-1/2 pr-1 pb-2">
							<Button variant="outline" className="h-24 rounded-md">
								<View className="flex flex-col items-center justify-center gap-1">
									<MessageSquareText size={32} />
									<Text className="text-xs">Feedback</Text>
								</View>
							</Button>
						</View>

						<View className="w-1/2 pl-1 pb-2">
							<Button
								variant="outline"
								className="h-24 rounded-md"
								onPress={async () => {
									await signOut();
								}}
							>
								<View className="flex flex-col items-center justify-center gap-1">
									<LogOut size={32} />
									<Text className="text-xs">Déconnexion</Text>
								</View>
							</Button>
						</View>
					</View>
				</View>
			</View>
		</View>
	);
}
