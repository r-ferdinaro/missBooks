const { useState, useEffect } = React;

import { bookService } from "../services/book.service.js";

export function BookIndex() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    loadBooks();
  }, []);

  function loadBooks() {
    bookService.query().then((books) => setBooks(books));
  }

  return (
    <section className="book-index">
      <ul className="book-list">
        {books &&
          books.map((book) => (
            <li key={book.id}>
              <h3>{book.title}</h3>
              <p>{book.description}</p>
              <p>
                Price: {book.listPrice.amount} {book.listPrice.currencyCode}
              </p>
            </li>
          ))}
      </ul>
    </section>
  );
}
