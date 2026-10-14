import { ReactNode } from "react";
import { Link } from "react-router-dom";

import { PRIVACY_POLICY_PATH, SUPPORT_EMAIL } from "@/links";

export function SiteLayout(props: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-white to-gray-50 text-gray-900">
      <header className="mx-auto flex w-full max-w-5xl items-center justify-between px-4 py-6">
        <Link to="/" className="flex items-center gap-2 font-semibold">
          <img src="/app-icon.png" alt="" className="h-8 w-8 rounded-lg" />
          Hero App
        </Link>
        <Link
          to="/support"
          className="text-sm text-gray-600 hover:text-gray-900"
        >
          Support
        </Link>
      </header>

      <main className="mx-auto w-full max-w-5xl flex-1 px-4">
        {props.children}
      </main>

      <footer className="py-8 text-center text-sm text-gray-600">
        {/* Plain link: the privacy policy is a static page, not a route of this app */}
        <a href={PRIVACY_POLICY_PATH} className="hover:underline">
          Privacy Policy
        </a>
        <span className="mx-2">•</span>
        <Link to="/support" className="hover:underline">
          Support
        </Link>
        <span className="mx-2">•</span>
        <a href={`mailto:${SUPPORT_EMAIL}`} className="hover:underline">
          {SUPPORT_EMAIL}
        </a>
      </footer>
    </div>
  );
}
