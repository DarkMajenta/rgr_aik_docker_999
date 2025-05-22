import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Restaurants from './pages/Restaurants';
import Dishes from './pages/Dishes';
import Orders from './pages/Orders';
import AdminPanel from './pages/AdminPanel';
import { AuthContext } from './context/AuthContext';
import { useContext } from 'react';

function App() {
  const { user } = useContext(AuthContext);

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/restaurants" element={<Restaurants />} />
        <Route path="/dishes" element={<Dishes />} />
        {user && user.role === 'client' && <Route path="/orders" element={<Orders />} />}
        {user && user.role === 'admin' && <Route path="/admin" element={<AdminPanel />} />}
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;