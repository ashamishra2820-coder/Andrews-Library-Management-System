
import { useEffect, useState } from "react";
import {
  BOOK_TYPES,
  CATEGORIES,
  FORMATS,
  LANGUAGES,
  STATUSES,
} from "../data/constants";
import { validateBook } from "../utils/validate";

const blank = {
  name: "",
  bookId: "",
  author: "",
  isbn: "",
  publisher: "",
  category: "",
  language: "",
  type: "",
  formats: [],
  publishedDate: "",
  purchaseDate: "",
  price: "",
  quantity: "",
  description: "",
  status: "Available",
};

// DD-MM-YYYY date validation
const isValidDate = (date) => {
  if (!date) return false;

  const match = /^(\d{2})-(\d{2})-(\d{4})$/.exec(date);

  if (!match) return false;

  const day = Number(match[1]);
  const month = Number(match[2]);
  const year = Number(match[3]);

  if (year < 1900 || year > 2099) return false;

  const d = new Date(year, month - 1, day);

  return (
    d.getFullYear() === year &&
    d.getMonth() === month - 1 &&
    d.getDate() === day
  );
};

// DD-MM-YYYY to YYYY-MM-DD
const convertDate = (date) => {
  if (!isValidDate(date)) return "";

  const [day, month, year] = date.split("-");

  return `${year}-${month}-${day}`;
};

// YYYY-MM-DD to DD-MM-YYYY
const displayDate = (date) => {
  if (!date) return "";

  // Already DD-MM-YYYY
  if (/^\d{2}-\d{2}-\d{4}$/.test(date)) {
    return date;
  }

  // Convert saved ISO date
  if (/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    const [year, month, day] = date.split("-");
    return `${day}-${month}-${year}`;
  }

  return "";
};

function Field({ label, error, col = "col-md-6", children }) {
  return (
    <div className={col}>
      <label className="form-label">{label}</label>
      {children}
      {error && (
        <div className="text-danger small mt-1">{error}</div>
      )}
    </div>
  );
}

