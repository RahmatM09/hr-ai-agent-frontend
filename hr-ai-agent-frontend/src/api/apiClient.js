const API_BASE_URL = 'http://127.0.0.1:8000'
const AUTH_TOKEN_KEY = 'hr_ai_agent_auth_token'

function getStorage() {
  if (typeof window === 'undefined') {
    return null
  }

  return window.localStorage
}

function getAuthToken() {
  const storage = getStorage()
  return storage ? storage.getItem(AUTH_TOKEN_KEY) : null
}

function saveAuthToken(token) {
  const storage = getStorage()

  if (storage && token) {
    storage.setItem(AUTH_TOKEN_KEY, token)
  }
}

function removeAuthToken() {
  const storage = getStorage()

  if (storage) {
    storage.removeItem(AUTH_TOKEN_KEY)
  }
}

function isRecruiterLoggedIn() {
  return Boolean(getAuthToken())
}

function buildHeaders({ authenticated = false, isUpload = false } = {}) {
  const headers = {}

  if (!isUpload) {
    headers['Content-Type'] = 'application/json'
  }

  if (authenticated) {
    const token = getAuthToken()

    if (token) {
      headers.Authorization = `Bearer ${token}`
    }
  }

  return headers
}

function normalizeFastApiDetail(detail) {
  if (typeof detail === 'string') {
    return detail
  }

  if (Array.isArray(detail)) {
    return detail
      .map((item) => {
        if (typeof item === 'string') {
          return item
        }

        if (item?.msg) {
          const fieldPath = Array.isArray(item.loc) ? item.loc.join('.') : ''
          return fieldPath ? `${fieldPath}: ${item.msg}` : item.msg
        }

        return JSON.stringify(item)
      })
      .join(' ')
  }

  if (detail && typeof detail === 'object') {
    return detail.message || detail.error || JSON.stringify(detail)
  }

  return ''
}

function normalizeApiError(errorData, status) {
  const message =
    normalizeFastApiDetail(errorData?.detail) ||
    errorData?.message ||
    errorData?.error ||
    `Request failed with status ${status}`

  const error = new Error(message)
  error.status = status
  error.data = errorData
  return error
}

async function parseResponse(response) {
  const contentType = response.headers.get('content-type') || ''

  if (!contentType.includes('application/json')) {
    return null
  }

  return response.json()
}

async function request(path, options = {}) {
  const {
    authenticated = false,
    body,
    headers = {},
    method = 'GET',
  } = options

  const response = await fetch(`${API_BASE_URL}${path}`, {
    method,
    headers: {
      ...buildHeaders({ authenticated }),
      ...headers,
    },
    body: body ? JSON.stringify(body) : undefined,
  })

  const data = await parseResponse(response)

  if (!response.ok) {
    throw normalizeApiError(data, response.status)
  }

  return data
}

async function upload(path, formData, options = {}) {
  const { authenticated = false, headers = {}, method = 'POST' } = options

  const response = await fetch(`${API_BASE_URL}${path}`, {
    method,
    headers: {
      ...buildHeaders({ authenticated, isUpload: true }),
      ...headers,
    },
    body: formData,
  })

  const data = await parseResponse(response)

  if (!response.ok) {
    throw normalizeApiError(data, response.status)
  }

  return data
}

export {
  API_BASE_URL,
  AUTH_TOKEN_KEY,
  getAuthToken,
  isRecruiterLoggedIn,
  removeAuthToken,
  request,
  saveAuthToken,
  upload,
}
