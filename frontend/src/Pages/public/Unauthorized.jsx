import React from "react";
import { Link } from "react-router-dom";

export default function Unauthorized() {
  return (
    <div style={{ padding: 24 }}>
      <h1>Unauthorized</h1>
      <p>You do not have permission to view this page.</p>
      <p>
        <Link to="/">Go to Home</Link>
      </p>
    </div>
  );
}
