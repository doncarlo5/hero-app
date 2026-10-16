import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAudioPlayer } from "expo-audio";
import * as Haptics from "expo-haptics";
import { Button } from "heroui-native";
import { Volume2Icon, VolumeXIcon } from "lucide-react-native";
import { useEffect, useRef, useState } from "react";
import { Pressable, View } from "react-native";

import { Text } from "@/components/ui/text";
import {
	formatRest,
	remainingSeconds,
	restPhase,
	type RestPhase,
	type RestTimer,
} from "@/lib/session/rest";
import { useThemeColors } from "@/lib/theme";
import { cn } from "@/lib/utils";

const MUTED_KEY = "timer_isMuted";
const audioSource = require("../assets/ding.mp3");

// Rest between two sets. The time left is read from the stored timer on every render, so it is right
// after a background or a kill; sound and haptics fire once per phase change, in the foreground only.
export function RestPanel(props: {
	timer: RestTimer;
	now: number;
	nextLabel: string | null;
	onAdjust: (deltaSeconds: number) => void;
	onSkip: () => void;
}) {
	const themeColors = useThemeColors();
	const player = useAudioPlayer(audioSource);
	const [isMuted, setIsMuted] = useState(false);
	const lastPhase = useRef<RestPhase | null>(null);

	const phase = restPhase(props.timer, props.now);
	const left = remainingSeconds(props.timer, props.now);

	const toggleMuted = () => {
		const next = !isMuted;
		setIsMuted(next);
		AsyncStorage.setItem(MUTED_KEY, JSON.stringify(next)).catch(() => {});
	};

	useEffect(() => {
		AsyncStorage.getItem(MUTED_KEY)
			.then((value) => value !== null && setIsMuted(JSON.parse(value)))
			.catch(() => {});
	}, []);

	useEffect(() => {
		const previous = lastPhase.current;
		lastPhase.current = phase;
		// First render (opening the screen mid-rest or after it ended): no signal
		if (previous === null || previous === phase) return;
		if (phase === "ready") {
			Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
		}
		if (phase === "done") {
			Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
			if (!isMuted) {
				player.seekTo(0);
				player.play();
			}
		}
	}, [phase]);

	return (
		<View
			className={cn(
				"rounded-2xl px-4 py-5 items-center",
				phase === "done" ? "bg-accent-soft" : "bg-default",
			)}
		>
			<Pressable
				onPress={toggleMuted}
				accessibilityRole="button"
				accessibilityLabel={isMuted ? "Activer le son" : "Couper le son"}
				className="absolute top-3 left-3 h-9 w-9 items-center justify-center rounded-full bg-background"
			>
				{isMuted ? (
					<VolumeXIcon size={18} color={themeColors.mutedForeground} />
				) : (
					<Volume2Icon size={18} color={themeColors.brand} />
				)}
			</Pressable>

			<Text className="text-sm text-muted">
				{phase === "done"
					? "Repos terminé"
					: phase === "ready"
						? "Prépare-toi"
						: "Repos"}
			</Text>
			<Text
				className={cn(
					"text-5xl font-bold my-1",
					phase === "done" && "text-accent",
				)}
				accessibilityLiveRegion="polite"
			>
				{phase === "done" ? "C'est parti" : formatRest(left)}
			</Text>
			{props.nextLabel && (
				<Text className="text-sm text-muted mb-3">
					Ensuite : {props.nextLabel}
				</Text>
			)}

			{phase !== "done" && (
				<View className="flex-row gap-2">
					<Button
						variant="secondary"
						size="sm"
						onPress={() => props.onAdjust(-15)}
					>
						<Button.Label>−15 s</Button.Label>
					</Button>
					<Button
						variant="secondary"
						size="sm"
						onPress={() => props.onAdjust(15)}
					>
						<Button.Label>+15 s</Button.Label>
					</Button>
					<Button variant="ghost" size="sm" onPress={props.onSkip}>
						<Button.Label>Passer</Button.Label>
					</Button>
				</View>
			)}
		</View>
	);
}
