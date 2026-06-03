import StatusBadge from './StatusBadge.jsx'

function normalizeList(value) {
  if (Array.isArray(value)) {
    return value
  }

  if (!value) {
    return ['Not provided']
  }

  return String(value)
    .split('\n')
    .map((item) => item.trim())
    .filter(Boolean)
}

function ApplicantCard({ applicant }) {
  const strengths = normalizeList(applicant.ai_strengths)
  const weaknesses = normalizeList(applicant.ai_weaknesses)

  return (
    <article className="applicant-card">
      <div className="applicant-header">
        <div>
          <h3>{applicant.applicant_name}</h3>
          <p className="muted">{applicant.applicant_email}</p>
        </div>
        <div className="score-block">
          <span>AI Score</span>
          <strong>{applicant.ai_score ?? 'N/A'}</strong>
        </div>
      </div>

      <div className="applicant-meta">
        <StatusBadge status={applicant.ai_status || 'pending'} />
        <span>{applicant.evaluated_at || applicant.created_at || 'Not evaluated yet'}</span>
        <span>
          {applicant.ai_provider || 'AI provider'} / {applicant.ai_model || 'model'}
        </span>
      </div>

      <p>{applicant.ai_reason || 'No AI reason has been recorded yet.'}</p>

      <div className="ai-grid">
        <div>
          <h4>Strengths</h4>
          <ul>
            {strengths.map((strength) => (
              <li key={strength}>{strength}</li>
            ))}
          </ul>
        </div>
        <div>
          <h4>Weaknesses</h4>
          <ul>
            {weaknesses.map((weakness) => (
              <li key={weakness}>{weakness}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="recommendation">
        <span>Recommendation</span>
        <p>{applicant.ai_recommendation || 'No recommendation has been recorded yet.'}</p>
      </div>
    </article>
  )
}

export default ApplicantCard
