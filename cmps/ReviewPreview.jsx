export function ReviewPreview({ review, onRemoveReview }) {
  function renderStars(rating) {
    const stars = [];
    const emptyStars = 5 - rating;

    for (let i = 0; i < rating; i++) {
      stars.push(
        <i
          key={`full-${i}`}
          className="fa-solid fa-star fa-lg"
          style={{ color: "yellow" }}
        ></i>,
      );
    }

    for (let i = 0; i < emptyStars; i++) {
      stars.push(<i key={`empty-${i}`} className="fa-regular fa-star fa-lg"></i>);
    }

    return stars;
  }

  function getIsoDate(d) {
    return new Date(d).toISOString().split("T")[0];
  }

  const { id, fullName, rating, readAt } = review;

  return (
    <article className="review-preview review-row">
      <span>{fullName}</span>
      <span>{renderStars(rating)}</span>
      <span>{getIsoDate(readAt)}</span>

      <button onClick={() => onRemoveReview(id)} className="btn-remove">
        Delete
      </button>
    </article>
  );
}
