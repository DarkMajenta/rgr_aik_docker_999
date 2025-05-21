const express = require('express');
const { User, Client, Order, Dish, Restaurant, sequelize } = require('../models');
const { adminAuth } = require('../middleware/auth');
const router = express.Router();

router.get('/users', adminAuth, async (req, res) => {
  try {
    const users = await User.findAll({ include: [Client] });
    res.json(users);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.delete('/users/:id', adminAuth, async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findByPk(id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    await user.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get('/orders', adminAuth, async (req, res) => {
  try {
    const orders = await sequelize.query('SELECT * FROM order_details', {
      type: sequelize.QueryTypes.SELECT,
    });
    res.json(orders);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.put('/orders/:id/status', adminAuth, async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  try {
    const order = await Order.findByPk(id);
    if (!order) return res.status(404).json({ error: 'Order not found' });
    await order.update({ status });
    res.json(order);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;