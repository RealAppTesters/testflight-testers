import "server-only";
import { db, session, HttpError } from "./server";
import { redirect } from "next/navigation";
import type { Order, Report } from "./model";
export async function viewer(admin = false) {
  try {
    return await session(admin);
  } catch (e) {
    if (e instanceof HttpError && e.status === 401) redirect("/login");
    throw e;
  }
}
export async function ordersFor(
  user: Awaited<ReturnType<typeof viewer>>,
  admin = false,
) {
  const fields = admin
    ? "*"
    : "id,customer_email,customer_name,app_name,testers,hours,testing_type,delivery,amount,refunded,currency,payment_status,status,paypal_order_id,capture_id,created_at";
  return db<Order[]>(
    `orders?select=${fields}${admin ? "" : `&customer_email=eq.${encodeURIComponent(user.email)}`}&order=created_at.desc`,
  );
}
export async function reportsFor(orders: Order[], admin = false) {
  if (!orders.length) return [];
  return db<Report[]>(
    `qa_reports?order_id=in.(${orders.map((o) => o.id).join(",")})${admin ? "" : "&released_at=not.is.null"}&order=created_at.desc`,
  );
}
