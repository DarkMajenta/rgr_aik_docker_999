module.exports = (sequelize, DataTypes) => {
  const Dish = sequelize.define('Dish', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: DataTypes.TEXT,
    portion_size: DataTypes.TEXT,
    technology: DataTypes.TEXT,
    preparation_time: DataTypes.INTEGER,
    dish_type_id: DataTypes.INTEGER,
    created_at: {
      type: DataTypes.DATE,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    },
  }, {
    tableName: 'dishes',
    timestamps: false,
  });
  return Dish;
};