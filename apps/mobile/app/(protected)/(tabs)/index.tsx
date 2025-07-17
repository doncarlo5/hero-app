import { View } from "react-native";

import { H1 } from "@/components/ui/typography";

export default function Home() {
	return (
		<View className="flex-1 items-center justify-center bg-background dark:bg-background-dark p-4">
			<H1 className="text-center text-foreground dark:text-foreground-dark">
				Welcome
			</H1>
		</View>
	);
}
