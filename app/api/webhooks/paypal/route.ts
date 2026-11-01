import { db, env, HttpError, resultError } from "@/lib/portal/server";
import { paypal, persistPayment } from "@/lib/portal/paypal";
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const verified = await paypal(
      "/v1/notifications/verify-webhook-signature",
      "POST",
      {
        auth_algo: request.headers.get("paypal-auth-algo"),
        cert_url: request.headers.get("paypal-cert-url"),
        transmission_id: request.headers.get("paypal-transmission-id"),
        transmission_sig: request.headers.get("paypal-transmission-sig"),
        transmission_time: request.headers.get("paypal-transmission-time"),
        webhook_id: env("PAYPAL_WEBHOOK_ID"),
        webhook_event: body,
      },
    );
    if (verified.verification_status !== "SUCCESS")
      throw new HttpError(401, "Invalid webhook signature.");
    if (typeof body.id !== "string" || !/^[A-Z0-9-]+$/.test(body.id))
      throw new HttpError(400, "Invalid event.");
    const previous = await db<unknown[]>(
      `paypal_webhook_events?id=eq.${encodeURIComponent(body.id)}`,
    );
    if (previous.length) return Response.json({ received: true });
    if (body.event_type === "PAYMENT.CAPTURE.COMPLETED") {
      const id = body.resource?.supplementary_data?.related_ids?.order_id;
      if (!id) throw new HttpError(400, "Missing order reference.");
      await persistPayment(id);
    } else if (body.event_type === "PAYMENT.CAPTURE.REFUNDED") {
      const refund = await paypal(
        `/v2/payments/refunds/${encodeURIComponent(body.resource.id)}`,
      );
      if (refund.status !== "COMPLETED")
        throw new HttpError(409, "Refund not complete.");
      const captureLink = refund.links?.find(
        (l: { rel: string }) => l.rel === "up",
      )?.href;
      const captureId = captureLink?.match(/\/captures\/([A-Z0-9]+)$/)?.[1];
      if (!captureId) throw new HttpError(400, "Missing capture reference.");
      await db("rpc/record_refund", "POST", {
        p_event: body.id,
        p_capture: captureId,
        p_id: refund.id,
        p_amount: Number(refund.amount.value),
        p_currency: refund.amount.currency_code,
      });
    }
    // APPROVED is not proof of a completed capture.
    await db("paypal_webhook_events?on_conflict=id", "POST", {
      id: body.id,
      event_type: body.event_type,
    }).catch(async () => {
      const rows = await db<unknown[]>(
        `paypal_webhook_events?id=eq.${encodeURIComponent(body.id)}`,
      );
      if (!rows.length) throw new HttpError(503, "Unable to record event.");
    });
    return Response.json({ received: true });
  } catch (e) {
    return resultError(e);
  }
}
