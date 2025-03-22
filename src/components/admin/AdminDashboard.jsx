import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const AdminDashboard = () => {
  const { cards } = useSelector(state => state.cards);
  
  return (
    <div className="admin-dashboard">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Quick Stats</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-blue-50 p-4 rounded-md">
              <p className="text-sm text-gray-600">Total Cards</p>
              <p className="text-2xl font-bold">{cards.length}</p>
            </div>
            {/* Add more stats as needed */}
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
          <div className="space-y-2">
            <Link to="/admin/add-card" className="block w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 text-center">
              Add New Card
            </Link>
            <Link to="/admin/cards" className="block w-full bg-gray-600 text-white py-2 px-4 rounded hover:bg-gray-700 text-center">
              Manage Cards
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;