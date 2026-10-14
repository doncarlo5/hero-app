import { Link } from "react-router-dom";

import { AppStoreButton } from "@/components/app-store-button";
import { SiteLayout } from "@/components/site-layout";

// Also reached by old web app links (/login, /main, /history...): point those users to mobile
export function NotFoundPage() {
  return (
    <SiteLayout>
      <section className="flex flex-col items-center gap-6 py-24 text-center">
        <h1 className="text-4xl font-bold tracking-tight">Page not found</h1>
        <p className="max-w-md text-gray-600">
          The Hero App web app has been replaced by the mobile app. Your
          sessions, exercises and trophies are waiting for you there.
        </p>
        <AppStoreButton />
        <Link to="/" className="text-sm text-gray-600 hover:underline">
          Back to the home page
        </Link>
      </section>
    </SiteLayout>
  );
}
