const express = require('express');
const { Restaurant, RestaurantDish } = require('../models');
const { cache } = require('../services/redis');
const { adminAuth } = require('../middleware/auth');
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const restaurants = await cache('restaurants', 3600, async () => {
      return await Restaurant.findAll({ include: [{ model: Dish, through: RestaurantDish }] });
    });
    res.json(restaurants);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.post('/', adminAuth, async (req, res) => {
  const { name, address, cuisine_type, dish_ids } = req.body;
  try {
    const restaurant = await Restaurant.create({ name, address, cuisine_type });
    if (dish_ids && dish_ids.length > 0) {
      await RestaurantDish.bulkCreate(dish_ids.map(id => ({
        restaurant_id: restaurant.id,
        dish_id: id,
        name: (await Dish.findByPk(id)).name,
      })));
    }
    res.status(201).json(restaurant);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.put('/:id', adminAuth, async (req, res) => {
  const { id } = req.params;
  const { name, address, cuisine_type, dish_ids } = req.body;
  try {
    const restaurant = await Restaurant.findByPk(id);
    if (!restaurant) return res.status(404).json({ error: 'Restaurant not found' });
    await restaurant.update({ name, address, cuisine_type });
    if (dish_ids) {
      await RestaurantDish.destroy({ where: { restaurant_id: id } });
      await RestaurantDish.bulkCreate(dish_ids.map(id => ({
        restaurant_id: restaurant.id,
        dish_id: id,
        name: (await Dish.findByPk(id)).name,
      })));
    }
    res.json(restaurant);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.delete('/:id', adminAuth, async (req, res) => {
  const { id } = req.params;
  try {
    const restaurant = await Restaurant.findByPk(id);
    if (!restaurant) return res.status(404).json({ error: 'Restaurant not found' });
    await RestaurantDish.destroy({ where: { restaurant_id: id } });
    await restaurant.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;