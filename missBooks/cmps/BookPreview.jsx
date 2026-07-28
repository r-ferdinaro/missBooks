export function BookPreview({ book }) {
  const { thumbnail, title, listPrice } = book;
  return (
    <article className="book-preview">
      <div className="book-preview-image">
        <img src={thumbnail} alt={title} />
      </div>
      <h3 className="book-preview-title">{title}</h3>
      <p className="book-preview-price">
        {listPrice.amount} {listPrice.currencyCode || ""}
      </p>
    </article>
  );
}
