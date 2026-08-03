"use client";

import { useEffect, useState, useRef } from "react";
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
  customerEmail?: string;
  customerName?: string;
  customerPhone?: string;
}

declare global {
  interface Window {
    paypal: any;
  }
}

export default function PaymentPage() {
  const router = useRouter();
  const [orderData, setOrderData] = useState<OrderData | null>(null);
  const [loading, setLoading] = useState(true);
  const [paymentStatus, setPaymentStatus] = useState<"idle" | "processing" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [customerDetails, setCustomerDetails] = useState({
    email: "",
    name: "",
    phone: "",
  });
  const [paypalLoaded, setPaypalLoaded] = useState(false);
  const paypalContainerRef = useRef<HTMLDivElement>(null);

  const PAYPAL_CLIENT_ID = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || "sb";

  useEffect(() => {
    const stored = sessionStorage.getItem("orderData");
    if (stored) {
      const data = JSON.parse(stored);
      setOrderData(data);
    } else {
      router.push("/");
    }
    setLoading(false);
  }, [router]);

  // Load PayPal SDK from CDN
  useEffect(() => {
    if (typeof window === "undefined") return;

    // Check if PayPal is already loaded
    if (window.paypal) {
      setPaypalLoaded(true);
      return;
    }

    // Load PayPal SDK script
    const script = document.createElement("script");
    script.src = `https://www.paypal.com/sdk/js?client-id=${PAYPAL_CLIENT_ID}&currency=USD`;
    script.async = true;
    script.onload = () => {
      setPaypalLoaded(true);
    };
    script.onerror = () => {
      setErrorMessage("Failed to load PayPal. Please refresh the page.");
    };
    document.body.appendChild(script);

    return () => {
      // Cleanup
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, [PAYPAL_CLIENT_ID]);

  // Render PayPal buttons when loaded
  useEffect(() => {
    if (!paypalLoaded || !orderData || !paypalContainerRef.current) return;

    // Clear container
    paypalContainerRef.current.innerHTML = "";

    // Render PayPal buttons
    window.paypal.Buttons({
      style: {
        layout: "vertical",
        color: "blue",
        shape: "rect",
        label: "pay",
      },
      createOrder: (data: any, actions: any) => {
        return actions.order.create({
          purchase_units: [
            {
              amount: {
                value: orderData.total.toFixed(2),
                currency_code: "USD",
              },
              description: `${orderData.typeLabel} - ${orderData.testers} testers × ${orderData.hours}h`,
            },
          ],
          application_context: {
            shipping_preference: "NO_SHIPPING",
          },
        });
      },
      onApprove: (data: any, actions: any) => {
        return actions.order.capture().then((details: any) => {
          handlePaymentSuccess(details);
        });
      },
      onError: (error: any) => {
        handlePaymentError(error);
      },
    }).render(paypalContainerRef.current);
  }, [paypalLoaded, orderData]);

  const handlePaymentSuccess = (details: any) => {
    setPaymentStatus("success");

    // Store order with customer details and generated ID
    if (orderData) {
      const orderId = `TFT-${Date.now().toString().slice(-6)}-${Math.random()
        .toString(36)
        .substring(2, 6)
        .toUpperCase()}`;
      const completeOrderData = {
        ...orderData,
        orderId: orderId,
        customerEmail: customerDetails.email || details.payer?.email_address || "",
        customerName: customerDetails.name || details.payer?.name?.given_name || "",
        customerPhone: customerDetails.phone || "",
        paypalOrderId: details.id,
        status: "confirmed",
      };

      sessionStorage.setItem("orderData", JSON.stringify(completeOrderData));
    }

    // Redirect to success page
    router.push("/payment/success");
  };

  const handlePaymentError = (error: any) => {
    setPaymentStatus("error");
    setErrorMessage(
      error.message || "There was an error processing your payment. Please try again."
    );
    console.error("Payment error:", error);
  };

  if (loading) {
    return (
      <div className="payment-container">
        <div
          className="payment-card"
          style={{ textAlign: "center", padding: "60px 40px" }}
        >
          <i
            className="fas fa-spinner fa-spin"
            style={{ fontSize: "2rem", color: "var(--primary)" }}
          ></i>
          <p style={{ marginTop: "20px", color: "var(--gray)" }}>
            Loading your order...
          </p>
        </div>
      </div>
    );
  }

  if (!orderData) {
    return (
      <div className="payment-container">
        <div
          className="payment-card"
          style={{ textAlign: "center", padding: "60px 40px" }}
        >
          <i
            className="fas fa-exclamation-circle"
            style={{ fontSize: "2rem", color: "var(--coral)" }}
          ></i>
          <h2 style={{ marginTop: "20px" }}>No order found</h2>
          <p style={{ color: "var(--gray)" }}>
            Please return to the homepage and select your testing package.
          </p>
          <Link
            href="/"
            className="btn-primary"
            style={{ marginTop: "20px", display: "inline-block" }}
          >
            <i className="fas fa-arrow-left"></i> Back to Home
          </Link>
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
        <p className="payment-subtitle">
          Review your testing package and proceed to secure payment.
        </p>

        {/* Customer Details Form */}
        <div className="customer-details">
          <h3>Contact Information</h3>
          <div className="form-group">
            <label>Email Address *</label>
            <input
              type="email"
              placeholder="your@email.com"
              value={customerDetails.email}
              onChange={(e) =>
                setCustomerDetails({ ...customerDetails, email: e.target.value })
              }
              required
            />
          </div>
          <div className="form-group">
            <label>Full Name *</label>
            <input
              type="text"
              placeholder="John Doe"
              value={customerDetails.name}
              onChange={(e) =>
                setCustomerDetails({ ...customerDetails, name: e.target.value })
              }
              required
            />
          </div>
          <div className="form-group">
            <label>Phone Number (WhatsApp)</label>
            <input
              type="tel"
              placeholder="+27 78 123 4567"
              value={customerDetails.phone}
              onChange={(e) =>
                setCustomerDetails({ ...customerDetails, phone: e.target.value })
              }
            />
            <small>We'll use this for WhatsApp updates</small>
          </div>
        </div>

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
              <i
                className="fab fa-paypal"
                style={{ fontSize: "1.8rem", color: "#003087" }}
              ></i>
              <div>
                <div style={{ fontWeight: 600 }}>PayPal</div>
                <div style={{ fontSize: "0.85rem", color: "var(--gray)" }}>
                  Secure payment with PayPal. Accepts credit cards, debit cards, and PayPal balance.
                </div>
                {!paypalLoaded && (
                  <div style={{ fontSize: "0.75rem", color: "var(--primary)", marginTop: "4px" }}>
                    <i className="fas fa-spinner fa-spin"></i> Loading PayPal...
                  </div>
                )}
              </div>
            </div>
            <div className="payment-option-check">
              <i className="fas fa-check-circle" style={{ color: "var(--mint)" }}></i>
            </div>
          </div>
        </div>

        <div 
          ref={paypalContainerRef}
          className="paypal-container"
          style={{ minHeight: "100px" }}
        >
          {!paypalLoaded && (
            <div className="paypal-loading">
              <i className="fas fa-spinner fa-spin"></i> Loading PayPal...
            </div>
          )}
        </div>

        <div className="payment-actions" style={{ marginTop: "16px" }}>
          <Link
            href="/"
            className="btn-outline"
            style={{
              textDecoration: "none",
              flex: 1,
              justifyContent: "center",
            }}
          >
            <i className="fas fa-arrow-left"></i> Cancel
          </Link>
        </div>

        <div className="payment-secure">
          <i className="fas fa-lock"></i>
          <span>Your payment is secure and encrypted.</span>
        </div>
      </div>
    </div>
  );
}
