import express from 'express';
import { ReturnOrders, ReturnOrderById, addOrder, DeleteOrder } from '../controllers/orderControllers.js';

const router = express.Router();

router.get('/', ReturnOrders);
router.get('/:id', ReturnOrderById);
router.post('/', addOrder); // Note: addOrder is usually camelCase in your controller
router.delete('/:id', DeleteOrder);

export default router;
