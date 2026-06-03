import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { isRecruiterLoggedIn } from '../../api/authApi.js'
import { createJob } from '../../api/jobsApi.js'
import Button from '../../components/Button.jsx'
import PageHeader from '../../components/PageHeader.jsx'

const initialForm = {
  title: '',
  location: '',
  description: '',
  requirements: '',
}

function CreateJobPage() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState(initialForm)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    if (!isRecruiterLoggedIn()) {
      navigate('/recruiter/login', { replace: true })
    }
  }, [navigate])

  function handleChange(event) {
    const { name, value } = event.target
    setFormData((currentData) => ({ ...currentData, [name]: value }))
  }

  async function handleSubmit(event) {
    event.preventDefault()
    setError('')
    setMessage('')

    try {
      setIsSubmitting(true)
      await createJob({
        title: formData.title,
        description: formData.description,
        requirements: formData.requirements,
        location: formData.location,
      })
      setMessage('Job created successfully. Redirecting to dashboard...')
      setFormData(initialForm)
      window.setTimeout(() => navigate('/recruiter/dashboard'), 900)
    } catch (apiError) {
      setError(apiError.message || 'Could not create job.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div>
      <PageHeader
        eyebrow="Recruiter workflow"
        title="Create new job"
        description="Create a recruiter-owned job using a token-authenticated backend request."
      />

      {message && <section className="success-strip">{message}</section>}

      <form className="form-card wide-form" onSubmit={handleSubmit}>
        <label>
          Job title
          <input
            disabled={isSubmitting}
            name="title"
            onChange={handleChange}
            placeholder="Senior Backend Developer"
            required
            type="text"
            value={formData.title}
          />
        </label>

        <label>
          Location
          <input
            disabled={isSubmitting}
            name="location"
            onChange={handleChange}
            placeholder="Remote - United States"
            required
            type="text"
            value={formData.location}
          />
        </label>

        <label>
          Description
          <textarea
            disabled={isSubmitting}
            name="description"
            onChange={handleChange}
            placeholder="Describe the role, responsibilities, and team context."
            required
            rows="5"
            value={formData.description}
          />
        </label>

        <label>
          Requirements
          <textarea
            disabled={isSubmitting}
            name="requirements"
            onChange={handleChange}
            placeholder="List requirements for the backend job criteria."
            required
            rows="5"
            value={formData.requirements}
          />
        </label>

        {error && <p className="form-error">{error}</p>}

        <Button disabled={isSubmitting} type="submit">
          {isSubmitting ? 'Creating job...' : 'Create Job'}
        </Button>
      </form>
    </div>
  )
}

export default CreateJobPage
