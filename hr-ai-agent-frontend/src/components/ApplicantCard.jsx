import StatusBadge from './StatusBadge.jsx'

function ApplicantCard({ applicant }) {
  return (
    <article className="applicant-card">
      <div className="applicant-header">
        <div>
          <h3>{applicant.applicant_name}</h3>
          <p className="muted">{applicant.applicant_email}</p>
        </div>
        <div className="score-block">
          <span>AI Score</span>
          <strong>{applicant.ai_score}</strong>
        </div>
      </div>

      <div className="applicant-meta">
        <StatusBadge status={applicant.ai_status} />
        <span>{applicant.evaluated_at}</span>
        <span>
          {applicant.ai_provider} / {applicant.ai_model}
        </span>
      </div>

      <p>{applicant.ai_reason}</p>

      <div className="ai-grid">
        <div>
          <h4>Strengths</h4>
          <ul>
            {applicant.ai_strengths.map((strength) => (
              <li key={strength}>{strength}</li>
            ))}
          </ul>
        </div>
        <div>
          <h4>Weaknesses</h4>
          <ul>
            {applicant.ai_weaknesses.map((weakness) => (
              <li key={weakness}>{weakness}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="recommendation">
        <span>Recommendation</span>
        <p>{applicant.ai_recommendation}</p>
      </div>
    </article>
  )
}

export default ApplicantCard
