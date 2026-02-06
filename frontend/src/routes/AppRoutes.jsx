import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

// Public pages
import Login from "../Pages/auth/Login.jsx";
import OTP from "../Pages/auth/OTP.jsx";
import SignUp from "../Pages/auth/SignUp.jsx";
import PasswordIN from "../Pages/auth/PasswordIN.jsx";
import VideoPage from "../Pages/public/VideoPage.jsx";
import ComingSoon from "../Pages/public/ComingSoon.jsx";
import Unauthorized from "../Pages/public/Unauthorized.jsx";
import NotFound from "../Pages/public/NotFound.jsx";

// Dashboard pages
import StudentDash from "../Pages/dashboard/StudentDash.jsx";
import StudentCourses from "../Pages/dashboard/StudentCourses.jsx";
import Profile from "../Pages/dashboard/Profile.jsx";
import CreateCourse from "../Pages/teacher/createCourse.jsx";
import TeacherDash from "../Pages/teacher/TeacherDash.jsx";

// Layouts & route guards
import ProtectedRoute from "./ProtectedRoute.jsx";
import RoleRoute from "./RoleRoute.jsx";
import StudentLayout from "../layout/StudentLayout.jsx";
import TeacherLayout from "../layout/TeacherLayout.jsx";
import MainLayout from "../layout/MainLayout.jsx";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />

      {/* Public */}
      <Route path="/login" element={<Login />} />
      <Route path="/otp" element={<OTP />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/password" element={<PasswordIN />} />
      <Route path="/video" element={<VideoPage />} />
      <Route path="/comingsoon" element={<ComingSoon />} />
      <Route path="/unauthorized" element={<Unauthorized />} />

      {/* Protected area: wraps main layout */}
      <Route
        element={
          <ProtectedRoute>
            <MainLayout />
          </ProtectedRoute>
        }
      >
        {/* Student routes */}
        <Route
          path="/student"
          element={
            <RoleRoute allowedRoles={["student"]}>
              <StudentLayout />
            </RoleRoute>
          }
        >
          <Route index element={<StudentDash />} />
          <Route path="courses" element={<StudentCourses />} />
          <Route path="profile" element={<Profile />} />
        </Route>

        {/* Teacher routes */}
        <Route
          path="/teacher"
          element={
            <RoleRoute allowedRoles={["teacher"]}>
              <TeacherLayout />
            </RoleRoute>
          }
        >
          <Route index element={<TeacherDash />} />
          <Route path="create" element={<CreateCourse />} />
        </Route>
      </Route>

      {/* Catch-all */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
