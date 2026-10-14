import { useEffect } from "react";

import { SiteLayout } from "@/components/site-layout";
import { PRIVACY_POLICY_PATH, SUPPORT_EMAIL } from "@/links";

export function SupportPage() {
  useEffect(() => {
    document.title = "Support - Hero App";
  }, []);

  return (
    <SiteLayout>
      <section className="mx-auto max-w-2xl py-16">
        <h1 className="mb-6 text-4xl font-bold tracking-tight">Support</h1>
        <p className="mb-10 text-lg text-gray-600">
          A question, a bug or an idea? Write to us and we will get back to you.
        </p>

        <a
          href={`mailto:${SUPPORT_EMAIL}`}
          className="mb-12 inline-block rounded-xl bg-gray-900 px-6 py-3 font-semibold text-white hover:bg-gray-700"
        >
          {SUPPORT_EMAIL}
        </a>

        <div className="space-y-8">
          <div>
            <h2 className="mb-2 text-xl font-semibold">Sending feedback</h2>
            <p className="text-gray-600">
              In the app, open Settings and choose Feedback to send us a message
              directly.
            </p>
          </div>
          <div>
            <h2 className="mb-2 text-xl font-semibold">
              Deleting your account and data
            </h2>
            <p className="text-gray-600">
              To request the deletion of your account and its data, email us
              from the address of your account. See the{" "}
              <a href={PRIVACY_POLICY_PATH} className="underline">
                privacy policy
              </a>{" "}
              for details on the data we keep.
            </p>
          </div>
          <div>
            <h2 className="mb-2 text-xl font-semibold">
              Where is the web app?
            </h2>
            <p className="text-gray-600">
              Hero App now lives on mobile: your sessions, exercises and
              trophies are all in the app.
            </p>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
