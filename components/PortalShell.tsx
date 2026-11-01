import Link from "next/link";
import { Logout } from "./PortalActions";
export default function PortalShell({
  admin = false,
  active = "Dashboard",
  email,
  children,
  demo = false,
}: {
  admin?: boolean;
  active?: string;
  email: string;
  children: React.ReactNode;
  demo?: boolean;
}) {
  const links = admin
    ? [
        ["Overview", ""],
        ["Orders", "orders"],
        ["Clients", "clients"],
        ["Testing Pipeline", "pipeline"],
        ["Reports", "reports"],
        ["Messages", "messages"],
        ["Team", "team"],
        ["Settings", "settings"],
      ]
    : [
        ["Dashboard", ""],
        ["My Orders", "orders"],
        ["Submit App", "submit-app"],
        ["Reports", "reports"],
        ["Messages", "messages"],
        ["Invoices", "invoices"],
        ["Account", "account"],
      ];
  const icons = admin
    ? ["▦", "▤", "♧", "⋮", "▧", "☏", "♧", "⚙"]
    : ["▦", "▤", "＋", "▧", "☏", "▤", "⚙"];
  const base = admin ? "/admin" : "/dashboard";
  return (
    <div className="portal">
      <aside className="p-sidebar">
        <Link href="/" className="p-brand">
          <span className="p-brand-icon">A</span>
          <span>
            TestFlight<b>Testers</b>
          </span>
        </Link>
        <div className="p-workspace">
          {admin ? "TEAM WORKSPACE" : "CLIENT WORKSPACE"}
        </div>
        <nav aria-label={admin ? "Admin navigation" : "Customer navigation"}>
          {links.map(([label, path], i) => (
            <Link
              key={label}
              className={active === label ? "selected" : ""}
              href={
                demo
                  ? `/demo?view=${admin ? "admin" : "client"}&section=${path}`
                  : `${base}${path ? "/" + path : ""}`
              }
            >
              <span>{icons[i]}</span>
              {label}
            </Link>
          ))}
        </nav>
        <div className="p-sidebar-bottom">
          <div className="p-help">
            <span>✧</span>
            <strong>A little help goes a long way.</strong>
            <p>Our team is here for your next launch.</p>
            <a href="mailto:support@testflighttesters.com">
              Contact support ↗
            </a>
          </div>
          <Link href="/how-we-test">↗ How we test</Link>
          {!demo && <Logout />}
          <small>TestFlightTesters © {new Date().getFullYear()}</small>
        </div>
      </aside>
      <div className="p-workarea">
        <header className="p-topbar">
          <span>
            {admin ? "Workspace" : "My workspace"}{" "}
            <span className="p-divider">/</span> <b>{active}</b>
          </span>
          <div>
            <span className="p-live">
              <i />
              {demo ? "Demo workspace" : "Secure workspace"}
            </span>
            <span className="p-avatar">{email[0]?.toUpperCase() || "T"}</span>
          </div>
        </header>
        {demo && (
          <div className="p-demo">
            DESIGN DEMO · All names, orders, revenue and reports below are
            sample data.{" "}
            <Link href={admin ? "/demo?view=client" : "/demo?view=admin"}>
              View {admin ? "client" : "admin"} demo ↗
            </Link>
          </div>
        )}
        <main className="p-main">{children}</main>
        <footer className="p-bottom">
          Built for better launches.
          <span>Private by design. Human testing.</span>
        </footer>
      </div>
    </div>
  );
}
