import "react-native-reanimated";
import "../global.css";

import { QueryClientProvider } from "@tanstack/react-query";
import { Stack, ThemeProvider, useRouter, useSegments } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { HeroUINativeProvider } from "heroui-native";
import { useEffect } from "react";
import { ActivityIndicator, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import { AuthProvider, useAuth } from "@/context/supabase-provider";
import { useApplyColorSchemePreference } from "@/lib/color-scheme-preference";
import { queryClient } from "@/lib/queries/client";
import { useNavigationTheme } from "@/lib/theme";

export default function AppLayout() {
	const navigationTheme = useNavigationTheme();
	const preferenceApplied = useApplyColorSchemePreference();

	// The splash screen stays up until AuthProvider hides it, so rendering
	// nothing here avoids a frame in the wrong color scheme.
	if (!preferenceApplied) {
		return null;
	}

	return (
		<GestureHandlerRootView style={{ flex: 1 }}>
			<ThemeProvider value={navigationTheme}>
				<StatusBar style="auto" />
				<HeroUINativeProvider
					config={{ devInfo: { stylingPrinciples: false } }}
				>
					<QueryClientProvider client={queryClient}>
						<AuthProvider>
							<View className="flex-1 bg-background">
								<Stack
									screenOptions={{ headerShown: false, gestureEnabled: false }}
								>
									<Stack.Screen name="(protected)" />
									<Stack.Screen name="welcome" />
									<Stack.Screen
										name="sign-up"
										options={{
											presentation: "modal",
											headerShown: true,
											headerTitle: "Sign Up",
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
											headerShadowVisible: true,
											gestureEnabled: true,
										}}
									/>
								</Stack>
								<AuthRedirector />
								<AuthLoadingOverlay />
							</View>
						</AuthProvider>
					</QueryClientProvider>
				</HeroUINativeProvider>
			</ThemeProvider>
		</GestureHandlerRootView>
	);
}

function AuthLoadingOverlay() {
	const { isLoading } = useAuth();

	if (!isLoading) {
		return null;
	}

	return (
		<View className="absolute inset-0 items-center justify-center bg-background/80">
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
