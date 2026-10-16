import { Text as RNText, type TextProps } from "react-native";

import { cn } from "@/lib/utils";

function H1(props: TextProps) {
	return (
		<RNText
			role="heading"
			aria-level={1}
			{...props}
			className={cn(
				"text-4xl text-foreground font-extrabold tracking-tight",
				props.className,
			)}
		/>
	);
}

function Muted(props: TextProps) {
	return (
		<RNText {...props} className={cn("text-sm text-muted", props.className)} />
	);
}

export { H1, Muted };
