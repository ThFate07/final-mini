import React, { useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";


const PrivateRoute = ({ children }) => {
  const { currentUser } = useAuth();

  useEffect(() => {
    if (!currentUser) {
      const timer = setTimeout(() => {
        window.location.href = "http://localhost:3000/login";
      }, 5000);

      // Clear timeout if the component is unmounted before the delay finishes
      return () => clearTimeout(timer);
    }
  }, [currentUser]);

  if (!currentUser) {
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    );
  }

  return children;
};

export default PrivateRoute;
