import { AppStoreButton } from "@/components/app-store-button";
import { SiteLayout } from "@/components/site-layout";

const FEATURES = [
  {
    title: "Workout tracking",
    description:
      "Log every set, rep and weight, with your previous session prefilled and a rest timer per exercise.",
  },
  {
    title: "Programs",
    description:
      "Follow your Upper / Lower program session by session, with alternatives for each exercise.",
  },
  {
    title: "Progress & trophies",
    description:
      "See your loads evolve on charts and unlock trophies relative to your body weight.",
  },
];

export function LandingPage() {
  return (
    <SiteLayout>
      <section className="flex flex-col items-center gap-8 py-16 text-center sm:py-24">
        <img
          src="/app-icon.png"
          alt="Hero App icon"
          className="h-28 w-28 rounded-3xl shadow-lg"
        />
        <div className="flex flex-col gap-4">
          <h1 className="text-5xl font-bold tracking-tighter sm:text-6xl">
            Hero App
          </h1>
          <p className="mx-auto max-w-xl text-lg text-gray-600">
            Your workout journal: log your sessions, follow your program and
            watch your strength grow.
          </p>
        </div>
        <AppStoreButton />
      </section>

      <section className="grid gap-6 pb-20 sm:grid-cols-3">
        {FEATURES.map((feature) => (
          <div
            key={feature.title}
            className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm"
          >
            <h2 className="mb-2 text-lg font-semibold">{feature.title}</h2>
            <p className="text-gray-600">{feature.description}</p>
          </div>
        ))}
      </section>
    </SiteLayout>
  );
}
