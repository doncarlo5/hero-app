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

import { Button, Input, Label } from "heroui-native";
import { Text } from "@/components/ui/text";
import { useAuth } from "@/context/supabase-provider";
import { useProfile, useUpdateProfile } from "@/lib/queries/profile";
import {
	type ColorSchemePreference,
	getColorSchemePreference,
	setColorSchemePreference,
} from "@/lib/color-scheme-preference";
import { useThemeColors } from "@/lib/theme";

export default function Informations() {
	const { session } = useAuth();
	const profile = useProfile();
	const updateProfile = useUpdateProfile();
	const themeColors = useThemeColors();

	const [formState, setFormState] = useState({
		firstName: "",
		lastName: "",
		email: "",
	});
	const [newPassword, setNewPassword] = useState("");
	const isLoading = updateProfile.isPending;

	// Fill the form once the profile is loaded (again only if it actually changed)
	const [filledFrom, setFilledFrom] = useState<typeof profile.data>(undefined);
	if (profile.data && profile.data !== filledFrom) {
		setFilledFrom(profile.data);
		setFormState({
			firstName: profile.data.first_name ?? "",
			lastName: profile.data.last_name ?? "",
			email: profile.data.email ?? session?.user.email ?? "",
		});
	}
	const [colorSchemePreference, setPreference] =
		useState<ColorSchemePreference>("system");

	useEffect(() => {
		getColorSchemePreference().then(setPreference);
	}, []);

	const handleChange = (field: string, value: string) => {
		setFormState({ ...formState, [field]: value });
	};

	const handleColorSchemeChange = (preference: ColorSchemePreference) => {
		setPreference(preference);
		setColorSchemePreference(preference);
	};

	const handleSubmit = () => {
		if (!profile.data || isLoading) return;
		updateProfile.mutate(
			{
				id: profile.data.id,
				firstName: formState.firstName,
				lastName: formState.lastName,
				email: formState.email,
				currentEmail: session?.user.email ?? null,
				password: newPassword,
			},
			{
				onSuccess: (result) => {
					Alert.alert(
						"Succès",
						result.emailChangePending
							? "Profil mis à jour ! Confirme ta nouvelle adresse depuis l'email reçu."
							: "Profil mis à jour !",
					);
					setNewPassword("");
				},
				onError: (error) =>
					Alert.alert("Erreur", error.message || "Une erreur est survenue!"),
			},
		);
	};

	return (
		<>
			<Stack.Screen
				options={{
					headerShown: true,
					title: "Modifier mon profil",
					headerBackTitle: "Retour",
					headerShadowVisible: true,
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
											? "border-foreground bg-foreground/10"
											: "border-border bg-default/10"
									}`}
								>
									<Sun
										size={20}
										color={
											colorSchemePreference === "light"
												? themeColors.primary
												: themeColors.mutedForeground
										}
									/>
									<Text
										className={
											colorSchemePreference === "light"
												? "font-semibold text-foreground"
												: "text-muted"
										}
									>
										Clair
									</Text>
								</Pressable>

								<Pressable
									onPress={() => handleColorSchemeChange("dark")}
									className={`flex-1 flex-row items-center justify-center gap-2 p-4 rounded-lg border-2 ${
										colorSchemePreference === "dark"
											? "border-foreground bg-foreground/10"
											: "border-border bg-default/10"
									}`}
								>
									<Moon
										size={20}
										color={
											colorSchemePreference === "dark"
												? themeColors.primary
												: themeColors.mutedForeground
										}
									/>
									<Text
										className={
											colorSchemePreference === "dark"
												? "font-semibold text-foreground"
												: "text-muted"
										}
									>
										Sombre
									</Text>
								</Pressable>

								<Pressable
									onPress={() => handleColorSchemeChange("system")}
									className={`flex-1 flex-row items-center justify-center gap-2 p-4 rounded-lg border-2 ${
										colorSchemePreference === "system"
											? "border-foreground bg-foreground/10"
											: "border-border bg-default/10"
									}`}
								>
									<Monitor
										size={20}
										color={
											colorSchemePreference === "system"
												? themeColors.primary
												: themeColors.mutedForeground
										}
									/>
									<Text
										className={
											colorSchemePreference === "system"
												? "font-semibold text-foreground"
												: "text-muted"
										}
									>
										Auto
									</Text>
								</Pressable>
							</View>
						</View>

						{/* Divider */}
						<View className="h-px bg-separator" />

						{/* First Name and Last Name */}
						<View className="flex-row" style={{ gap: 16 }}>
							<View className="flex-1" style={{ gap: 8 }}>
								<Label>Prénom</Label>
								<Input
									id="firstName"
									placeholder="Prénom"
									value={formState.firstName}
									onChangeText={(value) => handleChange("firstName", value)}
								/>
							</View>
							<View className="flex-1" style={{ gap: 8 }}>
								<Label>Nom</Label>
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
							<Label>Email</Label>
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
								<Label>Mot de passe</Label>
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
							isDisabled={isLoading}
							className="flex-1"
							style={{ marginTop: 24 }}
						>
							{isLoading ? (
								<>
									<LucideLoader2
										size={16}
										color={themeColors.accentForeground}
									/>
									<Button.Label>
										{isLoading ? "Mise à jour..." : "Mettre à jour"}
									</Button.Label>
								</>
							) : (
								<>
									<SaveIcon size={16} color={themeColors.accentForeground} />
									<Button.Label>Mettre à jour</Button.Label>
								</>
							)}
						</Button>
					</View>
				</ScrollView>
			</View>
		</>
	);
}
