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
    const { title, author, price, publication_date, category } = req.body;

    const newBook = new Book({
      title,
      author,
      price,
      publication_date,
      category
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
    try {
        const id = req.params.id;

        // This finds the document AND deletes it in one go
        const deletedBook = await Book.findByIdAndDelete(id);

        if (!deletedBook) {
            return res.status(404).send("Book not found");
        }

        res.send("Book deleted");
    } catch (error) {
        res.status(500).send(error.message);
    }
};
