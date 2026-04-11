import mongoose from "mongoose";

const bookSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    author: { type: String, required: true },
    price: { type: Number, required: true },
    publication_date: { type: Date, default: Date.now }, // ← comma added
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true
    }
  }
)

const Book = mongoose.model("Book", bookSchema);

export default Book;
import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    name:{type:String, required: true},
  }
);

const Category= mongoose.model("Category", categorySchema);

export default Category;
import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    email: { type: String, required: true },
    address: { type: String, required: true },
    tel: { type: String, required: true },
    last_name: { type: String, required: true },
    total: { type: Number, required: true },
    order_date: { type: Date, default: Date.now},
  }
)

const  Order = mongoose.model("Order", orderSchema);

export default Client;


import mongoose from "mongoose";

const bookSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    author: { type: String, required: true },
    price: { type: Number, required: true },
    publication_date: { type: Date, default: Date.now }, // ← comma added
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true
    }
  }
)

const Book = mongoose.model("Book", bookSchema);

export default Book;
import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    name:{type:String, required: true},
  }
);

const Category= mongoose.model("Category", categorySchema);

export default Category;
import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    email: { type: String, required: true },
    address: { type: String, required: true },
    tel: { type: String, required: true },
    last_name: { type: String, required: true },
    total: { type: Number, required: true },
    order_date: { type: Date, default: Date.now},
  }
)

const  Order = mongoose.model("Order", orderSchema);

export default Client;


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

