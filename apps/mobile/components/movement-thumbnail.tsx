import { DumbbellIcon } from "lucide-react-native";
import { View } from "react-native";

import { Image } from "@/components/image";
import { movementImageUrl } from "@/lib/queries/movements";
import type { Movement } from "@/lib/queries/types";
import { useThemeColors } from "@/lib/theme";
import { cn } from "@/lib/utils";

// First image of a library movement; an icon for movements without one
export function MovementThumbnail(props: {
	movement: Movement;
	className?: string;
}) {
	const themeColors = useThemeColors();
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
			source={{ uri: movementImageUrl(path) }}
			contentFit="cover"
			transition={150}
			recyclingKey={path}
			className={cn("h-12 w-12 rounded-md bg-default", props.className)}
		/>
	);
}
