import { useState } from "react"
import { ChevronLeft, LucideClock4 } from "lucide-react"
import { Link } from "react-router-dom"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import CountDownTimer from "@/components/countdown-timer"
import { Navbar } from "@/components/navbar"

function TimerPage() {
  const [customTimer, setCustomTimer] = useState(120)

  return (
    <div className="">
      <Navbar />
      <main className="container mx-auto my-0 flex h-dvh max-w-lg flex-col">
        <div className="flex items-center pt-5">
          <Link to="/profile">
            <Button variant="outline" size="icon">
              <ChevronLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <h1 className="ml-5 text-3xl font-medium">Timer</h1>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center pt-5 ">
          <CountDownTimer exerciseTypeTimer={customTimer} />
          <p className="mb-5 text-center text-gray-500 dark:text-gray-400 md:text-xl">Choisi ton temps en secondes</p>
          <div className="flex">
            <div className="relative ">
              <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3.5">
                <LucideClock4 className="h-5 w-5 text-gray-400" />
              </div>
              <Input
                type="number"
                value={customTimer}
                onChange={(e) => setCustomTimer(parseInt(e.target.value))}
                id="input-group-1"
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 ps-10 text-lg text-gray-900   dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400  "
                placeholder="..."
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default TimerPage
