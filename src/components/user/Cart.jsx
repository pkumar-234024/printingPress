import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { removeFromCart, updateQuantity, clearCart } from '../../redux/slices/cartSlice';

const Cart = () => {
  const { items, total } = useSelector(state => state.cart);
  const { cards } = useSelector(state => state.cards);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const handleQuantityChange = (id, value, minimumOrder) => {
    const quantity = parseInt(value);
    
    if (quantity < minimumOrder) {
      dispatch(updateQuantity({ id, quantity: minimumOrder }));
    } else {
      dispatch(updateQuantity({ id, quantity }));
    }
  };
  
  const handleRemove = (id) => {
    dispatch(removeFromCart(id));
  };
  
  if (items.length === 0) {
    return (
      <div className="text-center p-6">
        <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
        <p className="mb-6">Your cart is empty.</p>
        <Link to="/" className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700">
          Continue Shopping
        </Link>
      </div>
    );
  }
  
  return (
    <div className="cart">
      <h1 className="text-2xl font-bold mb-6">Your Cart</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6">
              {items.map(item => {
                const card = cards.find(card => card.id === item.id);
                
                return (
                  <div key={item.id} className="flex items-center py-4 border-b border-gray-200 last:border-0">
                    <div className="w-16 h-16 overflow-hidden rounded-md">
                      <img src={card?.imagePath} alt={card?.title} className="w-full h-full object-cover" />
                    </div>
                    
                    <div className="ml-4 flex-grow">
                      <h3 className="font-semibold">{card?.title}</h3>
                      <p className="text-gray-600 text-sm">
                        ${item.price.toFixed(2)} per unit
                      </p>
                    </div>
                    
                    <div className="flex items-center mr-4">
                      <input
                        type="number"
                        min={item.minimumOrder}
                        value={item.quantity}
                        onChange={(e) => handleQuantityChange(item.id, e.target.value, item.minimumOrder)}
                        className="w-16 px-2 py-1 border border-gray-300 rounded-md text-center focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    
                    <div className="mr-4 text-right">
                      <p className="font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                    
                    <button
                      onClick={() => handleRemove(item.id)}
                      className="text-red-600 hover:text-red-800"
                      >
                        Remove
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          
          <div>
            <div className="bg-white rounded-lg shadow-md overflow-hidden p-6">
              <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
              
              <div className="py-4 border-b border-gray-200">
                <div className="flex justify-between mb-2">
                  <span>Subtotal</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>Calculated at checkout</span>
                </div>
              </div>
              
              <div className="py-4 border-b border-gray-200">
                <div className="flex justify-between font-semibold">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
              
              <div className="mt-6 space-y-4">
                <button
                  onClick={() => navigate('/checkout')}
                  className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
                >
                  Proceed to Checkout
                </button>
                
                <Link to="/" className="block w-full text-center py-2 px-4 rounded-md border border-gray-300 hover:bg-gray-50">
                  Continue Shopping
                </Link>
                
                <button
                  onClick={() => dispatch(clearCart())}
                  className="block w-full text-center py-2 px-4 text-red-600 hover:text-red-800"
                >
                  Clear Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default Cart;