import { useRouter } from "expo-router";
import { PlusIcon } from "lucide-react-native";
import { Pressable, ScrollView, View } from "react-native";

import ExerciseTypeCard from "@/components/exercise-type-card";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { useExerciseTypes } from "@/lib/queries/exercise-types";
import type { ExerciseType } from "@/lib/queries/types";

export default function ExerciseTypes() {
	const exerciseTypesQuery = useExerciseTypes();
	const router = useRouter();

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
			<View className="flex-1 items-center justify-center bg-background dark:bg-background-dark p-4">
				<Text className="text-sm text-gray-500 dark:text-gray-400 mb-4">
					Impossible de charger les exercices.
				</Text>
				<Button onPress={() => exerciseTypesQuery.refetch()}>Réessayer</Button>
			</View>
		);
	}

	if (!isLoading && exerciseTypes.length === 0) {
		return (
			<View className="flex-1 bg-background dark:bg-background-dark">
				<View className="flex-1 items-center justify-center p-4">
					<View className="flex flex-col items-center gap-4">
						<Text className="text-sm text-gray-500 dark:text-gray-400">
							Aucun exercice.
						</Text>
						<Button onPress={handleCreateExercise} className="w-full">
							Créer un exercice
						</Button>
					</View>
				</View>
			</View>
		);
	}

	return (
		<View className="flex-1 bg-background dark:bg-background-dark">
			<ScrollView className="flex-1 p-4">
				<Pressable
					onPress={handleCreateExercise}
					className="flex h-14 w-full flex-row items-center justify-center gap-1 rounded-lg border-2 border-gray-200 dark:border-gray-800 border-dotted bg-slate-50 dark:bg-slate-900 text-gray-600 dark:text-gray-400 mb-4"
				>
					<PlusIcon className="size-5" />
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
									className="h-32 w-full rounded-lg bg-gray-200 dark:bg-gray-800"
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
