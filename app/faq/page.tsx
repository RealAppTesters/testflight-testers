import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "FAQ | TestFlight Testing Questions Answered",
  description:
    "Answers to common questions about TestFlight testing, iOS app testing, our QA service, pricing, devices, IAP, subscriptions, authentication, and push notification testing.",
  keywords:
    "TestFlight FAQ, TestFlight testing questions, iOS app testing FAQ, TestFlight testers questions, TestFlight external testers, iOS QA testing FAQ",
  alternates: {
    canonical: "https://testflighttesters.com/faq",
  },
  openGraph: {
    title: "FAQ | TestFlight Testing Questions Answered",
    description:
      "Answers to common questions about TestFlight testing, iOS app testing, our QA service, pricing, and testing capabilities.",
    url: "https://testflighttesters.com/faq",
    siteName: "TestFlightTesters",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "FAQ | TestFlight Testing Questions Answered",
    description:
      "Answers to common questions about TestFlight testing, iOS app testing, our QA service, pricing, and testing capabilities.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const faqs = [
  // ─────────────────────────────────────────────
  // TestFlight general
  // ─────────────────────────────────────────────
  {
    category: "TestFlight Basics",
    items: [
      {
        q: "What is TestFlight?",
        a: "TestFlight is Apple's official beta testing platform for iOS apps. Developers upload pre-release builds, invite testers by email or public link, and collect feedback before submitting to the App Store.",
      },
      {
        q: "How do I get TestFlight testers?",
        a: "You can invite testers by email or share a public TestFlight link. You can also use a professional QA service like ours — we provide trained testers who install your build via your public link and deliver structured QA reports.",
      },
      {
        q: "How do I invite external TestFlight testers?",
        a: "In App Store Connect, go to your app, select TestFlight, then External Testing. You can add testers by email address or enable a public link that anyone can use to install your build.",
      },
      {
        q: "How many TestFlight testers can I have?",
        a: "Apple allows up to 100 internal testers (from your App Store Connect team) and up to 10,000 external testers per app. For most indie apps, far fewer testers are needed.",
      },
      {
        q: "What is the difference between internal and external TestFlight testers?",
        a: "Internal testers are members of your App Store Connect team (up to 100) — their builds don't need Apple review. External testers are anyone with an Apple ID (up to 10,000) — the first external build requires a short Apple review.",
      },
      {
        q: "Do TestFlight testers need an iPhone?",
        a: "Yes. TestFlight is iOS-only, so testers need an iPhone or iPad running a recent iOS version.",
      },
      {
        q: "How long does a TestFlight build last?",
        a: "Each uploaded TestFlight build expires after 90 days. You'll need to re-upload or push a new build to keep testing.",
      },
      {
        q: "Does the first TestFlight build need Apple review?",
        a: "Only the first external build requires review — usually under 24 hours. Subsequent external builds don't need re-review.",
      },
    ],
  },

  // ─────────────────────────────────────────────
  // Our service
  // ─────────────────────────────────────────────
  {
    category: "Our Service",
    items: [
      {
        q: "How does your TestFlight testing service work?",
        a: "You share your TestFlight public link, choose your testing type and options, and pay through PayPal. We assign real testers who install your app on their own iPhones and iPads and deliver a detailed QA report.",
      },
      {
        q: "How many testers should I use?",
        a: "For most indie apps, 5 testers is a good starting point. For apps with complex flows or critical features (payments, auth), 10 to 15 gives better coverage.",
      },
      {
        q: "How long does TestFlight testing take?",
        a: "Testing begins within 24 hours of receiving your TestFlight link and contact email. Reports are delivered in 2–3 days (Standard), 1–2 days (Priority), or within 24 hours (Express).",
      },
      {
        q: "What do TestFlight testers test?",
        a: "Depending on the type you choose: functionality, user experience, bugs, performance, localization, or accessibility. Testers follow structured QA checklists — not just random clicking.",
      },
      {
        q: "Do you provide QA reports?",
        a: "Yes. Every project includes a structured report with bug documentation, reproduction steps, screenshots, device details, severity ratings, and a prioritized summary.",
      },
      {
        q: "Can I choose specific iPhone models?",
        a: "Yes. Tell us which models you care about and we'll match you with testers who own them. We confirm the device coverage before testing begins.",
      },
      {
        q: "Do you test on iPads too?",
        a: "Yes. iPad testing is included by default. Many bugs only appear on iPad because of different screen sizes and iPadOS behavior.",
      },
      {
        q: "What iOS versions do you test on?",
        a: "We test across iOS 16, iOS 17, and iOS 18 by default. We can focus on specific versions if your app targets a particular range.",
      },
      {
        q: "Do you test on simulators?",
        a: "No. All testing is done on real Apple hardware — real iPhones and iPads. Simulators miss many bugs that only appear on physical devices.",
      },
    ],
  },

  // ─────────────────────────────────────────────
  // Testing capabilities
  // ─────────────────────────────────────────────
  {
    category: "Testing Capabilities",
    items: [
      {
        q: "Can you test in-app purchases?",
        a: "Yes. We test IAP flows end-to-end using Apple's sandbox test accounts — no real charges occur. We cover purchases, restores, and edge cases.",
      },
      {
        q: "Can you test subscriptions?",
        a: "Yes. We test subscription flows including purchase, restore, upgrade, downgrade, cancel, and free trial behavior.",
      },
      {
        q: "Can you test Sign in with Apple?",
        a: "Yes. We test all authentication flows: Sign in with Apple, email/password, social login, password reset, and 2FA.",
      },
      {
        q: "Can you test push notifications?",
        a: "Yes. We validate push notification delivery, tap behavior, deep linking, permissions, and rich notification content.",
      },
      {
        q: "Can you test login and authentication?",
        a: "Yes. Authentication testing includes sign up, sign in, password reset, social login, biometric login (Face ID/Touch ID), and session handling.",
      },
      {
        q: "Can you sign an NDA?",
        a: "Yes, on request. All testing is confidential by default — we never share your app or findings with anyone else.",
      },
      {
        q: "Can I choose specific countries for testing?",
        a: "Yes. If you need testers from specific regions or countries, tell us when you order and we'll match accordingly.",
      },
      {
        q: "Do you test localization?",
        a: "Yes. Localization testing covers translation accuracy, date and number formatting, currency formats, text truncation, and cultural appropriateness.",
      },
      {
        q: "Do you test accessibility?",
        a: "Yes. We test VoiceOver, Dynamic Type, color contrast, touch target sizing, and accessibility labels.",
      },
    ],
  },

  // ─────────────────────────────────────────────
  // Pricing and payment
  // ─────────────────────────────────────────────
  {
    category: "Pricing & Payment",
    items: [
      {
        q: "How much does TestFlight testing cost?",
        a: "Testing is $10 per tester per hour, plus a small delivery surcharge (+$2 per tester for Priority, +$5 for Express). No minimums, no subscriptions, no hidden fees.",
      },
      {
        q: "How do I pay?",
        a: "Payments are processed securely through PayPal. This works internationally and accepts credit cards, debit cards, and PayPal balance.",
      },
      {
        q: "Do you offer refunds?",
        a: "Refunds are available if we fail to start testing within 48 hours of receiving your TestFlight link. Once testing has begun, refunds are not available.",
      },
      {
        q: "Can I pay in a currency other than USD?",
        a: "All prices are in USD. PayPal will convert to your local currency at checkout.",
      },
    ],
  },
];

