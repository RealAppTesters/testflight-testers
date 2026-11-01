import "server-only";
import { db, env, site } from "./server";
const escape = (s: unknown) =>
  String(s ?? "").replace(
    /[&<>"']/g,
    (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        c
      ]!,
  );
type Notification = {
  id: string;
  dedupe_key: string;
  recipient: string;
  subject: string;
  attempts: number;
  payload: {
    kind: string;
    order: Record<string, string | number>;
    report_id?: string;
    attempt?: number;
    filename?: string;
  };
};
export function template(n: Notification) {
  const { order: o, kind } = n.payload;
  const href = `${site()}/${kind === "payment-admin" ? "admin" : "dashboard"}/orders/${o.id}`;
  const content =
    kind === "message"
      ? "<p>A new message is available on your testing order. Sign in to read it and reply securely.</p>"
      : kind === "report"
        ? `<p>Hi ${escape(o.customer_name || "there")},</p><p>Your iOS app testing report for ${escape(o.app_name || "your app")} is now ready.</p><p>Our QA report contains the testing findings, identified issues and recommendations from your testing order.</p><p>You can securely access and download your report using the link below.</p>`
        : `<p>Thank you. A verified payment has been recorded.</p><p>Order: ${escape(o.id)}<br>Customer: ${escape(o.customer_name)} · ${escape(o.customer_email)}<br>Amount: ${escape(o.amount)} ${escape(o.currency)}<br>Testing: ${escape(o.testing_type)}<br>Testers: ${escape(o.testers)} · Hours: ${escape(o.hours)}<br>Delivery: ${escape(o.delivery)}<br>Payment date: ${escape(o.paid_at || o.created_at)}<br>PayPal capture: ${escape(o.capture_id)}</p><p>Sign in with this email address to submit your TestFlight invitation and app instructions.</p>`;
  return `<html><body style="background:#f5f3fc;font:15px/1.7 Arial;color:#161329;padding:30px"><main style="max-width:560px;margin:auto;background:white;padding:36px;border-radius:18px"><h2>TestFlight<span style="color:#6c3ce0">Testers</span></h2>${content}<p><a style="display:inline-block;background:#6c3ce0;color:white;padding:14px 24px;border-radius:8px;text-decoration:none" href="${href}">${kind === "report" ? "View &amp; Download QA Report" : "Open order securely"}</a></p><p>Thank you for choosing TestFlightTesters.</p><p>Best regards,<br>TestFlightTesters Team<br>support@testflighttesters.com</p></main></body></html>`;
}
export async function processEmails() {
  const jobs = await db<Notification[]>("rpc/claim_emails", "POST", {});
  for (const job of jobs) {
    try {
      const response = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${env("RESEND_API_KEY")}`,
          "Content-Type": "application/json",
          "Idempotency-Key": job.dedupe_key,
        },
        body: JSON.stringify({
          from: env("EMAIL_FROM"),
          to: [job.recipient],
          subject: job.subject,
          html: template(job),
        }),
      });
      if (!response.ok) throw new Error(`Provider status ${response.status}`);
      const sent = await response.json();
      await db(`email_notifications?id=eq.${job.id}`, "PATCH", {
        status: "accepted",
        provider_id: sent.id,
        accepted_at: new Date().toISOString(),
        locked_at: null,
        last_error: null,
      });
      if (job.payload.report_id)
        await db(
          `report_deliveries?report_id=eq.${job.payload.report_id}&attempt=eq.${job.payload.attempt}`,
          "PATCH",
          { status: "email accepted" },
        );
    } catch {
      await db(`email_notifications?id=eq.${job.id}`, "PATCH", {
        status: "failed",
        last_error: "Provider request failed; retry scheduled",
        available_at: new Date(
          Date.now() + Math.pow(2, job.attempts) * 60000,
        ).toISOString(),
        locked_at: null,
      });
      if (job.payload.report_id)
        await db(
          `report_deliveries?report_id=eq.${job.payload.report_id}&attempt=eq.${job.payload.attempt}`,
          "PATCH",
          { status: "email failed" },
        );
    }
  }
  return jobs.length;
}
