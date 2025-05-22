import { Link } from 'react-router-dom';
import { useAuth } from '../store/auth';

function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-blue-600 p-4 text-white">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">Food Delivery</Link>
        <div className="space-x-4">
          <Link to="/menu">Menu</Link>
          {user ? (
            <>
              {user.role === 'client' && <Link to="/orders">Orders</Link>}
              {user.role === 'admin' && <Link to="/admin">Admin</Link>}
              <button onClick={logout} className="hover:underline">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;