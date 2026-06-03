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

function signupRecruiter(signupData) {
  return recruiterSignup(signupData)
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

function loginRecruiter(loginData) {
  return recruiterLogin(loginData)
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
  loginRecruiter,
  logoutRecruiter,
  recruiterLogin,
  recruiterSignup,
  signupRecruiter,
}
