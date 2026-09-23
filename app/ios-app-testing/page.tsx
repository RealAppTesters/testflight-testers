import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "iOS App Testing Services | Real iPhone & iPad Testers",
  description:
    "Professional iOS app testing services on real iPhone and iPad devices. Functional testing, UI/UX testing, bug hunting, performance, accessibility, localization, IAP, authentication, and push notification testing.",
  keywords:
    "iOS app testing, iOS app testing services, iPhone app testing, iPad app testing, iOS QA testing, iOS app testers, iOS testing service",
  alternates: {
    canonical: "https://testflighttesters.com/ios-app-testing",
  },
  openGraph: {
    title: "iOS App Testing Services | Real iPhone & iPad Testers",
    description:
      "Professional iOS app testing on real iPhone and iPad devices. Functional testing, UI/UX, bug hunting, performance, accessibility, localization, IAP, and push notification testing.",
    url: "https://testflighttesters.com/ios-app-testing",
    siteName: "TestFlightTesters",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "iOS App Testing Services | Real iPhone & iPad Testers",
    description:
      "Professional iOS app testing on real iPhone and iPad devices. Functional testing, UI/UX, bug hunting, performance, accessibility, localization, IAP, and push notification testing.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function IOSAppTestingPage() {
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
            <i className="fas fa-mobile-alt"></i> iOS QA Testing Services
          </div>
          <h1>
            iOS App Testing With<br />
            <span className="highlight">Real iPhone & iPad Users</span>
          </h1>
          <p className="landing-hero-sub">
            Professional quality assurance for iOS apps. Our testers run through every
            feature, hunt for bugs, validate user experience, and deliver detailed reports
            — all on real Apple devices, never simulators.
          </p>
          <div className="hero-actions" style={{ justifyContent: "center" }}>
            <Link href="/#pricing" className="btn-primary">
              <i className="fas fa-rocket"></i> Start Testing
            </Link>
            <Link href="/testflight-testers" className="btn-outline">
              <i className="fas fa-info-circle"></i> TestFlight Service
            </Link>
          </div>
        </section>

        {/* What is iOS app testing */}
        <section className="landing-section">
          <h2>What Is iOS App Testing?</h2>
          <p>
            <strong>iOS app testing</strong> is the process of checking that your app works
            correctly, looks right, feels intuitive, and performs well across different
            iPhone and iPad models and iOS versions. It goes far beyond just "does it
            launch" — real QA catches the bugs that slip through development.
          </p>
          <p>
            Unlike TestFlight beta testing (which is specifically about distributing a build
            to testers through Apple's beta platform), iOS app testing is the broader
            discipline: whatever the delivery channel, the goal is the same — find problems
            before your users do.
          </p>
          <p>
            The most common iOS testing approaches include:
          </p>
          <ul className="landing-list">
            <li><strong>Manual testing on real devices</strong> — what we specialize in</li>
            <li><strong>Automated testing</strong> — XCTest, XCUITest, and third-party frameworks</li>
            <li><strong>Unit testing</strong> — testing individual functions in isolation</li>
            <li><strong>Integration testing</strong> — testing how components work together</li>
            <li><strong>Beta testing</strong> — real users trying the app via TestFlight</li>
          </ul>
        </section>

        {/* What we test */}
        <section className="landing-section">
          <h2>What We Test in Your iOS App</h2>
          <p>
            We offer a comprehensive set of iOS QA services. You can pick one type of testing
            or bundle them depending on what your app needs.
          </p>

          <div className="testing-grid">
            <div className="testing-item">
              <div className="icon"><i className="fas fa-cogs"></i></div>
              <h3>Functional Testing</h3>
              <p>
                We verify that every feature in your app works as intended. Onboarding flows,
                navigation, data input, error handling — every path gets tested.
              </p>
            </div>

            <div className="testing-item">
              <div className="icon"><i className="fas fa-users"></i></div>
              <h3>UI/UX Testing</h3>
              <p>
                Real users evaluate how intuitive and enjoyable your app feels. They flag
                confusion, friction points, unclear labels, and design inconsistencies.
              </p>
            </div>

            <div className="testing-item">
              <div className="icon"><i className="fas fa-bug"></i></div>
              <h3>Bug Hunting</h3>
              <p>
                Active, structured bug hunting with clear reproduction steps, screenshots,
                and severity ratings. Every bug is documented so your team can fix it fast.
              </p>
            </div>

            <div className="testing-item">
              <div className="icon"><i className="fas fa-tachometer-alt"></i></div>
              <h3>Performance Testing</h3>
              <p>
                Launch time, screen transitions, memory usage, battery impact, and network
                behavior — all measured on real hardware.
              </p>
            </div>

            <div className="testing-item">
              <div className="icon"><i className="fas fa-mobile-alt"></i></div>
              <h3>Device Compatibility</h3>
              <p>
                We test across multiple iPhone and iPad models and iOS versions to catch
                device-specific issues — including older devices that still hold market share.
              </p>
            </div>

            <div className="testing-item">
              <div className="icon"><i className="fas fa-universal-access"></i></div>
              <h3>Accessibility Testing</h3>
              <p>
                VoiceOver, Dynamic Type, color contrast, touch target sizing, and
                accessibility labels. We help make your app usable by everyone.
              </p>
            </div>

            <div className="testing-item">
              <div className="icon"><i className="fas fa-globe"></i></div>
              <h3>Localization Testing</h3>
              <p>
                Translation accuracy, date and time formatting, currency, text truncation,
                and cultural appropriateness across every language you support.
              </p>
            </div>

            <div className="testing-item">
              <div className="icon"><i className="fas fa-exclamation-triangle"></i></div>
              <h3>Crash Testing</h3>
              <p>
                We try to break your app under stress: rapid taps, background transitions,
                memory pressure, and edge cases. Every crash is captured with device logs.
              </p>
            </div>
          </div>
        </section>

        {/* Authentication and account flows */}
        <section className="landing-section">
          <h2>Authentication & Account Flow Testing</h2>
          <p>
            Login and account creation are the first interactions users have with your app.
            If they fail, nothing else matters. We test:
          </p>
          <ul className="landing-list">
            <li>Email and password sign-up and sign-in</li>
            <li>Sign in with Apple</li>
            <li>Social login (Google, Facebook, etc., where applicable)</li>
            <li>Password reset and account recovery flows</li>
            <li>Two-factor authentication</li>
            <li>Account deletion flows</li>
            <li>Session management and token expiry</li>
            <li>Biometric login (Face ID, Touch ID)</li>
          </ul>
        </section>

        {/* Subscriptions & IAP */}
        <section className="landing-section">
          <h2>In-App Purchases & Subscription Testing</h2>
          <p>
            Money-related features need the most rigorous testing — bugs here directly
            cost you revenue and reputation. We test:
          </p>
          <ul className="landing-list">
            <li>Consumable, non-consumable, and auto-renewable subscriptions</li>
            <li>Purchase flows with sandbox test accounts</li>
            <li>Restore purchases functionality</li>
            <li>Subscription upgrades, downgrades, and cancellations</li>
            <li>Free trial start and end behavior</li>
            <li>Receipt validation handling</li>
            <li>Paywall design and messaging</li>
            <li>Edge cases: interrupted purchases, network failures, refunds</li>
          </ul>
          <p style={{ marginTop: "16px" }}>
            We test everything through Apple's sandbox environment so no real charges occur.
          </p>
        </section>

        {/* Push notifications */}
        <section className="landing-section">
          <h2>Push Notification Testing</h2>
          <p>
            Push notifications are easy to get wrong. They can arrive late, not at all,
            appear when the app is closed, or break the app's state when tapped. We test:
          </p>
          <ul className="landing-list">
            <li>Delivery when app is foregrounded, backgrounded, and terminated</li>
            <li>Notification tap behavior and deep linking</li>
            <li>Rich notifications with images and actions</li>
            <li>Permission prompts and user consent flows</li>
            <li>Silent push handling</li>
            <li>Notification grouping and threading</li>
            <li>APNS configuration for different iOS versions</li>
          </ul>
        </section>

        {/* Devices & environments */}
        <section className="landing-section">
          <h2>Real Devices, Real iOS Versions</h2>
          <p>
            Testing on simulators misses bugs that only appear on real hardware. Every test
            we run happens on a physical Apple device:
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
          <p style={{ marginTop: "16px" }}>
            We test across iOS 16, iOS 17, and iOS 18 to make sure your app performs
            well for users on older devices too.
          </p>
        </section>

        {/* Our process */}
        <section className="landing-section">
          <h2>How Our iOS App Testing Process Works</h2>
          <div className="steps-list" style={{ marginTop: "24px" }}>
            <div className="step-item">
              <span className="step-number">1</span>
              <div>
                <strong>You tell us what to test</strong>
                <p>
                  Share your app via TestFlight link, or provide a build through another
                  distribution method. Tell us which features to focus on.
                </p>
              </div>
            </div>
            <div className="step-item">
              <span className="step-number">2</span>
              <div>
                <strong>We assign real testers</strong>
                <p>
                  Based on the testing type you chose, we assign testers with the right
                  device mix and iOS versions.
                </p>
              </div>
            </div>
            <div className="step-item">
              <span className="step-number">3</span>
              <div>
                <strong>Testers run structured tests</strong>
                <p>
                  Following QA checklists, they test every relevant flow, look for bugs,
                  and record everything with clear evidence.
                </p>
              </div>
            </div>
            <div className="step-item">
              <span className="step-number">4</span>
              <div>
                <strong>You receive a detailed report</strong>
                <p>
                  Every issue is documented with reproduction steps, screenshots, device
                  info, and severity. Plus UX suggestions and a prioritized summary.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* iOS app testing vs TestFlight */}
        <section className="landing-section">
          <h2>iOS App Testing vs. TestFlight Beta Testing</h2>
          <p>
            These two terms are related but different, and it helps to know the distinction:
          </p>

          <div className="comparison-grid">
            <div className="comparison-card">
              <h3>iOS App Testing</h3>
              <ul className="landing-list">
                <li>The broader QA discipline</li>
                <li>Can happen at any stage of development</li>
                <li>Includes automated, manual, and unit testing</li>
                <li>Doesn't require a specific distribution channel</li>
                <li>Focuses on finding and documenting bugs</li>
              </ul>
            </div>
            <div className="comparison-card highlight-card">
              <h3>TestFlight Beta Testing</h3>
              <ul className="landing-list">
                <li>A specific Apple beta distribution platform</li>
                <li>Happens after you have a distributable build</li>
                <li>Real users install via TestFlight app</li>
                <li>Requires an Apple Developer account</li>
                <li>Focuses on real-user feedback pre-launch</li>
              </ul>
            </div>
          </div>

          <p style={{ marginTop: "24px" }}>
            We offer <strong>both</strong>. If your app is on TestFlight, we test it there.
            If you need iOS QA through another distribution method, we can work with that too.
            <Link href="/testflight-testers" style={{ color: "var(--primary)", fontWeight: 600, marginLeft: "6px" }}>
              Learn more about our TestFlight testing service →
            </Link>
          </p>
        </section>

        {/* Pricing */}
        <section className="landing-section">
          <h2>iOS App Testing Pricing</h2>
          <p>
            All iOS app testing is <strong>$10 per tester per hour</strong>, plus a small
            surcharge for faster delivery. You choose the testing type, the number of testers,
            hours per tester, and delivery speed.
          </p>
          <p>
            Use our calculator to get an instant quote.
          </p>
          <div style={{ marginTop: "20px" }}>
            <Link href="/#pricing" className="btn-primary">
              <i className="fas fa-calculator"></i> Calculate Your Price
            </Link>
          </div>
        </section>

        {/* FAQ */}
        <section className="landing-section">
          <h2>iOS App Testing FAQ</h2>

          <div className="faq-grid" style={{ marginTop: "24px" }}>
            <div className="faq-item">
              <div className="q"><i className="fas fa-question-circle"></i> Do you test on real devices or simulators?</div>
              <div className="a">
                Always real devices. Simulators miss many bugs that only appear on physical iPhones and iPads.
              </div>
            </div>
            <div className="faq-item">
              <div className="q"><i className="fas fa-question-circle"></i> Can you test outside of TestFlight?</div>
              <div className="a">
                Yes. If your app is distributed through another method (enterprise, Ad Hoc, or direct install), we can work with that.
              </div>
            </div>
            <div className="faq-item">
              <div className="q"><i className="fas fa-question-circle"></i> What iOS versions do you test on?</div>
              <div className="a">
                iOS 16, iOS 17, and iOS 18 by default. We can focus on specific versions if needed.
              </div>
            </div>
            <div className="faq-item">
              <div className="q"><i className="fas fa-question-circle"></i> Can you test in-app purchases and subscriptions?</div>
              <div className="a">
                Yes — using Apple's sandbox environment so no real charges occur.
              </div>
            </div>
            <div className="faq-item">
              <div className="q"><i className="fas fa-question-circle"></i> How long does iOS app testing take?</div>
              <div className="a">
                Standard delivery is 2 to 3 days. Priority is 1 to 2 days. Express is within 24 hours.
              </div>
            </div>
            <div className="faq-item">
              <div className="q"><i className="fas fa-question-circle"></i> Do you sign NDAs?</div>
              <div className="a">
                Yes, on request. All testing is confidential by default.
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="cta-section">
          <h2>Ready to test your iOS app?</h2>
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
