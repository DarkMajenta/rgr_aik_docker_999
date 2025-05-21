```markdown
# 🍽️ Restaurant Delivery Web Application

[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)

A full-stack web application for online food ordering and delivery management. Built with modern technologies to provide a seamless experience for customers, restaurant staff, and administrators.

## 🌟 Features

### 👨‍🍳 User Roles
- **Guest**: Browse menu, register, login
- **Customer**: Order food, payment, order history
- **Admin**: Full CRUD for dishes, user management, analytics

### 🚀 Core Functionality
- User authentication (JWT + OAuth 2.0)
- Menu browsing with filters
- Shopping cart management
- Order placement with delivery tracking
- Payment integration (Stripe/PayPal)
- Admin dashboard with analytics

## 🛠️ Tech Stack

### Frontend
- React.js + TypeScript
- TailwindCSS
- React Router
- Axios
- Redux (state management)

### Backend
- Node.js (Express/NestJS)
- Python (Django/FastAPI) - *alternative option*

### Database
- PostgreSQL (primary)
- Redis (caching/sessions)

### Infrastructure
- Docker + Docker Compose
- Nginx (reverse proxy)
- CI/CD with GitHub Actions

## 📂 Project Structure

```
restaurant-delivery/
├── frontend/          # React application
├── backend/           # Node.js/Python API
├── docker/            # Docker configurations
├── nginx/             # Nginx configurations
├── .github/workflows  # CI/CD pipelines
└── README.md          # Project documentation
```

## 🚀 Getting Started

### Prerequisites
- Docker
- Docker Compose
- Node.js (for local development)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/your-username/restaurant-delivery.git
cd restaurant-delivery
```

2. Set up environment variables:
```bash
cp .env.example .env
```

3. Build and run with Docker:
```bash
docker-compose up --build
```

The application will be available at:
- Frontend: `http://localhost`
- Backend API: `http://localhost:3000/api`
- Adminer (DB management): `http://localhost:8080`

## 🌐 API Documentation

The backend API follows RESTful principles with JWT authentication. Key endpoints include:

| Method | Endpoint               | Description                |
|--------|------------------------|----------------------------|
| POST   | /auth/register         | User registration          |
| POST   | /auth/login            | User login                 |
| GET    | /menu                  | Get all menu items         |
| POST   | /orders                | Create new order           |
| GET    | /orders/{id}           | Get order details          |

For full API documentation, see [API_DOCS.md](docs/API_DOCS.md).

## 🧪 Testing

Run tests with:
```bash
# Frontend tests
cd frontend && npm test

# Backend tests
cd backend && npm test
```

## 🤝 Contributing

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the **GNU General Public License v3.0** - see the [LICENSE](LICENSE) file for details.

Key GPL-3.0 requirements:
- You may copy, distribute and modify the software
- You must make source code available when distributing the software
- Modifications must be released under the same license
- Changes must be documented

## 📧 Contact

Project Maintainer - [Your Name] - your.email@example.com

Project Link: [https://github.com/your-username/restaurant-delivery](https://github.com/your-username/restaurant-delivery)
```

Key changes made:
1. Added GPL-3.0 license badge at the top
2. Updated the License section with specific GPL-3.0 requirements
3. Kept the reference to the LICENSE file
4. Maintained all other sections with their original content

The README now clearly indicates the GPL-3.0 license while maintaining all other important project information.