import React from 'react';
import UserStats from './components/UserStats';

const DashboardApp = () => {
  return (
    <div style={{ padding: '2rem', backgroundColor: '#f0f2f5' }}>
      <h2>📊 Dashboard</h2>
      <UserStats />
    </div>
  );
};

export default DashboardApp;