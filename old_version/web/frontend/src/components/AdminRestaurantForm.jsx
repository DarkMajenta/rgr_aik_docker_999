import { useState, useEffect } from 'react';
import api from '../services/api';

function AdminRestaurantForm({ restaurantId, onSave }) {
  const [formData, setFormData] = useState({
    name: '', address: '', cuisine_type: '', dish_ids: []
  });
  const [dishes, setDishes] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    if (restaurantId) {
      api.get(`/restaurants/${restaurantId}`).then((response) => {
        setFormData({
          name: response.data.name,
          address: response.data.address,
          cuisine_type: response.data.cuisine_type,
          dish_ids: response.data.Dishes?.map(d => d.id) || [],
        });
      });
    }
    api.get('/dishes').then((response) => setDishes(response.data));
  }, [restaurantId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (restaurantId) {
        await api.put(`/restaurants/${restaurantId}`, formData);
      } else {
        await api.post('/restaurants', formData);
      }
      onSave();
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to save restaurant');
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleDishChange = (e) => {
    const dishId = parseInt(e.target.value);
    const updatedDishIds = e.target.checked
      ? [...formData.dish_ids, dishId]
      : formData.dish_ids.filter(id => id !== dishId);
    setFormData({ ...formData, dish_ids: updatedDishIds });
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 bg-white shadow-md rounded">
      <h2 className="text-2xl mb-4">{restaurantId ? 'Edit Restaurant' : 'Add Restaurant'}</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <div className="mb-4">
        <label className="block mb-1">Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block mb-1">Address</label>
        <input
          type="text"
          name="address"
          value={formData.address}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block mb-1">Cuisine Type</label>
        <input
          type="text"
          name="cuisine_type"
          value={formData.cuisine_type}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-1">Dishes</label>
        {dishes.map((dish) => (
          <div key={dish.id} className="flex items-center">
            <input
              type="checkbox"
              value={dish.id}
              checked={formData.dish_ids.includes(dish.id)}
              onChange={handleDishChange}
              className="mr-2"
            />
            <span>{dish.name}</span>
          </div>
        ))}
      </div>
      <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">Save</button>
    </form>
  );
}

export default AdminRestaurantForm;