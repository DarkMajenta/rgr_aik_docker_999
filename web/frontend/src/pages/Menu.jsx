import { useState, useEffect } from 'react';
import axios from 'axios';
import DishCard from '../components/DishCard';
import Cart from '../components/Cart';

function Menu() {
  const [dishes, setDishes] = useState([]);
  const [cart, setCart] = useState([]);
  const [dishTypeId, setDishTypeId] = useState('');

  useEffect(() => {
    const fetchDishes = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/menu${dishTypeId ? `?dish_type_id=${dishTypeId}` : ''}`);
        setDishes(response.data);
      } catch (err) {
        console.error('Error fetching dishes:', err);
      }
    };
    fetchDishes();
  }, [dishTypeId]);

  const addToCart = (dish) => {
    const existing = cart.find(item => item.id === dish.id);
    if (existing) {
      setCart(cart.map(item =>
        item.id === dish.id ? { ...item, quantity: item.quantity + 1 } : item
      ));
    } else {
      setCart([...cart, { ...dish, quantity: 1 }]);
    }
  };

  const removeFromCart = (dishId) => {
    setCart(cart.filter(item => item.id !== dishId));
  };

  const createOrder = async (cart, totalPrice) => {
    try {
      const token = localStorage.getItem('token');
      await axios.post(
        'http://localhost:3000/orders',
        {
          client_id: 1, // Replace with actual client_id from user
          items: cart.map(item => ({ dish_id: item.id, quantity: item.quantity, dish_name: item.name })),
          total_price: totalPrice,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setCart([]);
      alert('Order placed successfully!');
    } catch (err) {
      alert('Failed to place order');
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Menu</h2>
      <div className="mb-4">
        <label className="block">Filter by Category</label>
        <input
          type="number"
          value={dishTypeId}
          onChange={(e) => setDishTypeId(e.target.value)}
          placeholder="Enter dish type ID"
          className="border rounded p-2"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {dishes.map(dish => (
          <DishCard key={dish.id} dish={dish} addToCart={addToCart} />
        ))}
      </div>
      <Cart cart={cart} removeFromCart={removeFromCart} createOrder={createOrder} />
    </div>
  );
}

export default Menu;