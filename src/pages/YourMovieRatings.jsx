import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function YourMovieRatings() {
  const [ratings, setRatings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch user ratings when the component is mounted
    const fetchUserRatings = async () => {
      const token = localStorage.getItem("token"); // Get the token from localStorage
      try {
        const response = await axios.get(
          "https://movie-explorer-backend-hubs.onrender.com/api/users/ratings",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setRatings(response.data);
      } catch (error) {
        if (error.response && error.response.status === 401) {
          console.error("Unauthorized! Token might be invalid or expired.");
          setError("Unauthorized! Please log in again.");
        } else {
          console.error("Error fetching user ratings:", error);
          setError("Something went wrong. Please try again later.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUserRatings();
  }, []);

  return (
    <div className="p-8 font-mono min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
        Your Movie Ratings
      </h1>

      {loading ? (
        <div className="flex justify-center items-center h-full">
          <div className="loader border-t-4 border-blue-500 rounded-full w-12 h-12 animate-spin"></div>
        </div>
      ) : error ? (
        <div className="text-center text-red-500 text-lg">{error}</div>
      ) : ratings.length === 0 ? (
        <div className="text-xl text-gray-500 text-center">
          You haven&apos;t rated any movies yet.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {ratings.map((rating) => (
            <div
              key={rating.movieId}
              className="bg-white p-4 rounded shadow-md hover:shadow-lg transition duration-300"
            >
              <h2 className="font-bold text-lg text-gray-700">
                Movie ID: {rating.movieId}
              </h2>
              <p className="text-gray-600 mt-2">
                <span className="font-semibold">Your Rating:</span>{" "}
                <span className="text-blue-500 font-bold">{rating.rating}</span>
              </p>
            </div>
          ))}
        </div>
      )}

      <div className="flex justify-center mt-8">
        <Link to="/dashboard">
          <button className="btn btn-outline btn-info w-60">
            Return to Dashboard
          </button>
        </Link>
      </div>
    </div>
  );
}

export default YourMovieRatings;
