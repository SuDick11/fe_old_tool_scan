import React, { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';

const retroCodeTheme = {
  'code[class*="language-"]': { color: '#000000', fontFamily: "'Courier New', Courier, monospace" },
  'pre[class*="language-"]': { color: '#000000', fontFamily: "'Courier New', Courier, monospace" },
  comment: { color: '#5a5a5a' },
  prolog: { color: '#000000' },
  doctype: { color: '#000000' },
  cdata: { color: '#000000' },
  punctuation: { color: '#000000' },
  property: { color: '#000080' },
  tag: { color: '#000080' },
  boolean: { color: '#808000' },
  number: { color: '#808000' },
  constant: { color: '#000080' },
  symbol: { color: '#808000' },
  selector: { color: '#006600' },
  'attr-name': { color: '#000080' },
  string: { color: '#006600' },
  char: { color: '#006600' },
  builtin: { color: '#006600' },
  inserted: { color: '#006600' },
  operator: { color: '#000000' },
  entity: { color: '#000080', cursor: 'help' },
  url: { color: '#000080' },
  '.language-css .token.string': { color: '#808000' },
  '.style .token.string': { color: '#808000' },
  variable: { color: '#000000' },
  atrule: { color: '#000080' },
  'attr-value': { color: '#006600' },
  function: { color: '#000000' },
  'class-name': { color: '#000080' },
  keyword: { color: '#000080' },
  regex: { color: '#006600' },
  important: { color: '#808000', fontWeight: 'bold' },
  bold: { fontWeight: 'bold' },
  italic: { fontStyle: 'italic' },
};

const FindingCard = ({ vuln, defaultOpen = false }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="finding-card outset">
      <button className="finding-card__header" onClick={() => setIsOpen(!isOpen)}>
        <span className="finding-card__type">{vuln.vulnerability_type || 'Unknown'}</span>
        <span className="finding-card__url">{vuln.target_endpoint || ''}</span>
        <span className="finding-card__arrow">{isOpen ? '\u25B2' : '\u25BC'}</span>
      </button>

      {isOpen && (
        <div className="finding-card__body sunken-panel">
          <div className="finding-card__field">
            <span className="finding-card__field-label">Vulnerability Type:</span>
            <code>{vuln.vulnerability_type || 'N/A'}</code>
          </div>

          <div className="finding-card__field">
            <span className="finding-card__field-label">Target Endpoint:</span>
            <code>{vuln.target_endpoint || 'N/A'}</code>
          </div>

          <div className="finding-card__field">
            <span className="finding-card__field-label">HTTP Method:</span>
            <code>{vuln.method || 'N/A'}</code>
          </div>

          <div className="finding-card__field">
            <span className="finding-card__field-label">Vulnerable Parameter:</span>
            <code>{vuln.vulnerable_parameter || 'N/A'}</code>
          </div>

          <div className="finding-card__field">
            <span className="finding-card__field-label">Payload:</span>
            <code className="finding-card__payload">{vuln.payload || 'N/A'}</code>
          </div>

          <div className="finding-card__field">
            <span className="finding-card__field-label">Evidence:</span>
            <pre className="finding-card__evidence">{vuln.evidence || 'No evidence available.'}</pre>
          </div>

          {vuln.llm_explanation && (
            <div className="finding-card__field">
              <span className="finding-card__field-label">LLM Explanation:</span>
              <pre className="finding-card__evidence">{vuln.llm_explanation}</pre>
            </div>
          )}

          {vuln.remediation_code && (
            <div className="finding-card__field">
              <span className="finding-card__field-label">Remediation:</span>
              <SyntaxHighlighter
                language="python"
                style={retroCodeTheme}
                customStyle={{
                  backgroundColor: '#f0f0f0',
                  padding: '8px 12px',
                  fontSize: '11px',
                  fontFamily: "'Courier New', Courier, monospace",
                  border: '1px solid #a0a0a0',
                  borderTop: '1px solid #808080',
                  borderLeft: '1px solid #808080',
                }}
              >
                {vuln.remediation_code
                  .replace(/^```[\w]*\n?/, '')
                  .replace(/```$/, '')
                  .trim()}
              </SyntaxHighlighter>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default FindingCard;
