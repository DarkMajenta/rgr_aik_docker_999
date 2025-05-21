🍽️ Restaurant Delivery Web Application

A full-stack web application for online food ordering and delivery management, providing a seamless experience for customers and administrators.
🌟 Features
👨‍🍳 User Roles

Guest: Browse restaurants and dishes, register, login.
Customer: Order food, view order history.
Admin: Full CRUD for restaurants and dishes, user management, order status updates.

🚀 Core Functionality

User authentication with JWT.
Browse restaurants and dishes.
Order placement and tracking.
Admin dashboard for managing restaurants, dishes, orders, and users.
Caching with Redis for improved performance.

🛠️ Tech Stack
Frontend

React.js
Tailwind CSS (via CDN)
React Router
Axios

Backend

Python (FastAPI)
SQLAlchemy (ORM)
Pydantic (data validation)

Database

PostgreSQL (primary)
Redis (caching)

Infrastructure

Docker + Docker Compose
Nginx (reverse proxy)

```
📂 Project Structure
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
│   │   │   │   └── database.py
│   │   │   ├── models/
│   │   │   │   ├── __init__.py
│   │   │   │   ├── user.py
│   │   │   │   ├── client.py
│   │   │   │   ├── order.py
│   │   │   │   ├── order_item.py
│   │   │   │   ├── dish.py
│   │   │   │   ├── restaurant.py
│   │   │   │   ├── dish_type.py
│   │   │   │   ├── restaurant_dish.py
│   │   │   │   └── product.py
│   │   │   ├── routes/
│   │   │   │   ├── __init__.py
│   │   │   │   ├── auth.py
│   │   │   │   ├── orders.py
│   │   │   │   ├── dishes.py
│   │   │   │   ├── restaurants.py
│   │   │   │   └── admin.py
│   │   │   ├── middleware/
│   │   │   │   └── auth.py
│   │   │   ├── services/
│   │   │   │   └── redis.py
│   │   │   ├── schemas/
│   │   │   │   ├── __init__.py
│   │   │   │   ├── user.py
│   │   │   │   ├── client.py
│   │   │   │   ├── order.py
│   │   │   │   ├── dish.py
│   │   │   │   └── product.py
│   │   │   └── main.py
│   │   ├── requirements.txt
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
├── README.md
```

🚀 Getting Started
Prerequisites

Docker and Docker Compose installed on your system.
Git for cloning the repository.
(Optional) Node.js and Python 3.11 for local development without Docker.

Installation and Deployment

Clone the Repository:
git clone https://github.com/DarkMajenta/rgr_aik_docker_999.git
cd rgr_aik_docker_999


Set Up Environment Variables:

Copy the example environment files for frontend and backend:cp web/frontend/.env.example web/frontend/.env
cp web/backend/.env.example web/backend/.env


Edit web/frontend/.env to set the API URL (default: VITE_API_URL=http://localhost:3000/api).
Edit web/backend/.env to set:
DB_URL=postgres://admin:password@db:5432/app
REDIS_URL=redis://redis:6379
JWT_SECRET=your_jwt_secret_key (replace with a secure key).




Prepare SSL Certificates for Nginx (optional, for HTTPS):

Generate self-signed certificates for development:mkdir -p web/nginx/ssl
openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout web/nginx/ssl/key.pem -out web/nginx/ssl/cert.pem -subj "/C=US/ST=State/L=City/O=Organization/OU=Unit/CN=localhost"


For production, use valid certificates from a trusted CA.


Build and Run with Docker Compose:

Ensure docker-compose.yml is in the root directory.
Run the following command to build and start all services:docker-compose up --build


This will:
Build the frontend (React app on port 80).
Build the backend (FastAPI on port 3000).
Start PostgreSQL (with init.sql for schema initialization).
Start Redis (for caching).
Start Nginx (reverse proxy on port 443 for HTTPS).




Access the Application:

Frontend: http://localhost (or https://localhost if Nginx configured for HTTPS).
Backend API: http://localhost:3000/api (proxied through Nginx).
Database: Managed internally by Docker; use a tool like Adminer or pgAdmin to connect to postgres://admin:password@localhost:5432/app if needed.


Stopping the Application:

Press Ctrl+C to stop the containers.
Remove containers and networks:docker-compose down


To preserve database data, the db_data volume persists unless explicitly removed:docker volume rm restaurant-delivery_db_data





Troubleshooting

Port Conflicts: Ensure ports 80, 443, and 3000 are free.
Database Initialization: Verify that web/db/init/init.sql contains the correct SQL schema.
Nginx Errors: Check docker-compose logs nginx for SSL or proxy issues.
Environment Variables: Ensure .env files are correctly configured.

🌐 API Documentation
The backend API follows RESTful principles with JWT authentication. Key endpoints include:



Method
Endpoint
Description
Auth Required



POST
/api/auth/register
Register a new user
No


POST
/api/auth/login
Login and obtain JWT
No


GET
/api/restaurants
Get all restaurants
No


POST
/api/restaurants
Create a restaurant (admin only)
Yes


GET
/api/dishes
Get all dishes
No


POST
/api/dishes
Create a dish (admin only)
Yes


POST
/api/orders
Create an order
Yes (client)


GET
/api/orders/{id}
Get order details
Yes


GET
/api/admin/users
Get all users (admin only)
Yes


GET
/api/admin/orders
Get all orders (admin only)
Yes


