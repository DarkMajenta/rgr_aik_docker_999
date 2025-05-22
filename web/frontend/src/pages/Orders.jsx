import { useState, useEffect } from 'react';
import axios from 'axios';
import OrderList from '../components/OrderList';

function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:3000/orders', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setOrders(response.data);
      } catch (err) {
        console.error('Error fetching orders:', err);
      }
    };
    fetchOrders();
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Your Orders</h2>
      <OrderList orders={orders} />
    </div>
  );
}

export default Orders;