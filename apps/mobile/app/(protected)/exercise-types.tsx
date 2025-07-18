import { useRouter } from "expo-router";
import { PlusIcon } from "lucide-react-native";
import { useEffect, useState } from "react";
import { Pressable, ScrollView, View } from "react-native";

import ExerciseTypeCard from "@/components/exercise-type-card";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { fetchApi } from "@/lib/api-handler";

interface ExerciseType {
	_id: string;
	name: string;
	type_session: string[];
	timer: number;
	advice?: string;
}

export default function ExerciseTypes() {
	const [exerciseTypes, setExerciseTypes] = useState<ExerciseType[]>([]);
	const [filteredExerciseTypes, setFilteredExerciseTypes] = useState<
		ExerciseType[]
	>([]);
	const [currentFilter, setCurrentFilter] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState(true);
	const router = useRouter();

	const fetchTypes = async () => {
		try {
			const response = await fetchApi(
				"/api/exercise-type?limit=1000&sort=-updatedAt",
			);
			setExerciseTypes(response);
			setFilteredExerciseTypes(response);
		} catch (error: any) {
			console.error("Fetch error: ", error);
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		fetchTypes();
	}, []);

	const handleFilter = (typeSession: string | null) => {
		setCurrentFilter(typeSession);
		setFilteredExerciseTypes(
			typeSession
				? exerciseTypes.filter((type) =>
						type.type_session.includes(typeSession),
					)
				: exerciseTypes,
		);
	};

	const handleExerciseTypePress = (exerciseType: ExerciseType) => {
		router.push(`/exercise-type/${exerciseType._id}`);
	};

	const handleCreateExercise = () => {
		router.push("/exercise-type/new");
	};

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
					<View className="flex flex-col items-center space-y-2">
						{Array(5)
							.fill(0)
							.map((_, index) => (
								<View
									key={index}
									className="h-20 w-full rounded-lg bg-gray-200 dark:bg-gray-800"
								/>
							))}
					</View>
				) : (
					<View className="flex flex-col gap-4">
						{filteredExerciseTypes.map((exerciseType: ExerciseType) => (
							<ExerciseTypeCard
								exerciseType={exerciseType}
								key={exerciseType._id}
								onPress={handleExerciseTypePress}
							/>
						))}
					</View>
				)}
			</ScrollView>
		</View>
	);
}
