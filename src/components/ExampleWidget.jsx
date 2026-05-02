import React from 'react'
import ScoreWidget from './ScoreWidget'
import './ExampleWidget.css'

function ExampleWidget() {
  return (
    <div className="example-widget-container">
      <div className="example-header">
        <h3>📊 Example Result</h3>
        <p className="example-subtitle">This is what your scan results will look like</p>
      </div>

      <div className="example-widget-preview">
        <ScoreWidget score={42} label="Overall Risk Assessment" />
      </div>

      <div className="example-info">
        <div className="info-item">
          <span className="info-icon">🔴</span>
          <div>
            <strong>Critical Issues</strong>
            <p>Requires immediate attention</p>
          </div>
        </div>
        <div className="info-item">
          <span className="info-icon">🟠</span>
          <div>
            <strong>High Risk</strong>
            <p>Significant security concerns</p>
          </div>
        </div>
        <div className="info-item">
          <span className="info-icon">🟡</span>
          <div>
            <strong>Medium Risk</strong>
            <p>Should be reviewed and fixed</p>
          </div>
        </div>
        <div className="info-item">
          <span className="info-icon">🟢</span>
          <div>
            <strong>Low Risk</strong>
            <p>Minor issues to consider</p>
          </div>
        </div>
      </div>

      <div className="example-features">
        <h4>What You'll Get:</h4>
        <ul>
          <li>✓ Detailed vulnerability scan results</li>
          <li>✓ Risk score with visual gauge</li>
          <li>✓ Vulnerability breakdown by type</li>
          <li>✓ Actionable fix recommendations</li>
          <li>✓ Response evidence and details</li>
        </ul>
      </div>
    </div>
  )
}

export default ExampleWidget
