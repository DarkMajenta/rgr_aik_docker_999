// Шаблоны страниц для клиентской и админской части
// Используем React + React Router + TailwindCSS

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React from 'react';

// Страницы
const Home = () => <div className="p-4">Главная страница</div>;
const Menu = () => <div className="p-4">Меню блюд</div>;
const DishDetails = () => <div className="p-4">Страница блюда</div>;
const Login = () => <div className="p-4">Форма входа</div>;
const Register = () => <div className="p-4">Регистрация</div>;
const Profile = () => <div className="p-4">Профиль пользователя</div>;
const Cart = () => <div className="p-4">Корзина</div>;
const Checkout = () => <div className="p-4">Оформление заказа</div>;
const Orders = () => <div className="p-4">История заказов</div>;
const OrderDetails = () => <div className="p-4">Детали заказа</div>;

// Админ
const AdminDashboard = () => <div className="p-4">Админ: дашборд</div>;
const AdminDishes = () => <div className="p-4">Админ: управление блюдами</div>;
const AdminNewDish = () => <div className="p-4">Админ: добавление блюда</div>;
const AdminOrders = () => <div className="p-4">Админ: заказы</div>;
const AdminUsers = () => <div className="p-4">Админ: пользователи</div>;
const AdminRestaurants = () => <div className="p-4">Админ: рестораны</div>;
const AdminProducts = () => <div className="p-4">Админ: продукты и ингредиенты</div>;

const About = () => <div className="p-4">О компании</div>;
const FAQ = () => <div className="p-4">FAQ</div>;
const Terms = () => <div className="p-4">Пользовательское соглашение</div>;
const Support = () => <div className="p-4">Поддержка</div>;

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/dish/:id" element={<DishDetails />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/orders/:id" element={<OrderDetails />} />

        {/* Admin */}
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/dishes" element={<AdminDishes />} />
        <Route path="/admin/dishes/new" element={<AdminNewDish />} />
        <Route path="/admin/orders" element={<AdminOrders />} />
        <Route path="/admin/users" element={<AdminUsers />} />
        <Route path="/admin/restaurants" element={<AdminRestaurants />} />
        <Route path="/admin/products" element={<AdminProducts />} />

        {/* Дополнительные */}
        <Route path="/about" element={<About />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/support" element={<Support />} />
      </Routes>
    </Router>
  );
}
