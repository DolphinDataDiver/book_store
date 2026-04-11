import express from "express";
import mongoose from "mongoose";
import bookRoutes from "./routes/routes_book.js";
import clientRoutes from "./routes/routes_client.js";
import orderRoutes from "./routes/routes_order.js";
import orderItemRoutes from "./routes/routes_orderitem.js";
import categoryRoutes from "./routes/routes_category.js";
import cors from "cors";


const app = express();
app.use(cors());

///////
mongoose.connect('mongodb://127.0.0.1:27017/books_db')
  .then(() => {
    console.log("Connected to MongoDB...");
  })
  .catch((err) => {
    console.error("Could not connect to MongoDB...", err);
});
//////////

app.use(express.json());
app.use("/api/books", bookRoutes);
app.use("/api/clients", clientRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/orderitems", orderItemRoutes);
app.use("/api/categories", categoryRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
