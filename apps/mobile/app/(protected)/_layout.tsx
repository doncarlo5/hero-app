import { Redirect, Stack } from "expo-router";

import { colors } from "@/constants/colors";
import { useAuth } from "@/context/supabase-provider";
import { useColorScheme } from "@/lib/useColorScheme";

export const unstable_settings = {
	initialRouteName: "(tabs)",
};

export default function ProtectedLayout() {
	const { initialized, session } = useAuth();
	const { colorScheme } = useColorScheme();

	if (!initialized) {
		return null;
	}

	if (!session) {
		return <Redirect href="/welcome" />;
	}

	return (
		<Stack
			screenOptions={{
				headerShown: false,
			}}
		>
			<Stack.Screen name="(tabs)" />
			<Stack.Screen name="modal" options={{ presentation: "modal" }} />
			<Stack.Screen
				name="session/[id]"
				options={({ route }) => {
					const params = route.params as { fromExercise?: string };
					return {
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
						presentation: "card",
						headerShown: true,
						headerTitle: "Session",
						headerBackTitle: params?.fromExercise === "true" ? "" : "List",
						headerBackVisible: params?.fromExercise !== "true",
						headerShadowVisible: true,
					};
				}}
			/>
			<Stack.Screen
				name="exercise/[id]"
				options={{
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
					presentation: "card",
					headerShown: true,
					headerTitle: "Exercise",
					headerShadowVisible: true,
				}}
			/>
			<Stack.Screen
				name="exercise-type/[id]"
				options={{
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
					presentation: "card",
					headerShown: true,
					headerTitle: "Exercise Type",
					headerBackTitle: "Mes types",
					headerShadowVisible: true,
				}}
			/>
			<Stack.Screen
				name="do-exercise"
				options={{
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
					presentation: "card",
					headerShown: true,
					headerTitle: "New Exercise",
					headerBackTitle: "Back",
					headerShadowVisible: true,
				}}
			/>
			<Stack.Screen
				name="exercise-types"
				options={{
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
					presentation: "card",
					headerShown: true,
					headerTitle: "Mes exercices type",
					headerBackTitle: "Settings",
					headerShadowVisible: true,
				}}
			/>
			<Stack.Screen
				name="stats"
				options={{
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
					presentation: "card",
					headerShown: true,
					headerTitle: "Statistiques",
					headerBackTitle: "Back",
					headerShadowVisible: true,
				}}
			/>
			<Stack.Screen
				name="trophy"
				options={{
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
					presentation: "card",
					headerShown: true,
					headerTitle: "Trophées",
					headerBackTitle: "Settings",
					headerShadowVisible: true,
				}}
			/>
		</Stack>
	);
}
