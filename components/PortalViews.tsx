import Link from "next/link";
import type { Order, Report } from "@/lib/portal/model";
import { money, statuses } from "@/lib/portal/model";
export function Badge({ status }: { status: string }) {
  const color =
    status === "Completed" || status === "paid"
      ? "green"
      : status.includes("Progress")
        ? "blue"
        : status.includes("QA")
          ? "purple"
          : status === "Cancelled" || status === "refunded"
            ? "gray"
            : "amber";
  return (
    <span className={`p-badge ${color}`}>
      <i />
      {status}
    </span>
  );
}
export function Heading({
  title,
  description,
  action,
}: {
  title: string;
  description: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="p-heading">
      <div>
        <div className="p-eyebrow">YOUR NEXT GREAT LAUNCH STARTS HERE</div>
        <h1>{title}</h1>
        <p>{description}</p>
      </div>
      {action}
    </div>
  );
}
export function OrderTable({
  orders,
  admin = false,
  demo = false,
}: {
  orders: Order[];
  admin?: boolean;
  demo?: boolean;
}) {
  return (
    <div className="p-table-scroll">
      <table className="p-table">
        <thead>
          <tr>
            <th>Order / App</th>
            {admin && <th>Client</th>}
            <th>Testing scope</th>
            <th>Purchased</th>
            <th>Amount</th>
            <th>Status</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {orders.map((o, i) => (
            <tr key={o.id}>
              <td>
                <div className="p-app-cell">
                  <span className={`p-app-icon icon-${i % 4}`}>
                    {(o.app_name || "A")[0]}
                  </span>
                  <div>
                    <strong>{o.app_name || "App details pending"}</strong>
                    <small>#{o.id.slice(0, 8).toUpperCase()}</small>
                  </div>
                </div>
              </td>
              {admin && (
                <td>
                  <strong>{o.customer_name || "Customer"}</strong>
                  <small>{o.customer_email}</small>
                </td>
              )}
              <td>
                {o.testers} testers · {o.hours}h
                <small>
                  {o.testing_type} · {o.delivery}
                </small>
              </td>
              <td>
                {new Date(o.created_at).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </td>
              <td>
                <strong>{money(o.amount, o.currency)}</strong>
                <small>{o.payment_status}</small>
              </td>
              <td>
                <Badge status={o.status} />
              </td>
              <td>
                <Link
                  className="p-text-link"
                  href={
                    demo
                      ? "#demo-notice"
                      : `${admin ? "/admin" : "/dashboard"}/orders/${o.id}`
                  }
                >
                  View ↗
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {!orders.length && (
        <div className="p-empty">
          <span>▤</span>
          <h3>No orders yet</h3>
          <p>Your verified testing orders will appear here.</p>
          <Link className="p-secondary" href="/pricing">
            Explore testing options ↗
          </Link>
        </div>
      )}
    </div>
  );
}
export function Overview({
  orders,
  reports,
  admin = false,
  demo = false,
  name = "there",
}: {
  orders: Order[];
  reports: Report[];
  admin?: boolean;
  demo?: boolean;
  name?: string;
}) {
  const cards = admin
    ? [
        {
          label: "Verified revenue",
          value: money(
            orders.reduce((sum, o) => sum + o.amount - o.refunded, 0),
          ),
          icon: "＄",
          tone: "purple",
          note: "After recorded refunds",
        },
        {
          label: "Paid orders",
          value: orders.filter((o) => o.payment_status === "paid").length,
          icon: "▤",
          tone: "blue",
          note: "Verified PayPal payments",
        },
        {
          label: "Testing in progress",
          value: orders.filter((o) => o.status === "In Progress").length,
          icon: "◷",
          tone: "amber",
          note: "Currently with the team",
        },
        {
          label: "Completed orders",
          value: orders.filter((o) => o.status === "Completed").length,
          icon: "✓",
          tone: "green",
          note: "Ready for the next release",
        },
      ]
    : [
        {
          label: "Total orders",
          value: orders.length,
          icon: "▤",
          tone: "purple",
          note: "Your testing journey so far",
        },
        {
          label: "Active testing",
          value: orders.filter((o) =>
            ["In Progress", "QA Report Preparation", "QA Review"].includes(
              o.status,
            ),
          ).length,
          icon: "◷",
          tone: "blue",
          note: "In good hands",
        },
        {
          label: "Completed",
          value: orders.filter((o) => o.status === "Completed").length,
          icon: "✓",
          tone: "green",
          note: "One step closer to launch",
        },
        {
          label: "Reports available",
          value: reports.filter((r) => r.released_at).length,
          icon: "▧",
          tone: "purple",
          note: "Feedback you can act on",
        },
      ];
  return (
    <>
      <Heading
        title={
          admin
            ? "Your testing operation, at a glance."
            : `Welcome back, ${name} 👋`
        }
        description={
          admin
            ? "A clear view of your orders, testing pipeline and client deliveries."
            : "Manage your testing orders, share app details and get ready for a better launch."
        }
        action={
          <Link
            className="p-button"
            href={admin ? "/admin/orders" : "/pricing"}
          >
            {admin ? "Manage orders ↗" : "+ New testing order"}
          </Link>
        }
      />
      <div className="p-stats">
        {cards.map((c) => (
          <div className="p-stat" key={c.label}>
            <div>
              <span className={`p-stat-icon ${c.tone}`}>{c.icon}</span>
              <span className="p-stat-dot">•••</span>
            </div>
            <strong>{c.value}</strong>
            <h3>{c.label}</h3>
            <small>{c.note}</small>
          </div>
        ))}
      </div>
      <div className="p-overview-grid">
        <section className="p-card p-orders-card">
          <div className="p-card-heading">
            <div>
              <h2>{admin ? "Recent orders" : "My orders"}</h2>
              <p>
                {admin
                  ? "Every order. Every step forward."
                  : "A little testing today. A more confident launch tomorrow."}
              </p>
            </div>
            <Link
              className="p-text-link"
              href={
                demo
                  ? "#demo-notice"
                  : `${admin ? "/admin" : "/dashboard"}/orders`
              }
            >
              View all orders →
            </Link>
          </div>
          <OrderTable orders={orders.slice(0, 5)} admin={admin} demo={demo} />
        </section>
        <aside className="p-card">
          <span className="p-section-icon">✧</span>
          <h2>{admin ? "Quick actions" : "Your next steps"}</h2>
          <p className="p-muted">
            {admin
              ? "Keep good work moving."
              : "Everything your testing team needs to get started."}
          </p>
          {admin ? (
            <div className="p-quick-actions">
              <Link href="/admin/reports">
                ↑ Upload a QA report <span>↗</span>
              </Link>
              <Link href="/admin/pipeline">
                ▦ Open testing pipeline <span>↗</span>
              </Link>
              <Link href="/admin/messages">
                ☏ Check messages <span>↗</span>
              </Link>
            </div>
          ) : (
            <ol className="p-steps">
              <li>
                <b>1</b>
                <div>
                  <strong>Share your app</strong>
                  <p>Submit your TestFlight invitation and testing goals.</p>
                </div>
              </li>
              <li>
                <b>2</b>
                <div>
                  <strong>We take it from here</strong>
                  <p>Follow real status updates from our QA team.</p>
                </div>
              </li>
              <li>
                <b>3</b>
                <div>
                  <strong>Make your next release better</strong>
                  <p>Download your reviewed QA report.</p>
                </div>
              </li>
            </ol>
          )}
          <div className="p-mini-callout">
            {admin
              ? `${orders.filter((o) => o.status === "Awaiting App Details").length} awaiting details · ${orders.filter((o) => o.status === "QA Review").length} in QA review`
              : "Thoughtful feedback. Real devices. Better apps."}
          </div>
        </aside>
      </div>
      <div className="p-launch-banner">
        <div className="p-banner-icon">✦</div>
        <div>
          <h3>
            {admin
              ? "A thoughtful process. A stronger product."
              : "Great apps are built with great feedback."}
          </h3>
          <p>
            {admin
              ? `${reports.filter((r) => r.released_at).length} reports released to clients. Status updates are controlled by your team.`
              : "See how real-device testing turns the details into a better experience."}
          </p>
        </div>
        <Link href="/how-we-test">Explore our process →</Link>
      </div>
    </>
  );
}
export function Pipeline({ orders }: { orders: Order[] }) {
  return (
    <div className="p-kanban">
      {statuses.map((s) => (
        <section key={s}>
          <h3>
            <Badge status={s} />{" "}
            <small>{orders.filter((o) => o.status === s).length}</small>
          </h3>
          {orders
            .filter((o) => o.status === s)
            .map((o) => (
              <Link
                className="p-card"
                href={`/admin/orders/${o.id}?tab=testing`}
                key={o.id}
              >
                <small>#{o.id.slice(0, 8)}</small>
                <h3>{o.app_name || "App details pending"}</h3>
                <p>{o.customer_name || o.customer_email}</p>
                <small>
                  {o.testers} testers · {o.hours}h
                </small>
                <p className="p-text-link">Manage testing →</p>
              </Link>
            ))}
        </section>
      ))}
    </div>
  );
}
