import Link from "next/link";

export default function Footer() {
  return (
    <footer className="footer">
      <div>
        <div className="logo" style={{ fontSize: "1.4rem", marginBottom: "8px" }}>
          TestFlight<span className="accent">Testers</span>
        </div>
        <p style={{ color: "var(--gray)", fontSize: "0.95rem", maxWidth: "260px" }}>
          Professional iOS QA testing platform for developers.
        </p>
        <div className="social-links">
          <a href="#" aria-label="Twitter"><i className="fab fa-twitter"></i></a>
          <a href="#" aria-label="LinkedIn"><i className="fab fa-linkedin-in"></i></a>
          <a href="#" aria-label="GitHub"><i className="fab fa-github"></i></a>
        </div>
      </div>
      
      <div>
        <h5>Company</h5>
        <Link href="#services">Services</Link>
        <Link href="#pricing">Pricing</Link>
        <Link href="#faq">FAQ</Link>
        <Link href="#contact">Contact</Link>
      </div>
      
      <div>
        <h5>Legal</h5>
        <Link href="/privacy">Privacy Policy</Link>
        <Link href="/terms">Terms of Service</Link>
      </div>
      
      <div>
        <h5>Support</h5>
        <p><a href="mailto:support@testflighttesters.com">support@testflighttesters.com</a></p>
        <p style={{ color: "var(--gray)", fontSize: "0.85rem", marginTop: "12px" }}>
          © {new Date().getFullYear()} TestFlightTesters
        </p>
      </div>
    </footer>
  );
}
