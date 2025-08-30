import { ConfigContext, ExpoConfig } from "expo/config";

export default ({ config }: ConfigContext): ExpoConfig => ({
	...config,
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
		...(config as any)?.expo?.extra,
		apiUrl: process.env.EXPO_PUBLIC_API_URL,
		eas: {
			projectId: "d832f74d-83c2-4d98-aa11-bdf11856d5f8",
		},
		EXPO_ROUTER_APP_ROOT: "./app",
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
		buildNumber: "2",
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
