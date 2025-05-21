const express = require('express');
const { Order, OrderItem, sequelize } = require('../models');
const authMiddleware = require('../middleware/auth');
const router = express.Router();

router.post('/', authMiddleware, async (req, res) => {
  const { items, total_price } = req.body;
  const client_id = req.user.clientId;
  try {
    const order = await sequelize.transaction(async (t) => {
      const newOrder = await Order.create({ client_id, items, total_price }, { transaction: t });
      for (const item of items) {
        await OrderItem.create({
          order_id: newOrder.id,
          dish_id: item.dish_id,
          quantity: item.quantity,
        }, { transaction: t });
      }
      return newOrder;
    });
    res.status(201).json(order);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get('/details', authMiddleware, async (req, res) => {
  try {
    const details = await sequelize.query('SELECT * FROM order_details WHERE client_id = :clientId', {
      replacements: { clientId: req.user.clientId },
      type: sequelize.QueryTypes.SELECT,
    });
    res.json(details);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;