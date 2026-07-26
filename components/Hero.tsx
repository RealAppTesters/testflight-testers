export default function Hero() {
  return (
    <section className="hero">
      <div>
        <div className="hero-badge">
          <i className="fas fa-check-circle"></i> Trusted by 500+ developers
        </div>
        <h1>
          Launch Better iOS Apps with<br />
          <span className="highlight">Professional TestFlight</span> QA Testing
        </h1>
        <p>
          Real iPhone and iPad users test your app, uncover bugs, validate user experience,
          and provide detailed QA reports before you submit to the App Store.
        </p>
        <div className="hero-actions">
          <a href="#" className="btn-primary">
            <i className="fas fa-rocket"></i> Start Testing
          </a>
          <a href="#" className="btn-outline">
            <i className="fas fa-play-circle"></i> See how it works
          </a>
        </div>
        <div className="hero-stats">
          <div><strong>500+</strong><span>Projects tested</span></div>
          <div><strong>24h</strong><span>Avg. start time</span></div>
          <div><strong>98%</strong><span>Satisfaction rate</span></div>
        </div>
      </div>

      <div className="hero-visual">
        <div className="mockup-header">
          <h4><i className="fas fa-folder-open" style={{ color: "var(--primary)" }}></i> Budget Tracker</h4>
          <span className="mockup-badge"><span className="dot"></span> Testing</span>
        </div>
        <div className="mockup-grid">
          <div className="mockup-card">
            <div className="label">Testers joined</div>
            <div className="value coral">25 / 25</div>
          </div>
          <div className="mockup-card">
            <div className="label">Bugs found</div>
            <div className="value purple">17</div>
          </div>
          <div className="mockup-card">
            <div className="label">UX suggestions</div>
            <div className="value gold">31</div>
          </div>
          <div className="mockup-card">
            <div className="label">Rating</div>
            <div className="stars">★★★★☆</div>
          </div>
        </div>
        <div className="progress-section">
          <div className="progress-label">
            <span>Progress</span>
            <span>94%</span>
          </div>
          <div className="progress-track">
            <div className="progress-fill"></div>
          </div>
        </div>
        <div className="feedback-list">
          <div className="feedback-item"><i className="fas fa-check-circle"></i> Login was smooth</div>
          <div className="feedback-item"><i className="fas fa-exclamation-triangle"></i> Crash on iPhone 14</div>
          <div className="feedback-item"><i className="fas fa-check-circle"></i> Navigation intuitive</div>
          <div className="feedback-item"><i className="fas fa-exclamation-triangle"></i> Button overlaps keyboard</div>
        </div>
      </div>
    </section>
  );
}
