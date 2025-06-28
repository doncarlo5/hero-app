import { format } from "date-fns";
import {
  ArrowDown,
  ArrowRight,
  ArrowUp,
  MessageSquareText,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Navbar } from "@/components/navbar";
import NewSessionButton from "@/components/new-session-button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import fetchApi from "@/lib/api-handler";

export function HistoryPage() {
  const [tab, setTab] = useState("session");
  const [sessions, setSessions] = useState([] as any[]);
  const [exercises, setExercises] = useState([] as any[]);
  const [isLoadingSessions, setIsLoadingSessions] = useState(true); // Separate loading state for sessions
  const [isLoadingExercises, setIsLoadingExercises] = useState(true); // Separate loading state for exercises
  const [sortConfig, setSortConfig] = useState({
    field: "date_session",
    order: "desc",
  });

  const navigate = useNavigate();

  const fetchUserSessions = async () => {
    try {
      setIsLoadingSessions(true);
      const response = await fetchApi(
        `/api/sessions?limit=1000&sortBy=${sortConfig.field}:${sortConfig.order}`
      );
      setSessions(response);
    } catch (error: any) {
      console.error("Fetch error: ", error);
    } finally {
      setIsLoadingSessions(false);
    }
  };

  const fetchUserExercises = async () => {
    try {
      setIsLoadingExercises(true);
      const response = await fetchApi(
        "/api/exercise-user?limit=1000&sort=-updatedAt"
      );
      setExercises(response);
    } catch (error: any) {
      console.error("Fetch error: ", error);
    } finally {
      setIsLoadingExercises(false);
    }
  };

  useEffect(() => {
    fetchUserSessions();
    fetchUserExercises();
  }, [sortConfig]);

  const handleSort = (field: string) => {
    let order = "asc";
    if (sortConfig.field === field && sortConfig.order === "asc") {
      order = "desc";
    }
    setSortConfig({ field, order });
  };

  const getSortIcon = (field: string) => {
    if (sortConfig.field !== field) {
      return null;
    }
    return sortConfig.order === "asc" ? (
      <ArrowUp size={12} className="ml-1 inline-block" />
    ) : (
      <ArrowDown size={12} className="ml-1 inline-block" />
    );
  };

  return (
    <div>
      <Navbar />
      <main className="container mx-auto my-0 flex max-w-lg flex-col pb-20">
        <div className="pt-10">
          <h1 className="mb-5 text-4xl font-semibold tracking-tighter sm:text-5xl md:text-6xl/none">
            Mes séances
          </h1>
        </div>
        <Tabs value={tab} onValueChange={setTab}>
          <TabsList className="grid grid-cols-2">
            <TabsTrigger value="session">Séances</TabsTrigger>
            <TabsTrigger value="exercise">Exercices</TabsTrigger>
          </TabsList>
          <TabsContent value="session">
            <>
              <Table>
                <TableCaption>Total de {sessions.length} séances.</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead></TableHead>
                    <TableHead></TableHead>
                    <TableHead
                      onClick={() => handleSort("date_session")}
                      className="cursor-pointer"
                    >
                      Date {getSortIcon("date_session")}
                    </TableHead>
                    <TableHead
                      onClick={() => handleSort("type_session")}
                      className="cursor-pointer text-center"
                    >
                      Type {getSortIcon("type_session")}
                    </TableHead>
                    <TableHead className="text-center">Exos</TableHead>
                    <TableHead></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {isLoadingSessions ? (
                    // Show skeletons while loading
                    Array.from({ length: 15 }).map((_, index) => (
                      <TableRow key={index}>
                        <TableCell colSpan={6}>
                          <Skeleton className="h-6 w-full rounded-lg" />
                        </TableCell>
                      </TableRow>
                    ))
                  ) : sessions.length === 0 && !isLoadingSessions ? (
                    // Show no sessions message only after loading is finished and no data
                    <TableRow>
                      <TableCell colSpan={6} className="text-center">
                        Aucune séance.
                      </TableCell>
                    </TableRow>
                  ) : (
                    sessions.map((oneSession) => (
                      <TableRow
                        key={oneSession._id}
                        className="group cursor-pointer"
                        onClick={() =>
                          navigate(`/history/session/${oneSession._id}`)
                        }
                      >
                        <TableCell>
                          <div
                            className={`h-2.5 w-2.5 rounded-full ${oneSession.is_done ? "bg-green-500" : "bg-orange-500"}`}
                          ></div>
                        </TableCell>
                        <TableCell>
                          <div>
                            {oneSession.comment ? (
                              <MessageSquareText size={16} />
                            ) : (
                              <MessageSquareText
                                className="text-slate-200"
                                size={16}
                              />
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          {format(
                            new Date(oneSession.date_session),
                            "dd/MM/yyyy"
                          )}
                        </TableCell>
                        <TableCell className="text-center">
                          <Badge
                            variant={
                              oneSession.type_session === "Upper A"
                                ? "upperA"
                                : oneSession.type_session === "Upper B"
                                  ? "upperB"
                                  : oneSession.type_session === "Lower"
                                    ? "lower"
                                    : oneSession.type_session === "Séance A"
                                      ? "seanceA"
                                      : oneSession.type_session === "Séance B"
                                        ? "seanceB"
                                        : "default"
                            }
                          >
                            {oneSession.type_session}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-center">
                          {oneSession.exercise_user_list.length}
                        </TableCell>
                        <TableCell className="items-center justify-center">
                          <ArrowRight
                            className="text-slate-300 group-hover:text-slate-900"
                            size={18}
                          />
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </>
          </TabsContent>
          <TabsContent value="exercise">
            {isLoadingExercises ? (
              Array.from({ length: 7 }).map((_, index) => (
                <div key={index} className="my-2">
                  <Skeleton className="h-10 w-full rounded-lg" />
                </div>
              ))
            ) : exercises.length === 0 && !isLoadingExercises ? (
              <div className="flex flex-1 items-center justify-center">
                <div className="container flex flex-col items-center justify-center gap-4 px-4 md:px-6">
                  <div className="text-center">
                    <p className="max-w-[600px] py-5 text-gray-500 dark:text-gray-400 md:text-xl">
                      Aucun exercice.
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <>
                <Table>
                  <TableCaption>{exercises.length} exercices.</TableCaption>
                  <TableHeader>
                    <TableRow>
                      <TableHead></TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Nom</TableHead>
                      <TableHead>Série</TableHead>
                      <TableHead></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {exercises.map((exercise) => (
                      <TableRow
                        key={exercise._id}
                        className="group cursor-pointer"
                        onClick={() =>
                          navigate(`/history/exercise/${exercise._id}`)
                        }
                      >
                        <TableCell>
                          <div>
                            {exercise.comment ? (
                              <MessageSquareText size={16} />
                            ) : (
                              <MessageSquareText
                                className="text-slate-200"
                                size={16}
                              />
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          {format(
                            new Date(exercise.session.date_session),
                            "dd/MM/yyyy"
                          )}
                        </TableCell>
                        <TableCell>{exercise.type?.name}</TableCell>
                        <TableCell>
                          {exercise.rep[0]}x{exercise.weight[0]}
                          <br />
                          {exercise.rep[1]}x{exercise.weight[1]}
                          <br />
                          {exercise.rep[2]}x{exercise.weight[2]}
                        </TableCell>
                        <TableCell className="items-center justify-center">
                          <ArrowRight
                            className="text-slate-300 group-hover:text-slate-900"
                            size={18}
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </>
            )}
          </TabsContent>
        </Tabs>
        <NewSessionButton />
      </main>
    </div>
  );
}

export default HistoryPage;
