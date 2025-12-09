import { useState, useEffect } from "react";
import LogoRiaziNovin from "../assets/logoRiazinovin.svg";
import Guy from "../assets/Guy.svg";
import TopWave from "../components/TopWave.jsx";
import BottomWave from "../components/BottomWave.jsx";
import ErrorBox from "../components/ErrorBox.jsx"; // ← اضافه شد

export default function OTP({ phone_email, role, onVerified }) {
  const [timeLeft, setTimeLeft] = useState(120);
  const [otpValues, setOtpValues] = useState(["", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const BACKEND = "http://localhost:8000";

  // -------------------------------------------
  //  تایمر
  // -------------------------------------------
  useEffect(() => {
    if (timeLeft <= 0) return;
    const timer = setInterval(() => {
      setTimeLeft((p) => p - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const formatTime = (s) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m}:${sec < 10 ? "0" : ""}${sec}`;
  };

  const otpComplete = otpValues.every((v) => v !== "");
  const otpCode = otpValues.join("");

  // -------------------------------------------
  //  ارسال OTP
  // -------------------------------------------
  async function submitOTP() {
    if (!otpComplete) return;

    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`${BACKEND}/api/verify-otp/`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          phone_email,
          otp: otpCode,
          action: "login",
          role: role || "student",
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "کد اشتباه است");
        setLoading(false);
        return;
      }

      onVerified();
    } catch {
      setError("مشکل در اتصال به سرور");
    }

    setLoading(false);
  }

  // -------------------------------------------
  // ارسال مجدد
  // -------------------------------------------
  async function resendOTP() {
    setTimeLeft(120);
    setError(null);

    await fetch(`${BACKEND}/api/resend-otp/`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        phone_email,
        role: role || "student",
      }),
    });
  }

  // -------------------------------------------
  // رندر UI
  // -------------------------------------------
  return (
    <div className="relative w-[412px] h-[917px] mx-auto overflow-hidden bg-[#FEF9FE] font-[BYekan]">

      {/* 🔔 باکس خطا بالای صفحه */}
      {error && <ErrorBox message={error} onClose={() => setError(null)} />}

      <TopWave />

      {/* لوگو */}
      <img
        src={LogoRiaziNovin}
        alt="logo"
        className="absolute left-[105px] top-[177px] w-[202px] h-[140px]"
      />

      {/* تیتر */}
      <h2 className="absolute left-[32px] top-[313px] w-[348px] text-center font-bold text-[26px] text-[#080609]">
        کد فعال سازی را وارد کنید
      </h2>

      {/* متن */}
      <p className="absolute left-[32px] top-[377px] w-[347px] text-center text-[#545454] text-[16px]">
        کدتایید ارسال شده را وارد کنید
      </p>

      {/* OTP INPUTS */}
      <div className="absolute left-[32px] top-[433px] w-[348px] flex justify-between">
        {otpValues.map((val, idx) => (
          <input
            key={idx}
            id={`otp-${idx}`}
            maxLength={1}
            value={val}
            type="text"
            onChange={(e) => {
              const v = e.target.value.replace(/[^0-9]/g, "");
              const newOtp = [...otpValues];

              if (v) {
                newOtp[idx] = v[0];
                setOtpValues(newOtp);
                if (idx < 4) document.getElementById(`otp-${idx + 1}`)?.focus();
              } else {
                newOtp[idx] = "";
                setOtpValues(newOtp);
              }
            }}
            onKeyDown={(e) => {
              if (e.key === "Backspace" && !otpValues[idx] && idx > 0) {
                const newOtp = [...otpValues];
                newOtp[idx - 1] = "";
                setOtpValues(newOtp);
                document.getElementById(`otp-${idx - 1}`)?.focus();
              }
            }}
            className="w-[57px] h-[52px] text-center text-[24px] bg-[#F5C6F0] rounded-[19px] focus:outline-none"
          />
        ))}
      </div>

      {/* تایمر */}
      {timeLeft > 0 ? (
        <div className="absolute left-[105px] top-[497px] w-[202px] text-center text-[13px] text-[#2C0528]">
          تا دریافت مجدد کد {formatTime(timeLeft)}
        </div>
      ) : (
        <div
          onClick={resendOTP}
          className="absolute left-[105px] top-[497px] w-[202px] text-center text-[#00C0D9] text-[13px] cursor-pointer hover:underline"
        >
          ارسال مجدد کد
        </div>
      )}

      {/* دکمه ورود */}
      <button
        onClick={submitOTP}
        disabled={!otpComplete || loading}
        className="absolute left-[89px] top-[529px] w-[234px] h-[44px] rounded-full font-bold text-[16px] bg-gradient-to-r from-yellow-400 to-yellow-600"
        style={{
          opacity: !otpComplete ? 0.5 : 1,
          cursor: !otpComplete ? "not-allowed" : "pointer",
        }}
      >
        {loading ? "در حال بررسی..." : "ورود"}
      </button>

      {/* تصویر */}
      <img
        src={Guy}
        alt="Guy"
        className="absolute left-[105px] top-[619px] w-[275px] h-[275px] z-20"
      />

      <div className="absolute top-[715px] bottom-0 left-0 w-full">
        <BottomWave />
      </div>
    </div>
  );
}
