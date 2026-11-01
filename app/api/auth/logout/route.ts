import { cookies } from "next/headers";
import { auth, csrf, resultError } from "@/lib/portal/server";
export async function POST(request: Request) {
  try {
    csrf(request);
    const jar = await cookies();
    const token = jar.get("tft-session")?.value;
    if (token) await auth("logout", {}, token).catch(() => {});
    jar.delete("tft-session");
    return Response.json({ success: true });
  } catch (e) {
    return resultError(e);
  }
}
