"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  PayPalScriptProvider,
  PayPalButtons,
  usePayPalScriptReducer,
} from "@paypal/react-paypal-js";

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

// Use the sandbox client ID from environment
const PAYPAL_CLIENT_ID = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || "sb";

function PayPalButtonWrapper({
  amount,
  onSuccess,
  onError,
  orderData,
}: {
  amount: number;
  onSuccess: (details: any) => void;
  onError: (error: any) => void;
  orderData: OrderData;
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
                  description: `${orderData.typeLabel} - ${orderData.testers} testers × ${orderData.hours}h`,
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
  const [paymentStatus, setPaymentStatus] = useState<
    "idle" | "processing" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [customerDetails, setCustomerDetails] = useState({
    email: "",
    name: "",
    phone: "",
  });

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
          <h3>Pay with PayPal (Sandbox)</h3>
          <div className="payment-option selected">
            <div className="payment-option-content">
              <i
                className="fab fa-paypal"
                style={{ fontSize: "1.8rem", color: "#003087" }}
              ></i>
              <div>
                <div style={{ fontWeight: 600 }}>PayPal Sandbox</div>
                <div style={{ fontSize: "0.85rem", color: "var(--gray)" }}>
                  Testing mode - use a sandbox test account to pay
                </div>
                <div
                  style={{
                    fontSize: "0.75rem",
                    color: "var(--primary)",
                    marginTop: "4px",
                  }}
                >
                  <i className="fas fa-info-circle"></i> Use sandbox test credentials
                </div>
              </div>
            </div>
            <div className="payment-option-check">
              <i className="fas fa-check-circle" style={{ color: "var(--mint)" }}></i>
            </div>
          </div>
        </div>

        <div className="paypal-container">
          <PayPalScriptProvider
            options={{
              clientId: PAYPAL_CLIENT_ID,
              currency: "USD",
              intent: "capture",
              "enable-funding": "paylater",
            }}
          >
            <PayPalButtonWrapper
              amount={orderData.total}
              onSuccess={handlePaymentSuccess}
              onError={handlePaymentError}
              orderData={orderData}
            />
          </PayPalScriptProvider>
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
          <span>Sandbox mode - No real money is being charged</span>
        </div>
      </div>
    </div>
  );
}
