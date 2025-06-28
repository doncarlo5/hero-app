import { motion } from "framer-motion";
import {
  ArrowDown01,
  Brackets,
  Calendar,
  Download,
  Edit,
  LucideActivity,
  LucideCheckCircle,
  Trophy,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { FaWeightScale } from "react-icons/fa6";

import useAuth from "@/context/use-auth";
import fetchApi from "@/lib/api-handler";
import { UserType } from "@/types/user.type";

import { AnimatedCounter } from "./animated-counter";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel-onboarding";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { toast } from "./ui/use-toast";
import exerciseImg from "/exercise.png";
import upperFront from "/upper-front.png";

type OnboardingModalProps = {
  onClose: () => void;
};

const OnboardingModal: React.FC<OnboardingModalProps> = ({ onClose }) => {
  const { user, contextSetBodyWeight, setUser } = useAuth();
  const [bodyWeight, setBodyWeight] = useState(0);
  const [formState, setFormState] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    email: user?.email || "",
  });

  const [api, setApi] = useState<CarouselApi | undefined>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const [showFinalMessage, setShowFinalMessage] = useState(false);

  const steps = [
    "Création des types d'exercices...",
    "Création des séances...",
    "Création des programmes...",
    "Création des trophées...",
  ];

  useEffect(() => {
    if (!api) return;

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api, count]);

  useEffect(() => {
    if (current === 4) {
      if (currentStep < steps.length) {
        const timeout = setTimeout(
          () => setCurrentStep((prev) => prev + 1),
          2000
        );
        return () => clearTimeout(timeout);
      } else {
        const timeout = setTimeout(() => setShowFinalMessage(true), 1000);
        return () => clearTimeout(timeout);
      }
    }
  }, [current, currentStep]);

  const handleOnboardingClose = async () => {
    try {
      const updatedUser = {
        ...user,
        ...formState,
        hasSeenOnboarding: true,
      };
      await fetchApi("/api/auth/update", {
        method: "PUT",
        body: JSON.stringify(updatedUser),
      });
      onClose();
      contextSetBodyWeight(bodyWeight);
      setUser(updatedUser as UserType);
    } catch (error: any) {
      const errorMessage = error.message || "Une erreur est survenue!";
      toast({
        variant: "destructive",
        title: "Une erreur est survenue! ❌",
        description: errorMessage,
      });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormState((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 ">
      <div className="relative mt-4 w-10/12 max-w-md overflow-hidden rounded-lg bg-slate-50 shadow-lg">
        <Carousel
          setApi={setApi}
          onClose={handleOnboardingClose}
          className="w-full"
        >
          <CarouselContent>
            <CarouselItem
              className="my-auto flex h-full w-full items-center justify-center"
              key={0}
            >
              <div className="p-4 text-center ">
                <h2 className="mb-4 text-xl font-bold">Welcome to Hero App</h2>
                <p className="mb-4">
                  Voici quelques étapes pour prendre en main l'application.
                </p>
                <p className="animate-tada text-4xl">👋</p>
              </div>
            </CarouselItem>
            <CarouselItem className="overflow-hidden" key={1}>
              <div className="mb-14 mt-4 p-4 ">
                <h2 className="mt-10 text-left text-2xl font-bold">
                  Complétez vos informations...
                </h2>
                <form onSubmit={(e) => e.preventDefault()}>
                  <div className=" mx-auto mt-8 w-11/12 rounded-xl border border-gray-200 bg-gray-100 p-3">
                    <div className=" space-y-2">
                      <div>
                        <Label htmlFor="firstName" className="mb-4">
                          Prénom
                        </Label>
                        <Input
                          id="firstName"
                          placeholder="Prénom"
                          value={formState.firstName}
                          onChange={handleChange}
                        />
                      </div>
                      <div>
                        <Label htmlFor="lastName" className="mb-2 ">
                          Nom
                        </Label>

                        <Input
                          id="lastName"
                          placeholder="Nom"
                          value={formState.lastName}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                    <div className="mt-5 flex flex-col items-center justify-center">
                      <Label htmlFor="bodyWeight" className="mb-2">
                        Poids du corps
                      </Label>
                      <div className="flex w-3/6 items-end justify-center gap-2 text-xl font-light ">
                        <Input
                          className=" text-lg font-bold text-black"
                          type="number"
                          id="body_weight"
                          value={bodyWeight}
                          onChange={(e) =>
                            setBodyWeight(parseFloat(e.target.value))
                          }
                        />
                        KG
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </CarouselItem>
            <CarouselItem key={2} className="overflow-hidden">
              <div className="mb-14 mt-4 p-4 ">
                <div className="relative">
                  <img
                    src={upperFront}
                    alt="Séance type"
                    className="absolute -top-24 right-1 -z-50 w-4/12 rounded-lg"
                  />
                  <h2 className="mt-10 text-left text-2xl font-bold">Séance</h2>
                  <p className="mb-4 rounded-xl bg-slate-50 text-left font-medium leading-snug">
                    Lance une séance et choisis le type. <strong>Upper</strong>{" "}
                    pour le haut du corps, <strong>Lower</strong> pour le bas du
                    corps.
                  </p>
                  <div className="overflow-hidden rounded-xl shadow-xl">
                    <h4 className="bg-slate-200/60 px-3 py-2 text-left text-sm font-semibold text-gray-500">
                      Information sur la séance
                    </h4>
                    <div className="space-y-1 rounded-2xl px-1 py-1 pb-3">
                      <div className="flex">
                        <Calendar
                          className="m-4 text-gray-500"
                          strokeWidth={1.1}
                          size={40}
                        />
                        <div className="text-left">
                          <h3 className="mt-1 font-bold">Date</h3>
                          <p className="text-sm font-semibold text-gray-600">
                            La date du jour est entrée automatiquement.
                          </p>
                        </div>
                      </div>
                      <div className="flex">
                        <FaWeightScale
                          className="m-4 text-gray-500"
                          strokeWidth={1.1}
                          size={43}
                        />
                        <div className="text-left">
                          <h3 className="mt-1 font-bold">Poids du corps</h3>
                          <p className="text-sm font-semibold text-gray-600">
                            Le poids du corps est mesuré le matin à jeun.
                          </p>
                        </div>
                      </div>
                      <div className="flex">
                        <Edit
                          className="m-4 text-gray-500"
                          strokeWidth={1.1}
                          size={41}
                        />
                        <div className="text-left">
                          <h3 className="mt-1 font-bold">Notes</h3>
                          <p className="text-sm font-semibold text-gray-600">
                            La note précédente de la séance sera affichée.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CarouselItem>
            <CarouselItem key={3}>
              <div className="mb-14 mt-4 p-4">
                <div className="relative">
                  <img
                    src={exerciseImg}
                    alt="Exercice"
                    className="absolute -top-16 right-0 -z-50 w-2/4"
                  />
                  <h2 className="mt-10 bg-slate-50 text-left text-2xl font-bold">
                    Exercice
                  </h2>
                  <p className="mb-4 bg-slate-50 text-left font-medium leading-snug">
                    Les exercices sont spécifiques au type de séance. Tu
                    retrouveras tes performances précédentes lors d'un nouvel
                    exercice.
                  </p>
                  <div className="overflow-hidden rounded-xl shadow-xl">
                    <h4 className="bg-slate-100 px-3 py-2 text-left text-sm font-semibold text-gray-500">
                      Composition d'un exercice
                    </h4>
                    <div className="space-y-1 rounded-2xl px-1 py-1 pb-3">
                      <div className="flex">
                        <ArrowDown01
                          className="m-4 text-gray-500"
                          strokeWidth={1.1}
                          size={40}
                        />
                        <div className="text-left">
                          <h3 className="mt-1 font-bold">Série</h3>
                          <p className="text-sm font-semibold text-gray-600">
                            3 ou 4 séries sont à réaliser pour chaque exercice.
                          </p>
                        </div>
                      </div>
                      <div className="flex">
                        <Brackets
                          className="m-4 text-gray-500"
                          strokeWidth={1.1}
                          size={40}
                        />
                        <div className="text-left">
                          <h3 className="mt-1 font-bold">Range</h3>
                          <p className="text-sm font-semibold text-gray-600">
                            Définit un objectif de répétition pour chaque série.
                          </p>
                        </div>
                      </div>
                      <div className="flex">
                        <Edit
                          className="m-4 text-gray-500"
                          strokeWidth={1.1}
                          size={36}
                        />
                        <div className="text-left">
                          <h3 className="mt-1 font-bold">Notes</h3>
                          <p className="text-sm font-semibold text-gray-600">
                            La note précédente de l'exercice sera affichée.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CarouselItem>
            <CarouselItem key={4}>
              <div className="relative p-4 text-center">
                <div className="relative">
                  {showFinalMessage && (
                    <h2 className="mb-4 mt-1 text-left text-2xl font-bold"></h2>
                  )}

                  <div className="flex flex-col gap-2">
                    {!showFinalMessage ? (
                      <>
                        <div className="mx-auto my-20 h-6 w-6 animate-spin rounded-full border-b-2 border-current border-teal-700" />
                        <motion.div
                          key={currentStep}
                          className="box"
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 1, scale: 1 }}
                        >
                          <p className=" font-medium">{steps[currentStep]}</p>
                        </motion.div>
                      </>
                    ) : (
                      <motion.div
                        className="box"
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                      >
                        <LucideCheckCircle className="mx-auto h-12 w-12 text-green-500" />
                        <p className=" mt-1 font-medium">Profil créé.</p>
                      </motion.div>
                    )}
                  </div>
                  {showFinalMessage && (
                    <div className="mt-4 flex flex-col gap-2">
                      <div className="h-24 rounded-xl bg-white p-2 px-3 text-gray-800 shadow-md">
                        <div className="flex h-full items-end justify-between">
                          <div className="flex flex-col">
                            <h3 className="text-left font-semibold">
                              <span className="text-2xl font-black">
                                <AnimatedCounter
                                  type="onboarding"
                                  from={0}
                                  to={40}
                                />
                              </span>{" "}
                              exercices
                            </h3>
                            <h3 className="text-left font-semibold">
                              types pré-enregistrés
                            </h3>
                          </div>
                          <div className="mx-4 my-auto">
                            <Download
                              className="text-gray-500"
                              strokeWidth={1.1}
                              size={40}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="h-24 rounded-xl bg-white p-2 px-3 shadow-md">
                        <div className="flex h-full items-end justify-between">
                          <div className="flex flex-col">
                            <h3 className="text-left font-semibold">
                              <span className="text-2xl font-black">
                                <AnimatedCounter
                                  type="onboarding"
                                  from={0}
                                  to={27}
                                />{" "}
                              </span>{" "}
                              trophées à
                            </h3>
                            <h3 className="text-left font-semibold">
                              gagner selon ton poids
                            </h3>
                          </div>
                          <div className="mx-4 my-auto">
                            <Trophy
                              className="text-gray-500"
                              strokeWidth={1.1}
                              size={40}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="h-24 rounded-xl bg-white p-2 px-3 shadow-md">
                        <div className="flex h-full items-end justify-between">
                          <div className="flex flex-col">
                            <h3 className="text-left font-semibold">
                              <span className="text-2xl font-black">
                                <AnimatedCounter
                                  type="onboarding"
                                  from={0}
                                  to={5}
                                />{" "}
                              </span>{" "}
                              types de séances
                            </h3>
                            <h3 className="text-left font-semibold">
                              {" "}
                              selon ton programme
                            </h3>
                          </div>
                          <div className="mx-4 my-auto">
                            <LucideActivity
                              className="text-gray-500"
                              strokeWidth={1.1}
                              size={40}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </CarouselItem>
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </div>
  );
};

export default OnboardingModal;
