import React, { useState } from 'react';
import FindingCard from './FindingCard';
import { getRiskLabel, getRiskColor } from '../../utils/riskUtils';

const SCAN_PROFILES = [
  { value: 'quick', label: 'Quick' },
  { value: 'deep', label: 'Deep' },
];

const DashboardPanel = ({ scanResults, isLoading, error, onScan }) => {
  const [url, setUrl] = useState('');
  const [scanProfile, setScanProfile] = useState('quick');

  const normalizedResults = React.useMemo(() => {
    if (!scanResults) return null;
    return {
      target_url: scanResults.target_url || '',
      risk_score: Math.round((scanResults.risk_score || 0) * 100),
      assets_scanned: 1,
      vulnerabilities: (scanResults.findings || []).map((f) => {
        let recs = f.recommendations || [];
        if (!Array.isArray(recs) || recs.length === 0) {
          const fixRec = f.fix_recommendation;
          if (typeof fixRec === 'string' && fixRec.trim()) {
            recs = fixRec.split('\n').filter(Boolean);
          }
        }
        if (!Array.isArray(recs) || recs.length === 0) {
          recs = [`Review and remediate ${f.vulnerability_type || f.type || 'this vulnerability'} according to OWASP guidelines.`];
        }
        return {
          severity: f.severity || 'LOW',
          type: f.vulnerability_type || f.type || 'Unknown',
          url: f.url || '',
          status: f.status || 'Open',
          confidence: f.confidence || 0,
          payload: f.payload || '',
          evidence: f.evidence || '',
          recommendations: recs,
          ml_prediction: f.ml_prediction,
          ml_confidence: f.ml_confidence,
        };
      }),
      total_vulnerabilities: scanResults.total_vulnerabilities || 0,
      scan_timestamp: scanResults.scan_timestamp || '',
    };
  }, [scanResults]);

  const riskScore = normalizedResults?.risk_score ?? null;
  const vulnCount = normalizedResults?.vulnerabilities?.length ?? 0;
  const criticalHigh = normalizedResults?.vulnerabilities?.filter(
    (v) => ['CRITICAL', 'HIGH'].includes((v.severity || '').toUpperCase())
  ).length ?? 0;
  const mediumCount = normalizedResults?.vulnerabilities?.filter(
    (v) => (v.severity || '').toUpperCase() === 'MEDIUM'
  ).length ?? 0;
  const lowCount = normalizedResults?.vulnerabilities?.filter(
    (v) => (v.severity || '').toUpperCase() === 'LOW'
  ).length ?? 0;

  const handleSubmit = () => {
    if (!url.trim()) return;
    onScan(url, scanProfile);
  };

  return (
    <div className="dashboard-panel">
      <div className="dashboard-panel__top-row">
        {/* Scan Form */}
        <div className="dashboard-panel__scan-form retro-card">
          <div className="panel-title">SCAN TARGET</div>
          {error && <div className="retro-error">{error}</div>}
          <div className="form-group">
            <label className="form-label">Target URL / IP</label>
            <input
              className="sunken-panel"
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://example.com"
              disabled={isLoading}
              onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
            />
          </div>
          <div className="form-row">
            <select
              className="sunken-panel"
              value={scanProfile}
              onChange={(e) => setScanProfile(e.target.value)}
              disabled={isLoading}
            >
              {SCAN_PROFILES.map((p) => (<option key={p.value} value={p.value}>{p.label}</option>))}
            </select>
            <button
              className="retro-btn retro-btn--primary"
              onClick={handleSubmit}
              disabled={isLoading}
            >
              {isLoading ? 'SCANNING...' : 'SCAN'}
            </button>
          </div>
        </div>

        {/* Risk Score */}
        <div className="dashboard-panel__risk-score retro-card">
          <div className="panel-title">RISK SCORE</div>
          <div className="risk-score" style={{ color: getRiskColor(riskScore) }}>
            {riskScore !== null ? riskScore : '--'}
          </div>
          <div className="risk-label" style={{ backgroundColor: getRiskColor(riskScore) }}>
            {getRiskLabel(riskScore)}
          </div>
          <div className="risk-progress">
            <div
              className="risk-progress__bar"
              style={{ width: `${riskScore ?? 0}%`, backgroundColor: getRiskColor(riskScore) }}
            />
          </div>
          {normalizedResults?.target_url && (
            <div className="risk-score__url">{normalizedResults.target_url}</div>
          )}
        </div>

        {/* Vulnerability Summary */}
        <div className="dashboard-panel__vuln-summary retro-card">
          <div className="panel-title">VULNERABILITY SUMMARY</div>
          <div className="vuln-stats">
            <div className="vuln-stat">
              <span className="vuln-stat__label">Total Findings</span>
              <span className="vuln-stat__value" style={{ color: 'var(--error)' }}>{vulnCount}</span>
            </div>
            <div className="vuln-stat">
              <span className="vuln-stat__label"><span className="dot" style={{ backgroundColor: '#ba1a1a' }} />Critical / High</span>
              <span className="vuln-stat__value" style={{ color: '#ba1a1a' }}>{criticalHigh}</span>
            </div>
            <div className="vuln-stat">
              <span className="vuln-stat__label"><span className="dot" style={{ backgroundColor: '#767684' }} />Medium</span>
              <span className="vuln-stat__value" style={{ color: '#767684' }}>{mediumCount}</span>
            </div>
            <div className="vuln-stat">
              <span className="vuln-stat__label"><span className="dot" style={{ backgroundColor: '#006600' }} />Low</span>
              <span className="vuln-stat__value" style={{ color: '#006600' }}>{lowCount}</span>
            </div>
            <div className="vuln-stat">
              <span className="vuln-stat__label">Assets Scanned</span>
              <span className="vuln-stat__value">{normalizedResults?.assets_scanned ?? 1}</span>
            </div>
            <div className="vuln-stat">
              <span className="vuln-stat__label">Last Scan</span>
              <span className="vuln-stat__value mono">
                {normalizedResults?.scan_timestamp
                  ? new Date(normalizedResults.scan_timestamp).toLocaleString()
                  : '--'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Findings List */}
      <div className="dashboard-panel__findings retro-card">
        <div className="panel-title">
          ACTIVE VULNERABILITIES ({vulnCount})
        </div>
        <div className="findings-list">
          {isLoading && (
            <div className="retro-loading">
              <div className="retro-loading__title">SCANNING IN PROGRESS</div>
              <div className="retro-loading__subtitle">Analyzing target, please wait...</div>
            </div>
          )}
          {!isLoading && !scanResults && (
            <div className="retro-empty">
              <div className="retro-empty__title">AWAITING SCAN</div>
              <div className="retro-empty__subtitle">Enter a target URL above to begin analysis.</div>
            </div>
          )}
          {!isLoading && scanResults && vulnCount === 0 && (
            <div className="retro-empty">
              <div className="retro-empty__title" style={{ color: '#006600' }}>SYSTEM SECURE</div>
              <div className="retro-empty__subtitle">No vulnerabilities found on this target.</div>
            </div>
          )}
          {!isLoading && scanResults && normalizedResults && vulnCount > 0 && normalizedResults.vulnerabilities.map((v, idx) => (
            <FindingCard key={idx} vuln={v} defaultOpen={idx === 0} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardPanel;
