import { Route, Routes } from 'react-router-dom'
import Layout from './components/Layout.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'
import ApplyPage from './pages/public/ApplyPage.jsx'
import HomePage from './pages/public/HomePage.jsx'
import JobDetailsPage from './pages/public/JobDetailsPage.jsx'
import JobListPage from './pages/public/JobListPage.jsx'
import CreateJobPage from './pages/recruiter/CreateJobPage.jsx'
import JobApplicantsPage from './pages/recruiter/JobApplicantsPage.jsx'
import RecruiterDashboardPage from './pages/recruiter/RecruiterDashboardPage.jsx'
import RecruiterLoginPage from './pages/recruiter/RecruiterLoginPage.jsx'
import RecruiterSignupPage from './pages/recruiter/RecruiterSignupPage.jsx'
import NotFoundPage from './pages/NotFoundPage.jsx'

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/jobs" element={<JobListPage />} />
        <Route path="/jobs/:jobId" element={<JobDetailsPage />} />
        <Route path="/jobs/:jobId/apply" element={<ApplyPage />} />
        <Route path="/recruiter/signup" element={<RecruiterSignupPage />} />
        <Route path="/recruiter/login" element={<RecruiterLoginPage />} />
        <Route
          path="/recruiter/dashboard"
          element={
            <ProtectedRoute>
              <RecruiterDashboardPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/recruiter/jobs/create"
          element={
            <ProtectedRoute>
              <CreateJobPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/recruiter/jobs/:jobId/applications"
          element={
            <ProtectedRoute>
              <JobApplicantsPage />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Layout>
  )
}

export default App
