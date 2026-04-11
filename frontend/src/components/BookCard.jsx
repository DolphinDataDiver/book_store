import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom"; 
import { fetchBookbyId } from "../api/Bookapi.js"; 
import bookPlaceholder from "../assets/petit_prince.jpg"; 

function BookCard() {
  const [book, setBook] = useState(null);
  const { id } = useParams(); 

  useEffect(() => {
    if (id) {
      loadBook();
    }
  }, [id]);

  const loadBook = async () => {
    const data = await fetchBookbyId(id);
    console.log("Setting State with:", data);
    setBook(data);
  };

  // 1. IMPORTANT: The "Loading" Guard
  // Without this, React tries to read 'book.title' while book is null
  if (!book) {
    return <div style={{ padding: "50px", textAlign: "center" }}>Loading Book...</div>;
  }

  return (
    <div className="book-card" style={cardStyle}>
      <img 
        src={bookPlaceholder} 
        alt={book.title} 
        style={{ width: '200px', borderRadius: '8px' }} 
      />
      
      <div className="book-info">
        <h1>{book.title}</h1>
        <h3>by {book.author}</h3>
        
        <p><strong>Price:</strong> ${book.price}</p>
        
        {/* Category check: currently your API returns a string ID */}
        <p><strong>Category ID:</strong> {book.category}</p>
        
        <p><strong>Published:</strong> {new Date(book.publication_date).toLocaleDateString()}</p>

        <div className="description" style={{ marginTop: '15px', fontStyle: 'italic' }}>
          {/* Note: Your API doesn't have a 'description' field yet */}
          <p>{book.description || "No description provided in database."}</p>
        </div>
      </div>
    </div>
  );
}

const cardStyle = {
  display: "flex",
  gap: "30px",
  padding: "40px",
  border: "1px solid #eee",
  borderRadius: "12px",
  maxWidth: "800px",
  margin: "40px auto",
  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
  alignItems: "center"
};

export default BookCard;
