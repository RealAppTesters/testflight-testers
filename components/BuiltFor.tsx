export default function BuiltFor() {
  const items = [
    { title: "Indie Developers", desc: "Professional QA without the agency cost" },
    { title: "Startups", desc: "Ship faster with real user feedback" },
    { title: "Agencies", desc: "White-label QA for your clients" },
    { title: "Enterprise Teams", desc: "Scale QA across multiple apps" },
  ];

  return (
    <div className="built-for">
      {items.map((item, index) => (
        <div className="built-item" key={index}>
          <div className="stars">★★★★★</div>
          <h4>{item.title}</h4>
          <p>{item.desc}</p>
        </div>
      ))}
    </div>
  );
}
