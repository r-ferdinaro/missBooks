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
      <option key="" value="">
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
      <option key="" value="">
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
        <input
          type="text"
          name="text"
          onChange={changeFilter}
          value={text}
          placeholder="Text filter"
          className="text-filter"
        />
        <input
          type="number"
          name="amount"
          onChange={changeFilter}
          value={amount || ""}
          placeholder="Price filter"
          className="number-filter"
        />
        <input
          type="number"
          name="publishedDate"
          onChange={changeFilter}
          value={publishedDate || ""}
          placeholder="published date"
          className="number-filter"
        />
        <input
          type="number"
          name="pageCount"
          onChange={changeFilter}
          value={pageCount || ""}
          placeholder="Page count"
          className="number-filter"
        />
        <select
          name="language"
          onChange={changeFilter}
          className="select-filter"
        >
          {getLanguageOptions()}
        </select>
        <select
          name="category"
          onChange={changeFilter}
          className="select-filter"
        >
          {getCategoryOptions()}
        </select>
      </fieldset>
    </section>
  );
}
