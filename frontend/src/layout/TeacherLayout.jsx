import React from "react";
import { Outlet, NavLink } from "react-router-dom";

export default function TeacherLayout() {
  return (
    <div className="teacher-layout">
      <header>
        <nav>
          <NavLink to="/teacher" end>
            Dashboard
          </NavLink>{" "}
          | <NavLink to="/teacher/create">Create Course</NavLink>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
}
