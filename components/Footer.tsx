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
          <a href="#"><i className="fab fa-twitter"></i></a>
          <a href="#"><i className="fab fa-linkedin-in"></i></a>
          <a href="#"><i className="fab fa-github"></i></a>
        </div>
      </div>
      <div>
        <h5>Company</h5>
        <a href="#">About</a>
        <a href="#">Pricing</a>
        <a href="#">FAQ</a>
        <a href="#">Contact</a>
      </div>
      <div>
        <h5>Legal</h5>
        <a href="#">Privacy Policy</a>
        <a href="#">Terms of Service</a>
      </div>
      <div>
        <h5>Support</h5>
        <p><a href="mailto:support@testflighttesters.com">support@testflighttesters.com</a></p>
        <p style={{ color: "var(--gray)", fontSize: "0.85rem" }}>© 2026 TestFlightTesters</p>
      </div>
    </footer>
  );
}
