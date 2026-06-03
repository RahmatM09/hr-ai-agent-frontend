import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { loginRecruiter } from '../../api/authApi.js'
import Button from '../../components/Button.jsx'
import PageHeader from '../../components/PageHeader.jsx'

function RecruiterLoginPage() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  async function handleSubmit(event) {
    event.preventDefault()
    setError('')

    try {
      setIsSubmitting(true)
      await loginRecruiter({ email, password })
      navigate('/recruiter/dashboard')
    } catch (apiError) {
      setError(apiError.message || 'Could not log in.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="auth-page">
      <PageHeader
        eyebrow="Recruiter login"
        title="Access hiring dashboard"
        description="Log in with your recruiter account to access private dashboard data."
      />

      <form className="form-card auth-card" onSubmit={handleSubmit}>
        <label>
          Email
          <input
            disabled={isSubmitting}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="recruiter@example.com"
            required
            type="email"
            value={email}
          />
        </label>
        <label>
          Password
          <input
            disabled={isSubmitting}
            onChange={(event) => setPassword(event.target.value)}
            required
            type="password"
            value={password}
          />
        </label>

        {error && <p className="form-error">{error}</p>}

        <Button disabled={isSubmitting} type="submit">
          {isSubmitting ? 'Logging in...' : 'Log In'}
        </Button>
        <p className="form-link">
          New recruiter? <Link to="/recruiter/signup">Create an account</Link>
        </p>
      </form>
    </div>
  )
}

export default RecruiterLoginPage
