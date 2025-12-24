import { SplashScreen } from "expo-router";
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

import * as AppleAuthentication from "expo-apple-authentication";
import { makeRedirectUri } from "expo-auth-session";
import * as QueryParams from "expo-auth-session/build/QueryParams";
import * as Crypto from "expo-crypto";

SplashScreen.preventAutoHideAsync();

// Configure WebBrowser for OAuth
WebBrowser.maybeCompleteAuthSession();

type AuthState = {
	initialized: boolean;
	session: Session | null;
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
	signInWithApple: () => Promise<{ error: string | null }>;
	signOut: () => Promise<{ error: string | null }>;
};

export const AuthContext = createContext<AuthState>({
	initialized: false,
	session: null,
	authenticated: false,
	isLoading: true,
	signUp: async () => ({ error: null }),
	signIn: async () => ({ error: null }),
	signInWithGoogle: async () => ({ error: null }),
	signInWithApple: async () => ({ error: null }),
	signOut: async () => ({ error: null }),
});

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }: PropsWithChildren) {
	const [initialized, setInitialized] = useState(false);
	const [session, setSession] = useState<Session | null>(null);
	const [authenticated, setAuthenticated] = useState(false);
	const [isLoading, setIsLoading] = useState(true);

	const oauthRedirectUrl = makeRedirectUri({
		scheme: "hero-app",
		path: "auth",
	});

	const signUp = async (email: string, password: string) => {
		setIsLoading(true);
		const { data, error } = await supabase.auth.signUp({
			email,
			password,
			options: { emailRedirectTo: oauthRedirectUrl },
		});

		if (error) {
			console.error("Error signing up:", error);
			setIsLoading(false);
			return { error: error.message };
		}

		if (data.session) {
			setSession(data.session);
			setAuthenticated(true);
			return { error: null };
		}

		setIsLoading(false);
		return { error: null };
	};

	const signIn = async (email: string, password: string) => {
		setIsLoading(true);
		const { data, error } = await supabase.auth.signInWithPassword({
			email,
			password,
		});

		if (error) {
			console.error("Error signing in:", error);
			setIsLoading(false);
			return { error: error.message };
		}

		if (data.session) {
			setSession(data.session);
			setAuthenticated(true);
		}

		return { error: null };
	};

	const signInWithGoogle = async () => {
		setIsLoading(true);
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
				setIsLoading(false);
				return { error: error.message };
			}

			// Open the OAuth URL in the browser
			const result = await WebBrowser.openAuthSessionAsync(
				data.url,
				oauthRedirectUrl,
			);

			if (result.type === "success") {
				const { params: queryParams } = QueryParams.getQueryParams(result.url);

				if ("code" in queryParams) {
					const { error: exchangeError } =
						await supabase.auth.exchangeCodeForSession(
							String(queryParams.code),
						);
					if (exchangeError) {
						console.error("Error exchanging code for session:", exchangeError);
						setIsLoading(false);
						return { error: exchangeError.message };
					}
					return { error: null };
				}

				// Supabase may put tokens in the hash. Convert # → ? so QueryParams can read it.
				const fixedUrl = result.url.replace("#", "?");
				const { params: hashParams } = QueryParams.getQueryParams(fixedUrl);

				if ("access_token" in hashParams && "refresh_token" in hashParams) {
					await supabase.auth.setSession({
						access_token: String(hashParams.access_token),
						refresh_token: String(hashParams.refresh_token),
					}); // ✅ updates the onAuthStateChange listener
					return { error: null };
				}

				setIsLoading(false);
				return { error: "Missing OAuth code or tokens in redirect URL" };
			}

			setIsLoading(false);
			return { error: "OAuth sign-in was canceled or failed" };
		} catch (error) {
			console.error("Error signing in with Google:", error);
			setIsLoading(false);
			return {
				error:
					error instanceof Error ? error.message : "Unknown error occurred",
			};
		}
	};

	const signInWithApple = async () => {
		setIsLoading(true);
		try {
			const nonce = Math.random().toString(36).substring(2, 10);
			const hashedNonce = await Crypto.digestStringAsync(
				Crypto.CryptoDigestAlgorithm.SHA256,
				nonce,
			);

			const credential = await AppleAuthentication.signInAsync({
				requestedScopes: [
					AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
					AppleAuthentication.AppleAuthenticationScope.EMAIL,
				],
				nonce: hashedNonce,
			});

			const { error, data } = await supabase.auth.signInWithIdToken({
				provider: "apple",
				token: credential.identityToken!,
				nonce,
			});

			if (error) {
				console.error("Error signing in with Apple:", error);
				setIsLoading(false);
				return { error: error.message };
			}

			if (data.session) {
				setSession(data.session);
				setAuthenticated(true);
				return { error: null };
			}

			setIsLoading(false);
			return { error: null };
		} catch (error: any) {
			if (error.code === "ERR_REQUEST_CANCELED") {
				// User canceled the sign-in flow
				setIsLoading(false);
				return { error: "Sign in canceled" };
			}
			console.error("Error signing in with Apple:", error);
			setIsLoading(false);
			return {
				error:
					error instanceof Error ? error.message : "Unknown error occurred",
			};
		}
	};

	const signOut = async () => {
		try {
			setIsLoading(true);
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
		const {
			data: { subscription },
		} = supabase.auth.onAuthStateChange(async (event, session) => {
			// Handle token refresh failure
			if (event === ("TOKEN_REFRESH_FAILED" as any)) {
				setSession(null);
				setAuthenticated(false);
				// Force logout by clearing the session
				supabase.auth.signOut();
				return;
			}

			if (session) {
				setSession(session);
				setAuthenticated(true);
			} else {
				// not logged in
				setSession(null);
				setAuthenticated(false);
			}

			setIsLoading(false);
		});

		setInitialized(true);

		return () => {
			subscription?.unsubscribe();
		};
	}, []);

	useEffect(() => {
		if (initialized && !isLoading) {
			SplashScreen.hideAsync();
		}
	}, [initialized, isLoading]);

	const authContextValue = useMemo(
		() => ({
			initialized,
			session,
			authenticated,
			isLoading,
			signUp,
			signIn,
			signInWithGoogle,
			signInWithApple,
			signOut,
		}),
		[initialized, session, authenticated, isLoading],
	);

	return (
		<AuthContext.Provider value={authContextValue}>
			{children}
		</AuthContext.Provider>
	);
}
