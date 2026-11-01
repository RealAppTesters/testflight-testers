import Link from "next/link";
import PublicFrame, { EditorialCTA } from "@/components/PublicFrame";
import ArticleList from "@/components/ArticleList";
export const metadata = {
  title: "TestFlight & iOS QA Testing Journal | TestFlightTesters",
  description:
    "Practical guides to TestFlight recruitment, testing scope, device coverage and actionable QA reports.",
  alternates: { canonical: "/blog" },
};
export default function Blog() {
  return (
    <PublicFrame>
      <header className="e-hero">
        <span className="e-kicker">THE TESTFLIGHTTESTERS JOURNAL</span>
        <h1>
          Better testing.
          <br />
          <em>Better launches.</em>
        </h1>
        <p>
          Practical guides, thoughtful checklists and a fresh perspective
          <br />
          on building iOS apps people love to use.
        </p>
      </header>
      <Link
        href="/blog/how-to-find-real-testflight-testers"
        className="e-feature"
      >
        <div className="e-feature-art">
          <div className="e-phone">
            <span>9:41</span>
            <div className="e-app-mark">A</div>
            <h3>
              Ready for
              <br />a better beta?
            </h3>
            <div className="e-phone-button">Let’s test it ↗</div>
            <small>Good feedback starts here.</small>
          </div>
          <span className="e-art-label">
            REAL DEVICES.
            <br />
            REAL PERSPECTIVES.
          </span>
        </div>
        <div className="e-feature-copy">
          <span className="e-category">FEATURED GUIDE · GETTING STARTED</span>
          <h2>
            How to Find Real
            <br />
            TestFlight Testers
          </h2>
          <p>
            Go beyond downloads. Find people who can turn your beta into useful,
            actionable feedback.
          </p>
          <span className="e-meta">November 1, 2026 · 3 min read</span>
          <strong>Read the guide →</strong>
        </div>
      </Link>
      <ArticleList />
      <EditorialCTA />
    </PublicFrame>
  );
}
