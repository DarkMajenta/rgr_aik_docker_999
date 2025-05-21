import db from '../db.js';

export const createOrder = async (req, res) => {
  const { user_id, items, total_price } = req.body;

  // Заглушка: "платёж прошёл"
  const paymentOk = true;

  if (!paymentOk) {
    return res.status(400).json({ message: 'Платёж отклонён' });
  }

  try {
    const result = await db.query(
      'INSERT INTO orders (user_id, items, total_price, status) VALUES ($1, $2, $3, $4) RETURNING *',
      [user_id, JSON.stringify(items), total_price, 'paid']
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Ошибка при создании заказа' });
  }
};
