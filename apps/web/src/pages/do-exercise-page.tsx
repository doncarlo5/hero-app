import { Accordion, AccordionItem } from "@radix-ui/react-accordion";
import { ReloadIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import {
  Check,
  ChevronLeft,
  Edit,
  HistoryIcon,
  LoaderIcon,
  LucideInfo,
  LucidePlay,
  LucideRotateCcw,
  Stars,
  X,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";

import { Navbar } from "@/components/navbar";
import ScreenLockToggle from "@/components/screen-lock-toggle";
import { AccordionContent, AccordionTrigger } from "@/components/ui/accordion";
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
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import fetchApi from "@/lib/api-handler";
import { cn } from "@/lib/utils";

const DoExercisePage = () => {
  const [oneExerciseType, setOneExerciseType] = useState(null as any);
  const [lastExercise, setLastExercise] = useState(null as any);
  const [allExerciseTypes, setAllExerciseTypes] = useState([] as any[]);
  const [session, setSession] = useState<any>({});
  const [showPrefillButton, setShowPrefillButton] = useState(false);
  const [addRep4, setAddRep4] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingTypes, setIsLoadingTypes] = useState(true);
  const [isLoadingLastExercise, setIsLoadingLastExercise] = useState(true);

  const { sessionId } = useParams();
  const [searchParams] = useSearchParams();
  const exerciseTypeId = searchParams.get("exerciseTypeId");
  console.log("🚀 ~ DoExercisePage ~ exerciseTypeId:", exerciseTypeId);

  const [formState, setFormState] = useState({
    rep1: lastExercise?.rep[0] || "",
    rep2: lastExercise?.rep[1] || "",
    rep3: lastExercise?.rep[2] || "",
    rep4: lastExercise?.rep[3] || "",
    weight1: lastExercise?.weight[0] || "",
    weight2: lastExercise?.weight[1] || "",
    weight3: lastExercise?.weight[2] || "",
    weight4: lastExercise?.weight[3] || "",
    comment: lastExercise?.comment || "",
  });

  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    setFormState({
      rep1: lastExercise?.rep[0] || "",
      weight1: lastExercise?.weight[0] || "",
      rep2: lastExercise?.rep[1] || "",
      weight2: lastExercise?.weight[1] || "",
      rep3: lastExercise?.rep[2] || "",
      weight3: lastExercise?.weight[2] || "",
      rep4: lastExercise?.rep[3] || "",
      weight4: lastExercise?.weight[3] || "",
      comment: "",
    });
    if (lastExercise?.rep[3]) {
      setAddRep4(true);
    } else {
      setAddRep4(false);
    }
  }, [lastExercise]);

  const fetchOneSession = async () => {
    try {
      const response = await fetchApi(`/api/sessions/${sessionId}`);
      return response;
    } catch (error: any) {
      console.error("Fetch error: ", error);
    }
  };

  const onExerciseTypeChange = async (exerciseType: any) => {
    setOneExerciseType(exerciseType);
    setIsLoadingLastExercise(true);
    try {
      const response = await fetchApi(
        `/api/exercise-user?limit=1&sort=-createdAt&type=${exerciseType._id}`
      );
      setLastExercise(response[0]);
    } catch (error: any) {
      console.error("Fetch error: ", error);
    } finally {
      setIsLoadingLastExercise(false);
    }
  };

  const fetchAllExerciseTypes = async (sessionData: any) => {
    try {
      const response = await fetchApi(
        `/api/exercise-type?type_session=${sessionData.type_session}&limit=1000`
      );
      return response;
    } catch (error: any) {
      console.error("Fetch error: ", error);
    } finally {
      setIsLoadingTypes(false);
    }
  };

  useEffect(() => {
    const fetchInitialData = async () => {
      const sessionData = await fetchOneSession();
      setSession(sessionData);
      const exerciseTypes = await fetchAllExerciseTypes(sessionData);
      setAllExerciseTypes(exerciseTypes);

      // Check if exerciseTypeId exists in URL, and auto-select the exercise type
      if (exerciseTypeId) {
        const selectedExerciseType = exerciseTypes.find(
          (type: any) => type._id === exerciseTypeId
        );
        if (selectedExerciseType) {
          await onExerciseTypeChange(selectedExerciseType); // Pre-select the exercise type
        }
      }
    };

    fetchInitialData();
  }, [exerciseTypeId]);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { target } = event;
    const key = target.id;
    const value = target.value;
    setFormState({ ...formState, [key]: value });

    if (key === "weight1") {
      setShowPrefillButton(true);
    }
  };

  const handlePrefillWeights = () => {
    setFormState({
      ...formState,
      weight2: formState.weight1,
      weight3: formState.weight1,
    });
    if (oneExerciseType.repRange4) {
      setFormState({
        ...formState,
        weight2: formState.weight1,
        weight3: formState.weight1,
        weight4: formState.weight1,
      });
    }
    setShowPrefillButton(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsLoading(true);

      const response = await fetchApi("/api/exercise-user", {
        method: "POST",
        body: JSON.stringify({
          type: oneExerciseType._id,
          rep: [
            formState.rep1,
            formState.rep2,
            formState.rep3,
            formState?.rep4,
          ],
          weight: [
            formState.weight1,
            formState.weight2,
            formState.weight3,
            formState?.weight4,
          ],
          comment: formState.comment,
          session: sessionId,
        }),
      });

      const updatedSession = {
        exercise_user_list: [...session.exercise_user_list, response._id],
      };

      await fetchApi(`/api/sessions/${sessionId}`, {
        method: "PUT",
        body: JSON.stringify(updatedSession),
      });

      if (response.newTrophies) {
        response.newTrophies.forEach((trophy: any) => {
          toast({
            title: "Nouveau trophée débloqué",
            description: trophy.description,
            variant: "success",
            className: "bg-teal-500 border-none",
          });
        });
      }

      navigate(`/history/session/${sessionId}`);
    } catch (error: any) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <main className="container mx-auto mb-10 mt-0 flex h-dvh max-w-md flex-col">
        <div className="flex items-center justify-between py-5">
          <div className="flex items-center">
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="outline" size="icon">
                  <ChevronLeft className="h-4 w-4" />
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent className="w-10/12 rounded-md">
                <AlertDialogHeader>
                  <AlertDialogTitle>
                    Retourner à la page précédente ?
                  </AlertDialogTitle>
                  <AlertDialogDescription>
                    Les données seront perdues.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Annuler</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={() => navigate(`/history/session/${session._id}`)}
                  >
                    Continuer
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>

            {oneExerciseType ? (
              <h1 className="ml-5 text-xl font-bold md:text-3xl">
                {oneExerciseType?.name}
              </h1>
            ) : (
              <h1 className="ml-5 text-xl font-medium md:text-3xl">
                Nouvel exercice
              </h1>
            )}
          </div>

          <ScreenLockToggle />
        </div>

        <Select onValueChange={onExerciseTypeChange}>
          <SelectTrigger className="w-full data-[placeholder]:italic data-[placeholder]:text-gray-700 dark:data-[placeholder]:text-white ">
            <SelectValue
              onLoad={() => setIsLoadingTypes(false)}
              placeholder={
                isLoadingTypes ? (
                  <LoaderIcon className="mr-2 h-4 w-4 animate-spin" />
                ) : exerciseTypeId ? (
                  oneExerciseType?.name
                ) : (
                  "Sélectionner un exercice"
                )
              }
            />
          </SelectTrigger>
          <SelectContent>
            {isLoadingTypes ? (
              <div
                role="status"
                className="flex max-w-sm animate-pulse items-center"
              >
                <div className="mb-2 ml-3 mt-2 h-4 w-64 rounded-full bg-gray-200 dark:bg-gray-700"></div>
              </div>
            ) : allExerciseTypes.length === 0 ? (
              <div className="px-2 py-1 text-sm text-gray-500 dark:text-gray-400">
                Veuillez créer un exercice pour ce type de séance.
              </div>
            ) : (
              <SelectGroup>
                {allExerciseTypes.map((type) => (
                  <SelectItem key={type._id} value={type}>
                    <p className="dark:text-white">{type.name}</p>
                  </SelectItem>
                ))}
              </SelectGroup>
            )}
          </SelectContent>
        </Select>
        {/* display last time that exercise has be done with lastExercise.session.dat_session with date-fns */}
        {lastExercise && (
          <div className=" flex items-center justify-end gap-1 px-2 py-1 text-gray-500 dark:text-gray-400">
            <HistoryIcon size={14} />
            <p className="text-sm">
              {isLoadingLastExercise ? (
                <Skeleton className="h-3 w-20" />
              ) : (
                format(
                  new Date(lastExercise?.session?.date_session),
                  "dd/MM/yyyy"
                )
              )}
            </p>
          </div>
        )}
        {oneExerciseType?.advice && (
          <Accordion
            type="single"
            collapsible
            className="mt-3 rounded-2xl bg-slate-100"
          >
            <AccordionItem value="advice">
              <AccordionTrigger className="flex h-10 gap-2 px-5 text-left text-gray-500 dark:text-gray-400">
                <div className="flex items-center gap-2">
                  <LucideInfo className="size-4" />{" "}
                  <p className="text-left ">Conseil</p>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-3 pb-3 pt-1 ">
                {oneExerciseType?.advice}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        )}
        {oneExerciseType && (
          <form onSubmit={handleSubmit} className="mt-3">
            {showPrefillButton && (
              <div className=" flex gap-2">
                <Button
                  variant={"outline"}
                  type="button"
                  onClick={handlePrefillWeights}
                  className="mb-2 w-full cursor-pointer"
                >
                  <Stars className="mr-1 h-4 w-4" />
                  Toutes les séries à {formState.weight1} KG
                </Button>
                {/* Close button */}
                <Button
                  variant={"outline"}
                  type="button"
                  onClick={() => setShowPrefillButton(false)}
                  className="mb-2 w-fit cursor-pointer"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            )}
            <div className="flex w-full flex-col items-center justify-center rounded-2xl bg-slate-50 px-2 py-4 dark:bg-slate-900 dark:bg-opacity-40 md:text-lg">
              <div className="flex w-full justify-between gap-1 px-2">
                <div className="flex w-[25%] flex-col gap-1 text-center">
                  <p className="pb-1 text-sm text-gray-500">Reps</p>
                  <Input
                    id="rep1"
                    placeholder={lastExercise?.rep[0]}
                    value={formState.rep1}
                    onChange={handleChange}
                    required
                    type="number"
                    className="text-md h-12 w-full rounded-xl text-center text-2xl font-bold [appearance:textfield] focus:bg-slate-50 focus:shadow-inner [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                  />
                  <Input
                    id="rep2"
                    placeholder={lastExercise?.rep[1]}
                    value={formState.rep2}
                    onChange={handleChange}
                    required
                    type="number"
                    className="text-md h-12 w-full rounded-xl text-center text-2xl font-bold [appearance:textfield] focus:bg-slate-50 focus:shadow-inner [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                  />
                  <Input
                    id="rep3"
                    placeholder={lastExercise?.rep[2]}
                    value={formState.rep3}
                    onChange={handleChange}
                    required
                    type="number"
                    className="text-md h-12 w-full rounded-xl text-center text-2xl font-bold [appearance:textfield] focus:bg-slate-50 focus:shadow-inner [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                  />
                  {(addRep4 || oneExerciseType.repRange4) && (
                    <Input
                      id="rep4"
                      placeholder={lastExercise?.rep[3]}
                      value={formState.rep4}
                      onChange={handleChange}
                      required
                      type="number"
                      className="text-md h-12 w-full rounded-xl text-center text-2xl font-bold [appearance:textfield] focus:bg-slate-50 focus:shadow-inner [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                    />
                  )}
                </div>
                <div className="flex w-[35%] flex-col gap-1 text-center">
                  <p className="pb-1 text-sm text-gray-500">KG</p>
                  <Input
                    id="weight1"
                    placeholder={lastExercise?.weight[0]}
                    value={formState.weight1}
                    onChange={handleChange}
                    required
                    type="number"
                    className="text-md h-12 w-full rounded-xl text-center text-2xl font-bold [appearance:textfield] focus:bg-slate-50 focus:shadow-inner [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                  />
                  <Input
                    id="weight2"
                    placeholder={lastExercise?.weight[1]}
                    value={formState.weight2}
                    onChange={handleChange}
                    required
                    type="number"
                    className="text-md h-12 w-full rounded-xl text-center text-2xl font-bold [appearance:textfield] focus:bg-slate-50 focus:shadow-inner [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                  />
                  <Input
                    id="weight3"
                    placeholder={lastExercise?.weight[2]}
                    value={formState.weight3}
                    onChange={handleChange}
                    required
                    type="number"
                    className="text-md h-12 w-full rounded-xl text-center text-2xl font-bold [appearance:textfield] focus:bg-slate-50 focus:shadow-inner [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                  />
                  {(addRep4 || oneExerciseType.repRange4) && (
                    <Input
                      id="weight4"
                      placeholder={lastExercise?.weight[3]}
                      value={formState.weight4}
                      onChange={handleChange}
                      required
                      type="number"
                      className="text-md h-12 w-full rounded-xl text-center text-2xl font-bold [appearance:textfield] focus:bg-slate-50 focus:shadow-inner [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                    />
                  )}
                </div>

                <div className="flex w-[20%] flex-col gap-1 text-center">
                  <p className="pb-1 text-sm text-gray-500">Range</p>
                  <p className="text-md flex h-12 w-full items-center justify-center rounded-md bg-transparent px-1 font-light text-gray-700">
                    {oneExerciseType?.repRange1}
                  </p>
                  <p className="text-md flex h-12 w-full items-center justify-center rounded-md bg-transparent px-1 font-light text-gray-700">
                    {oneExerciseType?.repRange2}
                  </p>
                  <p className="text-md flex h-12 w-full items-center justify-center rounded-md bg-transparent px-1 font-light text-gray-700">
                    {oneExerciseType?.repRange3}
                  </p>
                  {(addRep4 || oneExerciseType.repRange4) && (
                    <p className="text-md flex h-12 w-full items-center justify-center rounded-md bg-transparent px-1 font-light text-gray-700">
                      {oneExerciseType?.repRange4}
                    </p>
                  )}
                </div>

                <div className="flex w-[20%] flex-col gap-1 text-center">
                  <p className="pb-1 text-sm text-gray-500">Série</p>
                  <div className="flex h-12 w-full items-center justify-center rounded-md bg-slate-200 bg-transparent">
                    <label
                      className="relative flex cursor-pointer items-center rounded-full"
                      htmlFor="set1"
                    >
                      <input
                        id="set1"
                        type="checkbox"
                        className="before:content[''] border-blue-gray-200 before:bg-blue-gray-500 peer relative h-8 w-8 cursor-pointer appearance-none rounded-sm border border-dashed transition-all before:absolute before:left-2/4 before:top-2/4 before:block before:h-9 before:w-9 before:-translate-x-2/4 before:-translate-y-2/4 before:rounded-full before:opacity-0 before:transition-opacity checked:border-teal-700 checked:bg-teal-700 checked:before:bg-teal-700"
                      />
                      <span className="pointer-events-none absolute left-2/4 top-2/4 -translate-x-2/4 -translate-y-2/4 text-white opacity-0 transition-opacity peer-checked:opacity-100">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          stroke="currentColor"
                          strokeWidth="1"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          ></path>
                        </svg>
                      </span>
                    </label>
                  </div>
                  <div className="flex h-12 w-full items-center justify-center rounded-md bg-slate-200 bg-transparent">
                    <label
                      className="relative flex cursor-pointer items-center rounded-full"
                      htmlFor="set2"
                    >
                      <input
                        id="set2"
                        type="checkbox"
                        className="before:content[''] border-blue-gray-200 before:bg-blue-gray-500 peer relative h-8 w-8 cursor-pointer appearance-none rounded-sm border border-dashed transition-all before:absolute before:left-2/4 before:top-2/4 before:block before:h-9 before:w-9 before:-translate-x-2/4 before:-translate-y-2/4 before:rounded-full before:opacity-0 before:transition-opacity checked:border-teal-700 checked:bg-teal-700 checked:before:bg-teal-700"
                      />
                      <span className="pointer-events-none absolute left-2/4 top-2/4 -translate-x-2/4 -translate-y-2/4 text-white opacity-0 transition-opacity peer-checked:opacity-100">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          stroke="currentColor"
                          strokeWidth="1"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          ></path>
                        </svg>
                      </span>
                    </label>
                  </div>
                  <div className="flex h-12 w-full items-center justify-center rounded-md bg-slate-200 bg-transparent">
                    <label
                      className="relative flex cursor-pointer items-center rounded-full"
                      htmlFor="set3"
                    >
                      <input
                        id="set3"
                        type="checkbox"
                        className="before:content[''] border-blue-gray-200 before:bg-blue-gray-500 peer relative h-8 w-8 cursor-pointer appearance-none rounded-sm border border-dashed transition-all before:absolute before:left-2/4 before:top-2/4 before:block before:h-9 before:w-9 before:-translate-x-2/4 before:-translate-y-2/4 before:rounded-full before:opacity-0 before:transition-opacity checked:border-teal-700 checked:bg-teal-700 checked:before:bg-teal-700 "
                      />
                      <span className="pointer-events-none absolute left-2/4 top-2/4 -translate-x-2/4 -translate-y-2/4 text-white opacity-0 transition-opacity peer-checked:opacity-100">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          stroke="currentColor"
                          strokeWidth="1"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          ></path>
                        </svg>
                      </span>
                    </label>
                  </div>
                  {(addRep4 || oneExerciseType.repRange4) && (
                    <div className="flex h-12 w-full items-center justify-center rounded-md bg-slate-200 bg-transparent">
                      <label
                        className="relative flex cursor-pointer items-center rounded-full"
                        htmlFor="set4"
                      >
                        <input
                          id="set4"
                          type="checkbox"
                          className="before:content[''] border-blue-gray-200 before:bg-blue-gray-500 peer relative h-8 w-8 cursor-pointer appearance-none rounded-sm border transition-all before:absolute before:left-2/4 before:top-2/4 before:block before:h-9 before:w-9 before:-translate-x-2/4 before:-translate-y-2/4 before:rounded-full before:opacity-0 before:transition-opacity checked:border-teal-700 checked:bg-teal-700 checked:before:bg-teal-700"
                        />
                        <span className="pointer-events-none absolute left-2/4 top-2/4 -translate-x-2/4 -translate-y-2/4 text-white opacity-0 transition-opacity peer-checked:opacity-100">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            stroke="currentColor"
                            strokeWidth="1"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            ></path>
                          </svg>
                        </span>
                      </label>
                    </div>
                  )}
                </div>
              </div>

              <button
                type="button"
                onClick={() => setAddRep4(!addRep4)}
                className={cn(`mt-4 w-6/12 rounded-xl`, {
                  hidden: oneExerciseType.repRange4,
                })}
              >
                {addRep4 ? (
                  <div className=" text-xs italic text-gray-400">
                    Réduire d'une série ↑
                  </div>
                ) : (
                  <div className=" text-xs italic text-gray-400 ">
                    Ajouter une série ↓
                  </div>
                )}
              </button>
            </div>

            <div className="pt-5 ">
              <Accordion
                type="single"
                collapsible
                className="mb-5 rounded-2xl bg-slate-50 dark:bg-slate-900 dark:bg-opacity-40"
              >
                <AccordionItem value="comment">
                  <AccordionTrigger className="flex h-10 gap-2 px-5 text-left text-gray-500 dark:text-gray-400">
                    <div className="flex items-center gap-2">
                      <Edit className="size-4" /> <div>Notes</div>
                      {lastExercise?.comment && (
                        <span className="relative flex h-2 w-2">
                          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-teal-400 opacity-75"></span>
                          <span className="relative inline-flex h-2 w-2 rounded-full bg-teal-500"></span>
                        </span>
                      )}
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-3 pb-3 pt-1 ">
                    <Textarea
                      id="comment"
                      placeholder={
                        lastExercise?.comment
                          ? `Note précédente: ${lastExercise?.comment}`
                          : "Note précédente : Aucune."
                      }
                      value={formState.comment}
                      onChange={handleChange}
                      maxLength={200}
                    />
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>

            {/* Fixed countdown timer at bottom */}
            {oneExerciseType && (
              <div className="fixed bottom-20 left-0 cursor-pointer">
                <div className="rounded-lg bg-slate-100 px-3 py-2 shadow-lg dark:bg-slate-800">
                  <CountDownTimer exerciseTypeTimer={oneExerciseType.timer} />
                </div>
              </div>
            )}
            <div className="fixed bottom-20 right-10 cursor-pointer">
              {isLoading ? (
                <Button
                  disabled
                  className="flex  h-16 w-16  items-center justify-center rounded-full text-white shadow-lg focus:outline-none focus:ring-2 focus:ring-teal-400 focus:ring-opacity-75 active:scale-95 active:shadow-inner"
                >
                  <ReloadIcon className="h-10 w-10 animate-spin" />
                </Button>
              ) : (
                <Button
                  className="flex h-16 w-16 items-center justify-center rounded-full text-white shadow-lg focus:outline-none focus:ring-2 focus:ring-teal-400 focus:ring-opacity-75 active:scale-95 active:shadow-inner"
                  type="submit"
                >
                  <Check className="h-10 w-10" />
                </Button>
              )}
            </div>
          </form>
        )}
      </main>
    </>
  );
};

