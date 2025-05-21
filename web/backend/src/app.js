const express = require('express');
const { Sequelize } = require('sequelize');
const redis = require('redis');
const authRoutes = require('./routes/auth');
const orderRoutes = require('./routes/orders');
const dishRoutes = require('./routes/dishes');
require('dotenv').config();

const app = express();
app.use(express.json());

// Подключение к PostgreSQL
const sequelize = new Sequelize(process.env.DB_URL, {
  dialect: 'postgres',
});

// Подключение к Redis
const redisClient = redis.createClient({
  url: process.env.REDIS_URL,
});
redisClient.connect().catch(console.error);

// Роуты
app.use('/api/auth', authRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/dishes', dishRoutes);

// Запуск сервера
const PORT = process.env.PORT || 3000;
app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);
  try {
    await sequelize.authenticate();
    console.log('Database connected');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
});