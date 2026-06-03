import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { signupRecruiter } from '../../api/authApi.js'
import Button from '../../components/Button.jsx'
import PageHeader from '../../components/PageHeader.jsx'

const initialForm = {
  companyName: '',
  email: '',
  password: '',
  confirmPassword: '',
}

function RecruiterSignupPage() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState(initialForm)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  function handleChange(event) {
    const { name, value } = event.target
    setFormData((currentData) => ({ ...currentData, [name]: value }))
  }

  async function handleSubmit(event) {
    event.preventDefault()
    setError('')
    setMessage('')

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords must match.')
      return
    }

    try {
      setIsSubmitting(true)
      await signupRecruiter({
        email: formData.email,
        password: formData.password,
        company_name: formData.companyName,
      })
      setMessage('Recruiter account created successfully. Redirecting to login...')
      setFormData(initialForm)
      window.setTimeout(() => navigate('/recruiter/login'), 900)
    } catch (apiError) {
      setError(apiError.message || 'Could not create recruiter account.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="auth-page">
      <PageHeader
        eyebrow="Recruiter signup"
        title="Create recruiter workspace"
        description="Create a recruiter account using the backend authentication API."
      />

      <form className="form-card auth-card" onSubmit={handleSubmit}>
        <label>
          Company name
          <input
            disabled={isSubmitting}
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
            disabled={isSubmitting}
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
            disabled={isSubmitting}
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
            disabled={isSubmitting}
            name="confirmPassword"
            onChange={handleChange}
            required
            type="password"
            value={formData.confirmPassword}
          />
        </label>

        {error && <p className="form-error">{error}</p>}
        {message && <p className="form-success">{message}</p>}

        <Button disabled={isSubmitting} type="submit">
          {isSubmitting ? 'Creating account...' : 'Create Account'}
        </Button>
        <p className="form-link">
          Already have an account? <Link to="/recruiter/login">Log in</Link>
        </p>
      </form>
    </div>
  )
}

export default RecruiterSignupPage
