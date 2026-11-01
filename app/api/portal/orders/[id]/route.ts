import { randomUUID } from "node:crypto";
import {
  csrf,
  session,
  orderFor,
  db,
  text,
  HttpError,
  resultError,
  encrypt,
  storage,
  audit,
  rateLimit,
} from "@/lib/portal/server";
import { statuses, canEdit } from "@/lib/portal/model";
export async function POST(
  request: Request,
  context: { params: Promise<{ id: string }> },
) {
  try {
    csrf(request);
    const user = await session();
    const { id } = await context.params;
    const order = await orderFor(id, user);
    await rateLimit(`order:${user.id}`, 60);
    if (request.headers.get("content-type")?.includes("multipart/form-data")) {
      if (!user.admin)
        throw new HttpError(403, "Administrator access required.");
      if (Number(request.headers.get("content-length")) > 22 * 1024 * 1024)
        throw new HttpError(413, "Maximum PDF size is 20 MB.");
      const form = await request.formData();
      const file = form.get("file");
      if (
        !(file instanceof File) ||
        file.type !== "application/pdf" ||
        file.size > 20 * 1024 * 1024 ||
        !file.size
      )
        throw new HttpError(400, "Choose a PDF smaller than 20 MB.");
      const buffer = Buffer.from(await file.arrayBuffer());
      if (buffer.subarray(0, 5).toString() !== "%PDF-")
        throw new HttpError(400, "The file is not a valid PDF.");
      const filename = file.name
        .replace(/[^a-zA-Z0-9._ -]/g, "_")
        .slice(0, 180);
      const path = `${id}/${randomUUID()}.pdf`;
      const uploaded = await storage(`object/qa-reports/${path}`, {
        method: "POST",
        headers: { "Content-Type": "application/pdf" },
        body: buffer,
      });
      if (!uploaded.ok) throw new HttpError(503, "PDF upload failed.");
      try {
        await db("qa_reports", "POST", {
          order_id: id,
          filename,
          size: file.size,
          path,
          uploaded_by: user.id,
        });
      } catch (e) {
        await storage(`object/qa-reports/${path}`, { method: "DELETE" });
        throw e;
      }
      await audit(user.id, "Report uploaded", id, {
        filename,
        size: file.size,
      });
      return Response.json({ success: true });
    }
    const body = await request.json();
    if (body.action === "submission") {
      if (!canEdit(order.status) || order.payment_status !== "paid")
        throw new HttpError(
          409,
          "Instructions can only change before testing begins.",
        );
      const details: Record<string, string> = {};
      for (const key of [
        "app_name",
        "testflight_link",
        "description",
        "objectives",
        "features",
        "devices",
        "ios_versions",
        "audience",
        "notes",
      ])
        details[key] = text(
          body[key],
          key === "app_name" ? 150 : 5000,
          ["app_name", "testflight_link", "description", "objectives"].includes(
            key,
          ),
        );
      let url: URL;
      try {
        url = new URL(details.testflight_link);
      } catch {
        throw new HttpError(400, "Enter a TestFlight public invitation URL.");
      }
      if (
        url.protocol !== "https:" ||
        url.hostname !== "testflight.apple.com" ||
        !/^\/join\/[A-Za-z0-9]+\/?$/.test(url.pathname)
      )
        throw new HttpError(
          400,
          "Use a public testflight.apple.com/join/ invitation link.",
        );
      const credentials = text(body.credentials || "", 5000);
      await db("rpc/save_submission", "POST", {
        p_order: id,
        p_email: user.email,
        p_details: details,
        p_credentials: credentials ? encrypt(credentials) : null,
      });
      await audit(user.id, "App details saved", id);
    } else if (body.action === "testing") {
      if (!user.admin)
        throw new HttpError(403, "Administrator access required.");
      if (!statuses.includes(body.status))
        throw new HttpError(400, "Invalid testing status.");
      const assigned = text(body.assigned_to || "", 36);
      if (assigned && !/^[0-9a-f-]{36}$/i.test(assigned))
        throw new HttpError(400, "Choose an authorized team member.");
      await db("rpc/update_testing", "POST", {
        p_order: id,
        p_actor: user.id,
        p_status: body.status,
        p_notes: text(body.notes || "", 20000),
        p_assigned: assigned || null,
      });
    } else if (body.action === "read-messages") {
      await db(
        `messages?order_id=eq.${id}&admin=eq.${!user.admin}&read_at=is.null`,
        "PATCH",
        { read_at: new Date().toISOString() },
      );
    } else if (body.action === "message") {
      await db("messages", "POST", {
        order_id: id,
        sender_id: user.id,
        sender_email: user.email,
        admin: user.admin,
        body: text(body.message, 5000, true),
      });
      await db("email_notifications", "POST", {
        dedupe_key: `message:${randomUUID()}`,
        recipient: user.admin
          ? order.customer_email
          : "support@testflighttesters.com",
        subject: "New message about your TestFlightTesters order",
        payload: {
          kind: "message",
          order: { ...order, customer_name: "", capture_id: "" },
        },
      });
    } else throw new HttpError(400, "Unknown action.");
    return Response.json({ success: true });
  } catch (e) {
    return resultError(e);
  }
}
