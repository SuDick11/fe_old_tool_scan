import React from 'react';

const NAV_TABS = [
  { id: 'dashboard', label: 'Dashboard' },
  { id: 'scans', label: 'Scans' },
  { id: 'reports', label: 'Reports' },
];

const Header = ({ activeTab, onTabChange }) => (
  <header className="header">
    <div className="header__left">
      <div className="header__logo">AI-Assisted Web Vulnerability Scanner</div>
      <nav className="retro-nav">
        {NAV_TABS.map(({ id, label }) => (
          <button
            key={id}
            className={`retro-nav__tab ${activeTab === id ? 'retro-nav__tab--active' : ''}`}
            onClick={() => onTabChange(id)}
          >
            {label}
          </button>
        ))}
      </nav>
    </div>
    <div className="header__right" />
  </header>
);

export default Header;
