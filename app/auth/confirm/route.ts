import { cookies } from "next/headers";
import { auth, csrf, resultError, site } from "@/lib/portal/server";
export async function POST(request: Request) {
  try {
    csrf(request);
    const form = await request.formData();
    const session = await auth("verify", {
      token_hash: String(form.get("token_hash")),
      type: "email",
    });
    (await cookies()).set("tft-session", session.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: Math.min(session.expires_in, 3600),
    });
    return Response.redirect(`${site()}/dashboard`, 303);
  } catch (e) {
    return resultError(e);
  }
}
// A deliberate button prevents email scanners from consuming a single-use login token.
export async function GET(request: Request) {
  const token = new URL(request.url).searchParams.get("token_hash") || "";
  if (!/^[a-zA-Z0-9_-]{20,256}$/.test(token))
    return Response.redirect(`${site()}/login`);
  return new Response(
    `<!doctype html><html><head><title>Confirm sign in</title><meta name="referrer" content="no-referrer"></head><body style="font-family:system-ui;max-width:440px;margin:15vh auto;padding:30px"><h1>Welcome back.</h1><p>Continue securely to your TestFlightTesters dashboard.</p><form method="post"><input type="hidden" name="token_hash" value="${token}"><button style="padding:16px;background:#6c3ce0;color:white;border:0;border-radius:10px">Confirm sign in</button></form></body></html>`,
    {
      headers: {
        "Content-Type": "text/html",
        "Cache-Control": "no-store",
        "Referrer-Policy": "no-referrer",
        "Content-Security-Policy":
          "default-src 'none'; style-src 'unsafe-inline'; form-action 'self'; frame-ancestors 'none'",
      },
    },
  );
}
