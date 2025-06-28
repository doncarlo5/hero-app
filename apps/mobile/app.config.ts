import { ConfigContext, ExpoConfig } from "expo/config";

export default ({ config }: ConfigContext): ExpoConfig => ({
	name: "Hero App",
	slug: "hero-app-mobile",
	scheme: "hero-app-mobile",
	version: "1.0.0",
	orientation: "portrait",
	icon: "./assets/icon.png",
	userInterfaceStyle: "automatic",
	assetBundlePatterns: ["**/*"],
	newArchEnabled: true,
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
		bundleIdentifier: "co.selego.hero-app-mobile",
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
		package: "co.selego.hero-app-mobile",
	},
	experiments: {
		typedRoutes: true,
	},
	plugins: ["expo-router", "expo-secure-store"],
});
