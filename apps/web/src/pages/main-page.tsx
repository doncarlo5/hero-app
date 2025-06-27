import { useEffect, useState } from "react"
import { format } from "date-fns"
import { fr } from "date-fns/locale/fr"
import { LucidePlus } from "lucide-react"
import { FaDumbbell, FaTrophy, FaWeightScale } from "react-icons/fa6"
import { Link } from "react-router-dom"

import { TrophyType } from "@/types/trophy.type"
import fetchApi from "@/lib/api-handler"
import { Badge } from "@/components/ui/badge"
import { AnimatedCounter } from "@/components/animated-counter"
import { Navbar } from "@/components/navbar"
import NewSessionButton from "@/components/new-session-button"
import OnboardingModal from "@/components/onboarding"
import TrophyChart from "@/components/trophy-chart"
import WeekActivityCarousel from "@/components/week-activity-carousel"

import useAuth from "../context/use-auth"

export function MainPage() {
  const { user } = useAuth()
  const [lastSession, setLastSession] = useState([] as any)
  const [allSessions, setAllSessions] = useState([] as any)
  const [isLoading, setIsLoading] = useState(false)
  const [showOnboarding, setShowOnboarding] = useState(false)
  const [trophies, setTrophies] = useState([] as any)

  useEffect(() => {
    const fetchTrophies = async () => {
      try {
        const response: TrophyType[] = await fetchApi("/api/trophies")
        setTrophies(response)
        console.log("Trophies", response)
      } catch (error) {
        console.error("Error fetching trophies:", error)
      }
    }

    fetchTrophies()
  }, [])
  const calculateAchievedTrophies = (trophies: any) => {
    const achievedTrophies = trophies.filter((trophy: TrophyType) => trophy.achieved)
    return achievedTrophies.length
  }

  const fetchLastSession = async () => {
    try {
      setIsLoading(true)
      const response = await fetchApi(`/api/sessions?limit=1&sortBy=date_session:desc`)
      setLastSession(response[0])
    } catch (error: any) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  const fetchAllSessions = async () => {
    try {
      const response = await fetchApi(`/api/sessions?limit=1000&sortBy=date_session:desc`)
      setAllSessions(response)
    } catch (error: any) {
      console.error("Fetch error: ", error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchLastSession()
    fetchAllSessions()

    if (user && !user.hasSeenOnboarding) {
      setShowOnboarding(true)
    }
  }, [user])

  return (
    <div>
      {showOnboarding && <OnboardingModal onClose={() => setShowOnboarding(false)} />}
      <Navbar />
      <main className="container mx-auto my-0 flex h-dvh max-w-lg flex-col ">
        <div className="pt-10  ">
          <h1 className="mb-5 text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl/none">
            Bienvenue {user?.firstName}
          </h1>
          <div className="flex flex-col gap-4 pb-4 ">
            {isLoading ? (
              <div className="flex h-20 animate-pulse flex-col justify-between rounded-2xl bg-slate-100 px-3 py-2 shadow-lg">
                <div className="mb-4 h-6 w-24 rounded-full bg-gray-200"></div>
                <div className="h-5 w-32 rounded-full bg-gray-200"></div>
              </div>
            ) : (
              <div className="flex h-20 flex-col justify-between rounded-2xl bg-slate-100 px-3 py-2 shadow-lg dark:bg-slate-900 dark:bg-opacity-80">
                <div className="flex justify-between items-center">
                  {lastSession ? (
                    <h2 className="text-sm font-semibold uppercase tracking-tighter text-gray-500 ">Séance précédente</h2>
                  ) : (
                    <h2 className="text-sm font-semibold uppercase tracking-tighter text-gray-500 ">Aucune séance</h2>
                  )}
                  <Link className=" flex" to="/history">
                    <span className="jus flex rounded-full bg-gray-500/10 px-3 py-0.5 text-sm font-medium text-gray-800 hover:underline">
                      Voir plus →
                    </span>
                  </Link>
                </div>
                <div className="flex items-center justify-between text-slate-600 dark:text-gray-400">
                  <div className="flex gap-2">
                    {lastSession?.type_session && (
                      <Badge
                        variant={
                          lastSession.type_session === "Upper A"
                            ? "upperA"
                            : lastSession.type_session === "Upper B"
                              ? "upperB"
                              : lastSession.type_session === "Lower"
                                ? "lower"
                                : lastSession.type_session === "Séance A"
                                  ? "seanceA"
                                  : lastSession.type_session === "Séance B"
                                    ? "seanceB"
                                    : "default"
                        }
                      >
                        {lastSession.type_session}
                      </Badge>
                    )}
                    <p className=" capitalize text-sm">
                      {lastSession?.date_session &&
                        format(new Date(lastSession?.date_session), "EEE do MMMM yyyy", { locale: fr })}
                    </p>
                  </div>
                </div>
               
              </div>
            )}
          </div>
          <div className="flex flex-col pb-2">
            <WeekActivityCarousel />
          </div>

          <div className="flex flex-col gap-4 pb-2">
            <h1 className=" text-2xl font-bold">Progression</h1>
          </div>
          <div className="flex flex-col gap-3 pb-20">
            <div className=" flex h-64 gap-3   ">
              <div className=" flex w-1/2 flex-col gap-3 ">
                {isLoading ? (
                  <div className="flex h-16 animate-pulse flex-col justify-between rounded-2xl bg-slate-100 px-3 py-2 shadow-lg">
                    <div className="mb-4 h-6 w-24 rounded-full bg-gray-200"></div>
                    <div className="h-5 w-32 rounded-full bg-gray-200"></div>
                  </div>
                ) : (
                  <Link
                    className="group flex h-16 flex-col justify-between gap-1 rounded-2xl bg-slate-100 px-3 py-2 shadow-lg active:translate-y-0.5 active:shadow-inner dark:bg-slate-900 dark:bg-opacity-80"
                    to="/history"
                  >
                    <div className="flex items-center gap-1 text-sm leading-none text-slate-600">
                      <FaDumbbell color="rgb(71 85 105)" className="" height={17} width={17} strokeWidth={2.2} />
                      <p>Total séances</p>
                    </div>
                    <div className=" text-3xl font-extrabold leading-none">
                      <AnimatedCounter from={0} to={allSessions.length} />
                    </div>
                  </Link>
                )}
                {isLoading ? (
                  <div className="flex h-full animate-pulse flex-col justify-between rounded-2xl bg-slate-100 px-3 py-2 shadow-lg">
                    <div className="mb-4 h-6 w-24 rounded-full bg-gray-200 "></div>
                    <div className="h-5 w-32 rounded-full bg-gray-200 "></div>
                  </div>
                ) : (
                  <Link
                    className="group flex h-full flex-col  justify-between gap-2 rounded-2xl bg-slate-100 px-3 py-2 shadow-lg active:translate-y-0.5 active:shadow-inner dark:bg-slate-900 dark:bg-opacity-80"
                    to="/profile/trophy"
                  >
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      <FaTrophy color="rgb(71 85 105)" className="" height={17} width={17} strokeWidth={2.2} />
                      Total trophées
                    </div>
                    <TrophyChart />
                    <div className=" text-center text-xl font-extrabold">
                      <AnimatedCounter from={0} to={calculateAchievedTrophies(trophies)} />
                      /27
                    </div>
                  </Link>
                )}
              </div>
              <div className=" flex w-1/2 flex-col gap-3">
                {isLoading ? (
                  <div className="flex h-40 animate-pulse flex-col justify-between rounded-2xl bg-slate-100 px-3 py-2 shadow-lg">
                    <div className="mb-4 h-6 w-24 rounded-full bg-gray-200 "></div>
                    <div className="h-5 w-32 rounded-full bg-gray-200 "></div>
                  </div>
                ) : (
                  <Link
                    className="group flex h-full  flex-col justify-between rounded-2xl bg-slate-100 px-3 py-2 shadow-lg active:translate-y-0.5 active:shadow-inner dark:bg-slate-900 dark:bg-opacity-80"
                    to="/profile/type/new-type"
                  >
                    <div className=" my-auto flex flex-col items-center justify-center gap-2 text-sm text-slate-600">
                      <div className=" text-center">
                        <p className=" leading-4 text-gray-500">Create a</p>{" "}
                        <p className="font-bold leading-4 tracking-tighter">NEW EXERCISE</p>
                      </div>
                      <div className=" flex-none">
                        <LucidePlus color="rgb(71 85 105)" className="" height={30} width={30} strokeWidth={1.5} />
                      </div>
                    </div>
                  </Link>
                )}
                {isLoading ? (
                  <div className="flex h-[5.5rem] animate-pulse flex-col justify-between rounded-2xl bg-slate-100 px-3 py-2 shadow-lg">
                    <div className="mb-4 h-6 w-24 rounded-full bg-gray-200"></div>
                    <div className="h-5 w-32 rounded-full bg-gray-200"></div>
                  </div>
                ) : (
                  <Link
                    className="group flex h-fit flex-col justify-between rounded-2xl bg-slate-100 px-3 py-2 shadow-lg active:translate-y-0.5 active:shadow-inner dark:bg-slate-900 dark:bg-opacity-80"
                    to={`/history/session/${lastSession?._id}`}
                  >
                    <div className="flex items-baseline gap-2 text-sm text-slate-600">
                      <FaWeightScale color="rgb(71 85 105)" className="" height={17} width={17} strokeWidth={2.2} />
                      Poids
                    </div>
                    <div className=" text-3xl font-medium leading-none">
                      {lastSession?.body_weight} <span className=" text-xl font-extralight leading-none">KG</span>
                    </div>
                    <div className="text-[0.7rem] font-extralight capitalize leading-4 text-slate-600 ">
                      {lastSession?.date_session &&
                        format(new Date(lastSession?.date_session), "EEE do MMMM yyyy", {
                          locale: fr,
                        })}
                    </div>
                  </Link>
                )}

                {/* {isLoading ? (
              <div className="col-span-2 flex h-24 w-1/2 animate-pulse flex-row items-center justify-center gap-3 rounded-2xl bg-slate-100 px-3 py-2 shadow-lg">
                <div className=" h-10 w-10 rounded-full bg-gray-200 "></div>
                <div className="h-5 w-32 rounded-full bg-gray-200 "></div>
              </div>
            ) : (
              <Link
                className="group col-span-2 flex h-24 w-1/2 items-center justify-center rounded-2xl bg-slate-100 px-2 py-2 shadow-lg active:translate-y-0.5 active:shadow-inner dark:bg-slate-900 dark:bg-opacity-80"
                to="/profile"
              >
                <div className="flex items-center gap-4 pl-4">
                  <LucideCircleUser color="rgb(107 114 128)" className="" height={35} width={35} strokeWidth={1.5} />
                  <div>
                    <p className="tab tab-whishlist block text-slate-800">
                      Consulte ton <span className="font-bold">profil</span>
                    </p>
                    <p className="text-xs tracking-tighter text-slate-600">
                      Voir tes statistiques et tes derniers trophées obtenus.
                    </p>
                  </div>
                </div>
              </Link>
            )} */}
                <NewSessionButton />
              </div>
            </div>
          </div>
          <div className=" h-20 w-full"></div>
        </div>
      </main>
    </div>
  )
}

export default MainPage
