import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route, Link, Navigate } from 'react-router-dom';

const Dashboard = React.lazy(() => import('dashboard/DashboardApp'));
const UserManagement = React.lazy(() => import('usermanagement/UserManagementApp'));

const App = () => (
  <BrowserRouter>
    <nav style={{ display: 'flex', gap: '1rem', padding: '1rem' }}>
      <Link to="/dashboard">Dashboard</Link>
      <Link to="/users">User Management</Link>
    </nav>
    <React.Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/users/*" element={<UserManagement />} />
      </Routes>
    </React.Suspense>
  </BrowserRouter>
);

export default App;