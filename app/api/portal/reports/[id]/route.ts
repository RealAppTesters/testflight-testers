import {
  session,
  csrf,
  db,
  orderFor,
  storage,
  HttpError,
  resultError,
  rateLimit,
} from "@/lib/portal/server";
import type { Report } from "@/lib/portal/model";
async function accessible(id: string) {
  if (!/^[0-9a-f-]{36}$/i.test(id))
    throw new HttpError(404, "Report not found.");
  const user = await session();
  const [report] = await db<Report[]>(`qa_reports?id=eq.${id}`);
  if (!report) throw new HttpError(404, "Report not found.");
  await orderFor(report.order_id, user);
  if (!user.admin && !report.released_at)
    throw new HttpError(404, "Report not found.");
  return { report, user };
}
export async function GET(
  request: Request,
  ctx: { params: Promise<{ id: string }> },
) {
  try {
    const { report, user } = await accessible((await ctx.params).id);
    const signed = await storage(`object/sign/qa-reports/${report.path}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ expiresIn: 60 }),
    });
    if (!signed.ok) throw new HttpError(503, "Unable to open report.");
    const data = await signed.json();
    if (!user.admin)
      await db(`qa_reports?id=eq.${report.id}`, "PATCH", {
        downloaded_at: new Date().toISOString(),
      });
    return Response.json(
      { url: `${process.env.SUPABASE_URL}/storage/v1${data.signedURL}` },
      { headers: { "Cache-Control": "no-store" } },
    );
  } catch (e) {
    return resultError(e);
  }
}
export async function POST(
  request: Request,
  ctx: { params: Promise<{ id: string }> },
) {
  try {
    csrf(request);
    const { report, user } = await accessible((await ctx.params).id);
    if (!user.admin) throw new HttpError(403, "Administrator access required.");
    await rateLimit(`report:${user.id}`, 20);
    const body = await request.json();
    if (
      body.confirm !== true ||
      String(body.email || "").toLowerCase() !==
        (await orderFor(report.order_id, user)).customer_email.toLowerCase() ||
      body.filename !== report.filename
    )
      throw new HttpError(
        400,
        "Confirm the customer email and report filename.",
      );
    await db("rpc/release_report", "POST", {
      p_report: report.id,
      p_actor: user.id,
      p_resend: body.resend === true,
    });
    return Response.json({
      success: true,
      message: "Report released; email queued.",
    });
  } catch (e) {
    return resultError(e);
  }
}
