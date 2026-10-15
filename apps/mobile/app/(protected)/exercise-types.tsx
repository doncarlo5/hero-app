import { useRouter } from "expo-router";
import { PlusIcon } from "lucide-react-native";
import { Pressable, ScrollView, View } from "react-native";

import ExerciseTypeCard from "@/components/exercise-type-card";
import { Button } from "heroui-native";
import { Text } from "@/components/ui/text";
import { useExerciseTypes } from "@/lib/queries/exercise-types";
import type { ExerciseType } from "@/lib/queries/types";
import { useThemeColors } from "@/lib/theme";

export default function ExerciseTypes() {
	const exerciseTypesQuery = useExerciseTypes();
	const router = useRouter();
	const themeColors = useThemeColors();

	const exerciseTypes = exerciseTypesQuery.data ?? [];
	const isLoading = exerciseTypesQuery.isLoading;

	const handleExerciseTypePress = (exerciseType: ExerciseType) => {
		router.push(`/exercise-type/${exerciseType.id}`);
	};

	const handleCreateExercise = () => {
		router.push("/exercise-type/new");
	};

	if (exerciseTypesQuery.error && !exerciseTypesQuery.data) {
		return (
			<View className="flex-1 items-center justify-center bg-background p-4">
				<Text className="text-sm text-muted mb-4">
					Impossible de charger les exercices.
				</Text>
				<Button onPress={() => exerciseTypesQuery.refetch()}>Réessayer</Button>
			</View>
		);
	}

	if (!isLoading && exerciseTypes.length === 0) {
		return (
			<View className="flex-1 bg-background">
				<View className="flex-1 items-center justify-center p-4">
					<View className="flex flex-col items-center gap-4">
						<Text className="text-sm text-muted">Aucun exercice.</Text>
						<Button onPress={handleCreateExercise} className="w-full">
							Créer un exercice
						</Button>
					</View>
				</View>
			</View>
		);
	}

	return (
		<View className="flex-1 bg-background">
			<ScrollView className="flex-1 p-4">
				<Pressable
					onPress={handleCreateExercise}
					className="flex h-14 w-full flex-row items-center justify-center gap-1 rounded-lg border-2 border-border border-dotted bg-default mb-4"
				>
					<PlusIcon size={20} color={themeColors.foreground} />
					<Text>Créer un exercice</Text>
				</Pressable>

				{/* Exercise Types List */}
				{isLoading ? (
					<View className="flex flex-col items-center gap-2">
						{Array(5)
							.fill(0)
							.map((_, index) => (
								<View
									key={index}
									className="h-32 w-full rounded-lg bg-default"
								/>
							))}
					</View>
				) : (
					<View className="flex flex-col gap-4">
						{exerciseTypes.map((exerciseType) => (
							<ExerciseTypeCard
								exerciseType={exerciseType}
								key={exerciseType.id}
								onPress={handleExerciseTypePress}
							/>
						))}
					</View>
				)}
			</ScrollView>
		</View>
	);
}
