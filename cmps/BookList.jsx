const { Link } = ReactRouterDOM;
import { BookPreview } from "./BookPreview.jsx";
import { Loader } from "./Loader.jsx";

export function BookList({ books, onRemoveBook }) {
  return (
    <section className="book-list">
      {!books && <Loader />}
      {books &&
        books.map((book) => (
          <div key={book.id} className="book-item">
            <BookPreview book={book} />
            <div className="book-actions">
              <Link to={`/books/${book.id}`}>
                <button className="btn-details">Details</button>
              </Link>
              <button
                className="btn-remove"
                onClick={() => onRemoveBook(book.id)}
              >
                Remove
              </button>
            </div>
          </div>
        ))}
    </section>
  );
}
