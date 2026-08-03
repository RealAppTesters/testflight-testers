import Link from "next/link";

export const metadata = {
  title: "Terms & Conditions · TestFlightTesters",
  description: "Read our terms and conditions for using TestFlightTesters QA testing services.",
};

export default function TermsPage() {
  return (
    <div className="legal-page">
      <div className="legal-container">
        <Link href="/" className="back-link">
          <i className="fas fa-arrow-left"></i> Back to Home
        </Link>
        
        <div className="legal-header">
          <h1>Terms & Conditions</h1>
          <p className="legal-subtitle">Last updated: August 2026</p>
        </div>

        <div className="legal-content">
          <section>
            <h2>1. Acceptance of Terms</h2>
            <p>
              By using TestFlightTesters ("we", "our", "us"), you agree to comply with and be bound by these Terms & Conditions. 
              If you do not agree to these terms, please do not use our services.
            </p>
          </section>

          <section>
            <h2>2. Services Provided</h2>
            <p>
              TestFlightTesters provides professional QA testing services for iOS apps through TestFlight. 
              Our services include:
            </p>
            <ul>
              <li>Functional testing on real Apple devices</li>
              <li>Bug discovery and reporting</li>
              <li>User experience (UX) validation</li>
              <li>Performance testing</li>
              <li>Localization testing</li>
              <li>Accessibility testing</li>
              <li>Detailed QA reports</li>
            </ul>
          </section>

          <section>
            <h2>3. User Obligations</h2>
            <p>You agree to:</p>
            <ul>
              <li>Provide accurate and complete information</li>
              <li>Ensure you have the right to share your TestFlight link</li>
              <li>Not use our services for illegal or unauthorized purposes</li>
              <li>Comply with all applicable laws and regulations</li>
              <li>Not interfere with or disrupt our services</li>
            </ul>
          </section>

          <section>
            <h2>4. Orders and Payments</h2>
            <h3>4.1 Order Process</h3>
            <ul>
              <li>Orders are placed through our website and pricing calculator</li>
              <li>You agree to pay the total amount calculated</li>
              <li>Payments are processed securely through PayPal</li>
            </ul>

            <h3>4.2 Pricing</h3>
            <ul>
              <li>All prices are in USD</li>
              <li>Prices are subject to change without notice</li>
              <li>You will be charged the price displayed at checkout</li>
            </ul>
          </section>

          <section>
            <h2>5. Delivery and Testing</h2>
            <ul>
              <li>Testing begins within 24 hours of receiving your TestFlight link</li>
              <li>Delivery times depend on the selected speed (Standard, Priority, or Express)</li>
              <li>We will provide QA reports in the format you select</li>
              <li>You must provide a valid TestFlight public link</li>
            </ul>
          </section>

          <section>
            <h2>6. Confidentiality</h2>
            <p>
              We treat your app and all information you share as confidential. 
              We will not:
            </p>
            <ul>
              <li>Share your app with unauthorized third parties</li>
              <li>Use your app for any purpose other than testing</li>
              <li>Disclose your test results without your permission</li>
            </ul>
            <p>
              Upon request, we will sign a Non-Disclosure Agreement (NDA) for additional protection.
            </p>
          </section>

          <section>
            <h2>7. Intellectual Property</h2>
            <p>
              You retain all rights to your app and its intellectual property. 
              We do not claim ownership of your app, code, or content. 
              Any feedback, bug reports, and suggestions provided are for your use only.
            </p>
          </section>

          <section>
            <h2>8. Refund Policy</h2>
            <ul>
              <li>Refunds are available if we fail to start testing within 48 hours of receiving your link</li>
              <li>No refunds once testing has begun</li>
              <li>Refund requests must be submitted within 7 days of order</li>
              <li>We will review refund requests on a case-by-case basis</li>
            </ul>
          </section>

          <section>
            <h2>9. Limitation of Liability</h2>
            <p>
              To the maximum extent permitted by law, TestFlightTesters is not liable for:
            </p>
            <ul>
              <li>Any indirect, incidental, or consequential damages</li>
              <li>Loss of profits, data, or business opportunities</li>
              <li>Issues arising from your app or its performance</li>
              <li>Delays or failures beyond our reasonable control</li>
            </ul>
          </section>

          <section>
            <h2>10. Disclaimer of Warranties</h2>
            <p>
              Our services are provided "as is" and "as available" without warranties of any kind. 
              We do not guarantee that:
            </p>
            <ul>
              <li>All bugs will be discovered</li>
              <li>Your app will be free of issues</li>
              <li>Testing will meet specific outcomes</li>
            </ul>
          </section>

          <section>
            <h2>11. Termination</h2>
            <p>
              We reserve the right to terminate or suspend your access to our services:
            </p>
            <ul>
              <li>If you violate these Terms & Conditions</li>
              <li>If you misuse our services</li>
              <li>If required by law</li>
            </ul>
          </section>

          <section>
            <h2>12. Changes to Terms</h2>
            <p>
              We may modify these Terms & Conditions at any time. 
              Continued use of our services constitutes acceptance of the updated terms.
            </p>
          </section>

          <section>
            <h2>13. Governing Law</h2>
            <p>
              These Terms & Conditions are governed by the laws of South Africa. 
              Any disputes shall be resolved in the courts of South Africa.
            </p>
          </section>

          <section>
            <h2>14. Contact Information</h2>
            <p>
              For questions about these Terms & Conditions, please contact us:
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
