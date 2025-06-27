import { useEffect, useState } from "react"
import { UpdateIcon } from "@radix-ui/react-icons"
import { format } from "date-fns"
import { ChevronLeft, Edit, LucideCalendarClock, LucideTrash } from "lucide-react"
import { Link, useNavigate, useParams } from "react-router-dom"

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
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"
import { Navbar } from "@/components/navbar"

import fetchApi from "../lib/api-handler"

const OneExercise = () => {
  const [isEditable, setIsEditable] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [session, setSession] = useState([] as any)
  const [exercise, setExercise] = useState<any>({})
  const [oneExerciseType, setOneExerciseType] = useState(null as any)
  const [exerciseTypes, setExerciseTypes] = useState([] as any[])
  const [formState, setFormState] = useState({
    id: "",
    name: "",
    rep1: "",
    rep2: "",
    rep3: "",
    rep4: "",
    weight1: "",
    weight2: "",
    weight3: "",
    weight4: "",
    comment: "",
  })
  const [isRep4, setIsRep4] = useState(false)

  const { exerciseId } = useParams()
  const navigate = useNavigate()

  const toggleIsEditable = (e: React.FormEvent) => {
    e.preventDefault()
    setIsEditable((current) => !current)
  }

  const fetchOneExercise = async () => {
    try {
      const response = await fetchApi(`/api/exercise-user/${exerciseId}`)
      setFormState({
        id: response._id,
        name: response.type.name,
        rep1: response.rep[0],
        rep2: response.rep[1],
        rep3: response.rep[2],
        rep4: response.rep[3],
        weight1: response.weight[0],
        weight2: response.weight[1],
        weight3: response.weight[2],
        weight4: response.weight[3],
        comment: response.comment,
      })
      if (response.rep[3]) {
        setIsRep4(true)
      }

      const newExercise = response.type
      setExercise(newExercise)
      setOneExerciseType(newExercise)
      return response
    } catch (error: any) {
      console.error(error.message)
    }
  }

  const fetchOneSession = async (sessionId: string) => {
    try {
      const response = await fetchApi(`/api/sessions/${sessionId}`)
      return response
    } catch (error) {
      console.error("Fetch error: ", error)
    }
  }

  const fetchAllExerciseTypes = async (_sessionData: any) => {
    try {
      const response = await fetchApi(`/api/exercise-type?limit=1000`)
      return response
    } catch (error) {
      console.error("Fetch error: ", error)
    }
  }

  useEffect(() => {
    const init = async () => {
      const oneExercise = await fetchOneExercise()
      const sessionData = await fetchOneSession(oneExercise.session)
      setSession(sessionData)
      const exerciseTypeData = await fetchAllExerciseTypes(sessionData)
      setExerciseTypes(exerciseTypeData)
    }
    init()
  }, [])

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { target } = event
    const key = target.id
    const value = target.value
    setFormState({ ...formState, [key]: value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      await fetchApi(`/api/exercise-user/${exerciseId}`, {
        method: "PUT",
        body: JSON.stringify({
          type: oneExerciseType,
          rep: [formState.rep1, formState.rep2, formState.rep3],
          weight: [formState.weight1, formState.weight2, formState.weight3],
          comment: formState.comment,
        }),
      })
      toast({
        title: "Exercice mis à jour.",
      })
      fetchOneExercise()
      setIsEditable(false)
    } catch (error: any) {
      console.error(error.message)
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    try {
      await fetchApi(`/api/exercise-user/${id}`, {
        method: "DELETE",
      })
      navigate(`/history/session/${session._id}`)
      toast({
        title: "Exercice supprimé.",
      })
    } catch (error) {
      toast({
        title: "Erreur lors de la suppression.",
      })
      console.error("Fetch error: ", error)
    }
  }

  return (
    <>
      <Navbar />
      <main className="container mx-auto my-0 flex h-dvh max-w-lg flex-col">
        <div className="space-y-6 ">
          <div className="flex items-center space-y-2 pt-5">
            <Link to={`/history/session/${session._id}`}>
              <Button variant="outline" size="icon">
                <ChevronLeft className="h-4 w-4" />
              </Button>
            </Link>
            <div>
              <h1 className="ml-5 text-2xl font-medium md:text-4xl">Ton exercice de </h1>
              <h1 className="ml-5 text-2xl font-bold md:text-4xl">{exercise?.name}</h1>
            </div>
          </div>

          {session._id && (
            <div>
              <Link
                className="flex items-center gap-1 text-sm text-gray-500 hover:underline dark:text-gray-400"
                to={`/history/session/${session._id}`}
              >
                <LucideCalendarClock className="size-4" />{" "}
                <div>Séance du {format(session?.date_session, "dd/MM/yyyy")}</div>
              </Link>
            </div>
          )}
          <Select disabled={!isEditable} onValueChange={setOneExerciseType}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder={formState.name} />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {exerciseTypes.map((type) => (
                  <SelectItem key={type._id} value={type._id}>
                    {type.name}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>

          <div className="space-y-4">
            <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4 px-5 pb-14">
              <div className="space-y-2">
                <Label htmlFor="rep1">Répétition 1</Label>
                <Input
                  id="rep1"
                  placeholder="`${formState.rep1}`"
                  value={formState.rep1}
                  onChange={handleChange}
                  required
                  type="number"
                  disabled={!isEditable}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="weight1">Poids 1</Label>
                <Input
                  id="weight1"
                  placeholder="Exemple: 20"
                  value={formState.weight1}
                  onChange={handleChange}
                  required
                  type="number"
                  disabled={!isEditable}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="rep2">Répétition 2</Label>
                <Input
                  id="rep2"
                  placeholder=""
                  value={formState.rep2}
                  onChange={handleChange}
                  required
                  type="number"
                  disabled={!isEditable}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="weight2">Poids 2</Label>
                <Input
                  id="weight2"
                  placeholder=""
                  value={formState.weight2}
                  onChange={handleChange}
                  required
                  type="number"
                  disabled={!isEditable}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="rep3">Répétition 3</Label>
                <Input
                  id="rep3"
                  placeholder=""
                  value={formState.rep3}
                  onChange={handleChange}
                  required
                  type="number"
                  disabled={!isEditable}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="weight3">Poids 3</Label>
                <Input
                  id="weight3"
                  placeholder=""
                  value={formState.weight3}
                  onChange={handleChange}
                  required
                  type="number"
                  disabled={!isEditable}
                />
              </div>
              {isRep4 && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="rep4">Répétition 4</Label>
                    <Input
                      id="rep4"
                      placeholder=""
                      value={formState.rep4}
                      onChange={handleChange}
                      required
                      type="number"
                      disabled={!isEditable}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="weight4">Poids 4</Label>
                    <Input
                      id="weight4"
                      placeholder=""
                      value={formState.weight4}
                      onChange={handleChange}
                      required
                      type="number"
                      disabled={!isEditable}
                    />
                  </div>
                </>
              )}

              <div className="col-span-2 space-y-2">
                <Label htmlFor="comment">Notes</Label>
                <Textarea
                  id="comment"
                  placeholder="Aucune note."
                  value={formState.comment}
                  onChange={handleChange}
                  maxLength={200}
                  disabled={!isEditable}
                />
              </div>

              <div className="col-span-2 flex gap-2 pb-5 ">
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant={"outline"} className="flex-none">
                      <LucideTrash size={20} />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent className="w-10/12 rounded-md ">
                    <AlertDialogHeader>
                      <AlertDialogTitle>Supprimer ce type ?</AlertDialogTitle>
                      <AlertDialogDescription>
                        Tu ne pourras pas récupérer ce type d'exercice une fois supprimé.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Annuler</AlertDialogCancel>
                      <AlertDialogAction variant="destructive" onClick={() => handleDelete(formState.id)}>
                        Confirmer
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
                {!isEditable ? (
                  <Button variant="outline" onClick={toggleIsEditable} className="col-span-2 w-full">
                    <Edit className="mr-2 h-4 w-4" />
                    Modifier
                  </Button>
                ) : isLoading ? (
                  <Button disabled className="col-span-2 w-full">
                    <UpdateIcon className="mr-2 h-4 w-4 animate-spin" />
                    Chargement
                  </Button>
                ) : (
                  <Button className="col-span-2 w-full" type="submit">
                    <UpdateIcon className="mr-2 h-4 w-4" />
                    Mettre à jour
                  </Button>
                )}
              </div>
            </form>
          </div>
        </div>
      </main>
    </>
  )
}

export default OneExercise
