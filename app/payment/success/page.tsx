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
  orderId?: string;
}

export default function PaymentSuccessPage() {
  const router = useRouter();
  const [orderData, setOrderData] = useState<OrderData | null>(null);
  const [loading, setLoading] = useState(true);
  const [orderId, setOrderId] = useState("");

  useEffect(() => {
    const stored = sessionStorage.getItem("orderData");
    if (stored) {
      const data = JSON.parse(stored);
      // Generate a unique order ID
      const id = `TFT-${Date.now().toString().slice(-6)}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;
      setOrderId(id);
      setOrderData(data);
    } else {
      router.push("/");
    }
    setLoading(false);
  }, [router]);

  // WhatsApp number - replace with your actual business number
  const WHATSAPP_NUMBER = "27791234567"; // South African number format: 27XXXXXXXXX

  // Generate WhatsApp message with order details
  const generateWhatsAppMessage = () => {
    if (!orderData) return "";
    return `Hello TestFlightTesters! 🚀

I've just placed an order for QA testing.

📋 Order Details:
Order ID: ${orderId}
Testing Type: ${orderData.typeLabel}
Testers: ${orderData.testers}
Hours: ${orderData.hours}h
Delivery: ${orderData.delivery === "standard" ? "Standard (2-3 days)" : orderData.delivery === "priority" ? "Priority (1-2 days)" : "Express (24h)"}
Total: $${orderData.total} USD

📱 My TestFlight Link: [Paste your TestFlight public link here]

📧 My Email: [Your email address]

Please confirm receipt and let me know when testing will begin.

Thank you! 🙌`;
  };

  const handleWhatsAppClick = () => {
    const message = encodeURIComponent(generateWhatsAppMessage());
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, "_blank");
  };

  const handleEmailClick = () => {
    const subject = encodeURIComponent(`Order #${orderId} - TestFlight QA Testing`);
    const body = encodeURIComponent(generateWhatsAppMessage());
    window.open(`mailto:support@testflighttesters.com?subject=${subject}&body=${body}`, "_blank");
  };

  // Copy order ID to clipboard
  const copyOrderId = () => {
    navigator.clipboard.writeText(orderId);
    alert("Order ID copied to clipboard!");
  };

  if (loading) {
    return (
      <div className="payment-success-container">
        <div className="payment-success-card" style={{ textAlign: "center", padding: "60px 40px" }}>
          <i className="fas fa-spinner fa-spin" style={{ fontSize: "2rem", color: "var(--primary)" }}></i>
          <p style={{ marginTop: "20px", color: "var(--gray)" }}>Loading your order confirmation...</p>
        </div>
      </div>
    );
  }

  if (!orderData) {
    return (
      <div className="payment-success-container">
        <div className="payment-success-card" style={{ textAlign: "center", padding: "60px 40px" }}>
          <i className="fas fa-exclamation-circle" style={{ fontSize: "2rem", color: "var(--coral)" }}></i>
          <h2 style={{ marginTop: "20px" }}>No order found</h2>
          <p style={{ color: "var(--gray)" }}>Please return to the homepage.</p>
          <Link href="/" className="btn-primary" style={{ marginTop: "20px", display: "inline-block" }}>
            <i className="fas fa-home"></i> Return Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="payment-success-container">
      <div className="payment-success-card">
        {/* Header */}
        <div className="success-header">
          <div className="success-icon">
            <i className="fas fa-check-circle"></i>
          </div>
          <h1>Payment Successful! 🎉</h1>
          <p className="success-subtitle">
            Your TestFlight QA testing order has been confirmed.
          </p>
        </div>

        {/* Order Details */}
        <div className="order-details">
          <div className="order-id-section">
            <span className="order-id-label">Order ID</span>
            <div className="order-id-value">
              <span>{orderId}</span>
              <button className="copy-btn" onClick={copyOrderId} title="Copy order ID">
                <i className="fas fa-copy"></i>
              </button>
            </div>
          </div>

          <div className="order-summary-details">
            <div className="detail-row">
              <span>Testing Type</span>
              <span className="detail-value">{orderData.typeLabel}</span>
            </div>
            <div className="detail-row">
              <span>Number of Testers</span>
              <span className="detail-value">{orderData.testers}</span>
            </div>
            <div className="detail-row">
              <span>Hours per Tester</span>
              <span className="detail-value">{orderData.hours}h</span>
            </div>
            <div className="detail-row">
              <span>Delivery Speed</span>
              <span className="detail-value">
                {orderData.delivery === "standard"
                  ? "Standard (2-3 days)"
                  : orderData.delivery === "priority"
                  ? "Priority (1-2 days)"
                  : "Express (24h)"}
              </span>
            </div>
            <div className="detail-row total-detail">
              <span>Total Paid</span>
              <span className="detail-value total-amount">${orderData.total} USD</span>
            </div>
          </div>
        </div>

        {/* Next Steps */}
        <div className="next-steps">
          <h3>📋 Next Steps</h3>
          <p>Please send us your TestFlight link and email address so we can start testing:</p>
          
          <div className="steps-list">
            <div className="step-item">
              <span className="step-number">1</span>
              <div>
                <strong>Share your TestFlight link</strong>
                <p>Send us the public link to your TestFlight build</p>
              </div>
            </div>
            <div className="step-item">
              <span className="step-number">2</span>
              <div>
                <strong>Provide your email</strong>
                <p>We'll send you updates and reports via email</p>
              </div>
            </div>
            <div className="step-item">
              <span className="step-number">3</span>
              <div>
                <strong>We'll start testing</strong>
                <p>Testing begins within 24 hours of receiving your link</p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Options */}
        <div className="contact-options">
          <h4>📱 Send us your details</h4>
          <div className="contact-buttons">
            <button className="contact-btn whatsapp" onClick={handleWhatsAppClick}>
              <i className="fab fa-whatsapp"></i>
              WhatsApp
              <span className="contact-btn-sub">Quickest response</span>
            </button>
            <button className="contact-btn email" onClick={handleEmailClick}>
              <i className="fas fa-envelope"></i>
              Email
              <span className="contact-btn-sub">support@testflighttesters.com</span>
            </button>
          </div>
        </div>

        {/* What to send */}
        <div className="what-to-send">
          <h4>✏️ What to send us</h4>
          <div className="send-items">
            <div className="send-item">
              <i className="fas fa-link"></i>
              <div>
                <strong>TestFlight Link</strong>
                <p>Your app's public TestFlight invitation link</p>
              </div>
            </div>
            <div className="send-item">
              <i className="fas fa-envelope"></i>
              <div>
                <strong>Email Address</strong>
                <p>Where we should send reports and updates</p>
              </div>
            </div>
            <div className="send-item">
              <i className="fas fa-hashtag"></i>
              <div>
                <strong>Order ID</strong>
                <p>Quote this ID: <span className="order-id-highlight">{orderId}</span></p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="success-actions">
          <button className="btn-primary whatsapp-btn" onClick={handleWhatsAppClick}>
            <i className="fab fa-whatsapp"></i> Send via WhatsApp
          </button>
          <button className="btn-outline email-btn" onClick={handleEmailClick}>
            <i className="fas fa-envelope"></i> Send via Email
          </button>
          <Link href="/" className="btn-outline home-btn">
            <i className="fas fa-home"></i> Return Home
          </Link>
        </div>

        {/* Support Note */}
        <div className="support-note">
          <i className="fas fa-headset"></i>
          <span>
            Need help? Contact us at <a href="mailto:support@testflighttesters.com">support@testflighttesters.com</a>
          </span>
        </div>
      </div>
    </div>
  );
}
