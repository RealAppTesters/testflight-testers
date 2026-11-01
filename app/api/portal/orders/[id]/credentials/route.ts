import { createDecipheriv } from "node:crypto";
import {
  session,
  orderFor,
  csrf,
  db,
  audit,
  env,
  rateLimit,
  HttpError,
  resultError,
} from "@/lib/portal/server";
export async function POST(
  request: Request,
  context: { params: Promise<{ id: string }> },
) {
  try {
    csrf(request);
    const user = await session(true);
    const { id } = await context.params;
    await orderFor(id, user);
    await rateLimit(`credentials:${user.id}`, 10);
    const [row] = await db<{ encrypted_credentials: string | null }[]>(
      `app_submissions?order_id=eq.${id}&select=encrypted_credentials`,
    );
    if (!row?.encrypted_credentials)
      throw new HttpError(404, "No dedicated test credentials saved.");
    const [iv, tag, value] = row.encrypted_credentials
      .split(".")
      .map((s) => Buffer.from(s, "base64"));
    const decipher = createDecipheriv(
      "aes-256-gcm",
      Buffer.from(env("TEST_CREDENTIALS_KEY"), "hex"),
      iv,
    );
    decipher.setAuthTag(tag);
    const plaintext = Buffer.concat([
      decipher.update(value),
      decipher.final(),
    ]).toString("utf8");
    await audit(user.id, "Dedicated test credentials accessed", id);
    return Response.json(
      { credentials: plaintext },
      { headers: { "Cache-Control": "no-store" } },
    );
  } catch (e) {
    return resultError(e);
  }
}
