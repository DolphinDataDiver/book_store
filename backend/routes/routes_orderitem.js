import express from 'express';
import { addOrderItem, ReturnOrderItemById } from '../controllers/orderitemControllers.js';

const router = express.Router();

router.post('/', addOrderItem);
router.get('/:id', ReturnOrderItemById);

export default router;
