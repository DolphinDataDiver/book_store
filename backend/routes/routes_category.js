import express from 'express';
import {AddCategory, DeleteCategory } from '../controllers/categoryControllers.js';

const router = express.Router();

router.post('/', AddCategory);
router.delete('/:id', DeleteCategory);

export default router; 

