import { useEffect, useMemo, useReducer, useRef, useState } from "react";
import { bookReducer, initialState } from "./reducer/bookReducer";
import { SEED_BOOKS, STORAGE_KEY } from "./data/constants";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import SummaryCards from "./components/SummaryCards";
import BookForm from "./components/BookForm";
import BookTable from "./components/BookTable";
import Pagination from "./components/Pagination";
import BookModal from "./components/BookModal";
import Footer from "./components/Footer";

const SORT_OPTIONS = [
  ["name", "Book name"], ["author", "Author"], ["category", "Category"],
  ["price", "Price"], ["quantity", "Quantity"], ["status", "Status"], ["bookId", "Book ID"],
];

export default function App() {
  const [state, dispatch] = useReducer(bookReducer, initialState);
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState({ key: "name", dir: "asc" });
  const [perPage, setPerPage] = useState(5);
  const [page, setPage] = useState(1);
  const [editing, setEditing] = useState(null);
  const [modal, setModal] = useState({ mode: null, book: null });
  const searchRef = useRef(null); // uncontrolled input

  // Retrieve from Local Storage on first load
  useEffect(() => {
    let saved = null;
    try { saved = JSON.parse(localStorage.getItem(STORAGE_KEY)); } catch { saved = null; }
    dispatch({ type: "LOAD", payload: Array.isArray(saved) ? saved : SEED_BOOKS });
  }, []);

  // Save to Local Storage after every create / update / delete
  useEffect(() => {
    if (state.loaded) localStorage.setItem(STORAGE_KEY, JSON.stringify(state.books));
  }, [state]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const list = q
      ? state.books.filter((b) => [b.name, b.author, b.isbn, b.bookId, b.category, b.publisher, b.language].some((v) => String(v).toLowerCase().includes(q)))
      : [...state.books];
    list.sort((a, b) => {
      const x = a[sort.key], y = b[sort.key];
      const r = typeof x === "number" ? x - y : String(x).localeCompare(String(y));
      return sort.dir === "asc" ? r : -r;
    });
    return list;
  }, [state.books, query, sort]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));
  const current = Math.min(page, totalPages);
  const start = (current - 1) * perPage;
  const visible = filtered.slice(start, start + perPage);

  const toggleSort = (key) => {
    setSort((s) => ({ key, dir: s.key === key && s.dir === "asc" ? "desc" : "asc" }));
    setPage(1);
  };

  const saveBook = (data) => {
    dispatch({ type: editing ? "UPDATE" : "ADD", payload: editing ? { ...data, id: editing.id } : data });
    setEditing(null);
    document.getElementById("books")?.scrollIntoView({ behavior: "smooth" });
  };

  const startEdit = (book) => {
    setEditing(book);
    document.getElementById("add-book")?.scrollIntoView({ behavior: "smooth" });
  };

  const confirmDelete = () => {
    dispatch({ type: "DELETE", payload: modal.book.id });
    if (editing?.id === modal.book.id) setEditing(null);
    setModal({ mode: null, book: null });
  };

  return (
    <>
      <Navbar />
      <Hero total={state.books.length} />

      <main className="container pb-5">
        <SummaryCards books={state.books} />

        <section id="books" className="section">
          <h2 className="section-title">Book catalogue</h2>
          <div className="panel p-3 p-md-4">
            <div className="row g-2 mb-3">
              <div className="col-md-5">
                <div className="input-group">
                  <span className="input-group-text"><i className="bi bi-search"></i></span>
                  <input ref={searchRef} className="form-control" placeholder="Search by name, author, ISBN, category..."
                    onChange={() => { setQuery(searchRef.current.value); setPage(1); }} />
                </div>
              </div>
              <div className="col-6 col-md-3">
                <select className="form-select" value={sort.key} onChange={(e) => { setSort({ key: e.target.value, dir: "asc" }); setPage(1); }} aria-label="Sort by">
                  {SORT_OPTIONS.map(([k, l]) => <option key={k} value={k}>Sort: {l}</option>)}
                </select>
              </div>
              <div className="col-3 col-md-2">
                <button className="btn btn-outline-secondary w-100" onClick={() => setSort((s) => ({ ...s, dir: s.dir === "asc" ? "desc" : "asc" }))}>
                  <i className={`bi ${sort.dir === "asc" ? "bi-sort-alpha-down" : "bi-sort-alpha-up"} me-1`}></i>{sort.dir === "asc" ? "A-Z" : "Z-A"}
                </button>
              </div>
              <div className="col-3 col-md-2">
                <select className="form-select" value={perPage} onChange={(e) => { setPerPage(Number(e.target.value)); setPage(1); }} aria-label="Rows per page">
                  {[5, 10, 15].map((n) => <option key={n} value={n}>{n} / page</option>)}
                </select>
              </div>
            </div>

            <BookTable books={visible} startIndex={start} sort={sort} onSort={toggleSort}
              onView={(b) => setModal({ mode: "view", book: b })} onEdit={startEdit}
              onDelete={(b) => setModal({ mode: "delete", book: b })} />

            <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-2 mt-3">
              <span className="small text-muted">
                {filtered.length === 0 ? "0 books" : `Showing ${start + 1}-${start + visible.length} of ${filtered.length} books`}
              </span>
              <Pagination page={current} totalPages={totalPages} onChange={setPage} />
            </div>
          </div>
        </section>

        <section id="add-book" className="section">
          <h2 className="section-title">{editing ? `Edit: ${editing.name}` : "Add a new book"}</h2>
          <BookForm books={state.books} editing={editing} onSubmit={saveBook} onCancel={() => setEditing(null)} />
        </section>
      </main>

      <Footer />
      <BookModal mode={modal.mode} book={modal.book} onClose={() => setModal({ mode: null, book: null })} onConfirmDelete={confirmDelete} />
    </>
  );
}
