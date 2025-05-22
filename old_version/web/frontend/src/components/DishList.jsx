import { useState, useEffect } from 'react';
import api from '../services/api';

function DishList({ onSelectDish }) {
  const [dishes, setDishes] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchDishes = async () => {
      try {
        const response = await api.get('/dishes');
        setDishes(response.data);
      } catch (err) {
        setError('Failed to fetch dishes');
      }
    };
    fetchDishes();
  }, []);

  return (
    <div>
      <h2 className="text-2xl mb-4">Dishes</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {dishes.map((dish) => (
          <div key={dish.id} className="p-4 bg-white shadow-md rounded">
            <h3 className="text-xl font-bold">{dish.name}</h3>
            <p>Portion: {dish.portion_size}</p>
            <p>Prep Time: {dish.preparation_time} min</p>
            <button
              onClick={() => onSelectDish(dish)}
              className="mt-2 bg-blue-500 text-white p-2 rounded"
            >
              Add to Order
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DishList;