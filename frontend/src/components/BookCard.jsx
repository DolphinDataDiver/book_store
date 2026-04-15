import bookPlaceholder from "../assets/petit_prince.jpg";
import { formatDate, formatMoney } from "../utils/storeUi.js";

function BookCard({ book }) {
  if (!book) {
    return <div className="detail-card">No book selected.</div>;
  }

  return (
    <article className="book-card">
      <img className="book-card-image" src={bookPlaceholder} alt={book.title} />

      <div className="book-card-copy">
        <p className="section-label">Book Detail</p>
        <h3>{book.title}</h3>
        <p className="helper-text">by {book.author}</p>

        <dl className="book-card-meta">
          <div className="detail-row">
            <dt>Price</dt>
            <dd>{formatMoney(book.price) || "N/A"}</dd>
          </div>
          <div className="detail-row">
            <dt>Category</dt>
            <dd>{book.category || "Unassigned"}</dd>
          </div>
          <div className="detail-row">
            <dt>Published</dt>
            <dd>{formatDate(book.publication_date) || "Unknown"}</dd>
          </div>
          <div className="detail-row">
            <dt>ID</dt>
            <dd className="mono">{book._id}</dd>
          </div>
        </dl>
      </div>
    </article>
  );
}

export default BookCard;
