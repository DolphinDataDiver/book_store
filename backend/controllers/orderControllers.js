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


