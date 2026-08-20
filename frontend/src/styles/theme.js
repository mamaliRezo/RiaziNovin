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

// نسخه‌ی پرانرژی‌تر همون ۴ تم، برای بج‌های آیکون و المان‌های تزئینی
// (لندینگ‌پیج) که باید چشم رو بگیرن، نه فقط زمینه‌ی نرم کارت باشن.
export const VIBRANT_THEMES = [
  { gradient: "linear-gradient(135deg, #22D3B8 0%, #0891A3 100%)", glow: "rgba(8,145,163,0.35)" },
  { gradient: "linear-gradient(135deg, #A78BFA 0%, #6D28D9 100%)", glow: "rgba(109,40,217,0.35)" },
  { gradient: "linear-gradient(135deg, #FF8A65 0%, #E64A19 100%)", glow: "rgba(230,74,25,0.35)" },
  { gradient: "linear-gradient(135deg, #FFD54F 0%, #F5941F 100%)", glow: "rgba(245,148,31,0.35)" },
  { gradient: "linear-gradient(135deg, #F472B6 0%, #C90BBC 100%)", glow: "rgba(201,11,188,0.35)" },
];

// یه پس‌زمینه‌ی نقطه‌چین ظریف برای بخش‌های تیره/گرادینتی، به‌جای رنگ تخت خالی
export const DOT_PATTERN =
  "radial-gradient(rgba(255,255,255,0.18) 1.5px, transparent 1.5px)";

export function themeFor(index) {
  return CARD_THEMES[index % CARD_THEMES.length];
}
