import { useRouter } from "expo-router";
import React from "react";
import { View } from "react-native";

import { Image } from "@/components/image";
import { SafeAreaView } from "@/components/safe-area-view";
import { Button } from "heroui-native";
import { Text } from "@/components/ui/text";
import { Muted } from "@/components/ui/typography";
import { useColorScheme } from "@/lib/useColorScheme";

export default function WelcomeScreen() {
	const router = useRouter();
	const { colorScheme } = useColorScheme();
	const appIcon =
		colorScheme === "dark"
			? require("../assets/icon.png")
			: require("../assets/icon-dark.png");

	return (
		<SafeAreaView className="flex flex-1 bg-background p-4">
			<View className="flex flex-1 items-center justify-center gap-y-4 web:m-4">
				<View className="flex flex-row items-center gap-x-2">
					<Image source={appIcon} className="w-20 h-20 rounded-xl" />
					<View style={{ gap: 0 }}>
						<Text
							style={{
								fontSize: 43.2,
								fontWeight: "800",
								lineHeight: 40.2,
								marginBottom: -9,
							}}
						>
							Hero
						</Text>
						<Text
							style={{ fontSize: 43.2, fontWeight: "800", lineHeight: 40.2 }}
						>
							App
						</Text>
					</View>
				</View>

				<Muted className="text-center">Your workout journey starts here.</Muted>
			</View>
			<View className="flex flex-col gap-y-4 web:m-4">
				<Button
					onPress={() => {
						router.push("/sign-up");
					}}
				>
					<Button.Label>Sign Up</Button.Label>
				</Button>
				<Button
					variant="secondary"
					onPress={() => {
						router.push("/sign-in");
					}}
				>
					<Button.Label>Sign In</Button.Label>
				</Button>
			</View>
		</SafeAreaView>
	);
}
