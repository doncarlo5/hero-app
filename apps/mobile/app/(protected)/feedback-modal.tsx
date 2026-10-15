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

import { Button } from "heroui-native";
import { Text } from "@/components/ui/text";
import { useAuth } from "@/context/supabase-provider";
import { useSendFeedback } from "@/lib/queries/feedback";
import { useThemeColors } from "@/lib/theme";
import { useColorScheme } from "@/lib/useColorScheme";

interface FeedbackModalProps {
	visible: boolean;
	onClose: () => void;
}

export default function FeedbackModal({
	visible,
	onClose,
}: FeedbackModalProps) {
	const { session } = useAuth();
	const sendFeedback = useSendFeedback();
	const { isDarkColorScheme } = useColorScheme();
	const themeColors = useThemeColors();
	const [formState, setFormState] = useState({ subject: "", message: "" });
	const [error, setError] = useState<string | null>(null);
	const loading = sendFeedback.isPending;

	const handleFeedbackSubmit = () => {
		setError(null);
		if (!formState.subject || !formState.message) {
			setError("Veuillez remplir tous les champs.");
			return;
		}
		if (!session || loading) return;

		sendFeedback.mutate(
			{
				ownerId: session.user.id,
				subject: formState.subject,
				message: formState.message,
			},
			{
				onSuccess: () =>
					Alert.alert("Feedback envoyé!", "Merci pour votre contribution.", [
						{
							text: "OK",
							onPress: () => {
								setFormState({ subject: "", message: "" });
								onClose();
							},
						},
					]),
				// The draft is kept so the user can retry
				onError: (mutationError) => setError(mutationError.message),
			},
		);
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
					className="bg-overlay rounded-2xl p-4 w-11/12"
					style={{ maxHeight: "80%" }}
				>
					<View className="flex-row justify-between items-center mb-4">
						<Text className="text-lg font-semibold text-foreground">
							Feedback
						</Text>
						<Pressable onPress={onClose}>
							<X size={24} color={themeColors.foreground} />
						</Pressable>
					</View>

					<Text className="text-sm text-muted mb-4">
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
									className="border border-border rounded-md p-3 bg-background text-foreground"
									placeholderTextColor={themeColors.mutedForeground}
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
									className="border border-border rounded-md p-3 bg-background text-foreground"
									placeholderTextColor={themeColors.mutedForeground}
									textAlignVertical="top"
								/>
							</View>

							<View className="flex-row flex-wrap gap-2 mb-4">
								<Pressable
									onPress={() => addToMessage("Bug")}
									className="px-4 py-2 bg-default rounded-md border border-border"
								>
									<Text className="text-foreground">+ Bug</Text>
								</Pressable>
								<Pressable
									onPress={() => addToMessage("Feature")}
									className="px-4 py-2 bg-default rounded-md border border-border"
								>
									<Text className="text-foreground">+ Feature</Text>
								</Pressable>
								<Pressable
									onPress={() => addToMessage("Séance")}
									className="px-4 py-2 bg-default rounded-md border border-border"
								>
									<Text className="text-foreground">+ Séance</Text>
								</Pressable>
								<Pressable
									onPress={() => addToMessage("Design")}
									className="px-4 py-2 bg-default rounded-md border border-border"
								>
									<Text className="text-foreground">+ Design</Text>
								</Pressable>
							</View>

							<Button onPress={handleFeedbackSubmit} isDisabled={loading}>
								<Send size={16} color={themeColors.accentForeground} />
								<Button.Label>
									{loading ? "Envoi en cours..." : "Envoyer"}
								</Button.Label>
							</Button>
						</ScrollView>
					</View>
				</View>
			</View>
		</Modal>
	);
}
