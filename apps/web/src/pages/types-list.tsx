import { useEffect, useState } from "react";
import { ChevronLeft, PlusIcon } from "lucide-react";
import { Link } from "react-router-dom";

import fetchApi from "@/lib/api-handler";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import ExerciseTypeCard from "@/components/exercise-type-card";
import { Navbar } from "@/components/navbar";

export function TypesList() {
  const [exerciseType, setExerciseType] = useState([] as any[]);
  const [filteredExerciseType, setFilteredExerciseType] = useState([] as any[]);
  const [currentFilter, setCurrentFilter] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const skeletonLoaders = Array(5).fill(0);

  const fetchTypes = async () => {
    try {
      const response = await fetchApi("/api/exercise-type?limit=1000&sort=-updatedAt");
      setExerciseType(response);
      setFilteredExerciseType(response);
    } catch (error: any) {
      console.error("Fetch error: ", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTypes();
  }, []);

  const handleFilter = (typeSession: string | null) => {
    setCurrentFilter(typeSession);
    setFilteredExerciseType(
      typeSession ? exerciseType.filter((type) => type.type_session.includes(typeSession)) : exerciseType
    );
  };

  if (!isLoading && exerciseType.length === 0) {
    return (
      <div>
        <Navbar />
        <main className="container mx-auto my-0 flex h-dvh max-w-lg flex-col">
          <div className="flex flex-1 items-center justify-center">
            <div className="container flex flex-col items-center justify-center gap-4 px-4 md:px-6">
              <div className="text-center">
                <div className="flex flex-col items-center gap-5 text-sm text-gray-500 dark:text-gray-400">
                  <div>Aucun exercice.</div>
                  <Link to="/profile/type/new-type">
                    <Button className="w-full">Créer un exercice</Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <main className="container mx-auto my-0 flex h-dvh max-w-lg flex-col">
      <div className="flex items-center pt-5">
          <Link to="/profile">
            <Button variant="outline" size="icon">
              <ChevronLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <h1 className="ml-5 text-3xl font-medium">Mes exercices type</h1>
          </div>
        </div>
        <div className="pb-10">
          <div className="rounded-lg border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-950 dark:shadow-sm">
            <div className="mb-4 grid grid-cols-1 gap-4">
              <div className="mt-5 mb-4 flex flex-wrap justify-center gap-3">
                {["Tous", "Upper A", "Lower", "Upper B", "Séance A", "Séance B"].map((filter) => (
                  <Button
                    key={filter}
                    variant="secondary"
                    className={`w-1/4 border-2 border-transparent ${
                      currentFilter === filter ? "border-slate-400" : ""
                    } ${filter === "Tous" ? "" : ""}`}
                    onClick={() => handleFilter(filter === "Tous" ? null : filter)}
                  >
                    {filter}
                  </Button>
                ))}
              </div>
              <div className="flex justify-center">
                <Link
                  to="/profile/type/new-type"
                  className="my-2 flex h-14 w-full items-center justify-center gap-1 rounded-lg border-2 border-dotted bg-slate-50 text-gray-600 active:translate-y-0.5"
                >
                  <PlusIcon className="size-5" />
                  <div>Créer un exercice</div>
                </Link>
              </div>
              {isLoading ? (
                <div className="flex w-full flex-col items-center space-y-2">
                  {skeletonLoaders.map((_, index) => (
                    <Skeleton key={index} className="h-20 w-full rounded-lg" />
                  ))}
                </div>
              ) : (
                <div className="flex flex-col gap-4">
                  {filteredExerciseType.map((exerciseType: any) => (
                    <ExerciseTypeCard exerciseType={exerciseType} key={exerciseType._id} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default TypesList;
