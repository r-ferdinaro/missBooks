import { bookService } from "../services/book.service.js";
import { StarRating } from "./StarRating.jsx";

const { useState } = React;

export function AddReview({ onAddReview }) {
  const [reviewToEdit, setReviewToEdit] = useState(
    bookService.getEmptyReview(),
  );

  function handleChange({ target }) {
    let { type, name, value } = target;

    setReviewToEdit((prev) => ({
      ...prev,
      [name]: (value = type === "number" ? +value : value),
    }));
  }

  function onSaveReview(ev) {
    ev.preventDefault();
    onAddReview(reviewToEdit).then(() => {
      setReviewToEdit(bookService.getEmptyReview());
    });
  }

  const { fullName, readAt, rating } = reviewToEdit;

  return (
    <form className="add-review review-row" onSubmit={onSaveReview}>
      <input
        type="text"
        onChange={handleChange}
        value={fullName}
        name="fullName"
        placeholder="Full name"
        required
      />

      <StarRating rating={rating} handleChange={handleChange} />

      <input
        type="date"
        onChange={handleChange}
        value={new Date(readAt).toISOString().split("T")[0]}
        name="readAt"
      />

      <button className="btn-details">Save</button>
    </form>
  );
}
