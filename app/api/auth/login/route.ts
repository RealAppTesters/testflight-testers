import {
  auth,
  csrf,
  rateLimit,
  resultError,
  site,
  text,
  HttpError,
} from "@/lib/portal/server";
export async function POST(request: Request) {
  try {
    csrf(request);
    const body = await request.json();
    const email = text(body.email, 254, true).toLowerCase();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      throw new HttpError(400, "Enter a valid email address.");
    await rateLimit(`login:${email}`);
    await auth(
      `otp?redirect_to=${encodeURIComponent(`${site()}/auth/confirm`)}`,
      { email, create_user: true },
    );
    return Response.json({
      message: "Check your inbox for a secure sign-in link.",
    });
  } catch (e) {
    return resultError(e);
  }
}
