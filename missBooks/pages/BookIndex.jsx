const { useState, useEffect } = React;

import { bookService } from "../services/book.service.js";

export function BookIndex() {
  const [books, setBooks] = useState();

  useEffect(() => {
    loadBooks();
  }, []);

  function loadBooks() {
    bookService.query().then((books) => setBooks(books));
  }

  return (
    <section className="book-index">
      <pre>{JSON.stringify(books, null, 2)}</pre>
    </section>
  );
}
