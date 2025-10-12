import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { format } from "date-fns";
import { useRouter } from "expo-router";
import { AlignJustifyIcon, LucideLoader2 } from "lucide-react-native";
import React, {
	useCallback,
	useEffect,
	useMemo,
	useRef,
	useState,
} from "react";
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
import { fetchApi } from "@/lib/api-handler";

const { width } = Dimensions.get("window");

type ExerciseType = {
	_id: string;
	name: string;
	advice?: string;
	timer: number;
	repRange1: string;
	repRange2: string;
	repRange3: string;
	repRange4?: string;
	type_session: string[];
};

type ExerciseData = {
	_id: string;
	rep: number[];
	weight: number[];
	comment?: string;
	session: {
		_id: string;
		date_session: string;
	};
};

export default function Stats() {
	const router = useRouter();
	const bottomSheetRef = useRef<BottomSheet>(null);
	const [exercise, setExercise] = useState<ExerciseData[]>([]);
	const [allExerciseTypes, setAllExerciseTypes] = useState<ExerciseType[]>([]);
	const [selectedExerciseType, setSelectedExerciseType] =
		useState<ExerciseType | null>(null);
	const [isLoading, setIsLoading] = useState(true);
	const [isLoadingTypes, setIsLoadingTypes] = useState(true);
	const [selectedExerciseIndex, setSelectedExerciseIndex] = useState<
		number | null
	>(null);
	const [isExercisePickerOpen, setIsExercisePickerOpen] = useState(false);

	// Bottom sheet snap points - using better values for large lists
	const snapPoints = useMemo(() => ["50%", "90%"], []);

	// Bottom sheet handlers
	const handleSheetChanges = useCallback((index: number) => {
		if (index === -1) {
			setIsExercisePickerOpen(false);
		}
	}, []);

	const openBottomSheet = useCallback(() => {
		bottomSheetRef.current?.snapToIndex(1); // Snap to 90% for maximum scrolling space
		setIsExercisePickerOpen(true);
	}, []);

	const closeBottomSheet = useCallback(() => {
		bottomSheetRef.current?.close();
		setIsExercisePickerOpen(false);
	}, []);

	const fetchAllExerciseTypes = async () => {
		try {
			const response = await fetchApi(`/api/exercise-type?limit=1000`);
			return response;
		} catch (error: any) {
			console.error("Fetch error: ", error);
			return [];
		} finally {
			setIsLoadingTypes(false);
		}
	};

	const onExerciseTypeChange = async (exerciseType: ExerciseType) => {
		setSelectedExerciseType(exerciseType);
		// Find the index of the selected exercise type
		const index = allExerciseTypes.findIndex(
			(type) => type._id === exerciseType._id,
		);
		setSelectedExerciseIndex(index >= 0 ? index : null);
		setIsLoading(true);
		try {
			const response = await fetchApi(
				`/api/exercise-user?limit=1000&sort=createdAt&type=${exerciseType._id}`,
			);
			setExercise(response);
		} catch (error: any) {
			console.error("Fetch error: ", error);
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		const init = async () => {
			setIsLoading(true);
			const exerciseTypeData = await fetchAllExerciseTypes();
			setAllExerciseTypes(exerciseTypeData);

			if (exerciseTypeData.length > 0) {
				const defaultExerciseType = exerciseTypeData[0];
				setSelectedExerciseType(defaultExerciseType);
				setSelectedExerciseIndex(0);
				await onExerciseTypeChange(defaultExerciseType);
			} else {
				setSelectedExerciseType(null);
				setSelectedExerciseIndex(null);
				setExercise([]);
			}

			setIsLoading(false);
		};

		init();
	}, []);

	const formatXAxis = (tickFormat: string) => {
		const formattedDate = format(new Date(tickFormat), "dd/MM/yyyy");
		return formattedDate;
	};

	// Prepare data for Victory charts
	const chartData = exercise.map((exerciseItem) => ({
		x: new Date(exerciseItem.session.date_session),
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
		<SafeAreaView
			className="flex-1 bg-background dark:bg-background-dark"
			edges={["bottom"]}
		>
			<ScrollView className="flex-1 px-4 pt-4">
				{/* Exercise Type Selection */}
				<View className="mb-4">
					{isLoadingTypes ? (
						<View className="bg-muted/30 dark:bg-muted-dark/30 rounded-lg p-4">
							<ActivityIndicator size="small" />
						</View>
					) : allExerciseTypes.length === 0 ? (
						<View className="bg-muted/30 dark:bg-muted-dark/30 rounded-lg p-4">
							<Text className="text-muted-foreground dark:text-gray-400 text-center">
								Aucun exercice disponible.
							</Text>
						</View>
					) : (
						<Button
							onPress={openBottomSheet}
							variant="ghost"
							className="flex-row w-full flex-1 h-20 items-center dark:text-foreground-dark bg-gray-100 dark:bg-gray-700 rounded-md justify-between p-4"
						>
							<Text className="text-foreground dark:text-foreground-dark">
								{selectedExerciseType
									? selectedExerciseType.name
									: "Sélectionne un exercice"}
							</Text>
							<AlignJustifyIcon size={20} color="#252525" strokeWidth={1.5} />
						</Button>
					)}
				</View>

				{/* Loading State */}
				{isLoading && (
					<View className="flex-1 items-center justify-center py-20">
						<LucideLoader2 className="animate-spin" size={32} />
						<Text className="mt-4 text-sm text-muted-foreground dark:text-gray-400">
							Chargement...
						</Text>
					</View>
				)}

				{/* Chart */}
				{!isLoading && exercise.length > 0 && (
					<View className="bg-slate-50 dark:bg-slate-900/40 rounded-2xl p-4 mb-5">
						<Text className="text-lg font-semibold text-center mb-4 text-foreground dark:text-foreground-dark">
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
									tickLabels: { fontSize: 10, angle: -45 },
								}}
							/>
							<VictoryAxis
								dependentAxis
								domain={yDomain}
								label="Charge (kg)"
								style={{
									axisLabel: { padding: 35, fontSize: 12 },
									tickLabels: { fontSize: 10 },
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
								{selectedExerciseType?.repRange4 && (
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
								style={{ border: { stroke: "black" }, title: { fontSize: 20 } }}
								data={[
									{ name: "Série 1", symbol: { fill: "#AC38B2" } },
									{ name: "Série 2", symbol: { fill: "#B2AC38" } },
									{ name: "Série 3", symbol: { fill: "#38B2AC" } },
									...(selectedExerciseType?.repRange4
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
						<Text className="text-gray-500 dark:text-gray-400">
							Aucun historique disponible sur cet exercice.
						</Text>
					</View>
				)}

				{/* Stats Summary */}
				{!isLoading && exercise.length > 0 && (
					<View className="bg-slate-50 dark:bg-slate-900/40 rounded-2xl p-4 mb-20">
						<Text className="text-lg font-semibold mb-4 text-foreground dark:text-foreground-dark">
							Résumé
						</Text>

						<View className="flex-row justify-between">
							<View className="items-center">
								<Text className="text-2xl font-bold text-foreground dark:text-foreground-dark">
									{exercise.length}
								</Text>
								<Text className="text-sm text-muted-foreground dark:text-gray-400">
									Séances
								</Text>
							</View>

							<View className="items-center">
								<Text className="text-2xl font-bold text-foreground dark:text-foreground-dark">
									{maxWeight}
								</Text>
								<Text className="text-sm text-muted-foreground dark:text-gray-400">
									Max (kg)
								</Text>
							</View>

							<View className="items-center">
								<Text className="text-2xl font-bold text-foreground dark:text-foreground-dark">
									{minWeight}
								</Text>
								<Text className="text-sm text-muted-foreground dark:text-gray-400">
									Min (kg)
								</Text>
							</View>
						</View>
					</View>
				)}
			</ScrollView>

			{/* Exercise Picker BottomSheet */}
			<BottomSheet
				ref={bottomSheetRef}
				index={-1}
				snapPoints={snapPoints}
				enableDynamicSizing={false}
				onChange={handleSheetChanges}
				enablePanDownToClose
				enableOverDrag={true}
			>
				{/* Scrollable list as a sibling, no flex:1 */}
				<BottomSheetScrollView
					showsVerticalScrollIndicator
					keyboardShouldPersistTaps="handled"
					contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 100 }}
				>
					{allExerciseTypes.length === 0 ? (
						<View className="py-8 items-center">
							<Text className="text-muted-foreground dark:text-gray-400 text-center">
								Aucun exercice disponible
							</Text>
						</View>
					) : (
						<View>
							{allExerciseTypes.map((type: ExerciseType, index: number) => {
								const isSelected = selectedExerciseType?._id === type._id;
								return (
									<Pressable
										key={type._id}
										onPress={() => {
											setSelectedExerciseIndex(index);
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
													: "bg-gray-50 dark:bg-gray-800"
											}`}
										>
											<View
												className={`w-5 h-5 rounded-full border-2 ${
													isSelected
														? "bg-primary border-primary"
														: "border-gray-300 dark:border-gray-600"
												}`}
											>
												{isSelected && (
													<View className="w-2 h-2 bg-white rounded-full m-auto" />
												)}
											</View>
											<View className="ml-3 flex-1">
												<Text
													className={`text-base ${
														isSelected
															? "text-primary font-semibold"
															: "text-foreground dark:text-foreground-dark"
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
