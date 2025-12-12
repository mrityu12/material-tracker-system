import React, { useState } from 'react';
import Login from './components/auth/Login';
import AdminDashboard from './components/admin/AdminDashboard';
import WorkerDashboard from './components/worker/WorkerDashboard';
import { clusters, stationsData, initialItems } from './utils/constants';
import './index.css';

export default function App() {
  const [auth, setAuth] = useState(null);

  const handleLogin = (authData) => {
    setAuth(authData);
  };

  const handleLogout = () => {
    setAuth(null);
  };

  if (!auth) {
    return <Login onLogin={handleLogin} />;
  }

  if (auth.role === 'admin') {
    return (
      <AdminDashboard
        username={auth.username}
        authToken={auth.token}
        onLogout={handleLogout}
      />
    );
  }

  return (
    <WorkerDashboard
      username={auth.username}
      authToken={auth.token}
      onLogout={handleLogout}
      clusters={clusters}
      stationsData={stationsData}
      initialItems={initialItems}
    />
  );
}