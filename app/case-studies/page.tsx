import Link from "next/link";
import PublicFrame, { EditorialCTA } from "@/components/PublicFrame";
import { caseStudies } from "@/lib/case-studies";
export const metadata = {
  title: "Illustrative iOS Testing Case Studies | TestFlightTesters",
  description:
    "Clearly labeled examples of testing briefs, investigation approaches and actionable QA findings.",
  alternates: { canonical: "/case-studies" },
};
export default function Cases() {
  return (
    <PublicFrame>
      <header className="e-hero">
        <span className="e-kicker">A CLOSER LOOK AT THE PROCESS</span>
        <h1>
          Small details.
          <br />
          <em>Meaningful improvements.</em>
        </h1>
        <p>
          Explore how a focused testing brief can turn
          <br />
          uncertainty into a clear next step.
        </p>
      </header>
      <div className="e-note">
        ILLUSTRATIVE EXAMPLES · The apps, scenarios and findings below are
        fictional. They demonstrate our approach and are not genuine customer
        work, testimonials or measured outcomes.
      </div>
      <div className="e-case-grid">
        {caseStudies.map((c, i) => (
          <Link
            key={c.slug}
            href={`/case-studies/${c.slug}`}
            className="e-article-card"
          >
            <div className={`e-case-art cover-${i}`}>
              <div className="e-phone">
                <span>9:41</span>
                <div className="e-app-mark">{i === 0 ? "♥" : "▤"}</div>
                <h3>{i === 0 ? "A stronger start." : "A clearer picture."}</h3>
                <div className="e-phone-button">
                  {i === 0 ? "Your next workout →" : "Your budget, at a glance"}
                </div>
              </div>
              <span className="e-art-label">
                ILLUSTRATIVE
                <br />
                TESTING EXAMPLE
              </span>
            </div>
            <div className="e-card-body">
              <span className="e-category">{c.category}</span>
              <h2>{c.name}</h2>
              <p>{c.summary}</p>
              <strong>Explore the example →</strong>
            </div>
          </Link>
        ))}
      </div>
      <p className="e-source-note">
        Real case studies can be added after the customer has given permission
        and findings have been verified.
      </p>
      <EditorialCTA />
    </PublicFrame>
  );
}
