export default function Footer() {
  return (
    <footer id="contact" className="site-footer">
      <div className="container py-5">
        <div className="row g-4">
          <div className="col-md-5">
            <div className="brand mb-2"><i className="bi bi-book-half me-2"></i>Andrews Library</div>
            <p className="mb-0 footer-text">A simple catalogue for managing books, from new arrivals to issued copies.</p>
          </div>
          <div className="col-6 col-md-3">
            <h6>Quick links</h6>
            <ul className="list-unstyled mb-0">
              <li><a href="#home">Home</a></li>
              <li><a href="#books">Books</a></li>
              <li><a href="#add-book">Add book</a></li>
            </ul>
          </div>
          <div className="col-6 col-md-4">
            <h6>Visit us</h6>
            <ul className="list-unstyled mb-0 footer-text">
              <li><i className="bi bi-geo-alt me-2"></i>12 Reading Road, Ahmedabad</li>
              <li><i className="bi bi-envelope me-2"></i>hello@lumenlibrary.example</li>
              <li><i className="bi bi-clock me-2"></i>Mon-Sat, 9 am to 7 pm</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="footer-bottom">© {new Date().getFullYear()} Andrews Library. Built with React and Bootstrap.</div>
    </footer>
  );
}
