"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import type { Order, Report } from "@/lib/portal/model";
import { statuses } from "@/lib/portal/model";
export function PortalForm({
  endpoint,
  action,
  children,
  submit = "Save changes",
}: {
  endpoint: string;
  action?: string;
  children: React.ReactNode;
  submit?: string;
}) {
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);
  const router = useRouter();
  return (
    <form
      className="portal-form"
      onSubmit={async (e) => {
        e.preventDefault();
        setBusy(true);
        setMessage("");
        const form = e.currentTarget;
        try {
          const data = Object.fromEntries(new FormData(form));
          const response = await fetch(endpoint, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ ...data, action }),
          });
          const result = await response.json();
          if (!response.ok) throw new Error(result.error);
          setMessage(result.message || "Saved successfully.");
          router.refresh();
        } catch (e) {
          setMessage(e instanceof Error ? e.message : "Unable to save.");
        } finally {
          setBusy(false);
        }
      }}
    >
      {children}
      <div>
        <button className="p-button" disabled={busy}>
          {busy ? "Please wait…" : submit}
        </button>
      </div>
      <p role="status">{message}</p>
    </form>
  );
}
export function Logout() {
  return (
    <button
      className="p-logout"
      onClick={async () => {
        const res = await fetch("/api/auth/logout", { method: "POST" });
        if (res.ok) location.href = "/login";
      }}
    >
      ↪ Sign out
    </button>
  );
}
export function TestingForm({
  order,
  team,
}: {
  order: Order;
  team: { user_id: string }[];
}) {
  return (
    <PortalForm endpoint={`/api/portal/orders/${order.id}`} action="testing">
      <label>
        Testing status
        <select name="status" defaultValue={order.status}>
          {statuses.map((s) => (
            <option key={s}>{s}</option>
          ))}
        </select>
      </label>
      <label>
        Assigned team member
        <select name="assigned_to" defaultValue={order.assigned_to || ""}>
          <option value="">Unassigned</option>
          {team.map((t) => (
            <option key={t.user_id}>{t.user_id}</option>
          ))}
        </select>
      </label>
      <label>
        Internal notes
        <textarea
          name="notes"
          defaultValue={order.internal_notes}
          maxLength={20000}
        />
      </label>
    </PortalForm>
  );
}
export function ReportActions({
  report,
  order,
  admin = false,
}: {
  report: Report;
  order: Order;
  admin?: boolean;
}) {
  const [confirm, setConfirm] = useState(false);
  const [url, setUrl] = useState("");
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);
  const router = useRouter();
  async function open() {
    try {
      const response = await fetch(`/api/portal/reports/${report.id}`);
      const data = await response.json();
      if (!response.ok) throw new Error(data.error);
      setUrl(data.url);
    } catch (e) {
      setMessage((e as Error).message);
    }
  }
  return (
    <div>
      <div className="p-report">
        <span className="p-file">PDF</span>
        <div>
          <strong>{report.filename}</strong>
          <small>
            {(report.size / 1024 / 1024).toFixed(2)} MB · Uploaded{" "}
            {new Date(report.created_at).toLocaleDateString("en-US")}
          </small>
        </div>
        <button className="p-secondary" onClick={open}>
          {admin ? "Preview" : "View & download"} ↗
        </button>
      </div>
      {url && (
        <div>
          <iframe title={report.filename} src={url} className="p-pdf" />
          <a
            href={url}
            target="_blank"
            rel="noreferrer"
            className="p-secondary"
          >
            Open PDF in new tab ↗
          </a>
          <small>
            Private link expires in 60 seconds. Open again for a fresh link.
          </small>
        </div>
      )}
      {admin && (
        <button className="p-button" onClick={() => setConfirm(true)}>
          {report.released_at
            ? "Resend report to client"
            : "Send report to client"}{" "}
          ↗
        </button>
      )}
      {confirm && (
        <div
          className="p-modal"
          role="dialog"
          aria-modal="true"
          aria-labelledby={`confirm-${report.id}`}
        >
          <div className="p-card">
            <h2 id={`confirm-${report.id}`}>Confirm report delivery</h2>
            <p>Order {order.id}</p>
            <p>
              To: <strong>{order.customer_email}</strong>
            </p>
            <p>
              PDF: <strong>{report.filename}</strong>
            </p>
            <p>
              This makes the report available to this customer and queues an
              email.
            </p>
            <button
              disabled={busy}
              className="p-button"
              onClick={async () => {
                setBusy(true);
                try {
                  const res = await fetch(`/api/portal/reports/${report.id}`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                      confirm: true,
                      email: order.customer_email,
                      filename: report.filename,
                      resend: !!report.released_at,
                    }),
                  });
                  const data = await res.json();
                  if (!res.ok) throw new Error(data.error);
                  setMessage(data.message);
                  setConfirm(false);
                  router.refresh();
                } catch (e) {
                  setMessage((e as Error).message);
                } finally {
                  setBusy(false);
                }
              }}
            >
              Confirm & queue email
            </button>{" "}
            <button className="p-secondary" onClick={() => setConfirm(false)}>
              Cancel
            </button>
          </div>
        </div>
      )}
      <p role="status">{message}</p>
    </div>
  );
}
export function UploadReport({ id }: { id: string }) {
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);
  const router = useRouter();
  return (
    <form
      className="p-upload"
      onSubmit={async (e) => {
        e.preventDefault();
        setBusy(true);
        try {
          const form = new FormData(e.currentTarget);
          const response = await fetch(`/api/portal/orders/${id}`, {
            method: "POST",
            body: form,
          });
          const data = await response.json();
          if (!response.ok) throw new Error(data.error);
          setMessage("PDF uploaded privately. Preview it before sending.");
          router.refresh();
        } catch (e) {
          setMessage((e as Error).message);
        } finally {
          setBusy(false);
        }
      }}
    >
      <span className="p-upload-icon">↑</span>
      <h3>Upload QA report</h3>
      <p>Choose a completed report. Uploading does not send it.</p>
      <input
        type="file"
        name="file"
        accept="application/pdf"
        required
        aria-label="Choose PDF report"
      />
      <small>PDF only · Maximum 20 MB · Private storage</small>
      <button className="p-button" disabled={busy}>
        {busy ? "Uploading…" : "Upload PDF"}
      </button>
      <p role="status">{message}</p>
    </form>
  );
}

export function CredentialAccess({ id }: { id: string }) {
  const [value, setValue] = useState("");
  const [error, setError] = useState("");
  return (
    <div className="p-report-section">
      <button
        className="p-secondary"
        onClick={async () => {
          if (value) {
            setValue("");
            return;
          }
          try {
            const res = await fetch(`/api/portal/orders/${id}/credentials`, {
              method: "POST",
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.error);
            setValue(data.credentials);
          } catch (e) {
            setError((e as Error).message);
          }
        }}
      >
        {value ? "Hide credentials" : "Access dedicated test credentials"}
      </button>
      {value && (
        <pre
          style={{
            whiteSpace: "pre-wrap",
            overflowWrap: "anywhere",
            padding: 20,
            background: "#f4effc",
          }}
        >
          {value}
        </pre>
      )}
      <small>Administrator access is recorded in the audit log.</small>
      <p role="status">{error}</p>
    </div>
  );
}
export function MarkMessagesRead({ id }: { id: string }) {
  const router = useRouter();
  return (
    <button
      className="p-secondary"
      onClick={async () => {
        const res = await fetch(`/api/portal/orders/${id}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ action: "read-messages" }),
        });
        if (res.ok) router.refresh();
      }}
    >
      Mark conversation read
    </button>
  );
}
