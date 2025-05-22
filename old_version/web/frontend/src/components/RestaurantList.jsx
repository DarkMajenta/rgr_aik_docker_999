import { useState, useEffect } from 'react';
import api from '../services/api';

function RestaurantList() {
  const [restaurants, setRestaurants] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const response = await api.get('/restaurants');
        setRestaurants(response.data);
      } catch (err) {
        setError('Failed to fetch restaurants');
      }
    };
    fetchRestaurants();
  }, []);

  return (
    <div>
      <h2 className="text-2xl mb-4">Restaurants</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {restaurants.map((restaurant) => (
          <div key={restaurant.id} className="p-4 bg-white shadow-md rounded">
            <h3 className="text-xl font-bold">{restaurant.name}</h3>
            <p>{restaurant.address}</p>
            <p>Cuisine: {restaurant.cuisine_type}</p>
            {restaurant.Dishes?.length > 0 && (
              <div>
                <h4 className="font-semibold mt-2">Dishes:</h4>
                <ul className="list-disc pl-5">
                  {restaurant.Dishes.map((dish) => (
                    <li key={dish.id}>{dish.name}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default RestaurantList;