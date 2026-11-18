export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-md navbar-dark site-nav sticky-top">
      <div className="container">
        <a className="navbar-brand brand" href="#home">
          <i className="bi bi-book-half me-2"></i>Andrews
        </a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#nav" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="nav">
          <ul className="navbar-nav ms-auto gap-md-2">
            <li className="nav-item"><a className="nav-link" href="#home">Home</a></li>
            <li className="nav-item"><a className="nav-link" href="#books">Books</a></li>
            <li className="nav-item"><a className="nav-link" href="#add-book">Add book</a></li>
            <li className="nav-item"><a className="nav-link" href="#contact">Contact</a></li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
