import express from 'express'
import { ReturnBooks, ReturnBookById, AddBook, ModifyBook, DeleteBook } from '../controllers/bookControllers.js'


const router = express.Router();

router.get('/books', ReturnBooks);
router.get('/books/:id', ReturnBookById);
router.post('/books', AddBook);
router.put('/books/:id', ModifyBook);
router.delete('/books/:id', DeleteBook);



export default bookRoutes;
import express from 'express'
import { ReturnClients, ReturnClientById, AddClient, ModifyClient, DeleteClient } from '../controllers/clientControllers.js'


router.get('/api/clients', ReturnClients);
router.get('/api/clients/:id', ReturnClientById);
router.post('/api/clients', AddClient);
router.put('/api/clients/:id', ModifyClient);
router.delete('/api/clients/:id', DeleteClient);



export default clientRoutes;

import express from 'express'
import {addOrderItem, ReturnOrderItemById} from '../controllers/orderitemControllers.js'

router.get('/api/clients', addOrderItemClients);
router.get('/api/clients/:id', addOrderItemClients);

export default orderitemRoutes;


import express from 'express'
import { ReturnOrders, ReturnOrderById, AddOrder, DeleteOrder } from '../controllers/orderControllers.js'


router.get('/api/orders', ReturnOrders);
router.get('/api/orders/:id', ReturnOrderById);
router.post('/api/orders', AddOrder);
router.delete('/api/orders/:id', DeleteOrder);


export default orderRoutes;


