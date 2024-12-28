import { useState, useEffect } from "react";
import DropdownButton from "../components/DropdownButton";
import Navbar from "../components/Navbar";
import MovieCard from "../components/MovieCard";

function Dashboard() {
  const apiKey = import.meta.env.VITE_TMDB_API_KEY;
  const [genres, setGenres] = useState([]);
  const [movies, setMovies] = useState([]); // To store all movies for the selected genre
  const [filteredMovies, setFilteredMovies] = useState([]); // To store filtered movies
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [sortOption, setSortOption] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [userRatings, setUserRatings] = useState({}); // To store the user's ratings
  const [sidebarOpen, setSidebarOpen] = useState(false); // To manage the sidebar visibility on mobile

  // Fetch genres from TMDB API
  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/genre/movie/list?api_key=e919ae2d2eaddaf94f19c2fc1d61852e&language=en-US`
        );
        const data = await response.json();
        setGenres(data.genres); // Set genres to state
      } catch (error) {
        console.error("Error fetching genres:", error);
      }
    };
    fetchGenres();
  }, [apiKey]);

  // Fetch movies for a selected genre
  const fetchMovies = async (genreId) => {
    try {
      const token = localStorage.getItem("token"); // Retrieve the token from localStorage
      if (!token) {
        console.error("Token is missing! User may not be authenticated.");
        return;
      }

      const response = await fetch(
        `https://api.themoviedb.org/3/discover/movie?api_key=e919ae2d2eaddaf94f19c2fc1d61852e&language=en-US&with_genres=${genreId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Attach the token here
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setMovies(data.results); // Store the full list of movies
      setFilteredMovies(data.results); // Initialize filtered movies to the full list
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  // Handle genre selection
  const handleGenreClick = (genre) => {
    setSelectedGenre(genre);
    fetchMovies(genre.id);
    setSortOption(""); // Reset sort when changing genre
    setSortOrder("asc"); // Reset sort order
    if (sidebarOpen) {
      setSidebarOpen(false);
    }
  };

  // Handle movie search
  const handleSearch = (query) => {
    if (!query) {
      setFilteredMovies(movies);
    } else {
      const filtered = movies.filter((movie) =>
        movie.title.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredMovies(filtered);
    }
  };

  const handleSort = (option) => {
    let sortedMovies;

    if (option === "Name") {
      sortedMovies = [...filteredMovies].sort((a, b) => {
        const nameA = a.title.toLowerCase();
        const nameB = b.title.toLowerCase();
        if (sortOrder === "asc") {
          return nameA < nameB ? -1 : nameA > nameB ? 1 : 0;
        } else {
          return nameA > nameB ? -1 : nameA < nameB ? 1 : 0;
        }
      });
    } else if (option === "Release Date") {
      sortedMovies = [...filteredMovies].sort((a, b) => {
        const dateA = new Date(a.release_date);
        const dateB = new Date(b.release_date);
        return dateB - dateA; // Descending order (latest first)
      });
    }

    setFilteredMovies(sortedMovies);
    setSortOption(option);
    setSortOrder(option === sortOption && sortOrder === "asc" ? "desc" : "asc");
  };

  // Handle movie rating
  const handleMovieRating = async (movieTitle, rating, movieId) => {
    const userId = localStorage.getItem("userId"); // Retrieve the user ID from local storage

    // Save the rating to localStorage
    localStorage.setItem(`rating-${movieTitle}`, rating);

    // Send the rating to the backend (database)
    try {
      const response = await fetch(
        "https://movie-explorer-backend-hubs.onrender.com/api/users/rate",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            movieId, // Movie ID to associate with the rating
            rating, // The rating value
            userId, // User ID to associate with the rating
          }),
        }
      );

      if (response.ok) {
        console.log("Rating saved to database.");
        const data = await response.json();
        setGenres(data.genres); // Optionally update genres or any other data
        // Update user ratings state
        setUserRatings((prevRatings) => ({
          ...prevRatings,
          [movieId]: rating,
        }));
      } else {
        console.error("Failed to save rating.");
      }
    } catch (error) {
      console.error("Error sending rating to backend:", error);
    }
  };

  // Toggle sidebar visibility
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div
      id="dashboardMainContainer"
      className="flex flex-col flex-grow-0 font-mono"
      style={{ height: "100vh" }}
    >
      <div id="navbarContainer">
        <Navbar onSearch={handleSearch} />
        <button
          className="lg:hidden ml-6 mt-2 p-4 bg-gray-600 text-white rounded-md hover:bg-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          onClick={toggleSidebar}
        >
          <i className="fas fa-bars"></i> {/* Hamburger icon */}
        </button>
      </div>
      <div id="contentContainer" className="flex gap-16 flex-grow p-7">
        {/* Sidebar */}
        <div
          id="sidebarContainer"
          className={`mt-3 w-96 ${sidebarOpen ? "block" : "hidden"} lg:block`}
          style={{ maxHeight: "80vh", overflowY: "auto" }}
        >
          <nav>
            <h2 className="text-xl font-bold mb-5">Genres</h2>
            <ul className="flex flex-col gap-5">
              {genres.map((genre) => (
                <li key={genre.id}>
                  <button
                    className={`font-sans btn border-2 ${
                      selectedGenre?.id === genre.id
                        ? "bg-blue-500 text-white border-blue-500"
                        : "bg-white text-black border-black hover:bg-black hover:text-white hover:border-white"
                    }`}
                    onClick={() => handleGenreClick(genre)}
                  >
                    {genre.name}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Cards Container */}
        <div
          id="cardsContainer"
          style={{ maxHeight: "80vh", overflowY: "auto" }}
        >
          <h1 className="text-5xl">
            {selectedGenre ? selectedGenre.name : "Movies"}
          </h1>
          <hr className="mt-2" />
          <DropdownButton
            name="Sort by"
            options={["Name", "Release Date"]}
            onSort={handleSort}
            selectedOption={sortOption}
            setSelectedOption={setSortOption}
          />

          {!selectedGenre ? (
            <div className="mt-6 text-center text-xl text-gray-500">
              Choose a genre...
            </div>
          ) : (
            <div className="movies mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-8">
              {filteredMovies.map((movie) => (
                <MovieCard
                  key={movie.id}
                  movieId={movie.id}
                  imageUrl={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  title={movie.title}
                  rating={userRatings[movie.id] || null} // Display the saved rating
                  onRate={handleMovieRating} // Passing the rating function as a prop
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
