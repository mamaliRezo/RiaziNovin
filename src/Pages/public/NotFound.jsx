import React from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div style={{ padding: 24 }}>
      <h1>404 — Not Found</h1>
      <p>The page you requested could not be found.</p>
      <p>
        <Link to="/">Go to Home</Link>
      </p>
    </div>
  );
}
