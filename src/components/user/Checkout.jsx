import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { clearCart } from '../../redux/slices/cartSlice';

const Checkout = () => {
  const { items, total } = useSelector(state => state.cart);
  const { cards } = useSelector(state => state.cards);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    paymentMethod: 'creditCard'
  });
  
  const [loading, setLoading] = useState(false);
  
  if (items.length === 0) {
    return (
      <div className="text-center p-6">
        <h1 className="text-2xl font-bold mb-4">Checkout</h1>
        <p className="mb-6">Your cart is empty. Nothing to checkout.</p>
        <button
          onClick={() => navigate('/')}
          className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
        >
          Continue Shopping
        </button>
      </div>
    );
  }
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate order processing
    setTimeout(() => {
      // In a real app, you'd submit the order to your backend here
      console.log('Order placed:', {
        customer: formData,
        items,
        total
      });
      
      dispatch(clearCart());
      navigate('/checkout/success');
      setLoading(false);
    }, 1500);
  };
  
  return (
    <div className="checkout">
      <h1 className="text-2xl font-bold mb-6">Checkout</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6">
              <h2 className="text-lg font-semibold mb-4">Contact Information</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>
              
              <h2 className="text-lg font-semibold mb-4">Shipping Address</h2>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
                  <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">ZIP Code</label>
                  <input
                    type="text"
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>
              
              <h2 className="text-lg font-semibold mb-4">Payment Method</h2>
              
              <div className="mb-6">
                <div className="mb-2">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="creditCard"
                      checked={formData.paymentMethod === 'creditCard'}
                      onChange={handleChange}
                      className="mr-2"
                    />
                    <span>Credit Card</span>
                  </label>
                </div>
                
                <div>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="paypal"
                      checked={formData.paymentMethod === 'paypal'}
                      onChange={handleChange}
                      className="mr-2"
                    />
                    <span>PayPal</span>
                  </label>
                </div>
              </div>
              
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:bg-blue-400"
                disabled={loading}
              >
                {loading ? 'Processing...' : 'Place Order'}
              </button>
            </div>
          </form>
        </div>
        
        <div>
          <div className="bg-white rounded-lg shadow-md overflow-hidden p-6">
            <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
            
            <div className="mb-4">
              {items.map(item => {
                const card = cards.find(card => card.id === item.id);
                
                return (
                  <div key={item.id} className="flex items-center py-2">
                    <div className="w-12 h-12 overflow-hidden rounded-md">
                      <img src={card?.imagePath} alt={card?.title} className="w-full h-full object-cover" />
                    </div>
                    
                    <div className="ml-3 flex-grow">
                      <h3 className="font-medium text-sm">{card?.title}</h3>
                      <p className="text-gray-600 text-xs">Qty: {item.quantity}</p>
                    </div>
                    
                    <div className="text-right">
                      <p className="font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  </div>
                );
              })}
            </div>
            
            <div className="py-4 border-t border-gray-200">
              <div className="flex justify-between mb-2">
                <span>Subtotal</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span>Shipping</span>
                <span>$5.99</span>
              </div>
              <div className="flex justify-between font-semibold mt-2 pt-2 border-t border-gray-200">
                <span>Total</span>
                <span>${(total + 5.99).toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;