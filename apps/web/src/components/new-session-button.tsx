import { Zap } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import useAuth from "@/context/use-auth";

import fetchApi from "../lib/api-handler";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "./ui/drawer";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Switch } from "./ui/switch";
import bodyBack from "/body-back.png";
import bodyFront from "/body-front.png";
import lower from "/lower.png";
import upperBack from "/upper-back.png";
import upperFront from "/upper-front.png";

function NewSessionButton() {
  const [bodyWeight, setBodyWeight] = useState(0);
  const [tempBodyWeight, setTempBodyWeight] = useState("");
  const [showBodyWeightModal, setShowBodyWeightModal] = useState(false);
  const [pendingSessionType, setPendingSessionType] = useState("");
  const [showMinimaliste, setShowMinimaliste] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { contextBodyWeight } = useAuth();

  const navigate = useNavigate();

  useEffect(() => {
    setBodyWeight(contextBodyWeight);
  }, [contextBodyWeight]);

  useEffect(() => {
    fetchLastSessionUser();
  }, []);

  const fetchLastSessionUser = async () => {
    try {
      const response = await fetchApi(
        `/api/sessions?limit=1&sortBy=createdAt:desc`
      );
      if (response && response.length > 0) {
        setBodyWeight(response[0].body_weight);
      } else {
        setBodyWeight(contextBodyWeight);
      }
    } catch (error) {
      console.error("Error fetching last session:", error);
    }
  };

  const handleCreateSession = async (
    e: React.FormEvent,
    userChoice: string
  ) => {
    e.preventDefault();

    // Check if body weight is valid (not 0 or undefined)
    if (!bodyWeight || bodyWeight <= 0) {
      setPendingSessionType(userChoice);
      setTempBodyWeight(bodyWeight ? bodyWeight.toString() : "");
      setShowBodyWeightModal(true);
      return;
    }

    await createSession(userChoice);
  };

  const createSession = async (
    sessionType: string,
    customBodyWeight?: number
  ) => {
    setIsLoading(true);
    try {
      const weightToUse = customBodyWeight || bodyWeight;
      const response = await fetchApi("/api/sessions", {
        method: "POST",
        body: JSON.stringify({
          date_session: new Date(),
          type_session: sessionType,
          body_weight: weightToUse,
          exercise_user_list: [],
          is_done: false,
          comment: "",
        }),
      });
      if (response.session) {
        navigate(`/history/session/${response.session._id}`);
      }
    } catch (error: any) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBodyWeightSubmit = () => {
    const weight = parseFloat(tempBodyWeight);
    if (weight > 0) {
      setBodyWeight(weight);
      setShowBodyWeightModal(false);
      createSession(pendingSessionType, weight);
    }
  };

  const handleBodyWeightCancel = () => {
    setShowBodyWeightModal(false);
    setPendingSessionType("");
    setTempBodyWeight("");
  };

  return (
    <>
      <Drawer>
        <DrawerTrigger className="select-none" asChild>
          <div className="fixed bottom-20 right-10 cursor-pointer">
            <div className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-gray-100/50 bg-white/5 text-white shadow-lg backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-teal-400 focus:ring-opacity-75 active:scale-95 active:shadow-inner">
              <Zap
                color="rgb(107 114 128)"
                className="h-7 w-full"
                height={10}
                width={10}
                strokeWidth={1.7}
              />
            </div>
          </div>
        </DrawerTrigger>
        <DrawerContent className="select-none">
          {isLoading ? (
            <div className="mx-auto my-20 h-6 w-6 animate-spin rounded-full border-b-2 border-current border-teal-700" />
          ) : (
            <div className="mx-auto w-full max-w-sm">
              <DrawerHeader>
                <DrawerTitle className="text-left">Nouvelle séance</DrawerTitle>
                <DrawerDescription className="flex items-center justify-between text-gray-500 dark:text-gray-400">
                  <Label htmlFor="session-type-switch">
                    {showMinimaliste
                      ? "Entrainement minimaliste (2x/semaine)"
                      : "Entrainement complet (3x/semaine)"}
                  </Label>
                  <Switch
                    id="session-type-switch"
                    checked={showMinimaliste}
                    onCheckedChange={setShowMinimaliste}
                  />
                </DrawerDescription>
              </DrawerHeader>
              <div className="p-4 pb-0">
                <div className="flex items-center justify-evenly space-x-2">
                  {showMinimaliste ? (
                    <>
                      <Button
                        onClick={(e) => handleCreateSession(e, "Séance A")}
                        variant="outline"
                        size="icon"
                        className="flex h-24 w-24 flex-col rounded-md drop-shadow active:translate-y-0.5 active:drop-shadow-none"
                      >
                        <div className="mt-2 text-lg leading-5">Séance A</div>
                        <img
                          src={bodyFront}
                          alt="bodyFront"
                          className="h-16 w-9"
                        />
                        <span className="sr-only">Séance A</span>
                      </Button>
                      <Button
                        onClick={(e) => handleCreateSession(e, "Séance B")}
                        variant="outline"
                        size="icon"
                        className="flex h-24 w-24 flex-col rounded-md drop-shadow active:translate-y-0.5 active:drop-shadow-none"
                      >
                        <div className="mt-2 text-lg leading-5">Séance B</div>
                        <img
                          src={bodyBack}
                          alt="bodyBack"
                          className="h-16 w-9"
                        />
                        <span className="sr-only">Séance B</span>
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button
                        onClick={(e) => handleCreateSession(e, "Upper A")}
                        variant="outline"
                        size="icon"
                        className="flex h-24 w-24 flex-col rounded-md drop-shadow active:translate-y-0.5 active:drop-shadow-none"
                      >
                        <div className="mb-1 mt-2 text-lg">Upper A</div>
                        <img
                          src={upperFront}
                          alt="upper-front"
                          className="mb-1 size-14"
                        />
                        <span className="sr-only">Upper A</span>
                      </Button>
                      <Button
                        onClick={(e) => handleCreateSession(e, "Lower")}
                        variant="outline"
                        size="icon"
                        className="flex h-24 w-24 flex-col rounded-md drop-shadow active:translate-y-0.5 active:drop-shadow-none"
                      >
                        <div className="mb-1 mt-2 text-lg">Lower</div>
                        <img
                          src={lower}
                          alt="lower"
                          className="mb-1 h-14 w-12"
                        />
                        <span className="sr-only">Lower</span>
                      </Button>
                      <Button
                        onClick={(e) => handleCreateSession(e, "Upper B")}
                        variant="outline"
                        size="icon"
                        className="flex h-24 w-24 flex-col rounded-md drop-shadow active:translate-y-0.5 active:drop-shadow-none"
                      >
                        <div className="mb-1 mt-2 text-lg">Upper B</div>
                        <img
                          src={upperBack}
                          alt="upper-back"
                          className="mb-1 size-14"
                        />
                        <span className="sr-only">Upper B</span>
                      </Button>
                    </>
                  )}
                </div>
                <div className="mt-3 h-2"></div>
              </div>
            </div>
          )}
        </DrawerContent>
      </Drawer>

      <Dialog open={showBodyWeightModal} onOpenChange={setShowBodyWeightModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Poids requis</DialogTitle>
            <DialogDescription>
              Veuillez entrer votre poids corporel pour créer cette séance.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <Label htmlFor="body-weight-input">Poids (kg)</Label>
            <Input
              id="body-weight-input"
              type="number"
              step="0.1"
              min="0"
              value={tempBodyWeight}
              onChange={(e) => setTempBodyWeight(e.target.value)}
              placeholder="Ex: 70.5"
              className="mt-2"
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={handleBodyWeightCancel}>
              Annuler
            </Button>
            <Button onClick={handleBodyWeightSubmit}>Créer la séance</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default NewSessionButton;
