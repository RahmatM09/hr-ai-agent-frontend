import Button from './Button.jsx'
import StatusBadge from './StatusBadge.jsx'

function JobCard({ job, compact = false }) {
  const requirements = Array.isArray(job.requirements)
    ? job.requirements
    : String(job.requirements || '').split(',').map((item) => item.trim()).filter(Boolean)
  const requirementPreview = requirements.slice(0, 2).join(' | ')

  return (
    <article className={`job-card ${compact ? 'job-card-compact' : ''}`}>
      <div className="card-topline">
        <span>{job.recruiter_company_name}</span>
        <StatusBadge status={job.is_active ? 'open' : 'closed'} />
      </div>

      <h2>{job.title}</h2>
      <p className="muted">{job.location}</p>
      <p>{job.description}</p>
      {requirementPreview && (
        <p className="requirement-preview">{requirementPreview}</p>
      )}

      <div className="card-actions">
        <Button to={`/jobs/${job.id}`} variant="secondary">
          View Details
        </Button>
      </div>
    </article>
  )
}

export default JobCard
