import { useEffect, useState } from 'react'
import { getPublicJobs } from '../../api/jobsApi.js'
import EmptyState from '../../components/EmptyState.jsx'
import JobCard from '../../components/JobCard.jsx'
import PageHeader from '../../components/PageHeader.jsx'

function JobListPage() {
  const [jobs, setJobs] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    async function loadJobs() {
      try {
        setIsLoading(true)
        setError('')
        const data = await getPublicJobs()
        setJobs(Array.isArray(data) ? data : [])
      } catch (apiError) {
        setError(apiError.message || 'Could not load jobs.')
      } finally {
        setIsLoading(false)
      }
    }

    loadJobs()
  }, [])

  return (
    <div>
      <PageHeader
        eyebrow="Public jobs"
        title="Open roles"
        description="Browse active job openings from the HR AI Agent backend."
      />

      {isLoading && (
        <EmptyState
          title="Loading jobs"
          message="Fetching the latest public job openings."
        />
      )}

      {!isLoading && error && (
        <EmptyState title="Could not load jobs" message={error} />
      )}

      {!isLoading && !error && jobs.length === 0 && (
        <EmptyState
          title="No open jobs"
          message="There are no public jobs available right now."
        />
      )}

      {!isLoading && !error && jobs.length > 0 && (
        <section className="job-grid">
          {jobs.map((job) => (
            <JobCard job={job} key={job.id} />
          ))}
        </section>
      )}
    </div>
  )
}

export default JobListPage
