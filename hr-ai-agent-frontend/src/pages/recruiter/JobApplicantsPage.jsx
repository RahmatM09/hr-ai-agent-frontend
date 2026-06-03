import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { isRecruiterLoggedIn } from '../../api/authApi.js'
import { getApplicantsForJob } from '../../api/dashboardApi.js'
import ApplicantCard from '../../components/ApplicantCard.jsx'
import EmptyState from '../../components/EmptyState.jsx'
import PageHeader from '../../components/PageHeader.jsx'
import StatCard from '../../components/StatCard.jsx'

const tabs = [
  { label: 'All Applicants', value: 'all' },
  { label: 'Shortlisted', value: 'shortlisted' },
  { label: 'Rejected', value: 'rejected' },
]

function normalizeApplicants(data) {
  if (Array.isArray(data)) {
    return data
  }

  const shortlisted = Array.isArray(data?.shortlisted) ? data.shortlisted : []
  const rejected = Array.isArray(data?.rejected) ? data.rejected : []
  const applications = Array.isArray(data?.applications) ? data.applications : []

  if (applications.length > 0) {
    return applications
  }

  return [...shortlisted, ...rejected]
}

function JobApplicantsPage() {
  const { jobId } = useParams()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('all')
  const [summary, setSummary] = useState(null)
  const [jobApplicants, setJobApplicants] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!isRecruiterLoggedIn()) {
      navigate('/recruiter/login', { replace: true })
      return
    }

    async function loadApplicants() {
      try {
        setIsLoading(true)
        setError('')
        const data = await getApplicantsForJob(jobId)
        setSummary(data || null)
        setJobApplicants(normalizeApplicants(data))
      } catch (apiError) {
        setError(apiError.message || 'Could not load applicants.')
      } finally {
        setIsLoading(false)
      }
    }

    loadApplicants()
  }, [jobId, navigate])

  const visibleApplicants =
    activeTab === 'all'
      ? jobApplicants
      : jobApplicants.filter((applicant) => applicant.ai_status === activeTab)
  const shortlistedCount =
    summary?.shortlisted_count ??
    jobApplicants.filter((applicant) => applicant.ai_status === 'shortlisted').length
  const rejectedCount =
    summary?.rejected_count ??
    jobApplicants.filter((applicant) => applicant.ai_status === 'rejected').length
  const totalApplications = summary?.total_applications ?? jobApplicants.length

  return (
    <div>
      <PageHeader
        eyebrow="AI applicant workflow"
        title={summary?.job_title || 'Job applications'}
        description={`Job ID ${summary?.job_id || jobId}`}
      />

      {isLoading && (
        <EmptyState
          title="Loading applicants"
          message="Fetching AI evaluation results from the recruiter dashboard API."
        />
      )}

      {!isLoading && error && (
        <EmptyState title="Could not load applicants" message={error} />
      )}

      {!isLoading && !error && (
        <>
          <section className="stats-grid compact-stats">
            <StatCard label="Applicants" value={totalApplications} helper="Backend applications" />
            <StatCard label="Shortlisted" value={shortlistedCount} helper="AI status" />
            <StatCard label="Rejected" value={rejectedCount} helper="AI status" />
          </section>

          <section className="tabs" aria-label="Applicant filters">
            {tabs.map((tab) => (
              <button
                className={activeTab === tab.value ? 'active' : ''}
                key={tab.value}
                onClick={() => setActiveTab(tab.value)}
                type="button"
              >
                {tab.label}
              </button>
            ))}
          </section>

          <section className="applicant-list">
            {visibleApplicants.length > 0 ? (
              visibleApplicants.map((applicant) => (
                <ApplicantCard applicant={applicant} key={applicant.id} />
              ))
            ) : (
              <EmptyState
                title="No applicants in this section"
                message="No backend applications match this filter yet."
              />
            )}
          </section>
        </>
      )}
    </div>
  )
}

export default JobApplicantsPage
