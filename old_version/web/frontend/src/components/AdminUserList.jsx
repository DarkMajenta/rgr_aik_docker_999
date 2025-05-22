import { useState, useEffect } from 'react';
import api from '../services/api';

function AdminUserList() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await api.get('/admin/users');
        setUsers(response.data);
      } catch (err) {
        setError('Failed to fetch users');
      }
    };
    fetchUsers();
  }, []);

  const handleDelete = async (userId) => {
    try {
      await api.delete(`/admin/users/${userId}`);
      setUsers(users.filter(user => user.id !== userId));
    } catch (err) {
      setError('Failed to delete user');
    }
  };

  return (
    <div>
      <h2 className="text-2xl mb-4">Manage Users</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <div className="space-y-4">
        {users.map((user) => (
          <div key={user.id} className="p-4 bg-white shadow-md rounded flex justify-between items-center">
            <div>
              <p>Email: {user.email}</p>
              <p>Role: {user.role}</p>
              {user.Client && (
                <>
                  <p>Name: {user.Client.first_name} {user.Client.last_name}</p>
                  <p>Phone: {user.Client.phone}</p>
                  <p>Address: {user.Client.address}</p>
                </>
              )}
            </div>
            <button
              onClick={() => handleDelete(user.id)}
              className="bg-red-500 text-white p-2 rounded"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminUserList;