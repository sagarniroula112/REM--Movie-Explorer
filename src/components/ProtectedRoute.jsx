import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token"); // Check for the token in local storage

  // Redirect to login if there's no token
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // Render the children if the token exists
  return children;
};

// Add PropTypes validation
ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired, // Validate that children is a React node and required
};

export default ProtectedRoute;
