// controllers/orderController.js
import Order from '../models/order.js';

export const createOrder = async (req, res) => {
  try {
    const { userId, items, total } = req.body;

    // Заглушка для оплаты
    const paymentSuccess = true; // Здесь могла быть интеграция с PayPal

    if (!paymentSuccess) {
      return res.status(400).json({ message: 'Оплата не прошла' });
    }

    const newOrder = new Order({ userId, items, total, status: 'Оплачен' });
    await newOrder.save();

    res.status(201).json(newOrder);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
