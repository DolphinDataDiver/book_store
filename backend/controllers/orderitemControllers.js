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
