import { useAudioPlayer } from "expo-audio";
import { PlayIcon, RotateCcwIcon } from "lucide-react-native";
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
	const player = useAudioPlayer(audioSource);

	// Handle timer completion
	useEffect(() => {
		if (hasCompleted) {
			// Play sound when timer completes
			player.seekTo(0);
			player.play();

			// Reset after 3 seconds
			const timer = setTimeout(() => {
				setKey((prevKey) => prevKey + 1);
				setHasCompleted(false);
			}, 3000);

			return () => clearTimeout(timer);
		}
	}, [hasCompleted, player]);

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

	return (
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
	);
}

interface MiniCountDownTimerProps {
	exerciseTypeTimer: number;
}

export function MiniCountDownTimer({
	exerciseTypeTimer,
}: MiniCountDownTimerProps) {
	const [isTimerPlaying, setIsTimerPlaying] = useState(false);
	const [key, setKey] = useState(0);
	const [hasCompleted, setHasCompleted] = useState(false);
	const player = useAudioPlayer(audioSource);

	// Handle timer completion
	useEffect(() => {
		if (hasCompleted) {
			// Play sound when timer completes
			player.seekTo(0);
			player.play();

			// Reset after 3 seconds
			const timer = setTimeout(() => {
				setKey((prevKey) => prevKey + 1);
				setHasCompleted(false);
			}, 3000);

			return () => clearTimeout(timer);
		}
	}, [hasCompleted, player]);

	const renderTime = ({ remainingTime }: { remainingTime: number }) => {
		if (remainingTime === 0) {
			return (
				<View className="flex items-center justify-center">
					<Text className="text-sm font-bold text-teal-600">GO!</Text>
				</View>
			);
		}

		if (Number.isNaN(remainingTime)) {
			return (
				<View className="flex items-center justify-center">
					<Text className="text-xs text-gray-500">--:--</Text>
				</View>
			);
		}

		const minutes = Math.floor(remainingTime / 60);
		const seconds = remainingTime % 60;
		const formattedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;

		return (
			<View className="flex items-center justify-center">
				<Text className="text-sm font-semibold">{`${minutes}:${formattedSeconds}`}</Text>
			</View>
		);
	};

	const restartFunction = () => {
		setKey((prevKey) => prevKey + 1);
		setIsTimerPlaying(false);
		setHasCompleted(false);
	};

	return (
		<View className="flex flex-row items-center gap-2">
			<CountdownCircleTimer
				isPlaying={isTimerPlaying}
				duration={exerciseTypeTimer}
				colors={["#0F766E", "#0F766E", "#760f17", "#760f17"]}
				colorsTime={[7, 5, 2, 0]}
				size={50}
				strokeWidth={4}
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
				className="flex h-8 w-8 items-center justify-center rounded-full bg-teal-700 shadow-sm"
			>
				{isTimerPlaying ? (
					<RotateCcwIcon size={16} color="white" />
				) : (
					<PlayIcon size={16} color="white" />
				)}
			</TouchableOpacity>
		</View>
	);
}
