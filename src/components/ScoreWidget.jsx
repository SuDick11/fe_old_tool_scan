import React from 'react'
import './ScoreWidget.css'

function ScoreWidget({ score = 0, label = "Risk Score" }) {
  // Convert score (0-1) to percentage (0-100)
  const percentage = Math.round(score * 100)
  
  // Determine color based on score
  const getScoreColor = (pct) => {
    if (pct >= 80) return 'critical'
    if (pct >= 60) return 'high'
    if (pct >= 40) return 'medium'
    if (pct >= 20) return 'low'
    return 'minimal'
  }
  
  const getSeverityLabel = (pct) => {
    if (pct >= 80) return 'Critical'
    if (pct >= 60) return 'High'
    if (pct >= 40) return 'Medium'
    if (pct >= 20) return 'Low'
    return 'Minimal'
  }
  
  const scoreColor = getScoreColor(percentage)
  const severityLabel = getSeverityLabel(percentage)

  return (
    <div className="score-widget">
      <div className="widget-header">
        <h3>{label}</h3>
      </div>
      
      <div className="widget-container">
        <div className={`gauge-circle ${scoreColor}`}>
          <svg className="gauge-svg" viewBox="0 0 200 200">
            {/* Background circle */}
            <circle
              cx="100"
              cy="100"
              r="90"
              className="gauge-background"
              fill="none"
              stroke="currentColor"
              strokeWidth="8"
            />
            
            {/* Progress circle */}
            <circle
              cx="100"
              cy="100"
              r="90"
              className="gauge-progress"
              fill="none"
              stroke="currentColor"
              strokeWidth="8"
              strokeDasharray={`${(percentage / 100) * (2 * Math.PI * 90)} ${2 * Math.PI * 90}`}
              strokeLinecap="round"
              style={{
                transform: 'rotate(-90deg)',
                transformOrigin: '100px 100px',
              }}
            />
          </svg>
          
          <div className="gauge-content">
            <div className="gauge-percentage">{percentage}%</div>
            <div className="gauge-label">Score</div>
          </div>
        </div>

        <div className="widget-info">
          <div className="severity-badge" data-severity={scoreColor}>
            <span className="severity-icon">⚠️</span>
            <span className="severity-text">{severityLabel}</span>
          </div>
          
          <div className="score-details">
            <div className="detail-row">
              <span className="detail-label">Confidence:</span>
              <span className="detail-value">{percentage}%</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">Level:</span>
              <span className="detail-value">{severityLabel}</span>
            </div>
          </div>
          
          <div className="risk-description">
            {percentage === 0 && "✅ No vulnerabilities detected"}
            {percentage > 0 && percentage < 20 && "🟢 Minimal risk detected"}
            {percentage >= 20 && percentage < 40 && "🟡 Low risk detected"}
            {percentage >= 40 && percentage < 60 && "🟠 Medium risk detected"}
            {percentage >= 60 && percentage < 80 && "🔴 High risk detected"}
            {percentage >= 80 && "🔴 Critical risk detected"}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ScoreWidget
