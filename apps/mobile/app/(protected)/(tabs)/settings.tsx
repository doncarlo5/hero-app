import { View } from "react-native";

import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { H1, Muted } from "@/components/ui/typography";
import { useAuth } from "@/context/supabase-provider";

export default function Settings() {
	const { signOut } = useAuth();

	return (
		<View className="flex-1 items-center justify-center bg-background dark:bg-background-dark p-4 gap-y-4">
			<H1 className="text-center text-foreground dark:text-foreground-dark">
				Sign Out
			</H1>
			<Muted className="text-center text-muted-foreground dark:text-muted-foreground-dark">
				Sign out and return to the welcome screen.
			</Muted>
			<Button
				className="w-full"
				size="default"
				variant="default"
				onPress={async () => {
					await signOut();
				}}
			>
				<Text>Sign Out</Text>
			</Button>
		</View>
	);
}
