import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { format } from "date-fns";
import { AlignJustifyIcon, LucideLoader2 } from "lucide-react-native";
import React, { useRef, useState } from "react";
import {
	ActivityIndicator,
	Dimensions,
	Pressable,
	ScrollView,
	View,
} from "react-native";
import {
	VictoryArea,
	VictoryAxis,
	VictoryChart,
	VictoryGroup,
	VictoryLegend,
	VictoryTheme,
} from "victory-native";

import { SafeAreaView } from "@/components/safe-area-view";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { useExerciseHistory } from "@/lib/queries/exercises";
import { useExerciseTypes } from "@/lib/queries/exercise-types";
import { setsToArrays, type ExerciseType } from "@/lib/queries/types";
import { useThemeColors } from "@/lib/theme";

const { width } = Dimensions.get("window");

// Snap points for the exercise picker (large lists)
const SNAP_POINTS = ["50%", "90%"];

export default function Stats() {
	const themeColors = useThemeColors();
	const bottomSheetRef = useRef<BottomSheet>(null);
	const exerciseTypesQuery = useExerciseTypes();
	const [pickedTypeId, setPickedTypeId] = useState<string | null>(null);

	const allExerciseTypes = exerciseTypesQuery.data ?? [];
	const isLoadingTypes = exerciseTypesQuery.isLoading;
	// Default to the most recently edited exercise type
	const selectedExerciseType =
		allExerciseTypes.find((type) => type.id === pickedTypeId) ??
		allExerciseTypes[0] ??
		null;

	const historyQuery = useExerciseHistory(selectedExerciseType?.id ?? null);
	const isLoading = isLoadingTypes || historyQuery.isLoading;
	// One entry per recorded exercise, sets as arrays ordered by set_order
	const exercise = (historyQuery.data ?? [])
		.filter((item) => item.sessions)
		.map((item) => ({
			date: item.sessions?.date_session as string,
			weight: setsToArrays(item.exercise_sets).weights,
		}));

	const openBottomSheet = () => {
		bottomSheetRef.current?.snapToIndex(1); // Snap to 90% for maximum scrolling space
	};

	const closeBottomSheet = () => {
		bottomSheetRef.current?.close();
	};

	const onExerciseTypeChange = (exerciseType: ExerciseType) => {
		setPickedTypeId(exerciseType.id);
	};

	const formatXAxis = (tickFormat: string) => {
		const formattedDate = format(new Date(tickFormat), "dd/MM/yyyy");
		return formattedDate;
	};

	// Prepare data for Victory charts
	const chartData = exercise.map((exerciseItem) => ({
		x: new Date(exerciseItem.date),
		y1: exerciseItem.weight[0] || 0,
		y2: exerciseItem.weight[1] || 0,
		y3: exerciseItem.weight[2] || 0,
		y4: exerciseItem.weight[3] || 0,
	}));

	// Calculate domain for Y axis
	const allWeights = exercise
		.flatMap((item) => item.weight)
		.filter((w) => w > 0);
	const minWeight = allWeights.length > 0 ? Math.min(...allWeights) : 0;
	const maxWeight = allWeights.length > 0 ? Math.max(...allWeights) : 100;
	const yDomain: [number, number] = [
		Math.floor(minWeight / 10) * 10 - 10,
		Math.ceil(maxWeight / 10) * 10 + 10,
	];

	return (
		<SafeAreaView className="flex-1 bg-background" edges={["bottom"]}>
			<ScrollView className="flex-1 px-4 pt-4">
				{/* Exercise Type Selection */}
				<View className="mb-4">
					{isLoadingTypes ? (
						<View className="bg-muted/30 rounded-lg p-4">
							<ActivityIndicator size="small" />
						</View>
					) : allExerciseTypes.length === 0 ? (
						<View className="bg-muted/30 rounded-lg p-4">
							<Text className="text-muted-foreground text-center">
								Aucun exercice disponible.
							</Text>
						</View>
					) : (
						<Button
							onPress={openBottomSheet}
							variant="ghost"
							className="flex-row w-full h-20 items-center bg-muted rounded-md justify-between p-4"
						>
							<Text className="text-foreground">
								{selectedExerciseType
									? selectedExerciseType.name
									: "Sélectionne un exercice"}
							</Text>
							<AlignJustifyIcon
								size={20}
								color={themeColors.foreground}
								strokeWidth={1.5}
							/>
						</Button>
					)}
				</View>

				{/* Loading State */}
				{isLoading && (
					<View className="flex-1 items-center justify-center py-20">
						<LucideLoader2
							className="animate-spin"
							size={32}
							color={themeColors.mutedForeground}
						/>
						<Text className="mt-4 text-sm text-muted-foreground">
							Chargement...
						</Text>
					</View>
				)}

				{/* Chart */}
				{!isLoading && exercise.length > 0 && (
					<View className="bg-slate-50 dark:bg-slate-900/40 rounded-2xl p-4 mb-5">
						<Text className="text-lg font-semibold text-center mb-4 text-foreground">
							Évolution des charges (kg)
						</Text>

						<VictoryChart
							width={width - 48}
							height={300}
							theme={VictoryTheme.material}
							domainPadding={{ x: 20 }}
							padding={{ top: 40, bottom: 60, left: 60, right: 40 }}
						>
							<VictoryAxis
								tickFormat={(t) => formatXAxis(t)}
								style={{
									axis: { stroke: themeColors.border },
									grid: { stroke: themeColors.border },
									ticks: { stroke: themeColors.border },
									tickLabels: {
										fontSize: 10,
										angle: -45,
										fill: themeColors.mutedForeground,
									},
								}}
							/>
							<VictoryAxis
								dependentAxis
								domain={yDomain}
								label="Charge (kg)"
								style={{
									axis: { stroke: themeColors.border },
									grid: { stroke: themeColors.border },
									ticks: { stroke: themeColors.border },
									axisLabel: {
										padding: 35,
										fontSize: 12,
										fill: themeColors.mutedForeground,
									},
									tickLabels: {
										fontSize: 10,
										fill: themeColors.mutedForeground,
									},
								}}
							/>

							<VictoryGroup>
								<VictoryArea
									data={chartData}
									x="x"
									y="y1"
									style={{
										data: {
											fill: "rgba(172, 56, 178, 0.3)",
											stroke: "#AC38B2",
											strokeWidth: 2,
										},
									}}
								/>
								<VictoryArea
									data={chartData}
									x="x"
									y="y2"
									style={{
										data: {
											fill: "rgba(178, 172, 56, 0.3)",
											stroke: "#B2AC38",
											strokeWidth: 2,
										},
									}}
								/>
								<VictoryArea
									data={chartData}
									x="x"
									y="y3"
									style={{
										data: {
											fill: "rgba(56, 178, 172, 0.3)",
											stroke: "#38B2AC",
											strokeWidth: 2,
										},
									}}
								/>
								{selectedExerciseType?.rep_range_4 && (
									<VictoryArea
										data={chartData}
										x="x"
										y="y4"
										style={{
											data: {
												fill: "rgba(178, 56, 172, 0.3)",
												stroke: "#B238AC",
												strokeWidth: 2,
											},
										}}
									/>
								)}
							</VictoryGroup>

							<VictoryLegend
								x={width - 200}
								y={50}
								orientation="vertical"
								gutter={20}
								style={{
									border: { stroke: themeColors.border },
									title: { fontSize: 20 },
									labels: { fill: themeColors.foreground },
								}}
								data={[
									{ name: "Série 1", symbol: { fill: "#AC38B2" } },
									{ name: "Série 2", symbol: { fill: "#B2AC38" } },
									{ name: "Série 3", symbol: { fill: "#38B2AC" } },
									...(selectedExerciseType?.rep_range_4
										? [{ name: "Série 4", symbol: { fill: "#B238AC" } }]
										: []),
								]}
							/>
						</VictoryChart>
					</View>
				)}

				{/* No Data State */}
				{exercise.length === 0 && !isLoading && (
					<View className=" text-center">
						<Text className="text-muted-foreground">
							Aucun historique disponible sur cet exercice.
						</Text>
					</View>
				)}

				{/* Stats Summary */}
				{!isLoading && exercise.length > 0 && (
					<View className="bg-slate-50 dark:bg-slate-900/40 rounded-2xl p-4 mb-20">
						<Text className="text-lg font-semibold mb-4 text-foreground">
							Résumé
						</Text>

						<View className="flex-row justify-between">
							<View className="items-center">
								<Text className="text-2xl font-bold text-foreground">
									{exercise.length}
								</Text>
								<Text className="text-sm text-muted-foreground">Séances</Text>
							</View>

							<View className="items-center">
								<Text className="text-2xl font-bold text-foreground">
									{maxWeight}
								</Text>
								<Text className="text-sm text-muted-foreground">Max (kg)</Text>
							</View>

							<View className="items-center">
								<Text className="text-2xl font-bold text-foreground">
									{minWeight}
								</Text>
								<Text className="text-sm text-muted-foreground">Min (kg)</Text>
							</View>
						</View>
					</View>
				)}
			</ScrollView>

			{/* Exercise Picker BottomSheet */}
			<BottomSheet
				ref={bottomSheetRef}
				index={-1}
				snapPoints={SNAP_POINTS}
				enableDynamicSizing={false}
				enablePanDownToClose
				enableOverDrag={true}
				backgroundStyle={{ backgroundColor: themeColors.popover }}
				handleIndicatorStyle={{ backgroundColor: themeColors.mutedForeground }}
			>
				{/* Scrollable list as a sibling, no flex:1 */}
				<BottomSheetScrollView
					showsVerticalScrollIndicator
					keyboardShouldPersistTaps="handled"
					contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 100 }}
				>
					{allExerciseTypes.length === 0 ? (
						<View className="py-8 items-center">
							<Text className="text-muted-foreground text-center">
								Aucun exercice disponible
							</Text>
						</View>
					) : (
						<View>
							{allExerciseTypes.map((type) => {
								const isSelected = selectedExerciseType?.id === type.id;
								return (
									<Pressable
										key={type.id}
										onPress={() => {
											onExerciseTypeChange(type);
											closeBottomSheet();
										}}
										style={({ pressed }) => [
											{
												opacity: pressed ? 0.7 : 1,
											},
										]}
									>
										<View
											className={`flex-row items-center p-4 rounded-lg mb-2 ${
												isSelected
													? "bg-primary/10 border border-primary/20"
													: "bg-muted"
											}`}
										>
											<View
												className={`w-5 h-5 rounded-full border-2 ${
													isSelected
														? "bg-primary border-primary"
														: "border-muted-foreground"
												}`}
											>
												{isSelected && (
													<View className="w-2 h-2 bg-primary-foreground rounded-full m-auto" />
												)}
											</View>
											<View className="ml-3 flex-1">
												<Text
													className={`text-base ${
														isSelected
															? "text-primary font-semibold"
															: "text-foreground"
													}`}
												>
													{type.name}
												</Text>
											</View>
										</View>
									</Pressable>
								);
							})}
						</View>
					)}
				</BottomSheetScrollView>
			</BottomSheet>
		</SafeAreaView>
	);
}
