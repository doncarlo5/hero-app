import { useEffect, useState } from "react"
import { PolarAngleAxis, RadialBar, RadialBarChart, ResponsiveContainer } from "recharts"


import fetchApi from "@/lib/api-handler"
import { TrophyType } from "@/types/trophy.type"

const COLORS = ["#38b2ac", "#e0e0e0"] // Teal for achieved, gray for unachieved

function TrophyChart() {
  const [trophies, setTrophies] = useState<TrophyType[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [data, setData] = useState<any[]>([])

  // Fetch all trophies
  const fetchTrophies = async () => {
    try {
      const response: TrophyType[] = await fetchApi("/api/trophies")
      setTrophies(response)

      // Calculate achieved vs unachieved trophies

      const achievedTrophies = response.filter((trophy) => trophy.achieved).length

      // Prepare data for the radial bar chart
      setData([{ name: "Achieved", value: achievedTrophies, fill: COLORS[0] }])

      setIsLoading(false)
    } catch (error) {
      console.error("Error fetching trophies:", error)
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchTrophies()
  }, [])

  // Calculate percentage of achieved trophies
  const totalTrophies = trophies.length
  const achievedTrophies = trophies.filter((trophy) => trophy.achieved).length
  const achievedPercentage = totalTrophies > 0 ? (achievedTrophies / totalTrophies) * 100 : 0

  return (
    <>
      {isLoading && <main className="flex flex-1 items-center justify-center"></main>}

      {!isLoading && totalTrophies > 0 && (
        <ResponsiveContainer width="100%">
          <RadialBarChart
            cx="50%"
            cy="50%"
            innerRadius="100%"
            outerRadius="100%"
            barSize={8}
            data={data}
            startAngle={90}
            endAngle={-270}
          >
            {/* Gradient definition */}
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#38b2ac" />
                <stop offset="100%" stopColor="#4fd1c5" />
              </linearGradient>
            </defs>

            <PolarAngleAxis type="number" domain={[0, totalTrophies]} tick={false} />

            <RadialBar
              style={{
                padding: "-20px",
              }}
              background
              dataKey="value"
              cornerRadius={10} // Rounded ends
              fill="url(#gradient)" // Apply gradient
            />

            {/* Display percentage in the center of the radial bar chart */}
            <text
              x="50%"
              y="52%"
              textAnchor="middle"
              dominantBaseline="middle"
              style={{
                fontSize: "24px",
                fill: "#333",
                fontWeight: "bold",
              }}
            >
              {`${achievedPercentage.toFixed(0)}%`}
            </text>
          </RadialBarChart>
        </ResponsiveContainer>
      )}

      {totalTrophies === 0 && !isLoading && (
        <div className="text-center text-gray-500">
          <div>En attente...</div>
        </div>
      )}
    </>
  )
}

export default TrophyChart
