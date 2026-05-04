import React from 'react';

const ScansPanel = ({ scanHistory }) => {
  return (
    <div className="retro-card flex-grow" style={{ margin: 'var(--spacing-md)', overflow: 'hidden' }}>
      <div className="retro-titlebar">Scan History</div>
      <div className="overflow-y-auto flex-grow">
        {(!scanHistory || scanHistory.length === 0) ? (
          <div className="retro-empty">
            <div className="retro-empty__title">NO SCAN HISTORY</div>
            <div className="retro-empty__subtitle">Run a scan from the Dashboard to see history here.</div>
          </div>
        ) : (
          <table className="retro-table">
            <thead>
              <tr>
                {['ID', 'Target', 'Date', 'Risk Score', 'Status', 'Findings'].map((h) => (
                  <th key={h}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {scanHistory.map((scan) => (
                <tr key={scan.id}>
                  <td>{scan.id}</td>
                  <td style={{ fontFamily: 'var(--font-mono)' }}>{scan.target}</td>
                  <td style={{ fontFamily: 'var(--font-mono)' }}>{scan.date}</td>
                  <td>
                    <span className={`sev-badge ${scan.score >= 70 ? 'sev-badge--critical' : scan.score >= 40 ? 'sev-badge--medium' : 'sev-badge--low'}`}>
                      {scan.score}
                    </span>
                  </td>
                  <td>{scan.status}</td>
                  <td style={{ fontFamily: 'var(--font-mono)', color: 'var(--error)' }}>{scan.findings}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default ScansPanel;
