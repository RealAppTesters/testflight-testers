export default function Hero() {
  return (
    <section className="hero">
      <div>
        <div className="hero-badge">
          <i className="fas fa-rocket"></i> Now accepting new projects
        </div>
        <h1>
          TestFlight Testers<br />
          <span className="highlight">for iOS</span> App Testing
        </h1>
        <p>
          Get real iPhone and iPad testers to test your app through TestFlight. Find bugs, validate features, test user experience, and receive detailed QA feedback before your App Store launch.
        </p>
        <div className="hero-actions">
          <a href="#pricing" className="btn-primary">
            <i className="fas fa-rocket"></i> Start Testing
          </a>
          <a href="#services" className="btn-outline">
            <i className="fas fa-play-circle"></i> See how it works
          </a>
        </div>
        <div className="hero-stats">
          <div><strong>24h</strong><span>Avg. start time</span></div>
          <div><strong>Real</strong><span>Devices only</span></div>
          <div><strong>Detailed</strong><span>QA reports</span></div>
        </div>
      </div>

      <div className="hero-visual">
        <div className="mockup-header">
          <h4><i className="fas fa-folder-open" style={{ color: "var(--primary)" }}></i> Example QA Report</h4>
          <span className="mockup-badge"><span className="dot"></span> Live preview</span>
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
