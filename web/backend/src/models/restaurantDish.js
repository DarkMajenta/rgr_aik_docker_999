module.exports = (sequelize, DataTypes) => {
  const RestaurantDish = sequelize.define('RestaurantDish', {
    restaurant_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    dish_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    name: DataTypes.STRING,
  }, {
    tableName: 'restaurant_dishes',
    timestamps: false,
  });
  return RestaurantDish;
};