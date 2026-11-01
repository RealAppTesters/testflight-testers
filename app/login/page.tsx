import Link from "next/link";
import { PortalForm } from "@/components/PortalActions";
import "../portal.css";
export const metadata = {
  title: "Secure sign in | TestFlightTesters",
  alternates: { canonical: "/login" },
  robots: { index: false, follow: false },
};
export default function Login() {
  return (
    <div className="portal p-login">
      <div className="p-login-story">
        <Link href="/" className="p-brand">
          <span className="p-brand-icon">A</span>TestFlightTesters
        </Link>
        <span className="p-eyebrow">A LITTLE TESTING. A BIG DIFFERENCE.</span>
        <h1>
          Your next launch.
          <br />A little more
          <br />
          <em>confident.</em>
        </h1>
        <p>
          Real devices. Thoughtful feedback. Everything you need to move your
          app forward, in one place.
        </p>
        <Link href="/demo">Explore the dashboard demo ↗</Link>
      </div>
      <main>
        <div className="p-card">
          <span className="p-stat-icon purple">↗</span>
          <h1>Good to see you.</h1>
          <p>Sign in to manage your orders and QA reports.</p>
          <PortalForm
            endpoint="/api/auth/login"
            submit="Email me a secure sign-in link →"
          >
            <label>
              Email address
              <input
                type="email"
                name="email"
                autoComplete="email"
                placeholder="you@yourcompany.com"
                maxLength={254}
                required
              />
            </label>
          </PortalForm>
          <small>
            Use the verified email associated with your PayPal payment. No
            password to remember. Links are single-use and expire.
          </small>
          <hr />
          <p>
            Planning your first test?{" "}
            <Link href="/pricing" className="p-text-link">
              Explore testing options →
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
}
