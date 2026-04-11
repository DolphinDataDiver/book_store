import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    status: { type: String, required: true },
    total: { type: Number, required: true },
    order_date: { type: Date, default: Date.now},
    client: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Client",
      required: true
    }
  }
)

const  Order = mongoose.model("Order", orderSchema);

export default Order;

