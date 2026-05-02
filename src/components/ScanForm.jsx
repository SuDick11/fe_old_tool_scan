import React, { useState } from 'react'
import './ScanForm.css'

function ScanForm({ onScan, isLoading }) {
  const [url, setUrl] = useState('')
  const [depth, setDepth] = useState(2)
  const [urlError, setUrlError] = useState('')

  const validateUrl = (urlString) => {
    try {
      new URL(urlString)
      return true
    } catch {
      return false
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (!url.trim()) {
      setUrlError('URL is required')
      return
    }

    if (!validateUrl(url)) {
      setUrlError('Please enter a valid URL (e.g., https://example.com)')
      return
    }

    setUrlError('')
    onScan(url, depth)
  }

  return (
    <div className="scan-form-container">
      <div className="form-header">
        <h2>Scan Configuration</h2>
        <p className="form-subtitle">Enter target URL and scan parameters</p>
      </div>

      <form onSubmit={handleSubmit} className="scan-form">
        <div className="form-group">
          <label htmlFor="url">Target URL</label>
          <input
            id="url"
            type="text"
            placeholder="https://example.com"
            value={url}
            onChange={(e) => {
              setUrl(e.target.value)
              setUrlError('')
            }}
            disabled={isLoading}
            className={urlError ? 'input-error' : ''}
          />
          {urlError && <span className="error-text">{urlError}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="depth">Crawl Depth</label>
          <div className="depth-selector">
            <input
              id="depth"
              type="range"
              min="1"
              max="3"
              value={depth}
              onChange={(e) => setDepth(Number(e.target.value))}
              disabled={isLoading}
            />
            <div className="depth-labels">
              <span className={depth === 1 ? 'active' : ''}>Shallow</span>
              <span className={depth === 2 ? 'active' : ''}>Medium</span>
              <span className={depth === 3 ? 'active' : ''}>Deep</span>
            </div>
            <div className="depth-value">{depth}</div>
          </div>
          <p className="form-help">
            Higher depth scans more pages but takes longer
          </p>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="scan-button"
        >
          {isLoading ? (
            <>
              <span className="button-spinner"></span>
              Scanning...
            </>
          ) : (
            <>
              <span>🔍</span>
              Start Scan
            </>
          )}
        </button>
      </form>

      <div className="form-info">
        <p className="info-title">📋 Scanning Profile</p>
        <ul className="info-list">
          <li>✓ SQL Injection Detection</li>
          <li>✓ XSS Vulnerability Analysis</li>
          <li>✓ Authentication Issues</li>
          <li>✓ Insecure Deserialization</li>
          <li>✓ ML-based Confidence Scoring</li>
        </ul>
      </div>
    </div>
  )
}

export default ScanForm
