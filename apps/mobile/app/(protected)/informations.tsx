import { Stack } from "expo-router";
import { LucideLoader2, SaveIcon } from "lucide-react-native";
import React, { useState } from "react";
import { Alert, ScrollView, View } from "react-native";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Text } from "@/components/ui/text";
import { useAuth } from "@/context/supabase-provider";
import { fetchApi } from "@/lib/api-handler";

export default function Informations() {
	const { user, session } = useAuth();

	const [formState, setFormState] = useState({
		firstName: user?.firstName || "",
		lastName: user?.lastName || "",
		email: user?.email || "",
	});
	const [newPassword, setNewPassword] = useState("");
	const [isLoading, setIsLoading] = useState(false);

	const handleChange = (field: string, value: string) => {
		setFormState({ ...formState, [field]: value });
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
					title: "Modifier ton profil",
					headerBackTitle: "Retour",
				}}
			/>
			<View className="flex-1 bg-background dark:bg-background-dark">
				{/* Form */}
				<ScrollView className="flex-1 p-4" showsVerticalScrollIndicator={false}>
					<View style={{ gap: 24 }}>
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
