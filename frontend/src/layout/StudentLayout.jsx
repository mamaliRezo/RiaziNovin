import { Outlet } from "react-router-dom";

// هر صفحه‌ی دانش‌آموز (StudentDash, StudentCourses, PackagesList, Profile, ...)
// خودش کامل HeaderDash + BottomMenu + عرض/ارتفاع صفحه رو مدیریت می‌کنه.
export default function StudentLayout() {
  return <Outlet />;
}
