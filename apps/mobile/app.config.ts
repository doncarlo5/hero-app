import { ConfigContext, ExpoConfig } from "expo/config";
import { ConfigPlugin, withEntitlementsPlist } from "expo/config-plugins";

// expo-notifications declares the push entitlement; the app only schedules local notifications (end of
// rest), which need none. Without it, a free Apple development profile can sign the app.
const withoutPushEntitlement: ConfigPlugin = (config) =>
	withEntitlementsPlist(config, (mod) => {
		delete mod.modResults["aps-environment"];
		return mod;
	});

const appConfig = ({ config }: ConfigContext): ExpoConfig => ({
	...config,
	name: "Hero App",
	slug: "hero-app",
	scheme: "hero-app",
	version: "2.0.0",
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
	},
	android: {
		adaptiveIcon: {
			foregroundImage: "./assets/adaptive-icon.png",
		},
		package: "com.doncarlos.heroapp",
	},
	experiments: {
		typedRoutes: true,
	},
	plugins: [
		"expo-router",
		"expo-secure-store",
		"expo-apple-authentication",
		// Local notifications only (end of rest): no push
		"expo-notifications",
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

export default (context: ConfigContext): ExpoConfig =>
	withoutPushEntitlement(appConfig(context));
