import { upload } from './apiClient.js'

function applyToJob(jobId, applicationData) {
  const formData = new FormData()

  formData.append('name', applicationData.name)
  formData.append('email', applicationData.email)
  formData.append('resume', applicationData.resume)

  return upload(`/apply/${jobId}`, formData)
}

export { applyToJob }