export default function BookForm({
  books,
  editing,
  onSubmit,
  onCancel,
}) {
  const [form, setForm] = useState({ ...blank });
  const [errors, setErrors] = useState({});

  // Load form data while editing
  useEffect(() => {
    if (editing) {
      setForm({
        ...blank,
        ...editing,
        formats: editing.formats || [],
        publishedDate: displayDate(editing.publishedDate),
        purchaseDate: displayDate(editing.purchaseDate),
        price: String(editing.price ?? ""),
        quantity: String(editing.quantity ?? ""),
      });
    } else {
      setForm({ ...blank });
    }

    setErrors({});
  }, [editing]);

  // Handle input changes
  const change = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      setForm((f) => ({
        ...f,
        formats: checked
          ? [...f.formats, value]
          : f.formats.filter((x) => x !== value),
      }));

      setErrors(({ formats, ...rest }) => rest);
    } else {
      setForm((f) => ({
        ...f,
        [name]: value,
      }));

      setErrors(({ [name]: removed, ...rest }) => rest);
    }
  };

  // Calendar date selection
  const changeCalendarDate = (name, value) => {
    const formatted = value
      ? value.split("-").reverse().join("-")
      : "";

    setForm((f) => ({
      ...f,
      [name]: formatted,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  // Submit form
const submit = (e) => {
  e.preventDefault();

  const found = validateBook(form, books, editing?.id);

  setErrors(found);

  if (Object.keys(found).length > 0) return;

  onSubmit({
    ...form,
    name: form.name.trim(),
    bookId: form.bookId.trim(),
    author: form.author.trim(),
    publisher: form.publisher.trim(),
    isbn: form.isbn.trim(),
    description: form.description.trim(),

    // Dates are already in YYYY-MM-DD format
    publishedDate: form.publishedDate,
    purchaseDate: form.purchaseDate,

    price: Number(form.price),
    quantity: Number(form.quantity),
  });

  setForm({ ...blank });
  setErrors({});
};

  // Input classes
  const cls = (n) =>
    `form-control${errors[n] ? " is-invalid" : ""}`;

  const sel = (n) =>
    `form-select${errors[n] ? " is-invalid" : ""}`;

  return (
    <form onSubmit={submit} noValidate className="panel p-4">

      <div className="row g-3">

        {/* Book Name */}
        <Field label="Book name" error={errors.name}>
          <input
            type="text"
            className={cls("name")}
            name="name"
            value={form.name}
            onChange={change}
            placeholder="e.g. The Great Gatsby"
          />
        </Field>

        {/* Book ID */}
        <Field label="Book ID" error={errors.bookId}>
          <input
            type="text"
            className={cls("bookId")}
            name="bookId"
            value={form.bookId}
            onChange={change}
            placeholder="e.g. BK-2001"
          />
        </Field>

        {/* Author */}
        <Field label="Author name" error={errors.author}>
          <input
            type="text"
            className={cls("author")}
            name="author"
            value={form.author}
            onChange={change}
            placeholder="Enter author name"
          />
        </Field>

        {/* ISBN */}
        <Field label="ISBN number" error={errors.isbn}>
          <input
            type="text"
            className={cls("isbn")}
            name="isbn"
            value={form.isbn}
            onChange={change}
            placeholder="10 or 13 digits"
          />
        </Field>

        {/* Publisher */}
        <Field label="Publisher name" error={errors.publisher}>
          <input
            type="text"
            className={cls("publisher")}
            name="publisher"
            value={form.publisher}
            onChange={change}
            placeholder="Enter publisher name"
          />
        </Field>

        {/* Category */}
        <Field
          label="Book category"
          error={errors.category}
          col="col-md-3"
        >
          <select
            className={sel("category")}
            name="category"
            value={form.category}
            onChange={change}
          >
            <option value="">Select</option>

            {CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </Field>

        {/* Language */}
        <Field
          label="Language"
          error={errors.language}
          col="col-md-3"
        >
          <select
            className={sel("language")}
            name="language"
            value={form.language}
            onChange={change}
          >
            <option value="">Select</option>

            {LANGUAGES.map((l) => (
              <option key={l} value={l}>
                {l}
              </option>
            ))}
          </select>
        </Field>

        {/* Book Type */}
        <Field label="Book type" error={errors.type}>
          <div className="pt-1">
            {BOOK_TYPES.map((t) => (
              <div
                className="form-check form-check-inline"
                key={t}
              >
                <input
                  className="form-check-input"
                  type="radio"
                  name="type"
                  id={`type-${t}`}
                  value={t}
                  checked={form.type === t}
                  onChange={change}
                />

                <label
                  className="form-check-label"
                  htmlFor={`type-${t}`}
                >
                  {t}
                </label>
              </div>
            ))}
          </div>
        </Field>

        {/* Available Formats */}
        <Field
          label="Available formats"
          error={errors.formats}
        >
          <div className="pt-1">
            {FORMATS.map((f) => (
              <div
                className="form-check form-check-inline"
                key={f}
              >
                <input
                  className="form-check-input"
                  type="checkbox"
                  name="formats"
                  id={`fmt-${f}`}
                  value={f}
                  checked={form.formats.includes(f)}
                  onChange={change}
                />

                <label
                  className="form-check-label"
                  htmlFor={`fmt-${f}`}
                >
                  {f}
                </label>
              </div>
            ))}
          </div>
        </Field>

        {/* Published Date */}
        <Field
          label="Published date"
          error={errors.publishedDate}
          col="col-md-3"
        >
          <div className="input-group">
            <input
              type="text"
              className={cls("publishedDate")}
              name="publishedDate"
              value={form.publishedDate}
              onChange={change}
              placeholder="DD-MM-YYYY"
              maxLength={10}
              inputMode="numeric"
            />

            <input
              type="date"
              className="form-control"
              style={{
                maxWidth: "52px",
                padding: "5px",
              }}
              value={convertDate(form.publishedDate)}
              onChange={(e) =>
                changeCalendarDate(
                  "publishedDate",
                  e.target.value
                )
              }
              aria-label="Select published date"
              title="Choose published date"
            />
          </div>
        </Field>

        {/* Purchase Date */}
        <Field
          label="Purchase date"
          error={errors.purchaseDate}
          col="col-md-3"
        >
          <div className="input-group">
            <input
              type="text"
              className={cls("purchaseDate")}
              name="purchaseDate"
              value={form.purchaseDate}
              onChange={change}
              placeholder="DD-MM-YYYY"
              maxLength={10}
              inputMode="numeric"
            />

            <input
              type="date"
              className="form-control"
              style={{
                maxWidth: "52px",
                padding: "5px",
              }}
              value={convertDate(form.purchaseDate)}
              onChange={(e) =>
                changeCalendarDate(
                  "purchaseDate",
                  e.target.value
                )
              }
              aria-label="Select purchase date"
              title="Choose purchase date"
            />
          </div>
        </Field>

        {/* Price */}
        <Field
          label="Book price (₹)"
          error={errors.price}
          col="col-md-3"
        >
          <input
            type="number"
            min="0"
            step="0.01"
            className={cls("price")}
            name="price"
            value={form.price}
            onChange={change}
            placeholder="Enter price"
          />
        </Field>

        {/* Quantity */}
        <Field
          label="Quantity"
          error={errors.quantity}
          col="col-md-3"
        >
          <input
            type="number"
            min="1"
            className={cls("quantity")}
            name="quantity"
            value={form.quantity}
            onChange={change}
            placeholder="Enter quantity"
          />
        </Field>

        {/* Description */}
        <Field
          label="Book description"
          error={errors.description}
          col="col-12"
        >
          <textarea
            rows="3"
            className={cls("description")}
            name="description"
            value={form.description}
            onChange={change}
            placeholder="What is this book about?"
          />
        </Field>

        {/* Status */}
        <Field
          label="Book status"
          error={errors.status}
          col="col-md-4"
        >
          <select
            className={sel("status")}
            name="status"
            value={form.status}
            onChange={change}
          >
            {STATUSES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </Field>

      </div>

      {/* Buttons */}
      <div className="d-flex gap-2 mt-4">

        <button
          type="submit"
          className="btn btn-brand px-4"
        >
          <i
            className={`bi ${
              editing ? "bi-check-lg" : "bi-plus-lg"
            } me-2`}
          ></i>

          {editing ? "Save changes" : "Add book"}
        </button>

        {editing && (
          <button
            type="button"
            className="btn btn-outline-secondary"
            onClick={onCancel}
          >
            Cancel edit
          </button>
        )}

        {!editing && (
          <button
            type="button"
            className="btn btn-outline-secondary"
            onClick={() => {
              setForm({ ...blank });
              setErrors({});
            }}
          >
            Clear form
          </button>
        )}

      </div>

    </form>
  );
}
