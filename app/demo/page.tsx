import PortalShell from "@/components/PortalShell";
import { Overview, Heading, OrderTable } from "@/components/PortalViews";
import type { Order, Report } from "@/lib/portal/model";
import "../portal.css";
export const metadata = {
  title: "Dashboard design demo | TestFlightTesters",
  robots: { index: false, follow: false },
};
const sampleOrders: Order[] = [
  {
    id: "DEMO-1054",
    customer_email: "alex@example.com",
    customer_name: "Alex Morgan",
    app_name: "FitTracker iOS",
    testers: 12,
    hours: 2,
    testing_type: "Functionality",
    delivery: "standard",
    amount: 240,
    refunded: 0,
    currency: "USD",
    payment_status: "paid",
    status: "In Progress",
    paypal_order_id: "DEMO-NOT-A-PAYMENT",
    capture_id: "DEMO-NOT-A-CAPTURE",
    created_at: "2026-10-28T10:00:00Z",
  },
  {
    id: "DEMO-1048",
    customer_email: "alex@example.com",
    customer_name: "Alex Morgan",
    app_name: "BudgetMate",
    testers: 8,
    hours: 1,
    testing_type: "User experience",
    delivery: "standard",
    amount: 80,
    refunded: 0,
    currency: "USD",
    payment_status: "paid",
    status: "Completed",
    paypal_order_id: "DEMO-NOT-A-PAYMENT",
    capture_id: "DEMO-NOT-A-CAPTURE",
    created_at: "2026-10-24T10:00:00Z",
  },
  {
    id: "DEMO-1056",
    customer_email: "sam@example.com",
    customer_name: "Sam Rivera",
    app_name: "TravelPlan",
    testers: 20,
    hours: 1,
    testing_type: "Functionality",
    delivery: "priority",
    amount: 240,
    refunded: 0,
    currency: "USD",
    payment_status: "paid",
    status: "Awaiting App Details",
    paypal_order_id: "DEMO-NOT-A-PAYMENT",
    capture_id: "DEMO-NOT-A-CAPTURE",
    created_at: "2026-10-29T10:00:00Z",
  },
];
const sampleReports: Report[] = [
  {
    id: "DEMO-REPORT",
    order_id: "DEMO-1048",
    filename: "BudgetMate_Illustrative_QA_Report.pdf",
    size: 4200000,
    path: "",
    uploaded_by: "DEMO",
    created_at: "2026-10-31T10:14:00Z",
    approved_at: "2026-10-31T10:16:00Z",
    released_at: "2026-10-31T10:16:00Z",
    downloaded_at: null,
  },
];
export default async function Demo({
  searchParams,
}: {
  searchParams: Promise<{ view?: string; section?: string }>;
}) {
  const { view, section } = await searchParams;
  const admin = view === "admin";
  const orders = admin ? sampleOrders : sampleOrders.slice(0, 2);
  return (
    <PortalShell
      admin={admin}
      active={
        section === "orders"
          ? admin
            ? "Orders"
            : "My Orders"
          : admin
            ? "Overview"
            : "Dashboard"
      }
      email="alex@example.com"
      demo
    >
      {section ? (
        <>
          <Heading
            title="Sample workspace"
            description="This is an isolated visual demo. Order management and report delivery require authenticated access."
          />
          <div className="p-card">
            <OrderTable orders={orders} admin={admin} demo />
          </div>
        </>
      ) : (
        <Overview
          orders={orders}
          reports={sampleReports}
          admin={admin}
          demo
          name="Alex"
        />
      )}
      <p id="demo-notice" className="p-muted">
        Illustrative records only. No real customer, payment or PDF is
        accessible from this demo.
      </p>
    </PortalShell>
  );
}
