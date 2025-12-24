// sign-up.tsx

import { zodResolver } from "@hookform/resolvers/zod";
import * as AppleAuthentication from "expo-apple-authentication";
import * as Haptics from "expo-haptics";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { ActivityIndicator, Platform, View } from "react-native";
import * as z from "zod";

import { SafeAreaView } from "@/components/safe-area-view";
import { Button } from "@/components/ui/button";
import { Form, FormField, FormInput } from "@/components/ui/form";
import { Text } from "@/components/ui/text";
import { H1 } from "@/components/ui/typography";
import { useAuth } from "@/context/supabase-provider";
import { GoogleIcon } from "@/lib/icons/google";
import { useColorScheme } from "@/lib/useColorScheme";

const formSchema = z
	.object({
		email: z.string().email("Please enter a valid email address."),
		password: z
			.string()
			.min(8, "Please enter at least 8 characters.")
			.max(64, "Please enter fewer than 64 characters.")
			.regex(
				/^(?=.*[a-z])/,
				"Your password must have at least one lowercase letter.",
			)
			.regex(
				/^(?=.*[A-Z])/,
				"Your password must have at least one uppercase letter.",
			)
			.regex(/^(?=.*[0-9])/, "Your password must have at least one number.")
			.regex(
				/^(?=.*[!@#$%^&*])/,
				"Your password must have at least one special character.",
			),
		confirmPassword: z.string().min(8, "Please enter at least 8 characters."),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "Your passwords do not match.",
		path: ["confirmPassword"],
	});

export default function SignUp() {
	const { signUp, signInWithGoogle, signInWithApple } = useAuth();
	const { isDarkColorScheme } = useColorScheme();

	const [isGoogleLoading, setIsGoogleLoading] = useState(false);
	const [isAppleLoading, setIsAppleLoading] = useState(false);
	const [isAppleAvailable, setIsAppleAvailable] = useState(false);

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			email: "",
			password: "",
			confirmPassword: "",
		},
	});

	useEffect(() => {
		const checkAppleAvailability = async () => {
			if (Platform.OS === "ios") {
				const available = await AppleAuthentication.isAvailableAsync();
				setIsAppleAvailable(available);
			}
		};
		checkAppleAvailability();
	}, []);

	async function onSubmit(data: z.infer<typeof formSchema>) {
		try {
			const result = await signUp(data.email, data.password);

			if (!result.error) {
				form.reset();
				// Navigation will happen via useEffect when session updates
				// Note: If email confirmation is required, session might be null
			}
		} catch (error: Error | any) {
			console.error(error.message);
		}
	}

	async function handleGoogleSignIn() {
		try {
			Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
			setIsGoogleLoading(true);
			const result = await signInWithGoogle();
			// Navigation will happen via useEffect when session updates
			if (result.error) {
				console.error("Google sign in error:", result.error);
			}
		} catch (error: Error | any) {
			console.error("Google sign in error:", error.message);
		} finally {
			setIsGoogleLoading(false);
		}
	}

	async function handleAppleSignIn() {
		try {
			Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
			setIsAppleLoading(true);
			const result = await signInWithApple();
			// Navigation will happen via useEffect when session updates
			if (result.error) {
				console.error("Apple sign in error:", result.error);
			}
		} catch (error: Error | any) {
			console.error("Apple sign in error:", error.message);
		} finally {
			setIsAppleLoading(false);
		}
	}

	return (
		<SafeAreaView
			className="flex-1 bg-background dark:bg-background-dark p-4"
			edges={["bottom"]}
		>
			<View className="flex-1 gap-4 web:m-4">
				<H1 className="self-start">Sign Up</H1>

				{/* Apple Sign Up Button - Only show on iOS when available */}
				{isAppleAvailable && (
					<View className="w-full">
						{isAppleLoading ? (
							<View className="h-11 items-center justify-center border border-border dark:border-border-dark rounded-lg">
								<ActivityIndicator size="small" />
							</View>
						) : (
							<AppleAuthentication.AppleAuthenticationButton
								buttonType={
									AppleAuthentication.AppleAuthenticationButtonType.SIGN_UP
								}
								buttonStyle={
									isDarkColorScheme
										? AppleAuthentication.AppleAuthenticationButtonStyle
												.WHITE_OUTLINE
										: AppleAuthentication.AppleAuthenticationButtonStyle.BLACK
								}
								cornerRadius={8}
								style={{ width: "100%", height: 44 }}
								onPress={handleAppleSignIn}
							/>
						)}
					</View>
				)}

				{/* Google Sign Up Button */}
				<Button
					size="default"
					variant="outline"
					onPress={handleGoogleSignIn}
					disabled={
						isGoogleLoading || isAppleLoading || form.formState.isSubmitting
					}
					className="flex-row items-center justify-center gap-2 rounded-lg"
				>
					{isGoogleLoading ? (
						<ActivityIndicator size="small" />
					) : (
						<>
							<GoogleIcon size={16} />
							<Text>Continue with Google</Text>
						</>
					)}
				</Button>

				<Form {...form}>
					<View className="gap-4">
						<FormField
							control={form.control}
							name="email"
							render={({ field }) => (
								<FormInput
									label="Email"
									placeholder="Email"
									autoCapitalize="none"
									autoComplete="email"
									autoCorrect={false}
									keyboardType="email-address"
									{...field}
								/>
							)}
						/>
						<FormField
							control={form.control}
							name="password"
							render={({ field }) => (
								<FormInput
									label="Password"
									placeholder="Password"
									autoCapitalize="none"
									autoCorrect={false}
									secureTextEntry
									{...field}
								/>
							)}
						/>
						<FormField
							control={form.control}
							name="confirmPassword"
							render={({ field }) => (
								<FormInput
									label="Confirm Password"
									placeholder="Confirm password"
									autoCapitalize="none"
									autoCorrect={false}
									secureTextEntry
									{...field}
								/>
							)}
						/>
					</View>
				</Form>
			</View>
			<Button
				size="default"
				variant="default"
				onPress={form.handleSubmit(onSubmit)}
				disabled={form.formState.isSubmitting || isGoogleLoading}
				className="web:m-4"
			>
				{form.formState.isSubmitting ? (
					<ActivityIndicator size="small" />
				) : (
					<Text>Sign Up</Text>
				)}
			</Button>
		</SafeAreaView>
	);
}
