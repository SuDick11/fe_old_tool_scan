import React, { useState } from 'react'
import ScoreWidget from './ScoreWidget'
import './ScanResults.css'

function ScanResults({ results }) {
  const [expandedRow, setExpandedRow] = useState(null)

  const getRiskLevel = (score) => {
    if (score >= 0.8) return { level: 'Critical', color: 'critical', icon: '🔴' }
    if (score >= 0.6) return { level: 'High', color: 'high', icon: '🟠' }
    if (score >= 0.4) return { level: 'Medium', color: 'medium', icon: '🟡' }
    if (score >= 0.2) return { level: 'Low', color: 'low', icon: '🟢' }
    return { level: 'Minimal', color: 'minimal', icon: '🔵' }
  }

  const getVulnerabilityIcon = (vulnType) => {
    const icons = {
      'SQL Injection': '💉',
      'XSS': '⚠️',
      'Broken Authentication': '🔐',
      'Insecure Deserialization': '🔄',
      'default': '🛑'
    }
    return icons[vulnType] || icons['default']
  }

  const riskData = getRiskLevel(results.risk_score)
  const vulnerabilities = results.findings || []
  const vulnsByType = {}

  vulnerabilities.forEach(vuln => {
    const type = vuln.vulnerability_type
    vulnsByType[type] = (vulnsByType[type] || 0) + 1
  })

  return (
    <div className="scan-results-container">
      {/* Risk Score Widget */}
      <ScoreWidget 
        score={results.risk_score} 
        label="Overall Risk Assessment"
      />
      
      {/* Summary Cards */}
      <div className="results-summary">
        <div className="summary-card">
          <div className="card-icon">🎯</div>
          <div className="card-content">
            <p className="card-label">Target</p>
            <p className="card-value" title={results.target_url}>
              {results.target_url.replace(/^https?:\/\//, '').substring(0, 40)}
            </p>
          </div>
        </div>

        <div className="summary-card">
          <div className="card-icon">🔍</div>
          <div className="card-content">
            <p className="card-label">Total Issues</p>
            <p className="card-value">{results.total_vulnerabilities}</p>
          </div>
        </div>

        <div className={`summary-card risk-card ${riskData.color}`}>
          <div className="card-icon">{riskData.icon}</div>
          <div className="card-content">
            <p className="card-label">Risk Score</p>
            <p className="card-value">{(results.risk_score * 100).toFixed(0)}%</p>
            <p className="card-level">{riskData.level}</p>
          </div>
        </div>

        <div className="summary-card">
          <div className="card-icon">📊</div>
          <div className="card-content">
            <p className="card-label">Scan Time</p>
            <p className="card-value">
              {new Date(results.scan_timestamp).toLocaleTimeString()}
            </p>
          </div>
        </div>
      </div>

      {/* Vulnerability Distribution */}
      <div className="vulnerability-distribution">
        <h3>Vulnerability Distribution</h3>
        <div className="vuln-types">
          {Object.entries(vulnsByType).map(([type, count]) => (
            <div key={type} className="vuln-type-badge">
              <span className="badge-icon">{getVulnerabilityIcon(type)}</span>
              <span className="badge-label">{type}</span>
              <span className="badge-count">{count}</span>
            </div>
          ))}
          {Object.keys(vulnsByType).length === 0 && (
            <p className="no-vulns">✅ No vulnerabilities found!</p>
          )}
        </div>
      </div>

      {/* Findings Table */}
      {vulnerabilities.length > 0 && (
        <div className="findings-section">
          <h3>Detailed Findings</h3>
          <div className="table-responsive">
            <table className="findings-table">
              <thead>
                <tr>
                  <th>Type</th>
                  <th>URL</th>
                  <th>Confidence</th>
                  <th>Evidence</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {vulnerabilities.map((vuln, idx) => (
                  <React.Fragment key={idx}>
                    <tr
                      className={`finding-row ${
                        expandedRow === idx ? 'expanded' : ''
                      }`}
                      onClick={() =>
                        setExpandedRow(expandedRow === idx ? null : idx)
                      }
                    >
                      <td>
                        <span className="vuln-type-cell">
                          {getVulnerabilityIcon(vuln.vulnerability_type)}{' '}
                          {vuln.vulnerability_type}
                        </span>
                      </td>
                      <td className="url-cell">{vuln.url}</td>
                      <td>
                        <div className="confidence-bar">
                          <div
                            className="confidence-fill"
                            style={{
                              width: `${vuln.confidence * 100}%`,
                            }}
                          ></div>
                        </div>
                        <span className="confidence-text">
                          {(vuln.confidence * 100).toFixed(0)}%
                        </span>
                      </td>
                      <td className="evidence-cell">
                        {vuln.evidence.substring(0, 30)}...
                      </td>
                      <td className="expand-cell">
                        <span className={`expand-icon ${expandedRow === idx ? 'open' : ''}`}>
                          ▼
                        </span>
                      </td>
                    </tr>

                    {/* Expanded Details */}
                    {expandedRow === idx && (
                      <tr className="expanded-details">
                        <td colSpan="5">
                          <div className="details-content">
                            <div className="details-grid">
                              <div className="detail-item">
                                <h4>Evidence</h4>
                                <div className="evidence-box">
                                  {vuln.evidence}
                                </div>
                              </div>

                              {vuln.payload && (
                                <div className="detail-item">
                                  <h4>Payload Used</h4>
                                  <div className="payload-box">
                                    {vuln.payload}
                                  </div>
                                </div>
                              )}

                              <div className="detail-item">
                                <h4>Scores</h4>
                                <div className="score-display">
                                  <div className="score-line">
                                    <span>Scanner Confidence:</span>
                                    <strong>{(vuln.confidence * 100).toFixed(1)}%</strong>
                                  </div>
                                  {vuln.ml_confidence !== null && (
                                    <div className="score-line">
                                      <span>ML Confidence:</span>
                                      <strong>
                                        {(vuln.ml_confidence * 100).toFixed(1)}%
                                      </strong>
                                    </div>
                                  )}
                                </div>
                              </div>

                              {vuln.fix_recommendation && (
                                <div className="detail-item full-width">
                                  <h4>Fix Recommendation</h4>
                                  <div className="fix-box">
                                    {vuln.fix_recommendation}
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}

export default ScanResults
