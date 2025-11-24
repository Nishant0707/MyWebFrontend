import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../../pages/context/AuthContext"; // FIXED PATH

export default function ProtectedRoute({ children }) {
  const { token } = useContext(AuthContext);

  if (!token) {
    return <Navigate to="/admin/login" replace />;
  }

  return children;
}
