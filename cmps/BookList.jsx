import { BookPreview } from "./BookPreview.jsx";

export function BookList({ books, onRemoveBook, onSetSelectedBook }) {
  return (
    <section className="book-list">
      {books &&
        books.map((book) => (
          <div key={book.id} className="book-item">
            <BookPreview book={book} />
            <div className="book-actions">
              <button
                className="btn-details"
                onClick={() => onSetSelectedBook(book)}
              >
                Details
              </button>
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
