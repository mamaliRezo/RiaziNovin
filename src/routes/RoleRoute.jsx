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

export default function RoleRoute({
  children,
  allowedRoles = [],
  redirectTo = "/unauthorized",
}) {
  const user = getAuth();
  if (!user || !user.isAuthenticated) return <Navigate to="/login" replace />;
  if (!allowedRoles.includes(user.role))
    return <Navigate to={redirectTo} replace />;
  return children;
}
