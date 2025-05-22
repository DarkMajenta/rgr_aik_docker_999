function OrderList({ orders }) {
  return (
    <div className="border rounded-lg p-4 bg-white shadow">
      <h2 className="text-xl font-bold">Order History</h2>
      {orders.length === 0 ? (
        <p>No orders yet</p>
      ) : (
        <ul>
          {orders.map(order => (
            <li key={order.id} className="py-2">
              <p>Order #{order.id} - ${order.total_price.toFixed(2)}</p>
              <p>Status: {order.status}</p>
              <p>Items: {order.items.map(item => `${item.dish_name} x${item.quantity}`).join(', ')}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default OrderList;