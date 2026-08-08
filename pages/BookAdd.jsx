import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js";
import { googleBookService } from "../services/googleBook-service.js";
import { utilService } from "../services/util.service.js";
import { Loader } from "../cmps/Loader.jsx";

const { useEffect, useState, useRef } = React;
const { useNavigate } = ReactRouter;
const { useSearchParams } = ReactRouterDOM;

// Should use query params in this page and in BookAdd - filter/google search values.
// Filtering should be a two binding connection - i.e navigation must change the relevant state to trigger the needed filter/api call
// Any changes to filtering/search should also update the URL's Query Params

export function BookAdd() {
  const navigate = useNavigate();

  const [searchParams, setSearchParams] = useSearchParams();
  const urlTxt = searchParams.get("txt") || "";
  const isStale = googleBookService.isSearchStale(urlTxt);

  const [searchVal, setSearchVal] = useState(
    urlTxt || (isStale ? "" : googleBookService.getStoredSearchTxt()),
  );
  const [searchResults, setSearchResults] = useState(
    isStale ? [] : googleBookService.getStoredBooks,
  );
  const [isLoading, setIsLoading] = useState(false);

  const debouncedQuery = useRef(
    utilService.debounce(googleBookService.query, 1000),
  ).current;

  useEffect(() => {
    if (isStale) googleBookService.clearStaleSearch(urlTxt);
    else googleBookService.touchStoredSearch();
  }, []);

  useEffect(() => {
    setSearchParams(searchVal ? { txt: searchVal } : {});

    if (!searchVal) {
      setSearchResults([]);
      return;
    }

    setIsLoading(true);
    debouncedQuery(
      searchVal,
      (books) => {
        setSearchResults(books);
        setIsLoading(false);
      },
      (err) => {
        console.log("err", err);
        showErrorMsg("Failed to get books from Google API");
        setSearchVal("");
        setIsLoading(false);
      },
    );
  }, [searchVal]);

  function handleChange({ target }) {
    setSearchVal(target.value);
  }

  function onSaveBook(googBookId) {
    googleBookService
      .save(googBookId)
      .then((bookId) => {
        showSuccessMsg("Book added successfully");
        navigate(`/books/${bookId}`);
      })
      .catch((err) => {
        console.log("err", err);
        showErrorMsg(`Failed to add book ${googBookId}`);
      });
  }

  return (
    <div className="book-add">
      <section className="book-add-search">
        <input
          type="text"
          name="book-search"
          placeholder="Book name"
          onChange={handleChange}
          value={searchVal || ""}
        />
      </section>

      <section className="book-add-results">
        {isLoading && <Loader />}

        {!isLoading &&
          searchResults &&
          searchResults.map((googleBook) => (
            <div key={googleBook.id} className="book-add-item">
              <span>{googleBook.title}</span>
              <button
                className="btn-details"
                onClick={() => {
                  onSaveBook(googleBook.id);
                }}
              >
                Add
              </button>
            </div>
          ))}
      </section>
    </div>
  );
}
