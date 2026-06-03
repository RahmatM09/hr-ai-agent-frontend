import { request } from './apiClient.js'

function getMyJobs() {
  return request('/dashboard/my-jobs', {
    authenticated: true,
  })
}

function getRecruiterJobs() {
  return getMyJobs()
}

function getJobApplications(jobId) {
  return request(`/dashboard/jobs/${jobId}/applications`, {
    authenticated: true,
  })
}

function getApplicantsForJob(jobId) {
  return getJobApplications(jobId)
}

export {
  getApplicantsForJob,
  getJobApplications,
  getMyJobs,
  getRecruiterJobs,
}
