module.exports = (sequelize, DataTypes) => {
  const DishType = sequelize.define('DishType', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    tableName: 'dish_types',
    timestamps: false,
  });
  return DishType;
};