import { ConfigContext, ExpoConfig } from "expo/config";

export default ({ config }: ConfigContext): ExpoConfig => ({
	name: "Hero App",
	slug: "hero-app",
	scheme: "hero-app",
	version: "1.0.0",
	orientation: "portrait",
	icon: "./assets/icon.png",
	userInterfaceStyle: "automatic",
	assetBundlePatterns: ["**/*"],
	newArchEnabled: true,
	extra: {
		eas: {
			projectId: "ff46ca35-931b-4872-a88f-f59e62c4b189",
		},
	},
	ios: {
		supportsTablet: true,
		config: {
			usesNonExemptEncryption: false,
		},
		splash: {
			image: "./assets/splash.png",
			resizeMode: "cover",
			backgroundColor: "#ffffff",
			dark: {
				backgroundColor: "#000000",
				resizeMode: "cover",
				image: "./assets/splash-dark.png",
			},
		},
		icon: {
			dark: "./assets/icon-dark.png",
			light: "./assets/icon.png",
		},
		bundleIdentifier: "com.doncarlos.heroapp",
	},
	android: {
		edgeToEdgeEnabled: true,
		adaptiveIcon: {
			foregroundImage: "./assets/adaptive-icon.png",
		},
		splash: {
			image: "./assets/splash.png",
			resizeMode: "cover",
			backgroundColor: "#ffffff",
			dark: {
				backgroundColor: "#000000",
				resizeMode: "cover",
				image: "./assets/splash-dark.png",
			},
		},
		package: "com.doncarlos.heroapp",
	},
	experiments: {
		typedRoutes: true,
	},
	plugins: ["expo-router", "expo-secure-store"],
});
