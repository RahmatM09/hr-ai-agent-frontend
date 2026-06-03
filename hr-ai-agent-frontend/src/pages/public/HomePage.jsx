import Button from '../../components/Button.jsx'

const features = [
  {
    title: 'AI Resume Screening',
    description:
      'Represent resume evaluation results with scores, reasons, and structured fit signals.',
  },
  {
    title: 'Recruiter Dashboard',
    description:
      'Give hiring teams a clear view of jobs, applications, and candidate decisions.',
  },
  {
    title: 'Applicant Workflow',
    description:
      'Let job seekers browse roles, review details, and prepare a resume upload.',
  },
  {
    title: 'Structured AI Decisions',
    description:
      'Show strengths, weaknesses, recommendations, and model details in one place.',
  },
]

function HomePage() {
  return (
    <div className="home-page">
      <section className="hero-section">
        <div className="hero-copy">
          <p className="eyebrow">AI recruitment workflow template</p>
          <h1>HR AI Agent Platform</h1>
          <p>
            A modern frontend for recruiters and applicants, designed to show
            job posting, resume intake, and AI-assisted hiring decisions before
            the backend is connected.
          </p>
          <div className="hero-actions">
            <Button to="/jobs">Browse Jobs</Button>
            <Button to="/recruiter/login" variant="secondary">
              Recruiter Login
            </Button>
          </div>
        </div>

        <div className="hero-panel" aria-label="Recruiting workflow preview">
          <div className="panel-row">
            <span>Resume Review</span>
            <strong>92%</strong>
          </div>
          <div className="panel-row">
            <span>Shortlist Match</span>
            <strong>High</strong>
          </div>
          <div className="panel-row">
            <span>Next Action</span>
            <strong>Interview</strong>
          </div>
        </div>
      </section>

      <section className="feature-grid" aria-label="Platform features">
        {features.map((feature) => (
          <article className="feature-card" key={feature.title}>
            <h2>{feature.title}</h2>
            <p>{feature.description}</p>
          </article>
        ))}
      </section>
    </div>
  )
}

export default HomePage
