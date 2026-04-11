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
      required: false
    }
  }
)

const Book = mongoose.model("Book", bookSchema);

export default Book;
