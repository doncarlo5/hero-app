import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect } from "react";
import { ActivityIndicator, View } from "react-native";

import { SafeAreaView } from "@/components/safe-area-view";
import { Text } from "@/components/ui/text";
import { useAuth } from "@/context/supabase-provider";

export default function AuthCallback() {
	const router = useRouter();
	const params = useLocalSearchParams();
	const { session } = useAuth();

	useEffect(() => {
		console.log("Auth callback route loaded with params:", params);

		// If we have a session, redirect to main app
		if (session) {
			console.log("Session found, redirecting to main app");
			router.replace("/");
			return;
		}

		// If no session after a short delay, redirect to welcome
		const timeout = setTimeout(() => {
			console.log("No session established, redirecting to welcome");
			router.replace("/welcome");
		}, 3000);

		return () => clearTimeout(timeout);
	}, [session, router, params]);

	return (
		<SafeAreaView className="flex-1 bg-background dark:bg-background-dark">
			<View className="flex-1 items-center justify-center gap-4">
				<ActivityIndicator size="large" />
				<Text className="text-center dark:text-gray-300">
					Processing authentication...
				</Text>
			</View>
		</SafeAreaView>
	);
}
