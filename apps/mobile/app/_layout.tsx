import "react-native-reanimated";
import "../global.css";

import { Stack, useRouter, useSegments } from "expo-router";
import { useEffect } from "react";
import { ActivityIndicator, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import { colors } from "@/constants/colors";
import { AuthProvider, useAuth } from "@/context/supabase-provider";
import { useColorScheme } from "@/lib/useColorScheme";

export default function AppLayout() {
	const { colorScheme } = useColorScheme();

	return (
		<GestureHandlerRootView style={{ flex: 1 }}>
			<AuthProvider>
				<View className="flex-1">
					<Stack screenOptions={{ headerShown: false, gestureEnabled: false }}>
						<Stack.Screen name="(protected)" />
						<Stack.Screen name="welcome" />
						<Stack.Screen
							name="sign-up"
							options={{
								presentation: "modal",
								headerShown: true,
								headerTitle: "Sign Up",
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
								gestureEnabled: true,
							}}
						/>
						<Stack.Screen
							name="sign-in"
							options={{
								presentation: "modal",
								headerShown: true,
								headerTitle: "Sign In",
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
								gestureEnabled: true,
							}}
						/>
					</Stack>
					<AuthRedirector />
					<AuthLoadingOverlay />
				</View>
			</AuthProvider>
		</GestureHandlerRootView>
	);
}

function AuthLoadingOverlay() {
	const { isLoading } = useAuth();

	if (!isLoading) {
		return null;
	}

	return (
		<View className="absolute inset-0 items-center justify-center bg-background/80 dark:bg-background-dark/80">
			<ActivityIndicator size="large" />
		</View>
	);
}

function AuthRedirector() {
	const { isLoading, session } = useAuth();
	const router = useRouter();
	const segments = useSegments();

	useEffect(() => {
		if (isLoading) {
			return;
		}

		const inProtectedGroup = segments[0] === "(protected)";

		if (session && !inProtectedGroup) {
			router.replace("/(protected)/(tabs)");
			return;
		}

		if (!session && inProtectedGroup) {
			router.replace("/welcome");
		}
	}, [isLoading, session, segments, router]);

	return null;
}
