import { Text as RNText, type TextProps } from "react-native";

import { cn } from "@/lib/utils";

function Text(props: TextProps) {
	return (
		<RNText {...props} className={cn("text-foreground", props.className)} />
	);
}

export { Text };
