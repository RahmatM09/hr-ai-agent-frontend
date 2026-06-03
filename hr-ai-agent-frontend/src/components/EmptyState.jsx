import Button from './Button.jsx'

function EmptyState({ title, message, actionLabel, actionTo }) {
  return (
    <section className="empty-state">
      <h1>{title}</h1>
      <p>{message}</p>
      {actionLabel && actionTo && (
        <Button to={actionTo} variant="secondary">
          {actionLabel}
        </Button>
      )}
    </section>
  )
}

export default EmptyState
