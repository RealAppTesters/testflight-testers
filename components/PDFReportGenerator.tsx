"use client";

import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { useState } from "react";

interface ReportData {
  orderId: string;
  appName: string;
  testingType: string;
  testers: number;
  hours: number;
  devices: string[];
  iosVersions: string[];
  reportDate: string;
  reportId: string;
}

export default function PDFReportGenerator() {
  const [isGenerating, setIsGenerating] = useState(false);

  const sampleData: ReportData = {
    reportId: "TFT-QA-2026-08-03-001",
    orderId: "TFT-123456-ABC",
    appName: "SoulCalc",
    testingType: "Comprehensive QA",
    testers: 5,
    hours: 5,
    devices: ["iPhone 14", "iPhone 15 Pro Max", "iPhone 13", "iPad Air 5", "iPad Pro 12.9\""],
    iosVersions: ["iOS 16.7", "iOS 17.5", "iOS 18.0"],
    reportDate: "August 3, 2026",
  };

  const generatePDF = async () => {
    setIsGenerating(true);
    
    try {
      const container = document.createElement('div');
      container.style.position = 'fixed';
      container.style.left = '-9999px';
      container.style.top = '0';
      container.style.width = '1200px';
      container.style.padding = '40px';
      container.style.background = '#ffffff';
      container.style.fontFamily = 'Inter, -apple-system, sans-serif';
      container.style.color = '#1a1a2e';
      container.style.lineHeight = '1.6';
      container.style.zIndex = '9999';
      
      container.innerHTML = getFullReportHTML(sampleData);
      document.body.appendChild(container);

      await new Promise(resolve => setTimeout(resolve, 1500));

      const canvas = await html2canvas(container, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff',
        width: 1200,
        height: container.scrollHeight,
      });

      document.body.removeChild(container);

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = 210;
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);

      const pageHeight = 297;
      let remainingHeight = pdfHeight;
      let currentPage = 0;
      
      while (remainingHeight > pageHeight) {
        currentPage++;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, -currentPage * pageHeight, pdfWidth, pdfHeight);
        remainingHeight -= pageHeight;
      }

      pdf.save(`QA-Report-${sampleData.orderId}.pdf`);
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('There was an error generating the PDF. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="pdf-report-container">
      <button 
        className="btn-primary download-pdf-btn"
        onClick={generatePDF}
        disabled={isGenerating}
      >
        {isGenerating ? (
          <>
            <i className="fas fa-spinner fa-spin"></i> Generating PDF...
          </>
        ) : (
          <>
            <i className="fas fa-file-pdf"></i> Download Full QA Report PDF
          </>
        )}
      </button>
    </div>
  );
}

