import Navbar from './Navbar.jsx'

function Layout({ children }) {
  return (
    <div className="app-shell">
      <Navbar />
      <main className="main-content">{children}</main>
      <footer className="footer">
        <span>HR AI Agent Platform</span>
        <span>Frontend connected through the centralized API layer</span>
      </footer>
    </div>
  )
}

export default Layout
