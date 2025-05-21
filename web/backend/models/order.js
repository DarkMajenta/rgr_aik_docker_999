// // models/order.js
// import mongoose from 'mongoose';

// const orderSchema = new mongoose.Schema({
//   userId: { type: String, required: true },
//   items: [{ productId: String, quantity: Number }],
//   total: Number,
//   status: { type: String, default: 'Ожидает' },
// }, { timestamps: true });

// export default mongoose.model('Order', orderSchema);

// Структура таблицы orders:
// id SERIAL PRIMARY KEY
// user_id INTEGER NOT NULL
// items JSONB NOT NULL
// total_price NUMERIC(10,2) NOT NULL
// status TEXT NOT NULL
// created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
