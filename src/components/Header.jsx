import React from 'react'
import './Header.css'

function Header() {
  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <div className="logo-section">
            <div className="logo-icon">🛡️</div>
            <div>
              <h1>Vulnerability Scanner</h1>
              <p className="tagline">OWASP Top 10 Security Analysis</p>
            </div>
          </div>
          <div className="header-info">
            <span className="status-badge">●  API Connected</span>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
