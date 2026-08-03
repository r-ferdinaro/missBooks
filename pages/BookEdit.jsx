const { useRef, useState } = React;
const { useNavigate } = ReactRouter;

import { Loader } from "../cmps/Loader.jsx";
import { bookService } from "../services/book.service.js";

const currYear = new Date().getFullYear();

export function BookEdit() {
  const [book, setBook] = useState(bookService.getEmptyBook());
  const navigate = useNavigate();

  function handleChange({ target }) {
    let { value, type, name, checked } = target;

    if (type === "checkbox") value = checked;
    else if (type === "number") value = +value;

    setBook((prev) => {
      if (!name.includes(".")) {
        if (Array.isArray(prev[name])) value = [value];
        return { ...prev, [name]: value };
      }

      const [parent, child] = name.split(".");
      return { ...prev, [parent]: { ...prev[parent], [child]: value } };
    });
  }

  function onSaveBook(ev) {
    ev.preventDefault();
    bookService
      .save(book)
      .then(() => navigate("/books"))
      .catch((err) => console.log(err));
  }

  if (!book) return <Loader />;
  return (
    <section className="book-edit-container">
      <form onSubmit={onSaveBook} className="book-edit">
        <fieldset>
          <legend>{book._id ? "Edit book" : "Add book"}</legend>

          <label className="book-edit-field">
            <span>Title</span>
            <input
              value={book.title}
              onChange={handleChange}
              name="title"
              type="text"
              placeholder="Title"
              required
            />
          </label>

          <label className="book-edit-field">
            <span>Authors</span>
            <input
              value={book.authors.join(", ")}
              onChange={handleChange}
              name="authors"
              type="text"
              placeholder="Authors"
              required
            />
          </label>

          <label className="book-edit-field">
            <span>Categories</span>
            <select
              name="categories"
              value={book.categories[0] || "Love"}
              onChange={handleChange}
              required
            >
              <option value="love">Love</option>
              <option value="fiction">Fiction</option>
              <option value="poetry">Poetry</option>
              <option value="computers">Computers</option>
              <option value="religion">Religion</option>
            </select>
          </label>

          <label className="book-edit-field">
            <span>Description</span>
            <input
              value={book.description}
              onChange={handleChange}
              name="description"
              type="text"
              placeholder="Description"
              required
            />
          </label>

          <label className="book-edit-field">
            <span>Language</span>
            <select
              name="language"
              value={book.language || "il"}
              onChange={handleChange}
              required
            >
              <option value="il">Hebrew</option>
              <option value="en">English</option>
              <option value="es">Spanish</option>
            </select>
          </label>

          <label className="book-edit-field">
            <span>Price</span>
            <input
              value={book.listPrice.amount || ""}
              onChange={handleChange}
              name="listPrice.amount"
              type="number"
              placeholder="Price"
              min="0"
              max="1000"
              required
            />
          </label>

          <label className="book-edit-field">
            <span>Currency code</span>
            <select
              name="listPrice.currencyCode"
              value={book.listPrice.currencyCode}
              onChange={handleChange}
              required
            >
              <option value="ILS">Shekel</option>
              <option value="USD">Dollar</option>
              <option value="EUR">Euro</option>
            </select>
          </label>

          <label className="book-edit-field">
            <span>Page Count</span>
            <input
              value={book.pageCount}
              onChange={handleChange}
              name="pageCount"
              type="number"
              placeholder="Page Count"
              min="0"
              max="1000"
              required
            />
          </label>

          <label className="book-edit-field">
            <span>Published date</span>
            <input
              value={book.publishedDate}
              onChange={handleChange}
              name="publishedDate"
              type="number"
              placeholder="Published date"
              min="1000"
              max={currYear}
              required
            />
          </label>

          <label className="book-edit-field">
            <span>Subtitle</span>
            <input
              value={book.subtitle}
              onChange={handleChange}
              name="subtitle"
              type="text"
              placeholder="Subtitle"
              required
            />
          </label>

          <label className="book-edit-field checkbox-field">
            <span>Is on sale</span>
            <input
              type="checkbox"
              name="listPrice.isOnSale"
              checked={book.listPrice.isOnSale}
              onChange={handleChange}
            />
          </label>
        </fieldset>

        <button>Save</button>
      </form>
    </section>
  );
}
