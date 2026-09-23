import Link from "next/link";

export default function TestingTypes() {
  const types = [
    {
      icon: "fa-cogs",
      h3: "iOS App Functionality Testing",
      title: "App Functionality",
      price: "$10 / tester / hour",
      description:
        "Our testers verify that every feature in your iOS app works as expected. They follow your user flows step by step, tap every button, and validate that core functionality performs correctly on real iPhones and iPads — not simulators.",
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
      h3: "iOS UX Testing",
      title: "User Experience",
      price: "$10 / tester / hour",
      description:
        "Real iPhone and iPad users evaluate how intuitive and enjoyable your app feels. They provide honest feedback on design, navigation flow, and overall user satisfaction — the kind of insight you can only get from real people using real devices.",
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
      h3: "iOS Bug Testing",
      title: "Bug Hunting",
      price: "$10 / tester / hour",
      description:
        "Testers actively hunt for bugs, crashes, and edge-case issues inside your TestFlight build. Every bug is documented with clear steps to reproduce, screenshots, and device details so your team can fix it fast.",
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
      h3: "iPhone Performance Testing",
      title: "Performance",
      price: "$10 / tester / hour",
      description:
        "We measure how your iOS app performs under real-world conditions. Testers report on launch speed, responsiveness, memory usage, and battery impact across multiple iPhone and iPad models so you can optimize before launch.",
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
      h3: "iOS Localization Testing",
      title: "Localization",
      price: "$10 / tester / hour",
      description:
        "Our testers verify your iOS app works correctly across different languages and regions. They check translation accuracy, date and number formatting, text truncation, and cultural appropriateness before you ship globally.",
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
      h3: "iOS Accessibility Testing",
      title: "Accessibility",
      price: "$10 / tester / hour",
      description:
        "We test your iOS app with VoiceOver, Dynamic Type, and other accessibility features to ensure it's usable by everyone. Accessibility is not just good practice — it expands your audience and helps with App Store approval.",
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
    <section>
      <h2 className="section-title">
        <span className="stripe"></span> What Do TestFlight Testers Test?
      </h2>
      <p className="section-sub">
        Every testing type is performed by real testers on real Apple devices. 
        Here's exactly what our iOS app testers check inside your TestFlight build.
      </p>

      <div className="testing-types-grid">
        {types.map((type, index) => (
          <div className="testing-type-card" key={index}>
            <div className="icon">
              <i className={`fas ${type.icon}`}></i>
            </div>
            <h3 className="testing-type-h3">{type.h3}</h3>
            <h4>{type.title}</h4>
            <div className="price-badge">{type.price}</div>
            <p>{type.description}</p>
            <ul>
              {type.items.map((item, i) => (
                <li key={i}>
                  <i className="fas fa-check"></i> {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <p className="testing-types-cta">
        Want to know more? Read our guides on{" "}
        <Link href="/testflight-testers" className="testing-types-link">
          TestFlight testers
        </Link>{" "}
        and{" "}
        <Link href="/ios-app-testing" className="testing-types-link">
          iOS app testing
        </Link>
        .
      </p>
    </section>
  );
}
