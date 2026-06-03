import { request } from './apiClient.js'

function getMyJobs() {
  return request('/dashboard/my-jobs', {
    authenticated: true,
  })
}

function getJobApplications(jobId) {
  return request(`/dashboard/jobs/${jobId}/applications`, {
    authenticated: true,
  })
}

export { getJobApplications, getMyJobs }
