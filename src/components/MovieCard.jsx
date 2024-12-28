import PropTypes from "prop-types";
import { useState, useEffect } from "react";

const MovieCard = ({ imageUrl, title, movieId, onRate }) => {
  const [rating, setRating] = useState(0); // State for storing the rating
  const [isRated, setIsRated] = useState(false); // State to check if a rating is saved

  // Check if the movie has been rated on initial render
  useEffect(() => {
    const savedRating = localStorage.getItem(`rating-${title}`);
    if (savedRating) {
      setRating(Number(savedRating)); // Set the rating from localStorage
      setIsRated(true); // Mark the movie as rated
    }
  }, [title]);

  const handleRating = (rate) => {
    setRating(rate);
    setIsRated(true);
    localStorage.setItem(`rating-${title}`, rate); // Save the rating to localStorage
    onRate(title, rate, movieId); // Pass the rating and movieId to the parent for processing
  };

  return (
    <div className="card bg-white w-60 h-43 shadow-xl font-mono mr-14">
      <figure>
        <img src={imageUrl} alt={title} className="w-full h-40 object-cover" />
      </figure>
      <div className="card-body p-3">
        <h2 className="card-title text-black">{title}</h2>
        <div className="card-actions flex justify-end flex-end">
          {!isRated ? (
            <button
              className="btn btn-primary text-black"
              onClick={() => handleRating(rating)}
            >
              Rate this movie
            </button>
          ) : (
            <div className="flex space-x-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  className={`${
                    star <= rating ? "text-yellow-500" : "text-gray-300"
                  }`}
                  onClick={() => handleRating(star)}
                >
                  ★
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

MovieCard.propTypes = {
  imageUrl: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  movieId: PropTypes.number.isRequired, // Add movieId prop
  onRate: PropTypes.func.isRequired,
};

export default MovieCard;
