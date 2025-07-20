import { SplashScreen, useRouter } from "expo-router";
import * as WebBrowser from "expo-web-browser";
import {
	createContext,
	PropsWithChildren,
	useContext,
	useEffect,
	useMemo,
	useState,
} from "react";

import { Session } from "@supabase/supabase-js";

import { supabase } from "@/config/supabase";
import { fetchApi } from "@/lib/api-handler";
import { UserType } from "@/types/user.type";

import { makeRedirectUri } from "expo-auth-session";
import * as QueryParams from "expo-auth-session/build/QueryParams";

SplashScreen.preventAutoHideAsync();

// Configure WebBrowser for OAuth
WebBrowser.maybeCompleteAuthSession();

type AuthState = {
	initialized: boolean;
	session: Session | null;
	user: UserType | null;
	setUser: (user: UserType | null) => void;
	authenticated: boolean;
	isLoading: boolean;
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
	user: null,
	setUser: () => {
		throw new Error("setUser used outside AuthProvider");
	},
	authenticated: false,
	isLoading: true,
	signUp: async () => ({ error: null }),
	signIn: async () => ({ error: null }),
	signInWithGoogle: async () => ({ error: null }),
	signOut: async () => ({ error: null }),
});

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }: PropsWithChildren) {
	const [initialized, setInitialized] = useState(false);
	const [session, setSession] = useState<Session | null>(null);
	const [user, setUser] = useState<UserType | null>(null);
	const [authenticated, setAuthenticated] = useState(false);
	const [isLoading, setIsLoading] = useState(true);
	const router = useRouter();

	const oauthRedirectUrl = makeRedirectUri({
		scheme: "com.doncarlos.heroapp",
		path: "auth",
	});

	const getSession = async () => {
		try {
			const {
				data: { session },
				error: _error,
			} = await supabase.auth.getSession();
			setSession(session);
			if (_error) throw _error;
			setAuthenticated(session !== null);
			if (session) {
				const response = await fetchApi("/api/auth/verify");
				setUser(response.user);
			} else {
				setUser(null);
			}
		} catch {
			setUser(null);
		} finally {
			setIsLoading(false);
		}
	};

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
			setAuthenticated(true);
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
			setAuthenticated(true);
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
		try {
			setIsLoading(true);
			setUser(null);
			setSession(null);
			const { error } = await supabase.auth.signOut();

			if (error) {
				console.error("Error signing out:", error);
				return { error: error.message };
			}

			setAuthenticated(false);
			return { error: null };
		} catch (error: any) {
			console.error(error);
			return { error: error.message };
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		getSession();

		const {
			data: { subscription },
		} = supabase.auth.onAuthStateChange(async (event, session) => {
			// Handle token refresh failure
			if (event === ("TOKEN_REFRESH_FAILED" as any)) {
				setSession(null);
				setUser(null);
				setAuthenticated(false);
				// Force logout by clearing the session
				supabase.auth.signOut();
				return;
			}

			if (session) {
				const response = await fetchApi("/api/auth/verify");
				setUser(response.user);
				setAuthenticated(session !== null);
			} else {
				setAuthenticated(false);
				setUser(null);
			}
			setSession(session);
		});

		setInitialized(true);

		return () => {
			subscription?.unsubscribe();
		};
	}, []);

	useEffect(() => {
		if (initialized && !isLoading) {
			SplashScreen.hideAsync();
			if (session) {
				router.replace("/");
			} else {
				router.replace("/welcome");
			}
		}
		// eslint-disable-next-line
	}, [initialized, isLoading, session]);

	const authContextValue = useMemo(
		() => ({
			initialized,
			session,
			user,
			setUser,
			authenticated,
			isLoading,
			signUp,
			signIn,
			signInWithGoogle,
			signOut,
		}),
		[initialized, session, user, authenticated, isLoading],
	);

	return (
		<AuthContext.Provider value={authContextValue}>
			{children}
		</AuthContext.Provider>
	);
}
