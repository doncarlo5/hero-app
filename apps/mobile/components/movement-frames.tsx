import { useEffect, useState } from "react";
import { AccessibilityInfo, Animated, Pressable, View } from "react-native";

import { Image } from "@/components/image";
import { Text } from "@/components/ui/text";
import { movementImageUrl } from "@/lib/queries/movements";
import type { Movement } from "@/lib/queries/types";
import { cn } from "@/lib/utils";

const FRAME_MS = 1200;
const FADE_MS = 300;

// A library movement's photos (start and end positions) played as a short loop: each frame fades into
// the next. With reduced motion on, the frames stay still and a tap shows the next one.
export function MovementFrames(props: {
	movement: Movement;
	className?: string;
}) {
	const paths = props.movement.image_paths;
	const [index, setIndex] = useState(0);
	const [reduceMotion, setReduceMotion] = useState(false);
	// One animated value for the component's life (a lazy initial state, not read from a ref)
	const [opacity] = useState(() => new Animated.Value(1));

	const next =
		(paths.length > 1 ? index + 1 : index) % Math.max(paths.length, 1);

	useEffect(() => {
		AccessibilityInfo.isReduceMotionEnabled().then(setReduceMotion);
		const subscription = AccessibilityInfo.addEventListener(
			"reduceMotionChanged",
			setReduceMotion,
		);
		return () => subscription.remove();
	}, []);

	useEffect(() => {
		if (paths.length < 2 || reduceMotion) return;
		const timer = setInterval(() => {
			Animated.timing(opacity, {
				toValue: 0,
				duration: FADE_MS,
				useNativeDriver: true,
			}).start(() => {
				setIndex((i) => (i + 1) % paths.length);
				opacity.setValue(1);
			});
		}, FRAME_MS);
		return () => clearInterval(timer);
	}, [paths.length, reduceMotion]);

	if (paths.length === 0) return null;

	return (
		<Pressable
			disabled={!reduceMotion || paths.length < 2}
			onPress={() => setIndex(next)}
			accessibilityRole="image"
			accessibilityLabel={`${props.movement.name}, ${paths.length} positions`}
			className={cn(
				"aspect-[3/2] w-full overflow-hidden rounded-2xl bg-default",
				props.className,
			)}
		>
			{/* The next frame sits under the current one, which fades out */}
			<Image
				source={{ uri: movementImageUrl(paths[next]) }}
				cachePolicy="memory-disk"
				contentFit="cover"
				className="absolute inset-0"
			/>
			<Animated.View style={{ position: "absolute", inset: 0, opacity }}>
				<Image
					source={{ uri: movementImageUrl(paths[index]) }}
					cachePolicy="memory-disk"
					contentFit="cover"
					className="h-full w-full"
				/>
			</Animated.View>
			{paths.length > 1 && (
				<View className="absolute bottom-2 right-2 flex-row gap-1">
					{paths.map((path, i) => (
						<View
							key={path}
							className={cn(
								"h-1.5 w-1.5 rounded-full",
								i === index ? "bg-white" : "bg-white/40",
							)}
						/>
					))}
				</View>
			)}
			{reduceMotion && paths.length > 1 && (
				<Text className="absolute bottom-2 left-3 text-xs text-white/80">
					Toucher pour la position suivante
				</Text>
			)}
		</Pressable>
	);
}
