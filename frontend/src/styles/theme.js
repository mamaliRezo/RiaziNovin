// ------------------------------------------------------------------
// سیستم رنگی مرکزی ریاضی‌نوین
// ------------------------------------------------------------------
// به‌جای اینکه هر کامپوننت رنگ‌های هاردکد پراکنده داشته باشه، همه از
// همین‌جا می‌خونن. برند اصلی نارنجی لوگو + بنفش/فیروزه‌ای هویت فعلی
// اپه؛ رنگ‌های تکمیلی (طلایی، مرجانی، بنفش، نعنایی) برای تنوع بصری
// رو کارت‌ها و بج‌ها استفاده می‌شن، هرکدوم با یه گرادینت اختصاصی که
// حس زنده‌تری نسبت به رنگ تخت می‌ده.

export const BRAND = {
  orange: "#F5941F",
  magenta: "#C90BBC",
  magentaDark: "#8E0786",
  teal: "#00C0D9",
  ink: "#1A1523",
  bg: "#FDF8FB",
};

// هر تم شامل: گرادینت (برای بج/دکمه/نوار)، رنگ زمینه‌ی نرم (برای خود
// کارت)، و رنگ متن هم‌خوان باهاش.
export const CARD_THEMES = [
  {
    name: "teal",
    gradient: "linear-gradient(135deg, #2FE0C4 0%, #0C93A8 100%)",
    soft: "#E3FBF6",
    text: "#0B7A8C",
  },
  {
    name: "violet",
    gradient: "linear-gradient(135deg, #9B8CFF 0%, #5B4FE0 100%)",
    soft: "#EFEDFF",
    text: "#5145C4",
  },
  {
    name: "coral",
    gradient: "linear-gradient(135deg, #FF9A6C 0%, #E85D3A 100%)",
    soft: "#FFF0E8",
    text: "#C24A2C",
  },
  {
    name: "gold",
    gradient: "linear-gradient(135deg, #FFD668 0%, #F5941F 100%)",
    soft: "#FFF6E0",
    text: "#A96A08",
  },
];

export const GRADIENTS = {
  gold: "linear-gradient(135deg, #FFD668 0%, #F5941F 100%)",
  magenta: "linear-gradient(135deg, #E356D6 0%, #8E0786 100%)",
  teal: "linear-gradient(135deg, #2FE0C4 0%, #0C93A8 100%)",
  hero: "linear-gradient(135deg, #FCE9FC 0%, #E3FBF6 50%, #FFF6E0 100%)",
};

export function themeFor(index) {
  return CARD_THEMES[index % CARD_THEMES.length];
}
