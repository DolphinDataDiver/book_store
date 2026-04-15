import { initialBookForm, updateForm } from "../utils/storeUi.js";

function BookForm({
  form,
  setForm,
  onSubmit,
  submitLabel,
  title,
  description,
  isSubmitting = false,
}) {
  return (
    <section className="panel panel-wide">
      <div className="panel-heading">
        <div>
          <p className="section-label">{form._id ? "Update" : "Create"}</p>
          <h3>{title}</h3>
        </div>
      </div>

      {description ? <p className="helper-text">{description}</p> : null}

      <form className="form-grid" onSubmit={onSubmit}>
        <label>
          Title
          <input
            value={form.title}
            onChange={(event) => updateForm(setForm, "title", event.target.value)}
            required
          />
        </label>
        <label>
          Author
          <input
            value={form.author}
            onChange={(event) => updateForm(setForm, "author", event.target.value)}
            required
          />
        </label>
        <label>
          Price
          <input
            type="number"
            min="0"
            step="0.01"
            value={form.price}
            onChange={(event) => updateForm(setForm, "price", event.target.value)}
            required
          />
        </label>
        <label>
          Publication date
          <input
            type="date"
            value={form.publication_date}
            onChange={(event) => updateForm(setForm, "publication_date", event.target.value)}
          />
        </label>
        <label className="span-2">
          Category ID
          <input
            value={form.category}
            onChange={(event) => updateForm(setForm, "category", event.target.value)}
          />
        </label>
        <div className="form-actions span-2">
          <button type="submit" className="button primary" disabled={isSubmitting}>
            {isSubmitting ? "Saving..." : submitLabel}
          </button>
          <button
            type="button"
            className="button ghost"
            onClick={() => setForm(initialBookForm)}
            disabled={isSubmitting}
          >
            Reset
          </button>
        </div>
      </form>
    </section>
  );
}

export default BookForm;
