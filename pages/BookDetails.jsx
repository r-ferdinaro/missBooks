const { useParams } = ReactRouter;
const { useState, useEffect } = React;
const { Link } = ReactRouterDOM;

import { bookService } from "../services/book.service.js";
import { Loader } from "../cmps/Loader.jsx";

export function BookDetails() {
  const [book, setBook] = useState();
  const { id: bookId } = useParams();

  useEffect(() => {
    bookService
      .get(bookId)
      .then(setBook)
      .catch((err) => console.log(err));
  }, []);

  function bookDifficulty(pageCount) {
    if (pageCount < 100) return "Light";
    else if (pageCount >= 500) return "Serious";
    else return "Descent";
  }

  function isVintage(publishedDate) {
    const currYear = new Date().getFullYear();
    const diff = currYear - publishedDate;

    if (diff >= 10) return "Vintage";
    else return "New";
  }

  function getCurrency(currencyCode) {
    if (currencyCode === "EUR") return "€";
    else if (currencyCode === "USD") return "€";
    else if (currencyCode === "ILS") return "₪";
    else return "";
  }

  function getPriceColor(amount) {
    if (amount < 20) return "cheap";
    else if (amount > 150) return "expensive";
    else return "";
  }

  if (!book) return <Loader />;
  return (
    <div>
      <div className="book-details">
        <section className="book-details-image">
          <img src={book.thumbnail} alt="book thumbnail" />
        </section>

        <section className="book-details-data">
          <div className="main-info">
            <h2 className="title">{book.title}</h2>
            <h3 className="subtitle">{book.subtitle}</h3>
            <span className="author">{book.authors[0]}</span>
          </div>
          <div className="book-details-info">
            <span className="publish-date">{`${book.publishedDate} - ${isVintage(book.publishedDate)}`}</span>
            <span className="page-count">{`${book.pageCount} - ${bookDifficulty(book.pageCount)} reading`}</span>
            <span className="categories">{book.categories.join(", ")}</span>
            <span>{book.language}</span>
            <p>
              Price:
              <span className={getPriceColor(book.listPrice.amount)}>
                {`${book.listPrice.amount} ${getCurrency(book.listPrice.currencyCode)}`}
              </span>
            </p>
            {book.listPrice.isOnSale && <p className="on-sale">On Sale</p>}
          </div>
          <div className="description">
            <h4>Description</h4>
            <p>{book.description}</p>
          </div>
          <div className="options">
            <Link to="/books">
              <button>Back</button>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
