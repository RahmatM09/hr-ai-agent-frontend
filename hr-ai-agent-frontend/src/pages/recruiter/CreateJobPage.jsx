import { useState } from 'react'
import Button from '../../components/Button.jsx'
import PageHeader from '../../components/PageHeader.jsx'

const initialForm = {
  title: '',
  location: '',
  description: '',
  requirements: '',
}

function CreateJobPage() {
  const [formData, setFormData] = useState(initialForm)
  const [submitted, setSubmitted] = useState(false)

  function handleChange(event) {
    const { name, value } = event.target
    setFormData((currentData) => ({ ...currentData, [name]: value }))
  }

  function handleSubmit(event) {
    event.preventDefault()
    setSubmitted(true)
  }

  return (
    <div>
      <PageHeader
        eyebrow="Recruiter workflow"
        title="Create new job"
        description="This form will later send a token-authenticated request to the backend. For now, it only submits locally."
      />

      {submitted && (
        <section className="success-strip">
          Demo job saved locally. Backend job creation will be connected in the next lecture.
        </section>
      )}

      <form className="form-card wide-form" onSubmit={handleSubmit}>
        <label>
          Job title
          <input
            name="title"
            onChange={handleChange}
            placeholder="Senior Backend Developer"
            required
            type="text"
            value={formData.title}
          />
        </label>

        <label>
          Location
          <input
            name="location"
            onChange={handleChange}
            placeholder="Remote - United States"
            required
            type="text"
            value={formData.location}
          />
        </label>

        <label>
          Description
          <textarea
            name="description"
            onChange={handleChange}
            placeholder="Describe the role, responsibilities, and team context."
            required
            rows="5"
            value={formData.description}
          />
        </label>

        <label>
          Requirements
          <textarea
            name="requirements"
            onChange={handleChange}
            placeholder="List requirements. Later this can be sent to the backend as job criteria."
            required
            rows="5"
            value={formData.requirements}
          />
        </label>

        <Button type="submit">Preview Local Job</Button>
      </form>
    </div>
  )
}

export default CreateJobPage
