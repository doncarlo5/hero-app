import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { useRouter } from "expo-router";
import { Zap } from "lucide-react-native";
import React, { useCallback, useMemo, useRef, useState } from "react";
import { ActivityIndicator, Image, Pressable, Text, View } from "react-native";

import { Switch } from "@/components/ui/switch";
import { fetchApi } from "@/lib/api-handler";

// Import body images (we'll add these assets)
const bodyFront = require("../assets/body-front.png");
const bodyBack = require("../assets/body-back.png");
const upperFront = require("../assets/upper-front.png");
const upperBack = require("../assets/upper-back.png");
const lower = require("../assets/lower.png");

export default function NewSessionButton() {
	const [showMinimaliste, setShowMinimaliste] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [bodyWeight, setBodyWeight] = useState(0);
	const [isSheetOpen, setIsSheetOpen] = useState(false);

	const router = useRouter();

	// ref
	const bottomSheetRef = useRef<BottomSheet>(null);

	// variables
	const snapPoints = useMemo(() => ["25%"], []);

	// callbacks
	const handleSheetChanges = useCallback((index: number) => {
		// index === -1  ➜ fully closed   (collapsed)
		// index >= 0    ➜ one of your snap points
		setIsSheetOpen(index >= 0);
		console.log("handleSheetChanges", index);
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

	console.log("bottomSheetRef", bottomSheetRef);

	return (
		<>
			{/* FAB — render it only when the sheet is closed */}
			{!isSheetOpen && (
				<Pressable
					onPress={() => {
						setIsSheetOpen(true);
						bottomSheetRef.current?.expand();
					}}
					className="absolute bottom-10 right-10 z-50"
				>
					<View className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-gray-100/50 bg-gray-100/50 backdrop-blur-sm">
						<Zap color="rgb(107 114 128)" size={28} strokeWidth={1.7} />
					</View>
				</Pressable>
			)}

			{/* Bottom-sheet starts closed with index = -1 */}
			<BottomSheet
				ref={bottomSheetRef}
				index={-1}
				snapPoints={snapPoints}
				onChange={handleSheetChanges}
				enablePanDownToClose
			>
				<BottomSheetView className="flex-1 px-4 pb-4">
					{isLoading ? (
						<View className="flex-1 pt-14 items-center justify-center">
							<ActivityIndicator size="large" />
						</View>
					) : (
						<View className="flex-1">
							{/* Header */}
							<View className="mb-4">
								<Text className="text-xl font-bold text-foreground dark:text-foreground-dark">
									Nouvelle séance
								</Text>
								<View className="flex-row items-center justify-between mt-2">
									<Text className="text-sm text-muted-foreground dark:text-muted-foreground-dark flex-1 mr-2">
										{showMinimaliste
											? "Entrainement minimaliste (2x/semaine)"
											: "Entrainement complet (3x/semaine)"}
									</Text>
									<Switch
										checked={showMinimaliste}
										onCheckedChange={setShowMinimaliste}
									/>
								</View>
							</View>

							{/* Session Type Buttons */}
							<View className="flex-row justify-evenly">
								{showMinimaliste ? (
									<>
										<Pressable
											onPress={() => handleCreateSession("Séance A")}
											className="flex h-24 w-24 flex-col items-center justify-center rounded-md border border-border dark:border-border-dark bg-background dark:bg-background-dark"
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
											className="flex h-24 w-24 flex-col items-center justify-center rounded-md border border-border dark:border-border-dark bg-background dark:bg-background-dark"
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
								) : (
									<>
										<Pressable
											onPress={() => handleCreateSession("Upper A")}
											className="flex h-24 w-24 flex-col items-center justify-center rounded-md border border-border dark:border-border-dark bg-background dark:bg-background-dark"
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
											className="flex h-24 w-24 flex-col items-center justify-center rounded-md border border-border dark:border-border-dark bg-background dark:bg-background-dark"
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
											className="flex h-24 w-24 flex-col items-center justify-center rounded-md border border-border dark:border-border-dark bg-background dark:bg-background-dark"
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
								)}
							</View>
						</View>
					)}
				</BottomSheetView>
			</BottomSheet>
		</>
	);
}
