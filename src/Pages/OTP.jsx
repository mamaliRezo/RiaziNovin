import { useState, useEffect } from "react";
import LogoRiaziNovin from "../assets/logoRiazinovin.svg";
import Guy from "../assets/Guy.svg";

export default function OTP() {
  const [timeLeft, setTimeLeft] = useState(120); // 2 دقیقه
  const [otpValues, setOtpValues] = useState(["", "", "", "", ""]);

  useEffect(() => {
    if (timeLeft <= 0) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const formatTime = (seconds) => {
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;
    return `${min}:${sec < 10 ? "0" : ""}${sec}`;
  };

  const handleChange = (e, idx) => {
    const val = e.target.value.replace(/[^0-9]/g, "");
    if (!val) return;
    const newOtp = [...otpValues];
    newOtp[idx] = val[0];
    setOtpValues(newOtp);

    // رفتن خودکار کرسر به باکس بعدی
    if (idx < 4) {
      const nextInput = document.getElementById(`otp-${idx + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  const isOtpComplete = otpValues.every((v) => v !== "");

  return (
    <div className="relative w-[412px] h-[917px] mx-auto overflow-hidden bg-[#FEF9FE] font-[IRANYekan]">
      {/* لوگو */}
      <img
        src={LogoRiaziNovin}
        alt="logo"
        className="absolute left-[105px] top-[177px] w-[202px] h-[140px] opacity-100"
      />

      {/* تیتر */}
      <h2 className="absolute left-[32px] top-[313px] w-[348px] h-[68px] font-[IRANYekan] font-bold text-[26px] text-[#080609] text-center leading-[100%]">
        کد فعال سازی را وارد کنید.
      </h2>

      {/* متن توضیحی */}
      <p className="absolute left-[32px] top-[377px] w-[347px] h-[56px] text-center text-[#545454] text-[16px] leading-[24px]">
        کدتایید ارسال شده را وارد کنید.
      </p>

      {/* باکس‌های OTP */}
      <div
        className="absolute left-[32px] top-[433px] w-[348px] h-[52px] flex justify-between items-center px-2"
        style={{ opacity: 1 }}
      >
        {otpValues.map((val, idx) => (
          <input
            key={idx}
            id={`otp-${idx}`}
            type="text"
            maxLength={1}
            value={val}
            onChange={(e) => handleChange(e, idx)}
            className="w-[57px] h-[52px] text-center text-[24px] font-[IRANYekan] bg-[#F5C6F0] rounded-[19px] border-none focus:outline-none"
          />
        ))}
      </div>

      {/* تایمر یا ارسال مجدد */}
      {timeLeft > 0 ? (
        <div className="absolute left-[105px] top-[497px] w-[202px] h-[20px] flex items-center justify-center text-[13px] text-[#2C0528] font-[IRANYekan] font-normal leading-[100%]">
          <span className="mr-2">تا دریافت مجدد کد</span>
          <span>{formatTime(timeLeft)}</span>
        </div>
      ) : (
        <div
          className="absolute left-[105px] top-[497px] w-[202px] h-[20px] text-[13px] text-[#00C0D9] font-[IRANYekan] font-normal leading-[100%] text-center cursor-pointer hover:underline"
          onClick={() => setTimeLeft(120)}
        >
          ارسال مجدد کد
        </div>
      )}

      {/* دکمه ورود */}
      <button
        disabled={!isOtpComplete}
        className={`absolute left-[89px] top-[529px] w-[234px] h-[44px] rounded-[18224px] bg-gradient-to-r from-yellow-400 to-yellow-600 font-bold text-black text-[16px] leading-[100%] text-center ${
          !isOtpComplete ? "opacity-50 cursor-not-allowed" : "opacity-100"
        }`}
      >
        ورود
      </button>

      {/* لینک ورود با رمز عبور > */}
      <div className="absolute left-[250px] top-[585px] w-[130px] h-[20px] text-[13px] leading-[100%] cursor-pointer">
        <p
          className="text-right text-[#00C0D9] text-sm cursor-pointer mt-1 hover:underline"
          style={{ direction: "rtl" }}
          onClick={() => (window.location.href = "/login")}
        >
          ورود با رمز عبور &gt;
        </p>
      </div>

      {/* تصویر Guy */}
      <img
        src={Guy}
        alt="Guy"
        className="absolute left-[105px] top-[619px] w-[275px] h-[275px] z-20 object-contain pointer-events-none"
      />
    </div>
  );
}