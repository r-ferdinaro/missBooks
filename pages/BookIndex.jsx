const { useState, useEffect } = React;

import { bookService } from "../services/book.service.js";
import { BookFilter } from "../cmps/BookFilter.jsx";
import { BookDetails } from "./BookDetails.jsx";
import { BookList } from "../cmps/BookList.jsx";

export function BookIndex() {
  const [books, setBooks] = useState(null);
  const [allBooks, setAllBooks] = useState([]);
  const [filterBy, setFilterBy] = useState(bookService.getDefaultFilter());
  const [selectedBook, setSelectedBook] = useState(null);

  useEffect(() => {
    loadBooks();
  }, [filterBy]);

  useEffect(() => {
    bookService.query().then((allBooks) => setAllBooks(allBooks));
  }, []);

  function loadBooks() {
    bookService.query(filterBy).then((books) => setBooks(books));
  }

  function onRemoveBook(bookId) {
    bookService
      .remove(bookId)
      .then(setBooks((prev) => prev.filter((book) => book.id !== bookId)));
  }

  return (
    <section className="book-index">
      <BookFilter
        filterBy={filterBy}
        setFilterBy={setFilterBy}
        books={allBooks}
      />

      <BookList books={books} onRemoveBook={onRemoveBook} />
    </section>
  );
}
