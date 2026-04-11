import express from 'express';
import { ReturnBooks, ReturnBookById, AddBook, ModifyBook, DeleteBook } from '../controllers/bookControllers.js';

const router = express.Router();

router.get('/', ReturnBooks);
router.get('/:id', ReturnBookById);
router.post('/', AddBook);
router.put('/:id', ModifyBook);
router.delete('/:id', DeleteBook);

export default router; // Fix: Export the 'router' variable
