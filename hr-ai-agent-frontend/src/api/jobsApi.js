import { request } from './apiClient.js'

function getPublicJobs() {
  return request('/jobs/')
}

function getPublicJobById(jobId) {
  return request(`/jobs/${jobId}`)
}

function createRecruiterJob(jobData) {
  return request('/jobs/', {
    method: 'POST',
    body: jobData,
    authenticated: true,
  })
}

export { createRecruiterJob, getPublicJobById, getPublicJobs }
