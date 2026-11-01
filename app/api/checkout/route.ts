import {
  csrf,
  db,
  HttpError,
  rateLimit,
  resultError,
} from "@/lib/portal/server";
import { price } from "@/lib/portal/model";
import { paypal } from "@/lib/portal/paypal";
export async function POST(request: Request) {
  try {
    csrf(request);
    const config = await request.json();
    const amount = price(config);
    await rateLimit(
      `checkout:${request.headers.get("x-forwarded-for") || "unknown"}`,
      30,
    );
    const [intent] = await db<{ id: string }[]>("checkout_intents", "POST", {
      configuration: {
        type: config.type,
        testers: config.testers,
        hours: config.hours,
        delivery: config.delivery,
      },
    });
    const order = await paypal(
      "/v2/checkout/orders",
      "POST",
      {
        intent: "CAPTURE",
        purchase_units: [
          {
            custom_id: intent.id,
            description: `${config.type} - ${config.testers} testers × ${config.hours}h`,
            amount: { currency_code: "USD", value: amount.toFixed(2) },
          },
        ],
        payment_source: {
          paypal: {
            experience_context: { shipping_preference: "NO_SHIPPING" },
          },
        },
      },
      { "PayPal-Request-Id": intent.id },
    );
    if (!order.id) throw new HttpError(502, "Unable to create PayPal order.");
    await db(`checkout_intents?id=eq.${intent.id}`, "PATCH", {
      paypal_order_id: order.id,
    });
    return Response.json({ id: order.id });
  } catch (e) {
    return resultError(e);
  }
}
