import React, { useState } from "react"
import { ReloadIcon } from "@radix-ui/react-icons"
import { ChevronLeft, MinusCircle, PlusCircle } from "lucide-react"
import { Link, useNavigate } from "react-router-dom"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"
import { Navbar } from "@/components/navbar"

import fetchApi from "../lib/api-handler"

interface FormState {
  id: string
  name: string
  advice: string
  timer: string
  repRange1: string
  repRange2: string
  repRange3: string
  repRange4: string
  type_session: string[]
}

const NewType = () => {
  const [formState, setFormState] = useState<FormState>({
    id: "",
    name: "",
    advice: "",
    timer: "",
    repRange1: "",
    repRange2: "",
    repRange3: "",
    repRange4: "",
    type_session: [],
  })
  const [isLoading, setIsLoading] = useState(false)
  const [addRepRange4, setAddRepRange4] = useState(false)

  const navigate = useNavigate()

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { target } = event
    const key = target.id
    const value = target.value
    setFormState({ ...formState, [key]: value })
  }

  const handleCheckboxChange = (checked: boolean, id: string) => {
    setFormState((prevState) => {
      const updatedTypeSession = checked
        ? [...prevState.type_session, id]
        : prevState.type_session.filter((session) => session !== id)
      return { ...prevState, type_session: updatedTypeSession }
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      if (formState.type_session.length === 0) {
        toast({
          title: "⚠️ Tu dois choisir au moins un type de séance.",
          variant: "destructive",
        })
        return
      }
      setIsLoading(true)
      const timerValue = parseInt(formState.timer)
      await fetchApi(`/api/exercise-type`, {
        method: "POST",
        body: JSON.stringify({
          name: formState.name,
          type_session: formState.type_session,
          timer: timerValue,
          repRange1: formState.repRange1,
          repRange2: formState.repRange2,
          repRange3: formState.repRange3,
          repRange4: formState.repRange4,
          advice: formState.advice,
        }),
      })
      navigate(`/profile/type`)
      toast({
        title: "Type d'exercice créé.",
        description: "Vous pouvez maintenant faire votre séance!",
      })
    } catch (error: any) {
      setIsLoading(false)
      console.error(error.message)
    }
  }

  return (
    <>
      <Navbar />
      <div className="mx-auto max-w-sm space-y-6 p-4">
        <div className="flex items-center space-y-2 text-left">
          <Link to="/profile/type">
            <Button variant="outline" size="icon">
              <ChevronLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <h1 className="ml-5 text-3xl font-medium">Nouveau type </h1>
          </div>
        </div>
        <div className="space-y-4 ">
          <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4 px-5 pb-14">
            <div className="col-span-2 space-y-2">
              <Label htmlFor="name">
                Nom <span className="text-red-800 ">*</span>
              </Label>
              <Input
                id="name"
                placeholder="Ex: Développé couché - Haltères"
                value={formState.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-span-2 space-y-2">
              <Label>
                Type de séance <span className="text-red-800 ">*</span>
              </Label>
              <div className="flex items-center justify-evenly">
                <div className=" flex flex-col space-y-3">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="Upper A"
                      onCheckedChange={(checked) => handleCheckboxChange(Boolean(checked), "Upper A")}
                      checked={formState.type_session.includes("Upper A")}
                    />
                    <Label htmlFor="Upper A">Upper A</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="Lower"
                      onCheckedChange={(checked) => handleCheckboxChange(Boolean(checked), "Lower")}
                      checked={formState.type_session.includes("Lower")}
                    />
                    <Label htmlFor="Lower">Lower</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="Upper B"
                      onCheckedChange={(checked) => handleCheckboxChange(Boolean(checked), "Upper B")}
                      checked={formState.type_session.includes("Upper B")}
                    />
                    <Label htmlFor="Upper B">Upper B</Label>
                  </div>
                </div>
                <Separator orientation="vertical" className=" h-14" />
                <div className=" flex flex-col space-y-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="Séance A"
                      onCheckedChange={(checked) => handleCheckboxChange(Boolean(checked), "Séance A")}
                      checked={formState.type_session.includes("Séance A")}
                    />
                    <Label htmlFor="Séance A">Séance A</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="Séance B"
                      onCheckedChange={(checked) => handleCheckboxChange(Boolean(checked), "Séance B")}
                      checked={formState.type_session.includes("Séance B")}
                    />
                    <Label htmlFor="Séance B">Séance B</Label>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-span-2 space-y-2 ">
              <Label className="" htmlFor="timer">
                Temps de repos {`(en secondes)`}
                <span className="text-red-800 "> *</span>
              </Label>
              <Input
                required
                id="timer"
                placeholder="Ex: 120 s"
                value={formState.timer}
                onChange={handleChange}
                type="number"
              />
            </div>
            <div className="col-span-2 space-y-2 rounded-md bg-gray-50 p-5 dark:bg-slate-900 dark:bg-opacity-40">
              <div className=" flex items-center gap-2 ">
                <h2 className="col-span-2 text-lg font-medium">{`Objectif Répétitions [Range]`}</h2>
                <button type="button" onClick={() => setAddRepRange4(!addRepRange4)} className=" mt-1">
                  {addRepRange4 ? <MinusCircle className="h-4 w-4" /> : <PlusCircle className="h-4 w-4" />}
                </button>
              </div>
              <div className="space-y-2">
                <Label htmlFor="repRange1">
                  Série 1 <span className="text-red-800 ">*</span>
                </Label>
                <Input
                  required
                  id="repRange1"
                  placeholder="Ex: 4-6"
                  value={formState.repRange1}
                  onChange={handleChange}
                  type="text"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="repRange2">
                  Série 2 <span className="text-red-800 ">*</span>
                </Label>
                <Input
                  required
                  id="repRange2"
                  placeholder="Ex: 6-8"
                  value={formState.repRange2}
                  onChange={handleChange}
                  type="text"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="repRange3">
                  Série 3 <span className="text-red-800 ">*</span>
                </Label>
                <Input
                  required
                  id="repRange3"
                  placeholder="Ex: 8-10"
                  value={formState.repRange3}
                  onChange={handleChange}
                  type="text"
                />
              </div>
              {addRepRange4 && (
                <div className="space-y-2">
                  <Label htmlFor="repRange4">
                    Série 4 <span className="text-red-800 ">*</span>
                  </Label>
                  <Input
                    required
                    id="repRange4"
                    placeholder="Ex: 10-12"
                    value={formState.repRange4}
                    onChange={handleChange}
                    type="text"
                  />
                </div>
              )}
            </div>
            <div className="col-span-2 resize space-y-2">
              <Label htmlFor="advice">Conseil / Note</Label>
              <Textarea
                id="advice"
                placeholder="Banc à 30°, Prise neutre, etc."
                value={formState.advice}
                onChange={handleChange}
                maxLength={200}
              />
            </div>
            <div className="col-span-2 pb-5 ">
              {isLoading ? (
                <Button disabled className="w-full">
                  <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                  Chargement
                </Button>
              ) : (
                <Button className="col-span-2 w-full" type="submit">
                  Créer
                </Button>
              )}
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default NewType
