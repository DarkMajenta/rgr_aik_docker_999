import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useAuth } from './store/auth';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Menu from './pages/Menu';
import Orders from './pages/Orders';
import Admin from './pages/Admin';

function App() {
  const { user } = useAuth();

  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <div className="container mx-auto p-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/menu" element={<Menu />} />
            {user && user.role === 'client' && <Route path="/orders" element={<Orders />} />}
            {user && user.role === 'admin' && <Route path="/admin" element={<Admin />} />}
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;