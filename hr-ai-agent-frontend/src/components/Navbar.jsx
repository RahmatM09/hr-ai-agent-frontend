import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import { isRecruiterLoggedIn, logoutRecruiter } from '../api/authApi.js'

function Navbar() {
  useLocation()
  const navigate = useNavigate()
  const isLoggedIn = isRecruiterLoggedIn()

  function handleLogout() {
    logoutRecruiter()
    navigate('/recruiter/login')
  }

  return (
    <header className="navbar">
      <NavLink className="brand" to="/">
        <span className="brand-mark">HR</span>
        <span>HR AI Agent</span>
      </NavLink>

      <nav className="nav-links" aria-label="Main navigation">
        <NavLink to="/jobs">Jobs</NavLink>
        {isLoggedIn ? (
          <>
            <NavLink to="/recruiter/dashboard">Dashboard</NavLink>
            <button onClick={handleLogout} type="button">
              Logout
            </button>
          </>
        ) : (
          <>
            <NavLink to="/recruiter/login">Recruiter Login</NavLink>
            <NavLink to="/recruiter/signup">Signup</NavLink>
          </>
        )}
      </nav>
    </header>
  )
}

export default Navbar
