const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User, Client } = require('../models');
const router = express.Router();

router.post('/register', async (req, res) => {
  const { email, password, first_name, last_name, phone, address, role } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ email, password: hashedPassword, role: role || 'client' });
    const client = await Client.create({ user_id: user.id, first_name, last_name, phone, address });
    const token = jwt.sign({ userId: user.id, clientId: client.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(201).json({ token, client });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ where: { email } });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    const client = await Client.findOne({ where: { user_id: user.id } });
    const token = jwt.sign({ userId: user.id, clientId: client.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token, client });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;