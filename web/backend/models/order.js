// models/order.js
import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  items: [{ productId: String, quantity: Number }],
  total: Number,
  status: { type: String, default: 'Ожидает' },
}, { timestamps: true });

export default mongoose.model('Order', orderSchema);
