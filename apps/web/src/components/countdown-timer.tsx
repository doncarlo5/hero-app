import { useState } from "react"
import { LucidePlay, LucideRotateCcw } from "lucide-react"
import { CountdownCircleTimer } from "react-countdown-circle-timer"

function CountDownTimer({ exerciseTypeTimer }: { exerciseTypeTimer: number }) {
  const [isTimerPlaying, setIsTimerPlaying] = useState(false)
  const [key, setKey] = useState(0)

  const renderTime = ({ remainingTime }: { remainingTime: number }) => {
    if (remainingTime === 0) {
      const ding = new Audio("/ding.mp3")
      ding.currentTime = 0
      ding.play()
      setTimeout(() => {
        setKey((prevKey) => prevKey + 1)
      }, 3000)
      setIsTimerPlaying(false)
      return (
        <div className="flex ">
          <div className="items-center justify-center ">
            <p className="flex animate-ping select-none justify-center text-3xl font-black tracking-tighter">GO !</p>
          </div>
        </div>
      )
    }

    if (Number.isNaN(remainingTime)) {
      return (
        <div className="flex ">
          <div className="flex items-center justify-center">
            <p className="flex w-3/4 select-none justify-center text-center font-semibold tracking-tighter">
              En attente de secondes...
            </p>
          </div>
        </div>
      )
    }

    const minutes = Math.floor(remainingTime / 60)
    const seconds = remainingTime % 60
    const formattedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`

    return (
      <div className="flex flex-col">
        <div className="select-none text-xs">Temps restant</div>
        <div className="flex justify-center text-2xl font-black">{`${minutes}:${formattedSeconds}`}</div>
      </div>
    )
  }

  const restartFunction = () => {
    setKey((prevKey) => prevKey + 1)
    setIsTimerPlaying(false)
  }

  return (
    <div className="flex justify-center gap-8">
      <div className="mb-4">
        <CountdownCircleTimer
          isSmoothColorTransition={true}
          isGrowing={true}
          rotation="counterclockwise"
          key={key}
          size={170}
          strokeWidth={17}
          isPlaying={isTimerPlaying}
          duration={exerciseTypeTimer}
          colors={["#0F766E", "#0F766E","#760f17", "#760f17" ]}
          colorsTime={[7, 5, 2, 0]}
          onComplete={() => ({ shouldRepeat: false, delay: 1, newInitialRemainingTime: exerciseTypeTimer })}
        >
          {renderTime}
        </CountdownCircleTimer>
      </div>
      <div className="flex items-center justify-center pb-3">
        {isTimerPlaying ? (
          <button
            className="group flex h-12 min-w-20 max-w-36 cursor-pointer items-center justify-center rounded-xl bg-teal-700 px-6 py-0.5 text-[#FFF] shadow-none transition-shadow duration-300 hover:shadow-lg  active:translate-y-0.5 active:shadow-inner "
            onClick={() => restartFunction()}
          >
            <LucideRotateCcw className="h-6 w-6" />
          </button>
        ) : (
          <button
            className="group flex h-12 min-w-20 max-w-36 cursor-pointer items-center justify-center rounded-xl bg-teal-700 px-6 py-0.5 text-gray-900 shadow-none transition-shadow duration-300 hover:shadow-lg  active:translate-y-0.5 active:shadow-inner"
            onClick={() => setIsTimerPlaying(true)}
          >
            <LucidePlay className="h-6 w-6 stroke-white" />
          </button>
        )}
      </div>
    </div>
  )
}

export default CountDownTimer
