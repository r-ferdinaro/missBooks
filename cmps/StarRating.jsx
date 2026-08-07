const { useState } = React;

export function StarRating({ rating, handleChange }) {
  const [hover, setHover] = useState(0);

  return (
    <div className="start-rating">
      {[
        ...Array.from({ length: 5 }, (_, idx) => {
          const starValue = idx + 1;
          const isOn = starValue <= (hover || rating);

          return (
            <button
              type="button"
              key={idx}
              className={isOn ? "on" : "off"}
              onClick={() => {
                handleChange({
                  target: {
                    name: "rating",
                    value: starValue,
                    type: "number",
                  },
                });
              }}
              onMouseEnter={() => setHover(starValue)}
              onMouseLeave={() => setHover(rating)}
            >
              <span className="star">
                <i className="fa-regular fa-star fa-lg star-off"></i>
                <i className="fa-solid fa-star fa-lg star-on"></i>
              </span>
            </button>
          );
        }),
      ]}
    </div>
  );
}
