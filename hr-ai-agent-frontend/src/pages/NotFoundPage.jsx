import EmptyState from '../components/EmptyState.jsx'

function NotFoundPage() {
  return (
    <EmptyState
      title="Page not found"
      message="The route you opened does not exist in this frontend template."
      actionLabel="Back to home"
      actionTo="/"
    />
  )
}

export default NotFoundPage
