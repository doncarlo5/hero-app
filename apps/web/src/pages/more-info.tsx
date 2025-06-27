export function MoreInfo() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <main className="container mx-auto px-4">
        <section className="py-20">
          <h1 className="mb-12 text-center text-4xl font-bold">More Information</h1>
          
          {/* Hero description */}
          <div className="mx-auto mb-16 max-w-2xl text-center">
            <p className="mb-8 text-xl text-gray-600">
              Your personalized fitness companion for tracking workouts, setting goals, and achieving results. 
              Built for both beginners and experienced athletes.
            </p>
          </div>

          {/* Features */}
          <div className="mx-auto max-w-4xl">
            <h2 className="mb-12 text-center text-3xl font-bold">Key Features</h2>
            <div className="grid gap-8 md:grid-cols-3">
              <div className="rounded-lg p-6 text-center">
                <h3 className="mb-3 text-xl font-semibold">Workout Tracking</h3>
                <p className="text-gray-600">Log your exercises, sets, reps, and weights with our intuitive interface</p>
              </div>
              <div className="rounded-lg p-6 text-center">
                <h3 className="mb-3 text-xl font-semibold">Progress Analytics</h3>
                <p className="text-gray-600">Visualize your progress with detailed charts and statistics</p>
              </div>
              <div className="rounded-lg p-6 text-center">
                <h3 className="mb-3 text-xl font-semibold">Achievement System</h3>
                <p className="text-gray-600">Stay motivated with our trophy system and milestone tracking</p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default MoreInfo; 