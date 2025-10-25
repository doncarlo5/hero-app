import AsyncStorage from "@react-native-async-storage/async-storage";
import { Stack } from "expo-router";
import {
	LucideLoader2,
	Monitor,
	Moon,
	SaveIcon,
	Sun,
} from "lucide-react-native";
import React, { useEffect, useState } from "react";
import { Alert, Pressable, ScrollView, View } from "react-native";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Text } from "@/components/ui/text";
import { colors } from "@/constants/colors";
import { useAuth } from "@/context/supabase-provider";
import { fetchApi } from "@/lib/api-handler";
import { useColorScheme } from "@/lib/useColorScheme";

type ColorSchemePreference = "light" | "dark" | "system";

export default function Informations() {
	const { user, session } = useAuth();
	const { colorScheme, setColorScheme } = useColorScheme();

	const [formState, setFormState] = useState({
		firstName: user?.firstName || "",
		lastName: user?.lastName || "",
		email: user?.email || "",
	});
	const [newPassword, setNewPassword] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [colorSchemePreference, setColorSchemePreference] =
		useState<ColorSchemePreference>("system");

	// Load the user's preference on mount
	useEffect(() => {
		const loadPreference = async () => {
			try {
				const savedPreference = await AsyncStorage.getItem(
					"colorSchemePreference",
				);
				if (savedPreference) {
					setColorSchemePreference(savedPreference as ColorSchemePreference);
				}
			} catch (error) {
				console.error("Failed to load color scheme preference:", error);
			}
		};
		loadPreference();
	}, []);

	const handleChange = (field: string, value: string) => {
		setFormState({ ...formState, [field]: value });
	};

	const handleColorSchemeChange = async (preference: ColorSchemePreference) => {
		setColorSchemePreference(preference);
		setColorScheme(preference);

		try {
			await AsyncStorage.setItem("colorSchemePreference", preference);
		} catch (error) {
			console.error("Failed to save color scheme preference:", error);
		}
	};

	const handleSubmit = async () => {
		setIsLoading(true);
		try {
			const updateData: any = { ...formState };
			if (newPassword) {
				updateData.password = newPassword;
			}

			await fetchApi("/api/auth/settings", {
				method: "PATCH",
				body: JSON.stringify(updateData),
			});

			Alert.alert("Succès", "Profil mis à jour!");
			setNewPassword(""); // Clear password field after successful update
		} catch (error: any) {
			const errorMessage = error.message || "Une erreur est survenue!";
			Alert.alert("Erreur", errorMessage);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<>
			<Stack.Screen
				options={{
					headerShown: true,
					title: "Modifier mon profil",
					headerBackTitle: "Retour",
					headerStyle: {
						backgroundColor:
							colorScheme === "dark"
								? colors.dark.background
								: colors.light.background,
					},
					headerTintColor:
						colorScheme === "dark"
							? colors.dark.foreground
							: colors.light.foreground,
				}}
			/>
			<View className="flex-1">
				{/* Form */}
				<ScrollView className="flex-1 p-4" showsVerticalScrollIndicator={false}>
					<View style={{ gap: 24 }}>
						{/* Appearance Section */}
						<View style={{ gap: 8 }}>
							<Label>Apparence</Label>
							<View className="flex-row gap-2">
								<Pressable
									onPress={() => handleColorSchemeChange("light")}
									className={`flex-1 flex-row items-center justify-center gap-2 p-4 rounded-lg border-2 ${
										colorSchemePreference === "light"
											? "border-primary bg-primary/10"
											: "border-border dark:border-border-dark bg-muted/10 dark:bg-muted-dark/10"
									}`}
								>
									<Sun
										size={20}
										color={
											colorSchemePreference === "light" ? "#0891b2" : "#6b7280"
										}
									/>
									<Text
										className={
											colorSchemePreference === "light"
												? "font-semibold text-primary"
												: "text-muted-foreground dark:text-muted-foreground-dark"
										}
									>
										Clair
									</Text>
								</Pressable>

								<Pressable
									onPress={() => handleColorSchemeChange("dark")}
									className={`flex-1 flex-row items-center justify-center gap-2 p-4 rounded-lg border-2 ${
										colorSchemePreference === "dark"
											? "border-primary bg-primary/10"
											: "border-border dark:border-border-dark bg-muted/10 dark:bg-muted-dark/10"
									}`}
								>
									<Moon
										size={20}
										color={
											colorSchemePreference === "dark" ? "#0891b2" : "#6b7280"
										}
									/>
									<Text
										className={
											colorSchemePreference === "dark"
												? "font-semibold text-primary"
												: "text-muted-foreground dark:text-muted-foreground-dark"
										}
									>
										Sombre
									</Text>
								</Pressable>

								<Pressable
									onPress={() => handleColorSchemeChange("system")}
									className={`flex-1 flex-row items-center justify-center gap-2 p-4 rounded-lg border-2 ${
										colorSchemePreference === "system"
											? "border-primary bg-primary/10"
											: "border-border dark:border-border-dark bg-muted/10 dark:bg-muted-dark/10"
									}`}
								>
									<Monitor
										size={20}
										color={
											colorSchemePreference === "system" ? "#0891b2" : "#6b7280"
										}
									/>
									<Text
										className={
											colorSchemePreference === "system"
												? "font-semibold text-primary"
												: "text-muted-foreground dark:text-muted-foreground-dark"
										}
									>
										Auto
									</Text>
								</Pressable>
							</View>
						</View>

						{/* Divider */}
						<View className="h-px bg-border dark:bg-border-dark" />

						{/* First Name and Last Name */}
						<View className="flex-row" style={{ gap: 16 }}>
							<View className="flex-1" style={{ gap: 8 }}>
								<Label htmlFor="firstName">Prénom</Label>
								<Input
									id="firstName"
									placeholder="Prénom"
									value={formState.firstName}
									onChangeText={(value) => handleChange("firstName", value)}
								/>
							</View>
							<View className="flex-1" style={{ gap: 8 }}>
								<Label htmlFor="lastName">Nom</Label>
								<Input
									id="lastName"
									placeholder="Nom"
									value={formState.lastName}
									onChangeText={(value) => handleChange("lastName", value)}
								/>
							</View>
						</View>

						{/* Email */}
						<View style={{ gap: 8 }}>
							<Label htmlFor="email">Email</Label>
							<Input
								id="email"
								placeholder="Email"
								value={formState.email}
								onChangeText={(value) => handleChange("email", value)}
								keyboardType="email-address"
								autoCapitalize="none"
							/>
						</View>

						{/* Password (only for email users) */}
						{session?.user.app_metadata.provider === "email" && (
							<View style={{ gap: 8 }}>
								<Label htmlFor="password">Mot de passe</Label>
								<Input
									id="password"
									placeholder="Nouveau mot de passe"
									value={newPassword}
									onChangeText={setNewPassword}
									secureTextEntry
								/>
							</View>
						)}

						{/* Submit Button */}
						<Button
							onPress={handleSubmit}
							disabled={isLoading}
							className="flex-1 dark:bg-transparent flex-row items-center justify-center dark:bg-background-dark dark:text-foreground-dark"
							style={{ marginTop: 24 }}
						>
							{isLoading ? (
								<>
									<LucideLoader2 size={16} color="white" />
									<Text className="ml-2">
										{isLoading ? "Mise à jour..." : "Mettre à jour"}
									</Text>
								</>
							) : (
								<>
									<SaveIcon size={16} color="white" />
									<Text className="ml-2">Mettre à jour</Text>
								</>
							)}
						</Button>
					</View>
				</ScrollView>
			</View>
		</>
	);
}
