import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchCards } from '../../redux/slices/cardsSlice';

const CardList = () => {
  const dispatch = useDispatch();
  const { cards, status, error } = useSelector(state => state.cards);
  
  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchCards());
    }
  }, [dispatch, status]);
  
  if (status === 'loading') {
    return <div className="text-center p-6">Loading...</div>;
  }
  
  if (status === 'failed') {
    return <div className="text-center p-6 text-red-600">Error: {error}</div>;
  }
  
  if (cards.length === 0) {
    return (
      <div className="text-center p-6">
        <p className="mb-4">No cards found. Get started by adding your first card.</p>
        <Link to="/admin/add-card" className="inline-block bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">
          Add New Card
        </Link>
      </div>
    );
  }
  
  return (
    <div className="card-list">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Manage Cards</h2>
        <Link to="/admin/add-card" className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">
          Add New Card
        </Link>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cards.map(card => (
          <div key={card.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="h-48 overflow-hidden">
              <img src={card.imagePath} alt={card.title} className="w-full h-full object-cover" />
            </div>
            
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-2">{card.title}</h3>
              <p className="text-gray-700 mb-2 line-clamp-2">{card.description}</p>
              <div className="flex justify-between items-center">
                <span className="font-semibold">${card.price.toFixed(2)}</span>
                <span className="text-sm text-gray-600">Min: {card.minimumOrder}</span>
              </div>
              
              <div className="mt-4 flex justify-end">
                <Link to={`/admin/edit-card/${card.id}`} className="text-blue-600 hover:text-blue-800 mr-3">
                  Edit
                </Link>
                <button className="text-red-600 hover:text-red-800">
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CardList;