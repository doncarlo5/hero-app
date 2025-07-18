import { LucideClock4, LucideInfo } from "lucide-react-native";
import { Pressable, View } from "react-native";

import { Text } from "@/components/ui/text";
import { TypeSessionBadge } from "@/components/ui/type-session-badge";

interface ExerciseType {
	_id: string;
	name: string;
	type_session: string[];
	timer: number;
	advice?: string;
}

interface ExerciseTypeCardProps {
	exerciseType: ExerciseType;
	onPress: (exerciseType: ExerciseType) => void;
}

export default function ExerciseTypeCard({
	exerciseType,
	onPress,
}: ExerciseTypeCardProps) {
	return (
		<Pressable
			onPress={() => onPress(exerciseType)}
			className="flex flex-col border-2 border-double active:translate-y-0.5 rounded-lg border-border dark:border-border-dark bg-background dark:bg-background-dark p-3"
		>
			<View className="flex justify-between flex-row">
				<View className="flex flex-row items-center gap-1 flex-wrap">
					{exerciseType.type_session.map((session: string) => (
						<TypeSessionBadge key={session} type_session={session} />
					))}
				</View>
				<View className="flex flex-row items-center gap-1 rounded-sm rounded-tr-lg border px-2 border-border dark:border-border-dark">
					<Text>
						<LucideClock4
							size={13}
							className="text-gray-500 dark:text-gray-400"
						/>
					</Text>
					<Text className="text-sm font-medium">{exerciseType.timer}</Text>
				</View>
			</View>
			<View className="flex flex-col justify-center px-3 py-2">
				<Text className="text-lg font-bold">{exerciseType.name}</Text>
				{exerciseType?.advice && (
					<>
						<View className="my-1 flex w-full rounded-full border border-gray-200 dark:border-gray-800" />
						<View className="flex w-full flex-row items-center gap-1">
							<Text>
								<LucideInfo className="flex-none" size={12} />
							</Text>
							<Text className="truncate text-left text-xs text-gray-500 dark:text-gray-400">
								{exerciseType.advice}
							</Text>
						</View>
					</>
				)}
			</View>
		</Pressable>
	);
}
