import { ConfigContext, ExpoConfig } from "expo/config";

export default ({ config }: ConfigContext): ExpoConfig => ({
	...config,
	name: "Hero App",
	slug: "hero-app",
	scheme: "hero-app",
	version: "1.1.0",
	orientation: "portrait",
	icon: "./assets/icon.png",
	userInterfaceStyle: "automatic",
	assetBundlePatterns: ["**/*"],
	extra: {
		...(config as any)?.expo?.extra,
		EXPO_ROUTER_APP_ROOT: "./app",
		eas: { projectId: "1371c346-ed81-4421-832c-0d023859973d" },
	},
	ios: {
		supportsTablet: true,
		usesAppleSignIn: true,
		config: {
			usesNonExemptEncryption: false,
		},
		icon: {
			dark: "./assets/icon-dark.png",
			light: "./assets/icon.png",
		},
		bundleIdentifier: "com.doncarlos.heroapp-mobile",
		entitlements: {
			"com.apple.developer.applesignin": ["Default"],
		},
		buildNumber: "5",
	},
	android: {
		adaptiveIcon: {
			foregroundImage: "./assets/adaptive-icon.png",
		},
		package: "com.doncarlos.heroapp",
		versionCode: 5,
	},
	experiments: {
		typedRoutes: true,
	},
	plugins: [
		"expo-router",
		"expo-secure-store",
		"expo-apple-authentication",
		[
			"expo-splash-screen",
			{
				image: "./assets/splash.png",
				resizeMode: "cover",
				backgroundColor: "#ffffff",
				dark: {
					image: "./assets/splash-dark.png",
					backgroundColor: "#000000",
				},
			},
		],
	],
});
