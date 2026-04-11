import mongoose from "mongoose";

const order_itemSchema = new mongoose.Schema(
  {
    quantity: { type: Number, required: true },
    book: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Book",
      required: true
    },
    order: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
      required: true
    }
  }
)

const  OrderItem = mongoose.model("OrderItem", order_itemSchema);

export default OrderItem;


