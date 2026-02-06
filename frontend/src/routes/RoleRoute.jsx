import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function RoleRoute({
  children,
  allowedRoles = [],
  redirectTo = "/unauthorized",
}) {
  const { isAuthenticated, role, loading } = useAuth();

  if (loading) return null;
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (allowedRoles.length && !allowedRoles.includes(role))
    return <Navigate to={redirectTo} replace />;
  return children;
}
