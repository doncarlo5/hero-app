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

import { makeRedirectUri } from "expo-auth-session";
import * as QueryParams from "expo-auth-session/build/QueryParams";

SplashScreen.preventAutoHideAsync();

// Configure WebBrowser for OAuth
WebBrowser.maybeCompleteAuthSession();

type AuthState = {
	initialized: boolean;
	session: Session | null;
	signUp: (
		email: string,
		password: string,
	) => Promise<{ error: string | null }>;
	signIn: (
		email: string,
		password: string,
	) => Promise<{ error: string | null }>;
	signInWithGoogle: () => Promise<{ error: string | null }>;
	signOut: () => Promise<{ error: string | null }>;
};

export const AuthContext = createContext<AuthState>({
	initialized: false,
	session: null,
	signUp: async () => ({ error: null }),
	signIn: async () => ({ error: null }),
	signInWithGoogle: async () => ({ error: null }),
	signOut: async () => ({ error: null }),
});

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }: PropsWithChildren) {
	const [initialized, setInitialized] = useState(false);
	const [session, setSession] = useState<Session | null>(null);
	const router = useRouter();

	const oauthRedirectUrl = makeRedirectUri({
		scheme: "com.doncarlos.heroapp",
		path: "auth",
	});

	const signUp = async (email: string, password: string) => {
		const { data, error } = await supabase.auth.signUp({
			email,
			password,
			options: { emailRedirectTo: oauthRedirectUrl },
		});

		if (error) {
			console.error("Error signing up:", error);
			return { error: error.message };
		}

		if (data.session) {
			setSession(data.session);
		}

		return { error: null };
	};

	const signIn = async (email: string, password: string) => {
		const { data, error } = await supabase.auth.signInWithPassword({
			email,
			password,
		});

		if (error) {
			console.error("Error signing in:", error);
			return { error: error.message };
		}

		if (data.session) {
			setSession(data.session);
		}

		return { error: null };
	};

	const signInWithGoogle = async () => {
		try {
			const { data, error } = await supabase.auth.signInWithOAuth({
				provider: "google",
				options: {
					redirectTo: oauthRedirectUrl,
					skipBrowserRedirect: true,
					queryParams: {
						access_type: "offline",
						prompt: "consent",
					},
				},
			});

			if (error) {
				console.error("Error creating OAuth URL:", error);
				return { error: error.message };
			}

			// Open the OAuth URL in the browser
			const result = await WebBrowser.openAuthSessionAsync(
				data.url,
				oauthRedirectUrl,
			);

			if (result.type === "success") {
				// Supabase puts tokens in the hash. Convert # → ? so QueryParams can read it.
				const fixedUrl = result.url.replace("#", "?");
				const { params } = QueryParams.getQueryParams(fixedUrl);

				if ("access_token" in params && "refresh_token" in params) {
					await supabase.auth.setSession({
						access_token: params.access_token,
						refresh_token: params.refresh_token,
					}); // ✅ updates the onAuthStateChange listener
				}
			}

			return { error: null };
		} catch (error) {
			console.error("Error signing in with Google:", error);
			return {
				error:
					error instanceof Error ? error.message : "Unknown error occurred",
			};
		}
	};

	const signOut = async () => {
		const { error } = await supabase.auth.signOut();

		if (error) {
			console.error("Error signing out:", error);
			return { error: error.message };
		}

		return { error: null };
	};

	useEffect(() => {
		supabase.auth.getSession().then(({ data: { session } }) => {
			setSession(session);
		});

		const {
			data: { subscription },
		} = supabase.auth.onAuthStateChange((event, session) => {
			// Handle token refresh failure
			if (event === ("TOKEN_REFRESH_FAILED" as any)) {
				setSession(null);
				// Force logout by clearing the session
				supabase.auth.signOut();
				return;
			}

			setSession(session);
		});

		setInitialized(true);

		return () => {
			subscription?.unsubscribe();
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
