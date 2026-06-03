import Button from '../../components/Button.jsx'
import PageHeader from '../../components/PageHeader.jsx'
import StatCard from '../../components/StatCard.jsx'
import { jobs, recruiter } from '../../data/placeholderData.js'

function RecruiterDashboardPage() {
  const totalApplications = jobs.reduce((total, job) => total + job.applicants_count, 0)
  const totalShortlisted = jobs.reduce((total, job) => total + job.shortlisted_count, 0)
  const totalRejected = jobs.reduce((total, job) => total + job.rejected_count, 0)

  return (
    <div>
      <PageHeader
        eyebrow={recruiter.company_name}
        title={`Welcome back, ${recruiter.contact_name}`}
        description="Review placeholder hiring activity and AI evaluation outcomes across active roles."
        actions={<Button to="/recruiter/jobs/create">Create New Job</Button>}
      />

      <section className="stats-grid">
        <StatCard label="Total Jobs" value={jobs.length} helper="Active placeholder roles" />
        <StatCard label="Total Applications" value={totalApplications} helper="Across all jobs" />
        <StatCard label="Shortlisted" value={totalShortlisted} helper="Recommended by AI" />
        <StatCard label="Rejected" value={totalRejected} helper="Not recommended" />
      </section>

      <section className="dashboard-section">
        <div className="section-heading">
          <h2>Recruiter jobs</h2>
          <p>Each row links to the AI applicant review workflow.</p>
        </div>

        <div className="job-table">
          {jobs.map((job) => (
            <article className="job-row" key={job.id}>
              <div>
                <h3>{job.title}</h3>
                <p className="muted">{job.location}</p>
              </div>
              <div className="row-metrics">
                <span>{job.applicants_count} applicants</span>
                <span>{job.shortlisted_count} shortlisted</span>
                <span>{job.rejected_count} rejected</span>
              </div>
              <Button to={`/recruiter/jobs/${job.id}/applications`} variant="secondary">
                View Applicants
              </Button>
            </article>
          ))}
        </div>
      </section>
    </div>
  )
}

export default RecruiterDashboardPage
