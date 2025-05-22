import { useState, useEffect } from 'react';
import axios from 'axios';

function Admin() {
  const [dishes, setDishes] = useState([]);
  const [users, setUsers] = useState([]);
  const [newDish, setNewDish] = useState({
    name: '',
    portion_size: '',
    preparation_time: '',
    dish_type_id: '',
  });
  const [editDishId, setEditDishId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const [dishesResponse, usersResponse] = await Promise.all([
          axios.get('http://localhost:3000/menu', { headers: { Authorization: `Bearer ${token}` } }),
          axios.get('http://localhost:3000/admin/users', { headers: { Authorization: `Bearer ${token}` } }),
        ]);
        setDishes(dishesResponse.data);
        setUsers(usersResponse.data);
      } catch (err) {
        console.error('Error fetching data:', err);
      }
    };
    fetchData();
  }, []);

  const handleCreateOrUpdateDish = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      if (editDishId) {
        await axios.put(`http://localhost:3000/admin/dishes/${editDishId}`, newDish, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setEditDishId(null);
      } else {
        await axios.post('http://localhost:3000/admin/dishes', newDish, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }
      setNewDish({ name: '', portion_size: '', preparation_time: '', dish_type_id: '' });
      const response = await axios.get('http://localhost:3000/menu', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setDishes(response.data);
    } catch (err) {
      console.error('Error saving dish:', err);
    }
  };

  const handleEditDish = (dish) => {
    setEditDishId(dish.id);
    setNewDish({
      name: dish.name,
      portion_size: dish.portion_size,
      preparation_time: dish.preparation_time,
      dish_type_id: dish.dish_type_id,
    });
  };

  const handleDeleteDish = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:3000/admin/dishes/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setDishes(dishes.filter(dish => dish.id !== id));
    } catch (err) {
      console.error('Error deleting dish:', err);
    }
  };

  const handleUpdateRole = async (userId, role) => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(`http://localhost:3000/admin/users/${userId}/role`, { role }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const response = await axios.get('http://localhost:3000/admin/users', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(response.data);
    } catch (err) {
      console.error('Error updating role:', err);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Admin Dashboard</h2>
      <h3 className="text-xl font-semibold mb-2">Manage Dishes</h3>
      <form onSubmit={handleCreateOrUpdateDish} className="space-y-4 mb-4">
        <div>
          <label className="block">Name</label>
          <input
            type="text"
            value={newDish.name}
            onChange={(e) => setNewDish({ ...newDish, name: e.target.value })}
            className="w-full border rounded p-2"
            required
          />
        </div>
        <div>
          <label className="block">Portion Size</label>
          <input
            type="text"
            value={newDish.portion_size}
            onChange={(e) => setNewDish({ ...newDish, portion_size: e.target.value })}
            className="w-full border rounded p-2"
          />
        </div>
        <div>
          <label className="block">Preparation Time (min)</label>
          <input
            type="number"
            value={newDish.preparation_time}
            onChange={(e) => setNewDish({ ...newDish, preparation_time: e.target.value })}
            className="w-full border rounded p-2"
          />
        </div>
        <div>
          <label className="block">Dish Type ID</label>
          <input
            type="number"
            value={newDish.dish_type_id}
            onChange={(e) => setNewDish({ ...newDish, dish_type_id: e.target.value })}
            className="w-full border rounded p-2"
            required
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          {editDishId ? 'Update Dish' : 'Add Dish'}
        </button>
      </form>

      <h3 className="text-xl font-semibold mb-2">Dishes</h3>
      <ul className="mb-4">
        {dishes.map(dish => (
          <li key={dish.id} className="flex justify-between py-2">
            <span>{dish.name} (Type: {dish.dish_type_id})</span>
            <div>
              <button
                onClick={() => handleEditDish(dish)}
                className="text-blue-500 hover:underline mr-2"
              >
                Edit
              </button>
              <button
                onClick={() => handleDeleteDish(dish.id)}
                className="text-red-500 hover:underline"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>

      <h3 className="text-xl font-semibold mb-2">Manage Users</h3>
      <ul>
        {users.map(user => (
          <li key={user.id} className="flex justify-between py-2">
            <span>{user.email} ({user.role})</span>
            <select
              value={user.role}
              onChange={(e) => handleUpdateRole(user.id, e.target.value)}
              className="border rounded p-1"
            >
              <option value="guest">Guest</option>
              <option value="client">Client</option>
              <option value="admin">Admin</option>
            </select>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Admin;