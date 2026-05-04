import React from 'react';

const StatusBar = ({ activeTab }) => (
  <div className="retro-statusbar">
    <span>Ready</span>
    <span>|</span>
    <span>Active: {activeTab.toUpperCase()}</span>
    <span>|</span>
    <span>VULN_SCAN</span>
  </div>
);

export default StatusBar;
