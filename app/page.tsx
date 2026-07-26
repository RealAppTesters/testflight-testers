import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import TrustBar from "@/components/TrustBar";
import ProcessFlow from "@/components/ProcessFlow";
import PricingCalculator from "@/components/PricingCalculator";
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

      <div className="container">
        <h2 className="section-title">
          <span className="stripe"></span> Pricing Calculator
        </h2>
        <p className="section-sub">
          Select the testing types you need. Each tester works for 1 hour per type.
        </p>
        <PricingCalculator />
      </div>

      <div className="container">
        <h2 className="section-title">
          <span className="stripe"></span> What Each Test Covers
        </h2>
        <p className="section-sub">
          Every testing type is performed by real testers on real Apple devices.
        </p>
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

      <div className="container">
        <h2 className="section-title">
          <span className="stripe"></span> Frequently Asked Questions
        </h2>
        <p className="section-sub">Everything you need to know before getting started.</p>
        <FAQ />
      </div>

      <div className="container">
        <CTA />
      </div>

      <div className="container">
        <Footer />
      </div>
    </>
  );
}
