import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Properties from './pages/Properties';
import Rooms from './pages/Rooms';
import Bookings from './pages/Bookings';
import Payments from './pages/Payments';
import Commissions from './pages/Commissions';
import FrontDesk from './pages/FrontDesk';
import AdminPanel from './pages/AdminPanel';
import Login from './pages/Login';
import PropertyWebsite from './pages/PropertyWebsite';
import ChaletWebsite from './pages/ChaletWebsite';
import { AuthProvider, useAuth } from './context/AuthContext';
import { DataProvider } from './context/DataContext';

function AppRoutes() {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Login />;
  }

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/properties" element={<Properties />} />
        <Route path="/rooms" element={<Rooms />} />
        <Route path="/bookings" element={<Bookings />} />
        <Route path="/payments" element={<Payments />} />
        <Route path="/commissions" element={<Commissions />} />
        <Route path="/front-desk" element={<FrontDesk />} />
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/website" element={<PropertyWebsite />} />
        <Route path="/chalet" element={<ChaletWebsite />} />
      </Routes>
    </Layout>
  );
}

function App() {
  return (
    <AuthProvider>
      <DataProvider>
        <Router>
          <div className="min-h-screen bg-gray-50">
            <AppRoutes />
          </div>
        </Router>
      </DataProvider>
    </AuthProvider>
  );
}

export default App;