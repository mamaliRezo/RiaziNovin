// آدرس بک‌اند از متغیر محیطی VITE_API_BASE_URL خونده می‌شه (همون چیزی که
// services/api.js هم استفاده می‌کنه)، نه هاردکد. برای تنظیمش یه فایل
// frontend/.env بساز و این خط رو توش بذار:
//   VITE_API_BASE_URL=http://127.0.0.1:8000/api
// اگه چیزی ست نشده باشه، پیش‌فرض رو localhost می‌ذاریم که کار محلی خراب نشه.
const API_BASE =
  import.meta?.env?.VITE_API_BASE_URL || "http://127.0.0.1:8000/api";

// خیلی از صفحات auth مستقیم fetch می‌زنن (نه از سرویس api.js)، پس بهشون
// ریشه‌ی بک‌اند رو بدون "/api" هم می‌دیم.
export const BACKEND_ORIGIN = API_BASE.replace(/\/api\/?$/, "");
