import { ChevronRight, Edit } from "lucide-react"
import { Link } from "react-router-dom"

function ExerciseCard({ exercise }: { exercise: any }) {
  return (
    <Link
      className="relative my-2 flex w-11/12 justify-center rounded-2xl border  bg-slate-100 px-3 py-2 shadow-md active:translate-y-0.5 active:shadow-none dark:bg-slate-900 dark:bg-opacity-40 md:text-lg"
      to={`/history/exercise/${exercise._id}`}
    >
      <div className="">
        <p className="mb-2 text-center font-bold ">{exercise.type.name}</p>
        <div className="flex justify-center">
          <div className="flex gap-2">
            <div className="flex flex-col items-center gap-1">
              <p className="pb-1 text-sm text-gray-500 ">Série</p>
              <p className="flex items-center justify-center rounded-md bg-slate-200 bg-transparent px-3 py-1 font-mono text-sm text-gray-900 dark:text-white ">
                1
              </p>
              <p className="flex items-center justify-center rounded-md bg-slate-200 bg-transparent px-3 py-1 font-mono text-sm text-gray-900 dark:text-white ">
                2
              </p>
              <p className="flex items-center justify-center rounded-md bg-slate-200 bg-transparent px-3 py-1 font-mono text-sm text-gray-900 dark:text-white ">
                3
              </p>
              {exercise.rep[3] && (
                <p className="flex items-center justify-center rounded-md bg-slate-200 bg-transparent px-3 py-1 font-mono text-sm text-gray-900 dark:text-white ">
                  4
                </p>
              )}
            </div>
            <div className="flex flex-col items-center gap-1">
              <p className="pb-1 text-sm text-gray-500 ">Reps</p>
              <p className="text-md flex h-7 w-12 items-center justify-center font-bold ">{exercise.rep[0]}</p>
              <p className="text-md flex h-7 w-12 items-center justify-center font-bold">{exercise.rep[1]}</p>
              <p className="text-md flex h-7 w-12 items-center justify-center font-bold ">{exercise.rep[2]}</p>
              {exercise.rep[3] && (
                <p className="text-md flex h-7 w-12 items-center justify-center font-bold ">{exercise.rep[3]}</p>
              )}
            </div>

            <div className="flex flex-col items-center gap-1">
              <p className="pb-1 text-sm text-gray-500 ">KG</p>
              <p className="text-md flex h-7 w-12 items-center justify-center font-bold ">{exercise.weight[0]}</p>
              <p className="text-md flex h-7 w-12 items-center justify-center font-bold ">{exercise.weight[1]}</p>
              <p className="text-md flex h-7 w-12 items-center justify-center font-bold ">{exercise.weight[2]}</p>
              {exercise.rep[3] && (
                <p className="text-md flex h-7 w-12 items-center justify-center font-bold ">{exercise.weight[3]}</p>
              )}
            </div>
            <div className="flex flex-col items-center gap-1">
              <p className="pb-1 text-sm text-gray-500 ">{`[Range]`}</p>
              <p className="flex h-7 w-12 items-center justify-center text-sm italic text-gray-700 ">
                {exercise?.type.repRange1}
              </p>

              <p className="flex h-7 w-12 items-center justify-center text-sm italic text-gray-700 ">
                {exercise?.type.repRange2}
              </p>
              <p className="flex h-7 w-12 items-center justify-center text-sm italic text-gray-700 ">
                {exercise?.type.repRange3}
              </p>
              {exercise.rep[3] && (
                <p className="flex h-7 w-12 items-center justify-center text-sm italic text-gray-700 ">
                  {exercise?.type.repRange3}
                </p>
              )}
            </div>
          </div>
        </div>

        {exercise.comment && (
          <div className="flex pl-2 pt-2 text-gray-500 dark:text-gray-400">
            <div className="flex items-center gap-2 ">
              <Edit className="size-4 flex-shrink-0" /> <p className="text-sm ">{exercise.comment}</p>
            </div>
          </div>
        )}
      </div>
      <ChevronRight className="absolute right-2 top-2 my-auto" />
    </Link>
  )
}

export default ExerciseCard
