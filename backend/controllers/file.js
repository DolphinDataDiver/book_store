import Book from "../models/Book.js";

export const ReturnBooks = async (req, res) => {
    const books = await Book.find(); 
    res.json(books);
};

export const ReturnBookById = async (req, res) => {
    const id = req.params.id;
    const book = await Book.findById(id);

    res.json(book);
};

export const AddBook = async (req, res) => {
    const { title, author, price, publication_date } = req.body;

    const newBook = new Book({
      title,
      author,
      price,
      publication_date,
    });

    await newBook.save();
    res.status(201).json(newBook);
};

export const ModifyBook = async (req, res) => {
    const id = req.params.id; 
    const { title, author, price, publication_date } = req.body;

    const book = await Book.findById(id); 


    book.title = title ?? book.title;
    book.author = author ?? book.author;
    book.price = price ?? book.price;
    book.publication_date = publication_date ?? book.publication_date;

    await book.save();
    res.json(book);
};

export const DeleteBook = async (req, res) => {
    const id = req.params.id; // Get the book ID from the URL

    const book = await Book.findById(id); // Find the book by ID

    await book.remove(); // Remove the book from the database
    res.send("Book deleted");
};
import Client from "../models/Client.js";

export const ReturnClients = async (req, res) => {
    const clients = await Client.find(); 
    res.json(clients);
};

export const ReturnClientById = async (req, res) => {
    const id = req.params.id;
    const client = await Client.findById(id);

    res.json(client);
};

export const addClient = async (req, res) => {
  try {
    const {
      first_name,
      last_name,
      email,
      address,
      tel,
      total,
    } = req.body;

    const newClient = new Order({
      first_name,
      last_name,
      email,
      address,
      tel,
      total,
    });

    await newClient.save();

    res.status(201).json(newClient);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const DeleteClient = async (req, res) => {
    const id = req.params.id; // Get the client ID from the URL

    const client = await Client.findById(id); // Find the book by ID

    await client.remove(); // Remove the book from the database
    res.send("Client deleted");
};

import Order from "../models/Order.js";

export const ReturnOrders = async (req, res) => {
    const orders = await Order.find(); 
    res.json(orders);
};

export const ReturnOrderById = async (req, res) => {
    const id = req.params.id;
    const order = await Order.findById(id);

    res.json(order);
};


export const addOrder = async (req, res) => {
  try {
    const { status, total, client } = req.body;

    if (!status || !total || !client) {
      return res.status(400).json({ message: "Status, total, and client are required" });
    }

    const newOrder = new Order({
      status,
      total,
      client,
    });

    await newOrder.save();

    res.status(201).json(newOrder);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const DeleteOrder = async (req, res) => {
    const id = req.params.id; // Get the order ID from the URL

    const order = await Order.findById(id); // Find the book by ID

    await order.remove(); // Remove the book from the database
    res.send("Order deleted");
};


import OrderItem from "../models/OrderItem.js";

export const addOrderItem = async (req, res) => {
  try {
    const { quantity, book, order } = req.body;

    if (!quantity || !book || !order) {
      return res.status(400).json({ message: "Quantity, book, and order are required" });
    }

    const newOrderItem = new OrderItem({ quantity, book, order });
    await newOrderItem.save();

    res.status(201).json(newOrderItem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const ReturnOrderItemById = async (req, res) => {
  try {
    const id = req.params.id;

    // Find the order item and populate book and order details
    const orderItem = await OrderItem.findById(id)
      .populate("book")   // full book details
      .populate("order"); // full order details

    if (!orderItem) {
      return res.status(404).json({ message: "Order item not found" });
    }

    res.json(orderItem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
