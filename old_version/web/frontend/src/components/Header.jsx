import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

function Header() {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between">
        <Link to="/" className="text-white text-lg font-bold">Restaurant Delivery</Link>
        <div>
          <Link to="/restaurants" className="text-white mr-4">Restaurants</Link>
          <Link to="/dishes" className="text-white mr-4">Menu</Link>
          {user ? (
            <>
              {user.role === 'client' && <Link to="/orders" className="text-white mr-4">Orders</Link>}
              {user.role === 'admin' && <Link to="/admin" className="text-white mr-4">Admin</Link>}
              <button onClick={logout} className="text-white">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-white mr-4">Login</Link>
              <Link to="/register" className="text-white">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Header;