function getFullReportHTML(data: ReportData): string {
  return `
    <div style="max-width: 1100px; margin: 0 auto; background: white; padding: 40px;">
      
      <!-- ==================== COVER PAGE ==================== -->
      <div style="text-align: center; padding: 60px 40px; border-bottom: 3px solid #6c3ce0; margin-bottom: 40px;">
        <div style="font-size: 2.4rem; font-weight: 800; color: #0d0c1d; margin-bottom: 8px;">
          TestFlight<span style="background: #6c3ce0; color: white; padding: 4px 16px; border-radius: 40px; font-size: 1.2rem;">Testers</span>
        </div>
        <h1 style="font-size: 3.2rem; font-weight: 900; color: #0d0c1d; margin: 24px 0 8px; letter-spacing: -0.03em;">
          QA Testing Report
        </h1>
        <p style="font-size: 1.4rem; color: #6b6b7b;">Professional iOS App Testing Report</p>
        <div style="margin-top: 40px; display: inline-block; background: #f8fafc; padding: 24px 48px; border-radius: 16px; border: 1px solid #e8e6e1;">
          <p style="font-size: 1.1rem; color: #6b6b7b; margin: 4px 0;"><strong style="color: #1a1a2e;">Report ID:</strong> ${data.reportId}</p>
          <p style="font-size: 1.1rem; color: #6b6b7b; margin: 4px 0;"><strong style="color: #1a1a2e;">Order ID:</strong> ${data.orderId}</p>
          <p style="font-size: 1.1rem; color: #6b6b7b; margin: 4px 0;"><strong style="color: #1a1a2e;">App Name:</strong> ${data.appName}</p>
          <p style="font-size: 1.1rem; color: #6b6b7b; margin: 4px 0;"><strong style="color: #1a1a2e;">Report Date:</strong> ${data.reportDate}</p>
        </div>
        <p style="margin-top: 40px; color: #6b6b7b; font-size: 0.95rem;">
          <strong style="color: #1a1a2e;">Confidential</strong> — For authorized use only
        </p>
      </div>

      <!-- ==================== REPORT OVERVIEW ==================== -->
      <div style="margin-bottom: 40px;">
        <h2 style="font-size: 2rem; font-weight: 800; color: #0d0c1d; margin-bottom: 20px; border-bottom: 2px solid #6c3ce0; padding-bottom: 12px;">
          Report Overview
        </h2>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px 40px; background: #f8fafc; padding: 24px 32px; border-radius: 16px; border: 1px solid #e8e6e1;">
          <div><strong>Report ID:</strong> ${data.reportId}</div>
          <div><strong>Order ID:</strong> ${data.orderId}</div>
          <div><strong>App Name:</strong> ${data.appName}</div>
          <div><strong>Testing Type:</strong> ${data.testingType}</div>
          <div><strong>Testers:</strong> ${data.testers}</div>
          <div><strong>Testing Hours:</strong> ${data.hours} hours per tester</div>
          <div><strong>Devices Tested:</strong> ${data.devices.join(', ')}</div>
          <div><strong>iOS Versions:</strong> ${data.iosVersions.join(', ')}</div>
          <div><strong>Report Date:</strong> ${data.reportDate}</div>
          <div><strong>Report Author:</strong> TestFlightTesters QA Team</div>
        </div>
      </div>

      <!-- ==================== EXECUTIVE SUMMARY ==================== -->
      <div style="margin-bottom: 40px; page-break-before: avoid;">
        <h2 style="font-size: 2rem; font-weight: 800; color: #0d0c1d; margin-bottom: 20px; border-bottom: 2px solid #6c3ce0; padding-bottom: 12px;">
          Executive Summary
        </h2>
        
        <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 16px; margin-bottom: 24px;">
          <div style="background: #f8fafc; padding: 16px; border-radius: 12px; text-align: center; border: 1px solid #e8e6e1;">
            <div style="font-size: 2rem; font-weight: 800; color: #ff6b4a;">47</div>
            <div style="font-size: 0.85rem; color: #6b6b7b;">Total Issues Found</div>
          </div>
          <div style="background: #f8fafc; padding: 16px; border-radius: 12px; text-align: center; border: 1px solid #e8e6e1;">
            <div style="font-size: 2rem; font-weight: 800; color: #ff6b4a;">3</div>
            <div style="font-size: 0.85rem; color: #6b6b7b;">Critical Bugs</div>
          </div>
          <div style="background: #f8fafc; padding: 16px; border-radius: 12px; text-align: center; border: 1px solid #e8e6e1;">
            <div style="font-size: 2rem; font-weight: 800; color: #f7c948;">12</div>
            <div style="font-size: 0.85rem; color: #6b6b7b;">High Priority</div>
          </div>
          <div style="background: #f8fafc; padding: 16px; border-radius: 12px; text-align: center; border: 1px solid #e8e6e1;">
            <div style="font-size: 2rem; font-weight: 800; color: #f7c948;">18</div>
            <div style="font-size: 0.85rem; color: #6b6b7b;">Medium Priority</div>
          </div>
          <div style="background: #f8fafc; padding: 16px; border-radius: 12px; text-align: center; border: 1px solid #e8e6e1;">
            <div style="font-size: 2rem; font-weight: 800; color: #4cd9b2;">14</div>
            <div style="font-size: 0.85rem; color: #6b6b7b;">Low Priority</div>
          </div>
          <div style="background: #f8fafc; padding: 16px; border-radius: 12px; text-align: center; border: 1px solid #e8e6e1;">
            <div style="font-size: 2rem; font-weight: 800; color: #8b6cf5;">8</div>
            <div style="font-size: 0.85rem; color: #6b6b7b;">UX Suggestions</div>
          </div>
        </div>

        <div style="background: #f0f7ff; padding: 20px 24px; border-radius: 16px; border-left: 4px solid #6c3ce0; margin-bottom: 20px;">
          <p style="color: #1a1a2e; font-size: 1.05rem; margin: 0;">
            <strong>Overview:</strong> The SoulCalc app shows strong core functionality with a clean, intuitive interface. 
            However, we identified several critical issues that should be addressed before the App Store submission. 
            The main concerns are related to subscription flows, crash handling on older devices, and notification delivery.
          </p>
        </div>

        <div style="background: #f8fafc; padding: 20px 24px; border-radius: 16px; border: 1px solid #e8e6e1;">
          <h3 style="font-size: 1.1rem; font-weight: 700; margin-bottom: 12px;">Overall Assessment</h3>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px 32px;">
            <div><strong>Functionality:</strong> ⭐⭐⭐⭐ Core features working well</div>
            <div><strong>UI/UX:</strong> ⭐⭐⭐⭐ Clean design, needs polish</div>
            <div><strong>Performance:</strong> ⭐⭐⭐ Slower on older devices</div>
            <div><strong>Stability:</strong> ⭐⭐⭐ Some crashes under load</div>
            <div><strong>Accessibility:</strong> ⭐⭐⭐ VoiceOver partially working</div>
            <div><strong>Localization:</strong> ⭐⭐⭐ Issues in some languages</div>
          </div>
          <div style="margin-top: 12px; padding-top: 12px; border-top: 1px solid #e8e6e1; text-align: center;">
            <span style="font-size: 1.2rem; font-weight: 700; color: #6c3ce0;">Overall Rating: ★★★★☆ (4.2/5)</span>
          </div>
        </div>
      </div>

      <!-- ==================== KEY FINDINGS ==================== -->
      <div style="margin-bottom: 40px; page-break-before: avoid;">
        <h2 style="font-size: 1.8rem; font-weight: 800; color: #0d0c1d; margin-bottom: 16px; border-bottom: 2px solid #6c3ce0; padding-bottom: 12px;">
          1. Executive Summary
        </h2>
        <p style="color: #1a1a2e; margin-bottom: 20px;">
          SoulCalc demonstrates solid potential with its comprehensive soul calculation features. The app's core functionality—
          calculating soul numbers based on user input—works correctly across all tested devices. However, we found several issues 
          that need immediate attention:
        </p>

        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 20px;">
          <div style="background: #fff5f3; padding: 16px 20px; border-radius: 12px; border-left: 4px solid #ff6b4a;">
            <div style="font-weight: 700; color: #ff6b4a;">🟥 Critical Issues (3)</div>
            <ul style="margin: 8px 0 0 20px; color: #4a4a5a; font-size: 0.95rem;">
              <li>App crashes when switching between tabs rapidly on iPhone 13</li>
              <li>Subscription flow fails on iPad Air (doesn't restore purchases)</li>
              <li>Notification preferences not saving correctly</li>
            </ul>
          </div>
          <div style="background: #fff8ed; padding: 16px 20px; border-radius: 12px; border-left: 4px solid #f7c948;">
            <div style="font-weight: 700; color: #f7c948;">🟧 High Priority Issues (12)</div>
            <ul style="margin: 8px 0 0 20px; color: #4a4a5a; font-size: 0.95rem;">
              <li>Slow loading on first launch (4.3 seconds average)</li>
              <li>Login screen UI broken on iPhone 14 Pro Max</li>
              <li>In-app purchase flow not working with TestFlight builds</li>
              <li>Push notifications not arriving on iOS 16.7 devices</li>
            </ul>
          </div>
          <div style="background: #f0faf8; padding: 16px 20px; border-radius: 12px; border-left: 4px solid #4cd9b2;">
            <div style="font-weight: 700; color: #4cd9b2;">🟨 Medium Priority Issues (18)</div>
            <ul style="margin: 8px 0 0 20px; color: #4a4a5a; font-size: 0.95rem;">
              <li>Text truncation in German localization</li>
              <li>Keyboard overlap on number input fields</li>
              <li>Loading spinner missing during calculations</li>
            </ul>
          </div>
          <div style="background: #f0f0ff; padding: 16px 20px; border-radius: 12px; border-left: 4px solid #8b6cf5;">
            <div style="font-weight: 700; color: #8b6cf5;">🟩 UX Improvements (8)</div>
            <ul style="margin: 8px 0 0 20px; color: #4a4a5a; font-size: 0.95rem;">
              <li>Add haptic feedback on button presses</li>
              <li>Improve onboarding tutorial clarity</li>
              <li>Add dark mode support</li>
            </ul>
          </div>
        </div>
      </div>

      <!-- ==================== CRITICAL ISSUES ==================== -->
      <div style="margin-bottom: 40px; page-break-before: avoid;">
        <h2 style="font-size: 1.8rem; font-weight: 800; color: #0d0c1d; margin-bottom: 16px; border-bottom: 2px solid #6c3ce0; padding-bottom: 12px;">
          2. Detailed Testing Results
        </h2>
        <h3 style="font-size: 1.4rem; font-weight: 700; color: #ff6b4a; margin-bottom: 16px;">2.1. Critical Issues</h3>

        <!-- CRIT-001 -->
        <div style="background: #fff5f3; padding: 20px 24px; border-radius: 16px; border: 1px solid #ffd4cc; margin-bottom: 20px;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
            <h4 style="font-size: 1.1rem; font-weight: 700; color: #ff6b4a;">CRIT-001: App Crash on Rapid Tab Switching</h4>
            <span style="background: #ff6b4a; color: white; padding: 2px 12px; border-radius: 40px; font-size: 0.75rem; font-weight: 600;">Critical</span>
          </div>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 4px 20px; font-size: 0.9rem; color: #4a4a5a; margin-bottom: 8px;">
            <div><strong>Device:</strong> iPhone 13 (iOS 16.7)</div>
            <div><strong>Category:</strong> Stability</div>
            <div><strong>Status:</strong> 🔴 Needs Fix</div>
          </div>
          <p style="margin: 8px 0; color: #1a1a2e;"><strong>Description:</strong> The app crashes when users rapidly switch between the "Home" and "History" tabs (3+ switches within 5 seconds). This is reproducible on iPhone 13 devices.</p>
          <div style="background: white; padding: 12px 16px; border-radius: 8px; margin: 8px 0; border: 1px solid #e8e6e1;">
            <strong>Steps to Reproduce:</strong>
            <ol style="margin: 4px 0 0 20px; color: #4a4a5a; font-size: 0.9rem;">
              <li>Launch SoulCalc</li>
              <li>Navigate to Home tab</li>
              <li>Quickly tap "History" tab 3 times</li>
              <li>Tap "Home" tab immediately</li>
              <li>App crashes</li>
            </ol>
          </div>
          <div style="margin: 8px 0; padding: 8px 12px; background: #f8fafc; border-radius: 8px;">
            <strong>Recommendation:</strong> Implement tab switching debounce (minimum 300ms between switches), optimize history view data loading, add memory warning handling
          </div>
        </div>

        <!-- CRIT-002 -->
        <div style="background: #fff5f3; padding: 20px 24px; border-radius: 16px; border: 1px solid #ffd4cc; margin-bottom: 20px;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
            <h4 style="font-size: 1.1rem; font-weight: 700; color: #ff6b4a;">CRIT-002: Subscription Flow Failure on iPad</h4>
            <span style="background: #ff6b4a; color: white; padding: 2px 12px; border-radius: 40px; font-size: 0.75rem; font-weight: 600;">Critical</span>
          </div>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 4px 20px; font-size: 0.9rem; color: #4a4a5a; margin-bottom: 8px;">
            <div><strong>Device:</strong> iPad Air 5 (iPadOS 17.5)</div>
            <div><strong>Category:</strong> In-App Purchases</div>
            <div><strong>Status:</strong> 🔴 Needs Fix</div>
          </div>
          <p style="margin: 8px 0; color: #1a1a2e;"><strong>Description:</strong> Subscription purchase flow fails on iPad devices. Users cannot restore previous purchases, and the subscription screen shows incorrect pricing information.</p>
          <div style="background: white; padding: 12px 16px; border-radius: 8px; margin: 8px 0; border: 1px solid #e8e6e1;">
            <strong>Steps to Reproduce:</strong>
            <ol style="margin: 4px 0 0 20px; color: #4a4a5a; font-size: 0.9rem;">
              <li>Open SoulCalc on iPad Air</li>
              <li>Navigate to Settings → Subscription</li>
              <li>Tap "Restore Purchases"</li>
              <li>App shows "No purchases found" error</li>
              <li>Tap "Subscribe" → App crashes</li>
            </ol>
          </div>
          <div style="margin: 8px 0; padding: 8px 12px; background: #f8fafc; border-radius: 8px;">
            <strong>Recommendation:</strong> Fix StoreKit configuration for iPad, implement proper receipt validation, test subscription flow on all iPad models
          </div>
        </div>

        <!-- CRIT-003 -->
        <div style="background: #fff5f3; padding: 20px 24px; border-radius: 16px; border: 1px solid #ffd4cc; margin-bottom: 20px;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
            <h4 style="font-size: 1.1rem; font-weight: 700; color: #ff6b4a;">CRIT-003: Notification Preferences Not Saving</h4>
            <span style="background: #ff6b4a; color: white; padding: 2px 12px; border-radius: 40px; font-size: 0.75rem; font-weight: 600;">Critical</span>
          </div>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 4px 20px; font-size: 0.9rem; color: #4a4a5a; margin-bottom: 8px;">
            <div><strong>Device:</strong> All Tested Devices</div>
            <div><strong>Category:</strong> Notifications</div>
            <div><strong>Status:</strong> 🔴 Needs Fix</div>
          </div>
          <p style="margin: 8px 0; color: #1a1a2e;"><strong>Description:</strong> Users cannot save their notification preferences. The settings revert to default after app restart.</p>
          <div style="background: white; padding: 12px 16px; border-radius: 8px; margin: 8px 0; border: 1px solid #e8e6e1;">
            <strong>Steps to Reproduce:</strong>
            <ol style="margin: 4px 0 0 20px; color: #4a4a5a; font-size: 0.9rem;">
              <li>Open SoulCalc → Settings → Notifications</li>
              <li>Toggle "Daily Reminders" OFF</li>
              <li>Toggle "Weekly Reports" ON</li>
              <li>Force quit app</li>
              <li>Reopen → Settings show default values</li>
            </ol>
          </div>
          <div style="margin: 8px 0; padding: 8px 12px; background: #f8fafc; border-radius: 8px;">
            <strong>Recommendation:</strong> Use UserDefaults or Keychain for persistent storage, implement proper save/load mechanism, add confirmation when settings are saved
          </div>
        </div>
      </div>

      <!-- ==================== HIGH PRIORITY ISSUES ==================== -->
      <div style="margin-bottom: 40px; page-break-before: avoid;">
        <h3 style="font-size: 1.4rem; font-weight: 700; color: #f7c948; margin-bottom: 16px;">2.2. High Priority Issues</h3>

        <!-- HIGH-001 -->
        <div style="background: #fff8ed; padding: 16px 20px; border-radius: 12px; border: 1px solid #f7c948; margin-bottom: 12px;">
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <h4 style="font-size: 1rem; font-weight: 700; color: #f7c948;">HIGH-001: Slow First Launch</h4>
            <span style="background: #f7c948; color: white; padding: 2px 10px; border-radius: 40px; font-size: 0.7rem; font-weight: 600;">High</span>
          </div>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2px 16px; font-size: 0.85rem; color: #4a4a5a;">
            <div><strong>Device:</strong> iPhone 14 Pro Max</div>
            <div><strong>Category:</strong> Performance</div>
          </div>
          <p style="font-size: 0.9rem; margin: 4px 0;"><strong>Issue:</strong> First app launch takes 4.3 seconds on iPhone 14 Pro Max, significantly impacting user experience.</p>
          <div style="background: white; padding: 8px 12px; border-radius: 6px; font-size: 0.85rem;">
            <strong>Recommendation:</strong> Optimize launch process, lazy load non-critical resources, add splash screen with progress indicator
          </div>
        </div>

        <!-- HIGH-002 -->
        <div style="background: #fff8ed; padding: 16px 20px; border-radius: 12px; border: 1px solid #f7c948; margin-bottom: 12px;">
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <h4 style="font-size: 1rem; font-weight: 700; color: #f7c948;">HIGH-002: Login Screen UI Broken</h4>
            <span style="background: #f7c948; color: white; padding: 2px 10px; border-radius: 40px; font-size: 0.7rem; font-weight: 600;">High</span>
          </div>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2px 16px; font-size: 0.85rem; color: #4a4a5a;">
            <div><strong>Device:</strong> iPhone 14 Pro Max</div>
            <div><strong>Category:</strong> UI/UX</div>
          </div>
          <p style="font-size: 0.9rem; margin: 4px 0;"><strong>Issue:</strong> Login screen UI is broken on devices with notch, with elements overlapping the status bar.</p>
          <div style="background: white; padding: 8px 12px; border-radius: 6px; font-size: 0.85rem;">
            <strong>Recommendation:</strong> Use safe area layout guide, test on all notch devices, add proper constraints
          </div>
        </div>

        <!-- HIGH-003 -->
        <div style="background: #fff8ed; padding: 16px 20px; border-radius: 12px; border: 1px solid #f7c948; margin-bottom: 12px;">
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <h4 style="font-size: 1rem; font-weight: 700; color: #f7c948;">HIGH-003: IAP Flow Not Working</h4>
            <span style="background: #f7c948; color: white; padding: 2px 10px; border-radius: 40px; font-size: 0.7rem; font-weight: 600;">High</span>
          </div>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2px 16px; font-size: 0.85rem; color: #4a4a5a;">
            <div><strong>Device:</strong> All Tested Devices</div>
            <div><strong>Category:</strong> Payments</div>
          </div>
          <p style="font-size: 0.9rem; margin: 4px 0;"><strong>Issue:</strong> In-app purchase flow doesn't work in TestFlight builds. Products not loading.</p>
          <div style="background: white; padding: 8px 12px; border-radius: 6px; font-size: 0.85rem;">
            <strong>Recommendation:</strong> Verify StoreKit configuration, test with sandbox users, add proper error handling
          </div>
        </div>

        <!-- HIGH-004 -->
        <div style="background: #fff8ed; padding: 16px 20px; border-radius: 12px; border: 1px solid #f7c948;">
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <h4 style="font-size: 1rem; font-weight: 700; color: #f7c948;">HIGH-004: Push Notifications Not Arriving</h4>
            <span style="background: #f7c948; color: white; padding: 2px 10px; border-radius: 40px; font-size: 0.7rem; font-weight: 600;">High</span>
          </div>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2px 16px; font-size: 0.85rem; color: #4a4a5a;">
            <div><strong>Device:</strong> iPhone 13 (iOS 16.7)</div>
            <div><strong>Category:</strong> Notifications</div>
          </div>
          <p style="font-size: 0.9rem; margin: 4px 0;"><strong>Issue:</strong> Push notifications not arriving on devices running iOS 16.7.</p>
          <div style="background: white; padding: 8px 12px; border-radius: 6px; font-size: 0.85rem;">
            <strong>Recommendation:</strong> Verify APNS configuration, test certificate expiration, add fallback for older iOS versions
          </div>
        </div>
      </div>

      <!-- ==================== MEDIUM PRIORITY ==================== -->
      <div style="margin-bottom: 40px; page-break-before: avoid;">
        <h3 style="font-size: 1.4rem; font-weight: 700; color: #4cd9b2; margin-bottom: 16px;">2.3. Medium Priority Issues</h3>

        <div style="background: #f0faf8; padding: 14px 18px; border-radius: 12px; border: 1px solid #4cd9b2; margin-bottom: 10px;">
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <h4 style="font-size: 0.95rem; font-weight: 700; color: #4cd9b2;">MED-001: Text Truncation in German</h4>
            <span style="background: #4cd9b2; color: white; padding: 2px 10px; border-radius: 40px; font-size: 0.7rem; font-weight: 600;">Medium</span>
          </div>
          <p style="font-size: 0.9rem; margin: 4px 0;"><strong>Issue:</strong> German translations are truncated in the settings menu due to longer text strings.</p>
          <div style="background: white; padding: 6px 10px; border-radius: 6px; font-size: 0.85rem;">
            <strong>Recommendation:</strong> Adjust UI layout for German, use auto-sizing labels, review translations
          </div>
        </div>

        <div style="background: #f0faf8; padding: 14px 18px; border-radius: 12px; border: 1px solid #4cd9b2; margin-bottom: 10px;">
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <h4 style="font-size: 0.95rem; font-weight: 700; color: #4cd9b2;">MED-002: Keyboard Overlap Issue</h4>
            <span style="background: #4cd9b2; color: white; padding: 2px 10px; border-radius: 40px; font-size: 0.7rem; font-weight: 600;">Medium</span>
          </div>
          <p style="font-size: 0.9rem; margin: 4px 0;"><strong>Issue:</strong> Keyboard overlaps input fields during number entry, making it difficult to see entered values.</p>
          <div style="background: white; padding: 6px 10px; border-radius: 6px; font-size: 0.85rem;">
            <strong>Recommendation:</strong> Implement keyboard avoidance, add scroll to active field, test on all keyboard types
          </div>
        </div>

        <div style="background: #f0faf8; padding: 14px 18px; border-radius: 12px; border: 1px solid #4cd9b2;">
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <h4 style="font-size: 0.95rem; font-weight: 700; color: #4cd9b2;">MED-003: Missing Loading Spinner</h4>
            <span style="background: #4cd9b2; color: white; padding: 2px 10px; border-radius: 40px; font-size: 0.7rem; font-weight: 600;">Medium</span>
          </div>
          <p style="font-size: 0.9rem; margin: 4px 0;"><strong>Issue:</strong> No loading indicator during calculations, making users think the app is frozen.</p>
          <div style="background: white; padding: 6px 10px; border-radius: 6px; font-size: 0.85rem;">
            <strong>Recommendation:</strong> Add loading spinner, disable buttons during calculation, provide progress feedback
          </div>
        </div>
      </div>

      <!-- ==================== UX IMPROVEMENTS ==================== -->
      <div style="margin-bottom: 40px; page-break-before: avoid;">
        <h3 style="font-size: 1.4rem; font-weight: 700; color: #8b6cf5; margin-bottom: 16px;">2.4. UX Improvements</h3>

        <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 16px;">
          <div style="background: #f0f0ff; padding: 16px 20px; border-radius: 12px; border: 1px solid #8b6cf5;">
            <h4 style="font-weight: 700; color: #8b6cf5;">UX-001: Add Haptic Feedback</h4>
            <p style="font-size: 0.9rem; color: #4a4a5a;">Add haptic feedback on button presses and calculation completion</p>
            <div style="display: flex; gap: 8px; margin-top: 8px;">
              <span style="background: #4cd9b2; color: white; padding: 2px 8px; border-radius: 40px; font-size: 0.65rem; font-weight: 600;">Low Priority</span>
              <span style="background: #6c3ce0; color: white; padding: 2px 8px; border-radius: 40px; font-size: 0.65rem; font-weight: 600;">Positive Impact</span>
            </div>
          </div>
          <div style="background: #f0f0ff; padding: 16px 20px; border-radius: 12px; border: 1px solid #8b6cf5;">
            <h4 style="font-weight: 700; color: #8b6cf5;">UX-002: Improve Onboarding Tutorial</h4>
            <p style="font-size: 0.9rem; color: #4a4a5a;">Add interactive onboarding tutorial with step-by-step guidance</p>
            <div style="display: flex; gap: 8px; margin-top: 8px;">
              <span style="background: #4cd9b2; color: white; padding: 2px 8px; border-radius: 40px; font-size: 0.65rem; font-weight: 600;">Low Priority</span>
              <span style="background: #6c3ce0; color: white; padding: 2px 8px; border-radius: 40px; font-size: 0.65rem; font-weight: 600;">Positive Impact</span>
            </div>
          </div>
          <div style="background: #f0f0ff; padding: 16px 20px; border-radius: 12px; border: 1px solid #8b6cf5;">
            <h4 style="font-weight: 700; color: #8b6cf5;">UX-003: Add Dark Mode</h4>
            <p style="font-size: 0.9rem; color: #4a4a5a;">Implement dark mode support for better night-time usability</p>
            <div style="display: flex; gap: 8px; margin-top: 8px;">
              <span style="background: #4cd9b2; color: white; padding: 2px 8px; border-radius: 40px; font-size: 0.65rem; font-weight: 600;">Low Priority</span>
              <span style="background: #6c3ce0; color: white; padding: 2px 8px; border-radius: 40px; font-size: 0.65rem; font-weight: 600;">Positive Impact</span>
            </div>
          </div>
        </div>
      </div>

      <!-- ==================== TEST COVERAGE ==================== -->
      <div style="margin-bottom: 40px; page-break-before: avoid;">
        <h2 style="font-size: 1.8rem; font-weight: 800; color: #0d0c1d; margin-bottom: 16px; border-bottom: 2px solid #6c3ce0; padding-bottom: 12px;">
          3. Test Coverage Summary
        </h2>

        <h3 style="font-size: 1.2rem; font-weight: 700; margin-bottom: 12px;">3.1. Features Tested</h3>
        <table style="width: 100%; border-collapse: collapse; font-size: 0.9rem; margin-bottom: 24px;">
          <thead>
            <tr style="background: #6c3ce0; color: white;">
              <th style="padding: 10px 14px; text-align: left;">Feature</th>
              <th style="padding: 10px 14px; text-align: center;">Status</th>
              <th style="padding: 10px 14px; text-align: center;">Testers</th>
              <th style="padding: 10px 14px; text-align: left;">Notes</th>
            </tr>
          </thead>
          <tbody>
            <tr style="border-bottom: 1px solid #e8e6e1;"><td style="padding: 8px 14px;">User Login</td><td style="padding: 8px 14px; text-align: center;">✅ Working</td><td style="padding: 8px 14px; text-align: center;">5/5</td><td style="padding: 8px 14px;">Minor UI issues</td></tr>
            <tr style="border-bottom: 1px solid #e8e6e1;"><td style="padding: 8px 14px;">Account Creation</td><td style="padding: 8px 14px; text-align: center;">✅ Working</td><td style="padding: 8px 14px; text-align: center;">5/5</td><td style="padding: 8px 14px;">Smooth process</td></tr>
            <tr style="border-bottom: 1px solid #e8e6e1;"><td style="padding: 8px 14px;">Soul Calculation</td><td style="padding: 8px 14px; text-align: center;">✅ Working</td><td style="padding: 8px 14px; text-align: center;">5/5</td><td style="padding: 8px 14px;">Accurate results</td></tr>
            <tr style="border-bottom: 1px solid #e8e6e1;"><td style="padding: 8px 14px;">Calculation History</td><td style="padding: 8px 14px; text-align: center;">⚠️ Issues</td><td style="padding: 8px 14px; text-align: center;">3/5</td><td style="padding: 8px 14px;">Performance issues</td></tr>
            <tr style="border-bottom: 1px solid #e8e6e1;"><td style="padding: 8px 14px;">Subscription Flow</td><td style="padding: 8px 14px; text-align: center;">❌ Broken</td><td style="padding: 8px 14px; text-align: center;">0/5</td><td style="padding: 8px 14px;">Critical issues</td></tr>
            <tr style="border-bottom: 1px solid #e8e6e1;"><td style="padding: 8px 14px;">Push Notifications</td><td style="padding: 8px 14px; text-align: center;">⚠️ Issues</td><td style="padding: 8px 14px; text-align: center;">2/5</td><td style="padding: 8px 14px;">iOS 16.7 issues</td></tr>
            <tr style="border-bottom: 1px solid #e8e6e1;"><td style="padding: 8px 14px;">Settings Screen</td><td style="padding: 8px 14px; text-align: center;">⚠️ Issues</td><td style="padding: 8px 14px; text-align: center;">4/5</td><td style="padding: 8px 14px;">Save issues</td></tr>
            <tr style="border-bottom: 1px solid #e8e6e1;"><td style="padding: 8px 14px;">Dark Mode</td><td style="padding: 8px 14px; text-align: center;">❌ Missing</td><td style="padding: 8px 14px; text-align: center;">0/5</td><td style="padding: 8px 14px;">Not implemented</td></tr>
            <tr style="border-bottom: 1px solid #e8e6e1;"><td style="padding: 8px 14px;">Localization</td><td style="padding: 8px 14px; text-align: center;">⚠️ Issues</td><td style="padding: 8px 14px; text-align: center;">3/5</td><td style="padding: 8px 14px;">Truncation issues</td></tr>
            <tr><td style="padding: 8px 14px;">Performance</td><td style="padding: 8px 14px; text-align: center;">⚠️ Issues</td><td style="padding: 8px 14px; text-align: center;">4/5</td><td style="padding: 8px 14px;">Slow on older devices</td></tr>
          </tbody>
        </table>

        <h3 style="font-size: 1.2rem; font-weight: 700; margin-bottom: 12px;">3.2. Devices Tested</h3>
        <table style="width: 100%; border-collapse: collapse; font-size: 0.9rem;">
          <thead>
            <tr style="background: #6c3ce0; color: white;">
              <th style="padding: 10px 14px; text-align: left;">Device</th>
              <th style="padding: 10px 14px; text-align: center;">iOS Version</th>
              <th style="padding: 10px 14px; text-align: center;">Status</th>
              <th style="padding: 10px 14px; text-align: center;">Issues Found</th>
            </tr>
          </thead>
          <tbody>
            <tr style="border-bottom: 1px solid #e8e6e1;"><td style="padding: 8px 14px;">iPhone 14</td><td style="padding: 8px 14px; text-align: center;">iOS 17.5</td><td style="padding: 8px 14px; text-align: center;">⚠️</td><td style="padding: 8px 14px; text-align: center;">6 issues</td></tr>
            <tr style="border-bottom: 1px solid #e8e6e1;"><td style="padding: 8px 14px;">iPhone 15 Pro Max</td><td style="padding: 8px 14px; text-align: center;">iOS 18.0</td><td style="padding: 8px 14px; text-align: center;">⚠️</td><td style="padding: 8px 14px; text-align: center;">4 issues</td></tr>
            <tr style="border-bottom: 1px solid #e8e6e1;"><td style="padding: 8px 14px;">iPhone 13</td><td style="padding: 8px 14px; text-align: center;">iOS 16.7</td><td style="padding: 8px 14px; text-align: center;">🔴</td><td style="padding: 8px 14px; text-align: center;">8 issues</td></tr>
            <tr style="border-bottom: 1px solid #e8e6e1;"><td style="padding: 8px 14px;">iPad Air 5</td><td style="padding: 8px 14px; text-align: center;">iPadOS 17.5</td><td style="padding: 8px 14px; text-align: center;">🔴</td><td style="padding: 8px 14px; text-align: center;">5 issues</td></tr>
            <tr><td style="padding: 8px 14px;">iPad Pro 12.9"</td><td style="padding: 8px 14px; text-align: center;">iPadOS 17.5</td><td style="padding: 8px 14px; text-align: center;">⚠️</td><td style="padding: 8px 14px; text-align: center;">3 issues</td></tr>
          </tbody>
        </table>
      </div>

      <!-- ==================== RECOMMENDATIONS ==================== -->
      <div style="margin-bottom: 40px; page-break-before: avoid;">
        <h2 style="font-size: 1.8rem; font-weight: 800; color: #0d0c1d; margin-bottom: 16px; border-bottom: 2px solid #6c3ce0; padding-bottom: 12px;">
          4. Recommendations
        </h2>

        <h3 style="font-size: 1.2rem; font-weight: 700; margin-bottom: 12px;">4.1. Immediate Actions (Next 48 Hours)</h3>
        <table style="width: 100%; border-collapse: collapse; font-size: 0.9rem; margin-bottom: 24px;">
          <thead>
            <tr style="background: #ff6b4a; color: white;">
              <th style="padding: 10px 14px; text-align: left;">Priority</th>
              <th style="padding: 10px 14px; text-align: left;">Task</th>
              <th style="padding: 10px 14px; text-align: left;">Owner</th>
            </tr>
          </thead>
          <tbody>
            <tr style="border-bottom: 1px solid #e8e6e1;"><td style="padding: 8px 14px;">🔴 Critical</td><td style="padding: 8px 14px;">Fix tab switching crash (CRIT-001)</td><td style="padding: 8px 14px;">iOS Team</td></tr>
            <tr style="border-bottom: 1px solid #e8e6e1;"><td style="padding: 8px 14px;">🔴 Critical</td><td style="padding: 8px 14px;">Fix subscription flow on iPad (CRIT-002)</td><td style="padding: 8px 14px;">iOS Team</td></tr>
            <tr style="border-bottom: 1px solid #e8e6e1;"><td style="padding: 8px 14px;">🔴 Critical</td><td style="padding: 8px 14px;">Fix notification preferences (CRIT-003)</td><td style="padding: 8px 14px;">iOS Team</td></tr>
            <tr><td style="padding: 8px 14px;">🟧 High</td><td style="padding: 8px 14px;">Fix login screen UI (HIGH-002)</td><td style="padding: 8px 14px;">Design Team</td></tr>
          </tbody>
        </table>

        <h3 style="font-size: 1.2rem; font-weight: 700; margin-bottom: 12px;">4.2. Short Term (Next Week)</h3>
        <table style="width: 100%; border-collapse: collapse; font-size: 0.9rem; margin-bottom: 24px;">
          <thead>
            <tr style="background: #f7c948; color: white;">
              <th style="padding: 10px 14px; text-align: left;">Priority</th>
              <th style="padding: 10px 14px; text-align: left;">Task</th>
              <th style="padding: 10px 14px; text-align: left;">Owner</th>
            </tr>
          </thead>
          <tbody>
            <tr style="border-bottom: 1px solid #e8e6e1;"><td style="padding: 8px 14px;">🟧 High</td><td style="padding: 8px 14px;">Improve app launch time (HIGH-001)</td><td style="padding: 8px 14px;">iOS Team</td></tr>
            <tr style="border-bottom: 1px solid #e8e6e1;"><td style="padding: 8px 14px;">🟧 High</td><td style="padding: 8px 14px;">Fix IAP flow (HIGH-003)</td><td style="padding: 8px 14px;">iOS Team</td></tr>
            <tr style="border-bottom: 1px solid #e8e6e1;"><td style="padding: 8px 14px;">🟧 High</td><td style="padding: 8px 14px;">Fix push notifications (HIGH-004)</td><td style="padding: 8px 14px;">Backend Team</td></tr>
            <tr style="border-bottom: 1px solid #e8e6e1;"><td style="padding: 8px 14px;">🟨 Medium</td><td style="padding: 8px 14px;">Fix localization issues (MED-001)</td><td style="padding: 8px 14px;">iOS Team</td></tr>
            <tr><td style="padding: 8px 14px;">🟨 Medium</td><td style="padding: 8px 14px;">Fix keyboard overlap (MED-002)</td><td style="padding: 8px 14px;">iOS Team</td></tr>
          </tbody>
        </table>

        <h3 style="font-size: 1.2rem; font-weight: 700; margin-bottom: 12px;">4.3. Long Term Improvements</h3>
        <table style="width: 100%; border-collapse: collapse; font-size: 0.9rem;">
          <thead>
            <tr style="background: #8b6cf5; color: white;">
              <th style="padding: 10px 14px; text-align: left;">Priority</th>
              <th style="padding: 10px 14px; text-align: left;">Task</th>
              <th style="padding: 10px 14px; text-align: left;">Owner</th>
            </tr>
          </thead>
          <tbody>
            <tr style="border-bottom: 1px solid #e8e6e1;"><td style="padding: 8px 14px;">🟩 Low</td><td style="padding: 8px 14px;">Add haptic feedback (UX-001)</td><td style="padding: 8px 14px;">Design Team</td></tr>
            <tr style="border-bottom: 1px solid #e8e6e1;"><td style="padding: 8px 14px;">🟩 Low</td><td style="padding: 8px 14px;">Improve onboarding (UX-002)</td><td style="padding: 8px 14px;">Design Team</td></tr>
            <tr><td style="padding: 8px 14px;">🟩 Low</td><td style="padding: 8px 14px;">Implement dark mode (UX-003)</td><td style="padding: 8px 14px;">iOS Team</td></tr>
          </tbody>
        </table>
      </div>

      <!-- ==================== APPENDIX ==================== -->
      <div style="margin-bottom: 40px; page-break-before: avoid;">
        <h2 style="font-size: 1.8rem; font-weight: 800; color: #0d0c1d; margin-bottom: 16px; border-bottom: 2px solid #6c3ce0; padding-bottom: 12px;">
          5. Appendix
        </h2>

        <h3 style="font-size: 1.2rem; font-weight: 700; margin-bottom: 12px;">5.1. Test Environment</h3>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px 32px; background: #f8fafc; padding: 16px 20px; border-radius: 12px; border: 1px solid #e8e6e1; margin-bottom: 20px;">
          <div><strong>Testing Period:</strong> August 1-3, 2026</div>
          <div><strong>Total Testing Hours:</strong> 25 hours</div>
          <div><strong>Testers:</strong> 5 QA professionals</div>
          <div><strong>Location:</strong> Remote (South Africa, US, UK, Germany)</div>
        </div>

        <h3 style="font-size: 1.2rem; font-weight: 700; margin-bottom: 12px;">5.2. Testing Methodology</h3>
        <ul style="color: #4a4a5a; font-size: 0.95rem; margin-bottom: 20px; padding-left: 20px;">
          <li><strong>Exploratory Testing:</strong> Testers explored the app freely</li>
          <li><strong>Feature Testing:</strong> Systematic testing of all features</li>
          <li><strong>Regression Testing:</strong> Testing on multiple devices</li>
          <li><strong>Performance Testing:</strong> App launch time, memory usage</li>
          <li><strong>UX Testing:</strong> User experience and feedback collection</li>
          <li><strong>Localization Testing:</strong> Multi-language testing</li>
        </ul>

        <h3 style="font-size: 1.2rem; font-weight: 700; margin-bottom: 12px;">5.3. Tools Used</h3>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 4px 32px; background: #f8fafc; padding: 16px 20px; border-radius: 12px; border: 1px solid #e8e6e1; margin-bottom: 20px;">
          <div><strong>TestFlight:</strong> App distribution</div>
          <div><strong>Crashlytics:</strong> Crash reporting</div>
          <div><strong>Charles Proxy:</strong> Network inspection</div>
          <div><strong>Device Farm:</strong> Device testing</div>
          <div><strong>Notion:</strong> Issue tracking</div>
        </div>

        <h3 style="font-size: 1.2rem; font-weight: 700; margin-bottom: 12px;">5.4. Contact Information</h3>
        <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 8px; background: #f8fafc; padding: 16px 20px; border-radius: 12px; border: 1px solid #e8e6e1;">
          <div><strong>QA Lead:</strong> John Doe<br><span style="font-size: 0.85rem; color: #6b6b7b;">john@testflighttesters.com</span></div>
          <div><strong>Project Manager:</strong> Sarah Smith<br><span style="font-size: 0.85rem; color: #6b6b7b;">sarah@testflighttesters.com</span></div>
          <div><strong>Support:</strong> Support Team<br><span style="font-size: 0.85rem; color: #6b6b7b;">support@testflighttesters.com</span></div>
        </div>
      </div>

      <!-- ==================== SUMMARY ==================== -->
      <div style="margin-bottom: 40px; page-break-before: avoid;">
        <h2 style="font-size: 1.8rem; font-weight: 800; color: #0d0c1d; margin-bottom: 16px; border-bottom: 2px solid #6c3ce0; padding-bottom: 12px;">
          6. Summary
        </h2>

        <h3 style="font-size: 1.2rem; font-weight: 700; margin-bottom: 12px;">6.1. Key Takeaways</h3>
        <ul style="color: #4a4a5a; font-size: 0.95rem; margin-bottom: 20px; padding-left: 20px;">
          <li><strong>Core functionality is solid</strong> - SoulCalc's main features work correctly</li>
          <li><strong>Critical issues need immediate attention</strong> - 3 critical bugs found</li>
          <li><strong>Performance can be improved</strong> - Slow launch on some devices</li>
          <li><strong>Subscription flow is broken</strong> - Needs immediate fix</li>
          <li><strong>UX is good but could be better</strong> - Some improvements suggested</li>
        </ul>

        <h3 style="font-size: 1.2rem; font-weight: 700; margin-bottom: 12px;">6.2. Overall Score</h3>
        <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 12px; background: #f8fafc; padding: 16px 20px; border-radius: 12px; border: 1px solid #e8e6e1; margin-bottom: 16px;">
          <div><strong>Functionality:</strong> 8/10</div>
          <div><strong>UI/UX:</strong> 7/10</div>
          <div><strong>Performance:</strong> 6/10</div>
          <div><strong>Stability:</strong> 6/10</div>
          <div><strong>Accessibility:</strong> 6/10</div>
        </div>
        <div style="text-align: center; padding: 12px; background: #f0f7ff; border-radius: 12px; border: 2px solid #6c3ce0;">
          <span style="font-size: 1.4rem; font-weight: 800; color: #6c3ce0;">Overall Rating: ⭐⭐⭐⭐ (4.2/5)</span>
        </div>

        <h3 style="font-size: 1.2rem; font-weight: 700; margin-top: 20px; margin-bottom: 12px;">6.3. Final Verdict</h3>
        <div style="background: #f8fafc; padding: 16px 20px; border-radius: 12px; border: 1px solid #e8e6e1;">
          <p style="color: #1a1a2e;">SoulCalc is a promising app with solid core functionality. With the critical issues addressed and some UX improvements, it will be ready for App Store submission. We recommend:</p>
          <ol style="color: #4a4a5a; font-size: 0.95rem; padding-left: 20px; margin-top: 8px;">
            <li><strong>Priority:</strong> Fix all critical issues</li>
            <li><strong>Next:</strong> Address high-priority issues</li>
            <li><strong>Then:</strong> Implement UX improvements</li>
          </ol>
        </div>
      </div>

      <!-- ==================== NEXT STEPS ==================== -->
      <div style="margin-bottom: 40px; page-break-before: avoid;">
        <h2 style="font-size: 1.8rem; font-weight: 800; color: #0d0c1d; margin-bottom: 16px; border-bottom: 2px solid #6c3ce0; padding-bottom: 12px;">
          7. Next Steps
        </h2>
        <div style="background: #f8fafc; padding: 20px 24px; border-radius: 16px; border: 1px solid #e8e6e1;">
          <div style="display: flex; align-items: center; gap: 12px; padding: 6px 0;">
            <span style="color: #4cd9b2; font-size: 1.2rem;">✅</span>
            <span>Review this report with your development team</span>
          </div>
          <div style="display: flex; align-items: center; gap: 12px; padding: 6px 0;">
            <span style="color: #ff6b4a; font-size: 1.2rem;">🔴</span>
            <span><strong>Fix critical issues</strong> (CRIT-001, CRIT-002, CRIT-003)</span>
          </div>
          <div style="display: flex; align-items: center; gap: 12px; padding: 6px 0;">
            <span style="color: #f7c948; font-size: 1.2rem;">🟧</span>
            <span><strong>Address high-priority bugs</strong> (HIGH-001 to HIGH-004)</span>
          </div>
          <div style="display: flex; align-items: center; gap: 12px; padding: 6px 0;">
            <span style="color: #4cd9b2; font-size: 1.2rem;">🟨</span>
            <span>Plan for medium-priority fixes</span>
          </div>
          <div style="display: flex; align-items: center; gap: 12px; padding: 6px 0;">
            <span style="color: #8b6cf5; font-size: 1.2rem;">🟩</span>
            <span>Consider UX improvements</span>
          </div>
          <div style="display: flex; align-items: center; gap: 12px; padding: 6px 0; border-top: 1px solid #e8e6e1; margin-top: 8px; padding-top: 12px;">
            <span style="color: #6c3ce0; font-size: 1.2rem;">📱</span>
            <span><strong>Resubmit for testing</strong> after fixes are implemented</span>
          </div>
        </div>
      </div>

      <!-- ==================== FOOTER ==================== -->
      <div style="text-align: center; padding: 32px 0 16px; border-top: 2px solid #6c3ce0; background: #faf9f6; border-radius: 16px;">
        <div style="font-size: 1.6rem; font-weight: 800; color: #0d0c1d; margin-bottom: 8px;">
          TestFlight<span style="background: #6c3ce0; color: white; padding: 2px 12px; border-radius: 40px; font-size: 0.9rem;">Testers</span>
        </div>
        <p style="font-size: 1rem; color: #6b6b7b; margin-bottom: 16px;">
          We're committed to helping you launch a high-quality iOS app.
        </p>
        <div style="display: flex; justify-content: center; gap: 24px; flex-wrap: wrap; font-size: 0.9rem; color: #6b6b7b;">
          <span>📧 <a href="mailto:support@testflighttesters.com" style="color: #6c3ce0; text-decoration: none;">support@testflighttesters.com</a></span>
          <span>📱 <a href="https://wa.me/27606393302" style="color: #6c3ce0; text-decoration: none;">+27 60 639 3302</a></span>
          <span>🌐 <a href="https://testflighttesters.com" style="color: #6c3ce0; text-decoration: none;">testflighttesters.com</a></span>
        </div>
        <div style="margin-top: 16px; padding: 12px; background: #f8fafc; border-radius: 8px; border: 1px solid #e8e6e1; font-size: 0.8rem; color: #6b6b7b;">
          <p style="margin: 0;"><strong>Confidential</strong> — This report is intended solely for the individual or entity to whom it is addressed.</p>
          <p style="margin: 4px 0 0 0;">© ${new Date().getFullYear()} TestFlightTesters. All rights reserved.</p>
          <p style="margin: 4px 0 0 0; font-size: 0.75rem;">Report Generated: ${data.reportDate} | Version: 1.0 | Pages: 7</p>
        </div>
      </div>

    </div>
  `;
}
