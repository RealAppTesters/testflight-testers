import Link from "next/link";
import { notFound } from "next/navigation";
import PortalShell from "./PortalShell";
import { Heading, Overview, OrderTable, Pipeline, Badge } from "./PortalViews";
import {
  PortalForm,
  TestingForm,
  ReportActions,
  UploadReport,
  CredentialAccess,
  MarkMessagesRead,
} from "./PortalActions";
import { viewer, ordersFor, reportsFor } from "@/lib/portal/data";
import { db, orderFor } from "@/lib/portal/server";
import { canEdit, money, type Order } from "@/lib/portal/model";
type Props = {
  admin?: boolean;
  params: Promise<{ section?: string[] }>;
  searchParams: Promise<Record<string, string | undefined>>;
};
export async function PortalPage({
  admin = false,
  params,
  searchParams,
}: Props) {
  const user = await viewer(admin);
  const path = (await params).section || [];
  const query = await searchParams;
  const section = path[0] || "";
  const sections = admin
    ? {
        "": "Overview",
        orders: "Orders",
        clients: "Clients",
        pipeline: "Testing Pipeline",
        reports: "Reports",
        messages: "Messages",
        team: "Team",
        settings: "Settings",
      }
    : {
        "": "Dashboard",
        orders: "My Orders",
        "submit-app": "Submit App",
        reports: "Reports",
        messages: "Messages",
        invoices: "Invoices",
        account: "Account",
      };
  if (
    !(section in sections) ||
    path.length > 2 ||
    (path.length === 2 && section !== "orders")
  )
    notFound();
  const active = sections[section as keyof typeof sections] as string;
  const orders = await ordersFor(user, admin);
  const reports = await reportsFor(orders, admin);
  let content: React.ReactNode;
  if (path.length === 2) {
    const order = await orderFor(path[1], user);
    content = await OrderDetail({
      order,
      user,
      admin,
      tab: query.tab || "details",
    });
  } else if (!section) {
    let filtered = orders;
    if (admin && query.from)
      filtered = filtered.filter(
        (o) => o.created_at.slice(0, 10) >= query.from!,
      );
    if (admin && query.to)
      filtered = filtered.filter((o) => o.created_at.slice(0, 10) <= query.to!);
    content = (
      <>
        {admin && (
          <form className="p-filters">
            <label>
              From
              <input
                aria-label="From date"
                type="date"
                name="from"
                defaultValue={query.from}
              />
            </label>
            <label>
              To
              <input
                aria-label="To date"
                type="date"
                name="to"
                defaultValue={query.to}
              />
            </label>
            <button className="p-secondary">Apply date range</button>
            {[1, 7, 30].map((days) => (
              <Link
                key={days}
                className="p-text-link"
                href={`/admin?from=${new Date(Date.now() - (days - 1) * 86400000).toISOString().slice(0, 10)}&to=${new Date().toISOString().slice(0, 10)}`}
              >
                {days === 1 ? "Today" : `Last ${days} days`}
              </Link>
            ))}
          </form>
        )}
        <Overview
          orders={filtered}
          reports={reports.filter((r) =>
            filtered.some((o) => o.id === r.order_id),
          )}
          admin={admin}
          name={user.email.split("@")[0]}
        />
      </>
    );
  } else if (section === "orders") {
    let filtered = orders
      .filter(
        (o) =>
          !query.q ||
          [o.id, o.app_name, o.customer_name, o.customer_email].some((v) =>
            v?.toLowerCase().includes(query.q!.toLowerCase()),
          ),
      )
      .filter((o) => !query.status || o.status === query.status);
    if (query.sort === "amount")
      filtered = filtered.toSorted((a, b) => b.amount - a.amount);
    if (query.sort === "oldest") filtered = filtered.toReversed();
    content = (
      <>
        <Heading
          title={active}
          description="Every testing order, from first brief to final report."
          action={
            <Link className="p-button" href="/pricing">
              + New testing order
            </Link>
          }
        />
        <form className="p-filters">
          <input
            aria-label="Search orders"
            name="q"
            defaultValue={query.q}
            placeholder="Search app, order or client…"
          />
          <select
            name="status"
            aria-label="Filter status"
            defaultValue={query.status}
          >
            <option value="">All statuses</option>
            {[
              "Awaiting App Details",
              "Ready for Testing",
              "In Progress",
              "QA Report Preparation",
              "QA Review",
              "Completed",
              "Cancelled",
            ].map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
          <select
            name="sort"
            defaultValue={query.sort}
            aria-label="Sort orders"
          >
            <option value="">Newest first</option>
            <option value="oldest">Oldest first</option>
            <option value="amount">Highest amount</option>
          </select>
          <button className="p-secondary">Apply filters</button>
        </form>
        <div className="p-card">
          <OrderTable orders={filtered} admin={admin} />
        </div>
      </>
    );
  } else if (section === "pipeline") {
    content = (
      <>
        <Heading
          title="Testing pipeline"
          description="Real progress, updated by your team. Open an order to change its status or assignment."
        />
        <Pipeline orders={orders} />
      </>
    );
  } else if (section === "reports") {
    content = (
      <>
        <Heading
          title="QA reports"
          description={
            admin
              ? "Upload privately. Review carefully. Deliver with confidence."
              : "Clear feedback for a more confident next release."
          }
        />
        <div className="p-card">
          {reports.map((r) => {
            const o = orders.find((o) => o.id === r.order_id)!;
            return (
              <div className="p-report-section" key={r.id}>
                <Link
                  href={`${admin ? "/admin" : "/dashboard"}/orders/${o.id}?tab=reports`}
                >
                  <h3>
                    {o.app_name || "Testing order"} · #{o.id.slice(0, 8)}
                  </h3>
                </Link>
                <ReportActions report={r} order={o} admin={admin} />
              </div>
            );
          })}
          {!reports.length && (
            <div className="p-empty">
              <h2>No reports yet</h2>
              <p>
                {admin
                  ? "Open a paid order to upload its QA report."
                  : "Your reports will appear here when your team releases them."}
              </p>
              <Link
                href={admin ? "/admin/orders" : "/dashboard/orders"}
                className="p-secondary"
              >
                View orders →
              </Link>
            </div>
          )}
        </div>
      </>
    );
  } else if (section === "submit-app") {
    content = (
      <>
        <Heading
          title="Tell us about your app."
          description="Choose a paid order to submit your TestFlight link and testing goals."
        />
        <div className="p-card">
          <OrderTable orders={orders.filter((o) => canEdit(o.status))} />
        </div>
      </>
    );
  } else if (section === "invoices") {
    content = (
      <>
        <Heading
          title="Payments & receipts"
          description="Your actual PayPal payment records. These are payment references, not tax invoices."
        />
        <div className="p-card">
          {orders.map((o) => (
            <div key={o.id} className="p-report">
              <div>
                <strong>{money(o.amount, o.currency)}</strong>
                <small>
                  {new Date(o.created_at).toLocaleString("en-US")} ·{" "}
                  {o.payment_status}
                </small>
                <small>
                  PayPal order: {o.paypal_order_id} · Capture: {o.capture_id}
                </small>
                {o.refunded > 0 && (
                  <p>Refunded: {money(o.refunded, o.currency)}</p>
                )}
              </div>
              <Link className="p-secondary" href={`/dashboard/orders/${o.id}`}>
                View order →
              </Link>
            </div>
          ))}
          {!orders.length && <p>No payment history yet.</p>}
          <p className="p-muted">
            Your PayPal transaction receipt is available in your PayPal account
            or payment confirmation email.
          </p>
        </div>
      </>
    );
  } else if (section === "account" || section === "settings") {
    const [profile] = await db<{ name: string; phone: string }[]>(
      `profiles?id=eq.${user.id}`,
    );
    content = (
      <>
        <Heading
          title="Account settings"
          description="Keep your contact details up to date."
        />
        <div className="p-card">
          <PortalForm endpoint="/api/portal/profile">
            <label>
              Name
              <input
                name="name"
                defaultValue={profile?.name || ""}
                maxLength={150}
                required
              />
            </label>
            <label>
              Phone / WhatsApp
              <input
                name="phone"
                defaultValue={profile?.phone || ""}
                maxLength={50}
              />
            </label>
            <label>
              Verified sign-in email
              <input value={user.email} readOnly />
            </label>
          </PortalForm>
          <p className="p-muted">
            To change your sign-in email or order ownership, contact support for
            identity verification. Sessions expire after one hour; request a
            fresh link to continue.
          </p>
        </div>
      </>
    );
  } else if (section === "clients") {
    const clients = [...new Set(orders.map((o) => o.customer_email))];
    content = (
      <>
        <Heading
          title="Clients"
          description="Customer relationships backed by verified orders."
        />
        <div className="p-card p-client-grid">
          {clients.map((email) => {
            const own = orders.filter((o) => o.customer_email === email);
            return (
              <div className="p-card" key={email}>
                <span className="p-avatar">{email[0].toUpperCase()}</span>
                <h3>{own[0].customer_name || "Customer"}</h3>
                <p>{email}</p>
                <p>
                  {own.length} orders ·{" "}
                  {money(own.reduce((n, o) => n + o.amount - o.refunded, 0))}
                </p>
                <Link
                  className="p-text-link"
                  href={`/admin/orders?q=${encodeURIComponent(email)}`}
                >
                  View client orders →
                </Link>
              </div>
            );
          })}
          {!clients.length && <p>No clients yet.</p>}
        </div>
      </>
    );
  } else if (section === "team") {
    const team = await db<{ user_id: string }[]>("admin_roles?select=user_id");
    content = (
      <>
        <Heading
          title="Your team"
          description="Authorized administrators. Role changes require a trusted database operator."
        />
        <div className="p-card">
          {team.map((t) => (
            <div className="p-report" key={t.user_id}>
              <strong>{t.user_id}</strong>
              <Badge status="Administrator" />
            </div>
          ))}
          <p className="p-muted">
            Access is managed in the database, never through a public signup
            form.
          </p>
        </div>
      </>
    );
  } else {
    const unread = orders.length
      ? await db<{ order_id: string }[]>(
          `messages?order_id=in.(${orders.map((o) => o.id).join(",")})&admin=eq.${!user.admin}&read_at=is.null&select=order_id`,
        )
      : [];
    content = (
      <>
        <Heading
          title="Messages"
          description={`${unread.length} unread messages. Every conversation stays connected to its testing order.`}
        />
        <div className="p-card">
          {orders.map((o) => (
            <Link
              key={o.id}
              className="p-report"
              href={`${admin ? "/admin" : "/dashboard"}/orders/${o.id}?tab=messages`}
            >
              <div>
                <strong>{o.app_name || "App details pending"}</strong>
                <small>
                  #{o.id.slice(0, 8)} · {o.customer_email}
                </small>
              </div>
              <span className="p-badge purple">
                {unread.filter((m) => m.order_id === o.id).length} unread →
              </span>
            </Link>
          ))}
          {!orders.length && <p>No order conversations yet.</p>}
        </div>
      </>
    );
  }
  return (
    <PortalShell admin={admin} active={active} email={user.email}>
      {content}
    </PortalShell>
  );
}
async function OrderDetail({
  order: o,
  user,
  admin,
  tab,
}: {
  order: Order;
  user: Awaited<ReturnType<typeof viewer>>;
  admin: boolean;
  tab: string;
}) {
  const base = admin ? "/admin" : "/dashboard";
  const tabs = admin
    ? ["details", "testing", "reports", "notes", "messages", "activity"]
    : ["details", "testing", "reports", "messages"];
  const [submission] = await db<
    { details: Record<string, string>; encrypted_credentials?: string }[]
  >(`app_submissions?order_id=eq.${o.id}&select=details`);
  const reports = await reportsFor([o], admin);
  const history = await db<
    { id: string; status: string; created_at: string }[]
  >(`testing_status_history?order_id=eq.${o.id}&order=created_at.asc`);
  const messages = await db<
    {
      id: string;
      sender_email: string;
      body: string;
      created_at: string;
      admin: boolean;
      read_at: string | null;
    }[]
  >(`messages?order_id=eq.${o.id}&order=created_at.asc`);
  return (
    <>
      <Link className="p-text-link" href={`${base}/orders`}>
        ← All orders
      </Link>
      <div className="p-heading">
        <div>
          <p className="p-eyebrow">ORDER #{o.id.slice(0, 8).toUpperCase()}</p>
          <h1>{o.app_name || "Your next great app"}</h1>
          <p>
            {o.testers} testers · {o.hours} hours per tester · {o.testing_type}{" "}
            · {o.delivery}
          </p>
        </div>
        <Badge status={o.status} />
      </div>
      <nav className="p-tabs" aria-label="Order sections">
        {tabs.map((t) => (
          <Link
            key={t}
            className={tab === t ? "selected" : ""}
            href={`${base}/orders/${o.id}?tab=${t}`}
          >
            {t[0].toUpperCase() + t.slice(1)}
          </Link>
        ))}
      </nav>
      <div className="p-detail-grid">
        <section className="p-card">
          {tab === "reports" ? (
            <>
              <h2>QA reports</h2>
              <p className="p-muted">
                {admin
                  ? "Upload, preview and explicitly approve delivery."
                  : "Your reviewed reports, available privately."}
              </p>
              {admin && <UploadReport id={o.id} />}{" "}
              {reports.map((r) => (
                <div key={r.id} className="p-report-section">
                  <ReportActions report={r} order={o} admin={admin} />
                  <p className="p-muted">
                    Uploaded {new Date(r.created_at).toLocaleString("en-US")}
                    {r.approved_at &&
                      ` · Approved ${new Date(r.approved_at).toLocaleString("en-US")}`}
                    {r.released_at &&
                      ` · Released ${new Date(r.released_at).toLocaleString("en-US")}`}
                    {r.downloaded_at &&
                      ` · Download link requested ${new Date(r.downloaded_at).toLocaleString("en-US")}`}
                  </p>
                </div>
              ))}
              {!reports.length && !admin && (
                <div className="p-empty">
                  Your report will appear once it has been reviewed and
                  released.
                </div>
              )}
              {admin &&
                (await DeliveryHistory({ ids: reports.map((r) => r.id) }))}
            </>
          ) : tab === "testing" || tab === "notes" ? (
            <>
              <h2>{admin ? "Manage testing" : "Testing progress"}</h2>
              {admin ? (
                <TestingForm
                  order={o}
                  team={await db<{ user_id: string }[]>(
                    "admin_roles?select=user_id",
                  )}
                />
              ) : (
                <Timeline history={history} />
              )}
            </>
          ) : tab === "messages" ? (
            <>
              <h2>Order messages</h2>
              <MarkMessagesRead id={o.id} />
              <div className="p-messages">
                {messages.map((m) => (
                  <article key={m.id} className={m.admin ? "from-team" : ""}>
                    <strong>
                      {m.admin ? "TestFlightTesters team" : m.sender_email}
                    </strong>
                    <small>
                      {new Date(m.created_at).toLocaleString("en-US")}
                      {!m.read_at && m.admin !== user.admin ? " · New" : ""}
                    </small>
                    <p>{m.body}</p>
                  </article>
                ))}
                {!messages.length && (
                  <p>No messages yet. Start the conversation below.</p>
                )}
              </div>
              <PortalForm
                endpoint={`/api/portal/orders/${o.id}`}
                action="message"
                submit="Send message →"
              >
                <label>
                  Your message
                  <textarea name="message" required maxLength={5000} />
                </label>
              </PortalForm>
            </>
          ) : tab === "activity" ? (
            <>
              <h2>Activity history</h2>
              <Timeline history={history} />
              {admin && (
                <div>
                  {(
                    await db<
                      { id: string; action: string; created_at: string }[]
                    >(`audit_logs?order_id=eq.${o.id}&order=created_at.desc`)
                  ).map((a) => (
                    <p key={a.id}>
                      {a.action}
                      <small>
                        {new Date(a.created_at).toLocaleString("en-US")}
                      </small>
                    </p>
                  ))}
                </div>
              )}
            </>
          ) : (
            <>
              <h2>App & testing brief</h2>
              {!admin && canEdit(o.status) ? (
                <PortalForm
                  endpoint={`/api/portal/orders/${o.id}`}
                  action="submission"
                  submit="Save app details →"
                >
                  {[
                    ["app_name", "App name", true],
                    [
                      "testflight_link",
                      "TestFlight public invitation link",
                      true,
                    ],
                    ["description", "App description", true],
                    ["objectives", "Main testing objectives", true],
                    ["features", "Features to focus on", false],
                    ["devices", "Preferred iPhone / iPad devices", false],
                    ["ios_versions", "Preferred iOS versions", false],
                    ["audience", "Target audience / countries", false],
                    ["notes", "Additional testing notes", false],
                  ].map(([key, label, required]) => (
                    <label key={String(key)}>
                      {label}
                      {required ? " *" : ""}
                      {["app_name", "testflight_link"].includes(String(key)) ? (
                        <input
                          name={String(key)}
                          defaultValue={submission?.details[String(key)] || ""}
                          required={!!required}
                          type={key === "testflight_link" ? "url" : "text"}
                          maxLength={key === "app_name" ? 150 : 5000}
                        />
                      ) : (
                        <textarea
                          name={String(key)}
                          defaultValue={submission?.details[String(key)] || ""}
                          required={!!required}
                          maxLength={5000}
                        />
                      )}
                    </label>
                  ))}
                  <label>
                    Dedicated test credentials or account creation instructions
                    <textarea
                      name="credentials"
                      autoComplete="off"
                      placeholder="Use a dedicated test account. Leave blank to keep saved credentials."
                      maxLength={5000}
                    />
                  </label>
                  <small>
                    Credentials are encrypted at rest. Avoid sharing personal
                    accounts.
                  </small>
                </PortalForm>
              ) : submission ? (
                <dl className="p-definition">
                  {Object.entries(submission.details).map(([k, v]) => (
                    <div key={k}>
                      <dt>{k.replaceAll("_", " ")}</dt>
                      <dd>{v || "Not specified"}</dd>
                    </div>
                  ))}
                  {admin && <CredentialAccess id={o.id} />}
                </dl>
              ) : (
                <div className="p-empty">
                  <h3>Awaiting app details</h3>
                  <p>
                    The customer can add their TestFlight link and testing
                    instructions here.
                  </p>
                </div>
              )}
            </>
          )}
        </section>
        <aside>
          <section className="p-card">
            <h2>Order summary</h2>
            <dl className="p-definition">
              {[
                ["Order ID", o.id],
                ["Customer", o.customer_name || o.customer_email],
                ["Email", o.customer_email],
                ["Purchased", new Date(o.created_at).toLocaleString("en-US")],
                ["Testers", String(o.testers)],
                ["Hours / tester", String(o.hours)],
                ["Delivery", o.delivery],
                ["Amount paid", money(o.amount, o.currency)],
                ["Refunds", money(o.refunded, o.currency)],
                ["Payment", o.payment_status],
                ["PayPal capture", o.capture_id],
              ].map(([k, v]) => (
                <div key={k}>
                  <dt>{k}</dt>
                  <dd>{v}</dd>
                </div>
              ))}
            </dl>
          </section>
          <section className="p-card">
            <h2>Testing journey</h2>
            <Timeline history={history} />
          </section>
        </aside>
      </div>
    </>
  );
}
function Timeline({
  history,
}: {
  history: { id: string; status: string; created_at: string }[];
}) {
  return (
    <ol className="p-timeline">
      {history.map((h) => (
        <li key={h.id}>
          <span>✓</span>
          <div>
            <strong>{h.status}</strong>
            <small>{new Date(h.created_at).toLocaleString("en-US")}</small>
          </div>
        </li>
      ))}
    </ol>
  );
}
async function DeliveryHistory({ ids }: { ids: string[] }) {
  if (!ids.length) return null;
  const records = await db<
    { id: string; status: string; created_at: string; attempt: number }[]
  >(`report_deliveries?report_id=in.(${ids.join(",")})&order=created_at.desc`);
  return (
    <>
      <h3>Delivery timeline</h3>
      {records.map((r) => (
        <p key={r.id}>
          Attempt {r.attempt} · {r.status}
          <small>{new Date(r.created_at).toLocaleString("en-US")}</small>
        </p>
      ))}
      <small>
        “Email accepted” means the provider accepted the send request; it does
        not confirm inbox delivery.
      </small>
    </>
  );
}
