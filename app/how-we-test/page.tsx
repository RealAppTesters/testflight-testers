import PublicFrame, { EditorialCTA } from "@/components/PublicFrame";
export const metadata = {
  title: "How We Test iOS Apps | TestFlightTesters",
  description:
    "From your TestFlight invitation to a reviewed PDF report: our structured real-device testing process.",
  alternates: { canonical: "/how-we-test" },
};
const steps = [
  [
    "Choose your testing requirements",
    "Select the testing type, tester count, hours and delivery option that fit your release.",
  ],
  [
    "Complete payment",
    "Pay through the existing secure PayPal checkout. A verified payment creates your order.",
  ],
  [
    "Share your app",
    "Sign in with your payment email and submit your TestFlight invitation, app description and dedicated test account instructions.",
  ],
  [
    "Tell us where to focus",
    "Share the important features, testing objectives, device preferences and relevant countries. Confirm the agreed scope before testing begins.",
  ],
  [
    "Real devices. Real use.",
    "The team exercises the agreed workflows on real iPhones and iPads within the purchased scope.",
  ],
  [
    "Turn findings into feedback",
    "QA feedback records issues, reproduction steps and relevant evidence from the testing engagement.",
  ],
  [
    "Review the report",
    "Your report is reviewed before an administrator explicitly approves it for delivery.",
  ],
  [
    "Get your final PDF",
    "Receive a report-ready email and sign in to privately view and download your report.",
  ],
];
export default function How() {
  return (
    <PublicFrame>
      <header className="e-hero">
        <span className="e-kicker">A THOUGHTFUL PROCESS. A STRONGER APP.</span>
        <h1>
          From your beta
          <br />
          to your <em>next breakthrough.</em>
        </h1>
        <p>
          A clear, human testing process.
          <br />
          Built around your app and the details that matter.
        </p>
      </header>
      <div className="e-process-layout">
        <div className="e-process">
          {steps.map(([title, body], i) => (
            <section key={title}>
              <span>{String(i + 1).padStart(2, "0")}</span>
              <div>
                <h2>{title}</h2>
                <p>{body}</p>
              </div>
            </section>
          ))}
        </div>
        <aside className="e-process-aside">
          <span className="e-app-mark">✓</span>
          <h2>
            Less guesswork.
            <br />
            More clarity.
          </h2>
          <p>
            Follow actual order updates in your dashboard. Your team controls
            testing statuses; no simulated activity or invented progress.
          </p>
          <div className="e-note">
            Every engagement has a defined scope. Requested devices and
            categories are subject to that scope and availability.
          </div>
        </aside>
      </div>
      <section className="e-coverage">
        <span className="e-kicker">WHAT WE CAN HELP YOU EXPLORE</span>
        <h2>The details make the difference.</h2>
        <div>
          {[
            "Functionality",
            "Login & authentication",
            "In-app purchases & subscriptions",
            "Navigation & UI/UX",
            "Performance",
            "Notifications",
            "Localization",
            "Accessibility",
          ].map((s, i) => (
            <article key={s}>
              <span>{["◎", "↪", "▣", "▦", "◷", "♧", "⊕", "✧"][i]}</span>
              <h3>{s}</h3>
            </article>
          ))}
        </div>
        <p>
          Available testing categories are selected when defining your brief.
          This list does not promise coverage beyond the purchased testing
          scope.
        </p>
      </section>
      <EditorialCTA />
    </PublicFrame>
  );
}
