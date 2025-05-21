const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env.DB_URL || 'postgres://admin:password@db:5432/app', {
  dialect: 'postgres',
  logging: false,
});

module.exports = sequelize;