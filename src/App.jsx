import React, { useState } from 'react'
import ScanForm from './components/ScanForm'
import ScanResults from './components/ScanResults'
import Header from './components/Header'
import ProgressBar from './components/ProgressBar'
import ExampleWidget from './components/ExampleWidget'
import MinimalScanSummary from './components/MinimalScanSummary'
import './App.css'

function App() {
  const [scanResults, setScanResults] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleScan = async (url, depth) => {
    setIsLoading(true)
    setError(null)
    setScanResults(null)

    try {
      const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
      const response = await fetch(`${backendUrl}/scan`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          url: url,
          depth: depth,
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.detail || 'Scan failed')
      }

      const data = await response.json()
      setScanResults(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="app">
      <Header />
      <div className="container">
        <div className="app-grid">
          <div className="app-form-section">
            <ScanForm onScan={handleScan} isLoading={isLoading} />
            {error && (
              <div className="error-message">
                <span className="error-icon">⚠️</span>
                <p>{error}</p>
              </div>
            )}
            {isLoading && (
              <div className="results-section">
                <ProgressBar isActive={true} />
                <div className="loading-section">
                  <div className="spinner"></div>
                  <p>Scanning in progress...</p>
                  <p className="scan-hint">This may take 15-60 seconds depending on site size and depth</p>
                </div>
              </div>
            )}
            {scanResults && (
              <div className="results-section">
                <ScanResults results={scanResults} />
              </div>
            )}
          </div>
          <div className="app-preview-section">
            {!scanResults && <ExampleWidget />}
            {scanResults && (
              <div className="results-section-2">
                <MinimalScanSummary results={scanResults} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
