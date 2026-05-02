import React from 'react'
import ScoreWidget from './ScoreWidget'
import './MinimalScanSummary.css'

function MinimalScanSummary({ results }) {
  const riskScore = results.risk_score || 0
  const findings = results.findings || []
  const targetUrl = results.target_url || 'N/A'

  // Count critical issues
  const criticalCount = findings.filter(f => f.severity === 'critical').length
  const totalIssues = findings.length

  // Get URL domain
  const urlDomain = targetUrl !== 'N/A' 
    ? new URL(targetUrl).hostname 
    : 'N/A'

  return (
    <div className="minimal-summary-container">
      <div className="minimal-summary-content">
        {/* Score Widget */}
        <div className="minimal-score-section">
          <ScoreWidget score={riskScore} label="Overall Risk Assessment" />
        </div>

        {/* Target URL */}
        <div className="minimal-info-item">
          <div className="minimal-item-header">
            <span className="minimal-icon">🎯</span>
            <span className="minimal-label">Target</span>
          </div>
          <div className="minimal-value" title={targetUrl}>
            {urlDomain}
          </div>
        </div>

        {/* Total Issues */}
        <div className="minimal-info-item">
          <div className="minimal-item-header">
            <span className="minimal-icon">🔍</span>
            <span className="minimal-label">Total Issues</span>
          </div>
          <div className="minimal-value minimal-critical">
            {totalIssues}
            {criticalCount > 0 && <span className="critical-badge">{criticalCount} Critical</span>}
          </div>
        </div>
      </div>
    </div>
  )
}

export default MinimalScanSummary
