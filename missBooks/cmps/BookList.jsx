import { BookPreview } from "./BookPreview.jsx";

export function BookList({ books, onRemoveBook }) {
  return (
    <ul className="book-list">
      {books &&
        books.map((book) => (
          <li key={book.id}>
            <BookPreview book={book} />
            <button onClick={() => onRemoveBook(book.id)}>Remove</button>
          </li>
        ))}
    </ul>
  );
}
