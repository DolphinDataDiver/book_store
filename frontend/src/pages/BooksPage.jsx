import { useState } from "react";
import { Link, useNavigate, useOutletContext } from "react-router-dom";
import BookList from "../components/BookList.jsx";
import { AdminOnlyPanel, DetailCard, PageIntro } from "../components/StoreUi.jsx";
import { getErrorMessage } from "../utils/storeUi.js";

function BooksPage() {
  const {
    books,
    recentCategories,
    isAdmin,
    isLoading,
    removeBook,
    addCategory,
    removeCategory,
    setStatus,
  } = useOutletContext();
  const navigate = useNavigate();
  const [categoryName, setCategoryName] = useState("");
  const [categoryDeleteId, setCategoryDeleteId] = useState("");

  async function handleDeleteBook(book) {
    try {
      await removeBook(book._id);
      setStatus({ tone: "success", message: "Book deleted." });
    } catch (error) {
      setStatus({ tone: "error", message: getErrorMessage(error, "Could not delete book.") });
    }
  }

  async function handleCreateCategory(event) {
    event.preventDefault();
    try {
      const created = await addCategory(categoryName);
      setCategoryName("");
      setStatus({ tone: "success", message: `Category created: ${created.name}.` });
    } catch (error) {
      setStatus({
        tone: "error",
        message: getErrorMessage(error, "Could not create category."),
      });
    }
  }

  async function handleDeleteCategory(event) {
    event.preventDefault();
    try {
      await removeCategory(categoryDeleteId);
      setCategoryDeleteId("");
      setStatus({ tone: "success", message: "Category deleted." });
    } catch (error) {
      setStatus({
        tone: "error",
        message: getErrorMessage(error, "Could not delete category."),
      });
    }
  }

  return (
    <section className="page-grid">
      <PageIntro
        eyebrow="Inventory"
        title="Books"
        description="Authenticated users can inspect inventory. Only admins can create, edit, or delete."
        countLabel={`${books.length} items`}
      >
        <div className="page-links">
          <Link className="button ghost" to="/books/new">
            Create book
          </Link>
        </div>
      </PageIntro>

      <section className="panel">
        <div className="panel-heading">
          <div>
            <p className="section-label">Lookup</p>
            <h3>Book Navigation</h3>
          </div>
        </div>
        <p className="helper-text">
          Open a detail page to inspect one book or jump straight to an edit page if you have
          admin access.
        </p>
        <DetailCard
          title="Inventory summary"
          items={[
            ["Books loaded", books.length],
            ["Admin write access", isAdmin ? "Yes" : "No"],
            ["Recent categories", recentCategories.length],
          ]}
        />
      </section>

      <section className="panel panel-wide">
        <div className="panel-heading">
          <div>
            <p className="section-label">Inventory</p>
            <h3>Books Table</h3>
          </div>
        </div>
        <BookList
          books={books}
          isLoading={isLoading}
          canManage={isAdmin}
          onView={(book) => navigate(`/books/${book._id}`)}
          onEdit={(book) => navigate(`/books/${book._id}/edit`)}
          onDelete={handleDeleteBook}
        />
      </section>

      {isAdmin ? (
        <section className="panel">
          <div className="panel-heading">
            <div>
              <p className="section-label">Categories</p>
              <h3>Manage Category</h3>
            </div>
          </div>
          <form className="form-grid" onSubmit={handleCreateCategory}>
            <label className="span-2">
              Name
              <input
                value={categoryName}
                onChange={(event) => setCategoryName(event.target.value)}
                required
              />
            </label>
            <div className="form-actions span-2">
              <button type="submit" className="button primary">
                Create category
              </button>
            </div>
          </form>
          <form className="form-grid compact" onSubmit={handleDeleteCategory}>
            <label className="span-2">
              Category ID to delete
              <input
                value={categoryDeleteId}
                onChange={(event) => setCategoryDeleteId(event.target.value)}
                required
              />
            </label>
            <div className="form-actions span-2">
              <button type="submit" className="button danger">
                Delete category
              </button>
            </div>
          </form>
          <div className="mini-list">
            {recentCategories.map((category) => (
              <div key={category._id} className="mini-list-item">
                <strong>{category.name}</strong>
                <span className="mono">{category._id}</span>
              </div>
            ))}
            {!recentCategories.length ? (
              <p className="helper-text">Categories created in this session are shown here.</p>
            ) : null}
          </div>
        </section>
      ) : (
        <AdminOnlyPanel />
      )}
    </section>
  );
}

export default BooksPage;
