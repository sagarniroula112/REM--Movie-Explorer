import { Link } from "react-router-dom";

function LandingPage() {
  return (
    <div className="flex flex-col md:flex-row justify-center items-center h-screen gap-8 md:gap-32 px-4">
      <h2 className="text-4xl md:text-5xl font-mono text-center md:text-left">
        Movie Explorer
      </h2>

      <div id="desc" className="text-center md:text-left md:mr-5">
        <p className="font-mono text-lg md:text-xl">
          A place where you can find all your favorite movies.
        </p>
        <p className="mt-4 md:mt-8 font-mono text-lg md:text-xl">
          Get started!
        </p>
        <div
          id="landBtns"
          className="flex flex-col md:flex-row items-center mt-6"
        >
          <Link to="/login">
            <button className="btn btn-info mb-4 md:mb-0 md:mr-4 font-mono px-10 text-lg md:text-xl">
              Log In
            </button>
          </Link>
          <Link to="/signup">
            <button className="btn btn-success font-mono px-10 text-lg md:text-xl">
              Sign Up
            </button>
          </Link>
        </div>
        {/* Arrow below heading pointing right */}
        <div className="mt-6">
          <svg
            style={{ transform: "rotate(90deg)" }}
            xmlns="http://www.w3.org/2000/svg"
            className="w-8 h-8 text-gray-700 animate-bounce mx-auto md:mx-0"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 3a1 1 0 01.707.293l4 4a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 01-2 0V5.414L6.707 8.707a1 1 0 01-1.414-1.414l4-4A1 1 0 0110 3z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
