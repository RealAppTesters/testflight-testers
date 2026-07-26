"use client";

import { useState, useEffect } from "react";

interface TestType {
  id: string;
  label: string;
  checked: boolean;
}

export default function PricingCalculator() {
  const [testTypes, setTestTypes] = useState<TestType[]>([
    { id: "functionality", label: "App functionality", checked: true },
    { id: "ux", label: "User experience", checked: true },
    { id: "bug", label: "Bug hunting", checked: true },
    { id: "performance", label: "Performance", checked: false },
    { id: "localization", label: "Localization", checked: false },
    { id: "accessibility", label: "Accessibility", checked: false },
  ]);

  const [testers, setTesters] = useState(5);
  const [hours, setHours] = useState(1);
  const [delivery, setDelivery] = useState("standard");

  const BASE_RATE = 10;
  const typeLabels: Record<string, string> = {
    functionality: "Functional",
    ux: "UX",
    bug: "Bug Hunting",
    performance: "Performance",
    localization: "Localization",
    accessibility: "Accessibility",
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

  const handleCheckboxChange = (id: string) => {
    setTestTypes((prev) =>
      prev.map((type) =>
        type.id === id ? { ...type, checked: !type.checked } : type
      )
    );
  };

  const getCheckedTypes = () => testTypes.filter((t) => t.checked);
  const numTypes = getCheckedTypes().length || 1;
  const surcharge = deliverySurcharges[delivery] || 0;
  const perTester = BASE_RATE * numTypes * hours + surcharge;
  const total = perTester * testers;

  const typeNames = getCheckedTypes()
    .map((t) => typeLabels[t.id] || t.id)
    .join(", ");

  return (
    <div className="calculator-wrap">
      <div className="calc-grid">
        <div>
          <div className="calc-field">
            <label>What do you want tested? (select all that apply)</label>
            <div className="test-checkboxes">
              {testTypes.map((type) => (
                <label key={type.id}>
                  <input
                    type="checkbox"
                    checked={type.checked}
                    onChange={() => handleCheckboxChange(type.id)}
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
            <label>Hours per Tester (per testing type)</label>
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
                  <span>{value === "standard" ? "Standard" : value === "priority" ? "Priority (+$2/tester)" : "Express (+$5/tester)"}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        <div>
          <div className="calc-result">
            <div className="row"><span>Base price per tester</span><span>${perTester}</span></div>
            <div className="row"><span>Testers</span><span>{testers}</span></div>
            <div className="row"><span>Hours per tester</span><span>{hours}</span></div>
            <div className="row"><span>Testing types</span><span>{numTypes}</span></div>
            <div className="row"><span>Delivery</span><span>{deliveryNames[delivery]}</span></div>
            <div className="row total">
              <span>Total</span>
              <span className="price">${total}</span>
            </div>
            <div className="breakdown">
              <span>{numTypes} types: {typeNames || "None selected"}</span>
              <span>{hours}h per type × ${BASE_RATE} = ${BASE_RATE * numTypes * hours}/tester</span>
              {surcharge > 0 && <span>Delivery surcharge: +${surcharge}/tester</span>}
              <span>{testers} testers × ${perTester} = ${total}</span>
            </div>
            <a href="#" className="btn-primary">
              <i className="fas fa-rocket"></i> Start Testing
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
