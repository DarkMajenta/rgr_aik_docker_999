import db from '../db.js';

export const getProducts = async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM products');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: 'Ошибка получения продуктов' });
  }
};

export const addProduct = async (req, res) => {
  const { name, price } = req.body;
  try {
    const result = await db.query(
      'INSERT INTO products (name, price) VALUES ($1, $2) RETURNING *',
      [name, price]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Ошибка добавления продукта' });
  }
};
