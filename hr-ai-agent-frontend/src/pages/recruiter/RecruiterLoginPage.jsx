import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Button from '../../components/Button.jsx'
import PageHeader from '../../components/PageHeader.jsx'

function RecruiterLoginPage() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  function handleSubmit(event) {
    event.preventDefault()
    localStorage.setItem('hr_ai_agent_demo_token', 'demo-token')
    navigate('/recruiter/dashboard')
  }

  return (
    <div className="auth-page">
      <PageHeader
        eyebrow="Recruiter login"
        title="Access hiring dashboard"
        description="This demo login stores a placeholder token only. Real JWT authentication will be added later."
      />

      <form className="form-card auth-card" onSubmit={handleSubmit}>
        <label>
          Email
          <input
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
            onChange={(event) => setPassword(event.target.value)}
            required
            type="password"
            value={password}
          />
        </label>

        <Button type="submit">Log In</Button>
        <p className="form-link">
          New recruiter? <Link to="/recruiter/signup">Create an account</Link>
        </p>
      </form>
    </div>
  )
}

export default RecruiterLoginPage
