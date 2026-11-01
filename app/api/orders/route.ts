import { csrf, resultError } from "@/lib/portal/server";
import { persistPayment } from "@/lib/portal/paypal";
export async function POST(request: Request) {
  try {
    csrf(request);
    const { paypalOrderId } = await request.json();
    const orderId = await persistPayment(paypalOrderId);
    return Response.json({ success: true, orderId });
  } catch (e) {
    return resultError(e);
  }
}
