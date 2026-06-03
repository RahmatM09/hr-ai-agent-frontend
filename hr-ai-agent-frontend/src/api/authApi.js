import {
  isRecruiterLoggedIn,
  removeAuthToken,
  request,
  saveAuthToken,
} from './apiClient.js'

function recruiterSignup(signupData) {
  return request('/auth/signup', {
    method: 'POST',
    body: signupData,
  })
}

async function recruiterLogin(loginData) {
  const data = await request('/auth/login', {
    method: 'POST',
    body: loginData,
  })

  const token = data?.access_token || data?.token

  if (token) {
    saveAuthToken(token)
  }

  return data
}

function getCurrentRecruiter() {
  return request('/auth/me', {
    authenticated: true,
  })
}

function logoutRecruiter() {
  removeAuthToken()
}

export {
  getCurrentRecruiter,
  isRecruiterLoggedIn,
  logoutRecruiter,
  recruiterLogin,
  recruiterSignup,
}
