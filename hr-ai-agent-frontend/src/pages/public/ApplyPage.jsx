import { useState } from 'react'
import { useParams } from 'react-router-dom'
import Button from '../../components/Button.jsx'
import EmptyState from '../../components/EmptyState.jsx'
import PageHeader from '../../components/PageHeader.jsx'
import { jobs } from '../../data/placeholderData.js'

const initialForm = {
  applicantName: '',
  applicantEmail: '',
  shortNote: '',
  resumeFile: null,
}

function ApplyPage() {
  const { jobId } = useParams()
  const job = jobs.find((currentJob) => currentJob.id === jobId)
  const [formData, setFormData] = useState(initialForm)
  const [error, setError] = useState('')
  const [submitted, setSubmitted] = useState(false)

  if (!job) {
    return (
      <EmptyState
        title="Job not found"
        message="You cannot apply because this job does not exist in the placeholder data."
        actionLabel="Back to jobs"
        actionTo="/jobs"
      />
    )
  }

  function handleChange(event) {
    const { name, value } = event.target
    setFormData((currentData) => ({ ...currentData, [name]: value }))
  }

  function handleFileChange(event) {
    const selectedFile = event.target.files[0]
    setFormData((currentData) => ({ ...currentData, resumeFile: selectedFile }))
  }

  function handleSubmit(event) {
    event.preventDefault()
    setError('')

    if (!formData.applicantName || !formData.applicantEmail || !formData.resumeFile) {
      setError('Please enter your name, email, and resume PDF before submitting.')
      return
    }

    if (formData.resumeFile.type !== 'application/pdf') {
      setError('Please select a PDF resume file.')
      return
    }

    setSubmitted(true)
  }

  if (submitted) {
    return (
      <section className="success-card">
        <p className="eyebrow">Application saved locally</p>
        <h1>Application submitted successfully.</h1>
        <p>
          In the next version, this form will send the resume to the backend AI
          evaluation workflow.
        </p>
        <Button to="/jobs" variant="secondary">
          Back to Jobs
        </Button>
      </section>
    )
  }

  return (
    <div>
      <PageHeader
        eyebrow="Apply now"
        title={job.title}
        description={`${job.recruiter_company_name} | ${job.location}`}
      />

      <form className="form-card" onSubmit={handleSubmit}>
        <label>
          Applicant name
          <input
            name="applicantName"
            onChange={handleChange}
            placeholder="Enter your full name"
            required
            type="text"
            value={formData.applicantName}
          />
        </label>

        <label>
          Applicant email
          <input
            name="applicantEmail"
            onChange={handleChange}
            placeholder="name@example.com"
            required
            type="email"
            value={formData.applicantEmail}
          />
        </label>

        <label>
          Resume PDF
          <input accept="application/pdf" onChange={handleFileChange} required type="file" />
          <span className="file-name">
            {formData.resumeFile ? formData.resumeFile.name : 'No file selected'}
          </span>
        </label>

        <label>
          Optional short note
          <textarea
            name="shortNote"
            onChange={handleChange}
            placeholder="Add a short note for the recruiter"
            rows="4"
            value={formData.shortNote}
          />
        </label>

        {error && <p className="form-error">{error}</p>}

        <Button type="submit">Submit Application</Button>
      </form>
    </div>
  )
}

export default ApplyPage
