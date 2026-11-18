
export function validateBook(form, books, editingId) {
  const e = {};

  // Text validation
  const text = (k, label, min = 2) => {
    if (!form[k].trim()) {
      e[k] = `${label} is required`;
    } else if (form[k].trim().length < min) {
      e[k] = `${label} must be at least ${min} characters`;
    }
  };

  text("name", "Book name");
  text("author", "Author name");
  text("publisher", "Publisher name");

  // Book ID
  const id = form.bookId.trim();

  if (!id) {
    e.bookId = "Book ID is required";
  } else if (!/^[A-Za-z0-9-]{3,15}$/.test(id)) {
    e.bookId = "Use 3-15 letters, numbers or hyphens";
  } else if (
    books.some(
      (b) =>
        b.bookId.toLowerCase() === id.toLowerCase() &&
        b.id !== editingId
    )
  ) {
    e.bookId = "This Book ID already exists";
  }

  // ISBN
  const isbn = form.isbn.replace(/-/g, "").trim();

  if (!isbn) {
    e.isbn = "ISBN number is required";
  } else if (!/^(\d{10}|\d{13})$/.test(isbn)) {
    e.isbn = "ISBN must be 10 or 13 digits";
  }

  // Dropdowns
  if (!form.category) e.category = "Please select a category";
  if (!form.language) e.language = "Please select a language";
  if (!form.type) e.type = "Please choose a book type";

  if (form.formats.length === 0) {
    e.formats = "Select at least one format";
  }

  // Date validation (YYYY-MM-DD)
  const now = new Date();

  const today = [
    now.getFullYear(),
    String(now.getMonth() + 1).padStart(2, "0"),
    String(now.getDate()).padStart(2, "0"),
  ].join("-");

  if (!form.publishedDate) {
    e.publishedDate = "Published date is required";
  } else if (form.publishedDate > today) {
    e.publishedDate = "Published date cannot be in the future";
  }

  if (!form.purchaseDate) {
    e.purchaseDate = "Purchase date is required";
  } else if (form.purchaseDate > today) {
    e.purchaseDate = "Purchase date cannot be in the future";
  } else if (
    form.publishedDate &&
    form.purchaseDate < form.publishedDate
  ) {
    e.purchaseDate =
      "Purchase date cannot be before published date";
  }

  // Price
  if (form.price === "") {
    e.price = "Price is required";
  } else if (!Number.isFinite(Number(form.price)) || Number(form.price) <= 0) {
    e.price = "Price must be greater than 0";
  }

  // Quantity
  if (form.quantity === "") {
    e.quantity = "Quantity is required";
  } else if (
    !Number.isInteger(Number(form.quantity)) ||
    Number(form.quantity) < 1
  ) {
    e.quantity = "Quantity must be a whole number, 1 or more";
  }

  // Description
  if (!form.description.trim()) {
    e.description = "Description is required";
  } else if (form.description.trim().length < 10) {
    e.description = "Description must be at least 10 characters";
  }

  // Status
  if (!form.status) {
    e.status = "Select a status";
  }

  return e;
}
