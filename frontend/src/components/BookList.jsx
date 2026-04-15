import { formatDate, formatMoney } from "../utils/storeUi.js";

function BookList({ books, isLoading, canManage, onView, onEdit, onDelete }) {
  return (
    <div className="table-wrap">
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Price</th>
            <th>Published</th>
            <th>Category</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => (
            <tr key={book._id}>
              <td>{book.title}</td>
              <td>{book.author}</td>
              <td>{formatMoney(book.price) || "N/A"}</td>
              <td>{formatDate(book.publication_date) || "Unknown"}</td>
              <td>{book.category || "Unassigned"}</td>
              <td className="row-actions">
                <button type="button" className="button subtle" onClick={() => onView(book)}>
                  View
                </button>
                {canManage ? (
                  <>
                    <button type="button" className="button subtle" onClick={() => onEdit(book)}>
                      Edit
                    </button>
                    <button
                      type="button"
                      className="button danger"
                      onClick={() => onDelete(book)}
                    >
                      Delete
                    </button>
                  </>
                ) : null}
              </td>
            </tr>
          ))}
          {!books.length && !isLoading ? (
            <tr>
              <td colSpan="6" className="empty-row">
                No books returned by the backend yet.
              </td>
            </tr>
          ) : null}
        </tbody>
      </table>
    </div>
  );
}

export default BookList;
