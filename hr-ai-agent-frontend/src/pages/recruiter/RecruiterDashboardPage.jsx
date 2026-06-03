import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  isRecruiterLoggedIn,
  logoutRecruiter,
} from '../../api/authApi.js'
import { getRecruiterJobs } from '../../api/dashboardApi.js'
import Button from '../../components/Button.jsx'
import EmptyState from '../../components/EmptyState.jsx'
import PageHeader from '../../components/PageHeader.jsx'
import StatCard from '../../components/StatCard.jsx'

function normalizeJobs(data) {
  if (Array.isArray(data)) {
    return data
  }

  if (Array.isArray(data?.jobs)) {
    return data.jobs
  }

  return []
}

function RecruiterDashboardPage() {
  const navigate = useNavigate()
  const [jobs, setJobs] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!isRecruiterLoggedIn()) {
      navigate('/recruiter/login', { replace: true })
      return
    }

    async function loadJobs() {
      try {
        setIsLoading(true)
        setError('')
        const data = await getRecruiterJobs()
        setJobs(normalizeJobs(data))
      } catch (apiError) {
        setError(apiError.message || 'Could not load recruiter jobs.')
      } finally {
        setIsLoading(false)
      }
    }

    loadJobs()
  }, [navigate])

  function handleLogout() {
    logoutRecruiter()
    navigate('/recruiter/login')
  }

  const totalApplications = jobs.reduce(
    (total, job) => total + (job.applicants_count || job.total_applications || 0),
    0,
  )
  const totalShortlisted = jobs.reduce(
    (total, job) => total + (job.shortlisted_count || 0),
    0,
  )
  const totalRejected = jobs.reduce(
    (total, job) => total + (job.rejected_count || 0),
    0,
  )

  return (
    <div>
      <PageHeader
        eyebrow="Recruiter dashboard"
        title="Welcome back"
        description="Review your backend job postings and applicant workflow activity."
        actions={
          <>
            <Button to="/recruiter/jobs/create">Create New Job</Button>
            <Button onClick={handleLogout} variant="secondary">
              Logout
            </Button>
          </>
        }
      />

      {isLoading && (
        <EmptyState
          title="Loading dashboard"
          message="Fetching your recruiter jobs from the backend."
        />
      )}

      {!isLoading && error && (
        <EmptyState title="Could not load dashboard" message={error} />
      )}

      {!isLoading && !error && (
        <>
          <section className="stats-grid">
            <StatCard label="Total Jobs" value={jobs.length} helper="Recruiter-owned roles" />
            <StatCard label="Total Applications" value={totalApplications} helper="Across all jobs" />
            <StatCard label="Shortlisted" value={totalShortlisted} helper="Recommended by AI" />
            <StatCard label="Rejected" value={totalRejected} helper="Not recommended" />
          </section>

          <section className="dashboard-section">
            <div className="section-heading">
              <h2>Recruiter jobs</h2>
              <p>Each row links to the AI applicant review workflow.</p>
            </div>

            {jobs.length === 0 ? (
              <EmptyState
                title="No recruiter jobs yet"
                message="Create your first job to begin receiving applications."
                actionLabel="Create New Job"
                actionTo="/recruiter/jobs/create"
              />
            ) : (
              <div className="job-table">
                {jobs.map((job) => (
                  <article className="job-row" key={job.id}>
                    <div>
                      <h3>{job.title}</h3>
                      <p className="muted">{job.location || 'Location not provided'}</p>
                    </div>
                    <div className="row-metrics">
                      <span>
                        {job.applicants_count || job.total_applications || 0} applicants
                      </span>
                      <span>{job.shortlisted_count || 0} shortlisted</span>
                      <span>{job.rejected_count || 0} rejected</span>
                    </div>
                    <Button to={`/recruiter/jobs/${job.id}/applications`} variant="secondary">
                      View Applicants
                    </Button>
                  </article>
                ))}
              </div>
            )}
          </section>
        </>
      )}
    </div>
  )
}

export default RecruiterDashboardPage
