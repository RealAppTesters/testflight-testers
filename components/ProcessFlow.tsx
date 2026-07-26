export default function ProcessFlow() {
  const steps = [
    { icon: "fa-code", label: "Developer" },
    { icon: "fa-link", label: "TestFlight Link" },
    { icon: "fa-users", label: "QA Team" },
    { icon: "fa-tablet-alt", label: "Real Devices" },
    { icon: "fa-file-alt", label: "Reports" },
    { icon: "fa-app-store", label: "App Store" },
  ];

  return (
    <div className="process-flow">
      {steps.map((step, index) => (
        <>
          <div className="process-step" key={index}>
            <div className="icon-circle"><i className={`fas ${step.icon}`}></i></div>
            <span className="label">{step.label}</span>
          </div>
          {index < steps.length - 1 && (
            <div className="process-arrow"><i className="fas fa-arrow-right"></i></div>
          )}
        </>
      ))}
    </div>
  );
}
