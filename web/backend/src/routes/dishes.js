const express = require('express');
const { Dish } = require('../models');
const { cache } = require('../services/redis');
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const dishes = await cache('dishes', 3600, async () => {
      return await Dish.findAll();
    });
    res.json(dishes);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;