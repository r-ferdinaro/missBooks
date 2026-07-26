export function BookPreview({ book }) {
  return (
    <article>
      <h3>{book.title}</h3>
      <p>{book.description}</p>
      <p>
        Price: {book.listPrice.amount} {book.listPrice.currencyCode}
      </p>
    </article>
  );
}
