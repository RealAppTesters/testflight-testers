import type { Metadata } from "next";
import Link from "next/link";
import PricingCalculator from "@/components/PricingCalculator";

export const metadata: Metadata = {
  title: "TestFlight Testing Pricing | iOS App Testing Services",
  description:
    "Transparent TestFlight testing pricing: $10 per tester per hour. Choose testing type, number of testers, hours, and delivery speed. Real iPhone and iPad testers, detailed QA reports.",
  keywords:
    "TestFlight testing pricing, iOS app testing cost, TestFlight testers price, iOS QA testing rates, hire TestFlight testers cost, iPhone app testing price",
  alternates: {
    canonical: "https://testflighttesters.com/pricing",
  },
  openGraph: {
    title: "TestFlight Testing Pricing | iOS App Testing Services",
    description:
      "Transparent TestFlight testing pricing: $10 per tester per hour. Choose testing type, number of testers, hours, and delivery speed.",
    url: "https://testflighttesters.com/pricing",
    siteName: "TestFlightTesters",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "TestFlight Testing Pricing | iOS App Testing Services",
    description:
      "Transparent TestFlight testing pricing: $10 per tester per hour. Choose testing type, number of testers, hours, and delivery speed.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function PricingPage() {
  return (
    <>
      {/* Background blobs */}
      <div className="blob blob-1"></div>
      <div className="blob blob-2"></div>
      <div className="blob blob-3"></div>

      <div className="container" style={{ position: "relative", zIndex: 2 }}>
        {/* Back link */}
        <div style={{ padding: "24px 0" }}>
          <Link href="/" className="back-link">
            <i className="fas fa-arrow-left"></i> Back to Home
          </Link>
        </div>

        {/* Hero */}
        <section className="landing-hero">
          <div className="hero-badge">
            <i className="fas fa-calculator"></i> Simple, Transparent Pricing
          </div>
          <h1>
            TestFlight Testing<br />
            <span className="highlight">Pricing</span>
          </h1>
          <p className="landing-hero-sub">
            Every project is priced the same way: <strong>$10 per tester per hour</strong>,
            plus a small surcharge for faster delivery. No hidden fees, no minimums,
            no subscriptions.
          </p>
        </section>

        {/* How pricing works */}
        <section className="landing-section">
          <h2>How Pricing Works</h2>
          <p>
            Our pricing is designed to be predictable and easy to understand. The final
            cost depends on four factors:
          </p>

          <ul className="landing-list">
            <li>
              <strong>Testing type</strong> — what you want tested (functionality, UX,
              bug hunting, performance, localization, or accessibility)
            </li>
            <li>
              <strong>Number of testers</strong> — how many real iPhone and iPad users
              will test your app
            </li>
            <li>
              <strong>Hours per tester</strong> — how long each tester spends on your app
              (up to 10 hours per tester)
            </li>
            <li>
              <strong>Delivery speed</strong> — how quickly you need the results
            </li>
          </ul>

          <div style={{
            background: "rgba(108, 60, 224, 0.04)",
            border: "1px solid rgba(108, 60, 224, 0.12)",
            borderRadius: "16px",
            padding: "24px",
            margin: "24px 0",
          }}>
            <p style={{
              fontSize: "1.1rem",
              fontWeight: 600,
              color: "var(--text)",
              marginBottom: "12px",
              fontFamily: "monospace",
            }}>
              Total = Testers × Hours × $10 + Delivery Surcharge
            </p>
            <p style={{ margin: 0, color: "var(--gray)", fontSize: "0.95rem" }}>
              The delivery surcharge is a small per-tester fee: Standard is free, Priority
              is +$2 per tester, and Express is +$5 per tester.
            </p>
          </div>
        </section>

        {/* Example pricing */}
        <section className="landing-section">
          <h2>Example Prices</h2>
          <p>
            Here are a few common scenarios so you can estimate cost before using the
            calculator:
          </p>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: "20px",
            marginTop: "24px",
          }}>
            {/* Example 1 */}
            <div style={{
              background: "var(--card-bg)",
              border: "1px solid var(--border)",
              borderRadius: "var(--radius)",
              padding: "24px",
              boxShadow: "var(--shadow)",
            }}>
              <div style={{ fontSize: "0.85rem", color: "var(--gray)", textTransform: "uppercase", letterSpacing: "0.05em", fontWeight: 600, marginBottom: "8px" }}>
                Small test
              </div>
              <div style={{ fontSize: "2rem", fontWeight: 800, color: "var(--primary)", marginBottom: "8px" }}>
                $50
              </div>
              <div style={{ fontSize: "0.9rem", color: "var(--gray)", lineHeight: 1.6 }}>
                5 testers · 1 hour each · 1 testing type · Standard delivery
              </div>
            </div>

            {/* Example 2 */}
            <div style={{
              background: "var(--card-bg)",
              border: "2px solid var(--primary)",
              borderRadius: "var(--radius)",
              padding: "24px",
              boxShadow: "var(--shadow-hover)",
              position: "relative",
            }}>
              <div style={{
                position: "absolute",
                top: "-12px",
                right: "20px",
                background: "var(--primary)",
                color: "white",
                fontSize: "0.7rem",
                fontWeight: 700,
                padding: "2px 12px",
                borderRadius: "40px",
                textTransform: "uppercase",
                letterSpacing: "0.05em",
              }}>
                Popular
              </div>
              <div style={{ fontSize: "0.85rem", color: "var(--gray)", textTransform: "uppercase", letterSpacing: "0.05em", fontWeight: 600, marginBottom: "8px" }}>
                Standard QA
              </div>
              <div style={{ fontSize: "2rem", fontWeight: 800, color: "var(--primary)", marginBottom: "8px" }}>
                $150
              </div>
              <div style={{ fontSize: "0.9rem", color: "var(--gray)", lineHeight: 1.6 }}>
                5 testers · 3 hours each · 1 testing type · Standard delivery
              </div>
            </div>

            {/* Example 3 */}
            <div style={{
              background: "var(--card-bg)",
              border: "1px solid var(--border)",
              borderRadius: "var(--radius)",
              padding: "24px",
              boxShadow: "var(--shadow)",
            }}>
              <div style={{ fontSize: "0.85rem", color: "var(--gray)", textTransform: "uppercase", letterSpacing: "0.05em", fontWeight: 600, marginBottom: "8px" }}>
                Deep test
              </div>
              <div style={{ fontSize: "2rem", fontWeight: 800, color: "var(--primary)", marginBottom: "8px" }}>
                $500
              </div>
              <div style={{ fontSize: "0.9rem", color: "var(--gray)", lineHeight: 1.6 }}>
                10 testers · 5 hours each · 1 testing type · Standard delivery
              </div>
            </div>

            {/* Example 4 */}
            <div style={{
              background: "var(--card-bg)",
              border: "1px solid var(--border)",
              borderRadius: "var(--radius)",
              padding: "24px",
              boxShadow: "var(--shadow)",
            }}>
              <div style={{ fontSize: "0.85rem", color: "var(--gray)", textTransform: "uppercase", letterSpacing: "0.05em", fontWeight: 600, marginBottom: "8px" }}>
                Pre-launch rush
              </div>
              <div style={{ fontSize: "2rem", fontWeight: 800, color: "var(--primary)", marginBottom: "8px" }}>
                $275
              </div>
              <div style={{ fontSize: "0.9rem", color: "var(--gray)", lineHeight: 1.6 }}>
                5 testers · 5 hours each · 1 testing type · Express delivery
              </div>
            </div>
          </div>
        </section>

        {/* The calculator */}
        <section className="landing-section" id="calculator">
          <h2>Calculate Your Exact Price</h2>
          <p>
            Use the calculator below to get an instant quote. Select your testing type,
            the number of testers, hours per tester, and delivery speed — the total price
            updates in real time.
          </p>

          <div style={{ marginTop: "24px" }}>
            <PricingCalculator />
          </div>
        </section>

        {/* Delivery speeds explained */}
        <section className="landing-section">
          <h2>Delivery Speeds Explained</h2>
          <p>
            Choose how quickly you need your QA report. Delivery speed affects the timeline
            from when we receive your TestFlight link to when you receive your report.
          </p>

          <div className="testing-grid">
            <div className="testing-item">
              <div className="icon"><i className="fas fa-truck"></i></div>
              <h3>Standard — Free</h3>
              <p>
                Report delivered in 2 to 3 days. Best value for most projects, with enough
                time for testers to be thorough.
              </p>
            </div>

            <div className="testing-item">
              <div className="icon"><i className="fas fa-shipping-fast"></i></div>
              <h3>Priority — +$2 per tester</h3>
              <p>
                Report delivered in 1 to 2 days. Good middle ground when you're close to
                launch and want faster feedback.
              </p>
            </div>

            <div className="testing-item">
              <div className="icon"><i className="fas fa-bolt"></i></div>
              <h3>Express — +$5 per tester</h3>
              <p>
                Report delivered within 24 hours. Best when you have a specific deadline
                or an App Store submission window approaching.
              </p>
            </div>
          </div>
        </section>

        {/* Testing types and what they cost */}
        <section className="landing-section">
          <h2>Testing Types — All at $10 per Tester per Hour</h2>
          <p>
            Every testing type is priced the same. You choose what matters most for your
            app; the rate doesn't change.
          </p>

          <div className="testing-grid">
            <div className="testing-item">
              <div className="icon"><i className="fas fa-cogs"></i></div>
              <h3>Functionality Testing</h3>
              <p>
                Verify that every feature works as expected — onboarding, navigation,
                data input, error handling, core flows.
              </p>
            </div>

            <div className="testing-item">
              <div className="icon"><i className="fas fa-users"></i></div>
              <h3>UX Testing</h3>
              <p>
                Real users evaluate design, flow, clarity, and overall experience —
                including UX suggestions for improvement.
              </p>
            </div>

            <div className="testing-item">
              <div className="icon"><i className="fas fa-bug"></i></div>
              <h3>Bug Hunting</h3>
              <p>
                Active bug discovery with reproduction steps, screenshots, and severity
                ratings for every issue found.
              </p>
            </div>

            <div className="testing-item">
              <div className="icon"><i className="fas fa-tachometer-alt"></i></div>
              <h3>Performance Testing</h3>
              <p>
                Launch time, responsiveness, memory usage, and battery impact measured
                on real iPhones and iPads.
              </p>
            </div>

            <div className="testing-item">
              <div className="icon"><i className="fas fa-globe"></i></div>
              <h3>Localization Testing</h3>
              <p>
                Translation accuracy, formatting, text truncation, and cultural
                appropriateness across your supported languages.
              </p>
            </div>

            <div className="testing-item">
              <div className="icon"><i className="fas fa-universal-access"></i></div>
              <h3>Accessibility Testing</h3>
              <p>
                VoiceOver, Dynamic Type, color contrast, and touch target sizing — for
                an app that's usable by everyone.
              </p>
            </div>
          </div>
        </section>

        {/* What's included */}
        <section className="landing-section">
          <h2>What's Included in Every Plan</h2>
          <p>
            No matter what you choose, every project includes:
          </p>
          <ul className="landing-list">
            <li>Real iPhone and iPad testers (never simulators)</li>
            <li>Testing across multiple iOS versions</li>
            <li>Structured QA reports with reproduction steps</li>
            <li>Screenshots and screen recordings of bugs</li>
            <li>Device and iOS version details for every issue</li>
            <li>Severity ratings for prioritization</li>
            <li>A prioritized summary of what to fix first</li>
            <li>Support via email and WhatsApp</li>
          </ul>
        </section>

        {/* What's not included / important to know */}
        <section className="landing-section">
          <h2>Important Things to Know</h2>
          <ul className="landing-list">
            <li>
              All prices are in <strong>USD</strong>. Payments are processed securely
              through PayPal.
            </li>
            <li>
              We test <strong>TestFlight builds</strong> by default. If your app isn't on
              TestFlight yet, contact us first.
            </li>
            <li>
              Testing begins within <strong>24 hours</strong> of receiving your TestFlight
              link and email.
            </li>
            <li>
              Each tester works <strong>up to 10 hours</strong> per project, but you can
              specify fewer hours per tester.
            </li>
            <li>
              We don't <strong>fix bugs</strong> — we find and document them so your team
              can fix them.
            </li>
            <li>
              Refunds are available if we don't start within 48 hours of receiving your
              link.
            </li>
          </ul>
        </section>

        {/* FAQ */}
        <section className="landing-section">
          <h2>Pricing FAQ</h2>

          <div className="faq-grid" style={{ marginTop: "24px" }}>
            <div className="faq-item">
              <div className="q"><i className="fas fa-question-circle"></i> Are there any hidden fees?</div>
              <div className="a">
                No. The total you see in the calculator is the total you pay. The only
                extra is the optional delivery surcharge if you choose Priority or Express.
              </div>
            </div>
            <div className="faq-item">
              <div className="q"><i className="fas fa-question-circle"></i> Why is pricing the same for every testing type?</div>
              <div className="a">
                Because every testing type takes roughly the same amount of tester time.
                You're paying for testing hours, not for a specific checklist.
              </div>
            </div>
            <div className="faq-item">
              <div className="q"><i className="fas fa-question-circle"></i> How many testers should I hire?</div>
              <div className="a">
                For most indie apps, 5 testers is a good starting point. For apps with
                complex flows or critical features, 10 to 15 gives better coverage.
              </div>
            </div>
            <div className="faq-item">
              <div className="q"><i className="fas fa-question-circle"></i> How many hours per tester do I need?</div>
              <div className="a">
                For a simple app, 1 to 2 hours is enough. For a complex app with many
                features, 3 to 5 hours gives more thorough coverage.
              </div>
            </div>
            <div className="faq-item">
              <div className="q"><i className="fas fa-question-circle"></i> Do you offer bulk discounts?</div>
              <div className="a">
                For larger projects (10+ testers, multiple rounds of testing), contact us
                directly at support@testflighttesters.com.
              </div>
            </div>
            <div className="faq-item">
              <div className="q"><i className="fas fa-question-circle"></i> What payment methods do you accept?</div>
              <div className="a">
                We currently accept PayPal. This works internationally and accepts credit
                cards, debit cards, and PayPal balance.
              </div>
            </div>
          </div>
        </section>

        {/* Internal links */}
        <section className="landing-section">
          <p style={{ textAlign: "center", color: "var(--gray)" }}>
            Learn more:{" "}
            <Link href="/testflight-testers" style={{ color: "var(--primary)", fontWeight: 600 }}>
              Hire TestFlight testers
            </Link>
            {" · "}
            <Link href="/ios-app-testing" style={{ color: "var(--primary)", fontWeight: 600 }}>
              iOS app testing services
            </Link>
            {" · "}
            <Link href="/iphone-app-testing" style={{ color: "var(--primary)", fontWeight: 600 }}>
              iPhone app testing
            </Link>
          </p>
        </section>

        {/* Final CTA */}
        <section className="cta-section">
          <h2>Ready to start testing?</h2>
          <p>
            Get an instant quote above or start your order now — testing begins within 24
            hours.
          </p>
          <Link href="/#pricing" className="btn-primary">
            <i className="fas fa-rocket"></i> Start Testing Now
          </Link>
        </section>
      </div>
    </>
  );
}
