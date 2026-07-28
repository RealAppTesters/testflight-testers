"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

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

export default function PaymentPage() {
  const router = useRouter();
  const [orderData, setOrderData] = useState<OrderData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = sessionStorage.getItem("orderData");
    if (stored) {
      setOrderData(JSON.parse(stored));
    } else {
      router.push("/");
    }
    setLoading(false);
  }, [router]);

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
          <Link href="/" className="btn-primary" style={{ marginTop: "20px" }}>
            <i className="fas fa-arrow-left"></i> Back to Home
          </Link>
        </div>
      </div>
    );
  }

  const handlePayPalPayment = () => {
    // In production, this would redirect to PayPal
    // For now, show a success message
    alert("Payment processing with PayPal...\n\nIn production, this would redirect to PayPal for payment.\n\nTotal: $" + orderData.total);
  };

  return (
    <div className="payment-container">
      <div className="payment-card">
        <div className="payment-header">
          <Link href="/" className="payment-logo">
            TestFlight<span className="accent">Testers</span>
          </Link>
          <span className="payment-step">Step 1 of 2</span>
        </div>

        <h1 className="payment-title">Complete Your Order</h1>
        <p className="payment-subtitle">Review your testing package and proceed to payment.</p>

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

        <div className="payment-methods">
          <h3>Payment Method</h3>
          <div className="payment-option selected">
            <div className="payment-option-content">
              <i className="fab fa-paypal" style={{ fontSize: "1.8rem", color: "#003087" }}></i>
              <div>
                <div style={{ fontWeight: 600 }}>PayPal</div>
                <div style={{ fontSize: "0.85rem", color: "var(--gray)" }}>
                  Secure payment with PayPal. Accepts credit cards and PayPal balance.
                </div>
              </div>
            </div>
            <div className="payment-option-check">
              <i className="fas fa-check-circle" style={{ color: "var(--mint)" }}></i>
            </div>
          </div>
        </div>

        <div className="payment-actions">
          <Link href="/" className="btn-outline" style={{ textDecoration: "none" }}>
            <i className="fas fa-arrow-left"></i> Back
          </Link>
          <button className="btn-primary" onClick={handlePayPalPayment}>
            <i className="fab fa-paypal"></i> Pay with PayPal
          </button>
        </div>

        <div className="payment-secure">
          <i className="fas fa-lock"></i>
          <span>Your payment is secure and encrypted</span>
        </div>
      </div>
    </div>
  );
}
