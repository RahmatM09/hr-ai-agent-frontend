import { useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import ApplicantCard from '../../components/ApplicantCard.jsx'
import EmptyState from '../../components/EmptyState.jsx'
import PageHeader from '../../components/PageHeader.jsx'
import StatCard from '../../components/StatCard.jsx'
import { applicants, jobs } from '../../data/placeholderData.js'

const tabs = [
  { label: 'All Applicants', value: 'all' },
  { label: 'Shortlisted', value: 'shortlisted' },
  { label: 'Rejected', value: 'rejected' },
]

function JobApplicantsPage() {
  const { jobId } = useParams()
  const [activeTab, setActiveTab] = useState('all')
  const job = jobs.find((currentJob) => currentJob.id === jobId)

  const jobApplicants = useMemo(
    () => applicants.filter((applicant) => applicant.job_id === jobId),
    [jobId],
  )

  const visibleApplicants =
    activeTab === 'all'
      ? jobApplicants
      : jobApplicants.filter((applicant) => applicant.ai_status === activeTab)
  const shortlistedCount = jobApplicants.filter(
    (applicant) => applicant.ai_status === 'shortlisted',
  ).length
  const rejectedCount = jobApplicants.filter(
    (applicant) => applicant.ai_status === 'rejected',
  ).length

  if (!job) {
    return (
      <EmptyState
        title="Job not found"
        message="No applicant workflow exists for this placeholder job ID."
        actionLabel="Back to dashboard"
        actionTo="/recruiter/dashboard"
      />
    )
  }

  return (
    <div>
      <PageHeader
        eyebrow="AI applicant workflow"
        title={job.title}
        description={`${job.recruiter_company_name} | ${job.location}`}
      />

      <section className="stats-grid compact-stats">
        <StatCard label="Applicants" value={jobApplicants.length} helper="In placeholder data" />
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
            message="The current placeholder data has no applicants for this filter."
          />
        )}
      </section>
    </div>
  )
}

export default JobApplicantsPage
