import shelfImg from "../assets/img/hero-bookshelf.svg";
const spines = [
  [150, "#b8860b"], [190, "#e8e2d0"], [130, "#2f6f5e"], [175, "#8c2f39"], [160, "#e8e2d0"],
  [200, "#b8860b"], [140, "#3a5a78"], [185, "#2f6f5e"], [155, "#e8e2d0"], [170, "#8c2f39"],
];

export default function Hero({ total }) {
  return (
    <header id="home" className="hero">
      <div className="container">
        <div className="row align-items-center g-5">
          <div className="col-lg-7">
            <h1 className="hero-title">Every book in the building, found in seconds.</h1>
            <p className="hero-lead">
              Andrews Library keeps a living catalogue of {total} titles. Add new arrivals, track what is issued, and find any book by name, author, ISBN or category.
            </p>
            <div className="d-flex flex-wrap gap-2">
              <a href="#books" className="btn btn-brass btn-lg">Browse books</a>
              <a href="#add-book" className="btn btn-outline-light btn-lg">Add a book</a>
            </div>
          </div>
          <div className="col-lg-5 d-none d-md-block" aria-hidden="true">
            <img src={shelfImg} alt="Bookshelf illustration" className="img-fluid" />
          </div>
        </div>
      </div>
    </header>
  );
}
