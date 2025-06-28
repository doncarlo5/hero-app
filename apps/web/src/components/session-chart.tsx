import {
  eachWeekOfInterval,
  endOfWeek,
  format,
  startOfWeek,
  subWeeks,
} from "date-fns";
import { useEffect, useState } from "react";
import {
  Label,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import fetchApi from "@/lib/api-handler";

function SessionChart() {
  const [sessions, setSessions] = useState([] as any[]);
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([] as any[]);

  // Fetch all sessions from the last 4 weeks excluding the current week
  const fetchLastFourWeeksSessions = async () => {
    try {
      const response = await fetchApi(
        `/api/sessions?limit=1000&sortBy=createdAt:desc&lastFourWeeks`
      );
      return response;
    } catch (error) {
      console.error("Fetch error: ", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Prepare the data for the chart
  const prepareChartData = (sessions: any[]) => {
    const now = new Date();
    const startOfCurrentWeek = startOfWeek(now, { weekStartsOn: 1 }); // Start of the current week
    const fourWeeksAgo = subWeeks(startOfCurrentWeek, 4); // 4 weeks ago (exclude current week)

    // Generate an array of the last 4 weeks excluding the current week
    const weeks = eachWeekOfInterval(
      {
        start: fourWeeksAgo,
        end: subWeeks(now, 1), // Exclude current week
      },
      { weekStartsOn: 1 }
    );

    // Create an object to store the session count per week
    const sessionCountByWeek = weeks.map((weekStart) => {
      const weekEnd = endOfWeek(weekStart, { weekStartsOn: 1 });

      // Count the number of sessions in this week
      const sessionCount = sessions.filter((session) => {
        const sessionDate = new Date(session.date_session);
        return sessionDate >= weekStart && sessionDate <= weekEnd;
      }).length;

      return {
        week: format(weekStart, "d-MMM"), // Format the start of the week as "1-Sep" or "3-Sep"
        sessionCount: sessionCount,
      };
    });

    setData(sessionCountByWeek);
  };

  useEffect(() => {
    const init = async () => {
      setIsLoading(true);
      const sessionData = await fetchLastFourWeeksSessions();

      if (sessionData && sessionData.length > 0) {
        setSessions(sessionData);
        prepareChartData(sessionData);
      } else {
        setSessions([]);
      }

      setIsLoading(false);
    };

    init();
  }, []);

  return (
    <>
      {isLoading && (
        <main className="flex flex-1 items-center justify-center"></main>
      )}

      {!isLoading && data.length > 0 && (
        <ResponsiveContainer className="" width="100%" height="100%">
          <LineChart
            width={0}
            data={data}
            margin={{
              top: 10,
              right: 5, // Add padding to right side
              left: 5, // Add padding to left side
              bottom: 0,
            }}
          >
            <defs>
              <linearGradient id="lineGradient" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#38b2ac" />
                <stop offset="100%" stopColor="#4fd1c5" />
              </linearGradient>
            </defs>

            <XAxis
              dataKey="week"
              axisLine={false} // Make X axis line transparent
              tickLine={false} // Remove X axis ticks
              tickFormatter={(tick) => tick}
              fontSize={14}
              interval={0} // Show all weeks
              padding={{ left: 20, right: 20 }}
            />
            <YAxis
              name="Sessions"
              domain={[0, "auto + 2"]} // Add padding to top of Y-axis
              axisLine={false} // Make Y axis line transparent
              tickLine={false} // Remove Y axis ticks
              tick={false} // Hide Y axis numbers
              width={0}
            >
              <Label
                style={{
                  textAnchor: "unset",
                  fontSize: "90%",
                  fill: "#666666",
                }}
                position={"top"}
                dy={-2}
                dx={1}
              />
            </YAxis>

            <Tooltip
              labelFormatter={(value) => `Semaine: ${value}`}
              cursor={{ stroke: "transparent", strokeWidth: 0 }}
              formatter={(value: number) => [`${value} Séances`]}
            />

            <Line
              name="Number of Sessions"
              dot={false}
              type="monotone"
              dataKey="sessionCount"
              stroke="url(#lineGradient)" // Apply the gradient to the line
              strokeWidth={6}
              strokeLinecap="round"
              activeDot={{ stroke: "white", strokeWidth: 2, r: 7 }}
            />
          </LineChart>
        </ResponsiveContainer>
      )}

      {sessions.length === 0 && !isLoading && (
        <div className="text-center text-gray-500">
          <div>En attentes de nouvelles séances...</div>
        </div>
      )}
    </>
  );
}

export default SessionChart;
