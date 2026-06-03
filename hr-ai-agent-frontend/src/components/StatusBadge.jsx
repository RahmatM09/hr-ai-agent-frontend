function StatusBadge({ status }) {
  const normalizedStatus = String(status).toLowerCase()
  const label =
    normalizedStatus === 'true'
      ? 'Open'
      : normalizedStatus.replace('-', ' ')

  return (
    <span className={`status-badge status-${normalizedStatus}`}>
      {label}
    </span>
  )
}

export default StatusBadge
