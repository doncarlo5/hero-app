import { useState } from "react"
import useAuth from "@/context/use-auth"
import {
  LucideActivity,
  LucideLineChart,
  LucideLogOut,
  LucidePencilRuler,
  LucideStar,
  LucideTimer,
  LucideTrophy,
  LucideUserRoundCog,
} from "lucide-react"
import { Link } from "react-router-dom"

import fetchApi from "@/lib/api-handler"

import { Button } from "./ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Textarea } from "./ui/textarea"
import { toast } from "./ui/use-toast"

function DashboardComponent() {
  const { user, handleLogout } = useAuth()
  const [open, setOpen] = useState(false)
  const [formState, setFormState] = useState({ subject: "", message: "" })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleFeedbackSubmit = async (e: any) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      if (!formState.subject || !formState.message) {
        throw new Error("Veuillez remplir tous les champs.")
      }
      await fetchApi("/api/feedbacks", {
        method: "POST",
        body: JSON.stringify({
          userId: user ? user._id : null,
          subject: formState.subject,
          message: formState.message,
        }),
      })

      toast({
        title: "Feeback envoyé!",
        description: "Merci pour votre contribution.",
        variant: "success",
      })
      setFormState({ subject: "", message: "" })
      setOpen(false)
    } catch (error: any) {
      setError(error.message)
      console.error(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="">
      <div className="mx-auto grid max-w-sm grid-cols-2 grid-rows-3 gap-2">
        <Button variant={"outline"} asChild className="h-24 ">
          <Link to="/profile/type">
            <div className="flex flex-col items-center justify-center gap-1">
              <LucidePencilRuler strokeWidth={1.1} size={31} />
              Mes exercices
            </div>
          </Link>
        </Button>
        <Button variant={"outline"} asChild className="h-24 ">
          <Link to="/profile/stats">
            <div className="flex flex-col items-center justify-center gap-1">
              <LucideLineChart strokeWidth={1.1} size={32} />
              Stats
            </div>
          </Link>
        </Button>
        <Button variant={"outline"} asChild className="h-24 ">
          <Link to="/profile/trophy">
            <div className="flex flex-col items-center justify-center gap-1">
              <LucideTrophy strokeWidth={1.1} size={32} />
              Trophées
            </div>
          </Link>
        </Button>
        <Button variant={"outline"} asChild className="h-24 ">
          <Link to="/profile/timer">
            <div className="flex flex-col items-center justify-center gap-1">
              <LucideTimer strokeWidth={1.1} size={32} />
              Timer
            </div>
          </Link>
        </Button>

        <Button variant={"outline"} asChild className="h-24 ">
          <Link to="/profile/settings">
            <div className="flex flex-col items-center justify-center gap-1">
              <LucideUserRoundCog strokeWidth={1.1} size={32} />
              Informations
            </div>
          </Link>
        </Button>
        <Button variant={"outline"} asChild className="h-24 ">
          <Link to="/profile/program">
            <div className="flex flex-col items-center justify-center gap-1">
              <LucideActivity strokeWidth={1.1} size={32} />
              Programme
            </div>
          </Link>
        </Button>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button variant={"outline"} className="flex h-24 flex-col gap-1">
              <LucideStar strokeWidth={1.1} size={32} />
              Feedback
            </Button>
          </DialogTrigger>
          <DialogContent className=" mx-0 w-11/12 rounded-2xl px-3">
            <DialogHeader>
              <DialogTitle className="text-left">Feedback</DialogTitle>
              <DialogDescription className="text-left">Décrivez votre expérience de l'application.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-2 ">
              {error && <p className="text-sm text-red-500">{error}</p>}
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="subject" className="text-right">
                  Sujet
                </Label>
                <Input
                  id="subject"
                  value={formState.subject}
                  onChange={(e) => setFormState({ ...formState, subject: e.target.value })}
                  required
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="message" className="text-right">
                  Message
                </Label>
                <Textarea
                  id="message"
                  value={formState.message}
                  onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                  required
                  className="col-span-3"
                />
              </div>
              <div className="flex justify-evenly gap-2">
                <Button
                  variant="outline"
                  onClick={() => setFormState({ ...formState, message: formState.message + "\n• Bug: " })}
                  className="text-xs"
                >
                  Bug
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setFormState({ ...formState, message: formState.message + "\n• Feature: " })}
                  className="text-xs"
                >
                  Feature
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setFormState({ ...formState, message: formState.message + "\n• Séance: " })}
                  className="text-xs"
                >
                  Séance
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setFormState({ ...formState, message: formState.message + "\n• Design: " })}
                  className="text-xs"
                >
                  Design
                </Button>
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" onClick={handleFeedbackSubmit} disabled={loading}>
                {loading ? "Envoi en cours..." : "Envoyer"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        <Button variant={"outline"} onClick={() => handleLogout()} className="flex h-24 flex-col gap-1">
          <LucideLogOut strokeWidth={1.1} size={31} />
          Déconnexion
        </Button>
      </div>
    </div>
  )
}

export default DashboardComponent
