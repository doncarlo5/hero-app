import { Redirect, Stack } from "expo-router";

import { useAuth } from "@/context/supabase-provider";

export const unstable_settings = {
	initialRouteName: "(tabs)",
};

export default function ProtectedLayout() {
	const { session } = useAuth();

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
					presentation: "card",
					headerShown: true,
					headerTitle: "Exercise",
					headerShadowVisible: true,
				}}
			/>
			<Stack.Screen
				name="exercise-type/[id]"
				options={{
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
