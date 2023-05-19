import { useContext } from "react";
import { AuthContext } from "./../context/auth.context";
import { Navigate } from "react-router-dom";

function IsAdmin({ children }) {
  const { isLoggedIn, isAdmin, isLoading } = useContext(AuthContext);

  // If the authentication is still loading
  if (isLoading) return <p>Loading ...</p>;

  if (!isLoggedIn || !isAdmin) {
    // If the user is not logged in
    return <Navigate to="/login" />;
  } else if (isAdmin) {
    // If the user is logged in, allow to see the page
    return children;
  }
}

export default IsAdmin;
