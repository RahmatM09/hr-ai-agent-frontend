import { useState } from 'react'
import { Link } from 'react-router-dom'
import Button from '../../components/Button.jsx'
import PageHeader from '../../components/PageHeader.jsx'

const initialForm = {
  companyName: '',
  email: '',
  password: '',
  confirmPassword: '',
}

function RecruiterSignupPage() {
  const [formData, setFormData] = useState(initialForm)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  function handleChange(event) {
    const { name, value } = event.target
    setFormData((currentData) => ({ ...currentData, [name]: value }))
  }

  function handleSubmit(event) {
    event.preventDefault()
    setError('')
    setMessage('')

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords must match.')
      return
    }

    setMessage('Demo recruiter account created locally. Backend signup will be added later.')
    setFormData(initialForm)
  }

  return (
    <div className="auth-page">
      <PageHeader
        eyebrow="Recruiter signup"
        title="Create recruiter workspace"
        description="This local form prepares the signup UI before backend account creation is connected."
      />

      <form className="form-card auth-card" onSubmit={handleSubmit}>
        <label>
          Company name
          <input
            name="companyName"
            onChange={handleChange}
            placeholder="CloudCore HR"
            required
            type="text"
            value={formData.companyName}
          />
        </label>
        <label>
          Email
          <input
            name="email"
            onChange={handleChange}
            placeholder="recruiter@example.com"
            required
            type="email"
            value={formData.email}
          />
        </label>
        <label>
          Password
          <input
            name="password"
            onChange={handleChange}
            required
            type="password"
            value={formData.password}
          />
        </label>
        <label>
          Confirm password
          <input
            name="confirmPassword"
            onChange={handleChange}
            required
            type="password"
            value={formData.confirmPassword}
          />
        </label>

        {error && <p className="form-error">{error}</p>}
        {message && <p className="form-success">{message}</p>}

        <Button type="submit">Create Demo Account</Button>
        <p className="form-link">
          Already have an account? <Link to="/recruiter/login">Log in</Link>
        </p>
      </form>
    </div>
  )
}

export default RecruiterSignupPage
