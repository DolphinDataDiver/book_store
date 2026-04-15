import { useEffect, useState } from "react";
import { Link, useNavigate, useOutletContext, useParams } from "react-router-dom";
import { createBook, getBookById, updateBook } from "../api/storeApi.js";
import BookForm from "../components/BookForm.jsx";
import { AdminOnlyPanel, PageIntro } from "../components/StoreUi.jsx";
import {
  getBookFormValues,
  getErrorMessage,
  initialBookForm,
} from "../utils/storeUi.js";

function BookEditPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAdmin, setBooks, setStatus } = useOutletContext();
  const [form, setForm] = useState(initialBookForm);
  const [isLoading, setIsLoading] = useState(Boolean(id));
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isEditMode = Boolean(id);

  useEffect(() => {
    if (!isEditMode) {
      setForm(initialBookForm);
      setIsLoading(false);
      return;
    }

    let ignore = false;

    async function loadBook() {
      setIsLoading(true);
      try {
        const book = await getBookById(id);
        if (!ignore) {
          setForm(getBookFormValues(book));
        }
      } catch (error) {
        if (!ignore) {
          setStatus({
            tone: "error",
            message: getErrorMessage(error, "Could not load book for editing."),
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
  }, [id, isEditMode, setStatus]);

  async function handleSubmit(event) {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      const payload = {
        ...form,
        price: Number(form.price),
        publication_date: form.publication_date || undefined,
        category: form.category || undefined,
      };

      if (isEditMode) {
        const updated = await updateBook(id, payload);
        setBooks((current) => current.map((book) => (book._id === id ? updated : book)));
        setStatus({ tone: "success", message: `Book updated: ${updated.title}.` });
        navigate(`/books/${updated._id}`);
        return;
      }

      const created = await createBook(payload);
      setBooks((current) => [created, ...current]);
      setStatus({ tone: "success", message: `Book created: ${created.title}.` });
      navigate(`/books/${created._id}`);
    } catch (error) {
      setStatus({
        tone: "error",
        message: getErrorMessage(
          error,
          isEditMode ? "Could not update book." : "Could not create book.",
        ),
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  if (!isAdmin) {
    return (
      <section className="page-grid">
        <PageIntro
          eyebrow="Inventory"
          title={isEditMode ? "Edit Book" : "Create Book"}
          description="Write access is restricted to admins."
        >
          <div className="page-links">
            <Link className="button ghost" to="/books">
              Back to books
            </Link>
          </div>
        </PageIntro>
        <AdminOnlyPanel />
      </section>
    );
  }

  return (
    <section className="page-grid">
      <PageIntro
        eyebrow="Inventory"
        title={isEditMode ? "Edit Book" : "Create Book"}
        description={
          isEditMode
            ? "This page loads the current book, then reuses the shared book form for editing."
            : "This page reuses the shared book form for creating a new catalog entry."
        }
      >
        <div className="page-links">
          <Link className="button ghost" to="/books">
            Back to books
          </Link>
          {isEditMode ? (
            <Link className="button subtle" to={`/books/${id}`}>
              View detail
            </Link>
          ) : null}
        </div>
      </PageIntro>

      {isLoading ? (
        <section className="panel panel-wide">
          <p className="helper-text">Loading book form...</p>
        </section>
      ) : (
        <BookForm
          form={form}
          setForm={setForm}
          onSubmit={handleSubmit}
          submitLabel={isEditMode ? "Save changes" : "Create book"}
          title={isEditMode ? "Edit Book" : "Add Book"}
          description="BookForm stays reusable and the page handles routing, loading, and submission."
          isSubmitting={isSubmitting}
        />
      )}
    </section>
  );
}

export default BookEditPage;
