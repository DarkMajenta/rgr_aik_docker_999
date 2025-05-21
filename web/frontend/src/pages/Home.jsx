import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';

function Home() {
  const { user } = useContext(AuthContext);

  return (
    <div className="text-center">
      <h1 className="text-3xl mb-4">Welcome to Order App</h1>
      <p className="mb-4">Discover delicious dishes and place your orders easily!</p>
      {user ? (
        <div>
          <p>Hello, {user.first_name}!</p>
          <Link to="/restaurants" className="bg-blue-500 text-white p-2 rounded">Browse Restaurants</Link>
        </div>
      ) : (
        <div>
          <Link to="/login" className="mr-4 bg-blue-500 text-white p-2 rounded">Login</Link>
          <Link to="/register" className="bg-green-500 text-white p-2 rounded">Register</Link>
        </div>
      )}
    </div>
  );
}

export default Home;