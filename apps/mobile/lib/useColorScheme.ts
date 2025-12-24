import { useColorScheme as useSystemColorScheme } from "react-native";
import { Uniwind, useUniwind } from "uniwind";

export function useColorScheme() {
	const systemColorScheme = useSystemColorScheme();
	const { theme } = useUniwind();

	const resolvedScheme =
		theme === "system" ? systemColorScheme : (theme as "light" | "dark");
	const colorScheme = resolvedScheme ?? systemColorScheme ?? "dark";
	const setColorScheme = (scheme: "light" | "dark" | "system") => {
		Uniwind.setTheme(scheme);
	};
	const toggleColorScheme = () => {
		Uniwind.setTheme(colorScheme === "dark" ? "light" : "dark");
	};

	return {
		colorScheme,
		isDarkColorScheme: colorScheme === "dark",
		setColorScheme,
		toggleColorScheme,
	};
}
