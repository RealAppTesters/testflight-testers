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
  customerEmail?: string;
  customerName?: string;
  customerPhone?: string;
  paypalOrderId?: string;
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
      const id = data.orderId || `TFT-${Date.now().toString().slice(-6)}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;
      setOrderId(id);
      setOrderData(data);
    } else {
      router.push("/");
    }
    setLoading(false);
  }, [router]);

  // WhatsApp number - replace with your actual business number
  const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "27606393302";

  // Generate WhatsApp message with detailed order details and testing priorities
  const generateWhatsAppMessage = () => {
    if (!orderData) return "";
    return `Hello TestFlightTesters! 🚀

I've just placed an order for QA testing and want to share my details.

📋 Order Details:
Order ID: ${orderId}
Testing Type: ${orderData.typeLabel}
Testers: ${orderData.testers}
Hours: ${orderData.hours}h
Delivery: ${orderData.delivery === "standard" ? "Standard (2-3 days)" : orderData.delivery === "priority" ? "Priority (1-2 days)" : "Express (24h)"}
Total: $${orderData.total} USD

📱 TestFlight Public Link:
[Paste your public TestFlight invitation link here]

📧 Contact Email:
[Email where you'd like to receive QA reports]

🎯 Features to Focus On:
- [ ] Login & Sign Up
- [ ] Subscription / In-App Purchases
- [ ] Navigation
- [ ] Performance & Speed
- [ ] Crash Testing
- [ ] UI / UX
- [ ] Notifications
- [ ] Offline Mode
- [ ] Payments
- [ ] Account Creation
- [ ] Other: [Specify]

📝 Extra Notes:
[Any additional instructions or specific features to test]

Please confirm receipt and let me know when testing will begin.

Thank you! 🙌`;
  };

  // Generate email with detailed order details
  const generateEmailBody = () => {
    if (!orderData) return "";
    return `Hello TestFlightTesters,

I've just placed an order for QA testing and wanted to share my details.

📋 Order Details:
Order ID: ${orderId}
Testing Type: ${orderData.typeLabel}
Testers: ${orderData.testers}
Hours: ${orderData.hours}h
Delivery: ${orderData.delivery === "standard" ? "Standard (2-3 days)" : orderData.delivery === "priority" ? "Priority (1-2 days)" : "Express (24h)"}
Total: $${orderData.total} USD

📱 TestFlight Public Link:
[Paste your public TestFlight invitation link here]

📧 Contact Email:
[Email where you'd like to receive QA reports]

🎯 Features to Focus On:
- Login & Sign Up
- Subscription / In-App Purchases
- Navigation
- Performance & Speed
- Crash Testing
- UI / UX
- Notifications
- Offline Mode
- Payments
- Account Creation
- Any specific feature you want thoroughly tested: [Specify]

📝 Extra Notes:
[Any additional instructions or specific features to test]

Thank you!
${orderData.customerName || 'Your Name'}`;
  };

  const handleWhatsAppClick = () => {
    const message = encodeURIComponent(generateWhatsAppMessage());
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, "_blank");
  };

  const handleEmailClick = () => {
    const subject = encodeURIComponent(`Order #${orderId} - TestFlight QA Testing Details`);
    const body = encodeURIComponent(generateEmailBody());
    window.open(`mailto:support@testflighttesters.com?subject=${subject}&body=${body}`, "_blank");
  };

  // Copy order ID to clipboard
  const copyOrderId = () => {
    navigator.clipboard.writeText(orderId);
    alert("✅ Order ID copied to clipboard!");
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
          {orderData.paypalOrderId && (
            <p className="success-subtitle" style={{ fontSize: "0.8rem", color: "var(--gray)", marginTop: "4px" }}>
              PayPal Order: {orderData.paypalOrderId}
            </p>
          )}
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

        {/* Next Steps with Testing Priorities */}
        <div className="next-steps">
          <h3>📋 Next Steps</h3>
          <p>Please send us the following so we can begin testing:</p>
          
          <div className="steps-list">
            <div className="step-item">
              <span className="step-number">1</span>
              <div>
                <strong>🔗 TestFlight Public Link</strong>
                <p>Send your public TestFlight invitation link</p>
              </div>
            </div>
            <div className="step-item">
              <span className="step-number">2</span>
              <div>
                <strong>📧 Contact Email</strong>
                <p>We'll use this to send QA reports and updates</p>
              </div>
            </div>
            <div className="step-item">
              <span className="step-number">3</span>
              <div>
                <strong>🎯 Features to Focus On</strong>
                <p>Tell us what you'd like us to prioritize</p>
                <div className="priority-tags">
                  <span className="priority-tag">Login & Sign Up</span>
                  <span className="priority-tag">Subscriptions / IAP</span>
                  <span className="priority-tag">Navigation</span>
                  <span className="priority-tag">Performance & Speed</span>
                  <span className="priority-tag">Crash Testing</span>
                  <span className="priority-tag">UI / UX</span>
                  <span className="priority-tag">Notifications</span>
                  <span className="priority-tag">Offline Mode</span>
                  <span className="priority-tag">Payments</span>
                  <span className="priority-tag">Account Creation</span>
                  <span className="priority-tag">Multiplayer / Gameplay</span>
                  <span className="priority-tag highlight">Custom Feature</span>
                </div>
                <p style={{ fontSize: "0.8rem", color: "var(--gray)", marginTop: "8px" }}>
                  Select from the tags above or specify your own
                </p>
              </div>
            </div>
            <div className="step-item">
              <span className="step-number">4</span>
              <div>
                <strong>🚀 We'll Start Testing</strong>
                <p>Testing begins within 24 hours after we receive your details</p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Action Buttons - Large CTA Buttons */}
        <div className="quick-actions">
          <h3>📱 Send us your details</h3>
          <div className="action-buttons">
            <button className="action-btn whatsapp-btn" onClick={handleWhatsAppClick}>
              <i className="fab fa-whatsapp"></i>
              <div className="action-content">
                <span className="action-title">Send via WhatsApp</span>
                <span className="action-sub">Fastest response (usually within minutes)</span>
              </div>
            </button>
            <button className="action-btn email-btn" onClick={handleEmailClick}>
              <i className="fas fa-envelope"></i>
              <div className="action-content">
                <span className="action-title">Send via Email</span>
                <span className="action-sub">support@testflighttesters.com</span>
              </div>
            </button>
          </div>
        </div>

        {/* What to Send */}
        <div className="what-to-send">
          <h4>✏️ What to send us</h4>
          <div className="send-items">
            <div className="send-item">
              <i className="fas fa-link"></i>
              <div>
                <strong>🔗 TestFlight Link</strong>
                <p>Your app's public TestFlight invitation link</p>
              </div>
            </div>
            <div className="send-item">
              <i className="fas fa-envelope"></i>
              <div>
                <strong>📧 Contact Email</strong>
                <p>Where you'd like to receive QA reports</p>
                {orderData.customerEmail && (
                  <p style={{ fontSize: "0.8rem", color: "var(--primary)" }}>
                    Using: {orderData.customerEmail}
                  </p>
                )}
              </div>
            </div>
            <div className="send-item">
              <i className="fas fa-bullseye"></i>
              <div>
                <strong>🎯 Features to Focus On</strong>
                <p>Tell us which features to prioritize testing</p>
              </div>
            </div>
            <div className="send-item">
              <i className="fas fa-pen"></i>
              <div>
                <strong>📝 Extra Notes</strong>
                <p>Any additional instructions or specific features to test</p>
              </div>
            </div>
            <div className="send-item">
              <i className="fas fa-hashtag"></i>
              <div>
                <strong>🆔 Order ID</strong>
                <p>Quote this ID: <span className="order-id-highlight">{orderId}</span></p>
              </div>
            </div>
          </div>
        </div>

        {/* Return Home */}
        <div className="success-actions">
          <Link href="/" className="btn-primary home-btn">
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
