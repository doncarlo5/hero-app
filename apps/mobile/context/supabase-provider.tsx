import * as Linking from "expo-linking";
import { SplashScreen, useRouter } from "expo-router";
import * as WebBrowser from "expo-web-browser";
import {
	createContext,
	PropsWithChildren,
	useContext,
	useEffect,
	useState,
} from "react";

import { Session } from "@supabase/supabase-js";

import { supabase } from "@/config/supabase";

SplashScreen.preventAutoHideAsync();

// Configure WebBrowser for OAuth
WebBrowser.maybeCompleteAuthSession();

type AuthState = {
	initialized: boolean;
	session: Session | null;
	signUp: (email: string, password: string) => Promise<void>;
	signIn: (email: string, password: string) => Promise<void>;
	signInWithGoogle: () => Promise<void>;
	signOut: () => Promise<void>;
};

export const AuthContext = createContext<AuthState>({
	initialized: false,
	session: null,
	signUp: async () => {},
	signIn: async () => {},
	signInWithGoogle: async () => {},
	signOut: async () => {},
});

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }: PropsWithChildren) {
	const [initialized, setInitialized] = useState(false);
	const [session, setSession] = useState<Session | null>(null);
	const router = useRouter();

	const signUp = async (email: string, password: string) => {
		const { data, error } = await supabase.auth.signUp({
			email,
			password,
		});

		if (error) {
			console.error("Error signing up:", error);
			return;
		}

		if (data.session) {
			setSession(data.session);
			console.log("User signed up:", data.user);
		} else {
			console.log("No user returned from sign up");
		}
	};

	const signIn = async (email: string, password: string) => {
		const { data, error } = await supabase.auth.signInWithPassword({
			email,
			password,
		});

		if (error) {
			console.error("Error signing in:", error);
			return;
		}

		if (data.session) {
			setSession(data.session);
			console.log("User signed in:", data.user);
		} else {
			console.log("No user returned from sign in");
		}
	};

	const signInWithGoogle = async () => {
		try {
			// Create a more specific redirect URL for mobile
			const redirectUrl = Linking.createURL("auth");
			console.log("Mobile redirect URL:", redirectUrl);

			const { data, error } = await supabase.auth.signInWithOAuth({
				provider: "google",
				options: {
					redirectTo: redirectUrl,
					queryParams: {
						access_type: "offline",
						prompt: "consent",
					},
				},
			});

			if (error) {
				console.error("Error creating OAuth URL:", error);
				throw error;
			}

			console.log("Opening OAuth URL:", data.url);

			// Open the OAuth URL in the browser
			const result = await WebBrowser.openAuthSessionAsync(
				data.url,
				redirectUrl,
			);

			console.log("OAuth result:", result);

			if (result.type === "success") {
				console.log("OAuth completed successfully, processing result...");

				// Extract tokens from the result URL
				const url = result.url;
				if (url.includes("access_token=")) {
					console.log("Found access token in URL, processing...");

					// Let Supabase handle the session automatically
					// The onAuthStateChange listener will catch the session change
					setTimeout(async () => {
						const {
							data: { session },
						} = await supabase.auth.getSession();
						if (session) {
							console.log("Google sign in successful:", session.user);
							setSession(session);
						}
					}, 1000);
				}
			} else if (result.type === "cancel") {
				console.log("User cancelled Google sign in");
			} else {
				console.log("OAuth result type:", result.type);
			}
		} catch (error) {
			console.error("Error signing in with Google:", error);
			throw error;
		}
	};

	const signOut = async () => {
		const { error } = await supabase.auth.signOut();

		if (error) {
			console.error("Error signing out:", error);
			return;
		} else {
			console.log("User signed out");
		}
	};

	useEffect(() => {
		supabase.auth.getSession().then(({ data: { session } }) => {
			setSession(session);
		});

		const {
			data: { subscription },
		} = supabase.auth.onAuthStateChange((_event, session) => {
			setSession(session);
		});

		// Handle deep links for OAuth callback
		const handleDeepLink = async (url: string) => {
			console.log("Deep link received:", url);

			// Handle OAuth redirects
			if (
				url &&
				(url.includes("#access_token=") || url.includes("?access_token="))
			) {
				console.log("Processing OAuth callback from deep link");

				try {
					// Let Supabase automatically handle the session from the URL
					const { data, error } = await supabase.auth.getSession();
					if (data.session) {
						console.log(
							"Session established from deep link:",
							data.session.user,
						);
						setSession(data.session);
					} else if (error) {
						console.error("Error processing OAuth callback:", error);
					}
				} catch (error) {
					console.error("Error handling deep link OAuth:", error);
				}
			}
		};

		// Listen for deep links
		const linkingListener = Linking.addEventListener("url", ({ url }) => {
			handleDeepLink(url);
		});

		setInitialized(true);

		return () => {
			subscription?.unsubscribe();
			linkingListener?.remove();
		};
	}, []);

	useEffect(() => {
		if (initialized) {
			SplashScreen.hideAsync();
			if (session) {
				router.replace("/");
			} else {
				router.replace("/welcome");
			}
		}
		// eslint-disable-next-line
	}, [initialized, session]);

	return (
		<AuthContext.Provider
			value={{
				initialized,
				session,
				signUp,
				signIn,
				signInWithGoogle,
				signOut,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
}
