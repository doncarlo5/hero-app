import { DarkTheme, DefaultTheme, type Theme } from "expo-router";
import { useCSSVariable } from "uniwind";

import { useColorScheme } from "@/lib/useColorScheme";

const TOKENS = {
	background: "--color-background",
	foreground: "--color-foreground",
	border: "--color-border",
	mutedForeground: "--color-muted",
	popover: "--color-overlay",
	primary: "--color-foreground",
	primaryForeground: "--color-background",
	input: "--color-field",
	brand: "--color-accent",
	accentForeground: "--color-accent-foreground",
	destructive: "--color-danger",
} as const;

export type ThemeColors = Record<keyof typeof TOKENS, string>;

const names = Object.values(TOKENS);

/**
 * Theme tokens (from global.css) as plain color strings, for the places that
 * can't take a className: icon colors, navigation options, chart styles.
 */
export function useThemeColors(): ThemeColors {
	const values = useCSSVariable(names) as (string | number | undefined)[];
	const keys = Object.keys(TOKENS) as (keyof typeof TOKENS)[];
	return Object.fromEntries(
		keys.map((key, index) => [key, String(values[index] ?? "")]),
	) as ThemeColors;
}

export function useNavigationTheme(): Theme {
	const { isDarkColorScheme } = useColorScheme();
	const palette = useThemeColors();
	const base = isDarkColorScheme ? DarkTheme : DefaultTheme;
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
