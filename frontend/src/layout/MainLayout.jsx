import { Outlet } from "react-router-dom";

// هر صفحه‌ی داشبورد (StudentDash, TeacherDash, PackagesList, ...) خودش
// هدر (HeaderDash) و پایین‌منو (BottomMenu) کامل و fixed-positioned داره.
// این لایه فقط یه wrapper خنثی برای مسیرهای محافظت‌شده‌ست؛ چیزی اضافه
// نمی‌کنه که با طراحی خود صفحه‌ها تداخل داشته باشه.
export default function MainLayout() {
  return <Outlet />;
}
