export default function SummaryCards({ books }) {
  const copies = books.reduce((s, b) => s + b.quantity, 0);
  const stats = [
    { label: "Total titles", value: books.length, icon: "bi-collection" },
    { label: "Available", value: books.filter((b) => b.status === "Available").length, icon: "bi-check2-circle" },
    { label: "Issued", value: books.filter((b) => b.status === "Issued").length, icon: "bi-arrow-left-right" },
    { label: "Total copies", value: copies, icon: "bi-stack" },
  ];
  return (
    <div className="row g-3 stats-row">
      {stats.map((s) => (
        <div className="col-6 col-lg-3" key={s.label}>
          <div className="stat">
            <i className={`bi ${s.icon} stat-icon`}></i>
            <div>
              <div className="stat-value">{s.value}</div>
              <div className="stat-label">{s.label}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
