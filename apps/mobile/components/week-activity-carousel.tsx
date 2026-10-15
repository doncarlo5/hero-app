import { addDays, isSameDay, startOfWeek, subDays } from "date-fns";
import { Circle, CircleDashed } from "lucide-react-native";
import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import PagerView, { type PagerViewRef } from "@expo/ui/community/pager-view";
import Animated, {
	interpolate,
	useAnimatedStyle,
	useSharedValue,
	withSpring,
} from "react-native-reanimated";

import { useRecentSessions } from "@/lib/queries/sessions";
import { useColorScheme } from "@/lib/useColorScheme";

const WeekActivityCarousel = () => {
	const { isDarkColorScheme } = useColorScheme();
	const recentSessions = useRecentSessions(31);
	const [currentPage, setCurrentPage] = useState(2);
	const pagerRef = React.useRef<PagerViewRef>(null);
	const sessions = recentSessions.data ?? [];
	const isLoading = recentSessions.isLoading;

	const getWeeks = () => {
		const today = new Date();
		const currentWeekStart = startOfWeek(today, { weekStartsOn: 1 }); // Start on Monday
		return [2, 1, 0].map((weekOffset) => {
			const weekStart = subDays(currentWeekStart, 7 * weekOffset);
			return Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));
		});
	};

	const hasSessionOnDay = (date: Date) => {
		return sessions.some((session) =>
			isSameDay(new Date(session.date_session), date),
		);
	};

	const weeks = getWeeks();
	const daysOfWeek = ["L", "M", "M", "J", "V", "S", "D"]; // French abbreviations

	const PaginationDot = ({ index }: { index: number }) => {
		const animatedValue = useSharedValue(0);

		useEffect(() => {
			animatedValue.value = withSpring(currentPage === index ? 1 : 0);
		}, [currentPage, index]);

		const animatedStyle = useAnimatedStyle(() => {
			const scale = interpolate(animatedValue.value, [0, 1], [1, 1.2]);
			const opacity = interpolate(animatedValue.value, [0, 1], [0.3, 1]);

			return {
				transform: [{ scale }],
				opacity,
			};
		});

		// Define colors based on color scheme
		const activeColor = isDarkColorScheme
			? "rgb(45 212 191)"
			: "rgb(20 184 166)"; // teal-400 : teal-500
		const inactiveColor = isDarkColorScheme
			? "rgb(71 85 105)"
			: "rgb(209 213 219)"; // slate-600 : gray-300

		return (
			<Animated.View
				style={[
					{
						width: 8,
						height: 8,
						borderRadius: 4,
						backgroundColor:
							currentPage === index ? activeColor : inactiveColor,
						marginHorizontal: 4,
					},
					animatedStyle,
				]}
			/>
		);
	};

	const renderSkeletonLoader = () => {
		return (
			<View className="py-4">
				<View className="flex-row justify-between">
					{[0, 1, 2, 3, 4, 5, 6].map((day) => (
						<View key={day} className="items-center">
							<View className="h-6 w-6 rounded-full bg-gray-200 dark:bg-slate-700 mb-1" />
							<View className="h-4 w-4 bg-gray-200 dark:bg-slate-700" />
						</View>
					))}
				</View>
				<View className="mt-4 flex-row justify-center gap-2">
					{[0, 1, 2].map((index) => (
						<View
							key={index}
							className="h-2 w-2 rounded-full bg-gray-200 dark:bg-slate-700"
							style={{ marginHorizontal: 4 }}
						/>
					))}
				</View>
			</View>
		);
	};

	if (isLoading) {
		return renderSkeletonLoader();
	}

	// Define colors based on color scheme
	const activeFillColor = isDarkColorScheme
		? "rgba(45, 212, 191, 0.3)" // teal-400 with opacity
		: "rgba(20, 184, 166, 0.4)"; // teal-500 with opacity
	const activeStrokeColor = isDarkColorScheme
		? "rgb(45 212 191)" // teal-400
		: "rgb(20 184 166)"; // teal-500
	const inactiveStrokeColor = isDarkColorScheme
		? "rgb(71 85 105)" // slate-600
		: "rgb(209 213 219)"; // gray-300

	return (
		<View>
			<PagerView
				ref={pagerRef}
				style={{ height: 56 }}
				initialPage={2}
				onPageSelected={(e) => setCurrentPage(e.nativeEvent.position)}
			>
				{weeks.map((week, weekIndex) => (
					<View key={weekIndex}>
						<View className="flex-row justify-around">
							{week.map((date, dayIndex) => {
								const isActive = hasSessionOnDay(date);

								return (
									<View key={dayIndex} className="items-center">
										{isActive ? (
											<Circle
												size={24}
												fill={activeFillColor}
												color={activeStrokeColor}
												strokeWidth={2}
												style={{ marginBottom: 4 }}
											/>
										) : (
											<CircleDashed
												size={24}
												color={inactiveStrokeColor}
												strokeWidth={1}
												style={{ marginBottom: 4 }}
											/>
										)}
										<Text className="text-sm text-gray-700 dark:text-gray-300">
											{daysOfWeek[dayIndex]}
										</Text>
									</View>
								);
							})}
						</View>
					</View>
				))}
			</PagerView>

			<View className="mt-3 flex-row justify-center">
				{[0, 1, 2].map((index) => (
					<PaginationDot key={index} index={index} />
				))}
			</View>
		</View>
	);
};

export default WeekActivityCarousel;
