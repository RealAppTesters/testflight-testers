import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "TestFlight Testers | iOS App Testing & Beta Testing",
  description:
    "Get real TestFlight testers for your iOS app. Test iPhone and iPad apps for bugs, UX, performance and functionality with detailed QA feedback.",
  keywords:
    "TestFlight testers, iOS app testing, iOS beta testers, iPhone app testing, TestFlight beta testing, iOS QA testing",
  authors: [{ name: "TestFlightTesters" }],
  metadataBase: new URL("https://testflighttesters.com"),
  alternates: {
    canonical: "https://testflighttesters.com",
  },
  openGraph: {
    title: "TestFlight Testers | iOS App Testing & Beta Testing",
    description:
      "Get real TestFlight testers for your iOS app. Test iPhone and iPad apps for bugs, UX, performance and functionality with detailed QA feedback.",
    url: "https://testflighttesters.com",
    siteName: "TestFlightTesters",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "TestFlight Testers | iOS App Testing & Beta Testing",
    description:
      "Get real TestFlight testers for your iOS app. Test iPhone and iPad apps for bugs, UX, performance and functionality with detailed QA feedback.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

// ─── Site-wide structured data ───
const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "TestFlightTesters",
  url: "https://testflighttesters.com",
  logo: "https://testflighttesters.com/icon.png",
  description:
    "Professional iOS QA testing platform. Real iPhone and iPad testers who test your TestFlight build and deliver detailed QA reports.",
  foundingDate: "2026",
  areaServed: "Worldwide",
  sameAs: [
    "https://twitter.com/testflighttest",
    "https://www.linkedin.com/company/testflighttesters",
    "https://github.com/RealAppTesters",
  ],
  contactPoint: [
    {
      "@type": "ContactPoint",
      contactType: "Customer Support",
      email: "support@testflighttesters.com",
      availableLanguage: ["English"],
    },
    {
      "@type": "ContactPoint",
      contactType: "Customer Support",
      telephone: "+27606393302",
      availableLanguage: ["English"],
    },
  ],
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "TestFlightTesters",
  url: "https://testflighttesters.com",
  description:
    "Hire real TestFlight testers for iOS app testing. Real iPhone and iPad testers with detailed QA reports.",
  publisher: {
    "@type": "Organization",
    name: "TestFlightTesters",
    url: "https://testflighttesters.com",
  },
};

const serviceJsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: "iOS App QA Testing",
  provider: {
    "@type": "Organization",
    name: "TestFlightTesters",
    url: "https://testflighttesters.com",
  },
  areaServed: "Worldwide",
  description:
    "Professional TestFlight QA testing for iOS apps. Real iPhone and iPad testers who run structured QA checks and deliver detailed reports before App Store submission.",
  offers: {
    "@type": "Offer",
    priceCurrency: "USD",
    price: "10",
    description: "$10 per tester per hour for iOS app QA testing",
    availability: "https://schema.org/InStock",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:opsz,wght@14..32,300;14..32,400;14..32,600;14..32,700;14..32,800;14..32,900&display=swap"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css"
        />

        {/* Site-wide JSON-LD structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
