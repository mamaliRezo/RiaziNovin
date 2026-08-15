import { Outlet } from "react-router-dom";

// هر صفحه‌ی معلم (TeacherDash, createCourse, createPackage) خودش کامل
// HeaderDash + BottomMenu + عرض/ارتفاع صفحه رو مدیریت می‌کنه. این لایه
// اگه همون‌ها رو دوباره اینجا رندر کنه، هدر و منو دوبار روی هم میان.
export default function TeacherLayout() {
  return <Outlet />;
}
