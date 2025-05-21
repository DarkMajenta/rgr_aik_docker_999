import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

function Header() {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">Order App</Link>
        <div>
          {user ? (
            <>
              <Link to="/restaurants" className="mr-4">Restaurants</Link>
              <Link to="/dishes" className="mr-4">Dishes</Link>
              <Link to="/orders" className="mr-4">Orders</Link>
              {user.role === 'admin' && <Link to="/admin" className="mr-4">Admin Panel</Link>}
              <button onClick={logout} className="bg-red-500 px-4 py-2 rounded">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="mr-4">Login</Link>
              <Link to="/register">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Header;