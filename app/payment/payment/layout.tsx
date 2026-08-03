import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Payment · TestFlightTesters",
  description: "Complete your TestFlight QA testing order with secure PayPal payment.",
};

export default function PaymentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
