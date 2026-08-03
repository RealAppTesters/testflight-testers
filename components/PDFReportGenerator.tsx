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
  reportDate: string;
}

export default function PDFReportGenerator() {
  const [isGenerating, setIsGenerating] = useState(false);

  const sampleData: ReportData = {
    orderId: "TFT-123456-ABC",
    appName: "SoulCalc",
    testingType: "Comprehensive QA",
    testers: 5,
    hours: 5,
    devices: ["iPhone 14", "iPhone 15 Pro Max", "iPhone 13", "iPad Air 5", "iPad Pro 12.9"],
    reportDate: new Date().toLocaleDateString("en-US", { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    }),
  };

  // Sample data for charts
  const bugData = {
    critical: 3,
    high: 12,
    medium: 18,
    low: 14,
  };

  const performanceData = {
    launchTime: 4.3,
    memoryUsage: 245,
    batteryImpact: 12,
    networkRequests: 47,
  };

  const deviceScores = [
    { device: "iPhone 14", score: 7 },
    { device: "iPhone 15 Pro Max", score: 8 },
    { device: "iPhone 13", score: 5 },
    { device: "iPad Air 5", score: 6 },
    { device: "iPad Pro 12.9", score: 7 },
  ];

  const totalBugs = bugData.critical + bugData.high + bugData.medium + bugData.low;

  const generatePDF = async () => {
    setIsGenerating(true);
    
    try {
      // Create a temporary container for the PDF content
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
      
      container.innerHTML = getReportHTML(sampleData, bugData, performanceData, deviceScores, totalBugs);
      document.body.appendChild(container);

      // Wait for fonts and images to load
      await new Promise(resolve => setTimeout(resolve, 1000));

      const canvas = await html2canvas(container, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff',
        width: 1200,
        height: container.scrollHeight,
      });

      // Remove temporary container
      document.body.removeChild(container);

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = 210;
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      // Add image to PDF
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);

      // Handle multiple pages if needed
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
        style={{
          width: '100%',
          justifyContent: 'center',
          padding: '16px 40px',
          fontSize: '1.1rem',
          background: isGenerating ? '#8b6cf5' : '#6c3ce0',
          cursor: isGenerating ? 'not-allowed' : 'pointer',
        }}
      >
        {isGenerating ? (
          <>
            <i className="fas fa-spinner fa-spin"></i> Generating PDF...
          </>
        ) : (
          <>
            <i className="fas fa-file-pdf"></i> Download QA Report PDF
          </>
        )}
      </button>
    </div>
  );
}

