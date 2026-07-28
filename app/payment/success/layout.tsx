import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Payment Successful · TestFlightTesters",
  description: "Your TestFlight QA testing order has been confirmed. Send us your TestFlight link and email to get started.",
};

export default function PaymentSuccessLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
