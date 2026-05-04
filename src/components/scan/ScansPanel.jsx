import React from 'react';
import { getRiskColor } from '../../utils/riskUtils';

const ScansPanel = ({ scanHistory }) => {
  return (
    <div className="scans-panel">
      <div className="panel-title">SCAN HISTORY</div>
      {scanHistory.length === 0 ? (
        <div className="retro-empty">
          <div className="retro-empty__title">NO SCANS YET</div>
          <div className="retro-empty__subtitle">Run a scan from the Dashboard to see history here.</div>
        </div>
      ) : (
        <table className="retro-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Target</th>
              <th>Date</th>
              <th>Risk Score</th>
              <th>Status</th>
              <th>Findings</th>
            </tr>
          </thead>
          <tbody>
            {scanHistory.map((scan, idx) => (
              <tr key={idx}>
                <td className="mono">#{idx + 1}</td>
                <td>{scan.target || 'Unknown'}</td>
                <td className="mono">
                  {scan.scan_timestamp
                    ? new Date(scan.scan_timestamp).toLocaleString()
                    : new Date().toLocaleString()}
                </td>
                <td>
                  <span
                    className="sev-badge sev-badge--small"
                    style={{
                      backgroundColor: getRiskColor(scan.risk_score),
                      color: '#fff',
                    }}
                  >
                    {scan.risk_score ?? '--'}
                  </span>
                </td>
                <td>{scan.total_vulnerabilities > 0 ? 'VULNS FOUND' : 'CLEAN'}</td>
                <td>{scan.total_vulnerabilities ?? 0}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ScansPanel;
