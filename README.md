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

Node.js (Express)
Sequelize (ORM)

Database

PostgreSQL (primary)
Redis (caching)

Infrastructure

Docker + Docker Compose
Nginx (reverse proxy)

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
│   │   ├── ssl/
│   │   │   ├── cert.pem
│   │   │   └── key.pem

🚀 Getting Started
Prerequisites

Docker and Docker Compose installed on your system.
Git for cloning the repository.
(Optional) Node.js for local development without Docker.

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
Build the backend (Node.js/Express on port 3000).
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
/auth/register
Register a new user
No


POST
/auth/login
Login and obtain JWT
No


GET
/restaurants
Get all restaurants
No


POST
/restaurants
Create a new restaurant
Admin


PUT
/restaurants/:id
Update a restaurant
Admin


DELETE
/restaurants/:id
Delete a restaurant
Admin


GET
/dishes
Get all dishes
No


POST
/dishes
Create a new dish
Admin


PUT
/dishes/:id
Update a dish
Admin


DELETE
/dishes/:id
Delete a dish
Admin


POST
/orders
Create a new order
User


GET
/orders/details
Get user's order details
User


GET
/admin/users
Get all users
Admin


DELETE
/admin/users/:id
Delete a user
Admin


GET
/admin/orders
Get all orders
Admin


PUT
/admin/orders/:id/status
Update order status
Admin


For detailed API documentation, see API_DOCS.md (create this file if needed).
🧪 Testing
Testing is not yet implemented. To add tests:

Frontend: Use Jest and React Testing Library.cd web/frontend && npm test


Backend: Use Mocha or Jest.cd web/backend && npm test



🤝 Contributing

Fork the project.
Create your feature branch (git checkout -b feature/AmazingFeature).
Commit your changes (git commit -m 'Add some AmazingFeature').
Push to the branch (git push origin feature/AmazingFeature).
Open a Pull Request.

📄 License
This project is licensed under the GNU General Public License v3.0 - see the LICENSE file for details.
Key GPL-3.0 requirements:

You may copy, distribute, and modify the software.
You must make source code available when distributing the software.
Modifications must be released under the same license.
Changes must be documented.

📧 Contact
Project Maintainer - [Drk Mjnt] - tg: @x0y1z2a3b4c5d6e7f8g9h0i1j2k9gsp0
Project Link: https://github.com/DarkMajenta/rgr_aik_docker_999
