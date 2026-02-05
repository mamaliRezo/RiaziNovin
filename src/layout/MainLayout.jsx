import React from "react";
import { Outlet, Link } from "react-router-dom";

function getUser() {
  try {
    const raw = localStorage.getItem("auth");
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export default function MainLayout() {
  const user = getUser();

  return (
    <div className="main-layout">
      <header style={{ padding: 12, borderBottom: "1px solid #eee" }}>
        <nav style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <Link to="/">Home</Link>
          {user && user.isAuthenticated && (
            <>
              <span>Signed in as {user.role}</span>
              <Link to={user.role === "teacher" ? "/teacher" : "/student"}>
                Dashboard
              </Link>
            </>
          )}
          {!user && <Link to="/login">Login</Link>}
        </nav>
      </header>

      <main style={{ padding: 16 }}>
        <Outlet />
      </main>

      <footer
        style={{ padding: 12, borderTop: "1px solid #eee", marginTop: 24 }}
      >
        <small>Riazi Novin © {new Date().getFullYear()}</small>
      </footer>
    </div>
  );
}
