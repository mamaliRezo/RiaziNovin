import React from "react";
import { Outlet, NavLink } from "react-router-dom";

export default function StudentLayout() {
  return (
    <div className="student-layout">
      <header>
        <nav>
          <NavLink to="/student" end>
            Dashboard
          </NavLink>{" "}
          | <NavLink to="/student/courses">Courses</NavLink> |{" "}
          <NavLink to="/student/profile">Profile</NavLink>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
}
