// sign-up.tsx

import { zodResolver } from "@hookform/resolvers/zod";
import * as AppleAuthentication from "expo-apple-authentication";
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
import { AppleIcon } from "@/lib/icons/apple";
import { GoogleIcon } from "@/lib/icons/google";

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
			await signUp(data.email, data.password);

			form.reset();
		} catch (error: Error | any) {
			console.error(error.message);
		}
	}

	async function handleGoogleSignIn() {
		try {
			setIsGoogleLoading(true);
			await signInWithGoogle();
		} catch (error: Error | any) {
			console.error("Google sign in error:", error.message);
		} finally {
			setIsGoogleLoading(false);
		}
	}

	async function handleAppleSignIn() {
		try {
			setIsAppleLoading(true);
			await signInWithApple();
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
					<Button
						size="default"
						variant="outline"
						onPress={handleAppleSignIn}
						disabled={
							isAppleLoading || isGoogleLoading || form.formState.isSubmitting
						}
						className="flex-row items-center justify-center gap-2"
					>
						{isAppleLoading ? (
							<ActivityIndicator size="small" />
						) : (
							<>
								<AppleIcon size={16} />
								<Text>Continue with Apple</Text>
							</>
						)}
					</Button>
				)}

				{/* Google Sign Up Button */}
				<Button
					size="default"
					variant="outline"
					onPress={handleGoogleSignIn}
					disabled={
						isGoogleLoading || isAppleLoading || form.formState.isSubmitting
					}
					className="flex-row items-center justify-center gap-2"
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
