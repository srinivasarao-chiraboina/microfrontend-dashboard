import React, { JSX, Suspense, useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Link, Navigate } from 'react-router-dom';
import Login from './components/Login';
import { useTheme } from './components/ThemeProvider';

const Dashboard = React.lazy(() => import('dashboard/DashboardApp'));
const UserManagement = React.lazy(() => import('usermanagement/UserManagementApp'));

const App = () => {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem('user');
    return stored ? JSON.parse(stored) : null;
  });

  useEffect(() => {
    const handleStorage = () => {
      const updatedUser = localStorage.getItem('user');
      setUser(updatedUser ? JSON.parse(updatedUser) : null);
    };

    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  const isAuthenticated = !!user;

  const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('authToken');
    setUser(null);
    window.location.href = '/login';
  };

  const PrivateRoute = ({ element }: { element: JSX.Element }) => {
    return isAuthenticated ? element : <Navigate to="/login" replace />;
  };


  const ThemeToggleButton = () => {
    const { theme, toggleTheme } = useTheme();

    return (
      <button onClick={toggleTheme}>
        Switch to {theme === 'light' ? 'Dark' : 'Light'} Mode
      </button>
    );
  };

  return (
    <BrowserRouter>
      <nav style={{ display: 'flex', gap: '1rem', padding: '1rem' }}>
        <ThemeToggleButton />
        {!isAuthenticated ? (
          window.location.pathname !== '/login' && <Link to="/login">Login</Link>
        ) : (
          <>
            <span>Welcome, {user.username}</span>
            <button onClick={logout}>Logout</button>
            <Link to="/users">User Management</Link>
            <Link to="/dashboard">Dashboard</Link>
          </>
        )}
      </nav>

      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/login" element={<Login onLogin={(user: any) => setUser(user)} />} />
          <Route path="/dashboard" element={<PrivateRoute element={<Dashboard />} />} />
          <Route path="/users/*" element={<PrivateRoute element={<UserManagement />} />} />
          <Route path="*" element={<Navigate to={isAuthenticated ? '/users' : '/login'} replace />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default App;