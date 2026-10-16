import { format } from "date-fns";
import { fr } from "date-fns/locale/fr";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { Button } from "heroui-native";
import { ChevronRight, PencilIcon } from "lucide-react-native";
import { ActivityIndicator, Pressable, SectionList, View } from "react-native";

import { MovementFrames } from "@/components/movement-frames";
import { MovementThumbnail } from "@/components/movement-thumbnail";
import { Text } from "@/components/ui/text";
import {
	equipmentLabel,
	isLibraryMovement,
	muscleLabel,
} from "@/lib/movement-library";
import { useMovementHistory } from "@/lib/queries/exercises";
import { useMovement } from "@/lib/queries/movements";
import {
	setsToArrays,
	type LoggedExerciseWithSession,
} from "@/lib/queries/types";
import { useThemeColors } from "@/lib/theme";

// One line per logged exercise: its working sets, "60×8 · 60×7" or "45 s · 40 s"
function setsSummary(exercise: LoggedExerciseWithSession, timed: boolean) {
	const { reps, weights } = setsToArrays(exercise.logged_sets);
	// Only warm-ups or finisher parts were logged (a session stopped early)
	if (reps.length === 0) {
		const others = exercise.logged_sets.length;
		if (others === 0) return "Aucune série";
		return `${others} série${others > 1 ? "s" : ""} hors séries de travail`;
	}
	// Bodyweight sets (0 kg) read "PDC"
	const load = (weight: number) => (weight > 0 ? `${weight}` : "PDC");
	return reps
		.map((count, i) =>
			timed
				? weights[i] > 0
					? `${weights[i]} kg · ${count} s`
					: `${count} s`
				: `${load(weights[i])}×${count}`,
		)
		.join("  ·  ");
}

// History grouped by month, newest first, ready for a SectionList
function byMonth(history: LoggedExerciseWithSession[]) {
	const sections: { title: string; data: LoggedExerciseWithSession[] }[] = [];
	for (const exercise of [...history].reverse()) {
		const date = new Date(
			exercise.sessions?.date_session ?? exercise.created_at,
		);
		const title = format(date, "LLLL yyyy", { locale: fr });
		const last = sections[sections.length - 1];
		if (last && last.title === title) last.data.push(exercise);
		else sections.push({ title, data: [exercise] });
	}
	return sections;
}

// A movement's sheet: how it is done (photos, muscles, equipment, instructions) and every time it was
// logged, by month. Library movements are read-only; the user's own can be edited.
export default function MovementSheet() {
	const { id } = useLocalSearchParams<{ id: string }>();
	const router = useRouter();
	const themeColors = useThemeColors();
	const movementQuery = useMovement(id, { enabled: true });
	const historyQuery = useMovementHistory(id);

	const movement = movementQuery.data ?? null;

	if (movementQuery.isLoading) {
		return (
			<View className="flex-1 items-center justify-center bg-background">
				<ActivityIndicator size="large" />
			</View>
		);
	}
	if (!movement) {
		// PGRST116: the row does not exist (deleted); anything else is a load failure worth retrying
		const notFound =
			(movementQuery.error as { code?: string } | null)?.code === "PGRST116";
		return (
			<View className="flex-1 items-center justify-center gap-4 bg-background p-6">
				<Text className="text-center text-muted">
					{notFound || !movementQuery.error
						? "Exercice introuvable."
						: "Impossible de charger l’exercice."}
				</Text>
				{movementQuery.error && !notFound && (
					<Button variant="secondary" onPress={() => movementQuery.refetch()}>
						<Button.Label>Réessayer</Button.Label>
					</Button>
				)}
			</View>
		);
	}

	const timed = movement.measure === "duration";
	const title = <Stack.Screen options={{ headerTitle: movement.name }} />;
	const muscles = movement.primary_muscles.map(muscleLabel).join(", ");
	const secondary = movement.secondary_muscles.map(muscleLabel).join(", ");
	const sections = byMonth(historyQuery.data ?? []);

	const header = (
		<View className="gap-4 pb-2">
			{movement.image_paths.length > 0 ? (
				<MovementFrames key={movement.id} movement={movement} />
			) : (
				<MovementThumbnail movement={movement} className="h-20 w-20" />
			)}
			<View className="gap-1">
				<Text className="text-2xl font-bold">{movement.name}</Text>
				{muscles !== "" && (
					<Text className="text-base text-foreground">{muscles}</Text>
				)}
				{secondary !== "" && (
					<Text className="text-sm text-muted">Aussi : {secondary}</Text>
				)}
				<Text className="text-sm text-muted">
					{[
						movement.equipment ? equipmentLabel(movement.equipment) : null,
						timed ? "se mesure en secondes" : null,
						movement.unilateral ? "un côté à la fois" : null,
					]
						.filter(Boolean)
						.join(" · ")}
				</Text>
			</View>

			{movement.notes && (
				<View className="rounded-xl bg-default p-3">
					<Text className="text-sm">{movement.notes}</Text>
				</View>
			)}

			{movement.instructions.length > 0 && (
				<View className="gap-2">
					<Text className="text-lg font-semibold">Exécution</Text>
					{movement.instructions.map((step, i) => (
						<View key={i} className="flex-row gap-2">
							<Text className="text-sm text-muted w-5">{i + 1}.</Text>
							<Text className="text-sm flex-1">{step}</Text>
						</View>
					))}
					{isLibraryMovement(movement) && (
						<Text className="text-xs text-muted">
							Consignes de free-exercise-db (en anglais).
						</Text>
					)}
				</View>
			)}

			{!isLibraryMovement(movement) && (
				<Button
					variant="secondary"
					onPress={() => router.push(`/exercise-type/${movement.id}`)}
				>
					<PencilIcon size={16} color={themeColors.foreground} />
					<Button.Label>Modifier l’exercice</Button.Label>
				</Button>
			)}

			<Text className="text-lg font-semibold mt-2">Historique</Text>
			{historyQuery.isLoading ? (
				<ActivityIndicator />
			) : sections.length === 0 ? (
				<Text className="text-sm text-muted">
					Pas encore fait. Il apparaîtra ici après ta première série.
				</Text>
			) : null}
		</View>
	);

	return (
		<>
			{title}
			<SectionList
				className="flex-1 bg-background"
				contentContainerClassName="p-4 pb-16"
				sections={sections}
				keyExtractor={(item) => item.id}
				ListHeaderComponent={header}
				stickySectionHeadersEnabled={false}
				renderSectionHeader={({ section }) => (
					<Text className="text-sm font-medium text-muted mt-4 mb-1 capitalize">
						{section.title}
					</Text>
				)}
				renderItem={({ item }) => (
					<Pressable
						disabled={!item.sessions}
						onPress={() =>
							item.sessions && router.push(`/session/${item.sessions.id}`)
						}
						accessibilityRole={item.sessions ? "button" : "text"}
						accessibilityLabel={`${format(
							new Date(item.sessions?.date_session ?? item.created_at),
							"EEEE d MMMM",
							{ locale: fr },
						)}, ${setsSummary(item, timed)}`}
						className="flex-row items-center gap-3 border-b border-border py-3"
					>
						<View className="flex-1">
							<Text className="text-sm text-muted">
								{format(
									new Date(item.sessions?.date_session ?? item.created_at),
									"EEEE d",
									{ locale: fr },
								)}
							</Text>
							<Text className="text-base">{setsSummary(item, timed)}</Text>
						</View>
						{item.sessions && (
							<ChevronRight size={18} color={themeColors.mutedForeground} />
						)}
					</Pressable>
				)}
			/>
		</>
	);
}
