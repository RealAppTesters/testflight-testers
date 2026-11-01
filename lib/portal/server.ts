import "server-only";
import { cookies } from "next/headers";
import { createCipheriv, createHash, randomBytes } from "node:crypto";
import { ownOrder, type Order } from "./model";
export class HttpError extends Error {
  constructor(
    public status: number,
    message: string,
  ) {
    super(message);
  }
}
export function env(key: string) {
  const value = process.env[key];
  if (!value)
    throw new HttpError(
      503,
      "Service is not configured. Please contact support.",
    );
  return value;
}
export const site = () => env("APP_URL").replace(/\/$/, "");
export async function db<T = Record<string, unknown>[]>(
  path: string,
  method = "GET",
  body?: unknown,
): Promise<T> {
  const response = await fetch(`${env("SUPABASE_URL")}/rest/v1/${path}`, {
    method,
    headers: {
      apikey: env("SUPABASE_SERVICE_ROLE_KEY"),
      Authorization: `Bearer ${env("SUPABASE_SERVICE_ROLE_KEY")}`,
      "Content-Type": "application/json",
      Prefer: "return=representation",
    },
    body: body === undefined ? undefined : JSON.stringify(body),
    cache: "no-store",
  });
  if (!response.ok) {
    console.error(
      "Database operation failed",
      response.status,
      path.split("?")[0],
    );
    throw new HttpError(
      503,
      "Unable to save or retrieve records. Please retry.",
    );
  }
  const text = await response.text();
  return (text ? JSON.parse(text) : null) as T;
}
export async function auth(path: string, body?: unknown, token?: string) {
  const response = await fetch(`${env("SUPABASE_URL")}/auth/v1/${path}`, {
    method: body ? "POST" : "GET",
    headers: {
      apikey: env("SUPABASE_ANON_KEY"),
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: body ? JSON.stringify(body) : undefined,
    cache: "no-store",
  });
  if (!response.ok)
    throw new HttpError(
      401,
      "Unable to sign in. Request a fresh link and try again.",
    );
  return response.json();
}
export async function session(admin = false) {
  const token = (await cookies()).get("tft-session")?.value;
  if (!token) throw new HttpError(401, "Please sign in to continue.");
  const user = await auth("user", undefined, token);
  if (!user.email_confirmed_at || !user.email)
    throw new HttpError(401, "Verify your email to continue.");
  const roles = await db<{ user_id: string }[]>(
    `admin_roles?user_id=eq.${encodeURIComponent(user.id)}&select=user_id`,
  );
  if (admin && !roles.length)
    throw new HttpError(403, "Administrator access required.");
  return {
    id: user.id as string,
    email: (user.email as string).toLowerCase(),
    admin: !!roles.length,
  };
}
export function csrf(request: Request) {
  if (request.headers.get("origin") !== site())
    throw new HttpError(403, "Invalid request origin.");
}
export function resultError(error: unknown) {
  const status = error instanceof HttpError ? error.status : 500;
  if (status === 500)
    console.error(
      "Portal operation failed",
      error instanceof Error ? error.name : "Unknown",
    );
  return Response.json(
    {
      error:
        error instanceof HttpError
          ? error.message
          : "Unable to complete this request. Please retry.",
    },
    { status },
  );
}
export async function orderFor(
  id: string,
  user: Awaited<ReturnType<typeof session>>,
) {
  if (!/^[0-9a-f-]{36}$/i.test(id))
    throw new HttpError(404, "Order not found.");
  const rows = await db<Order[]>(`orders?id=eq.${id}`);
  const order = rows[0];
  if (!order || (!user.admin && !ownOrder(order, user.email)))
    throw new HttpError(404, "Order not found.");
  return order;
}
export function text(value: unknown, max = 5000, required = false) {
  if (
    typeof value !== "string" ||
    value.length > max ||
    (required && !value.trim())
  )
    throw new HttpError(
      400,
      "Please complete all required fields within the allowed length.",
    );
  return value.trim();
}
export async function audit(
  user: string,
  action: string,
  order_id?: string,
  details?: unknown,
) {
  await db("audit_logs", "POST", { actor_id: user, action, order_id, details });
}
export function encrypt(value: string) {
  const key = Buffer.from(env("TEST_CREDENTIALS_KEY"), "hex");
  if (key.length !== 32)
    throw new HttpError(503, "Credential storage is not configured.");
  const iv = randomBytes(12);
  const cipher = createCipheriv("aes-256-gcm", key, iv);
  const ciphertext = Buffer.concat([
    cipher.update(value, "utf8"),
    cipher.final(),
  ]);
  return [iv, cipher.getAuthTag(), ciphertext]
    .map((x) => x.toString("base64"))
    .join(".");
}
export async function rateLimit(key: string, limit = 5) {
  const ok = await db<boolean>("rpc/take_rate_limit", "POST", {
    p_key: createHash("sha256").update(key).digest("hex"),
    p_limit: limit,
  });
  if (!ok)
    throw new HttpError(
      429,
      "Too many requests. Please try again in a few minutes.",
    );
}
export async function storage(path: string, init?: RequestInit) {
  return fetch(`${env("SUPABASE_URL")}/storage/v1/${path}`, {
    ...init,
    headers: {
      apikey: env("SUPABASE_SERVICE_ROLE_KEY"),
      Authorization: `Bearer ${env("SUPABASE_SERVICE_ROLE_KEY")}`,
      ...init?.headers,
    },
    cache: "no-store",
  });
}
