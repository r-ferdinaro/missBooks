const { useState, useEffect } = React;
const { useSearchParams } = ReactRouterDOM;

import { bookService } from "../services/book.service.js";
import { BookFilter } from "../cmps/BookFilter.jsx";
import { BookDetails } from "./BookDetails.jsx";
import { BookList } from "../cmps/BookList.jsx";
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js";

export function BookIndex() {
  const [books, setBooks] = useState(null);
  const [allBooks, setAllBooks] = useState([]);

  const [searchParams, setSearchParams] = useSearchParams();
  const [filterBy, setFilterBy] = useState(
    bookService.getFilterFromSearchParams(searchParams),
  );
  const [selectedBook, setSelectedBook] = useState(null);

  useEffect(() => {
    const params = Object.fromEntries(
      Object.entries(filterBy).filter(
        ([_, value]) => ![null, "", 0].includes(value),
      ),
    );

    setSearchParams(params);
    loadBooks();
  }, [filterBy]);

  useEffect(() => {
    bookService
      .query()
      .then((allBooks) => setAllBooks(allBooks))
      .catch((err) => {
        showErrorMsg(`Error getting books`);
        console.log(err);
      });
  }, []);

  function loadBooks() {
    bookService
      .query(filterBy)
      .then((books) => setBooks(books))
      .catch((err) => {
        showErrorMsg(`Error loading books`);
        console.log(err);
      });
  }

  function onRemoveBook(bookId) {
    bookService
      .remove(bookId)
      .then(() => {
        setBooks((prev) => prev.filter((book) => book.id !== bookId));
        showSuccessMsg(`Book removed - ${bookId}`);
      })
      .catch((err) => {
        showErrorMsg(`Error upon removing book ${bookId}`);
        console.log(err);
      });
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
