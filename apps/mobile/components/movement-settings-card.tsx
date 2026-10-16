import { Host, Switch } from "@expo/ui";
import { Input } from "heroui-native";
import { useState } from "react";
import { Alert, View } from "react-native";

import { Text } from "@/components/ui/text";
import { errorMessage } from "@/lib/errors";
import type { MovementSetting } from "@/lib/movement-settings";
import { DEFAULT_INCREMENT } from "@/lib/progression/engine";
import { useSaveMovementSetting } from "@/lib/queries/movements";
import type { Movement } from "@/lib/queries/types";

// "2,5" and "2.5" are both accepted; empty means the default step
function parseIncrement(value: string): number | null | "invalid" {
	const trimmed = value.trim().replace(",", ".");
	if (trimmed === "") return null;
	const parsed = Number(trimmed);
	return Number.isFinite(parsed) && parsed > 0 && parsed <= 50
		? parsed
		: "invalid";
}

// A library movement is shared and read-only: how the user does it (one side at a time) and the load
// step they progress by are their own settings, saved as they change
export function MovementSettingsCard(props: {
	movement: Movement;
	setting: MovementSetting | null;
}) {
	const saveSetting = useSaveMovementSetting();
	const [increment, setIncrement] = useState(
		props.setting?.increment_kg?.toString().replace(".", ",") ?? "",
	);

	const unilateral = props.setting?.unilateral ?? props.movement.unilateral;
	const libraryIncrement = props.movement.increment_kg ?? DEFAULT_INCREMENT;

	const save = (next: Omit<MovementSetting, "movement_id">) =>
		saveSetting.mutate(
			{ movement_id: props.movement.id, ...next },
			{
				onError: (error) =>
					Alert.alert(
						"Erreur",
						errorMessage(error, "Impossible d’enregistrer le réglage."),
					),
			},
		);

	const saveIncrement = () => {
		const parsed = parseIncrement(increment);
		if (parsed === "invalid") {
			Alert.alert("Palier de charge", "Entre un nombre entre 0 et 50 kg.");
			return;
		}
		if (parsed === (props.setting?.increment_kg ?? null)) return;
		save({
			unilateral: props.setting?.unilateral ?? null,
			increment_kg: parsed,
		});
	};

	return (
		<View className="gap-4 rounded-xl bg-default p-4">
			<Text className="text-lg font-semibold">Mes réglages</Text>
			<View className="flex-row items-center justify-between gap-4">
				<View className="flex-1">
					<Text className="text-base">Un côté à la fois</Text>
					<Text className="text-sm text-muted">
						La séance guidée enchaîne gauche puis droite.
					</Text>
				</View>
				<Host matchContents>
					<Switch
						value={unilateral}
						onValueChange={(value: boolean) =>
							save({
								// Back to the library value: no setting
								unilateral: value === props.movement.unilateral ? null : value,
								increment_kg: props.setting?.increment_kg ?? null,
							})
						}
					/>
				</Host>
			</View>
			<View className="flex-row items-center justify-between gap-4">
				<View className="flex-1">
					<Text className="text-base">Palier de charge (kg)</Text>
					<Text className="text-sm text-muted">
						Ce qui s’ajoute quand l’objectif monte. Vide :{" "}
						{libraryIncrement.toString().replace(".", ",")} kg.
					</Text>
				</View>
				<Input
					className="w-20 text-center"
					value={increment}
					onChangeText={setIncrement}
					onBlur={saveIncrement}
					onSubmitEditing={saveIncrement}
					placeholder={libraryIncrement.toString().replace(".", ",")}
					keyboardType="decimal-pad"
					returnKeyType="done"
					accessibilityLabel="Palier de charge en kilos"
				/>
			</View>
		</View>
	);
}
