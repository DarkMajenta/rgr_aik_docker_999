# 🍽️ Restaurant Delivery Web Application

[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)

A full-stack web application for online food ordering and delivery management, providing a seamless experience for customers and administrators.

## 🌟 Features

### 👨‍🍳 User Roles
- **Guest**: Browse restaurants and dishes, register, login.
- **Customer**: Order food, view order history.
- **Admin**: Full CRUD for restaurants and dishes, user management, order status updates.

### 🚀 Core Functionality
- User authentication with JWT.
- Browse restaurants and dishes.
- Order placement and tracking.
- Admin dashboard for managing restaurants, dishes, orders, and users.
- Caching with Redis for improved performance.

## 🛠️ Tech Stack

### Frontend
- React.js
- Tailwind CSS (via CDN)
- React Router
- Axios

### Backend
- Node.js (Express)
- Sequelize (ORM)

### Database
- PostgreSQL (primary)
- Redis (caching)

### Infrastructure
- Docker + Docker Compose
- Nginx (reverse proxy)

## 📂 Project Structure

```
restaurant-delivery/
├── docker-compose.yml
├── web/
│   ├── frontend/
│   │   ├── public/
│   │   │   ├── index.html
│   │   │   └── favicon.ico
│   │   ├── src/
│   │   │   ├── components/
│   │   │   │   ├── Header.jsx
│   │   │   │   ├── Footer.jsx
│   │   │   │   ├── LoginForm.jsx
│   │   │   │   ├── RegisterForm.jsx
│   │   │   │   ├── RestaurantList.jsx
│   │   │   │   ├── DishList.jsx
│   │   │   │   ├── OrderForm.jsx
│   │   │   │   ├── OrderList.jsx
│   │   │   │   ├── AdminDashboard.jsx
│   │   │   │   ├── AdminRestaurantForm.jsx
│   │   │   │   ├── AdminDishForm.jsx
│   │   │   │   ├── AdminOrderList.jsx
│   │   │   │   └── AdminUserList.jsx
│   │   │   ├── pages/
│   │   │   │   ├── Home.jsx
│   │   │   │   ├── Login.jsx
│   │   │   │   ├── Register.jsx
│   │   │   │   ├── Restaurants.jsx
│   │   │   │   ├── Dishes.jsx
│   │   │   │   ├── Orders.jsx
│   │   │   │   └── AdminPanel.jsx
│   │   │   ├── context/
│   │   │   │   └── AuthContext.jsx
│   │   │   ├── services/
│   │   │   │   └── api.js
│   │   │   ├── App.jsx
│   │   │   ├── index.js
│   │   │   └── styles.css
│   │   ├── package.json
│   │   ├── Dockerfile
│   │   └── .env
│   ├── backend/
│   │   ├── src/
│   │   │   ├── config/
│   │   │   │   └── database.js
│   │   │   ├── models/
│   │   │   │   ├── user.js
│   │   │   │   ├── client.js
│   │   │   │   ├── order.js
│   │   │   │   ├── orderItem.js
│   │   │   │   ├── dish.js
│   │   │   │   ├── restaurant.js
│   │   │   │   ├── dishType.js
│   │   │   │   ├── restaurantDish.js
│   │   │   │   └── index.js
│   │   │   ├── routes/
│   │   │   │   ├── auth.js
│   │   │   │   ├── orders.js
│   │   │   │   ├── dishes.js
│   │   │   │   ├── restaurants.js
│   │   │   │   └── admin.js
│   │   │   ├── middleware/
│   │   │   │   └── auth.js
│   │   │   ├── services/
│   │   │   │   └── redis.js
│   │   │   └── app.js
│   │   ├── package.json
│   │   ├── Dockerfile
│   │   └── .env
│   ├── db/
│   │   ├── init/
│   │   │   └── init.sql
│   ├── nginx/
│   │   ├── nginx.conf
│   │   └── ssl/
│   │       ├── cert.pem
│   │       └── key.pem
```

## 🚀 Getting Started

### Prerequisites
- **Docker** and **Docker Compose** installed on your system.
- **Git** for cloning the repository.
- (Optional) Node.js for local development without Docker.

### Installation and Deployment

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/DarkMajenta/rgr_aik_docker_999.git
   cd rgr_aik_docker_999
   ```

2. **Set Up Environment Variables**:
   - Copy the example environment files for frontend and backend:
     ```bash
     cp web/frontend/.env.example web/frontend/.env
     cp web/backend/.env.example web/backend/.env
     ```
   - Edit `web/frontend/.env` to set the API URL (default: `VITE_API_URL=http://localhost:3000/api`).
   - Edit `web/backend/.env` to set:
     - `DB_URL=postgres://admin:password@db:5432/app`
     - `REDIS_URL=redis://redis:6379`
     - `JWT_SECRET=your_jwt_secret_key` (replace with a secure key).

3. **Prepare SSL Certificates for Nginx** (optional, for HTTPS):
   - Generate self-signed certificates for development:
     ```bash
     mkdir -p web/nginx/ssl
     openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout web/nginx/ssl/key.pem -out web/nginx/ssl/cert.pem -subj "/C=US/ST=State/L=City/O=Organization/OU=Unit/CN=localhost"
     ```
   - For production, use valid certificates from a trusted CA.

4. **Build and Run with Docker Compose**:
   - Ensure `docker-compose.yml` is in the root directory.
   - Run the following command to build and start all services:
     ```bash
     docker-compose up --build
     ```
   - This will:
     - Build the frontend (React app on port 80).
     - Build the backend (Node.js/Express on port 3000).
     - Start PostgreSQL (with `init.sql` for schema initialization).
     - Start Redis (for caching).
     - Start Nginx (reverse proxy on port 443 for HTTPS).

5. **Access the Application**:
   - **Frontend**: `http://localhost` (or `https://localhost` if Nginx configured for HTTPS).
   - **Backend API**: `http://localhost:3000/api` (proxied through Nginx).
   - **Database**: Managed internally by Docker; use a tool like Adminer or pgAdmin to connect to `postgres://admin:password@localhost:5432/app` if needed.

6. **Stopping the Application**:
   - Press `Ctrl+C` to stop the containers.
   - Remove containers and networks:
     ```bash
     docker-compose down
     ```
   - To preserve database data, the `db_data` volume persists unless explicitly removed:
     ```bash
     docker volume rm restaurant-delivery_db_data
     ```

### Troubleshooting
- **Port Conflicts**: Ensure ports 80, 443, and 3000 are free.
- **Database Initialization**: Verify that `web/db/init/init.sql` contains the correct SQL schema.
- **Nginx Errors**: Check `docker-compose logs nginx` for SSL or proxy issues.
- **Environment Variables**: Ensure `.env` files are correctly configured.

## 🌐 API Documentation

The backend API follows RESTful principles with JWT authentication. Key endpoints include:

| Method | Endpoint                     | Description                          | Auth Required |
|--------|------------------------------|--------------------------------------|---------------|
| POST   | /auth/register               | Register a new user                  | No            |
| POST   | /auth/login                  | Login and obtain JWT                 | No            |
| GET    | /restaurants                 | Get all restaurants                  | No            |
| POST