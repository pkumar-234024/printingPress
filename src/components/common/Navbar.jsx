import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { login, logout } from '../../redux/slices/authSlice';

const Navbar = () => {
  const { items } = useSelector(state => state.cart);
  const { isAdmin, user } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  // For demo purposes, we'll add admin login/logout functionality
  const handleAdminLogin = () => {
    dispatch(login({ id: 'admin1', name: 'Admin User', role: 'admin' }));
    navigate('/admin');
  };
  
  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };
  
  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <div>
            <Link to="/" className="text-2xl font-bold text-blue-600">
              Print Shop
            </Link>
          </div>
          
          <div className="flex items-center space-x-4">
            <Link to="/cart" className="relative">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              
              {items.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {items.length}
                </span>
              )}
            </Link>
            
            {isAdmin ? (
              <div className="flex items-center space-x-2">
                <Link to="/admin" className="text-blue-600 hover:text-blue-800">
                  Admin Panel
                </Link>
                <button onClick={handleLogout} className="text-gray-600 hover:text-gray-800">
                  Logout
                </button>
              </div>
            ) : (
              <button onClick={handleAdminLogin} className="text-gray-600 hover:text-gray-800">
                Admin Login
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;