import { Navigate } from "react-router-dom";
import React from "react";

// Type definition for the props of PrivateRoute
interface PrivateRouteProps {
  element: React.ReactElement;
}

// Example of authentication check (this could be from Redux, Context, or localStorage)
const isAuthenticated = (): boolean => {
  return !!localStorage.getItem("authToken"); // Replace with your authentication logic
};

const PrivateRoute: React.FC<PrivateRouteProps> = ({ element }) => {
  return isAuthenticated() ? element : <Navigate to="/login" />;
};

export default PrivateRoute;