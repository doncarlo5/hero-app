import { useEffect, useState } from "react"
import { LockClosedIcon } from "@radix-ui/react-icons"
import { motion } from "framer-motion"
import { ChevronLeft, Unlock } from "lucide-react"
import Crossfire from "react-canvas-confetti/dist/presets/realistic"
import { Link } from "react-router-dom"

import { TrophyType } from "@/types/trophy.type"
import fetchApi from "@/lib/api-handler"
import { cn } from "@/lib/utils"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog"
import { Navbar } from "@/components/navbar"
import TrophyIcon from "@/components/TrophyIcon"

function TrophyPage() {
  const [trophies, setTrophies] = useState<TrophyType[]>([])
  const [selectedTrophy, setSelectedTrophy] = useState<TrophyType | null>(null)
  const [confetti, setConfetti] = useState(false)

  // Ref for confetti animation

  useEffect(() => {
    const fetchTrophies = async () => {
      try {
        const response: TrophyType[] = await fetchApi("/api/trophies")
        setTrophies(response)
      } catch (error) {
        console.error("Error fetching trophies:", error)
      }
    }

    fetchTrophies()
  }, [])

  // Group trophies by exercise type
  const groupedTrophies = trophies.reduce(
    (acc, trophy) => {
      if (!acc[trophy.exerciseType.name]) {
        acc[trophy.exerciseType.name] = []
      }
      acc[trophy.exerciseType.name].push(trophy)
      return acc
    },
    {} as Record<string, TrophyType[]>
  )

  // Calculate the number of achieved trophies per group
  const groupedTrophiesWithCounts = Object.keys(groupedTrophies).reduce(
    (acc, exerciseTypeName) => {
      const trophies = groupedTrophies[exerciseTypeName]
      const achievedCount = trophies.filter((trophy) => trophy.achieved).length
      const totalCount = trophies.length

      acc[exerciseTypeName] = { trophies, achievedCount, totalCount }
      return acc
    },
    {} as Record<string, { trophies: TrophyType[]; achievedCount: number; totalCount: number }>
  )

  const handleConfetti = () => {
    setConfetti(true)
    setTimeout(() => {
      setConfetti(false)
    }, 3000)
  }

  return (
    <div>
      <Navbar />
      <main className="container mx-auto my-0 flex h-dvh max-w-lg flex-col">
        <div className="flex items-center pt-5">
          <Link to="/profile">
            <Button variant="outline" size="icon">
              <ChevronLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <h1 className="ml-5 text-3xl font-medium">Trophées</h1>
          </div>
        </div>

        <Accordion type="multiple" className=" pb-20 pt-5 ">
          {Object.keys(groupedTrophiesWithCounts).map((exerciseTypeName) => {
            const { trophies, achievedCount, totalCount } = groupedTrophiesWithCounts[exerciseTypeName]
            return (
              <AccordionItem key={exerciseTypeName} value={exerciseTypeName}>
                <AccordionTrigger className=" ">
                  <p>
                    {exerciseTypeName}
                    <span className=" ml-1 text-gray-700 no-underline">
                      ({achievedCount}/{totalCount})
                    </span>
                  </p>
                </AccordionTrigger>
                <AccordionContent>
                  {trophies.map((trophy, i) => (
                    <div className=" w-full max-w-sm" key={trophy._id} onClick={() => setSelectedTrophy(trophy)}>
                      <div className="grid">
                        <div
                          className={cn(
                            " ml-9 mt-1 h-10 w-[0.15rem] translate-x-0.5 rounded-full",
                            trophy.achieved ? "bg-teal-700/80" : "bg-gray-200",
                            i === 0 && "hidden"
                          )}
                        ></div>

                        <div className="flex items-center gap-4">
                          <TrophyIcon
                            level={trophy.level}
                            achieved={trophy.achieved}
                            className={`size-20 ${trophy.achieved ? "" : "opacity-30 grayscale"}`}
                          />
                          <div className="space-y-1">
                            {trophy.achieved ? (
                              <div className="text-xl font-semibold capitalize">Trophée {trophy.trophyType}</div>
                            ) : (
                              <div className="mt-1 italic text-gray-500">???</div>
                            )}
                            {trophy.achieved ? (
                              <div className="text-sm text-gray-500">
                                Obtenu le {trophy.awardedAt ? new Date(trophy.awardedAt).toLocaleDateString() : ""}
                              </div>
                            ) : (
                              ""
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </AccordionContent>
              </AccordionItem>
            )
          })}
        </Accordion>

        {confetti && (
          <Crossfire
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              zIndex: 1000,
            }}
            autorun={{
              delay: 0,
              duration: 2500,
              speed: 0.2,
            }}
          />
        )}

        {selectedTrophy && (
          <Dialog open={!!selectedTrophy} onOpenChange={() => setSelectedTrophy(null)}>
            <DialogTitle>{""}</DialogTitle>
            <DialogContent className=" w-11/12 rounded-3xl sm:max-w-md">
              <DialogDescription>
                {selectedTrophy.achieved ? (
                  <div className=" relative">
                    <motion.div
                      className="absolute left-0 right-0 m-auto size-44"
                      animate={{
                        y: [0, -10, 0], // Move up by 10 units and then back down
                        transition: {
                          duration: 2.5,
                          ease: "easeInOut",
                          repeat: Infinity, // Repeat the animation infinitely
                          repeatType: "loop",
                        },
                      }}
                    >
                      <button onClick={() => handleConfetti()}>
                        <TrophyIcon
                          level={selectedTrophy.level}
                          achieved={selectedTrophy.achieved}
                          className="absolute -top-16  left-0 right-0 m-auto size-44"
                        />
                      </button>
                    </motion.div>
                    <div className=" flex h-full flex-col justify-between">
                      <div className="mt-28 flex flex-col items-center">
                        <div className=" flex flex-col items-center gap-4">
                          <div className="text-center text-4xl font-semibold capitalize text-gray-900 ">
                            {selectedTrophy.rewardText}
                          </div>
                          <div className=" px-3 text-gray-600">
                            Tu as obtenu le trophée{" "}
                            <span className=" font-medium capitalize ">{selectedTrophy.trophyType} </span> pour
                            l'exercice{" "}
                            <span className=" font-medium capitalize ">{selectedTrophy.exerciseType.name}</span> avec{" "}
                            {selectedTrophy.repsUser} reps.
                          </div>
                          <button className="flex w-fit items-center justify-evenly gap-2 rounded-lg border border-gray-300 bg-gray-500/60 px-2 py-1 text-xs text-white shadow-md shadow-gray-300">
                            <Unlock className="h-5 w-5" />
                            <div className=" flex flex-col text-left ">
                              <div className=" flex flex-row">{selectedTrophy.description}</div>
                              <div>{selectedTrophy.repsGoal} Rep min requises</div>
                            </div>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex h-full flex-col items-center justify-center gap-4">
                    <LockClosedIcon className="mx-auto h-16 w-16 text-gray-500" />
                    <div className="text-  font-medium ">{selectedTrophy.description}</div>
                  </div>
                )}
              </DialogDescription>
            </DialogContent>
          </Dialog>
        )}
      </main>
    </div>
  )
}

export default TrophyPage
