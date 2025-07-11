import { format } from "date-fns";
import {
  LucideArrowRightCircle,
  LucideMessageSquareText,
  LucideTrash2,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { Navbar } from "@/components/navbar";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import fetchApi from "@/lib/api-handler";

export function ExercicesList() {
  const [exercise, setExercise] = useState([] as any[]);

  const fetchUserExercises = async () => {
    try {
      const response = await fetchApi(
        "/api/exercise-user?limit=1000&sort=-updatedAt"
      );
      setExercise(response);
    } catch (error: any) {
      console.error("Fetch error: ", error);
    }
  };

  useEffect(() => {
    fetchUserExercises();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      await fetchApi(`/api/exercise-user/${id}`, {
        method: "DELETE",
      });
      fetchUserExercises();
    } catch (error: any) {
      console.error("Fetch error: ", error);
    }
  };

  const formatDate = (dateString: string) => {
    if (!dateString) {
      return "";
    }
    return format(dateString, "dd/MM/yyyy");
  };

  return (
    <div className="">
      <Navbar />
      {exercise.length !== 0 && (
        <main className="container mx-auto my-0 flex h-dvh max-w-md flex-col">
          <div className="space-y-2 text-center">
            <h1 className="mb-5 mt-5 text-3xl font-medium">Mes exercices</h1>
          </div>
          <div>
            <Table>
              <TableCaption>Liste de tes exercices passés</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead></TableHead>
                  <TableHead></TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Nom</TableHead>
                  <TableHead>Série 1</TableHead>
                  <TableHead>Série 2</TableHead>
                  <TableHead>Série 3</TableHead>

                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {exercise.map((exercise) => (
                  <TableRow className=" group" key={exercise._id}>
                    <TableCell>
                      <AlertDialog>
                        <AlertDialogTrigger asChild className="">
                          <Button className="" variant="ghost">
                            <LucideTrash2 size={15} />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>
                              Supprimer cet exercice ?
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                              Tu ne pourras pas récupérer cet exercice une fois
                              supprimé.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Conserver</AlertDialogCancel>
                            <AlertDialogAction
                              variant="destructive"
                              asChild
                              onClick={() => handleDelete(exercise._id)}
                            >
                              <Button>Confirmer</Button>
                            </AlertDialogAction>{" "}
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </TableCell>
                    <TableCell className="content-center ">
                      <div>
                        {" "}
                        {exercise.comment ? (
                          <LucideMessageSquareText
                            className="mx-1 mt-0.5"
                            size={16}
                          />
                        ) : (
                          ""
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      {formatDate(exercise.session.date_session)}
                    </TableCell>
                    <TableCell>{exercise.type?.name}</TableCell>
                    <TableCell>
                      {exercise.rep[0]}x{exercise.weight[0]}
                    </TableCell>
                    <TableCell>
                      {exercise.rep[1]}x{exercise.weight[1]}
                    </TableCell>
                    <TableCell>
                      {exercise.rep[2]}x{exercise.weight[2]}
                    </TableCell>

                    <TableCell>
                      <Button asChild variant="ghost">
                        <Link
                          to={`/exercises/${exercise._id}`}
                          key={exercise._id}
                        >
                          <LucideArrowRightCircle size={16} />
                        </Link>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </main>
      )}
      {exercise.length === 0 && (
        <main className="container mx-auto my-0 flex h-dvh max-w-md flex-col">
          <div className="">
            <div className="text-center">
              <p className="max-w-[600px] text-gray-500 dark:text-gray-400 md:text-xl">
                Tu n'as pas encore d'exercices
              </p>
            </div>
            <div className="flex flex-col gap-4 "></div>
          </div>
        </main>
      )}
    </div>
  );
}

export default ExercicesList;
