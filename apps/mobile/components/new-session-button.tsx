import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { useRouter } from "expo-router";
import { Zap } from "lucide-react-native";
import React, { useCallback, useRef, useState } from "react";
import { ActivityIndicator, Image, Pressable, Text, View } from "react-native";

// import { Switch } from "@/components/ui/switch"; // For minimalist feature - coming later
import { colors } from "@/constants/colors";
import { fetchApi } from "@/lib/api-handler";
import { useColorScheme } from "@/lib/useColorScheme";

// Import body images (we'll add these assets)
// const bodyFront = require("../assets/body-front.png"); // For minimalist feature - coming later
// const bodyBack = require("../assets/body-back.png"); // For minimalist feature - coming later
const upperFront = require("../assets/upper-front.png");
const upperBack = require("../assets/upper-back.png");
const lower = require("../assets/lower.png");

export default function NewSessionButton() {
	// const [showMinimaliste, setShowMinimaliste] = useState(false); // Feature coming later
	const [isLoading, setIsLoading] = useState(false);
	const [bodyWeight, setBodyWeight] = useState(0);
	const [open, setOpen] = useState(false);
	const { isDarkColorScheme } = useColorScheme();

	// Bottom sheet ref and snap points
	const sheetRef = useRef<BottomSheet>(null);

	const router = useRouter();

	// Dynamic colors based on theme
	const iconColor = isDarkColorScheme ? "#9ca3af" : "#6b7280"; // gray-400 : gray-500
	const fabBgColor = isDarkColorScheme
		? "rgba(51, 65, 85, 0.5)"
		: "rgba(243, 244, 246, 0.5)"; // slate-700/50 : gray-100/50
	const fabBorderColor = isDarkColorScheme
		? "rgba(71, 85, 105, 0.5)"
		: "rgba(243, 244, 246, 0.5)"; // slate-600/50 : gray-100/50

	// Bottom sheet callbacks
	const handleSheetChange = useCallback((index: number) => {
		console.log("handleSheetChange", index);
	}, []);

	const handleSnapPress = useCallback((index: number) => {
		sheetRef.current?.snapToIndex(index);
	}, []);

	const handleClosePress = useCallback(() => {
		sheetRef.current?.close();
	}, []);

	const handleCreateSession = async (userChoice: string) => {
		setIsLoading(true);
		try {
			const response = await fetchApi("/api/sessions", {
				method: "POST",
				body: JSON.stringify({
					date_session: new Date(),
					type_session: userChoice,
					body_weight: bodyWeight,
					exercise_user_list: [],
					is_done: false,
					comment: "",
				}),
			});
			if (response.session) {
				router.push(`/session/${response.session._id}`);
			}
		} catch (error: any) {
			console.error(error);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<>
			{/* FAB */}
			{!open && (
				<Pressable
					onPress={() => {
						sheetRef.current?.snapToIndex(0); // Open to content size
						setOpen(true);
					}}
					className="absolute bottom-10 right-10 z-50"
				>
					<View
						style={{
							borderColor: fabBorderColor,
							backgroundColor: fabBgColor,
						}}
						className="flex h-16 w-16 items-center justify-center rounded-full border-2 shadow-lg"
					>
						<Zap color={iconColor} size={28} strokeWidth={1.7} />
					</View>
				</Pressable>
			)}

			{/* Bottom-sheet */}
			<BottomSheet
				ref={sheetRef}
				index={-1}
				enableDynamicSizing={true}
				enablePanDownToClose={true}
				maxDynamicContentSize={600}
				onChange={handleSheetChange}
				onClose={() => setOpen(false)}
				backgroundStyle={{
					backgroundColor: isDarkColorScheme
						? colors.dark.background
						: colors.light.background,
				}}
				handleIndicatorStyle={{
					backgroundColor: isDarkColorScheme ? "#6B7280" : "#9CA3AF",
				}}
			>
				<BottomSheetScrollView
					contentContainerStyle={{
						padding: 16,
						backgroundColor: isDarkColorScheme
							? colors.dark.background
							: colors.light.background,
						flexGrow: 1,
					}}
				>
					<View className="bg-background dark:bg-background-dark">
						{isLoading ? (
							<View className="pt-14 items-center justify-center">
								<ActivityIndicator size="large" />
							</View>
						) : (
							<View>
								{/* Header */}
								<View className="mb-4">
									<Text className="text-xl font-bold text-foreground dark:text-foreground-dark">
										Nouvelle séance
									</Text>
									{/* Minimalist training toggle - Coming soon */}
									{/* <View className="flex-row items-center justify-between mt-2">
										<Text className="text-sm text-muted-foreground dark:text-muted-foreground-dark flex-1 mr-2">
											{showMinimaliste
												? "Entrainement minimaliste (2x/semaine)"
												: "Entrainement complet (3x/semaine)"}
										</Text>
										<Switch
											checked={showMinimaliste}
											onCheckedChange={setShowMinimaliste}
										/>
									</View> */}
								</View>

								{/* Session Type Buttons */}
								<View className="flex-row justify-evenly">
									{/* Minimalist sessions - Coming soon */}
									{/* {showMinimaliste ? (
										<>
											<Pressable
												onPress={() => handleCreateSession("Séance A")}
												className="flex h-24 w-24 flex-col items-center justify-center rounded-md border border-border dark:border-border-dark bg-card dark:bg-card-dark active:opacity-70"
											>
												<Text className="mt-2 text-lg font-medium text-foreground dark:text-foreground-dark">
													Séance A
												</Text>
												<Image
													source={bodyFront}
													className="h-14 w-9"
													resizeMode="contain"
												/>
											</Pressable>
											<Pressable
												onPress={() => handleCreateSession("Séance B")}
												className="flex h-24 w-24 flex-col items-center justify-center rounded-md border border-border dark:border-border-dark bg-card dark:bg-card-dark active:opacity-70"
											>
												<Text className="mt-2 text-lg font-medium text-foreground dark:text-foreground-dark">
													Séance B
												</Text>
												<Image
													source={bodyBack}
													className="h-14 w-9"
													resizeMode="contain"
												/>
											</Pressable>
										</>
									) : ( */}
									<>
										<Pressable
											onPress={() => handleCreateSession("Upper A")}
											className="flex h-24 w-24 flex-col items-center justify-center rounded-md border border-border dark:border-border-dark bg-card dark:bg-card-dark active:opacity-70"
										>
											<Text className="mb-1 mt-2 text-lg font-medium text-foreground dark:text-foreground-dark">
												Upper A
											</Text>
											<Image
												source={upperFront}
												className="mb-1 h-14 w-14"
												resizeMode="contain"
											/>
										</Pressable>
										<Pressable
											onPress={() => handleCreateSession("Lower")}
											className="flex h-24 w-24 flex-col items-center justify-center rounded-md border border-border dark:border-border-dark bg-card dark:bg-card-dark active:opacity-70"
										>
											<Text className="mb-1 mt-2 text-lg font-medium text-foreground dark:text-foreground-dark">
												Lower
											</Text>
											<Image
												source={lower}
												className="mb-1 h-14 w-12"
												resizeMode="contain"
											/>
										</Pressable>
										<Pressable
											onPress={() => handleCreateSession("Upper B")}
											className="flex h-24 w-24 flex-col items-center justify-center rounded-md border border-border dark:border-border-dark bg-card dark:bg-card-dark active:opacity-70"
										>
											<Text className="mb-1 mt-2 text-lg font-medium text-foreground dark:text-foreground-dark">
												Upper B
											</Text>
											<Image
												source={upperBack}
												className="mb-1 h-14 w-14"
												resizeMode="contain"
											/>
										</Pressable>
									</>
									{/* )} */}
								</View>
							</View>
						)}
					</View>
				</BottomSheetScrollView>
			</BottomSheet>
		</>
	);
}
