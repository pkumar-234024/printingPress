import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { addCard } from "../../redux/slices/cardsSlice";

const CardForm = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isEditing = Boolean(id);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    minimumOrder: 1,
    image: null,
  });

  const [preview, setPreview] = useState("");
  const [imgFile, setImgFile] = useState(null);
  // If editing, fetch the card data (simplified version)
  useEffect(() => {
    if (isEditing) {
      // In a real app, you'd fetch the specific card from API
      const cards = JSON.parse(localStorage.getItem("cards") || "[]");
      const card = cards.find((card) => card.id === id);

      if (card) {
        setFormData({
          title: card.title,
          description: card.description,
          price: card.price,
          minimumOrder: card.minimumOrder,
        });

        setPreview(card.imagePath);
      }
    }
  }, [id, isEditing]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]:
        name === "price" || name === "minimumOrder" ? Number(value) : value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    debugger;
    if (file) {
      setFormData({
        ...formData,
        image: file,
      });
      setImgFile(file);

      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // In a real app, you'd handle the file upload to the server here
    // For simplicity, we're just storing the image data in localStorage

    const newCard = {
      id: isEditing ? id : Date.now().toString(),
      title: formData.title,
      description: formData.description,
      price: formData.price,
      minimumOrder: formData.minimumOrder,
      imagePath: imgFile, // In a real app, this would be the path to the uploaded file
      createdAt: new Date().toISOString(),
    };

    dispatch(addCard(newCard));
    navigate("/admin/cards");
  };

  return (
    <div className="card-form bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-6">
        {isEditing ? "Edit Card" : "Add New Card"}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Card Title
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows="4"
            required
          ></textarea>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Price (per unit)
            </label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              min="0"
              step="0.01"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Minimum Order
            </label>
            <input
              type="number"
              name="minimumOrder"
              value={formData.minimumOrder}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              min="1"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Card Image
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full py-2"
            required={!isEditing}
          />

          {preview && (
            <div className="mt-2">
              <p className="text-sm text-gray-500 mb-1">Preview:</p>
              <img
                src={preview}
                alt="Preview"
                className="w-32 h-32 object-cover border border-gray-300 rounded-md"
              />
            </div>
          )}
        </div>

        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => navigate("/admin/cards")}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            {isEditing ? "Update Card" : "Add Card"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CardForm;