function getReportHTML(data: ReportData, bugs: any, performance: any, deviceScores: any[], totalBugs: number): string {
  return `
    <div style="max-width: 1100px; margin: 0 auto; background: white; border-radius: 24px;">
      <!-- Header -->
      <div style="text-align: center; margin-bottom: 40px; padding-bottom: 30px; border-bottom: 2px solid #e8e6e1;">
        <div style="font-size: 2rem; font-weight: 800; color: #0d0c1d; margin-bottom: 4px;">
          TestFlight<span style="background: #6c3ce0; color: white; padding: 2px 12px; border-radius: 40px; font-size: 0.8rem;">Testers</span>
        </div>
        <h1 style="font-size: 2.8rem; font-weight: 800; color: #0d0c1d; margin: 16px 0 4px; letter-spacing: -0.03em;">
          QA Testing Report
        </h1>
        <p style="color: #6b6b7b; font-size: 1.1rem;">Professional iOS App Testing Report</p>
        <div style="margin-top: 16px; display: flex; justify-content: center; gap: 40px; flex-wrap: wrap; font-size: 0.95rem; color: #6b6b7b;">
          <span><strong style="color: #1a1a2e;">Order:</strong> ${data.orderId}</span>
          <span><strong style="color: #1a1a2e;">Date:</strong> ${data.reportDate}</span>
          <span><strong style="color: #1a1a2e;">App:</strong> ${data.appName}</span>
        </div>
      </div>

      <!-- Overview Grid -->
      <div style="display: grid; grid-template-columns: 1fr 1fr 1fr 1fr; gap: 16px; margin-bottom: 40px;">
        <div style="background: #f8fafc; padding: 20px; border-radius: 16px; text-align: center; border: 1px solid #e8e6e1;">
          <div style="font-size: 2rem; font-weight: 800; color: #6c3ce0;">${totalBugs}</div>
          <div style="font-size: 0.85rem; color: #6b6b7b;">Total Issues</div>
        </div>
        <div style="background: #f8fafc; padding: 20px; border-radius: 16px; text-align: center; border: 1px solid #e8e6e1;">
          <div style="font-size: 2rem; font-weight: 800; color: #ff6b4a;">${bugs.critical}</div>
          <div style="font-size: 0.85rem; color: #6b6b7b;">Critical Issues</div>
        </div>
        <div style="background: #f8fafc; padding: 20px; border-radius: 16px; text-align: center; border: 1px solid #e8e6e1;">
          <div style="font-size: 2rem; font-weight: 800; color: #f7c948;">${bugs.high}</div>
          <div style="font-size: 0.85rem; color: #6b6b7b;">High Priority</div>
        </div>
        <div style="background: #f8fafc; padding: 20px; border-radius: 16px; text-align: center; border: 1px solid #e8e6e1;">
          <div style="font-size: 2rem; font-weight: 800; color: #4cd9b2;">${bugs.medium + bugs.low}</div>
          <div style="font-size: 0.85rem; color: #6b6b7b;">Medium/Low Priority</div>
        </div>
      </div>

      <!-- Charts Section -->
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 30px; margin-bottom: 40px;">
        <!-- Bug Distribution Chart -->
        <div style="background: #f8fafc; padding: 24px; border-radius: 16px; border: 1px solid #e8e6e1;">
          <h3 style="font-size: 1.1rem; font-weight: 700; margin-bottom: 16px;">Bug Distribution</h3>
          <div style="display: flex; flex-direction: column; gap: 10px;">
            <div><div style="display: flex; justify-content: space-between; font-size: 0.9rem; margin-bottom: 2px;"><span>Critical</span><span>${bugs.critical}</span></div><div style="background: #e8e6e1; height: 8px; border-radius: 40px; overflow: hidden;"><div style="background: #ff6b4a; height: 100%; width: ${(bugs.critical/totalBugs)*100}%;"></div></div></div>
            <div><div style="display: flex; justify-content: space-between; font-size: 0.9rem; margin-bottom: 2px;"><span>High</span><span>${bugs.high}</span></div><div style="background: #e8e6e1; height: 8px; border-radius: 40px; overflow: hidden;"><div style="background: #f7c948; height: 100%; width: ${(bugs.high/totalBugs)*100}%;"></div></div></div>
            <div><div style="display: flex; justify-content: space-between; font-size: 0.9rem; margin-bottom: 2px;"><span>Medium</span><span>${bugs.medium}</span></div><div style="background: #e8e6e1; height: 8px; border-radius: 40px; overflow: hidden;"><div style="background: #4cd9b2; height: 100%; width: ${(bugs.medium/totalBugs)*100}%;"></div></div></div>
            <div><div style="display: flex; justify-content: space-between; font-size: 0.9rem; margin-bottom: 2px;"><span>Low</span><span>${bugs.low}</span></div><div style="background: #e8e6e1; height: 8px; border-radius: 40px; overflow: hidden;"><div style="background: #8b6cf5; height: 100%; width: ${(bugs.low/totalBugs)*100}%;"></div></div></div>
          </div>
        </div>

        <!-- Device Scores -->
        <div style="background: #f8fafc; padding: 24px; border-radius: 16px; border: 1px solid #e8e6e1;">
          <h3 style="font-size: 1.1rem; font-weight: 700; margin-bottom: 16px;">Device Testing Scores</h3>
          ${deviceScores.map(d => `
            <div style="margin-bottom: 12px;">
              <div style="display: flex; justify-content: space-between; font-size: 0.9rem; margin-bottom: 2px;">
                <span>${d.device}</span>
                <span>${d.score}/10</span>
              </div>
              <div style="background: #e8e6e1; height: 6px; border-radius: 40px; overflow: hidden;">
                <div style="background: ${d.score >= 7 ? '#4cd9b2' : d.score >= 5 ? '#f7c948' : '#ff6b4a'}; height: 100%; width: ${d.score * 10}%;"></div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- Performance Metrics -->
      <div style="display: grid; grid-template-columns: 1fr 1fr 1fr 1fr; gap: 16px; margin-bottom: 40px;">
        <div style="background: #f8fafc; padding: 16px; border-radius: 12px; text-align: center; border: 1px solid #e8e6e1;">
          <div style="font-size: 1.8rem; font-weight: 800; color: #6c3ce0;">${performance.launchTime}s</div>
          <div style="font-size: 0.8rem; color: #6b6b7b;">Launch Time</div>
        </div>
        <div style="background: #f8fafc; padding: 16px; border-radius: 12px; text-align: center; border: 1px solid #e8e6e1;">
          <div style="font-size: 1.8rem; font-weight: 800; color: #6c3ce0;">${performance.memoryUsage}MB</div>
          <div style="font-size: 0.8rem; color: #6b6b7b;">Memory Usage</div>
        </div>
        <div style="background: #f8fafc; padding: 16px; border-radius: 12px; text-align: center; border: 1px solid #e8e6e1;">
          <div style="font-size: 1.8rem; font-weight: 800; color: #6c3ce0;">${performance.batteryImpact}%</div>
          <div style="font-size: 0.8rem; color: #6b6b7b;">Battery Impact</div>
        </div>
        <div style="background: #f8fafc; padding: 16px; border-radius: 12px; text-align: center; border: 1px solid #e8e6e1;">
          <div style="font-size: 1.8rem; font-weight: 800; color: #6c3ce0;">${performance.networkRequests}</div>
          <div style="font-size: 0.8rem; color: #6b6b7b;">API Calls</div>
        </div>
      </div>

      <!-- Critical Issues -->
      <div style="margin-bottom: 40px;">
        <h2 style="font-size: 1.6rem; font-weight: 700; margin-bottom: 16px; color: #ff6b4a;">
          Critical Issues
        </h2>
        <div style="background: #fff5f3; padding: 20px; border-radius: 16px; border-left: 4px solid #ff6b4a;">
          <div style="margin-bottom: 12px;">
            <strong>CRIT-001:</strong> App Crash on Rapid Tab Switching
            <div style="font-size: 0.9rem; color: #6b6b7b; margin-top: 4px;">iPhone 13 · iOS 16.7 · Memory pressure issue</div>
          </div>
          <div style="margin-bottom: 12px;">
            <strong>CRIT-002:</strong> Subscription Flow Failure on iPad
            <div style="font-size: 0.9rem; color: #6b6b7b; margin-top: 4px;">iPad Air 5 · iPadOS 17.5 · StoreKit configuration</div>
          </div>
          <div>
            <strong>CRIT-003:</strong> Notification Preferences Not Saving
            <div style="font-size: 0.9rem; color: #6b6b7b; margin-top: 4px;">All Devices · UserDefaults persistence</div>
          </div>
        </div>
      </div>

      <!-- Devices Tested -->
      <div style="margin-bottom: 40px;">
        <h2 style="font-size: 1.6rem; font-weight: 700; margin-bottom: 16px;">Devices Tested</h2>
        <div style="display: flex; flex-wrap: wrap; gap: 12px;">
          ${data.devices.map(device => `
            <span style="background: #f8fafc; padding: 8px 20px; border-radius: 40px; border: 1px solid #e8e6e1; font-size: 0.95rem;">
              ${device}
            </span>
          `).join('')}
        </div>
      </div>

      <!-- Summary -->
      <div style="background: #f8fafc; padding: 24px; border-radius: 16px; margin-bottom: 30px; border: 1px solid #e8e6e1;">
        <h3 style="font-size: 1.2rem; font-weight: 700; margin-bottom: 12px;">📋 Summary</h3>
        <p style="color: #6b6b7b; margin-bottom: 8px;">
          <strong style="color: #1a1a2e;">Core functionality is solid</strong> - SoulCalc's main features work correctly on most devices.
        </p>
        <p style="color: #6b6b7b; margin-bottom: 8px;">
          <strong style="color: #1a1a2e;">Critical issues need immediate attention</strong> - 3 critical bugs found that block core features.
        </p>
        <p style="color: #6b6b7b; margin-bottom: 8px;">
          <strong style="color: #1a1a2e;">Subscription flow is broken</strong> - Needs immediate fix before App Store submission.
        </p>
        <p style="color: #6b6b7b;">
          <strong style="color: #1a1a2e;">UX is good but could be better</strong> - Some improvements suggested.
        </p>
      </div>

      <!-- Footer -->
      <div style="text-align: center; padding-top: 24px; border-top: 2px solid #e8e6e1; color: #6b6b7b; font-size: 0.9rem;">
        <p style="margin-bottom: 8px;">
          <strong style="color: #1a1a2e;">Need help?</strong> Contact us:
        </p>
        <p>
          📧 support@testflighttesters.com &nbsp;|&nbsp; 📱 +27 60 639 3302 &nbsp;|&nbsp; 🌐 testflighttesters.com
        </p>
        <p style="margin-top: 12px; font-size: 0.8rem;">
          © ${new Date().getFullYear()} TestFlightTesters. All rights reserved.
        </p>
      </div>
    </div>
  `;
}
