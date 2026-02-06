import { useEffect } from "react";

// Simple auth guard component
// Checks if access_token exists in localStorage
// If not, redirects to login page by calling onRedirectToLogin
export default function AuthGuard({ children, onRedirectToLogin }) {
  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (!token) {
      // No token found, redirect to login
      onRedirectToLogin();
    }
  }, [onRedirectToLogin]);

  // If token exists, render the protected content
  const token = localStorage.getItem("access_token");
  if (!token) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-xl">Redirecting to login...</div>
      </div>
    );
  }

  return children;
}
