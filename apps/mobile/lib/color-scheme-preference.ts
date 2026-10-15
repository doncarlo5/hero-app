import AsyncStorage from "@react-native-async-storage/async-storage";
import { colorScheme } from "nativewind";
import { useEffect, useState } from "react";

export type ColorSchemePreference = "light" | "dark" | "system";

const STORAGE_KEY = "colorSchemePreference";

function isPreference(value: unknown): value is ColorSchemePreference {
	return value === "light" || value === "dark" || value === "system";
}

export async function getColorSchemePreference(): Promise<ColorSchemePreference> {
	try {
		const saved = await AsyncStorage.getItem(STORAGE_KEY);
		return isPreference(saved) ? saved : "system";
	} catch (error) {
		console.error("Failed to load color scheme preference:", error);
		return "system";
	}
}

export async function setColorSchemePreference(
	preference: ColorSchemePreference,
) {
	colorScheme.set(preference);
	try {
		await AsyncStorage.setItem(STORAGE_KEY, preference);
	} catch (error) {
		console.error("Failed to save color scheme preference:", error);
	}
}

// Started at import time so the read overlaps with the rest of the JS startup
const initialPreference = getColorSchemePreference().then((preference) => {
	colorScheme.set(preference);
	return preference;
});

/**
 * Resolves once the saved preference has been applied. The root layout renders
 * nothing (splash screen stays up) until then, so the first frame already has
 * the right colors.
 */
export function useApplyColorSchemePreference() {
	const [applied, setApplied] = useState(false);
	useEffect(() => {
		initialPreference.finally(() => setApplied(true));
	}, []);
	return applied;
}
