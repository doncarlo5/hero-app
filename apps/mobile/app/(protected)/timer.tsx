import { Stack } from "expo-router";
import { LucideClock4 } from "lucide-react-native";
import { useState } from "react";
import { View } from "react-native";

import { CountDownTimer } from "@/components/countdown-timer";
import { Input } from "@/components/ui/input";
import { Text } from "@/components/ui/text";
import { useThemeColors } from "@/lib/theme";

export default function TimerPage() {
	const themeColors = useThemeColors();

	const [customTimer, setCustomTimer] = useState(120);

	return (
		<>
			<Stack.Screen
				options={{
					headerShown: true,
					title: "Timer",
					headerShadowVisible: true,
				}}
			/>
			<View className="flex-1 bg-background">
				{/* Main Content */}
				<View className="flex-1 flex-col items-center px-4 pt-4">
					<CountDownTimer exerciseTypeTimer={customTimer} />

					<View className="w-full max-w-xs ">
						<View className="relative">
							<View className="absolute top-1/2 left-0 flex items-center pl-3 z-10 -translate-y-1/2">
								<LucideClock4 size={20} color={themeColors.mutedForeground} />
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
						<Text className="mb-6 text-muted-foreground text-lg">
							En secondes
						</Text>
					</View>
				</View>
			</View>
		</>
	);
}
