export const statuses = [
  "Awaiting App Details",
  "Ready for Testing",
  "In Progress",
  "QA Report Preparation",
  "QA Review",
  "Completed",
  "Cancelled",
] as const;
export type Status = (typeof statuses)[number];
export type Order = {
  id: string;
  customer_email: string;
  customer_name: string;
  app_name: string | null;
  testers: number;
  hours: number;
  testing_type: string;
  delivery: string;
  amount: number;
  refunded: number;
  currency: string;
  payment_status: string;
  status: Status;
  paypal_order_id: string;
  capture_id: string;
  created_at: string;
  assigned_to?: string;
  internal_notes?: string;
};
export type Report = {
  id: string;
  order_id: string;
  filename: string;
  size: number;
  path: string;
  uploaded_by: string;
  created_at: string;
  approved_at: string | null;
  released_at: string | null;
  downloaded_at: string | null;
};
export function price(input: {
  testers: number;
  hours: number;
  delivery: string;
  type: string;
}) {
  if (
    !Number.isInteger(input.testers) ||
    input.testers < 1 ||
    input.testers > 200 ||
    !Number.isInteger(input.hours) ||
    input.hours < 1 ||
    input.hours > 10 ||
    !["standard", "priority", "express"].includes(input.delivery) ||
    ![
      "functionality",
      "ux",
      "bug",
      "performance",
      "localization",
      "accessibility",
    ].includes(input.type)
  )
    throw new Error("Invalid testing configuration");
  return (
    input.testers *
    (10 * input.hours +
      ({ standard: 0, priority: 2, express: 5 }[input.delivery] || 0))
  );
}
export function canEdit(status: string) {
  return ["Awaiting App Details", "Ready for Testing"].includes(status);
}
export function money(amount: number, currency = "USD") {
  return new Intl.NumberFormat("en-US", { style: "currency", currency }).format(
    amount,
  );
}
export function ownOrder(order: { customer_email: string }, email: string) {
  return order.customer_email.toLowerCase() === email.toLowerCase();
}
