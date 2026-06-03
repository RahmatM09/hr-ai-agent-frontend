import Navbar from './Navbar.jsx'

function Layout({ children }) {
  return (
    <div className="app-shell">
      <Navbar />
      <main className="main-content">{children}</main>
      <footer className="footer">
        <span>HR AI Agent Platform</span>
        <span>Frontend template using placeholder data only</span>
      </footer>
    </div>
  )
}

export default Layout
