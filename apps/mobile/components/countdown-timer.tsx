import { useAudioPlayer } from "expo-audio";
import {
	PlayIcon,
	RotateCcwIcon,
	Volume2Icon,
	VolumeXIcon,
} from "lucide-react-native";
import React, { useEffect, useState } from "react";
import { TouchableOpacity, View } from "react-native";
import { CountdownCircleTimer } from "react-native-countdown-circle-timer";

import { Text } from "@/components/ui/text";

const audioSource = require("../assets/ding.mp3");

interface CountDownTimerProps {
	exerciseTypeTimer: number;
}

export function CountDownTimer({ exerciseTypeTimer }: CountDownTimerProps) {
	const [isTimerPlaying, setIsTimerPlaying] = useState(false);
	const [key, setKey] = useState(0);
	const [hasCompleted, setHasCompleted] = useState(false);
	const [isMuted, setIsMuted] = useState(false);
	const player = useAudioPlayer(audioSource);

	// Handle timer completion
	useEffect(() => {
		if (hasCompleted && !isMuted) {
			// Play sound when timer completes (only if not muted)
			player.seekTo(0);
			player.play();

			// Reset after 3 seconds
			const timer = setTimeout(() => {
				setKey((prevKey) => prevKey + 1);
				setHasCompleted(false);
			}, 3000);

			return () => clearTimeout(timer);
		} else if (hasCompleted && isMuted) {
			// Reset after 3 seconds without playing sound
			const timer = setTimeout(() => {
				setKey((prevKey) => prevKey + 1);
				setHasCompleted(false);
			}, 3000);

			return () => clearTimeout(timer);
		}
	}, [hasCompleted, player, isMuted]);

	const renderTime = ({ remainingTime }: { remainingTime: number }) => {
		if (remainingTime === 0) {
			return (
				<View className="flex items-center justify-center">
					<Text className="text-3xl font-black text-teal-600">GO!</Text>
				</View>
			);
		}

		if (Number.isNaN(remainingTime)) {
			return (
				<View className="flex items-center justify-center">
					<Text className="text-2xl text-gray-500">--:--</Text>
				</View>
			);
		}

		const minutes = Math.floor(remainingTime / 60);
		const seconds = remainingTime % 60;
		const formattedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;

		return (
			<View className="flex items-center justify-center">
				<Text className="text-3xl font-bold">{`${minutes}:${formattedSeconds}`}</Text>
			</View>
		);
	};

	const restartFunction = () => {
		setKey((prevKey) => prevKey + 1);
		setIsTimerPlaying(false);
		setHasCompleted(false);
	};

	const toggleSound = () => {
		setIsMuted(!isMuted);
	};

	return (
		<View className="mb-4 w-full flex items-center justify-center relative rounded-2xl bg-slate-50 dark:bg-slate-900/40 px-4 py-6">
			<TouchableOpacity
				onPress={toggleSound}
				className="absolute top-2 left-2 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-gray-50 shadow-sm"
			>
				{isMuted ? (
					<VolumeXIcon size={20} color="#6B7280" />
				) : (
					<Volume2Icon size={20} color="#0F766E" />
				)}
			</TouchableOpacity>

			<View className="flex flex-row items-center gap-10">
				<CountdownCircleTimer
					isPlaying={isTimerPlaying}
					duration={exerciseTypeTimer}
					colors={["#0F766E", "#0F766E", "#760f17", "#760f17"]}
					colorsTime={[7, 5, 2, 0]}
					size={120}
					strokeWidth={8}
					rotation="counterclockwise"
					isGrowing={true}
					trailColor="#d9d9d9"
					key={key}
					onComplete={() => {
						setHasCompleted(true);
						setIsTimerPlaying(false);
						return {
							shouldRepeat: false,
							delay: 1,
							newInitialRemainingTime: exerciseTypeTimer,
						};
					}}
				>
					{renderTime}
				</CountdownCircleTimer>
				<TouchableOpacity
					onPress={() => {
						if (isTimerPlaying) {
							restartFunction();
						} else {
							setIsTimerPlaying(true);
						}
					}}
					className="flex h-12 w-20 items-center justify-center rounded-full pl-1 bg-teal-700 shadow-md"
				>
					{isTimerPlaying ? (
						<RotateCcwIcon size={24} color="white" />
					) : (
						<PlayIcon size={24} color="white" />
					)}
				</TouchableOpacity>
			</View>
		</View>
	);
}
