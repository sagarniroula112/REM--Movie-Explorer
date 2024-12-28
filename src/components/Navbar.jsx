import PropTypes from "prop-types";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Navbar({ onSearch }) {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  // Handle input change
  const handleSearchChange = (event) => {
    const query = event.target.value;
    setSearchQuery(query);
    onSearch(query); // Call onSearch passed from parent to update the movie list
  };

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove the token from localStorage
    navigate("/login"); // Redirect to the login page
  };

  return (
    <div className="navbar bg-base-100 font-mono">
      <div className="flex-1">
        <a className="btn btn-ghost text-2xl font-bold">Movie Explorer</a>
      </div>
      <div className="flex-none gap-2">
        <div className="form-control">
          <input
            type="text"
            placeholder="Search for a movie"
            className="input input-bordered w-24 md:w-auto"
            value={searchQuery}
            onChange={handleSearchChange} // Update the search query on input change
          />
        </div>
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full">
              <img
                alt="Tailwind CSS Navbar component"
                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
              />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            <li>
              <a className="justify-between">
                Profile
                <span className="badge">New</span>
              </a>
            </li>
            <li>
              <a>Settings</a>
            </li>
            <li>
              <Link to="/yourratings" className="hover:underline">
                Your Movie Ratings
              </Link>
            </li>
            <li>
              <button onClick={handleLogout} className="btn btn-error btn-sm">
                Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

// PropTypes for Navbar component
Navbar.propTypes = {
  onSearch: PropTypes.func.isRequired, // onSearch should be a function and is required
};

export default Navbar;
