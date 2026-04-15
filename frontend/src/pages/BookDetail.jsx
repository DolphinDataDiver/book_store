import { useEffect, useState } from "react";
import { Link, useParams, useOutletContext } from "react-router-dom";
import { getBookById } from "../api/storeApi.js";
import BookCard from "../components/BookCard.jsx";
import { DetailCard, PageIntro } from "../components/StoreUi.jsx";
import { formatDate, formatMoney, getErrorMessage } from "../utils/storeUi.js";

function BookDetail() {
  const { id } = useParams();
  const { isAdmin, setStatus } = useOutletContext();
  const [book, setBook] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let ignore = false;

    async function loadBook() {
      setIsLoading(true);
      try {
        const data = await getBookById(id);
        if (!ignore) {
          setBook(data);
          setStatus({ tone: "success", message: "Book details loaded." });
        }
      } catch (error) {
        if (!ignore) {
          setStatus({
            tone: "error",
            message: getErrorMessage(error, "Could not load book details."),
          });
        }
      } finally {
        if (!ignore) {
          setIsLoading(false);
        }
      }
    }

    void loadBook();

    return () => {
      ignore = true;
    };
  }, [id, setStatus]);

  return (
    <section className="page-grid">
      <PageIntro
        eyebrow="Inventory"
        title={book?.title || "Book Detail"}
        description="This page loads a single book using the route parameter and keeps the summary view separate from the list page."
      >
        <div className="page-links">
          <Link className="button ghost" to="/books">
            Back to books
          </Link>
          {isAdmin ? (
            <Link className="button subtle" to={`/books/${id}/edit`}>
              Edit book
            </Link>
          ) : null}
        </div>
      </PageIntro>

      <section className="panel panel-wide">
        {isLoading ? <p className="helper-text">Loading book...</p> : <BookCard book={book} />}
      </section>

      <section className="panel">
        <div className="panel-heading">
          <div>
            <p className="section-label">Metadata</p>
            <h3>Book Snapshot</h3>
          </div>
        </div>
        <DetailCard
          title={book?.title || "No book loaded"}
          items={[
            ["Author", book?.author],
            ["Price", formatMoney(book?.price)],
            ["Publication", formatDate(book?.publication_date)],
            ["Category", book?.category],
            ["ID", book?._id],
          ]}
        />
      </section>
    </section>
  );
}

export default BookDetail;
