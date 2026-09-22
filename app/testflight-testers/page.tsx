import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "TestFlight Testers | Hire Real iOS Beta Testers",
  description:
    "Hire professional TestFlight testers for your iOS app. Real iPhone and iPad users test your app, find bugs, validate UX, and deliver detailed QA reports before App Store submission.",
  keywords:
    "TestFlight testers, hire TestFlight testers, iOS beta testers, hire iOS testers, TestFlight testing service, iOS app testers",
  alternates: {
    canonical: "https://testflighttesters.com/testflight-testers",
  },
  openGraph: {
    title: "TestFlight Testers | Hire Real iOS Beta Testers",
    description:
      "Hire professional TestFlight testers for your iOS app. Real iPhone and iPad users test your app, find bugs, validate UX, and deliver detailed QA reports.",
    url: "https://testflighttesters.com/testflight-testers",
    siteName: "TestFlightTesters",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "TestFlight Testers | Hire Real iOS Beta Testers",
    description:
      "Hire professional TestFlight testers for your iOS app. Real iPhone and iPad users test your app, find bugs, validate UX, and deliver detailed QA reports.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function TestFlightTestersPage() {
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
            <i className="fas fa-rocket"></i> Hire Real TestFlight Testers
          </div>
          <h1>
            Hire TestFlight Testers<br />
            <span className="highlight">for Your iOS App</span>
          </h1>
          <p className="landing-hero-sub">
            Get real iPhone and iPad users to test your app through TestFlight.
            Find bugs, validate features, check user experience, and receive detailed
            QA feedback — all before you submit to the App Store.
          </p>
          <div className="hero-actions" style={{ justifyContent: "center" }}>
            <Link href="/#pricing" className="btn-primary">
              <i className="fas fa-rocket"></i> Start Testing
            </Link>
            <Link href="/#faq" className="btn-outline">
              <i className="fas fa-question-circle"></i> Read FAQ
            </Link>
          </div>
        </section>

        {/* What are TestFlight testers */}
        <section className="landing-section">
          <h2>What Are TestFlight Testers?</h2>
          <p>
            <strong>TestFlight testers</strong> are people who install and test your iOS app before
            it goes live on the App Store. TestFlight is Apple's official beta-testing platform —
            developers upload a build, invite testers, and receive feedback from real users on
            real devices.
          </p>
          <p>
            Apple allows developers to invite testers in two ways:
          </p>
          <ul className="landing-list">
            <li>
              <strong>By email invitation</strong> — you add a tester's Apple ID and they get
              an email with a redemption code
            </li>
            <li>
              <strong>By public link</strong> — you share a public TestFlight URL that anyone
              can use to install the beta version
            </li>
          </ul>
          <p>
            Apple currently allows up to <strong>10,000 external testers per app</strong>, which
            is far more than most indie developers need. What matters more than quantity is
            getting <em>the right testers</em> who will actually find bugs and provide useful
            feedback — and that's exactly what we provide.
          </p>
        </section>

        {/* Internal vs external testers */}
        <section className="landing-section">
          <h2>Internal vs External TestFlight Testers</h2>
          <p>
            Apple gives you two types of testers inside TestFlight, and they behave very
            differently:
          </p>

          <div className="comparison-grid">
            <div className="comparison-card">
              <h3>Internal Testers</h3>
              <ul className="landing-list">
                <li>Limited to 100 people</li>
                <li>Must be members of your App Store Connect team</li>
                <li>Can test builds immediately (no review)</li>
                <li>Typically your own team or colleagues</li>
              </ul>
              <p className="comparison-note">
                Good for quick sanity checks, but not real-world feedback.
              </p>
            </div>

            <div className="comparison-card highlight-card">
              <h3>External Testers</h3>
              <ul className="landing-list">
                <li>Up to 10,000 people</li>
                <li>Anyone with an Apple ID (invited by email or public link)</li>
                <li>First build requires a short Apple review</li>
                <li>Real users on real devices — genuine feedback</li>
              </ul>
              <p className="comparison-note">
                This is where our TestFlight testers fit in. You get access to trained testers
                who know exactly what to look for.
              </p>
            </div>
          </div>
        </section>

        {/* How our service works */}
        <section className="landing-section">
          <h2>How Our TestFlight Testing Service Works</h2>
          <p>
            We've made the process as simple as possible so you can focus on building:
          </p>

          <div className="steps-list" style={{ marginTop: "24px" }}>
            <div className="step-item">
              <span className="step-number">1</span>
              <div>
                <strong>You submit your TestFlight public link</strong>
                <p>
                  Share your public TestFlight invitation URL along with any specific
                  features you want us to focus on.
                </p>
              </div>
            </div>
            <div className="step-item">
              <span className="step-number">2</span>
              <div>
                <strong>We assign real testers to your app</strong>
                <p>
                  Our testers install your app on real iPhones and iPads running different
                  iOS versions.
                </p>
              </div>
            </div>
            <div className="step-item">
              <span className="step-number">3</span>
              <div>
                <strong>Testers run through your app</strong>
                <p>
                  Depending on the testing type you chose, testers run functionality checks,
                  UX evaluations, bug hunts, performance tests, or accessibility checks.
                </p>
              </div>
            </div>
            <div className="step-item">
              <span className="step-number">4</span>
              <div>
                <strong>You receive a detailed QA report</strong>
                <p>
                  Every bug, suggestion, and observation is documented with steps to
                  reproduce, screenshots, and device details.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* What testers actually do */}
        <section className="landing-section">
          <h2>What Our TestFlight Testers Actually Do</h2>
          <p>
            Our testers aren't just installing your app and clicking around. They follow
            structured QA processes designed to catch real issues before your users do:
          </p>
          <ul className="landing-list">
            <li>Follow every user flow from start to finish</li>
            <li>Tap every button, gesture, and interactive element</li>
            <li>Test edge cases and unexpected inputs</li>
            <li>Try to break the app (in a good way)</li>
            <li>Document bugs with screenshots and reproduction steps</li>
            <li>Suggest UX improvements based on real user experience</li>
            <li>Test on multiple iPhone and iPad models</li>
            <li>Report crashes, freezes, and performance issues</li>
          </ul>
        </section>

        {/* Devices */}
        <section className="landing-section">
          <h2>Devices We Test On</h2>
          <p>
            All testing is done on <strong>real Apple hardware</strong> — never simulators.
            This is critical because many bugs only appear on physical devices.
          </p>
          <div className="devices-grid" style={{ marginTop: "24px" }}>
            <div className="device-chip"><i className="fas fa-mobile-alt"></i> iPhone</div>
            <div className="device-chip"><i className="fas fa-mobile-alt"></i> iPhone Plus</div>
            <div className="device-chip"><i className="fas fa-mobile-alt"></i> iPhone Pro</div>
            <div className="device-chip"><i className="fas fa-mobile-alt"></i> iPhone Pro Max</div>
            <div className="device-chip"><i className="fas fa-tablet-alt"></i> iPad</div>
            <div className="device-chip"><i className="fas fa-tablet-alt"></i> iPad Air</div>
            <div className="device-chip"><i className="fas fa-tablet-alt"></i> iPad Pro</div>
          </div>
          <p style={{ marginTop: "16px", color: "var(--gray)", fontSize: "0.95rem" }}>
            We also test across multiple iOS versions, from recent releases back to iOS 16.
          </p>
        </section>

        {/* Testing duration */}
        <section className="landing-section">
          <h2>How Long Does TestFlight Testing Take?</h2>
          <p>
            Testing typically begins within <strong>24 hours</strong> of receiving your
            TestFlight link and email. Delivery time depends on the plan you choose:
          </p>
          <ul className="landing-list">
            <li><strong>Standard delivery</strong> — 2 to 3 days for comprehensive reports</li>
            <li><strong>Priority delivery</strong> — 1 to 2 days</li>
            <li><strong>Express delivery</strong> — delivered within 24 hours</li>
          </ul>
          <p>
            You can also extend testing time per tester (up to 10 hours each) for larger
            apps that need deeper coverage.
          </p>
        </section>

        {/* QA reports */}
        <section className="landing-section">
          <h2>What You Get in the QA Report</h2>
          <p>
            Our QA reports are written to be genuinely useful to developers — not just
            a wall of text. Each report includes:
          </p>
          <ul className="landing-list">
            <li>Every bug found, with clear steps to reproduce</li>
            <li>Screenshots and screen recordings of issues</li>
            <li>Device and iOS version for each bug</li>
            <li>Severity ratings (critical, high, medium, low)</li>
            <li>UX suggestions and improvement notes</li>
            <li>Performance observations</li>
            <li>Overall summary and prioritized recommendations</li>
          </ul>
        </section>

        {/* What developers provide / receive */}
        <section className="landing-section">
          <h2>What You Provide vs. What You Receive</h2>
          <div className="comparison-grid">
            <div className="comparison-card">
              <h3>What you provide</h3>
              <ul className="landing-list">
                <li>Your TestFlight public invitation link</li>
                <li>An email address for reports</li>
                <li>Any specific features to focus on</li>
                <li>Optional: extra notes or context</li>
              </ul>
            </div>
            <div className="comparison-card highlight-card">
              <h3>What you receive</h3>
              <ul className="landing-list">
                <li>Real testing on real Apple devices</li>
                <li>Detailed bug reports with reproduction steps</li>
                <li>UX feedback from real users</li>
                <li>Performance observations</li>
                <li>A structured QA report</li>
                <li>Support via email or WhatsApp</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section className="landing-section">
          <h2>TestFlight Testing Pricing</h2>
          <p>
            Pricing is simple and transparent: <strong>$10 per tester per hour</strong>, plus
            a small surcharge for faster delivery. You choose:
          </p>
          <ul className="landing-list">
            <li>Testing type (functionality, UX, bugs, performance, etc.)</li>
            <li>Number of testers</li>
            <li>Hours per tester</li>
            <li>Delivery speed (Standard, Priority, or Express)</li>
          </ul>
          <p style={{ marginTop: "16px" }}>
            Use our live calculator to get an exact quote in seconds.
          </p>
          <div style={{ marginTop: "20px" }}>
            <Link href="/#pricing" className="btn-primary">
              <i className="fas fa-calculator"></i> Calculate Your Price
            </Link>
          </div>
        </section>

        {/* FAQ */}
        <section className="landing-section">
          <h2>TestFlight Testing FAQ</h2>

          <div className="faq-grid" style={{ marginTop: "24px" }}>
            <div className="faq-item">
              <div className="q"><i className="fas fa-question-circle"></i> Do I need to add testers manually?</div>
              <div className="a">
                No — we use your public TestFlight link, so you don't need to add anyone
                manually. Just share the link with us.
              </div>
            </div>
            <div className="faq-item">
              <div className="q"><i className="fas fa-question-circle"></i> Do you sign an NDA?</div>
              <div className="a">
                Yes, on request. All testing is confidential by default.
              </div>
            </div>
            <div className="faq-item">
              <div className="q"><i className="fas fa-question-circle"></i> Can you test in-app purchases?</div>
              <div className="a">
                Yes, we test IAP flows end-to-end using TestFlight sandbox accounts.
              </div>
            </div>
            <div className="faq-item">
              <div className="q"><i className="fas fa-question-circle"></i> Can you test Sign in with Apple?</div>
              <div className="a">
                Yes, we test all authentication flows including Sign in with Apple, email, and social login.
              </div>
            </div>
            <div className="faq-item">
              <div className="q"><i className="fas fa-question-circle"></i> Can you test push notifications?</div>
              <div className="a">
                Yes, we validate push notification delivery and in-app handling.
              </div>
            </div>
            <div className="faq-item">
              <div className="q"><i className="fas fa-question-circle"></i> How many testers should I use?</div>
              <div className="a">
                For most indie apps, 5 to 10 testers is enough to catch the majority of issues.
                For larger apps, we recommend 15 to 25.
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="cta-section">
          <h2>Ready to hire TestFlight testers?</h2>
          <p>
            Get real iPhone and iPad users testing your app in the next 24 hours.
          </p>
          <Link href="/#pricing" className="btn-primary">
            <i className="fas fa-rocket"></i> Start Testing Now
          </Link>
        </section>
      </div>
    </>
  );
}
