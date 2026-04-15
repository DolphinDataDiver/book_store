export function PageIntro({ eyebrow, title, description, countLabel, children }) {
  return (
    <section className="page-intro panel-wide">
      <div>
        <p className="section-label">{eyebrow}</p>
        <h2>{title}</h2>
        <p>{description}</p>
        {children}
      </div>
      {countLabel ? <span className="count-badge">{countLabel}</span> : null}
    </section>
  );
}

export function MetricCard({ label, value }) {
  return (
    <div className="metric-card">
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

export function AdminOnlyPanel() {
  return (
    <section className="panel panel-wide">
      <div className="panel-heading">
        <div>
          <p className="section-label">Admin</p>
          <h3>Write Access Required</h3>
        </div>
      </div>
      <p className="helper-text">
        You are signed in with read-only permissions. Use the <span className="mono">admin</span>{" "}
        account to create, update, or delete records.
      </p>
    </section>
  );
}

export function DetailCard({ title, items }) {
  return (
    <div className="detail-card">
      <h3>{title}</h3>
      <dl>
        {items
          .filter(([, value]) => value !== null && value !== undefined && value !== "")
          .map(([label, value]) => (
            <div key={label} className="detail-row">
              <dt>{label}</dt>
              <dd>{String(value)}</dd>
            </div>
          ))}
      </dl>
    </div>
  );
}
