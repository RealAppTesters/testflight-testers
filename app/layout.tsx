import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "TestFlightTesters · Professional iOS QA Testing Platform",
  description:
    "Real iPhone and iPad users test your app, uncover bugs, validate user experience, and provide detailed QA reports before you submit to the App Store.",
  keywords:
    "TestFlight, QA testing, iOS testing, app testing, bug hunting, UX testing, iPhone testing, iPad testing",
  authors: [{ name: "TestFlightTesters" }],
  openGraph: {
    title: "TestFlightTesters · Professional iOS QA Testing Platform",
    description:
      "Real iPhone and iPad users test your app, uncover bugs, validate user experience, and provide detailed QA reports before you submit to the App Store.",
    url: "https://testflighttesters.com",
    siteName: "TestFlightTesters",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "TestFlightTesters · Professional iOS QA Testing Platform",
    description:
      "Real iPhone and iPad users test your app, uncover bugs, validate user experience, and provide detailed QA reports before you submit to the App Store.",
  },
  robots: {
    index: true,
    follow: true,
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
      </head>
      <body>{children}</body>
    </html>
  );
}
