import { useParams } from 'react-router-dom'
import Button from '../../components/Button.jsx'
import EmptyState from '../../components/EmptyState.jsx'
import PageHeader from '../../components/PageHeader.jsx'
import StatusBadge from '../../components/StatusBadge.jsx'
import { jobs } from '../../data/placeholderData.js'

function JobDetailsPage() {
  const { jobId } = useParams()
  const job = jobs.find((currentJob) => currentJob.id === jobId)

  if (!job) {
    return (
      <EmptyState
        title="Job not found"
        message="This job does not exist in the current placeholder data."
        actionLabel="Back to jobs"
        actionTo="/jobs"
      />
    )
  }

  return (
    <div>
      <PageHeader
        eyebrow={job.recruiter_company_name}
        title={job.title}
        description={`${job.location} | ${job.applicants_count} placeholder applicants`}
        actions={<StatusBadge status={job.is_active ? 'open' : 'closed'} />}
      />

      <section className="details-layout">
        <article className="content-panel">
          <h2>Full Description</h2>
          <p>{job.description}</p>

          <h2>Requirements</h2>
          <ul className="check-list">
            {job.requirements.map((requirement) => (
              <li key={requirement}>{requirement}</li>
            ))}
          </ul>

          <h2>About this role</h2>
          <p>
            This opening is part of a hiring workflow where applicants submit a
            resume and recruiters review structured AI evaluation output before
            making a decision.
          </p>

          <div className="note-box">
            <strong>AI-assisted review note</strong>
            <p>
              In the next version, uploaded resumes will be sent to the backend
              AI evaluation workflow. For now, this page uses hardcoded content
              only.
            </p>
          </div>
        </article>

        <aside className="side-panel">
          <h2>Ready to apply?</h2>
          <p>
            Submit your name, email, and resume PDF through the local-only demo
            form.
          </p>
          <Button to={`/jobs/${job.id}/apply`}>Apply Now</Button>
        </aside>
      </section>
    </div>
  )
}

export default JobDetailsPage
