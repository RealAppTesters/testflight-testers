"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { PayPalScriptProvider, PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";

interface OrderData {
  type: string;
  typeLabel: string;
  testers: number;
  hours: number;
  delivery: string;
  perTester: number;
  total: number;
  currency: string;
}

// PayPal client ID - replace with your actual client ID
// For South Africa, you'll need a PayPal Business account
const PAYPAL_CLIENT_ID = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || "sb";

// PayPal button wrapper component
function PayPalButtonWrapper({ amount, onSuccess, onError }: { 
  amount: number; 
  onSuccess: (details: any) => void;
  onError: (error: any) => void;
}) {
  const [{ isPending }] = usePayPalScriptReducer();

  return (
    <>
      {isPending ? (
        <div className="paypal-loading">
          <i className="fas fa-spinner fa-spin"></i> Loading PayPal...
        </div>
      ) : (
        <PayPalButtons
          style={{ layout: "vertical", color: "blue", shape: "rect", label: "pay" }}
          createOrder={(data, actions) => {
            return actions.order.create({
              purchase_units: [
                {
                  amount: {
                    value: amount.toFixed(2),
                    currency_code: "USD",
                  },
                  description: "TestFlight QA Testing Services",
                },
              ],
              application_context: {
                shipping_preference: "NO_SHIPPING",
              },
            });
          }}
          onApprove={(data, actions) => {
            return actions.order!.capture().then((details) => {
              onSuccess(details);
            });
          }}
          onError={(error) => {
            onError(error);
          }}
        />
      )}
    </>
  );
}

