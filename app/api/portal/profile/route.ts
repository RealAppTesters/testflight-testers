import { session, csrf, db, text, resultError } from "@/lib/portal/server";
export async function POST(request: Request) {
  try {
    csrf(request);
    const user = await session();
    const body = await request.json();
    const profile = {
      id: user.id,
      name: text(body.name, 150, true),
      phone: text(body.phone || "", 50),
    };
    const existing = await db<unknown[]>(`profiles?id=eq.${user.id}`);
    await db(
      existing.length ? `profiles?id=eq.${user.id}` : "profiles",
      existing.length ? "PATCH" : "POST",
      profile,
    );
    return Response.json({ success: true });
  } catch (e) {
    return resultError(e);
  }
}
