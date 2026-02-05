import React from "react";
import { Navigate } from "react-router-dom";

const getAuth = () => {
  try {
    const raw = localStorage.getItem("auth");
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
};

export default function ProtectedRoute({ children, redirectTo = "/login" }) {
  const user = getAuth();
  const isAuthenticated = user && user.isAuthenticated;
  return isAuthenticated ? children : <Navigate to={redirectTo} replace />;
}
