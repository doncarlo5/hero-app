import * as Haptics from "expo-haptics";
import { Tabs } from "expo-router";
import React from "react";

import { colors } from "@/constants/colors";
import { useColorScheme } from "@/lib/useColorScheme";
import { AlignJustifyIcon, HomeIcon, SettingsIcon } from "lucide-react-native";

export default function TabsLayout() {
	const { colorScheme } = useColorScheme();

	const handleTabPress = () => {
		Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
	};

	return (
		<Tabs
			screenOptions={{
				headerShown: true,
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
				tabBarStyle: {
					backgroundColor:
						colorScheme === "dark"
							? colors.dark.background
							: colors.light.background,
					borderTopColor:
						colorScheme === "dark" ? colors.dark.border : colors.light.border,
					borderTopWidth: 1,
				},
				tabBarActiveTintColor: "#14b8a6",
				tabBarInactiveTintColor: "#9ca3af",
				tabBarShowLabel: true,
				tabBarIconStyle: {
					marginBottom: 3,
				},
			}}
			screenListeners={{
				tabPress: handleTabPress,
			}}
		>
			<Tabs.Screen
				name="index"
				options={{
					title: "Home",
					tabBarIcon: ({ color }) => (
						<HomeIcon strokeWidth={1.7} size={26} color={color} />
					),
				}}
			/>
			<Tabs.Screen
				name="list"
				options={{
					title: "Séances",
					tabBarIcon: ({ color }) => (
						<AlignJustifyIcon strokeWidth={1.7} size={26} color={color} />
					),
				}}
			/>
			<Tabs.Screen
				name="settings"
				options={{
					title: "Settings",
					tabBarIcon: ({ color }) => (
						<SettingsIcon strokeWidth={1.7} size={26} color={color} />
					),
				}}
			/>
		</Tabs>
	);
}
