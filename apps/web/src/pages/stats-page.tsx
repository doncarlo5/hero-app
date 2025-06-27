import { ChevronLeft } from "lucide-react"
import { Link } from "react-router-dom"

import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import BodyWeightChart from "@/components/body-weight-chart"
import ExerciseChart from "@/components/exercise-chart"
import { Navbar } from "@/components/navbar"

function StatsPage() {
  return (
    <div>
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
              <h1 className="ml-5 text-3xl font-medium">Statistiques</h1>
            </div>
          </div>
          <Tabs defaultValue="exercise">
            <TabsList className="my-5 grid grid-cols-2">
              <TabsTrigger value="exercise">Exercices</TabsTrigger>
              <TabsTrigger value="weight_body">Poids du corps</TabsTrigger>
            </TabsList>
            <TabsContent className="h-96" value="exercise">
              <ExerciseChart />
            </TabsContent>
            <TabsContent className="h-96" value="weight_body">
              <BodyWeightChart />
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  )
}

export default StatsPage
