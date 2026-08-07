const { Link } = ReactRouterDOM;
import { BookPreview } from "./BookPreview.jsx";
import { Loader } from "./Loader.jsx";

export function BookList({ books, onRemoveBook }) {
  return (
    <section className="book-list">
      {!books && <Loader />}
      {books && (
        <React.Fragment>
          <div className="book-item add">
            <Link to="/books/edit">
              <button className="btn-details">Add book manually</button>
            </Link>
            <Link to="/books/add">
              <button className="btn-details">Search & Add book</button>
            </Link>
          </div>
          {books.map((book) => (
            <div key={book.id} className="book-item">
              <BookPreview book={book} />
              <div className="book-actions">
                <button
                  className="btn-remove"
                  onClick={() => onRemoveBook(book.id)}
                >
                  Remove
                </button>
                <Link to={`/books/${book.id}`}>
                  <button className="btn-details">Details</button>
                </Link>
              </div>
            </div>
          ))}
        </React.Fragment>
      )}
    </section>
  );
}
