import React from 'react';

const StatusBar = ({ activeTab }) => {
  return (
    <div className="retro-statusbar">
      <span>Ready</span>
      <span>Active: {activeTab ? activeTab.toUpperCase() : 'NONE'}</span>
      <span>VULN_SCAN</span>
    </div>
  );
};

export default StatusBar;
