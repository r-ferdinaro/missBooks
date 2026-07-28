const { useEffect, useRef } = React;

export function BookDetails({ selectedBook, onCloseDetails }) {
  const elDialog = useRef();

  useEffect(() => {
    if (selectedBook) elDialog.current.showModal();
    else elDialog.current.close();
  }, [selectedBook]);

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

  return (
    <dialog onClose={onCloseDetails} ref={elDialog} closedby="any">
      {selectedBook && (
        <div className="book-details">
          <section className="book-details-image">
            <img src={selectedBook.thumbnail} alt="book thumbnail" />
          </section>

          <section className="book-details-data">
            <div className="main-info">
              <h2 className="title">{selectedBook.title}</h2>
              <h3 className="subtitle">{selectedBook.subtitle}</h3>
              <span className="author">{selectedBook.authors[0]}</span>
            </div>

            <div className="book-details-info">
              <span className="publish-date">{`${selectedBook.publishedDate} - ${isVintage(selectedBook.publishedDate)}`}</span>
              <span className="page-count">{`${selectedBook.pageCount} - ${bookDifficulty(selectedBook.pageCount)} reading`}</span>
              <span className="categories">
                {selectedBook.categories.join(", ")}
              </span>
              <span>{selectedBook.language}</span>
              <p>
                Price:
                <span className={getPriceColor(selectedBook.listPrice.amount)}>
                  {`${selectedBook.listPrice.amount} ${getCurrency(selectedBook.listPrice.currencyCode)}`}
                </span>
              </p>
              {selectedBook.listPrice.isOnSale && <p>On Sale</p>}
            </div>

            <div>
              <p>Description</p>
              <p>{selectedBook.description}</p>
            </div>
          </section>
        </div>
      )}
    </dialog>
  );
}
