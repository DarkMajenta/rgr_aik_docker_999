const express = require('express');
const { Dish, RestaurantDish } = require('../models');
const { cache } = require('../services/redis');
const { adminAuth } = require('../middleware/auth');
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const dishes = await cache('dishes', 3600, async () => {
      return await Dish.findAll({ include: ['DishType'] });
    });
    res.json(dishes);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.post('/', adminAuth, async (req, res) => {
  const { name, image, portion_size, technology, preparation_time, dish_type_id, restaurant_ids } = req.body;
  try {
    const dish = await Dish.create({ name, image, portion_size, technology, preparation_time, dish_type_id });
    if (restaurant_ids && restaurant_ids.length > 0) {
      await RestaurantDish.bulkCreate(restaurant_ids.map(id => ({
        restaurant_id: id,
        dish_id: dish.id,
        name,
      })));
    }
    res.status(201).json(dish);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.put('/:id', adminAuth, async (req, res) => {
  const { id } = req.params;
  const { name, image, portion_size, technology, preparation_time, dish_type_id, restaurant_ids } = req.body;
  try {
    const dish = await Dish.findByPk(id);
    if (!dish) return res.status(404).json({ error: 'Dish not found' });
    await dish.update({ name, image, portion_size, technology, preparation_time, dish_type_id });
    if (restaurant_ids) {
      await RestaurantDish.destroy({ where: { dish_id: id } });
      await RestaurantDish.bulkCreate(restaurant_ids.map(id => ({
        restaurant_id: id,
        dish_id: dish.id,
        name,
      })));
    }
    res.json(dish);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.delete('/:id', adminAuth, async (req, res) => {
  const { id } = req.params;
  try {
    const dish = await Dish.findByPk(id);
    if (!dish) return res.status(404).json({ error: 'Dish not found' });
    await RestaurantDish.destroy({ where: { dish_id: id } });
    await dish.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;