export default function PaymentPage() {
  const router = useRouter();
  const [orderData, setOrderData] = useState<OrderData | null>(null);
  const [loading, setLoading] = useState(true);
  const [paymentStatus, setPaymentStatus] = useState<"idle" | "processing" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const stored = sessionStorage.getItem("orderData");
    if (stored) {
      setOrderData(JSON.parse(stored));
    } else {
      router.push("/");
    }
    setLoading(false);
  }, [router]);

  const handlePaymentSuccess = (details: any) => {
  setPaymentStatus("success");
  
  // Store order ID in session
  if (orderData) {
    const orderId = `TFT-${Date.now().toString().slice(-6)}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;
    sessionStorage.setItem("orderData", JSON.stringify({
      ...orderData,
      orderId: orderId
    }));
  }
  
  // Redirect to success page
  router.push("/payment/success");
};

  const handlePaymentError = (error: any) => {
    setPaymentStatus("error");
    setErrorMessage(error.message || "There was an error processing your payment. Please try again.");
    console.error("Payment error:", error);
  };

  const handleRetry = () => {
    setPaymentStatus("idle");
    setErrorMessage("");
  };

  if (loading) {
    return (
      <div className="payment-container">
        <div className="payment-card" style={{ textAlign: "center", padding: "60px 40px" }}>
          <i className="fas fa-spinner fa-spin" style={{ fontSize: "2rem", color: "var(--primary)" }}></i>
          <p style={{ marginTop: "20px", color: "var(--gray)" }}>Loading your order...</p>
        </div>
      </div>
    );
  }

  if (!orderData) {
    return (
      <div className="payment-container">
        <div className="payment-card" style={{ textAlign: "center", padding: "60px 40px" }}>
          <i className="fas fa-exclamation-circle" style={{ fontSize: "2rem", color: "var(--coral)" }}></i>
          <h2 style={{ marginTop: "20px" }}>No order found</h2>
          <p style={{ color: "var(--gray)" }}>Please return to the homepage and select your testing package.</p>
          <Link href="/" className="btn-primary" style={{ marginTop: "20px", display: "inline-block" }}>
            <i className="fas fa-arrow-left"></i> Back to Home
          </Link>
        </div>
      </div>
    );
  }

  // Success state
  if (paymentStatus === "success") {
    return (
      <div className="payment-container">
        <div className="payment-card" style={{ textAlign: "center", padding: "48px 40px" }}>
          <div style={{ fontSize: "4rem", color: "var(--mint)", marginBottom: "20px" }}>
            <i className="fas fa-check-circle"></i>
          </div>
          <h2 style={{ marginBottom: "12px" }}>Payment Successful! 🎉</h2>
          <p style={{ color: "var(--gray)", marginBottom: "24px" }}>
            Your TestFlight QA testing order has been confirmed. We'll start testing within 24 hours.
          </p>
          <div className="order-summary" style={{ textAlign: "left" }}>
            <div className="order-row">
              <span>Order ID</span>
              <span className="order-value">#TFT-{Date.now().toString().slice(-6)}</span>
            </div>
            <div className="order-row">
              <span>Testing Type</span>
              <span className="order-value">{orderData.typeLabel}</span>
            </div>
            <div className="order-row">
              <span>Total Paid</span>
              <span className="order-value" style={{ color: "var(--mint)" }}>${orderData.total} USD</span>
            </div>
          </div>
          <div style={{ display: "flex", gap: "16px", marginTop: "24px", justifyContent: "center" }}>
            <Link href="/" className="btn-primary" style={{ textDecoration: "none" }}>
              <i className="fas fa-home"></i> Return Home
            </Link>
            <a href="mailto:support@testflighttesters.com" className="btn-outline" style={{ textDecoration: "none" }}>
              <i className="fas fa-envelope"></i> Contact Support
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="payment-container">
      <div className="payment-card">
        <div className="payment-header">
          <Link href="/" className="payment-logo">
            TestFlight<span className="accent">Testers</span>
          </Link>
          <span className="payment-step">Secure Checkout</span>
        </div>

        <h1 className="payment-title">Complete Your Order</h1>
        <p className="payment-subtitle">Review your testing package and proceed to secure payment.</p>

        <div className="order-summary">
          <div className="order-row">
            <span>Testing Type</span>
            <span className="order-value">{orderData.typeLabel}</span>
          </div>
          <div className="order-row">
            <span>Number of Testers</span>
            <span className="order-value">{orderData.testers}</span>
          </div>
          <div className="order-row">
            <span>Hours per Tester</span>
            <span className="order-value">{orderData.hours}h</span>
          </div>
          <div className="order-row">
            <span>Delivery Speed</span>
            <span className="order-value">
              {orderData.delivery === "standard"
                ? "Standard (2-3 days)"
                : orderData.delivery === "priority"
                ? "Priority (1-2 days)"
                : "Express (24h)"}
            </span>
          </div>
          <div className="order-divider"></div>
          <div className="order-row total-row">
            <span>Total Amount</span>
            <span className="order-total">${orderData.total} USD</span>
          </div>
        </div>

        {paymentStatus === "error" && (
          <div className="payment-error">
            <i className="fas fa-exclamation-circle"></i>
            <span>{errorMessage}</span>
          </div>
        )}

        <div className="payment-methods">
          <h3>Pay with PayPal</h3>
          <div className="payment-option selected">
            <div className="payment-option-content">
              <i className="fab fa-paypal" style={{ fontSize: "1.8rem", color: "#003087" }}></i>
              <div>
                <div style={{ fontWeight: 600 }}>PayPal</div>
                <div style={{ fontSize: "0.85rem", color: "var(--gray)" }}>
                  Secure payment with PayPal. Accepts credit cards, debit cards, and PayPal balance.
                  <br />
                  <span style={{ fontSize: "0.75rem", color: "var(--mint)" }}>
                    <i className="fas fa-check"></i> International payments accepted
                  </span>
                </div>
              </div>
            </div>
            <div className="payment-option-check">
              <i className="fas fa-check-circle" style={{ color: "var(--mint)" }}></i>
            </div>
          </div>
        </div>

        {paymentStatus === "idle" && (
          <div className="paypal-container">
            <PayPalScriptProvider
              options={{
                clientId: PAYPAL_CLIENT_ID,
                currency: "USD",
                intent: "capture",
                // For South Africa, you may need to enable these
                // components: "buttons",
                // "enable-funding": "paylater",
              }}
            >
              <PayPalButtonWrapper
                amount={orderData.total}
                onSuccess={handlePaymentSuccess}
                onError={handlePaymentError}
              />
            </PayPalScriptProvider>
          </div>
        )}

        {paymentStatus === "error" && (
          <button className="btn-primary" onClick={handleRetry} style={{ width: "100%", justifyContent: "center" }}>
            <i className="fas fa-redo"></i> Try Again
          </button>
        )}

        <div className="payment-actions" style={{ marginTop: "16px" }}>
          <Link href="/" className="btn-outline" style={{ textDecoration: "none", flex: 1, justifyContent: "center" }}>
            <i className="fas fa-arrow-left"></i> Cancel
          </Link>
        </div>

        <div className="payment-secure">
          <i className="fas fa-lock"></i>
          <span>Your payment is secure and encrypted. PayPal protects your financial information.</span>
        </div>

        <div className="payment-supported-countries">
          <i className="fas fa-globe"></i>
          <span>Accepts payments from South Africa and 200+ countries worldwide</span>
        </div>
      </div>
    </div>
  );
}
