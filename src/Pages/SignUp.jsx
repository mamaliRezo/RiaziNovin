import { useState } from "react";
import LogoRiaziNovin from "../assets/logoRiazinovin.svg";
import Guy from "../assets/Guy.svg";
import TopWave from "../components/TopWave.jsx";
import BottomWave from "../components/BottomWave.jsx";

export default function Signup({ phone_email, role, onSignupComplete }) {
  const [first, setFirst] = useState("");
  const [last, setLast] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const BACKEND = "http://localhost:8000";

  async function handleSignup() {
    setError(null);

    if (!phone_email) {
      setError("شماره تلفن شما مشخص نیست. لطفاً دوباره وارد شوید.");
      return;
    }

    if (!first.trim() || !last.trim()) {
      setError("لطفاً نام و نام خانوادگی را کامل وارد کنید.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(`${BACKEND}/api/signup/`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          first_name: first,
          last_name: last,
          phone_email: phone_email,
          role: role || "student",
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "خطا در ثبت‌نام");
        setLoading(false);
        return;
      }

      onSignupComplete();
    } catch (err) {
      setError("مشکل در اتصال به سرور");
    }

    setLoading(false);
  }

  return (
    <div className="relative w-[412px] h-[917px] mx-auto overflow-hidden bg-[#FEF9FE] font-[BYekan]">

      <TopWave />

      {/* لوگو */}
      <img
        src={LogoRiaziNovin}
        alt="logo"
        className="absolute left-[105px] top-[105px] w-[202px] h-[140px]"
      />

      {/* تیتر */}
      <h2 className="absolute left-[105px] top-[237px] w-[202px] text-[31px] font-bold text-center text-[#080609]">
        ثبت نام
      </h2>

      {/* توضیح */}
      <p className="absolute left-[29px] top-[297px] w-[347px] text-center text-[#545454] text-[16px]">
        لطفاً اطلاعات خود را وارد کنید
      </p>

      {/* نام */}
      <div className="absolute left-[88px] top-[352px] w-[235px] h-[46px] flex items-center bg-[#F5C6F0] rounded-[24px] px-3">
        <input
          type="text"
          value={first}
          onChange={(e) => setFirst(e.target.value)}
          placeholder="نام"
          dir="rtl"
          style={{padding: "4px 10px",}}
          className="flex-1 text-right text-[16px] font-[BYekan] bg-transparent border-none focus:outline-none"
        />
      </div>

      {/* نام خانوادگی */}
      <div className="absolute left-[89px] top-[408px] w-[235px] h-[46px] flex items-center bg-[#F5C6F0] rounded-[24px] px-3">
        <input
          type="text"
          value={last}
          onChange={(e) => setLast(e.target.value)}
          placeholder="نام خانوادگی"
          dir="rtl"
          style={{padding: "4px 10px",}}
          className="flex-1 text-right text-[16px] font-[BYekan] bg-transparent border-none focus:outline-none"
        />
      </div>

      {/* دکمه */}
      <button
        onClick={handleSignup}
        disabled={loading}
        className="absolute left-[89px] top-[513px] w-[234px] h-[44px] rounded-[18224px] font-[BYekan] font-bold text-black text-[16px]"
        style={{
          background: "linear-gradient(154.2deg, #FFCA28 18.04%, #997918 86%)",
          border: "none",
        }}
      >
        {loading ? "در حال ارسال..." : "ثبت نام"}
      </button>

      {/* پیام خطا – بدون قاب، هماهنگ با UI */}
      {error && (
        <p className="absolute left-0 right-0 top-[570px] text-center text-red-600 text-[15px] font-[BYekan]">
          {error}
        </p>
      )}

      {/* تصویر */}
      <img
        src={Guy}
        alt="Guy"
        className="absolute left-[105px] top-[619px] w-[275px] h-[275px] object-contain z-20"
      />

      <div className="absolute top-[715px] bottom-0 left-0 w-full">
        <BottomWave />
      </div>
    </div>
  );
}
