export function BookPreview({ book }) {
  const { description, listPrice, title } = book;
  return (
    <div>
      <img src={book.thumbnail} alt="book thumbnail" />
      <p>{book.title}</p>
      <p>
        {book.listPrice.amount} {book.listPrice.currencyCode || ""}
      </p>
    </div>
  );
}
