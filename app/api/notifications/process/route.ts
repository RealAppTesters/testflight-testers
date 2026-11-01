import { timingSafeEqual } from "node:crypto";
import { env, HttpError, resultError } from "@/lib/portal/server";
import { processEmails } from "@/lib/portal/email";
export async function POST(request: Request) {
  try {
    const actual = Buffer.from(request.headers.get("authorization") || "");
    const expected = Buffer.from(`Bearer ${env("NOTIFICATION_JOB_SECRET")}`);
    if (actual.length !== expected.length || !timingSafeEqual(actual, expected))
      throw new HttpError(401, "Unauthorized");
    return Response.json({ processed: await processEmails() });
  } catch (e) {
    return resultError(e);
  }
}
