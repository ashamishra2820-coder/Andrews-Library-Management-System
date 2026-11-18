
export default function BookModal({
  mode,
  book,
  onClose,
  onConfirmDelete,
}) {
  if (!book) return null;

  const rows = [
    ["Book ID", book.bookId],
    ["Author", book.author],
    ["ISBN", book.isbn],
    ["Publisher", book.publisher],
    ["Category", book.category],
    ["Language", book.language],
    ["Type", book.type],
    ["Formats", book.formats.join(", ")],
    ["Published", book.publishedDate],
    ["Purchased", book.purchaseDate],
    ["Price", `₹${book.price.toLocaleString("en-IN")}`],
    ["Quantity", book.quantity],
    ["Status", book.status],
  ];

  return (
    <>
      <div
        className="modal d-block"
        tabIndex="-1"
        role="dialog"
        onClick={onClose}
      >
        <div
          className="modal-dialog modal-dialog-centered modal-dialog-scrollable"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="modal-content">

            <div className="modal-header">
              <h5 className="modal-title">
                {mode === "delete"
                  ? "Delete this book?"
                  : book.name}
              </h5>

              <button
                type="button"
                className="btn-close"
                aria-label="Close"
                onClick={onClose}
              ></button>
            </div>

            <div className="modal-body">

              {mode === "delete" ? (
                <p className="mb-0">
                  <strong>{book.name}</strong> by {book.author}
                  will be removed from the catalogue.
                  This cannot be undone.
                </p>
              ) : (
                <>
                  <p className="text-muted">
                    {book.description}
                  </p>

                  <div className="small">
                    {rows.map(([k, v]) => (
                      <div
                        className="row g-0 py-2 border-top"
                        key={k}
                      >
                        <div className="col-4 fw-semibold">
                          {k}
                        </div>

                        <div className="col-8">
                          {v}
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}

            </div>

            <div className="modal-footer">

              <button
                className="btn btn-outline-secondary"
                onClick={onClose}
              >
                {mode === "delete" ? "Keep book" : "Close"}
              </button>

              {mode === "delete" && (
                <button
                  className="btn btn-danger"
                  onClick={onConfirmDelete}
                >
                  Delete book
                </button>
              )}

            </div>

          </div>
        </div>
      </div>

      <div
        className="modal-backdrop show"
        onClick={onClose}
      ></div>
    </>
  );
}
