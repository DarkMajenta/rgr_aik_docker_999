import { Link } from 'react-router-dom';

function AdminDashboard() {
  return (
    <div>
      <h2 className="text-2xl mb-4">Admin Panel</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Link to="/admin/restaurants" className="p-4 bg-blue-500 text-white rounded text-center">
          Manage Restaurants
        </Link>
        <Link to="/admin/dishes" className="p-4 bg-blue-500 text-white rounded text-center">
          Manage Dishes
        </Link>
        <Link to="/admin/orders" className="p-4 bg-blue-500 text-white rounded text-center">
          Manage Orders
        </Link>
        <Link to="/admin/users" className="p-4 bg-blue-500 text-white rounded text-center">
          Manage Users
        </Link>
      </div>
    </div>
  );
}

export default AdminDashboard;