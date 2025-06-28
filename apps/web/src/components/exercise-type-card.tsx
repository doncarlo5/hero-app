import { LucideClock4, LucideInfo } from "lucide-react";
import { Link } from "react-router-dom";

import { Badge } from "./ui/badge";
import { Card } from "./ui/card";

function ExerciseTypeCard({ exerciseType }: { exerciseType: any }) {
  return (
    <Link to={`/profile/type/${exerciseType._id}`}>
      <Card className="flex h-full flex-col border-2 border-double active:translate-y-0.5">
        <div className=" flex justify-between">
          <div className="ml-1 mt-1 flex items-center gap-1">
            {/* <LucideTag fill="#cbd5e1" size={13} className="text-gray-500 dark:text-gray-400" /> */}
            {exerciseType.type_session.map((session: string) => (
              <Badge
                key={session}
                variant={
                  session === "Upper A"
                    ? "upperA"
                    : session === "Upper B"
                      ? "upperB"
                      : session === "Lower"
                        ? "lower"
                        : session === "Séance A"
                          ? "seanceA"
                          : session === "Séance B"
                            ? "seanceB"
                            : "default"
                }
              >
                {session}
              </Badge>
            ))}
            {/* <span className=" text-sm font-medium ">{exerciseType.type_session.join(" & ")}</span> */}
          </div>
          <div className="mr-1 mt-1 flex items-center gap-1 rounded-sm rounded-tr-lg border px-2">
            <LucideClock4
              fill="#e8ecf2"
              size={13}
              className="text-gray-500 dark:text-gray-400"
            />
            <span className=" text-sm font-medium ">{exerciseType.timer}</span>
          </div>
        </div>
        <div className="flex flex-col justify-center  px-3 py-2 ">
          <div className=" text-lg font-bold 	">{exerciseType.name}</div>
          {exerciseType?.advice && (
            <>
              <div className="my-1 flex w-full rounded-full border border-gray-200 dark:border-gray-800"></div>
              <div className="flex w-full items-center gap-1 text-gray-500 dark:text-gray-400">
                <LucideInfo className=" flex-none" size={12} />
                <div className=" truncate text-left text-xs">
                  {exerciseType.advice}
                </div>
              </div>
            </>
          )}
        </div>
      </Card>
    </Link>
  );
}

export default ExerciseTypeCard;
