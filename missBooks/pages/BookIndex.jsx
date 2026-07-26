const { useState, useEffect } = React;

import { bookService } from "../services/book.service.js";
import { BookList } from "../cmps/BookList.jsx";

export function BookIndex() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    loadBooks();
  }, []);

  function loadBooks() {
    bookService.query().then((books) => setBooks(books));
  }

  function onRemoveBook(bookId) {
    bookService
      .remove(bookId)
      .then(setBooks((prev) => prev.filter((book) => book.id !== bookId)));
  }

  return (
    <section className="book-index">
      <BookList books={books} onRemoveBook={onRemoveBook} />
    </section>
  );
}
