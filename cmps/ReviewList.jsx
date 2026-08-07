import { AddReview } from "./AddReview.jsx";
import { ReviewPreview } from "./ReviewPreview.jsx";

export function ReviewList({ reviews, onAddReview, onRemoveReview }) {
  return (
    <section className="review-section">
      <h4>Reviews:</h4>
      <ul className="review-list">
        <li className="review-row review-row-header">
          <span>by</span>
          <span>rating</span>
          <span>date</span>
        </li>

        <li className="review-row-wrap">
          <AddReview onAddReview={onAddReview} />
        </li>

        {reviews &&
          reviews.map((review) => (
            <li key={review.id} className="review-row-wrap">
              <ReviewPreview review={review} onRemoveReview={onRemoveReview} />
            </li>
          ))}
      </ul>
    </section>
  );
}
