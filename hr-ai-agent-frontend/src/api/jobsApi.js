import { request } from './apiClient.js'

function getPublicJobs() {
  return request('/jobs/')
}

function getPublicJobById(jobId) {
  return request(`/jobs/${jobId}`)
}

function getPublicJobDetails(jobId) {
  return getPublicJobById(jobId)
}

function createRecruiterJob(jobData) {
  return request('/jobs/', {
    method: 'POST',
    body: jobData,
    authenticated: true,
  })
}

function createJob(jobData) {
  return createRecruiterJob(jobData)
}

export {
  createJob,
  createRecruiterJob,
  getPublicJobById,
  getPublicJobDetails,
  getPublicJobs,
}
