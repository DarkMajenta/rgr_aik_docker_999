import express from 'express';
import { createOrder, getUserOrders } from '../controllers/orderController.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.post('/', auth, createOrder);
router.get('/', auth, getUserOrders);

export default router;


// import express from 'express';
// import { createOrder } from '../controllers/orderController.js';

// const router = express.Router();

// router.post('/', createOrder);

// export default router;
