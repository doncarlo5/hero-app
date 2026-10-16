import { LucideInfo } from "lucide-react-native";
import { Pressable, View } from "react-native";

import { MovementThumbnail } from "@/components/movement-thumbnail";
import { Text } from "@/components/ui/text";
import { isLibraryMovement, muscleLabel } from "@/lib/movement-library";
import type { Movement } from "@/lib/queries/types";
import { useThemeColors } from "@/lib/theme";

const LOAD_TYPE_LABELS: Record<Movement["load_type"], string | null> = {
	external: null,
	bodyweight_plus: "Poids de corps + lest",
	assisted: "Assisté",
};

export default function MovementCard(props: {
	movement: Movement;
	onPress: (movement: Movement) => void;
}) {
	const themeColors = useThemeColors();
	const loadType = LOAD_TYPE_LABELS[props.movement.load_type];
	// Library movements: muscles; the user's: how the load is counted
	const subtitle = isLibraryMovement(props.movement)
		? props.movement.primary_muscles.map(muscleLabel).join(", ")
		: (loadType ?? "");

	return (
		<Pressable
			onPress={() => props.onPress(props.movement)}
			className="flex flex-col border-2 border-double active:translate-y-0.5 rounded-lg border-border bg-background p-3"
		>
			<View className="flex flex-row items-center gap-3 px-1 py-1">
				<MovementThumbnail movement={props.movement} className="h-14 w-14" />
				<View className="flex-1">
					<Text className="text-lg font-bold">{props.movement.name}</Text>
					{subtitle !== "" && (
						<Text className="text-xs text-muted mt-1">{subtitle}</Text>
					)}
				</View>
			</View>
			{props.movement.notes && (
				<View className="px-1">
					<View className="my-1 flex w-full rounded-full border border-border" />
					<View className="flex w-full flex-row items-center gap-1">
						<LucideInfo size={12} color={themeColors.mutedForeground} />
						<Text className="text-left text-xs text-muted" numberOfLines={2}>
							{props.movement.notes}
						</Text>
					</View>
				</View>
			)}
		</Pressable>
	);
}
