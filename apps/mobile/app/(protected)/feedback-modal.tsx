import { Send, X } from "lucide-react-native";
import { useState } from "react";
import {
	Alert,
	Modal,
	Pressable,
	ScrollView,
	TextInput,
	View,
} from "react-native";

import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { useAuth } from "@/context/supabase-provider";
import { fetchApi } from "@/lib/api-handler";
import { useColorScheme } from "@/lib/useColorScheme";

interface FeedbackModalProps {
	visible: boolean;
	onClose: () => void;
}

export default function FeedbackModal({
	visible,
	onClose,
}: FeedbackModalProps) {
	const { user } = useAuth();
	const { isDarkColorScheme } = useColorScheme();
	const [formState, setFormState] = useState({ subject: "", message: "" });
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const handleFeedbackSubmit = async () => {
		setLoading(true);
		setError(null);

		try {
			if (!formState.subject || !formState.message) {
				throw new Error("Veuillez remplir tous les champs.");
			}

			await fetchApi("/api/feedbacks", {
				method: "POST",
				body: JSON.stringify({
					userId: user?._id || null,
					subject: formState.subject,
					message: formState.message,
				}),
			});

			Alert.alert("Feedback envoyé!", "Merci pour votre contribution.", [
				{
					text: "OK",
					onPress: () => {
						setFormState({ subject: "", message: "" });
						onClose();
					},
				},
			]);
		} catch (error: any) {
			setError(error.message);
			console.error(error.message);
		} finally {
			setLoading(false);
		}
	};

	const addToMessage = (text: string) => {
		setFormState({
			...formState,
			message: formState.message + "\n• " + text + ": ",
		});
	};

	return (
		<Modal
			animationType="fade"
			transparent={true}
			visible={visible}
			onRequestClose={onClose}
		>
			<View className="flex-1 justify-center items-center bg-black/50">
				<View
					className="bg-background dark:bg-background-dark rounded-2xl p-4 w-11/12"
					style={{ maxHeight: "80%" }}
				>
					<View className="flex-row justify-between items-center mb-4">
						<Text className="text-lg font-semibold text-foreground dark:text-foreground-dark">
							Feedback
						</Text>
						<Pressable onPress={onClose}>
							<X size={24} color={isDarkColorScheme ? "#ffffff" : "#000000"} />
						</Pressable>
					</View>

					<Text className="text-sm text-gray-600 dark:text-gray-400 mb-4">
						Décrivez votre expérience de l&apos;application.
					</Text>

					<View style={{ height: 400 }}>
						<ScrollView
							showsVerticalScrollIndicator={true}
							contentContainerStyle={{ paddingBottom: 20 }}
						>
							{error && (
								<Text className="text-sm text-red-500 mb-2">{error}</Text>
							)}

							<View className="mb-4">
								<Text className="text-sm font-medium mb-2">Sujet</Text>
								<TextInput
									value={formState.subject}
									onChangeText={(text) =>
										setFormState({ ...formState, subject: text })
									}
									placeholder="Entrez le sujet"
									className="border border-border dark:border-border-dark rounded-md p-3 bg-background dark:bg-background-dark text-foreground dark:text-foreground-dark"
									placeholderTextColor="#6B7280"
								/>
							</View>

							<View className="mb-4">
								<Text className="text-sm font-medium mb-2">Message</Text>
								<TextInput
									value={formState.message}
									onChangeText={(text) =>
										setFormState({ ...formState, message: text })
									}
									placeholder="Décrivez votre feedback..."
									multiline
									numberOfLines={4}
									className="border border-border dark:border-border-dark rounded-md p-3 bg-background dark:bg-background-dark text-foreground dark:text-foreground-dark"
									placeholderTextColor="#6B7280"
									textAlignVertical="top"
								/>
							</View>

							<View className="flex-row flex-wrap gap-2 mb-4">
								<Pressable
									onPress={() => addToMessage("Bug")}
									className="px-4 py-2 bg-muted dark:bg-muted-dark rounded-md border border-border dark:border-border-dark"
								>
									<Text className="text-primary dark:text-primary-dark">
										+ Bug
									</Text>
								</Pressable>
								<Pressable
									onPress={() => addToMessage("Feature")}
									className="px-4 py-2 bg-muted dark:bg-muted-dark rounded-md border border-border dark:border-border-dark"
								>
									<Text className="text-primary dark:text-primary-dark">
										+ Feature
									</Text>
								</Pressable>
								<Pressable
									onPress={() => addToMessage("Séance")}
									className="px-4 py-2 bg-muted dark:bg-muted-dark rounded-md border border-border dark:border-border-dark"
								>
									<Text className="text-primary dark:text-primary-dark">
										+ Séance
									</Text>
								</Pressable>
								<Pressable
									onPress={() => addToMessage("Design")}
									className="px-4 py-2 bg-muted dark:bg-muted-dark rounded-md border border-border dark:border-border-dark"
								>
									<Text className="text-primary dark:text-primary-dark">
										+ Design
									</Text>
								</Pressable>
							</View>

							<Button
								variant="default"
								onPress={handleFeedbackSubmit}
								disabled={loading}
								className="flex-row items-center gap-2"
							>
								<Send
									size={16}
									color={isDarkColorScheme ? "#000000" : "#ffffff"}
								/>
								<Text className="text-primary-foreground dark:text-primary-foreground-dark">
									{loading ? "Envoi en cours..." : "Envoyer"}
								</Text>
							</Button>
						</ScrollView>
					</View>
				</View>
			</View>
		</Modal>
	);
}
