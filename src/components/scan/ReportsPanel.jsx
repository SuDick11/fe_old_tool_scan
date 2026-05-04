import React from 'react';

const ReportsPanel = ({ scanHistory }) => {
  const reports = (scanHistory || []).map((s, i) => ({
    name: `Scan Report - ${s.target}`,
    date: s.date,
    risk: s.score,
    id: s.id,
  }));

  return (
    <div className="retro-card flex-grow" style={{ margin: 'var(--spacing-md)', overflow: 'hidden' }}>
      <div className="retro-titlebar">Generated Reports</div>
      <div className="overflow-y-auto flex-grow">
        {reports.length === 0 ? (
          <div className="retro-empty">
            <div className="retro-empty__title">NO REPORTS</div>
            <div className="retro-empty__subtitle">Completed scans will appear here.</div>
          </div>
        ) : (
          <table className="retro-table">
            <thead>
              <tr>
                {['Report Name', 'Date', 'Risk Score'].map((h) => (
                  <th key={h}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {reports.map((report) => (
                <tr key={report.id}>
                  <td style={{ fontFamily: 'var(--font-display)', fontWeight: 700 }}>{report.name}</td>
                  <td style={{ fontFamily: 'var(--font-mono)' }}>{report.date}</td>
                  <td>
                    <span className={`sev-badge ${report.risk >= 70 ? 'sev-badge--critical' : report.risk >= 40 ? 'sev-badge--medium' : 'sev-badge--low'}`}>
                      {report.risk}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default ReportsPanel;
