// بعضی سریالایزرهای بک‌اند (مثل PackageListSerializer تو user_packages_list)
// context={'request': request} رو پاس نمی‌دن، پس URL فایل رسانه‌ای که برمی‌گردونن
// نسبیه (مثلاً "/media/packages/thumbnails/x.jpg") نه کامل.
// این تابع همچین مسیرهایی رو به آدرس کامل بک‌اند تبدیل می‌کنه.
const API_BASE =
  import.meta?.env?.VITE_API_BASE_URL || "http://127.0.0.1:8000/api";
const BACKEND_ORIGIN = API_BASE.replace(/\/api\/?$/, "");

export function resolveMediaUrl(path) {
  if (!path) return null;
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  return `${BACKEND_ORIGIN}${path.startsWith("/") ? "" : "/"}${path}`;
}
