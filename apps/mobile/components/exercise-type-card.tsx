import { LucideInfo } from "lucide-react-native";
import { Pressable, View } from "react-native";

import { Text } from "@/components/ui/text";
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

	return (
		<Pressable
			onPress={() => props.onPress(props.movement)}
			className="flex flex-col border-2 border-double active:translate-y-0.5 rounded-lg border-border bg-background p-3"
		>
			<View className="flex flex-col justify-center px-3 py-2">
				<Text className="text-lg font-bold">{props.movement.name}</Text>
				{loadType && (
					<Text className="text-xs text-muted mt-1">{loadType}</Text>
				)}
				{props.movement.notes && (
					<>
						<View className="my-1 flex w-full rounded-full border border-border" />
						<View className="flex w-full flex-row items-center gap-1">
							<LucideInfo size={12} color={themeColors.mutedForeground} />
							<Text className="text-left text-xs text-muted" numberOfLines={2}>
								{props.movement.notes}
							</Text>
						</View>
					</>
				)}
			</View>
		</Pressable>
	);
}
