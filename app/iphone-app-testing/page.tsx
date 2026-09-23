import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "iPhone App Testing | Test Your iOS App on Real Devices",
  description:
    "Test your iPhone app on real devices with real users. Professional iPhone app testing across current-generation iPhones, iPads, and iOS versions. Find bugs before your users do.",
  keywords:
    "iPhone app testing, iPhone app testers, test iPhone app, iPhone app testing service, test iOS app on real device, real device testing, iPhone QA testing",
  alternates: {
    canonical: "https://testflighttesters.com/iphone-app-testing",
  },
  openGraph: {
    title: "iPhone App Testing | Test Your iOS App on Real Devices",
    description:
      "Test your iPhone app on real devices with real users. Professional iPhone app testing across current-generation iPhones, iPads, and iOS versions.",
    url: "https://testflighttesters.com/iphone-app-testing",
    siteName: "TestFlightTesters",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "iPhone App Testing | Test Your iOS App on Real Devices",
    description:
      "Test your iPhone app on real devices with real users. Professional iPhone app testing across current-generation iPhones, iPads, and iOS versions.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function IPhoneAppTestingPage() {
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
            <i className="fas fa-mobile-alt"></i> Real Device iPhone Testing
          </div>
          <h1>
            Test Your iPhone App<br />
            <span className="highlight">on Real Devices</span>
          </h1>
          <p className="landing-hero-sub">
            Real users install your app on real iPhones and iPads running real iOS versions.
            We find the bugs that only show up on physical hardware — the ones simulators
            never catch.
          </p>
          <div className="hero-actions" style={{ justifyContent: "center" }}>
            <Link href="/#pricing" className="btn-primary">
              <i className="fas fa-rocket"></i> Start Testing
            </Link>
            <Link href="/ios-app-testing" className="btn-outline">
              <i className="fas fa-flask"></i> iOS Testing Services
            </Link>
          </div>
        </section>

        {/* Why real devices */}
        <section className="landing-section">
          <h2>Why Real Device Testing Matters</h2>
          <p>
            Simulators are useful during development, but they can't replicate everything
            your users will experience on a real iPhone. Many of the most frustrating bugs
            only appear on physical hardware:
          </p>
          <ul className="landing-list">
            <li>
              <strong>Performance issues</strong> — real-device CPU, memory, and thermal
              behavior differ from a Mac simulator
            </li>
            <li>
              <strong>Battery drain problems</strong> — you can't measure real battery
              impact in a simulator
            </li>
            <li>
              <strong>Camera, GPS, and sensor behavior</strong> — simulators emulate but
              don't truly replicate hardware sensors
            </li>
            <li>
              <strong>Touch response and haptics</strong> — the feel of using your app
              matters, and simulators can't measure it
            </li>
            <li>
              <strong>Network conditions</strong> — real 4G/5G/Wi-Fi behavior, spotty
              connections, and switching networks
            </li>
            <li>
              <strong>iOS version differences</strong> — behavior changes between iOS
              versions that simulators don't fully reproduce
            </li>
            <li>
              <strong>Notch, Dynamic Island, and safe area issues</strong> — layouts that
              break on specific screen shapes
            </li>
            <li>
              <strong>Push notifications</strong> — real APNS delivery can only be tested
              on real hardware
            </li>
          </ul>
          <p style={{ marginTop: "16px" }}>
            The only way to catch these problems before your users do is to test on
            actual iPhones and iPads — which is exactly what we do.
          </p>
        </section>

        {/* Devices we test on */}
        <section className="landing-section">
          <h2>iPhones and iPads We Test On</h2>
          <p>
            We test across current-generation and recent-generation Apple devices to cover
            the range of hardware your users actually own.
          </p>

          <h3 style={{ marginTop: "32px", marginBottom: "12px" }}>iPhone models</h3>
          <div className="devices-grid">
            <div className="device-chip"><i className="fas fa-mobile-alt"></i> iPhone Pro Max</div>
            <div className="device-chip"><i className="fas fa-mobile-alt"></i> iPhone Pro</div>
            <div className="device-chip"><i className="fas fa-mobile-alt"></i> iPhone Plus</div>
            <div className="device-chip"><i className="fas fa-mobile-alt"></i> iPhone (standard)</div>
            <div className="device-chip"><i className="fas fa-mobile-alt"></i> iPhone SE</div>
            <div className="device-chip"><i className="fas fa-mobile-alt"></i> Recent older models</div>
          </div>

          <h3 style={{ marginTop: "32px", marginBottom: "12px" }}>iPad models</h3>
          <div className="devices-grid">
            <div className="device-chip"><i className="fas fa-tablet-alt"></i> iPad Pro</div>
            <div className="device-chip"><i className="fas fa-tablet-alt"></i> iPad Air</div>
            <div className="device-chip"><i className="fas fa-tablet-alt"></i> iPad (standard)</div>
            <div className="device-chip"><i className="fas fa-tablet-alt"></i> iPad mini</div>
          </div>

          <h3 style={{ marginTop: "32px", marginBottom: "12px" }}>iOS versions</h3>
          <div className="devices-grid">
            <div className="device-chip"><i className="fas fa-mobile-alt"></i> iOS 18</div>
            <div className="device-chip"><i className="fas fa-mobile-alt"></i> iOS 17</div>
            <div className="device-chip"><i className="fas fa-mobile-alt"></i> iOS 16</div>
          </div>

          <p style={{ marginTop: "24px", color: "var(--gray)", fontSize: "0.95rem" }}>
            If you need specific models or iOS versions tested, tell us when you submit
            your app and we'll match you with the right testers. We'll always confirm the
            exact device coverage before testing begins.
          </p>
        </section>

        {/* Device compatibility issues we catch */}
        <section className="landing-section">
          <h2>Device Compatibility Issues We Catch</h2>
          <p>
            Different iPhones and iPads introduce different classes of bugs. Our testing
            is designed to surface them:
          </p>

          <div className="testing-grid">
            <div className="testing-item">
              <div className="icon"><i className="fas fa-crop-alt"></i></div>
              <h3>Layout & safe area issues</h3>
              <p>
                UI elements that overlap the notch, Dynamic Island, or home indicator, or
                that break on specific screen sizes and aspect ratios.
              </p>
            </div>

            <div className="testing-item">
              <div className="icon"><i className="fas fa-mobile-alt"></i></div>
              <h3>Small vs large screen issues</h3>
              <p>
                Text truncation on compact devices, empty space on larger screens, missing
                responsive adjustments.
              </p>
            </div>

            <div className="testing-item">
              <div className="icon"><i className="fas fa-tachometer-alt"></i></div>
              <h3>Performance on older devices</h3>
              <p>
                Apps that feel fast on a new iPhone can lag or crash on devices two or
                three generations older. We check this explicitly.
              </p>
            </div>

            <div className="testing-item">
              <div className="icon"><i className="fas fa-battery-quarter"></i></div>
              <h3>Battery drain</h3>
              <p>
                Background processes, timers, and network activity that drain battery
                faster than expected.
              </p>
            </div>

            <div className="testing-item">
              <div className="icon"><i className="fas fa-camera"></i></div>
              <h3>Camera & sensor behavior</h3>
              <p>
                Camera permissions, image quality, GPS accuracy, and hardware feature
                differences across models.
              </p>
            </div>

            <div className="testing-item">
              <div className="icon"><i className="fas fa-wifi"></i></div>
              <h3>Network condition handling</h3>
              <p>
                Behavior on slow connections, network switches, and temporary disconnections
                — issues that rarely appear in simulators.
              </p>
            </div>
          </div>
        </section>

        {/* How we test */}
        <section className="landing-section">
          <h2>How We Test Your iPhone App</h2>
          <p>
            Every testing session follows a structured process — not random poking around:
          </p>

          <div className="steps-list" style={{ marginTop: "24px" }}>
            <div className="step-item">
              <span className="step-number">1</span>
              <div>
                <strong>We install your TestFlight build on real devices</strong>
                <p>
                  Testers install your app on their own iPhones and iPads running different
                  iOS versions.
                </p>
              </div>
            </div>
            <div className="step-item">
              <span className="step-number">2</span>
              <div>
                <strong>Testers run through your app systematically</strong>
                <p>
                  Each tester follows a structured checklist covering the testing type you
                  selected — functionality, UX, bugs, performance, and so on.
                </p>
              </div>
            </div>
            <div className="step-item">
              <span className="step-number">3</span>
              <div>
                <strong>Every issue is documented with device details</strong>
                <p>
                  For each bug, we capture the exact device model, iOS version, screenshots,
                  and steps to reproduce. You know precisely where it happens.
                </p>
              </div>
            </div>
            <div className="step-item">
              <span className="step-number">4</span>
              <div>
                <strong>You receive a consolidated report</strong>
                <p>
                  All findings are organized by severity and device, with a prioritized
                  summary at the top so your team knows where to focus first.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* What types of apps */}
        <section className="landing-section">
          <h2>What Kinds of iPhone Apps We Test</h2>
          <p>
            We've structured our process to work well for many types of iOS apps:
          </p>
          <ul className="landing-list">
            <li>Consumer apps (productivity, lifestyle, health, fitness)</li>
            <li>Utility apps and tools</li>
            <li>Social and messaging apps</li>
            <li>E-commerce and shopping apps</li>
            <li>Content and media apps</li>
            <li>Apps with subscriptions and in-app purchases</li>
            <li>Apps with authentication and account creation</li>
            <li>Apps with push notifications and background features</li>
            <li>Early-stage MVPs and polished pre-launch builds</li>
          </ul>
          <p style={{ marginTop: "16px" }}>
            If your app is on the App Store already and you're testing a new version, we
            can work with TestFlight builds of updates too.
          </p>
        </section>

        {/* Why not just use a simulator or device farm */}
        <section className="landing-section">
          <h2>iPhone App Testing vs. Simulators and Device Farms</h2>
          <p>
            There are a few alternatives to what we do. Here's how they compare:
          </p>

          <div className="comparison-grid">
            <div className="comparison-card">
              <h3>Xcode Simulator</h3>
              <ul className="landing-list">
                <li>Free, fast, easy</li>
                <li>Good for early development</li>
                <li>Can't test hardware sensors</li>
                <li>Misses real performance issues</li>
                <li>No real user feedback</li>
                <li>Doesn't reveal UX confusion</li>
              </ul>
              <p className="comparison-note">
                Useful, but not a substitute for real-device testing.
              </p>
            </div>

            <div className="comparison-card">
              <h3>Automated Device Farms</h3>
              <ul className="landing-list">
                <li>Good for regression runs</li>
                <li>Scriptable and repeatable</li>
                <li>Expensive at scale</li>
                <li>Only tests what you script</li>
                <li>Can't judge UX or design</li>
                <li>Won't catch "feels wrong" issues</li>
              </ul>
              <p className="comparison-note">
                Excellent for automation, but not a substitute for human review.
              </p>
            </div>

            <div className="comparison-card highlight-card">
              <h3>Real Human Testers (Us)</h3>
              <ul className="landing-list">
                <li>Real iPhones and iPads</li>
                <li>Real users evaluating your app</li>
                <li>Catches UX and design issues</li>
                <li>Catches hardware-specific bugs</li>
                <li>Structured QA reports</li>
                <li>Predictable timelines and pricing</li>
              </ul>
              <p className="comparison-note">
                Catches what automation and simulators miss.
              </p>
            </div>
          </div>
        </section>

        {/* What you get */}
        <section className="landing-section">
          <h2>What You Get From an iPhone App Testing Session</h2>
          <ul className="landing-list">
            <li>
              <strong>Bug reports</strong> — every issue with reproduction steps, screenshots,
              device info, and severity rating
            </li>
            <li>
              <strong>UX feedback</strong> — notes on design, flow, and clarity from real
              users
            </li>
            <li>
              <strong>Performance observations</strong> — launch time, responsiveness,
              battery concerns
            </li>
            <li>
              <strong>Device-specific findings</strong> — bugs that only appear on
              particular iPhone or iPad models
            </li>
            <li>
              <strong>iOS version findings</strong> — behavior differences between iOS
              versions
            </li>
            <li>
              <strong>Prioritized summary</strong> — a clear list of the most important
              issues to fix first
            </li>
          </ul>
        </section>

        {/* Pricing */}
        <section className="landing-section">
          <h2>iPhone App Testing Pricing</h2>
          <p>
            iPhone app testing is <strong>$10 per tester per hour</strong>, plus a small
            surcharge for faster delivery. Choose the testing type, number of testers,
            hours per tester, and delivery speed.
          </p>
          <div style={{ marginTop: "20px" }}>
            <Link href="/#pricing" className="btn-primary">
              <i className="fas fa-calculator"></i> Calculate Your Price
            </Link>
          </div>
        </section>

        {/* FAQ */}
        <section className="landing-section">
          <h2>iPhone App Testing FAQ</h2>

          <div className="faq-grid" style={{ marginTop: "24px" }}>
            <div className="faq-item">
              <div className="q"><i className="fas fa-question-circle"></i> Can you test on specific iPhone models?</div>
              <div className="a">
                Yes — tell us which models you care about and we'll match you with testers
                who have them. We confirm device coverage before starting.
              </div>
            </div>
            <div className="faq-item">
              <div className="q"><i className="fas fa-question-circle"></i> Do you test on older iPhones?</div>
              <div className="a">
                Yes. Testing on older devices is one of the best ways to catch performance
                issues before they affect a large chunk of your user base.
              </div>
            </div>
            <div className="faq-item">
              <div className="q"><i className="fas fa-question-circle"></i> How many testers should I use?</div>
              <div className="a">
                For most apps, 5 to 10 testers on different devices is enough. For critical
                features (payments, auth), 15 to 25 is better.
              </div>
            </div>
            <div className="faq-item">
              <div className="q"><i className="fas fa-question-circle"></i> Does my app need to be on TestFlight?</div>
              <div className="a">
                We prefer TestFlight because it's the easiest way to distribute to testers,
                but we can work with other distribution methods too.
              </div>
            </div>
            <div className="faq-item">
              <div className="q"><i className="fas fa-question-circle"></i> Do you test on iPads too?</div>
              <div className="a">
                Yes. iPad testing is included by default. Many bugs only appear on iPad
                because of the different screen sizes and iPadOS behaviors.
              </div>
            </div>
            <div className="faq-item">
              <div className="q"><i className="fas fa-question-circle"></i> Can you test both iPhone and iPad in one session?</div>
              <div className="a">
                Yes. When you submit your app, mention that you want both tested and
                we'll arrange testers on each device type.
              </div>
            </div>
          </div>
        </section>

        {/* Internal links */}
        <section className="landing-section">
          <p style={{ textAlign: "center", color: "var(--gray)" }}>
            Related pages:{" "}
            <Link href="/ios-app-testing" style={{ color: "var(--primary)", fontWeight: 600 }}>
              iOS app testing services
            </Link>
            {" · "}
            <Link href="/testflight-testers" style={{ color: "var(--primary)", fontWeight: 600 }}>
              Hire TestFlight testers
            </Link>
            {" · "}
            <Link href="/ios-beta-testers" style={{ color: "var(--primary)", fontWeight: 600 }}>
              iOS beta testers guide
            </Link>
          </p>
        </section>

        {/* Final CTA */}
        <section className="cta-section">
          <h2>Test your iPhone app on real devices</h2>
          <p>
            Real iPhone and iPad testers, real iOS versions, real feedback — starting
            within 24 hours.
          </p>
          <Link href="/#pricing" className="btn-primary">
            <i className="fas fa-rocket"></i> Start Testing Now
          </Link>
        </section>
      </div>
    </>
  );
}
