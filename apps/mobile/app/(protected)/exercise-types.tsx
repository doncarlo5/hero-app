import { useRouter } from "expo-router";
import { Button, Input } from "heroui-native";
import { PlusIcon } from "lucide-react-native";
import { useState } from "react";
import { Pressable, SectionList, View } from "react-native";

import MovementCard from "@/components/exercise-type-card";
import { Text } from "@/components/ui/text";
import {
	isLibraryMovement,
	matchesMovementSearch,
} from "@/lib/movement-library";
import { useMovements } from "@/lib/queries/movements";
import type { Movement } from "@/lib/queries/types";
import { useThemeColors } from "@/lib/theme";

export default function ExerciseTypes() {
	const exerciseTypesQuery = useMovements();
	const router = useRouter();
	const themeColors = useThemeColors();
	const [query, setQuery] = useState("");

	const exerciseTypes = exerciseTypesQuery.data ?? [];
	const isLoading = exerciseTypesQuery.isLoading;
	const matches = exerciseTypes.filter((m) => matchesMovementSearch(m, query));
	const sections = [
		{
			title: "Mes exercices",
			data: matches.filter((m) => !isLibraryMovement(m)),
		},
		{ title: "Bibliothèque", data: matches.filter(isLibraryMovement) },
	].filter((section) => section.data.length > 0);

	const handleExerciseTypePress = (exerciseType: Movement) => {
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
			<SectionList
				sections={isLoading ? [] : sections}
				keyExtractor={(item) => item.id}
				keyboardShouldPersistTaps="handled"
				keyboardDismissMode="on-drag"
				stickySectionHeadersEnabled={false}
				contentContainerStyle={{ padding: 16 }}
				ListHeaderComponent={
					<View className="gap-4 mb-2">
						<Pressable
							onPress={handleCreateExercise}
							className="flex h-14 w-full flex-row items-center justify-center gap-1 rounded-lg border-2 border-border border-dotted bg-default"
						>
							<PlusIcon size={20} color={themeColors.foreground} />
							<Text>Créer un exercice</Text>
						</Pressable>
						<Input
							value={query}
							onChangeText={setQuery}
							placeholder="Rechercher (nom, muscle, matériel)"
							autoCorrect={false}
							autoCapitalize="none"
							clearButtonMode="while-editing"
						/>
						{isLoading &&
							Array(5)
								.fill(0)
								.map((_, index) => (
									<View
										key={index}
										className="h-24 w-full rounded-lg bg-default"
									/>
								))}
					</View>
				}
				renderSectionHeader={(info) => (
					<Text className="text-xl font-bold mt-4 mb-2">
						{info.section.title} ({info.section.data.length})
					</Text>
				)}
				renderItem={(info) => (
					<View className="mb-3">
						<MovementCard
							movement={info.item}
							onPress={handleExerciseTypePress}
						/>
					</View>
				)}
				ListEmptyComponent={
					isLoading ? null : (
						<Text className="text-sm text-muted mt-4">Aucun résultat.</Text>
					)
				}
			/>
		</View>
	);
}
