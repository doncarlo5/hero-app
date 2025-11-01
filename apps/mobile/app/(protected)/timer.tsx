import { Stack } from "expo-router";
import { LucideClock4 } from "lucide-react-native";
import { useState } from "react";
import { View } from "react-native";

import { CountDownTimer } from "@/components/countdown-timer";
import { Input } from "@/components/ui/input";
import { Text } from "@/components/ui/text";
import { colors } from "@/constants/colors";
import { useColorScheme } from "@/lib/useColorScheme";

export default function TimerPage() {
	const { colorScheme } = useColorScheme();

	const [customTimer, setCustomTimer] = useState(120);

	return (
		<>
			<Stack.Screen
				options={{
					headerShown: true,
					title: "Timer",
					headerStyle: {
						backgroundColor:
							colorScheme === "dark"
								? colors.dark.background
								: colors.light.background,
					},
					headerTintColor:
						colorScheme === "dark"
							? colors.dark.foreground
							: colors.light.foreground,
					headerShadowVisible: true,
				}}
			/>
			<View className="flex-1 bg-background dark:bg-background-dark">
				{/* Main Content */}
				<View className="flex-1 flex-col items-center px-4 pt-4">
					<CountDownTimer exerciseTypeTimer={customTimer} />

					<View className="w-full max-w-xs ">
						<View className="relative">
							<View className="absolute top-1/2 left-0 flex items-center pl-3 z-10 -translate-y-1/2">
								<LucideClock4
									size={20}
									color={colorScheme === "dark" ? "#6B7280" : "#9CA3AF"}
								/>
							</View>
							<Input
								value={customTimer.toString()}
								onChangeText={(text) => {
									const value = parseInt(text) || 0;
									setCustomTimer(value);
								}}
								keyboardType="numeric"
								className="pl-10"
								placeholder="120"
								style={{ fontSize: 20 }}
							/>
						</View>
						<Text className="mb-6 text-gray-500 dark:text-gray-400 text-lg">
							En secondes
						</Text>
					</View>
				</View>
			</View>
		</>
	);
}
