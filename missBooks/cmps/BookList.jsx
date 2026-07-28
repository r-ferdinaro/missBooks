import { BookPreview } from "./BookPreview.jsx";

export function BookList({ books, onRemoveBook, onSetSelectedBook }) {
  return (
    <section className="book-list">
      {books &&
        books.map((book) => (
          <div key={book.id} className="book-item">
            <BookPreview book={book} />
            <button onClick={() => onRemoveBook(book.id)}>Remove</button>
            <button onClick={() => onSetSelectedBook(book)}>Details</button>
          </div>
        ))}
    </section>
  );
}
