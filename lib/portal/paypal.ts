import "server-only";
import { db, env, HttpError } from "./server";
import { price } from "./model";
import { processEmails } from "./email";
const base = () =>
  env("PAYPAL_ENVIRONMENT") === "live"
    ? "https://api-m.paypal.com"
    : "https://api-m.sandbox.paypal.com";
export async function paypal(
  path: string,
  method = "GET",
  body?: unknown,
  extra: Record<string, string> = {},
) {
  const tokenResponse = await fetch(`${base()}/v1/oauth2/token`, {
    method: "POST",
    headers: {
      Authorization: `Basic ${Buffer.from(`${env("PAYPAL_CLIENT_ID")}:${env("PAYPAL_CLIENT_SECRET")}`).toString("base64")}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: "grant_type=client_credentials",
    cache: "no-store",
  });
  if (!tokenResponse.ok)
    throw new HttpError(
      503,
      "Payment verification is temporarily unavailable.",
    );
  const { access_token } = await tokenResponse.json();
  const response = await fetch(`${base()}${path}`, {
    method,
    headers: {
      Authorization: `Bearer ${access_token}`,
      "Content-Type": "application/json",
      ...extra,
    },
    body: body ? JSON.stringify(body) : undefined,
    cache: "no-store",
  });
  if (!response.ok)
    throw new HttpError(
      502,
      "PayPal could not verify this payment. Contact support with your PayPal reference.",
    );
  return response.json();
}
export async function persistPayment(paypalId: string) {
  if (!/^[A-Z0-9]{10,32}$/.test(paypalId))
    throw new HttpError(400, "Invalid PayPal reference.");
  const paid = await paypal(`/v2/checkout/orders/${paypalId}`);
  const unit = paid.purchase_units?.[0];
  const capture = unit?.payments?.captures?.[0];
  if (
    paid.status !== "COMPLETED" ||
    paid.purchase_units?.length !== 1 ||
    capture?.status !== "COMPLETED" ||
    !paid.payer?.email_address
  )
    throw new HttpError(409, "Payment is not completed.");
  const intents = await db<
    {
      configuration: {
        testers: number;
        hours: number;
        delivery: string;
        type: string;
      };
      id: string;
    }[]
  >(`checkout_intents?paypal_order_id=eq.${paypalId}`);
  const intent = intents[0];
  if (!intent || unit.custom_id !== intent.id)
    throw new HttpError(
      409,
      "Payment requires manual reconciliation. Contact support.",
    );
  const config = intent.configuration;
  const total = price(config);
  if (
    capture.amount?.currency_code !== "USD" ||
    Number(capture.amount?.value) !== total ||
    unit.payee?.merchant_id !== env("PAYPAL_MERCHANT_ID")
  )
    throw new HttpError(409, "Payment details did not match the order.");
  const orderId = await db<string>("rpc/record_payment", "POST", {
    p_order: {
      customer_email: paid.payer.email_address.toLowerCase(),
      customer_name: [paid.payer.name?.given_name, paid.payer.name?.surname]
        .filter(Boolean)
        .join(" "),
      testers: config.testers,
      hours: config.hours,
      testing_type: config.type,
      delivery: config.delivery,
      amount: total,
      currency: "USD",
      paypal_order_id: paid.id,
      capture_id: capture.id,
      paid_at: capture.create_time,
    },
  });
  if (process.env.RESEND_API_KEY) {
    try {
      await processEmails();
    } catch {
      console.error("Notification processing deferred to retry worker");
    }
  }
  return orderId;
}
