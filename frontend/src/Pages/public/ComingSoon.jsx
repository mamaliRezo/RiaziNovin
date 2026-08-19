import { useNavigate } from "react-router-dom";
import AppShell from "../../components/layout/AppShell";
import LogoRiaziNovin from "../../assets/logoRiazinovin.webp";
import { GRADIENTS } from "../../styles/theme.js";

export default function ComingSoon() {
  const navigate = useNavigate();

  return (
    <AppShell>
      <div className="flex flex-col items-center justify-center text-center px-4 py-10 min-h-[70vh]">
        <div
          className="rounded-full flex items-center justify-center mb-6"
          style={{ width: "100px", height: "100px", background: GRADIENTS.gold, boxShadow: "0 12px 24px rgba(245,148,31,0.3)" }}
        >
          <img src={LogoRiaziNovin} alt="logo" className="w-[56px] h-auto" />
        </div>

        <h1 className="text-[26px] font-bold text-[#1A1523] mb-3">
          به‌زودی...
        </h1>

        <p className="text-[15px] text-[#6B6470] max-w-[320px] mb-8">
          این بخش در حال آماده‌سازی است. لطفاً بعداً دوباره بررسی کنید.
        </p>

        <button
          onClick={() => navigate(-1)}
          className="px-6 py-3 rounded-full text-white font-bold text-[14px]"
          style={{ background: GRADIENTS.magenta, boxShadow: "0 10px 20px rgba(142,7,134,0.3)" }}
        >
          بازگشت
        </button>
      </div>
    </AppShell>
  );
}
