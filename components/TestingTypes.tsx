export default function TestingTypes() {
  const types = [
    {
      icon: "fa-cogs",
      title: "App Functionality",
      price: "$10 / tester / hour",
      description:
        "Testers verify that every feature works as expected. They follow your user flows, click every button, and validate core functionality.",
      items: [
        "Onboarding & sign-up flows",
        "Core feature validation",
        "Navigation & transitions",
        "Data input & processing",
        "Error handling validation",
      ],
    },
    {
      icon: "fa-users",
      title: "User Experience",
      price: "$10 / tester / hour",
      description:
        "Testers evaluate how intuitive and enjoyable your app is. They provide feedback on design, flow, and overall user satisfaction.",
      items: [
        "Design & visual feedback",
        "Flow & navigation suggestions",
        "Usability scoring",
        "Confusion & friction points",
        "Feature discovery validation",
      ],
    },
    {
      icon: "fa-bug",
      title: "Bug Hunting",
      price: "$10 / tester / hour",
      description:
        "Testers actively search for bugs, crashes, and edge-case issues. They document every issue with steps to reproduce and screenshots.",
      items: [
        "Crash detection & reporting",
        "Edge-case validation",
        "Reproducible bug documentation",
        "Device-specific issues",
        "Performance bottlenecks",
      ],
    },
    {
      icon: "fa-tachometer-alt",
      title: "Performance",
      price: "$10 / tester / hour",
      description:
        "Testers measure and report on app speed, responsiveness, and resource usage across different devices and conditions.",
      items: [
        "App launch time",
        "Screen transition speed",
        "Memory usage reporting",
        "Battery impact assessment",
        "Network request timing",
      ],
    },
    {
      icon: "fa-globe",
      title: "Localization",
      price: "$10 / tester / hour",
      description:
        "Testers verify that your app works correctly in different languages and regions. They check translations, formatting, and cultural nuances.",
      items: [
        "Translation accuracy",
        "Date & time formatting",
        "Currency & number formats",
        "Text truncation & layout",
        "Cultural appropriateness",
      ],
    },
    {
      icon: "fa-universal-access",
      title: "Accessibility",
      price: "$10 / tester / hour",
      description:
        "Testers ensure your app is usable by everyone, including people with disabilities. They test with VoiceOver, Dynamic Type, and more.",
      items: [
        "VoiceOver compatibility",
        "Dynamic Type scaling",
        "Color contrast validation",
        "Touch target sizing",
        "Accessibility labels",
      ],
    },
  ];

  return (
    <div className="testing-types-grid">
      {types.map((type, index) => (
        <div className="testing-type-card" key={index}>
          <div className="icon"><i className={`fas ${type.icon}`}></i></div>
          <h4>{type.title}</h4>
          <div className="price-badge">{type.price}</div>
          <p>{type.description}</p>
          <ul>
            {type.items.map((item, i) => (
              <li key={i}><i className="fas fa-check"></i> {item}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
