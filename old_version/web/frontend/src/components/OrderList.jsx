import { useState, useEffect } from 'react';
import api from '../services/api';

function OrderList() {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await api.get('/orders/details');
        setOrders(response.data);
      } catch (err) {
        setError('Failed to fetch orders');
      }
    };
    fetchOrders();
  }, []);

  return (
    <div>
      <h2 className="text-2xl mb-4">Your Orders</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <div className="space-y-4">
        {orders.map((order) => (
          <div key={order.order_id} className="p-4 bg-white shadow-md rounded">
            <h3 className="text-xl font-bold">Order #{order.order_id}</h3>
            <p>Status: {order.status}</p>
            <p>Total: ${order.total_price}</p>
            <p>Date: {new Date(order.created_at).toLocaleString()}</p>
            <h4 className="font-semibold mt-2">Items:</h4>
            <ul className="list-disc pl-5">
              {order.items.map((item) => (
                <li key={item.dish_id}>{item.dish_name} (x{item.quantity})</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

export default OrderList;