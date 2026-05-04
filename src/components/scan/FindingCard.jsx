import React, { useState } from 'react';
import { getSeverityColor } from '../../utils/riskUtils';

const FindingCard = ({ vuln, defaultOpen }) => {
  const [expanded, setExpanded] = useState(defaultOpen);

  const sevColor = getSeverityColor(vuln.severity);
  const mlLabel = vuln.ml_prediction === 1 ? 'VULNERABLE' : vuln.ml_prediction === 0 ? 'SAFE' : 'N/A';
  const mlColor = vuln.ml_prediction === 1 ? '#ba1a1a' : '#006600';

  return (
    <div className="finding-card">
      <div
        className="finding-card__header"
        onClick={() => setExpanded(!expanded)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === 'Enter' && setExpanded(!expanded)}
      >
        <div className="finding-card__severity">
          <span
            className="sev-badge"
            style={{ color: sevColor, borderColor: sevColor }}
          >
            {vuln.severity}
          </span>
        </div>
        <div className="finding-card__info">
          <div className="finding-card__type">{vuln.type}</div>
          <div className="finding-card__url">{vuln.url || 'N/A'}</div>
        </div>
        {vuln.ml_prediction !== undefined && (
          <span className="sev-badge" style={{ color: mlColor, borderColor: mlColor }}>
            ML: {mlLabel}
          </span>
        )}
        <span className="finding-card__arrow">{expanded ? '▲' : '▼'}</span>
      </div>

      {expanded && (
        <div className="finding-card__body">
          <div className="finding-card__metrics">
            {vuln.confidence > 0 && (
              <div className="metric">
                <div className="metric__label">Scanner Confidence</div>
                <div className="retro-progress retro-progress--thin">
                  <div
                    className="retro-progress__bar"
                    style={{ width: `${(vuln.confidence * 100)}%`, backgroundColor: sevColor }}
                  />
                </div>
                <span className="metric__value" style={{ color: sevColor }}>
                  {(vuln.confidence * 100).toFixed(1)}%
                </span>
              </div>
            )}
            {vuln.ml_confidence !== undefined && vuln.ml_confidence !== null && (
              <div className="metric">
                <div className="metric__label">ML Confidence</div>
                <div className="retro-progress retro-progress--thin">
                  <div
                    className="retro-progress__bar"
                    style={{ width: `${(vuln.ml_confidence * 100)}%`, backgroundColor: mlColor }}
                  />
                </div>
                <span className="metric__value" style={{ color: mlColor }}>
                  {(vuln.ml_confidence * 100).toFixed(1)}%
                </span>
              </div>
            )}
            {vuln.payload && (
              <div className="metric">
                <div className="metric__label">Payload Used</div>
                <span className="finding-card__payload">{vuln.payload}</span>
              </div>
            )}
          </div>

          {vuln.evidence && (
            <div className="finding-detail">
              <div className="finding-detail__label">Evidence</div>
              <div className="finding-detail__evidence">{vuln.evidence}</div>
            </div>
          )}

          {vuln.recommendations?.length > 0 && (
            <div className="finding-detail">
              <div className="finding-detail__label" style={{ color: '#006600' }}>
                Recommended Fixes
              </div>
              <ul className="finding-detail__recs">
                {vuln.recommendations.map((rec, i) => (
                  <li key={i}>{rec}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default FindingCard;
