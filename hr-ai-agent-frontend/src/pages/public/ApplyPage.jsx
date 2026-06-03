import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { applyToJob } from '../../api/applicationsApi.js'
import { getPublicJobDetails } from '../../api/jobsApi.js'
import Button from '../../components/Button.jsx'
import EmptyState from '../../components/EmptyState.jsx'
import PageHeader from '../../components/PageHeader.jsx'

const initialForm = {
  applicantName: '',
  applicantEmail: '',
  shortNote: '',
  resumeFile: null,
}

function ApplyPage() {
  const { jobId } = useParams()
  const [job, setJob] = useState(null)
  const [formData, setFormData] = useState(initialForm)
  const [error, setError] = useState('')
  const [isLoadingJob, setIsLoadingJob] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submittedResponse, setSubmittedResponse] = useState(null)

  useEffect(() => {
    async function loadJob() {
      try {
        setIsLoadingJob(true)
        setError('')
        const data = await getPublicJobDetails(jobId)
        setJob(data)
      } catch (apiError) {
        if (apiError.status === 404) {
          setJob(null)
        } else {
          setError(apiError.message || 'Could not load this job.')
        }
      } finally {
        setIsLoadingJob(false)
      }
    }

    loadJob()
  }, [jobId])

  function handleChange(event) {
    const { name, value } = event.target
    setFormData((currentData) => ({ ...currentData, [name]: value }))
  }

  function handleFileChange(event) {
    const selectedFile = event.target.files[0]
    setFormData((currentData) => ({ ...currentData, resumeFile: selectedFile }))
  }

  async function handleSubmit(event) {
    event.preventDefault()
    setError('')

    if (!formData.applicantName || !formData.applicantEmail || !formData.resumeFile) {
      setError('Please enter your name, email, and resume PDF before submitting.')
      return
    }

    if (formData.resumeFile.type && formData.resumeFile.type !== 'application/pdf') {
      setError('Please select a PDF resume file.')
      return
    }

    try {
      setIsSubmitting(true)
      const response = await applyToJob(jobId, {
        name: formData.applicantName,
        email: formData.applicantEmail,
        resume: formData.resumeFile,
      })
      setSubmittedResponse(response || {})
    } catch (apiError) {
      setError(apiError.message || 'Could not submit this application.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isLoadingJob) {
    return (
      <EmptyState
        title="Loading application"
        message="Fetching the job details before opening the form."
      />
    )
  }

  if (!job && !error) {
    return (
      <EmptyState
        title="Job not found"
        message="You cannot apply because this job does not exist."
        actionLabel="Back to jobs"
        actionTo="/jobs"
      />
    )
  }

  if (!job && error) {
    return <EmptyState title="Could not load application" message={error} />
  }

  if (submittedResponse) {
    const aiResult = submittedResponse.ai_result || {}

    return (
      <section className="success-card">
        <p className="eyebrow">Application submitted</p>
        <h1>Application submitted successfully.</h1>
        <p>
          Your resume was uploaded to the backend application workflow.
        </p>

        <div className="note-box">
          {submittedResponse.application_id && (
            <p>Application ID: {submittedResponse.application_id}</p>
          )}
          {typeof submittedResponse.email_sent !== 'undefined' && (
            <p>Email sent: {submittedResponse.email_sent ? 'Yes' : 'No'}</p>
          )}
          {typeof aiResult.score !== 'undefined' && <p>AI score: {aiResult.score}</p>}
          {aiResult.status && <p>AI status: {aiResult.status}</p>}
          {aiResult.reason && <p>AI reason: {aiResult.reason}</p>}
        </div>

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
        title={job?.title || 'Job application'}
        description={`${job?.recruiter_company_name || 'Recruiter'} | ${
          job?.location || 'Location not provided'
        }`}
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
          <input
            accept="application/pdf"
            disabled={isSubmitting}
            onChange={handleFileChange}
            required
            type="file"
          />
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

        <Button disabled={isSubmitting} type="submit">
          {isSubmitting ? 'Submitting...' : 'Submit Application'}
        </Button>
      </form>
    </div>
  )
}

export default ApplyPage