function CountDownTimer({ exerciseTypeTimer }: { exerciseTypeTimer: number }) {
  const [isTimerPlaying, setIsTimerPlaying] = useState(false);
  const [key, setKey] = useState(0);

  const renderTime = ({ remainingTime }: { remainingTime: number }) => {
    if (remainingTime === 0) {
      const ding = new Audio("/ding.mp3");
      ding.currentTime = 0;
      ding.play();
      setTimeout(() => {
        setKey((prevKey) => prevKey + 1);
      }, 3000);
      setIsTimerPlaying(false);
      return (
        <div className="flex items-center justify-center">
          <p className="text-sm font-bold text-teal-600">GO!</p>
        </div>
      );
    }

    if (Number.isNaN(remainingTime)) {
      return (
        <div className="flex items-center justify-center">
          <p className="text-xs text-gray-500">--:--</p>
        </div>
      );
    }

    const minutes = Math.floor(remainingTime / 60);
    const seconds = remainingTime % 60;
    const formattedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;

    return (
      <div className="flex items-center justify-center">
        <p className="text-sm font-semibold">{`${minutes}:${formattedSeconds}`}</p>
      </div>
    );
  };

  const restartFunction = () => {
    setKey((prevKey) => prevKey + 1);
    setIsTimerPlaying(false);
  };

  return (
    <div
      className="flex items-center gap-3"
      onClick={() => {
        if (isTimerPlaying) {
          restartFunction();
        } else {
          setIsTimerPlaying(true);
        }
      }}
    >
      <div className="flex items-center gap-2">
        <CountdownCircleTimer
          isSmoothColorTransition={true}
          isGrowing={true}
          rotation="counterclockwise"
          key={key}
          size={50}
          strokeWidth={4}
          isPlaying={isTimerPlaying}
          duration={exerciseTypeTimer}
          colors={["#0F766E", "#0F766E", "#760f17", "#760f17"]}
          colorsTime={[7, 5, 2, 0]}
          onComplete={() => ({
            shouldRepeat: false,
            delay: 1,
            newInitialRemainingTime: exerciseTypeTimer,
          })}
        >
          {renderTime}
        </CountdownCircleTimer>
      </div>

      {isTimerPlaying ? (
        <button
          type="button"
          className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-teal-700 text-white shadow-sm transition-all hover:shadow-md active:scale-95"
        >
          <LucideRotateCcw className="h-4 w-4" />
        </button>
      ) : (
        <button
          type="button"
          className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-teal-700 text-white shadow-sm transition-all hover:shadow-md active:scale-95"
        >
          <LucidePlay className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}

export default DoExercisePage;
