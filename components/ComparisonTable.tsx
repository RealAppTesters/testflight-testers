export default function ComparisonTable() {
  const rows = [
    { label: "Feedback quality", friend: "Random feedback", us: "✓ Structured QA" },
    { label: "Devices tested", friend: "One device", us: "✓ Multiple devices" },
    { label: "Bug reports", friend: "✗ No bug reports", us: "✓ Professional reports" },
    { label: "Availability", friend: "Limited availability", us: "✓ On-demand testing" },
    { label: "Tracking & organization", friend: "✗ No tracking", us: "✓ Organized results", highlight: true },
  ];

  return (
    <div className="compare-wrap">
      <table>
        <thead>
          <tr>
            <th></th>
            <th>Friends</th>
            <th>TestFlightTesters</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={index} className={row.highlight ? "highlight-row" : ""}>
              <td>{row.label}</td>
              <td>{row.friend}</td>
              <td><span className={row.us.includes("✓") ? "check" : "cross"}>{row.us}</span></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
