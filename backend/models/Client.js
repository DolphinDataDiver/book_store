import mongoose from "mongoose";

const clientSchema = new mongoose.Schema(
  {
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    email: { type: String, required: true },
    address: { type: String, required: true },
    tel: { type: String, required: true },
    total: { type: Number, required: true },
    order_date: { type: Date, default: Date.now},
  }
)

const  Client = mongoose.model("Client", clientSchema);

export default Client;


