import { useEffect, useState } from "react";
import { ScrollView, View, Modal, Pressable, ActivityIndicator } from "react-native";
import { Stack, useRouter } from "expo-router";
import {
  ChevronDown,
  ChevronUp,
  Minus,
  PlusCircle,
} from "lucide-react-native";

import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { fetchApi } from "@/lib/api-handler";

interface ExerciseType {
  _id: string;
  name: string;
}

interface ExerciseProgram {
  exerciseType: ExerciseType;
  alternatives: ExerciseType[];
  order: number;
  _id?: string;
}

const sessionOptions = ["Upper A", "Lower", "Upper B", "Séance A", "Séance B"];

export default function ProgramPage() {
  const [sessionType, setSessionType] = useState("Upper A");
  const [exercises, setExercises] = useState<ExerciseProgram[]>([]);
  const [availableExercises, setAvailableExercises] = useState<ExerciseType[]>([]);
  const [pickerVisible, setPickerVisible] = useState(false);
  const [targetExercise, setTargetExercise] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const fetchAllExerciseTypes = async (type: string) => {
    try {
      const res = await fetchApi(`/api/exercise-type?type_session=${type}&limit=1000`);
      setAvailableExercises(res || []);
    } catch (e) {
      console.error("Error fetching exercise types", e);
    }
  };

  const fetchProgram = async () => {
    setIsLoading(true);
    try {
      const res = await fetchApi(`/api/program/${sessionType}`);
      setExercises(res?.exercises || []);
    } catch (e) {
      console.error("Error fetching program", e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProgram();
    fetchAllExerciseTypes(sessionType);
  }, [sessionType]);

  const openAddExercise = () => {
    setTargetExercise(null);
    setPickerVisible(true);
  };

  const openAddAlternative = (index: number) => {
    setTargetExercise(index);
    setPickerVisible(true);
  };

  const handleSelect = (exercise: ExerciseType) => {
    if (targetExercise === null) {
      const newOrder = exercises.length + 1;
      setExercises([...exercises, { exerciseType: exercise, order: newOrder, alternatives: [] }]);
    } else {
      const updated = [...exercises];
      updated[targetExercise].alternatives.push(exercise);
      setExercises(updated);
    }
    setPickerVisible(false);
  };

  const moveExerciseUp = (index: number) => {
    if (index === 0) return;
    const updated = [...exercises];
    const temp = updated[index - 1];
    updated[index - 1] = updated[index];
    updated[index] = temp;
    setExercises(updated.map((e, i) => ({ ...e, order: i + 1 })));
  };

  const moveExerciseDown = (index: number) => {
    if (index === exercises.length - 1) return;
    const updated = [...exercises];
    const temp = updated[index + 1];
    updated[index + 1] = updated[index];
    updated[index] = temp;
    setExercises(updated.map((e, i) => ({ ...e, order: i + 1 })));
  };

  const removeExercise = (index: number) => {
    const updated = exercises.filter((_, i) => i !== index).map((e, i) => ({ ...e, order: i + 1 }));
    setExercises(updated);
  };

  const moveAlternativeUp = (exerciseIndex: number, altIndex: number) => {
    if (altIndex === 0) return;
    const updated = [...exercises];
    const alts = updated[exerciseIndex].alternatives;
    const temp = alts[altIndex - 1];
    alts[altIndex - 1] = alts[altIndex];
    alts[altIndex] = temp;
    setExercises(updated);
  };

  const moveAlternativeDown = (exerciseIndex: number, altIndex: number) => {
    const updated = [...exercises];
    const alts = updated[exerciseIndex].alternatives;
    if (altIndex === alts.length - 1) return;
    const temp = alts[altIndex + 1];
    alts[altIndex + 1] = alts[altIndex];
    alts[altIndex] = temp;
    setExercises(updated);
  };

  const removeAlternative = (exerciseIndex: number, altIndex: number) => {
    const updated = [...exercises];
    updated[exerciseIndex].alternatives = updated[exerciseIndex].alternatives.filter((_, i) => i !== altIndex);
    setExercises(updated);
  };

  const saveProgram = async () => {
    try {
      await fetchApi("/api/program", {
        method: "POST",
        body: JSON.stringify({
          sessionType,
          exercises: exercises.map((ex) => ({
            exerciseType: ex.exerciseType._id,
            order: ex.order,
            alternatives: ex.alternatives.map((alt) => alt._id),
          })),
        }),
      });
      router.back();
    } catch (e) {
      console.error("Error saving program", e);
    }
  };

  return (
    <>
      <Stack.Screen options={{ title: "Programme" }} />
      <View className="flex-1 bg-background dark:bg-background-dark">
        <View className="p-4">
          <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-4">
            <View className="flex-row gap-2">
              {sessionOptions.map((type) => (
                <Pressable
                  key={type}
                  onPress={() => setSessionType(type)}
                  className={`px-3 py-1 rounded-md border ${sessionType === type ? "bg-primary border-primary" : "border-border"}`}
                >
                  <Text className={sessionType === type ? "text-white" : ""}>{type}</Text>
                </Pressable>
              ))}
            </View>
          </ScrollView>

          <Button onPress={openAddExercise} className="mb-4">
            Ajouter un exercice
          </Button>

          {isLoading ? (
            <View className="flex-1 items-center justify-center">
              <ActivityIndicator />
            </View>
          ) : (
            <ScrollView className="flex-1">
              {exercises.map((exercise, index) => (
                <View key={index} className="mb-3 rounded-lg border border-border p-3">
                  <View className="flex-row items-center justify-between">
                    <Text>
                      {exercise.order}. {exercise.exerciseType.name}
                    </Text>
                    <View className="flex-row">
                      <Pressable onPress={() => openAddAlternative(index)} className="p-1">
                        <PlusCircle size={18} />
                      </Pressable>
                      <Pressable
                        disabled={index === 0}
                        onPress={() => moveExerciseUp(index)}
                        className="p-1"
                      >
                        <ChevronUp size={18} />
                      </Pressable>
                      <Pressable
                        disabled={index === exercises.length - 1}
                        onPress={() => moveExerciseDown(index)}
                        className="p-1"
                      >
                        <ChevronDown size={18} />
                      </Pressable>
                      <Pressable onPress={() => removeExercise(index)} className="p-1">
                        <Minus size={18} />
                      </Pressable>
                    </View>
                  </View>

                  {exercise.alternatives.length > 0 && (
                    <View className="mt-2 ml-4">
                      {exercise.alternatives.map((alt, altIndex) => (
                        <View
                          key={alt._id}
                          className="flex-row items-center justify-between border-b border-dotted border-border py-1"
                        >
                          <Text>
                            {exercise.order}.{altIndex + 1}. {alt.name}
                          </Text>
                          <View className="flex-row">
                            <Pressable
                              disabled={altIndex === 0}
                              onPress={() => moveAlternativeUp(index, altIndex)}
                              className="p-1"
                            >
                              <ChevronUp size={16} />
                            </Pressable>
                            <Pressable
                              disabled={altIndex === exercise.alternatives.length - 1}
                              onPress={() => moveAlternativeDown(index, altIndex)}
                              className="p-1"
                            >
                              <ChevronDown size={16} />
                            </Pressable>
                            <Pressable
                              onPress={() => removeAlternative(index, altIndex)}
                              className="p-1"
                            >
                              <Minus size={16} />
                            </Pressable>
                          </View>
                        </View>
                      ))}
                    </View>
                  )}
                </View>
              ))}
            </ScrollView>
          )}

          <Button onPress={saveProgram} className="mt-4">
            Enregistrer
          </Button>
        </View>
      </View>

      <Modal visible={pickerVisible} animationType="slide">
        <View className="flex-1 bg-background dark:bg-background-dark p-4">
          <ScrollView>
            {availableExercises.map((ex) => (
              <Pressable
                key={ex._id}
                onPress={() => handleSelect(ex)}
                className="border-b border-border py-3"
              >
                <Text>{ex.name}</Text>
              </Pressable>
            ))}
          </ScrollView>
          <Button onPress={() => setPickerVisible(false)} className="mt-4">
            Fermer
          </Button>
        </View>
      </Modal>
    </>
  );
}

