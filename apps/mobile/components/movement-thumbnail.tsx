import { DumbbellIcon } from "lucide-react-native";
import { useState } from "react";
import { View } from "react-native";

import { Image } from "@/components/image";
import { thumbnailPath } from "@/lib/movement-library";
import { movementImageUrl } from "@/lib/queries/movements";
import type { Movement } from "@/lib/queries/types";
import { useThemeColors } from "@/lib/theme";
import { cn } from "@/lib/utils";

// Small square of a library movement, from its WebP thumbnail (a few KB), falling back to the full first
// image when the thumbnail is missing; an icon for movements without an image
export function MovementThumbnail(props: {
	movement: Movement;
	className?: string;
}) {
	const themeColors = useThemeColors();
	// The image whose thumbnail failed: a reused component shows the next movement's thumbnail again
	const [failedPath, setFailedPath] = useState<string | null>(null);
	const path = props.movement.image_paths[0];

	if (!path) {
		return (
			<View
				className={cn(
					"h-12 w-12 items-center justify-center rounded-md bg-default",
					props.className,
				)}
			>
				<DumbbellIcon size={20} color={themeColors.mutedForeground} />
			</View>
		);
	}

	return (
		<Image
			source={{
				uri: movementImageUrl(failedPath === path ? path : thumbnailPath(path)),
			}}
			onError={() => setFailedPath(path)}
			contentFit="cover"
			transition={150}
			// Paths never change (pinned source commit): keep them in memory and on disk
			cachePolicy="memory-disk"
			recyclingKey={path}
			accessibilityLabel={`${props.movement.name}, illustration`}
			className={cn("h-12 w-12 rounded-md bg-default", props.className)}
		/>
	);
}