// Flatten for JSON-LD structured data
const allQuestions = faqs.flatMap((cat) => cat.items);

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: allQuestions.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.a,
    },
  })),
};

export default function FAQPage() {
  return (
    <>
      {/* FAQPage structured data for Google rich results */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

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
            <i className="fas fa-question-circle"></i> TestFlight Testing FAQ
          </div>
          <h1>
            Frequently Asked<br />
            <span className="highlight">Questions</span>
          </h1>
          <p className="landing-hero-sub">
            Everything you need to know about TestFlight testing, iOS app testing,
            our QA service, and how it all works. Still have questions? Reach out on
            WhatsApp or email.
          </p>
          <div className="hero-actions" style={{ justifyContent: "center" }}>
            <Link href="/pricing" className="btn-primary">
              <i className="fas fa-calculator"></i> See Pricing
            </Link>
            <a
              href="https://wa.me/27606393302"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline"
            >
              <i className="fab fa-whatsapp"></i> Ask on WhatsApp
            </a>
          </div>
        </section>

        {/* FAQ categories */}
        {faqs.map((category, catIndex) => (
          <section className="landing-section" key={catIndex}>
            <h2>{category.category}</h2>

            <div className="faq-list" style={{ marginTop: "24px" }}>
              {category.items.map((item, i) => (
                <details className="faq-detail" key={i}>
                  <summary className="faq-summary">
                    <span className="faq-question">
                      <i className="fas fa-question-circle"></i> {item.q}
                    </span>
                    <i className="fas fa-chevron-down faq-chevron"></i>
                  </summary>
                  <div className="faq-answer">{item.a}</div>
                </details>
              ))}
            </div>
          </section>
        ))}

        {/* Still have questions */}
        <section className="landing-section">
          <h2>Still Have Questions?</h2>
          <p>
            If you didn't find what you were looking for, we're happy to help. Reach out
            any time — we typically respond within minutes on WhatsApp.
          </p>

          <div className="contact-options" style={{ marginTop: "24px" }}>
            <div className="contact-options-card">
              <i className="fab fa-whatsapp" style={{ color: "#25D366" }}></i>
              <h3>WhatsApp</h3>
              <p>Fastest response — usually within minutes.</p>
              <a
                href="https://wa.me/27606393302"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
                style={{ background: "#25D366" }}
              >
                <i className="fab fa-whatsapp"></i> Chat on WhatsApp
              </a>
            </div>

            <div className="contact-options-card">
              <i className="fas fa-envelope" style={{ color: "var(--primary)" }}></i>
              <h3>Email</h3>
              <p>Best for detailed questions or long-form enquiries.</p>
              <a
                href="mailto:support@testflighttesters.com"
                className="btn-primary"
              >
                <i className="fas fa-envelope"></i> Send Email
              </a>
            </div>
          </div>
        </section>

        {/* Internal links */}
        <section className="landing-section">
          <p style={{ textAlign: "center", color: "var(--gray)" }}>
            Related pages:{" "}
            <Link href="/pricing" style={{ color: "var(--primary)", fontWeight: 600 }}>
              Pricing
            </Link>
            {" · "}
            <Link href="/testflight-testers" style={{ color: "var(--primary)", fontWeight: 600 }}>
              Hire TestFlight testers
            </Link>
            {" · "}
            <Link href="/ios-app-testing" style={{ color: "var(--primary)", fontWeight: 600 }}>
              iOS app testing
            </Link>
            {" · "}
            <Link href="/ios-beta-testers" style={{ color: "var(--primary)", fontWeight: 600 }}>
              iOS beta testers
            </Link>
          </p>
        </section>

        {/* Final CTA */}
        <section className="cta-section">
          <h2>Ready to start testing?</h2>
          <p>
            Real iPhone and iPad testers, real iOS versions, real feedback — starting
            within 24 hours.
          </p>
          <Link href="/pricing" className="btn-primary">
            <i className="fas fa-rocket"></i> Get Started Now
          </Link>
        </section>
      </div>
    </>
  );
}
