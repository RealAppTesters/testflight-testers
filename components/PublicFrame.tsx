import Navbar from "./Navbar";
import Footer from "./Footer";
import Link from "next/link";
import "@/app/editorial.css";
export default function PublicFrame({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="container public-frame">
      <Navbar />
      <main className="editorial">{children}</main>
      <Footer />
    </div>
  );
}
export function EditorialCTA() {
  return (
    <aside className="e-cta">
      <div>
        <span className="e-kicker">BUILD. TEST. LAUNCH WITH CONFIDENCE.</span>
        <h2>Your next release deserves a fresh perspective.</h2>
        <p>Tell us what matters. We’ll help you put it to the test.</p>
      </div>
      <Link href="/pricing" className="btn-primary">
        Plan your testing →
      </Link>
    </aside>
  );
}
