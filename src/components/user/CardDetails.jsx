import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addToCart } from "../../redux/slices/cartSlice";

const CardDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { cards } = useSelector((state) => state.cards);
  console.log(cards);
  debugger;
  const card = cards.find((card) => card.id === id);

  const [quantity, setQuantity] = useState(card ? card.minimumOrder : 1);
  const [message, setMessage] = useState("");

  if (!card) {
    return <div className="text-center p-6">Card not found.</div>;
  }

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value);
    setQuantity(value < card.minimumOrder ? card.minimumOrder : value);
  };

  const totalPrice = card.price * quantity;

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        id: card.id,
        quantity,
        price: card.price,
        minimumOrder: card.minimumOrder,
        title: card.title,
        image: card.imagePath,
      })
    );

    setMessage("Added to cart!");

    setTimeout(() => {
      setMessage("");
    }, 3000);
  };

  return (
    <div className="card-details">
      <button
        onClick={() => navigate(-1)}
        className="mb-6 text-blue-600 hover:text-blue-800 flex items-center"
      >
        ← Back to all cards
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <img
            src={card.imagePath}
            alt={card.title}
            className="w-full h-auto"
          />
        </div>

        <div>
          <h1 className="text-2xl font-bold mb-2">{card.title}</h1>
          <p className="text-gray-700 mb-6">{card.description}</p>

          <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <div className="mb-4">
              <span className="text-gray-600">Price:</span>
              <span className="text-2xl font-bold ml-2">
                ${card.price.toFixed(2)}
              </span>
              <span className="text-gray-600 ml-1">per unit</span>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Quantity
              </label>
              <div className="flex items-center">
                <input
                  type="number"
                  min={card.minimumOrder}
                  value={quantity}
                  onChange={handleQuantityChange}
                  className="w-24 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <span className="ml-4 text-gray-600">
                  Minimum order: {card.minimumOrder} units
                </span>
              </div>
            </div>

            <div className="mb-6">
              <span className="text-gray-600">Total Price:</span>
              <span className="text-2xl font-bold ml-2">
                ${totalPrice.toFixed(2)}
              </span>
            </div>

            <button
              onClick={handleAddToCart}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
            >
              Add to Cart
            </button>

            {message && (
              <div className="mt-4 p-2 bg-green-100 text-green-700 rounded-md text-center">
                {message}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardDetails;
