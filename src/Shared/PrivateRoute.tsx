import { Navigate, useLocation } from "react-router-dom";
import React from "react";

// Type definition for the props of PrivateRoute
interface PrivateRouteProps {
  element: React.ReactElement;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ element }) => {
  const location = useLocation();

  const isEmbedLink = () => {
    return location.pathname.startsWith('/EventForm');
  };

  // Example of authentication check (this could be from Redux, Context, or localStorage)
  const isAuthenticated = (): boolean => {
    return !!localStorage.getItem("authToken"); // Replace with your authentication logic
  };

  return isAuthenticated() || isEmbedLink() ? element : <Navigate to="/login" />;
};

export default PrivateRoute;
