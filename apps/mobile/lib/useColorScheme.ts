import { useUniwind } from "uniwind";

export function useColorScheme() {
	const { theme } = useUniwind();
	return {
		colorScheme: theme,
		isDarkColorScheme: theme === "dark",
	};
}
