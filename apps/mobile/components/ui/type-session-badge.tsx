import { cn } from "@/lib/utils";
import { Text } from "react-native";

type TypeSessionBadgeProps = {
	type_session: string;
};

export const TypeSessionBadge: React.FC<TypeSessionBadgeProps> = ({
	type_session,
}) => {
	const getBadgeStyle = (type: string) => {
		switch (type) {
			case "Upper A":
				return "bg-blue-200/30 text-blue-600 border border-blue-200/10 dark:border-blue-700 dark:bg-blue-800/20 dark:text-blue-200";
			case "Upper B":
				return "bg-violet-400/20 text-violet-500 border border-violet-100/10 dark:border-violet-700 dark:bg-violet-600/50 dark:text-violet-200";
			case "Lower":
				return "bg-green-600/10 text-green-700 border border-green-200/10 dark:border-green-700 dark:bg-green-800/50 dark:text-green-200";
			case "Séance A":
				return "bg-gray-200/30 border border-gray-300/50 dark:border-gray-700/50 text-gray-700 dark:bg-gray-800/20 dark:text-gray-200";
			case "Séance B":
				return "bg-gray-200/30 border border-gray-300/50 dark:border-gray-700/50 text-gray-700 dark:bg-gray-800/20 dark:text-gray-200";
			default:
				return "bg-gray-200/50 text-gray-800 border border-gray-200/50 dark:border-gray-700 dark:bg-gray-700 dark:text-gray-200";
		}
	};

	return (
		<Text
			className={cn(
				"mr-3 px-2 py-1 rounded-md font-medium text-xs",
				getBadgeStyle(type_session),
			)}
		>
			{type_session}
		</Text>
	);
};
