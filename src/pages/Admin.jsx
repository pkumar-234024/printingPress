import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AdminDashboard from '../components/admin/AdminDashboard';
import CardForm from '../components/admin/CardForm';
import CardList from '../components/admin/CardList';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const Admin = () => {
  const { isAdmin } = useSelector(state => state.auth);
  
  // Simple protection for admin routes (you'd want more robust auth in production)
  if (!isAdmin) {
    return <Navigate to="/" replace />;
  }
  
  return (
    <div className="admin-panel">
      <h1 className="text-2xl font-bold mb-6">Admin Panel</h1>
      <Routes>
        <Route path="/" element={<AdminDashboard />} />
        <Route path="/add-card" element={<CardForm />} />
        <Route path="/edit-card/:id" element={<CardForm />} />
        <Route path="/cards" element={<CardList />} />
      </Routes>
    </div>
  );
};

export default Admin;