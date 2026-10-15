import * as Haptics from "expo-haptics";
import { Tabs } from "expo-router";
import React from "react";

import { useThemeColors } from "@/lib/theme";
import { AlignJustifyIcon, HomeIcon, SettingsIcon } from "lucide-react-native";

export default function TabsLayout() {
	const themeColors = useThemeColors();

	const handleTabPress = () => {
		Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
	};

	return (
		<Tabs
			screenOptions={{
				headerShown: true,
				tabBarActiveTintColor: themeColors.brand,
				tabBarInactiveTintColor: themeColors.mutedForeground,
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
