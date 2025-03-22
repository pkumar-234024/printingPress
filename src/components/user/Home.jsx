import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Home = () => {
  const { cards, status, error } = useSelector(state => state.cards);
  
  if (status === 'loading') {
    return <div className="text-center p-6">Loading...</div>;
  }
  
  if (status === 'failed') {
    return <div className="text-center p-6 text-red-600">Error: {error}</div>;
  }
  
  if (cards.length === 0) {
    return (
      <div className="text-center p-6">
        <p>No cards available at the moment. Please check back later.</p>
      </div>
    );
  }
  
  return (
    <div className="home">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Print Shop Cards</h1>
        <p className="text-gray-600">Browse our collection of high-quality printable cards</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {cards.map(card => (
          <Link to={`/card/${card.id}`} key={card.id}>
            <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <div className="h-48 overflow-hidden">
                <img src={card.imagePath} alt={card.title} className="w-full h-full object-cover" />
              </div>
              
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-2">{card.title}</h3>
                <p className="text-gray-700 mb-2 line-clamp-2">{card.description}</p>
                <div className="flex justify-between items-center mt-2">
                  <span className="font-bold text-lg">${card.price.toFixed(2)}</span>
                  <span className="text-sm text-gray-600">Min: {card.minimumOrder}</span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Home;