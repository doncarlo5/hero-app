import { format } from "date-fns";
import { LucideLoader2 } from "lucide-react";
import { useEffect, useState } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Label,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import fetchApi from "@/lib/api-handler";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

function ExerciseChart() {
  const [exercise, setExercise] = useState([] as any[]);
  const [allExerciseTypes, setAllExerciseTypes] = useState([] as any[]);
  const [selectedExerciseType, setSelectedExerciseType] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchAllExerciseTypes = async () => {
    try {
      const response = await fetchApi(`/api/exercise-type?limit=1000`);
      return response;
    } catch (error) {
      console.error("Fetch error: ", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const init = async () => {
      setIsLoading(true);
      const exerciseTypeData = await fetchAllExerciseTypes();
      setAllExerciseTypes(exerciseTypeData);

      if (exerciseTypeData.length > 0) {
        const defaultExerciseType = exerciseTypeData[29] || exerciseTypeData[0];
        setSelectedExerciseType(defaultExerciseType);
        await AllExercisesTypeChange(defaultExerciseType);
      } else {
        setSelectedExerciseType(null);
        setExercise([]);
      }

      setIsLoading(false);
    };

    init();
  }, []);

  const AllExercisesTypeChange = async (value: any) => {
    const response = await fetchApi(
      `/api/exercise-user?limit=1000&sort=createdAt&type=${value._id}`
    );
    setExercise(response);
    setSelectedExerciseType(value);
    return response;
  };

  const formatXAxis = (tickFormat: string) => {
    const formattedDate = format(new Date(tickFormat), "dd/MM/yyyy");
    return formattedDate;
  };

  const values = exercise.map((obj) => {
    return obj.pv;
  });
  const min = Math.min(...values);
  const max = Math.max(...values);

  const domain = [
    Math.floor(min / 100) * 100 - 100,
    Math.ceil(max / 100) * 100 + 100,
  ];

  return (
    <>
      <Select
        onValueChange={AllExercisesTypeChange}
        value={selectedExerciseType}
      >
        <SelectTrigger className="w-full data-[placeholder]:italic data-[placeholder]:text-gray-700">
          <SelectValue className="" placeholder="Sélectionne un exercice...">
            {selectedExerciseType
              ? selectedExerciseType.name
              : "Sélectionne un exercice..."}
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {allExerciseTypes.map((type) => (
              <SelectItem key={type._id} value={type}>
                {type.name}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>

      {isLoading && (
        <main className="flex flex-1 items-center justify-center">
          <div className="container flex flex-col items-center justify-center p-20">
            <div className="">
              <LucideLoader2 className=" animate-spin" size={32} />
            </div>
          </div>
        </main>
      )}

      {exercise.length > 0 && (
        <ResponsiveContainer
          className="mt-4 rounded-xl border bg-slate-50 p-4"
          width="100%"
          height="70%"
        >
          <AreaChart
            width={0}
            data={exercise}
            margin={{
              top: 0,
              right: 0,
              left: 0,
              bottom: 0,
            }}
          >
            <defs>
              <linearGradient id="date_session" x1="0" y1="0" x2="0" y2="1">
                {/* <stop offset="5%" stopColor="#38b2ac" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#38b2ac" stopOpacity={0} /> */}
              </linearGradient>
            </defs>
            <XAxis
              dataKey="session.date_session"
              tickFormatter={(tick) => formatXAxis(tick)}
            />
            <CartesianGrid strokeDasharray="3 3" />

            {/* <YAxis name="Weight" width={50} domain={["dataMin - 10", "dataMax + 10"]}> */}
            <YAxis name="Weight" width={50} domain={domain}>
              <Label
                style={{
                  textAnchor: "unset",
                  fontSize: "90%",
                  fill: "#666666",
                }}
                position={"insideTopRight"}
                value={"Charge (kg)"}
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
              name="Série 1"
              dot={false}
              type="monotone"
              dataKey="weight[0]"
              fill="url(#date_session)" // Use the gradient fill
              stroke="#AC38B2" // You can set stroke color separately if needed
              strokeWidth={2}
              fillOpacity={1}
              activeDot={{ stroke: "white", strokeWidth: 2, r: 5 }}
            />
            <Area
              name="Série 2"
              dot={false}
              type="monotone"
              dataKey="weight[1]"
              fill="url(#date_session)" // Use the gradient fill
              stroke="#B2AC38" // You can set stroke color separately if needed
              strokeWidth={2}
              fillOpacity={1}
              activeDot={{ stroke: "white", strokeWidth: 2, r: 5 }}
            />
            <Area
              name="Série 3"
              dot={false}
              type="monotone"
              dataKey="weight[2]"
              fill="url(#date_session)" // Use the gradient fill
              stroke="#38B2AC" // You can set stroke color separately if needed
              strokeWidth={2}
              fillOpacity={1}
              activeDot={{ stroke: "white", strokeWidth: 2, r: 5 }}
            />
            <Legend wrapperStyle={{ fontSize: "15px" }} />
          </AreaChart>
        </ResponsiveContainer>
      )}
      {exercise.length === 0 && !isLoading && (
        <div className="mt-4 text-center text-gray-500">
          <div>Il n'y a pas de données pour cet exercice.</div>
        </div>
      )}
    </>
  );
}

export default ExerciseChart;
