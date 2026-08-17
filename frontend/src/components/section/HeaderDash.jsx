import LogoRiaziNovin from "../../assets/logoRiazinovin.webp";
import Bell from "../../assets/Bell.webp";
import cart from "../../assets/cart.svg";

// قبلاً هر آیکون با left:"XXXpx" ثابت جاگذاری می‌شد که فقط رو عرض دقیق
// 412px درست می‌ایستاد؛ رو گوشی‌های باریک‌تر آیکون‌ها از صفحه بیرون
// می‌زدن. با flex + justify-between خودش رو هر عرضی جا می‌شه.
export default function HeaderDash() {
  return (
    <div className="w-full h-full flex items-center justify-between px-4">
      <img src={cart} alt="سبد خرید" style={{ width: "24px", height: "auto" }} />

      <img
        src={LogoRiaziNovin}
        alt="ریاضی نوین"
        style={{ width: "100px", height: "auto" }}
      />

      <img src={Bell} alt="اعلان‌ها" style={{ width: "26px", height: "auto" }} />
    </div>
  );
}
