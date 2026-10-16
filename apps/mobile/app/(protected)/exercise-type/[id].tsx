import { Host, Switch } from "@expo/ui";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Button, Input, TextArea } from "heroui-native";
import { Check, Trash2 } from "lucide-react-native";
import { useState } from "react";
import {
	ActivityIndicator,
	Alert,
	Pressable,
	ScrollView,
	View,
} from "react-native";

import { Text } from "@/components/ui/text";
import { useAuth } from "@/context/supabase-provider";
import {
	useCreateMovement,
	useDeleteMovement,
	useMovement,
	useUpdateMovement,
} from "@/lib/queries/movements";
import type { LoadType } from "@/lib/queries/types";
import { useThemeColors } from "@/lib/theme";
import { cn } from "@/lib/utils";

const LOAD_TYPES: { value: LoadType; label: string }[] = [
	{ value: "external", label: "Charge" },
	{ value: "bodyweight_plus", label: "Poids de corps + lest" },
	{ value: "assisted", label: "Assisté" },
];

type FormState = {
	name: string;
	notes: string;
	loadType: LoadType;
	increment: string;
	unilateral: boolean;
};

// A movement: how a load is moved, independent of any program. Prescriptions (sets, reps, rest) live
// in the program's slots.
export default function MovementDetail() {
	const { id } = useLocalSearchParams<{ id: string }>();
	const router = useRouter();
	const { session } = useAuth();
	const themeColors = useThemeColors();

	const isCreating = id === "new";
	const movementQuery = useMovement(id, { enabled: !isCreating });
	const createMovement = useCreateMovement();
	const updateMovement = useUpdateMovement();
	const deleteMovement = useDeleteMovement();
	const movement = movementQuery.data ?? null;
	const isLoading = !isCreating && movementQuery.isLoading;
	const isSaving = createMovement.isPending || updateMovement.isPending;
	// Library movements are shared and read-only
	const isReadOnly = Boolean(movement && movement.owner_id === null);

	const [formState, setFormState] = useState<FormState>({
		name: "",
		notes: "",
		loadType: "external",
		increment: "",
		unilateral: false,
	});

	// Fill the form from the loaded movement (again only if it actually changed)
	const [filledFrom, setFilledFrom] = useState<typeof movement>(null);
	if (movement && movement !== filledFrom) {
		setFilledFrom(movement);
		setFormState({
			name: movement.name,
			notes: movement.notes ?? "",
			loadType: movement.load_type,
			increment: movement.increment_kg?.toString() ?? "",
			unilateral: movement.unilateral,
		});
	}

	const handleSave = () => {
		if (formState.name.trim() === "") {
			Alert.alert("Erreur", "Le nom de l'exercice est obligatoire.");
			return;
		}
		const increment =
			formState.increment.trim() === ""
				? null
				: Number(formState.increment.replace(",", "."));
		if (increment !== null && (Number.isNaN(increment) || increment <= 0)) {
			Alert.alert("Erreur", "L'incrément doit être un nombre positif.");
			return;
		}
		if (isSaving) return;

		const changes = {
			name: formState.name.trim(),
			notes: formState.notes.trim() || null,
			load_type: formState.loadType,
			increment_kg: increment,
			unilateral: formState.unilateral,
		};

		if (isCreating) {
			if (!session) return;
			createMovement.mutate(
				{ ...changes, owner_id: session.user.id },
				{
					onSuccess: () => router.back(),
					onError: () =>
						Alert.alert("Erreur", "Impossible de créer l'exercice."),
				},
			);
			return;
		}

		if (!movement) return;
		updateMovement.mutate(
			{ id: movement.id, changes },
			{
				onSuccess: () => router.back(),
				onError: () =>
					Alert.alert("Erreur", "Impossible d'enregistrer l'exercice."),
			},
		);
	};

	const handleDelete = () => {
		if (!movement || isCreating) return;
		Alert.alert(
			"Supprimer l'exercice",
			"Son historique, ses trophées et sa place dans le programme seront supprimés aussi. Action irréversible.",
			[
				{ text: "Annuler", style: "cancel" },
				{
					text: "Supprimer",
					style: "destructive",
					onPress: () =>
						deleteMovement.mutate(movement.id, {
							onSuccess: () => router.back(),
							onError: () =>
								Alert.alert("Erreur", "Impossible de supprimer l'exercice."),
						}),
				},
			],
		);
	};

	if (isLoading) {
		return (
			<View className="flex-1 bg-background items-center justify-center">
				<ActivityIndicator size="large" />
			</View>
		);
	}

	if (!isCreating && !movement) {
		return (
			<View className="flex-1 bg-background items-center justify-center">
				<Text>Exercice introuvable</Text>
			</View>
		);
	}

	return (
		<View className="flex-1 bg-background">
			<ScrollView className="flex-1 p-4">
				{isCreating && (
					<View className="mb-6">
						<Text className="text-2xl font-bold mb-2">Nouvel exercice</Text>
						<Text className="text-sm text-muted">
							Les séries, répétitions et temps de repos se règlent dans le
							programme.
						</Text>
					</View>
				)}
				{isReadOnly && (
					<Text className="text-sm text-muted mb-4">
						Exercice de la bibliothèque : lecture seule.
					</Text>
				)}

				<View className="mb-4">
					<Text className="text-sm font-medium mb-2">Nom</Text>
					<Input
						value={formState.name}
						onChangeText={(name) => setFormState((prev) => ({ ...prev, name }))}
						placeholder="Développé incliné, barre"
						editable={!isReadOnly}
					/>
				</View>

				<View className="mb-4">
					<Text className="text-sm font-medium mb-2">Type de charge</Text>
					<View className="flex-row flex-wrap gap-2">
						{LOAD_TYPES.map((option) => (
							<Pressable
								key={option.value}
								disabled={isReadOnly}
								onPress={() =>
									setFormState((prev) => ({ ...prev, loadType: option.value }))
								}
								className={cn(
									"px-3 py-2 rounded-lg border",
									formState.loadType === option.value
										? "bg-foreground border-foreground"
										: "border-border bg-default/30",
								)}
							>
								<Text
									className={
										formState.loadType === option.value
											? "text-background font-medium"
											: "text-foreground"
									}
								>
									{option.label}
								</Text>
							</Pressable>
						))}
					</View>
				</View>

				<View className="mb-4">
					<Text className="text-sm font-medium mb-2">
						Incrément (kg){" "}
						<Text className="text-muted font-normal">
							plus petit palier à ta salle, 2,5 par défaut
						</Text>
					</Text>
					<Input
						value={formState.increment}
						onChangeText={(increment) =>
							setFormState((prev) => ({ ...prev, increment }))
						}
						placeholder="2.5"
						keyboardType="decimal-pad"
						editable={!isReadOnly}
					/>
				</View>

				<View className="mb-4 flex-row items-center justify-between">
					<Text className="text-sm font-medium">
						Unilatéral (un côté à la fois)
					</Text>
					<Host matchContents>
						<Switch
							value={formState.unilateral}
							onValueChange={(unilateral: boolean) =>
								!isReadOnly && setFormState((prev) => ({ ...prev, unilateral }))
							}
						/>
					</Host>
				</View>

				<View className="mb-24">
					<Text className="text-sm font-medium mb-2">Notes</Text>
					<TextArea
						value={formState.notes}
						onChangeText={(notes) =>
							setFormState((prev) => ({ ...prev, notes }))
						}
						placeholder="Réglages, consignes d'exécution…"
						editable={!isReadOnly}
					/>
				</View>
			</ScrollView>

			{!isReadOnly && (
				<View className="absolute bottom-8 left-4 right-4 flex-row gap-3">
					{!isCreating && (
						<Button
							variant="danger-soft"
							onPress={handleDelete}
							className="w-1/2"
						>
							<Trash2
								size={20}
								color={themeColors.destructive}
								strokeWidth={1.7}
							/>
							<Button.Label>Supprimer</Button.Label>
						</Button>
					)}
					<Button
						onPress={handleSave}
						isDisabled={isSaving}
						className={isCreating ? "w-full" : "w-1/2"}
					>
						{isSaving ? (
							<ActivityIndicator
								size="small"
								color={themeColors.accentForeground}
							/>
						) : (
							<>
								<Check
									color={themeColors.accentForeground}
									strokeWidth={1.7}
									size={20}
								/>
								<Button.Label>Enregistrer</Button.Label>
							</>
						)}
					</Button>
				</View>
			)}
		</View>
	);
}
