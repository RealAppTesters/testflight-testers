"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function PricingCalculator() {
  const router = useRouter();
  const [selectedType, setSelectedType] = useState("functionality");
  const [testers, setTesters] = useState(5);
  const [hours, setHours] = useState(1);
  const [delivery, setDelivery] = useState("standard");

  const BASE_RATE = 10;

  const testTypes = [
    { id: "functionality", label: "App functionality" },
    { id: "ux", label: "User experience" },
    { id: "bug", label: "Bug hunting" },
    { id: "performance", label: "Performance" },
    { id: "localization", label: "Localization" },
    { id: "accessibility", label: "Accessibility" },
  ];

  const typeLabels: Record<string, string> = {
    functionality: "Functional Testing",
    ux: "UX Testing",
    bug: "Bug Hunting",
    performance: "Performance Testing",
    localization: "Localization Testing",
    accessibility: "Accessibility Testing",
  };

  const deliveryNames: Record<string, string> = {
    standard: "Standard (2-3 days)",
    priority: "Priority (+$2/tester)",
    express: "Express (+$5/tester)",
  };

  const deliverySurcharges: Record<string, number> = {
    standard: 0,
    priority: 2,
    express: 5,
  };

  const surcharge = deliverySurcharges[delivery] || 0;
  const perTester = BASE_RATE * hours + surcharge;
  const total = perTester * testers;

  const handleStartTesting = () => {
    // Store order details in sessionStorage for the payment page
    const orderData = {
      type: selectedType,
      typeLabel: typeLabels[selectedType],
      testers,
      hours,
      delivery,
      perTester,
      total,
      currency: "USD",
    };
    sessionStorage.setItem("orderData", JSON.stringify(orderData));
    router.push("/payment");
  };

  return (
    <div className="calculator-wrap">
      <div className="calc-grid">
        <div>
          <div className="calc-field">
            <label>Select Testing Type</label>
            <div className="test-radio-group">
              {testTypes.map((type) => (
                <label key={type.id} className={selectedType === type.id ? "selected" : ""}>
                  <input
                    type="radio"
                    name="testType"
                    value={type.id}
                    checked={selectedType === type.id}
                    onChange={() => setSelectedType(type.id)}
                  />
                  <span>{type.label}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="calc-field">
            <label>Number of Testers</label>
            <div className="tester-control">
              <button onClick={() => setTesters(Math.max(1, testers - 1))}>−</button>
              <input
                type="number"
                value={testers}
                onChange={(e) => setTesters(Math.max(1, parseInt(e.target.value) || 1))}
                min="1"
                max="200"
              />
              <button onClick={() => setTesters(Math.min(200, testers + 1))}>+</button>
            </div>
          </div>

          <div className="calc-field">
            <label>Hours per Tester</label>
            <div className="hours-control">
              <button onClick={() => setHours(Math.max(1, hours - 1))}>−</button>
              <input
                type="number"
                value={hours}
                onChange={(e) => setHours(Math.max(1, parseInt(e.target.value) || 1))}
                min="1"
                max="10"
              />
              <button onClick={() => setHours(Math.min(10, hours + 1))}>+</button>
            </div>
          </div>

          <div className="calc-field">
            <label>Delivery Speed</label>
            <div className="delivery-options">
              {["standard", "priority", "express"].map((value) => (
                <label key={value}>
                  <input
                    type="radio"
                    name="delivery"
                    value={value}
                    checked={delivery === value}
                    onChange={() => setDelivery(value)}
                  />
                  <span>
                    {value === "standard"
                      ? "Standard"
                      : value === "priority"
                      ? "Priority (+$2/tester)"
                      : "Express (+$5/tester)"}
                  </span>
                </label>
              ))}
            </div>
          </div>
        </div>

        <div>
          <div className="calc-result">
            <div className="row">
              <span>Testing type</span>
              <span style={{ fontWeight: 600 }}>{typeLabels[selectedType]}</span>
            </div>
            <div className="row">
              <span>Price per tester</span>
              <span>${perTester}</span>
            </div>
            <div className="row">
              <span>Testers</span>
              <span>{testers}</span>
            </div>
            <div className="row">
              <span>Hours per tester</span>
              <span>{hours}</span>
            </div>
            <div className="row">
              <span>Delivery</span>
              <span>{deliveryNames[delivery]}</span>
            </div>
            <div className="row total">
              <span>Total</span>
              <span className="price">${total}</span>
            </div>
            <div className="breakdown">
              <span>{typeLabels[selectedType]}</span>
              <span>{hours}h × ${BASE_RATE} = ${BASE_RATE * hours}/tester</span>
              {surcharge > 0 && <span>Delivery surcharge: +${surcharge}/tester</span>}
              <span>{testers} testers × ${perTester} = ${total}</span>
            </div>
            <button className="btn-primary" onClick={handleStartTesting}>
              <i className="fas fa-rocket"></i> Start Testing
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
