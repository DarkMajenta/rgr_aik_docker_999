import { Routes, Route } from 'react-router-dom';
import AdminDashboard from '../components/AdminDashboard';
import AdminRestaurantForm from '../components/AdminRestaurantForm';
import AdminDishForm from '../components/AdminDishForm';
import AdminOrderList from '../components/AdminOrderList';
import AdminUserList from '../components/AdminUserList';
import RestaurantList from '../components/RestaurantList';
import DishList from '../components/DishList';

function AdminPanel() {
  return (
    <Routes>
      <Route path="/" element={<AdminDashboard />} />
      <Route path="/restaurants" element={<RestaurantList />} />
      <Route path="/restaurants/add" element={<AdminRestaurantForm onSave={() => window.location.reload()} />} />
      <Route path="/restaurants/edit/:id" element={<AdminRestaurantForm onSave={() => window.location.reload()} />} />
      <Route path="/dishes" element={<DishList onSelectDish={() => {}} />} />
      <Route path="/dishes/add" element={<AdminDishForm onSave={() => window.location.reload()} />} />
      <Route path="/dishes/edit/:id" element={<AdminDishForm onSave={() => window.location.reload()} />} />
      <Route path="/orders" element={<AdminOrderList />} />
      <Route path="/users" element={<AdminUserList />} />
    </Routes>
  );
}

export default AdminPanel;