import Link from "next/link";

export const metadata = {
  title: "Privacy Policy · TestFlightTesters",
  description: "Read our privacy policy to understand how we collect, use, and protect your data.",
};

export default function PrivacyPage() {
  return (
    <div className="legal-page">
      <div className="legal-container">
        <Link href="/" className="back-link">
          <i className="fas fa-arrow-left"></i> Back to Home
        </Link>
        
        <div className="legal-header">
          <h1>Privacy Policy</h1>
          <p className="legal-subtitle">Last updated: August 2026</p>
        </div>

        <div className="legal-content">
          <section>
            <h2>1. Introduction</h2>
            <p>
              TestFlightTesters ("we", "our", "us") respects your privacy and is committed to protecting your personal data. 
              This privacy policy explains how we collect, use, and safeguard your information when you use our services.
            </p>
          </section>

          <section>
            <h2>2. Information We Collect</h2>
            <h3>2.1 Information you provide directly:</h3>
            <ul>
              <li>Name and contact information (email address, phone number)</li>
              <li>Company name (if applicable)</li>
              <li>App name and TestFlight link</li>
              <li>Testing preferences and requirements</li>
              <li>Payment information (processed securely through PayPal)</li>
            </ul>

            <h3>2.2 Information collected automatically:</h3>
            <ul>
              <li>Device and browser information</li>
              <li>IP address</li>
              <li>Pages visited and time spent</li>
              <li>Referring URLs</li>
            </ul>
          </section>

          <section>
            <h2>3. How We Use Your Information</h2>
            <p>We use your information to:</p>
            <ul>
              <li>Provide and manage our QA testing services</li>
              <li>Communicate with you about your orders and updates</li>
              <li>Send you QA reports and feedback</li>
              <li>Process payments securely</li>
              <li>Improve our services and user experience</li>
              <li>Comply with legal obligations</li>
            </ul>
          </section>

          <section>
            <h2>4. Information Sharing</h2>
            <p>
              We do not sell, trade, or rent your personal information to third parties. 
              We may share your information with:
            </p>
            <ul>
              <li>
                <strong>Service Providers:</strong> PayPal for payment processing, email providers for communications
              </li>
              <li>
                <strong>Legal Requirements:</strong> If required by law or to protect our rights
              </li>
              <li>
                <strong>Business Transfers:</strong> In the event of a merger, acquisition, or sale
              </li>
            </ul>
          </section>

          <section>
            <h2>5. Data Security</h2>
            <p>
              We implement appropriate technical and organizational measures to protect your personal data. 
              All payments are processed through PayPal's secure platform, and we do not store your payment information.
            </p>
          </section>

          <section>
            <h2>6. Data Retention</h2>
            <p>
              We retain your personal information for as long as necessary to provide our services and fulfill legal obligations. 
              You may request deletion of your data at any time.
            </p>
          </section>

          <section>
            <h2>7. Your Rights</h2>
            <p>You have the right to:</p>
            <ul>
              <li>Access your personal data</li>
              <li>Correct inaccurate data</li>
              <li>Request deletion of your data</li>
              <li>Object to data processing</li>
              <li>Data portability</li>
            </ul>
            <p>To exercise these rights, contact us at <a href="mailto:support@testflighttesters.com">support@testflighttesters.com</a></p>
          </section>

          <section>
            <h2>8. Cookies</h2>
            <p>
              We use essential cookies to ensure our website functions properly. 
              You can control cookie preferences through your browser settings.
            </p>
          </section>

          <section>
            <h2>9. Third-Party Links</h2>
            <p>
              Our website may contain links to third-party websites. We are not responsible for their privacy practices.
            </p>
          </section>

          <section>
            <h2>10. Children's Privacy</h2>
            <p>
              Our services are not intended for children under 13. We do not knowingly collect data from children.
            </p>
          </section>

          <section>
            <h2>11. Changes to This Policy</h2>
            <p>
              We may update this privacy policy from time to time. We will notify you of any changes by posting the new policy on this page.
            </p>
          </section>

          <section>
            <h2>12. Contact Us</h2>
            <p>
              If you have any questions about this privacy policy, please contact us at:
            </p>
            <p>
              <strong>Email:</strong> <a href="mailto:support@testflighttesters.com">support@testflighttesters.com</a><br />
              <strong>WhatsApp:</strong> <a href="https://wa.me/27791234567">+27 79 123 4567</a>
            </p>
          </section>

          <div className="legal-footer">
            <p>© {new Date().getFullYear()} TestFlightTesters. All rights reserved.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
