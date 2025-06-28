import { format } from "date-fns";
import { LucideLoader2 } from "lucide-react";
import { useEffect, useState } from "react";
import {
  Area,
  AreaChart,
  Label,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import fetchApi from "@/lib/api-handler";

function BodyWeightChart() {
  const [session, setSession] = useState([] as any[]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchUserSessions = async () => {
    try {
      const response = await fetchApi(
        "/api/sessions?limit=1000&sortBy=date_session:asc"
      );
      setSession(response);
    } catch (error) {
      console.error("Fetch error: ", error);
    } finally {
      setIsLoading(false);
    }
  };

  const formatXAxis = (tickFormat: string) => {
    const formattedDate = format(new Date(tickFormat), "dd/MM/yyyy");
    return formattedDate;
  };

  useEffect(() => {
    fetchUserSessions();
  }, []);
  return (
    <>
      {isLoading && (
        <main className="flex flex-1 items-center justify-center">
          <div className="container flex flex-col items-center justify-center p-20">
            <div className="">
              <LucideLoader2 className=" animate-spin" size={32} />
            </div>
          </div>
        </main>
      )}
      {session.length === 0 && !isLoading && (
        <div className="mt-5 text-center">
          <div>En attente de nouvelles séances...</div>
        </div>
      )}
      {session.length > 0 && (
        <ResponsiveContainer
          className="mt-4 rounded-xl border bg-slate-50 p-4"
          width="100%"
          height="80%"
        >
          <AreaChart
            data={session}
            margin={{
              top: 0,
              right: 0,
              left: 0,
              bottom: 0,
            }}
          >
            <defs>
              <linearGradient id="date_session" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#38b2ac" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#38b2ac" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="date_session"
              tickFormatter={(tick) => formatXAxis(tick)}
            />
            <YAxis name="Kg" domain={["auto", "dataMax + 5"]}>
              <Label
                style={{
                  textAnchor: "unset",
                  fontSize: "90%",
                  fill: "#666666",
                }}
                position={"insideTopRight"}
                value={"Poids (kg)"}
                dy={0}
                dx={15}
                fontWeight={"bold"}
                fontStretch={"ultra-condensed"}
              />
            </YAxis>
            <Tooltip
              labelFormatter={(value) => {
                return `Date: ${format(new Date(value), "dd/MM/yyyy")}`;
              }}
              animationEasing={"ease-out"}
            />

            <Area
              name="Poids"
              dot={false}
              type="monotone"
              dataKey="body_weight"
              stroke="#38b2ac"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#date_session)"
              activeDot={{ stroke: "white", strokeWidth: 2, r: 5 }}
            />
            <Legend wrapperStyle={{ fontSize: "15px" }} />
          </AreaChart>
        </ResponsiveContainer>
      )}
    </>
  );
}

export default BodyWeightChart;
