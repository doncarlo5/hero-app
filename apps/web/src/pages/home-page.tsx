import { Link } from "react-router-dom";

import BorderRotateButton from "@/components/ui/border-rotate-button";

export function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <main className="container mx-auto px-4">
        {/* Hero Section */}
        <section className="flex flex-col items-center gap-20 py-20 text-center">
          <h1 className="text-5xl font-bold tracking-tighter sm:text-6xl md:text-7xl">
            Hero App
          </h1>
          <div className="flex flex-col items-center gap-4">
            <Link to="/login">
              <BorderRotateButton />
            </Link>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-8 text-center text-sm text-gray-600">
          <Link to="/privacy-policy" className="hover:underline">
            Privacy Policy
          </Link>
          <span className="mx-2">•</span>
          <Link to="/more-info" className="hover:underline">
            More Info
          </Link>
          <span className="mx-2">•</span>
          <a href="mailto:contact@hero-app.org" className="hover:underline">
            Support
          </a>
        </footer>
      </main>
    </div>
  );
}

export default HomePage;
