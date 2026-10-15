import { Text } from "react-native";

import { cn } from "@/lib/utils";

const PALETTE = [
	"bg-blue-200/30 text-blue-600 border border-blue-200/10 dark:border-blue-700 dark:bg-blue-800/20 dark:text-blue-200",
	"bg-green-600/10 text-green-700 border border-green-200/10 dark:border-green-700 dark:bg-green-800/50 dark:text-green-200",
	"bg-violet-400/20 text-violet-500 border border-violet-100/10 dark:border-violet-700 dark:bg-violet-600/50 dark:text-violet-200",
	"bg-amber-400/20 text-amber-700 border border-amber-100/10 dark:border-amber-700 dark:bg-amber-700/40 dark:text-amber-200",
	"bg-rose-400/20 text-rose-600 border border-rose-100/10 dark:border-rose-700 dark:bg-rose-700/40 dark:text-rose-200",
];
const NEUTRAL =
	"bg-gray-200/50 text-gray-800 border border-gray-200/50 dark:border-gray-700 dark:bg-gray-700 dark:text-gray-200";

// Same label, same color: day names are free text, so the color comes from the name
function colorFor(label: string) {
	let hash = 0;
	for (const char of label) hash = (hash * 31 + char.charCodeAt(0)) | 0;
	return PALETTE[Math.abs(hash) % PALETTE.length];
}

/** Badge of a session's day name; a free session (no day) is neutral */
export function TypeSessionBadge(props: { label: string | null }) {
	return (
		<Text
			className={cn(
				"mr-3 px-2 py-1 rounded-md font-medium text-xs",
				props.label ? colorFor(props.label) : NEUTRAL,
			)}
		>
			{props.label ?? "Libre"}
		</Text>
	);
}
