import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import TrustBar from "@/components/TrustBar";
import ProcessFlow from "@/components/ProcessFlow";
import Link from "next/link";
import TestingTypes from "@/components/TestingTypes";
import ComparisonTable from "@/components/ComparisonTable";
import SupportedDevices from "@/components/SupportedDevices";
import BuiltFor from "@/components/BuiltFor";
import FAQ from "@/components/FAQ";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      {/* Background blobs */}
      <div className="blob blob-1"></div>
      <div className="blob blob-2"></div>
      <div className="blob blob-3"></div>

      <div className="container">
        <Navbar />
      </div>

      <div className="container">
        <Hero />
      </div>

      <div className="container">
        <TrustBar />
      </div>

      <div className="container">
        <ProcessFlow />
      </div>

      {/* Pricing section with ID */}
      <div className="container" id="pricing">
        <h2 className="section-title">
          <span className="stripe"></span> TestFlight Testing Pricing
        </h2>
        <p className="section-sub">
          Every project is priced at $10 per tester per hour, plus a small delivery surcharge.
          Get an instant quote with our calculator.
        </p>
        <div style={{ textAlign: "center", marginTop: "32px" }}>
          <Link href="/pricing" className="btn-primary" style={{ fontSize: "1.05rem", padding: "16px 40px" }}>
            <i className="fas fa-calculator"></i> Open Pricing Calculator
          </Link>
        </div>
        <div className="pricing-quick-facts">
          <div className="quick-fact">
            <strong>$10</strong>
            <span>per tester / hour</span>
          </div>
          <div className="quick-fact">
            <strong>Free</strong>
            <span>standard delivery</span>
          </div>
          <div className="quick-fact">
            <strong>No</strong>
            <span>minimums or subscriptions</span>
          </div>
        </div>
      </div>

      {/* Services section with ID */}
      <div className="container" id="services">
        <TestingTypes />
      </div>

      <div className="container">
        <h2 className="section-title">
          <span className="stripe"></span> Why not use friends?
        </h2>
        <p className="section-sub">Professional QA vs. asking your buddies.</p>
        <ComparisonTable />
      </div>

      <div className="container">
        <h2 className="section-title">
          <span className="stripe"></span> Built For
        </h2>
        <p className="section-sub">Trusted by teams of every size.</p>
        <BuiltFor />
      </div>

      <div className="container">
        <h2 className="section-title">
          <span className="stripe"></span> Supported Devices
        </h2>
        <p className="section-sub">Real Apple hardware. No simulators.</p>
        <SupportedDevices />
      </div>

      {/* FAQ section with ID */}
      <div className="container" id="faq">
        <h2 className="section-title">
          <span className="stripe"></span> Frequently Asked Questions
        </h2>
        <p className="section-sub">Everything you need to know before getting started.</p>
        <FAQ />
      </div>

      {/* Contact section with ID */}
      <div className="container" id="contact">
        <CTA />
      </div>

      <div className="container">
        <Footer />
      </div>
    </>
  );
}
