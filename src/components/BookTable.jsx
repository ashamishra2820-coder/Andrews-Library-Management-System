const COLS = [
  { key: "bookId", label: "Book ID" },
  { key: "name", label: "Book" },
  { key: "category", label: "Category" },
  { key: "price", label: "Price" },
  { key: "quantity", label: "Qty" },
  { key: "status", label: "Status" },
];

export default function BookTable({ books, startIndex, sort, onSort, onView, onEdit, onDelete }) {
  if (books.length === 0) {
    return (
      <div className="empty">
        <i className="bi bi-search"></i>
        <p className="mb-0">No books match your search. Try a different name, author or ISBN.</p>
      </div>
    );
  }
  return (
    <div className="table-responsive">
      <table className="table table-hover align-middle mb-0 book-table">
        <thead>
          <tr>
            <th>#</th>
            {COLS.map((c) => (
              <th key={c.key} role="button" onClick={() => onSort(c.key)} className="sortable">
                {c.label}
                <i className={`bi ms-1 ${sort.key === c.key ? (sort.dir === "asc" ? "bi-arrow-up" : "bi-arrow-down") : "bi-arrow-down-up faded"}`}></i>
              </th>
            ))}
            <th className="text-end">Actions</th>
          </tr>
        </thead>
        <tbody>
          {books.map((b, i) => (
            <tr key={b.id}>
              <td className="text-muted">{startIndex + i + 1}</td>
              <td>{b.bookId}</td>
              <td>
                <div className="fw-semibold">{b.name}</div>
                <div className="small text-muted">{b.author}</div>
              </td>
              <td>{b.category}</td>
              <td>₹{b.price.toLocaleString("en-IN")}</td>
              <td>{b.quantity}</td>
              <td>
                <span className={`badge rounded-pill ${b.status === "Available" ? "badge-available" : "badge-issued"}`}>{b.status}</span>
              </td>
              <td className="text-end text-nowrap">
                <button className="btn btn-sm btn-outline-secondary me-1" title="View" onClick={() => onView(b)}><i className="bi bi-eye"></i></button>
                <button className="btn btn-sm btn-outline-primary me-1" title="Edit" onClick={() => onEdit(b)}><i className="bi bi-pencil"></i></button>
                <button className="btn btn-sm btn-outline-danger" title="Delete" onClick={() => onDelete(b)}><i className="bi bi-trash"></i></button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
