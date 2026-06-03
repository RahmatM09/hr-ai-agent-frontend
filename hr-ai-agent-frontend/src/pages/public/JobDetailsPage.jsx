import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getPublicJobDetails } from '../../api/jobsApi.js'
import Button from '../../components/Button.jsx'
import EmptyState from '../../components/EmptyState.jsx'
import PageHeader from '../../components/PageHeader.jsx'
import StatusBadge from '../../components/StatusBadge.jsx'

function JobDetailsPage() {
  const { jobId } = useParams()
  const [job, setJob] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    async function loadJob() {
      try {
        setIsLoading(true)
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
        setIsLoading(false)
      }
    }

    loadJob()
  }, [jobId])

  if (isLoading) {
    return (
      <EmptyState
        title="Loading job"
        message="Fetching the latest job details."
      />
    )
  }

  if (error) {
    return <EmptyState title="Could not load job" message={error} />
  }

  if (!job) {
    return (
      <EmptyState
        title="Job not found"
        message="This job does not exist or is no longer available."
        actionLabel="Back to jobs"
        actionTo="/jobs"
      />
    )
  }

  const requirements = Array.isArray(job.requirements)
    ? job.requirements
    : String(job.requirements || '')

  return (
    <div>
      <PageHeader
        eyebrow={job.recruiter_company_name || 'Recruiter'}
        title={job.title}
        description={job.location || 'Location not provided'}
        actions={<StatusBadge status={job.is_active ? 'open' : 'closed'} />}
      />

      <section className="details-layout">
        <article className="content-panel">
          <h2>Full Description</h2>
          <p>{job.description || 'No description has been provided yet.'}</p>

          <h2>Requirements</h2>
          {Array.isArray(requirements) ? (
            <ul className="check-list">
              {requirements.map((requirement) => (
                <li key={requirement}>{requirement}</li>
              ))}
            </ul>
          ) : (
            <p>{requirements || 'No requirements have been provided yet.'}</p>
          )}

          <h2>About this role</h2>
          <p>
            This opening is part of a hiring workflow where applicants submit a
            resume and recruiters review structured AI evaluation output before
            making a decision.
          </p>

          <div className="note-box">
            <strong>AI-assisted review note</strong>
            <p>
              Submitted resumes are sent to the backend application workflow for
              AI-assisted evaluation.
            </p>
          </div>
        </article>

        <aside className="side-panel">
          <h2>Ready to apply?</h2>
          <p>
            Submit your name, email, and resume PDF for backend AI-assisted
            review.
          </p>
          <Button to={`/jobs/${job.id}/apply`}>Apply Now</Button>
          <Button to="/jobs" variant="secondary">
            Back to Jobs
          </Button>
        </aside>
      </section>
    </div>
  )
}

export default JobDetailsPage
