const { useParams } = ReactRouter;
const { useState, useEffect } = React;
const { Link } = ReactRouterDOM;

import { bookService } from "../services/book.service.js";
import { Loader } from "../cmps/Loader.jsx";
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js";
import { ReviewList } from "../cmps/ReviewList.jsx";

export function BookDetails() {
  const [book, setBook] = useState();
  const { id: bookId } = useParams();

  useEffect(() => {
    bookService
      .get(bookId)
      .then(setBook)
      .catch((err) => {
        showErrorMsg(`Error upon loading book ${bookId}`);
        console.log(err);
      });
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

  function getLanguage(language) {
    switch (language) {
      case "il":
        return "Hebrew";
      case "en":
        return "English";
      case "es":
        return "Spanish";
    }
  }

  function getPriceColor(amount) {
    if (amount < 20) return "cheap";
    else if (amount > 150) return "expensive";
    else return "";
  }

  function onAddReview(review) {
    return bookService
      .addReview(bookId, review)
      .then((updatedBook) => {
        setBook(updatedBook);
        showSuccessMsg("Review saved successfully");
      })
      .catch((err) => {
        console.log("err", err);
        showErrorMsg("Failed to save review");
      });
  }

  function onRemoveReview(reviewId) {
    bookService
      .removeReview(bookId, reviewId)
      .then(() => {
        setBook((prev) => ({
          ...prev,
          reviews: prev.reviews.filter((review) => review.id !== reviewId),
        }));
        showSuccessMsg("Review removed successfully");
      })
      .catch((err) => {
        console.log("err", err);
        showErrorMsg("Failed removing review");
      });
  }

  if (!book) return <Loader />;
  return (
    <div className="book-area">
      <div className="book-details">
        <section className="book-details-image">
          <img
            src={book.thumbnail}
            alt="book thumbnail"
            onError={({ target }) => (target.src = "../assets/img/sample.jpg")}
          />
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
            <span>{getLanguage(book.language)}</span>
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
        </section>
      </div>
      <div className="book-page-options">
        <div className="options">
          <Link to="/books">
            <button className="btn-details">Back</button>
          </Link>
          <Link to={`/books/edit/${book.id}`}>
            <button className="btn-remove">Edit</button>
          </Link>
        </div>
        <ReviewList
          reviews={book.reviews}
          onAddReview={onAddReview}
          onRemoveReview={onRemoveReview}
        />
      </div>
    </div>
  );
}
