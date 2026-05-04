import React, { useState, useCallback } from 'react';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import StatusBar from './components/layout/StatusBar';
import DashboardPanel from './components/scan/DashboardPanel';
import ScansPanel from './components/scan/ScansPanel';
import ReportsPanel from './components/scan/ReportsPanel';
import { useScan } from './hooks/useScan';
import './styles/retro.css';
import './App.css';

const App = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [scanHistory, setScanHistory] = useState([]);
  const { scanResults, isLoading, error, startScan } = useScan();

  const handleScan = useCallback(async (url, depth) => {
    try {
      const data = await startScan(url, depth);
      setScanHistory((prev) => [
        {
          id: prev.length + 1,
          target: data.target_url || url,
          date: data.scan_timestamp
            ? new Date(data.scan_timestamp).toLocaleString()
            : new Date().toLocaleString(),
          score: Math.round((data.risk_score || 0) * 100),
          status: 'Completed',
          findings: data.total_vulnerabilities || 0,
        },
        ...prev,
      ]);
    } catch {
      // error handled by useScan
    }
  }, [startScan]);

  const renderPanel = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <DashboardPanel
            scanResults={scanResults}
            isLoading={isLoading}
            error={error}
            onScan={handleScan}
          />
        );
      case 'scans':
        return <ScansPanel scanHistory={scanHistory} />;
      case 'reports':
        return <ReportsPanel scanHistory={scanHistory} />;
      default:
        return null;
    }
  };

  return (
    <div className="app-shell">
      <Header activeTab={activeTab} onTabChange={setActiveTab} />
      <main className="app-shell__main">{renderPanel()}</main>
      <StatusBar activeTab={activeTab} />
      <Footer />
    </div>
  );
};

export default App;
