import { NavLink } from 'react-router-dom'

function Navbar() {
  return (
    <header className="navbar">
      <NavLink className="brand" to="/">
        <span className="brand-mark">HR</span>
        <span>HR AI Agent</span>
      </NavLink>

      <nav className="nav-links" aria-label="Main navigation">
        <NavLink to="/jobs">Jobs</NavLink>
        <NavLink to="/recruiter/login">Recruiter Login</NavLink>
        <NavLink to="/recruiter/signup">Signup</NavLink>
        <NavLink to="/recruiter/dashboard">Dashboard</NavLink>
      </nav>
    </header>
  )
}

export default Navbar
