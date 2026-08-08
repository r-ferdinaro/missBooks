const { useEffect, useState } = React;

export function BookFilter({ filterBy, setFilterBy, books }) {
  const [filterByToEdit, setFilterByToEdit] = useState(filterBy);
  const { amount, category, language, pageCount, publishedDate, text } =
    filterByToEdit;

  useEffect(() => {
    setFilterBy(filterByToEdit);
  }, [filterByToEdit]);

  function changeFilter({ target }) {
    const { type, value, name } = target;

    setFilterByToEdit((prev) => ({
      ...prev,
      [name]: type === "number" ? +value : value,
    }));
  }

  function getLanguageOptions() {
    const languages = [...new Set(books.map((book) => book.language))];
    return [
      <option key="all-languages" value="">
        All languages
      </option>,
      ...languages.map((language) => (
        <option key={language} value={language}>
          {language.toUpperCase()}
        </option>
      )),
    ];
  }

  function getCategoryOptions() {
    const categories = [...new Set(books.flatMap((book) => book.categories))];
    return [
      <option key="all-categories" value="">
        All categories
      </option>,
      ...categories.map((category) => (
        <option key={category} value={category}>
          {category}
        </option>
      )),
    ];
  }

  return (
    <section className="filter-by-container">
      <fieldset>
        <legend>Filtering options</legend>
        <label className="filter-field">
          <span>Text</span>
          <input
            type="text"
            name="text"
            onChange={changeFilter}
            value={text || ""}
            placeholder="Text filter"
            className="text-filter"
          />
        </label>
        <label className="filter-field">
          <span>Price</span>
          <input
            type="number"
            name="amount"
            onChange={changeFilter}
            value={amount || ""}
            placeholder="Price filter"
            className="number-filter"
          />
        </label>
        <label className="filter-field">
          <span>Published date</span>
          <input
            type="number"
            name="publishedDate"
            onChange={changeFilter}
            value={publishedDate || ""}
            placeholder="Published date"
            className="number-filter"
          />
        </label>
        <label className="filter-field">
          <span>Page count</span>
          <input
            type="number"
            name="pageCount"
            onChange={changeFilter}
            value={pageCount || ""}
            placeholder="Page count"
            className="number-filter"
          />
        </label>
        <label className="filter-field">
          <span>Language</span>
          <select
            name="language"
            onChange={changeFilter}
            className="select-filter"
          >
            {getLanguageOptions()}
          </select>
        </label>
        <label className="filter-field">
          <span>Category</span>
          <select
            name="category"
            onChange={changeFilter}
            className="select-filter"
          >
            {getCategoryOptions()}
          </select>
        </label>
      </fieldset>
    </section>
  );
}
