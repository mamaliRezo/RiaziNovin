import { useState } from "react";
import { useNavigate } from "react-router-dom";
import LogoRiaziNovin from "../../assets/logoRiazinovin.webp";
import Guy from "../../assets/Guy.webp";
import TelephoneIcon from "../../assets/TelephoneIcon.svg";
import TopWave from "../../components/section/TopWave.jsx";
import ErrorBox from "../../components/common/ErrorBox.jsx";
import { BACKEND_ORIGIN } from "../../config.js";

export default function Login() {
  const navigate = useNavigate();
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const BACKEND = BACKEND_ORIGIN;

  async function handleOTPLogin() {
    setError(null);

    if (!phone.trim()) {
      setError("لطفا شماره تلفن را وارد کنید");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${BACKEND}/api/check-user/`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          phone_email: phone,
          role: "student",
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "خطا");
        setLoading(false);
        return;
      }
      navigate("/otp", {
        state: {
          phone_email: phone,
          role: "student",
          fromPage: "login",
        },
      });
    } catch (err) {
      console.log(err);
      setError("مشکل در اتصال به سرور");
    }
    setLoading(false);
  }

  function goToPasswordLogin() {
    setError(null);

    if (!phone.trim()) {
      setError("اول شماره تلفن را وارد کنید");
      return;
    }

    navigate("/password", {
      state: {
        phone_email: phone,
        role: "student",
      },
    });
  }

  function goToSignUpLogin() {
    setError(null);
    if (!phone.trim()) {
      setError("اول شماره تلفن را وارد کنید");
      return;
    }
    navigate("/signup", {
      state: {
        phone_email: phone,
        role: "student",
      },
    });
  }

  return (
    <div className="relative w-full max-w-[412px] mx-auto bg-[#FEF9FE] font-[BYekan]">
      <TopWave />
      {error && <ErrorBox message={error} onClose={() => setError(null)} />}

      <div className="flex flex-col items-center px-6 pb-10" dir="rtl">
        <img src={LogoRiaziNovin} alt="logo" className="w-[150px] h-auto mt-2 mb-6" />

        <h2 className="font-bold text-[26px] text-[#080609] text-center mb-2">
          ورود
        </h2>

        <p className="text-center text-[#545454] text-[15px] leading-[24px] mb-6">
          لطفا شماره تلفن همراه خود را وارد کنید
        </p>

        <div className="w-full max-w-[235px] h-[46px] flex items-center justify-center bg-[#F5C6F0] rounded-full px-3 mb-4">
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="شماره تلفن همراه"
            style={{ padding: "4px 7px" }}
            className="flex-1 text-right text-[16px] font-[BYekan] bg-transparent border-none focus:outline-none"
          />
          <img src={TelephoneIcon} alt="phone" style={{ padding: "4px 10px" }} className="w-5 h-5 ml-2" />
        </div>

        <button
          onClick={handleOTPLogin}
          disabled={loading}
          className="w-full max-w-[234px] h-[44px] rounded-full font-bold text-black text-[16px] text-center font-[BYekan] mb-3"
          style={{
            direction: "rtl",
            background: "linear-gradient(154.2deg, #FFCA28 18.04%, #997918 86%)",
            border: "none",
          }}
        >
          {loading ? "در حال بررسی..." : "ورود با رمز یکبار مصرف"}
        </button>

        <button
          onClick={goToPasswordLogin}
          className="w-full max-w-[234px] h-[44px] rounded-[24px] text-[16px] font-[400] text-center border border-black font-[BYekan] mb-4"
          style={{ background: "#FEF9FE" }}
        >
          ورود با رمز عبور
        </button>

        <p
          className="text-right text-[#00C0D9] text-sm cursor-pointer hover:underline mb-6"
          style={{ direction: "rtl" }}
          onClick={goToSignUpLogin}
        >
          ایجاد حساب کاربری &gt;
        </p>

        <img src={Guy} alt="Guy" className="w-[180px] h-auto object-contain" />
      </div>
    </div>
  );
}
