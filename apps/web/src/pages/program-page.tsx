import { useEffect, useState } from "react"
import { ChevronDownIcon, ChevronLeft, ChevronUpIcon, LoaderIcon, Minus, PlusCircle } from "lucide-react"
import { useNavigate } from "react-router-dom"

import { ExerciseType } from "@/types/exercise.type"
import fetchApi from "@/lib/api-handler"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "@/components/ui/use-toast"
import { Navbar } from "@/components/navbar"

interface ExerciseProgram {
  alternatives: ExerciseType[]
  exerciseType: ExerciseType
  order: number
  _id?: string
}

const ProgramPage = () => {
  const [sessionType, setSessionType] = useState("Upper A")
  const [exercises, setExercises] = useState<ExerciseProgram[]>([])
  const [availableExercises, setAvailableExercises] = useState<ExerciseType[]>([])
  const [newExercise, setNewExercise] = useState<string | null>(null)
  const [isLoadingTypes, setIsLoadingTypes] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const navigate = useNavigate()
  const [isEditable, setIsEditable] = useState(false)

  // Fetch all exercise types based on session type
  const fetchAllExerciseTypes = async (sessionType: string) => {
    setIsLoadingTypes(true)
    setError(null) // Reset error state
    try {
      const response = await fetchApi(`/api/exercise-type?type_session=${sessionType}&limit=1000`)
      if (response && response.length > 0) {
        setAvailableExercises(response)
      } else {
        setAvailableExercises([]) // Handle empty array case
      }
    } catch (error) {
      setError("Error fetching exercise types")
      console.error("Error fetching exercise types:", error)
    } finally {
      setIsLoadingTypes(false)
    }
  }

  // Fetch program exercises when the session type changes
  const fetchProgram = async () => {
    setIsLoading(true)
    try {
      const response = await fetchApi(`/api/program/${sessionType}`)
      setExercises(response.exercises || [])
      console.log("🚀 ~ fetchProgram ~ response:", response)
    } catch (error) {
      setError("Error fetching program exercises")
      console.error("Error fetching program exercises:", error)
    } finally {
      setIsLoading(false)
    }
  }

  // Fetch exercises on component mount or when sessionType changes
  useEffect(() => {
    fetchProgram()
    fetchAllExerciseTypes(sessionType)
  }, [sessionType])

  // Add a new exercise to the program
  const addExercise = () => {
    if (newExercise) {
      const newExerciseObj = availableExercises.find((ex) => ex._id === newExercise)
      if (newExerciseObj) {
        const newOrder = exercises.length + 1
        setExercises([...exercises, { exerciseType: newExerciseObj, order: newOrder, alternatives: [] }])
        setNewExercise(null) // Reset after adding
      }
    }
  }

  // Recalculate order after reordering exercises
  const updateExerciseOrder = (updatedExercises: ExerciseProgram[]) => {
    const reorderedExercises = updatedExercises.map((exercise, index) => ({
      ...exercise,
      order: index + 1, // Reassign correct order
    }))
    setExercises(reorderedExercises)
  }

  // Move exercise up
  const moveExerciseUp = (index: number) => {
    if (index > 0) {
      const updatedExercises = [...exercises]
      const temp = updatedExercises[index - 1]
      updatedExercises[index - 1] = updatedExercises[index]
      updatedExercises[index] = temp
      updateExerciseOrder(updatedExercises)
    }
  }

  // Move exercise down
  const moveExerciseDown = (index: number) => {
    if (index < exercises.length - 1) {
      const updatedExercises = [...exercises]
      const temp = updatedExercises[index + 1]
      updatedExercises[index + 1] = updatedExercises[index]
      updatedExercises[index] = temp
      updateExerciseOrder(updatedExercises)
    }
  }

  // Remove exercise
  const removeExercise = (index: number) => {
    const updatedExercises = exercises.filter((_, i) => i !== index)
    updateExerciseOrder(updatedExercises) // Update order after removing
  }

  // Add alternative to the exercise
  const addAlternative = (exerciseIndex: number) => {
    if (!newExercise) {
      toast({
        title: "Select an exercise",
        description: "Select an exercise before adding an alternative.",
        variant: "default",
      })
      return
    }

    const newAlternative = availableExercises.find((ex) => ex._id === newExercise)
    if (newAlternative) {
      const updatedExercises = [...exercises]
      updatedExercises[exerciseIndex].alternatives.push(newAlternative)
      setExercises(updatedExercises)
    }
  }

  // Move alternative up
  const moveAlternativeUp = (exerciseIndex: number, altIndex: number) => {
    if (altIndex > 0) {
      const updatedExercises = [...exercises]
      const alternatives = updatedExercises[exerciseIndex].alternatives
      const temp = alternatives[altIndex - 1]
      alternatives[altIndex - 1] = alternatives[altIndex]
      alternatives[altIndex] = temp
      setExercises(updatedExercises)
    }
  }

  // Move alternative down
  const moveAlternativeDown = (exerciseIndex: number, altIndex: number) => {
    const alternatives = exercises[exerciseIndex].alternatives
    if (altIndex < alternatives.length - 1) {
      const updatedExercises = [...exercises]
      const temp = alternatives[altIndex + 1]
      alternatives[altIndex + 1] = alternatives[altIndex]
      alternatives[altIndex] = temp
      setExercises(updatedExercises)
    }
  }

  // Remove alternative
  const removeAlternative = (exerciseIndex: number, altIndex: number) => {
    const updatedExercises = [...exercises]
    updatedExercises[exerciseIndex].alternatives = updatedExercises[exerciseIndex].alternatives.filter(
      (_, i) => i !== altIndex
    )
    setExercises(updatedExercises)
  }

  // Save program with updated order
  const saveProgram = async () => {
    try {
      await fetchApi("/api/program", {
        method: "POST",
        body: JSON.stringify({
          sessionType,
          exercises: exercises.map((exercise) => ({
            exerciseType: exercise.exerciseType._id,
            order: exercise.order,
            alternatives: exercise.alternatives.map((alt) => alt._id),
          })),
        }),
      })
      toast({
        title: "Programme enregistré",
        description: "Les modifications ont été enregistrées avec succès.",
        variant: "success",
      })
    } catch (error) {
      setError("Error saving program")
      console.error("Error saving program:", error)
    }
  }

  if (isLoading) {
    return (
      <main className="flex flex-1 items-center justify-center">
        <LoaderIcon className="h-6 w-6 animate-spin" />
      </main>
    )
  }

  return (
    <div>
      <Navbar />
      <main className="container mx-auto my-0 flex h-dvh max-w-lg flex-col">
        <div className="flex items-center pt-5">
          <Button variant="outline" size="icon" onClick={() => navigate("/")}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <h1 className="ml-5 text-3xl font-medium">Program</h1>
        </div>

        {/* Session Type Selector */}
        <div className="pt-5">
          <label htmlFor="session-type" className="mb-2 block text-sm font-medium">
            Select Session Type
          </label>
          <Select value={sessionType} onValueChange={setSessionType}>
            <SelectTrigger>
              <SelectValue placeholder="Select session type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Upper A">Upper A</SelectItem>
              <SelectItem value="Lower">Lower</SelectItem>
              <SelectItem value="Upper B">Upper B</SelectItem>
              <SelectItem value="Séance A">Séance A</SelectItem>
              <SelectItem value="Séance B">Séance B</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Error handling */}
        {error && <p className="mt-2 text-red-500">{error}</p>}

        {/* Available Exercises */}
        <div className="pt-5">
          <h2 className="mb-4 text-xl font-bold">Exercises</h2>
          <div className="flex w-full gap-2">
            {isLoadingTypes ? (
              <div className="flex w-10/12 justify-center">
                <LoaderIcon className="mr-2 h-6 w-6 animate-spin" />
                Loading exercises...
              </div>
            ) : availableExercises.length === 0 ? (
              <p>No exercises available for this session type.</p>
            ) : (
              <Select value={newExercise ?? ""} onValueChange={setNewExercise}>
                <SelectTrigger>
                  <SelectValue placeholder="Select exercise to add" />
                </SelectTrigger>
                <SelectContent>
                  {availableExercises.map((exercise) => (
                    <SelectItem key={exercise._id} value={exercise._id} className="truncate">
                      {exercise.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
            <Button onClick={addExercise} className="w-2/12" disabled={!newExercise}>
              Add
            </Button>
          </div>
        </div>

        {/* Display added exercises */}
        <div className="pt-5">
          <div className="flex items-baseline gap-4">
            <h2 className="mb-4 text-xl font-bold">Added Exercises</h2>
            <Button onClick={() => setIsEditable(!isEditable)} variant="outline">
              {isEditable ? "Done" : "Edit"}
            </Button>
          </div>
          <ul>
            {exercises.map((exercise, index) => (
              <li key={index} className="my-2 flex flex-col gap-2">
                <div className="flex items-center justify-between rounded-lg bg-gradient-to-b from-slate-100 to-slate-200/80 px-3 py-1 shadow">
                  {exercise.order}. {exercise.exerciseType.name}
                  <div className="flex">
                    <Button disabled={isEditable} variant="ghost" size="icon" onClick={() => addAlternative(index)}>
                      <PlusCircle className="h-4 w-4" />
                    </Button>
                    <Button
                      disabled={isEditable || index === 0}
                      variant="ghost"
                      size="icon"
                      onClick={() => moveExerciseUp(index)}
                    >
                      <ChevronUpIcon className="h-5 w-5" />
                    </Button>
                    <Button
                      disabled={isEditable || index === exercises.length - 1}
                      variant="ghost"
                      size="icon"
                      onClick={() => moveExerciseDown(index)}
                    >
                      <ChevronDownIcon className="h-5 w-5" />
                    </Button>
                    {isEditable && (
                      <Button variant="ghost" size="icon" onClick={() => removeExercise(index)}>
                        <Minus className="h-5 w-5 text-red-800" />
                      </Button>
                    )}
                  </div>
                </div>

                {/* Display alternatives with updated numbering (e.g., 1.1, 1.2, etc.) */}
                {exercise.alternatives.length > 0 && (
                  <ul className="ml-6">
                    {exercise.alternatives.map((alt, altIndex) => (
                      <li
                        key={alt._id}
                        className="my-1 flex items-center justify-between rounded-lg border-2 border-dotted px-3 py-1"
                      >
                        {exercise.order}.{altIndex + 1}. {alt.name} {/* Updated numbering */}
                        <div className="flex">
                          <Button
                            disabled={isEditable || altIndex === 0}
                            variant="ghost"
                            size="icon"
                            onClick={() => moveAlternativeUp(index, altIndex)}
                          >
                            <ChevronUpIcon className="h-5 w-5" />
                          </Button>
                          <Button
                            disabled={isEditable || altIndex === exercise.alternatives.length - 1}
                            variant="ghost"
                            size="icon"
                            onClick={() => moveAlternativeDown(index, altIndex)}
                          >
                            <ChevronDownIcon className="h-5 w-5" />
                          </Button>
                          {isEditable && (
                            <Button variant="ghost" size="icon" onClick={() => removeAlternative(index, altIndex)}>
                              <Minus className="h-5 w-5 text-red-800" />
                            </Button>
                          )}
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </div>

        {/* Save Program */}
        <div className="pb-20 pt-5">
          <Button onClick={saveProgram}>Save Program</Button>
        </div>
      </main>
    </div>
  )
}

export default ProgramPage
