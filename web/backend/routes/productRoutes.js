import express from 'express';
import { getProducts, addProduct } from '../controllers/productController.js';

const router = express.Router();

router.get('/', getProducts);
router.post('/', addProduct); // Можно добавить auth, если нужно

export default router;
