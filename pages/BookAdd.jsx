import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js";
import { googleBookService } from "../services/googleBook-service.js";
import { utilService } from "../services/util.service.js";

const { useNavigate } = ReactRouter;
const { useEffect, useState, useRef } = React;

export function BookAdd() {
  const navigate = useNavigate();
  const [searchVal, setSearchVal] = useState("");
  const [searchResults, setSearchResults] = useState(
    googleBookService.getStoredBooks,
  );
  const debouncedQuery = useRef(
    utilService.debounce(googleBookService.query, 1000),
  ).current;

  function handleChange({ target }) {
    const { value } = target;

    setSearchVal(value);

    debouncedQuery(value, setSearchResults, (err) => {
      console.log("err", err);
      showErrorMsg("Failed to get books from Google API");
      setSearchVal("");
    });
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
        {searchResults &&
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
