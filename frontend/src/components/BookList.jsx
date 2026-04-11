import React, { useState, useEffect } from "react";
import { fetchBooks, deleteBook } from "../api/Bookapi.js";

function Booklist() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    loadBooks();
  }, []);

  const loadBooks = async () => {
    const data = await fetchBooks();
    setBooks(data);
  };

  const handleDelete = async (id) => {
    const success = await deleteBook(id);
    if (success) {
      setBooks(prevBooks => prevBooks.filter((b) => b._id !== id));
    }
  };

  return (
    <>
      <h1>Books List</h1>
      <table border="1">
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Publication Date</th>
            <th>Category</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {books.map((b) => (
            <tr key={b._id}>
              <td>{b.title}</td>
              <td>{b.author}</td>
              <td>{new Date(b.publication_date).toLocaleDateString()}</td>
              <td>{typeof b.category === 'object' ? b.category.name : b.category}</td>
              <td>
                <button onClick={() => handleDelete(b._id)} style={{color: 'red'}}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default Booklist;
