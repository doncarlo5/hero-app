import {
	BottomSheet,
	BottomSheetScrollView,
} from "@expo/ui/community/bottom-sheet";
import { useRouter } from "expo-router";
import { Zap } from "lucide-react-native";
import React, { useCallback, useRef, useState } from "react";
import { ActivityIndicator, Alert, Pressable, Text, View } from "react-native";

import { useAuth } from "@/context/supabase-provider";
import { useActiveProgram } from "@/lib/queries/programs";
import { useCreateSession, useLastSession } from "@/lib/queries/sessions";
import { useThemeColors } from "@/lib/theme";
import { useColorScheme } from "@/lib/useColorScheme";

export default function NewSessionButton() {
	const { session } = useAuth();
	const program = useActiveProgram();
	const createSession = useCreateSession();
	const lastSession = useLastSession();
	const isLoading = createSession.isPending;
	const [open, setOpen] = useState(false);
	const { isDarkColorScheme } = useColorScheme();
	const themeColors = useThemeColors();

	// Bottom sheet ref and snap points
	const sheetRef = useRef<BottomSheet>(null);

	const router = useRouter();

	// Dynamic colors based on theme
	const iconColor = themeColors.mutedForeground;
	const fabBgColor = isDarkColorScheme
		? "rgba(51, 65, 85, 0.5)"
		: "rgba(243, 244, 246, 0.5)"; // slate-700/50 : gray-100/50
	const fabBorderColor = isDarkColorScheme
		? "rgba(71, 85, 105, 0.5)"
		: "rgba(243, 244, 246, 0.5)"; // slate-600/50 : gray-100/50

	// Bottom sheet callbacks
	const handleSnapPress = useCallback((index: number) => {
		sheetRef.current?.snapToIndex(index);
	}, []);

	const handleClosePress = useCallback(() => {
		sheetRef.current?.close();
	}, []);

	// day null: a free session outside the program
	const handleCreateSession = (day: { id: string; name: string } | null) => {
		if (!session || createSession.isPending) return;
		createSession.mutate(
			{
				ownerId: session.user.id,
				dayId: day?.id ?? null,
				label: day?.name ?? "Séance libre",
				// Start from the last known body weight; editable on the session screen
				bodyWeight: lastSession.data?.body_weight ?? 0,
			},
			{
				onSuccess: (created) => {
					// The native sheet stays presented over the next screen otherwise
					handleClosePress();
					router.push(`/session/${created.id}`);
				},
				onError: (error) =>
					Alert.alert(
						"Erreur",
						error.message || "Impossible de créer la séance.",
					),
			},
		);
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
				onClose={() => setOpen(false)}
				backgroundStyle={{
					backgroundColor: themeColors.popover,
				}}
				handleIndicatorStyle={{
					backgroundColor: themeColors.mutedForeground,
				}}
			>
				<BottomSheetScrollView
					contentContainerStyle={{
						padding: 16,
						backgroundColor: themeColors.popover,
						flexGrow: 1,
					}}
				>
					<View className="bg-overlay">
						{isLoading ? (
							<View className="pt-14 items-center justify-center">
								<ActivityIndicator size="large" />
							</View>
						) : (
							<View>
								<Text className="text-xl font-bold text-foreground mb-1">
									Nouvelle séance
								</Text>
								{program.data && (
									<Text className="text-sm text-muted mb-4">
										{program.data.name}
									</Text>
								)}
								<View className="gap-2">
									{program.data?.program_days.map((day) => (
										<Pressable
											key={day.id}
											onPress={() => handleCreateSession(day)}
											className="flex-row items-center justify-between rounded-md border border-border bg-surface px-4 py-3 active:opacity-70"
										>
											<Text className="text-lg font-medium text-foreground">
												{day.name}
											</Text>
											<Text className="text-sm text-muted">
												{day.slots.length} exercice
												{day.slots.length > 1 ? "s" : ""}
											</Text>
										</Pressable>
									))}
									<Pressable
										onPress={() => handleCreateSession(null)}
										className="rounded-md border border-dashed border-border px-4 py-3 active:opacity-70"
									>
										<Text className="text-base text-muted">
											Séance libre, hors programme
										</Text>
									</Pressable>
								</View>
							</View>
						)}
					</View>
				</BottomSheetScrollView>
			</BottomSheet>
		</>
	);
}
