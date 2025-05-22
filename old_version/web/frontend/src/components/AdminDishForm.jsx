import { useState, useEffect } from 'react';
import api from '../services/api';

function AdminDishForm({ dishId, onSave }) {
  const [formData, setFormData] = useState({
    name: '', image: '', portion_size: '', technology: '', preparation_time: '', dish_type_id: '', restaurant_ids: []
  });
  const [restaurants, setRestaurants] = useState([]);
  const [dishTypes, setDishTypes] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    if (dishId) {
      api.get(`/dishes/${dishId}`).then((response) => {
        setFormData({
          name: response.data.name,
          image: response.data.image || '',
          portion_size: response.data.portion_size || '',
          technology: response.data.technology || '',
          preparation_time: response.data.preparation_time || '',
          dish_type_id: response.data.dish_type_id || '',
          restaurant_ids: response.data.Restaurants?.map(r => r.id) || [],
        });
      });
    }
    api.get('/restaurants').then((response) => setRestaurants(response.data));
    api.get('/dish-types').then((response) => setDishTypes(response.data));
  }, [dishId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (dishId) {
        await api.put(`/dishes/${dishId}`, formData);
      } else {
        await api.post('/dishes', formData);
      }
      onSave();
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to save dish');
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRestaurantChange = (e) => {
    const restaurantId = parseInt(e.target.value);
    const updatedRestaurantIds = e.target.checked
      ? [...formData.restaurant_ids, restaurantId]
      : formData.restaurant_ids.filter(id => id !== restaurantId);
    setFormData({ ...formData, restaurant_ids: updatedRestaurantIds });
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 bg-white shadow-md rounded">
      <h2 className="text-2xl mb-4">{dishId ? 'Edit Dish' : 'Add Dish'}</h2>
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
        <label className="block mb-1">Image URL</label>
        <input
          type="text"
          name="image"
          value={formData.image}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-1">Portion Size</label>
        <input
          type="text"
          name="portion_size"
          value={formData.portion_size}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-1">Technology</label>
        <input
          type="text"
          name="technology"
          value={formData.technology}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-1">Preparation Time (min)</label>
        <input
          type="number"
          name="preparation_time"
          value={formData.preparation_time}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-1">Dish Type</label>
        <select
          name="dish_type_id"
          value={formData.dish_type_id}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        >
          <option value="">Select Dish Type</option>
          {dishTypes.map((type) => (
            <option key={type.id} value={type.id}>{type.name}</option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <label className="block mb-1">Restaurants</label>
        {restaurants.map((restaurant) => (
          <div key={restaurant.id} className="flex items-center">
            <input
              type="checkbox"
              value={restaurant.id}
              checked={formData.restaurant_ids.includes(restaurant.id)}
              onChange={handleRestaurantChange}
              className="mr-2"
            />
            <span>{restaurant.name}</span>
          </div>
        ))}
      </div>
      <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">Save</button>
    </form>
  );
}

export default AdminDishForm;