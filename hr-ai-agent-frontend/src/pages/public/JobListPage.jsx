import JobCard from '../../components/JobCard.jsx'
import PageHeader from '../../components/PageHeader.jsx'
import { jobs } from '../../data/placeholderData.js'

function JobListPage() {
  return (
    <div>
      <PageHeader
        eyebrow="Public jobs"
        title="Open roles"
        description="Browse placeholder job openings that will later come from the FastAPI backend."
      />

      <section className="job-grid">
        {jobs.map((job) => (
          <JobCard job={job} key={job.id} />
        ))}
      </section>
    </div>
  )
}

export default JobListPage
