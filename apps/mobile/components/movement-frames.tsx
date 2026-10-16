import { Image as ExpoImage } from "expo-image";
import { useEffect, useState } from "react";
import { AccessibilityInfo, Animated, Pressable, View } from "react-native";

import { Image } from "@/components/image";
import { Text } from "@/components/ui/text";
import { movementImageUrl } from "@/lib/queries/movements";
import type { Movement } from "@/lib/queries/types";
import { cn } from "@/lib/utils";

const FRAME_MS = 1200;
const FADE_MS = 300;

// A library movement's photos (start and end positions) played as a short loop. Every frame is its own
// image layer with its own opacity, so a fade never swaps an image source mid-animation (no flash). The
// loop starts once the frames are cached; with reduced motion it stays still and a tap shows the next.
// Keyed by the caller on the movement id, so the frame index never carries over to another movement.
export function MovementFrames(props: {
	movement: Movement;
	className?: string;
}) {
	const paths = props.movement.image_paths;
	const [index, setIndex] = useState(0);
	const [ready, setReady] = useState(false);
	const [reduceMotion, setReduceMotion] = useState(false);
	// One animated opacity per frame, for the component's life
	const [opacities] = useState(() =>
		paths.map((_, i) => new Animated.Value(i === 0 ? 1 : 0)),
	);

	const showFrame = (to: number, animate: boolean) => {
		const from = index;
		if (to === from) return;
		if (!animate) {
			opacities[from].setValue(0);
			opacities[to].setValue(1);
			setIndex(to);
			return;
		}
		Animated.parallel([
			Animated.timing(opacities[from], {
				toValue: 0,
				duration: FADE_MS,
				useNativeDriver: true,
			}),
			Animated.timing(opacities[to], {
				toValue: 1,
				duration: FADE_MS,
				useNativeDriver: true,
			}),
		]).start();
		setIndex(to);
	};

	useEffect(() => {
		AccessibilityInfo.isReduceMotionEnabled().then(setReduceMotion);
		const subscription = AccessibilityInfo.addEventListener(
			"reduceMotionChanged",
			setReduceMotion,
		);
		return () => subscription.remove();
	}, []);

	// Fetch every frame first, so a fade never reveals an empty background
	useEffect(() => {
		let cancelled = false;
		ExpoImage.prefetch(paths.map(movementImageUrl), "memory-disk")
			.catch(() => false)
			.then(() => !cancelled && setReady(true));
		return () => {
			cancelled = true;
		};
	}, [paths.join()]);

	useEffect(() => {
		if (paths.length < 2 || reduceMotion || !ready) return;
		const timer = setTimeout(
			() => showFrame((index + 1) % paths.length, true),
			FRAME_MS,
		);
		return () => clearTimeout(timer);
	}, [index, paths.length, reduceMotion, ready]);

	if (paths.length === 0) return null;

	const canStep = reduceMotion && paths.length > 1;

	return (
		<Pressable
			disabled={!canStep}
			onPress={() => showFrame((index + 1) % paths.length, false)}
			accessibilityRole={canStep ? "button" : "image"}
			accessibilityLabel={`${props.movement.name}, position ${index + 1} sur ${paths.length}`}
			accessibilityHint={canStep ? "Affiche la position suivante" : undefined}
			className={cn(
				"aspect-[3/2] w-full overflow-hidden rounded-2xl bg-default",
				props.className,
			)}
		>
			{paths.map((path, i) => (
				<Animated.View
					key={path}
					style={{ position: "absolute", inset: 0, opacity: opacities[i] }}
				>
					<Image
						source={{ uri: movementImageUrl(path) }}
						cachePolicy="memory-disk"
						contentFit="cover"
						className="h-full w-full"
					/>
				</Animated.View>
			))}
			{/* Dark pill: the source photos mostly have light backgrounds */}
			{paths.length > 1 && (
				<View className="absolute bottom-2 right-2 flex-row gap-1 rounded-full bg-black/50 px-2 py-1">
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
			{canStep && (
				<View className="absolute bottom-2 left-2 rounded-full bg-black/50 px-2 py-1">
					<Text className="text-xs text-white">
						Toucher : position suivante
					</Text>
				</View>
			)}
		</Pressable>
	);
}
