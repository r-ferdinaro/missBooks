import { BookPreview } from "../pages/BookPreview.jsx";

export function BookList({ books }) {
  return (
    <ul className="book-list">
      {books && books.map((book) => <BookPreview key={book.id} book={book} />)}
    </ul>
  );
}
