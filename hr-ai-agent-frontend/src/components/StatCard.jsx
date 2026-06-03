function StatCard({ label, value, helper }) {
  return (
    <article className="stat-card">
      <p>{label}</p>
      <strong>{value}</strong>
      {helper && <span>{helper}</span>}
    </article>
  )
}

export default StatCard
