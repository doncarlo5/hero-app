import { LucideClock4, LucideInfo } from "lucide-react-native";
import { Pressable, View } from "react-native";

import { Text } from "@/components/ui/text";
import { TypeSessionBadge } from "@/components/ui/type-session-badge";
import type { ExerciseType } from "@/lib/queries/types";
import { useThemeColors } from "@/lib/theme";

interface ExerciseTypeCardProps {
	exerciseType: ExerciseType;
	onPress: (exerciseType: ExerciseType) => void;
}

export default function ExerciseTypeCard({
	exerciseType,
	onPress,
}: ExerciseTypeCardProps) {
	const themeColors = useThemeColors();

	return (
		<Pressable
			onPress={() => onPress(exerciseType)}
			className="flex flex-col border-2 border-double active:translate-y-0.5 rounded-lg border-border bg-background p-3"
		>
			<View className="flex justify-between flex-row">
				<View className="flex flex-row items-center gap-1 flex-wrap">
					{exerciseType.session_types.map((session) => (
						<TypeSessionBadge key={session} type_session={session} />
					))}
				</View>
				<View className="flex flex-row items-center gap-1 rounded-sm rounded-tr-lg border px-2 border-border">
					<Text>
						<LucideClock4 size={13} color={themeColors.mutedForeground} />
					</Text>
					<Text className="text-sm font-medium">
						{exerciseType.timer_seconds}
					</Text>
				</View>
			</View>
			<View className="flex flex-col justify-center px-3 py-2">
				<Text className="text-lg font-bold">{exerciseType.name}</Text>
				{exerciseType?.advice && (
					<>
						<View className="my-1 flex w-full rounded-full border border-border" />
						<View className="flex w-full flex-row items-center gap-1">
							<Text>
								<LucideInfo size={12} color={themeColors.mutedForeground} />
							</Text>
							<Text className="truncate text-left text-xs text-muted-foreground">
								{exerciseType.advice}
							</Text>
						</View>
					</>
				)}
			</View>
		</Pressable>
	);
}
