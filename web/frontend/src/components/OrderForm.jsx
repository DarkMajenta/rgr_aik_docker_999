import { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import api from '../services/api';

function OrderForm({ selectedDishes, clearSelectedDishes }) {
  const { user } = useContext(AuthContext);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedDishes.length) {
      setError('Please select at least one dish');
      return;
    }
    try {
      const items = selectedDishes.map(dish => ({
        dish_id: dish.id,
        quantity: 1, // Можно добавить выбор количества
      }));
      const total_price = selectedDishes.reduce((sum, dish) => sum + 10, 0); // Пример цены
      await api.post('/orders', { items, total_price });
      clearSelectedDishes();
      alert('Order created successfully!');
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to create order');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 bg-white shadow-md rounded">
      <h2 className="text-2xl mb-4">Create Order</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <div className="mb-4">
        <h3 className="font-semibold">Selected Dishes:</h3>
        {selectedDishes.length ? (
          <ul className="list-disc pl-5">
            {selectedDishes.map(dish => (
              <li key={dish.id}>{dish.name}</li>
            ))}
          </ul>
        ) : (
          <p>No dishes selected</p>
        )}
      </div>
      <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">Place Order</button>
    </form>
  );
}

export default OrderForm;