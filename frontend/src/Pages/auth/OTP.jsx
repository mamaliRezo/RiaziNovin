import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import LogoRiaziNovin from "../../assets/logoRiazinovin.webp";
import Guy from "../../assets/Guy.webp";
import TopWave from "../../components/section/TopWave.jsx";
import ErrorBox from "../../components/common/ErrorBox.jsx";
import { BACKEND_ORIGIN } from "../../config.js";
import { useAuth } from "../../contexts/AuthContext.jsx";

export default function OTP() {
  const navigate = useNavigate();
  const location = useLocation();
  const { verifyOtp } = useAuth();

  // اینا همه از صفحه‌ی قبل (Login یا SignUp) با navigate state میان،
  // نه به‌عنوان prop مستقیم (چون AppRoutes بدون prop رندرش می‌کنه)
  const phone_email = location.state?.phone_email || "";
  const role = location.state?.role || "student";
  const fromPage = location.state?.fromPage || "login";
  const first_name = location.state?.first_name || "";
  const last_name = location.state?.last_name || "";

  const [timeLeft, setTimeLeft] = useState(120);
  const [otpValues, setOtpValues] = useState(["", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const BACKEND = BACKEND_ORIGIN;

  useEffect(() => {
    if (timeLeft <= 0) return;
    const timer = setInterval(() => setTimeLeft((p) => p - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const formatTime = (s) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m}:${sec < 10 ? "0" : ""}${sec}`;
  };

  const otpComplete = otpValues.every((v) => v !== "");
  const otpCode = otpValues.join("");

  async function submitOTP() {
    if (!otpComplete) return;

    if (!phone_email) {
      setError("شماره تلفن مشخص نیست، لطفا از اول شروع کنید");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      await verifyOtp({
        phone_email,
        otp: otpCode,
        action: fromPage === "signup" ? "signup" : "login",
        role,
        first_name,
        last_name,
      });
      // verifyOtp خودش بر اساس نقش به داشبورد درست هدایت می‌کنه
    } catch (err) {
      setError(
        err?.response?.data?.message || "کد اشتباه یا منقضی شده است"
      );
    }

    setLoading(false);
  }

  async function resendOTP() {
    setTimeLeft(120);
    setError(null);

    await fetch(`${BACKEND}/api/resend-otp/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        phone_email,
        role,
      }),
    });
  }

  return (
    <div className="relative w-full max-w-[412px] mx-auto bg-[#FEF9FE] font-[BYekan]">
      <TopWave />
      {error && <ErrorBox message={error} onClose={() => setError(null)} />}

      <div className="flex flex-col items-center px-6 pb-10" dir="rtl">
        <img src={LogoRiaziNovin} alt="logo" className="w-[150px] h-auto mt-2 mb-6" />

        <h2 className="text-center font-bold text-[22px] text-[#080609] mb-2">
          کد فعال سازی را وارد کنید
        </h2>

        {fromPage === "login" && (
          <p className="text-center text-[#545454] text-[14px] mb-6">
            کد تایید ارسال شده را وارد کنید
          </p>
        )}

        {fromPage === "signup" && (
          <p className="text-center text-[#545454] text-[14px] mb-6">
            برای ثبت نام کد تایید را وارد کنید
          </p>
        )}

        <div className="w-full max-w-[348px] flex justify-between mb-4" dir="ltr">
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
              style={{ border: "none" }}
              className="w-[15%] max-w-[57px] h-[52px] text-center text-[22px] bg-[#F5C6F0] rounded-[19px] focus:outline-none"
            />
          ))}
        </div>

        {timeLeft > 0 ? (
          <div className="text-center text-[13px] text-[#2C0528] mb-6">
            تا دریافت مجدد کد {formatTime(timeLeft)}
          </div>
        ) : (
          <div
            onClick={resendOTP}
            className="text-center text-[#00C0D9] text-[13px] cursor-pointer hover:underline mb-6"
          >
            ارسال مجدد کد
          </div>
        )}

        <button
          onClick={submitOTP}
          disabled={!otpComplete || loading}
          className="w-full max-w-[234px] h-[44px] rounded-full font-[BYekan] font-bold text-[16px] mb-4"
          style={{
            direction: "rtl",
            background: "linear-gradient(154.2deg, #FFCA28 18.04%, #997918 86%)",
            border: "none",
            opacity: !otpComplete ? 0.5 : 1,
            cursor: !otpComplete ? "not-allowed" : "pointer",
          }}
        >
          {loading ? "در حال بررسی..." : "ورود"}
        </button>

        {fromPage === "login" && (
          <p
            className="text-[#00C0D9] text-sm cursor-pointer hover:underline mb-6"
            onClick={() => navigate("/password", { state: { phone_email, role } })}
          >
            ورود با رمز عبور &gt;
          </p>
        )}

        <img src={Guy} alt="Guy" className="w-[180px] h-auto object-contain" />
      </div>
    </div>
  );
}
