import React, { useState, useEffect } from 'react'
import './ProgressBar.css'

function ProgressBar({ isActive = false, duration = 30 }) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    if (!isActive) {
      setProgress(0)
      return
    }

    // Simulate scan progress with easing
    const interval = setInterval(() => {
      setProgress(prev => {
        // Slow down as we approach 95%
        const increment = prev > 80 ? 0.5 : prev > 50 ? 1 : 2
        const newProgress = Math.min(prev + increment, 95)
        return newProgress
      })
    }, 100)

    return () => clearInterval(interval)
  }, [isActive])

  // Complete progress when scan finishes
  useEffect(() => {
    if (!isActive && progress > 0) {
      setProgress(100)
      setTimeout(() => setProgress(0), 500)
    }
  }, [isActive, progress])

  if (progress === 0 && !isActive) return null

  return (
    <div className="progress-bar-container">
      <div className={`progress-bar-wrapper ${isActive ? 'active' : 'complete'}`}>
        <div 
          className="progress-bar-fill"
          style={{ width: `${progress}%` }}
        />
        <div className="progress-bar-glow" />
      </div>
      <div className="progress-text">
        {isActive ? (
          <>
            <span>Scanning...</span>
            <span className="progress-percent">{Math.round(progress)}%</span>
          </>
        ) : (
          <span className="progress-complete">✓ Complete</span>
        )}
      </div>
    </div>
  )
}

export default ProgressBar
