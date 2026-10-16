import { Input } from "heroui-native";
import { useState } from "react";
import { Pressable, View } from "react-native";

import { MovementThumbnail } from "@/components/movement-thumbnail";
import { Text } from "@/components/ui/text";
import {
	equipmentLabel,
	isLibraryMovement,
	matchesMovementSearch,
	muscleLabel,
} from "@/lib/movement-library";
import type { Movement } from "@/lib/queries/types";
import { cn } from "@/lib/utils";

const MIN_LIBRARY_QUERY = 2;
const MAX_LIBRARY_RESULTS = 50;

function MovementRow(props: {
	movement: Movement;
	isSelected: boolean;
	onPress: (movement: Movement) => void;
}) {
	const details = [
		...props.movement.primary_muscles.map(muscleLabel),
		props.movement.equipment ? equipmentLabel(props.movement.equipment) : null,
		props.movement.measure === "duration" ? "durée" : null,
	]
		.filter(Boolean)
		.join(" · ");

	return (
		<Pressable onPress={() => props.onPress(props.movement)}>
			<View
				className={cn(
					"flex-row items-center gap-3 rounded-lg p-2",
					props.isSelected && "bg-default",
				)}
			>
				<MovementThumbnail movement={props.movement} className="h-10 w-10" />
				<View className="flex-1">
					<Text
						className={cn(
							"text-foreground",
							props.isSelected && "font-semibold",
						)}
					>
						{props.movement.name}
					</Text>
					{details !== "" && (
						<Text className="text-xs text-muted">{details}</Text>
					)}
				</View>
			</View>
		</Pressable>
	);
}

// Searchable movement list for bottom sheets: an optional pinned group (the day's movements), the
// user's movements, then the library, which is only listed once the search narrows it down.
export function MovementPicker(props: {
	movements: Movement[];
	selectedId: string | null;
	onPick: (movement: Movement) => void;
	pinned?: { title: string; movements: Movement[] };
}) {
	const [query, setQuery] = useState("");

	const pinnedIds = new Set((props.pinned?.movements ?? []).map((m) => m.id));
	const matches = props.movements.filter(
		(m) => !pinnedIds.has(m.id) && matchesMovementSearch(m, query),
	);
	const pinned = (props.pinned?.movements ?? []).filter((m) =>
		matchesMovementSearch(m, query),
	);
	const own = matches.filter((m) => !isLibraryMovement(m));
	const libraryCount = props.movements.filter(isLibraryMovement).length;
	const isSearchingLibrary = query.trim().length >= MIN_LIBRARY_QUERY;
	const library = isSearchingLibrary
		? matches.filter(isLibraryMovement).slice(0, MAX_LIBRARY_RESULTS)
		: [];

	const renderRow = (m: Movement) => (
		<MovementRow
			key={m.id}
			movement={m}
			isSelected={m.id === props.selectedId}
			onPress={props.onPick}
		/>
	);

	return (
		<View className="gap-4">
			<Input
				value={query}
				onChangeText={setQuery}
				placeholder="Rechercher un exercice"
				autoCorrect={false}
				autoCapitalize="none"
				clearButtonMode="while-editing"
			/>
			{props.pinned && pinned.length > 0 && (
				<View>
					<Text className="text-xl font-bold mb-2">{props.pinned.title}</Text>
					{pinned.map(renderRow)}
				</View>
			)}
			{own.length > 0 && (
				<View>
					<Text className="text-xl font-bold mb-2">Mes exercices</Text>
					{own.map(renderRow)}
				</View>
			)}
			{libraryCount > 0 && (
				<View>
					<Text className="text-xl font-bold mb-2">Bibliothèque</Text>
					{!isSearchingLibrary ? (
						<Text className="text-sm text-muted">
							Recherche parmi {libraryCount} exercices (nom, muscle, matériel).
						</Text>
					) : library.length === 0 ? (
						<Text className="text-sm text-muted">Aucun résultat.</Text>
					) : (
						library.map(renderRow)
					)}
				</View>
			)}
		</View>
	);
}
