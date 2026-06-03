import { Navigate } from 'react-router-dom'
import { isRecruiterLoggedIn } from '../api/authApi.js'

function ProtectedRoute({ children }) {
  if (!isRecruiterLoggedIn()) {
    return <Navigate replace to="/recruiter/login" />
  }

  return children
}

export default ProtectedRoute
