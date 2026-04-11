import express from 'express';
import { ReturnClients, ReturnClientById, AddClient, DeleteClient } from '../controllers/clientControllers.js';

const router = express.Router(); // Fix: Define the router

router.get('/', ReturnClients);
router.get('/:id', ReturnClientById);
router.post('/', AddClient);
router.delete('/:id', DeleteClient);

export default router;
