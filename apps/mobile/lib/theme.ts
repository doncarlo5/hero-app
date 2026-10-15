import { DarkTheme, DefaultTheme, type Theme } from "expo-router";

import { colors } from "@/constants/colors";
import { useColorScheme } from "@/lib/useColorScheme";

export type ThemeColors = (typeof colors)["light"];

/**
 * Theme tokens (from global.css) as plain color strings, for the places that
 * can't take a className: icon colors, navigation options, chart styles.
 */
export function useThemeColors(): ThemeColors {
	const { isDarkColorScheme } = useColorScheme();
	return isDarkColorScheme ? colors.dark : colors.light;
}

function navigationTheme(base: Theme, palette: ThemeColors): Theme {
	return {
		...base,
		colors: {
			...base.colors,
			primary: palette.foreground,
			background: palette.background,
			card: palette.background,
			text: palette.foreground,
			border: palette.border,
			notification: palette.destructive,
		},
	};
}

export const navigationThemes = {
	light: navigationTheme(DefaultTheme, colors.light),
	dark: navigationTheme(DarkTheme, colors.dark),
};
