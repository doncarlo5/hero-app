import { addDays, isSameDay, startOfWeek, subDays } from "date-fns";
import { Circle, CircleDashed } from "lucide-react-native";
import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import PagerView from "react-native-pager-view";
import Animated, {
	interpolate,
	useAnimatedStyle,
	useSharedValue,
	withSpring,
} from "react-native-reanimated";

import { fetchApi } from "@/lib/api-handler";

interface SessionType {
	_id: string;
	date_session: string;
	type_session: string;
	is_done: boolean;
}

const WeekActivityCarousel = () => {
	const [sessions, setSessions] = useState<SessionType[]>([]);
	const [isLoading, setIsLoading] = useState(false);
	const [currentPage, setCurrentPage] = useState(2);
	const pagerRef = React.useRef<PagerView>(null);

	const fetchSessions = async () => {
		try {
			setIsLoading(true);
			const response = await fetchApi(`/api/sessions/last-31-days`);
			setSessions(response);
			console.log("last-31-days", response);
		} catch (error) {
			console.error("Error fetching sessions", error);
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		fetchSessions();
	}, []);

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

		return (
			<Animated.View
				style={[
					{
						width: 8,
						height: 8,
						borderRadius: 4,
						backgroundColor:
							currentPage === index ? "rgb(20 184 166)" : "rgb(209 213 219)",
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
							<View className="h-6 w-6 rounded-full bg-gray-200 mb-1" />
							<View className="h-4 w-4 bg-gray-200" />
						</View>
					))}
				</View>
				<View className="mt-4 flex-row justify-center gap-2">
					{[0, 1, 2].map((index) => (
						<View
							key={index}
							className="h-2 w-2 rounded-full bg-gray-200"
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

	return (
		<View>
			<PagerView
				ref={pagerRef}
				style={{ height: 40 }}
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
												fill="rgba(20, 184, 166, 0.5)"
												color="rgb(20, 184, 166)"
												strokeWidth={2}
												className="mb-1"
											/>
										) : (
											<CircleDashed
												size={24}
												color="rgb(209 213 219)"
												strokeWidth={1}
												className="mb-1"
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
