const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const User = require('./user')(sequelize, DataTypes);
const Client = require('./client')(sequelize, DataTypes);
const Order = require('./order')(sequelize, DataTypes);
const OrderItem = require('./orderItem')(sequelize, DataTypes);
const Dish = require('./dish')(sequelize, DataTypes);
const Restaurant = require('./restaurant')(sequelize, DataTypes);
const DishType = require('./dishType')(sequelize, DataTypes);
const RestaurantDish = require('./restaurantDish')(sequelize, DataTypes);

// Определение связей
User.hasOne(Client, { foreignKey: 'user_id' });
Client.belongsTo(User, { foreignKey: 'user_id' });
Client.hasMany(Order, { foreignKey: 'client_id' });
Order.belongsTo(Client, { foreignKey: 'client_id' });
Order.hasMany(OrderItem, { foreignKey: 'order_id' });
OrderItem.belongsTo(Order, { foreignKey: 'order_id' });
OrderItem.belongsTo(Dish, { foreignKey: 'dish_id' });
Dish.hasMany(OrderItem, { foreignKey: 'dish_id' });
Dish.belongsTo(DishType, { foreignKey: 'dish_type_id' });
Restaurant.belongsToMany(Dish, { through: RestaurantDish, foreignKey: 'restaurant_id' });
Dish.belongsToMany(Restaurant, { through: RestaurantDish, foreignKey: 'dish_id' });

module.exports = { sequelize, User, Client, Order, OrderItem, Dish, Restaurant, DishType, RestaurantDish };