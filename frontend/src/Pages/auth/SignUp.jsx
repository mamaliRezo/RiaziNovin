import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import LogoRiaziNovin from "../../assets/logoRiazinovin.webp";
import Guy from "../../assets/Guy.webp";
import TopWave from "../../components/section/TopWave.jsx";
import ErrorBox from "../../components/common/ErrorBox.jsx";
import { BACKEND_ORIGIN } from "../../config.js";

export default function Signup() {
  const navigate = useNavigate();
  const location = useLocation();

  // از صفحه‌ی Login با navigate state میان (همون‌جا شماره تلفن رو گرفتیم)
  const phone_email = location.state?.phone_email || "";
  const role = location.state?.role || "student";

  const [first, setFirst] = useState("");
  const [last, setLast] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const BACKEND = BACKEND_ORIGIN;

  async function handleSignup() {
    setError(null);

    if (!phone_email) {
      setError("شماره تلفن شما مشخص نیست. لطفاً دوباره وارد شوید");
      return;
    }

    if (!first.trim() || !last.trim()) {
      setError("لطفاً نام و نام خانوادگی را کامل وارد کنید");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(`${BACKEND}/api/signup/`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          phone_number: phone_email,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "خطا");
        setLoading(false);
        return;
      }

      // این مرحله فقط کد تایید می‌فرسته؛ ساخت واقعی حساب تو صفحه‌ی OTP
      // (با action:"signup") انجام می‌شه
      navigate("/otp", {
        state: {
          phone_email,
          role,
          fromPage: "signup",
          first_name: first,
          last_name: last,
        },
      });
    } catch {
      setError("مشکل در اتصال به سرور");
    }

    setLoading(false);
  }

  return (
    <div className="relative w-full max-w-[412px] mx-auto bg-[#FEF9FE] font-[BYekan]">
      <TopWave />
      {error && <ErrorBox message={error} onClose={() => setError(null)} />}

      <div className="flex flex-col items-center px-6 pb-10" dir="rtl">
        <img src={LogoRiaziNovin} alt="logo" className="w-[150px] h-auto mt-2 mb-6" />

        <h2 className="text-[24px] font-bold text-center text-[#080609] mb-2">
          ثبت نام
        </h2>

        <p className="text-center text-[#545454] text-[14px] mb-6">
          لطفاً اطلاعات خود را وارد کنید
        </p>

        <div className="w-full max-w-[235px] h-[46px] flex items-center bg-[#F5C6F0] rounded-[24px] px-3 mb-3">
          <input
            type="text"
            value={first}
            onChange={(e) => setFirst(e.target.value)}
            placeholder="نام"
            dir="rtl"
            style={{ padding: "4px 10px" }}
            className="flex-1 text-right text-[16px] font-[BYekan] bg-transparent border-none focus:outline-none"
          />
        </div>

        <div className="w-full max-w-[235px] h-[46px] flex items-center bg-[#F5C6F0] rounded-[24px] px-3 mb-6">
          <input
            type="text"
            value={last}
            onChange={(e) => setLast(e.target.value)}
            placeholder="نام خانوادگی"
            dir="rtl"
            style={{ padding: "4px 10px" }}
            className="flex-1 text-right text-[16px] font-[BYekan] bg-transparent border-none focus:outline-none"
          />
        </div>

        <button
          onClick={handleSignup}
          disabled={loading}
          className="w-full max-w-[234px] h-[44px] rounded-full font-[BYekan] font-bold text-black text-[16px] mb-8"
          style={{
            direction: "rtl",
            background: "linear-gradient(154.2deg, #FFCA28 18.04%, #997918 86%)",
            border: "none",
          }}
        >
          {loading ? "در حال ارسال ..." : "ثبت نام"}
        </button>

        <img src={Guy} alt="Guy" className="w-[180px] h-auto object-contain" />
      </div>
    </div>
  );
}
