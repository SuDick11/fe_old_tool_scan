import React from 'react';
import { getRiskColor } from '../../utils/riskUtils';

const ReportsPanel = ({ scanHistory }) => {
  return (
    <div className="reports-panel">
      <div className="panel-title">SECURITY REPORTS</div>
      {scanHistory.length === 0 ? (
        <div className="retro-empty">
          <div className="retro-empty__title">NO REPORTS YET</div>
          <div className="retro-empty__subtitle">Completed scans will appear here as reports.</div>
        </div>
      ) : (
        <table className="retro-table">
          <thead>
            <tr>
              <th>Report Name</th>
              <th>Date</th>
              <th>Risk Score</th>
              <th>Vulnerabilities</th>
            </tr>
          </thead>
          <tbody>
            {scanHistory.map((scan, idx) => (
              <tr key={idx}>
                <td>
                  Report #{idx + 1} — {scan.target || 'Unknown Target'}
                </td>
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
                <td>{scan.total_vulnerabilities ?? 0}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ReportsPanel;
