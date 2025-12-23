import { useState } from "react";
import LogoRiaziNovin from "../assets/logoRiazinovin.svg";
import Guy from "../assets/Guy.svg";
import TelephoneIcon from "../assets/TelephoneIcon.svg";
import TopWave from "../components/TopWave.jsx";
import BottomWave from "../components/BottomWave.jsx";
import ErrorBox from "../components/ErrorBox.jsx";

export default function Login({ onOTP, onPassword, onSignup }) {
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const BACKEND = "http://localhost:8000";

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
      onOTP({
        phone_email: phone,
        role: "student",
        data,
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

    onPassword({
      phone_email: phone,
      role: "student",
    });
  }

  function goToSignUpLogin() {
    setError(null);
    if (!phone.trim()) {
      setError("اول شماره تلفن را وارد کنید");
      return;
    }
    onSignup({
      phone_email: phone,
      role: "student",
    });
  }

  return (
    <div className="relative w-[412px] h-[917px] mx-auto bg-[#FEF9FE] font-[BYekan]">
      <TopWave />
      {error && <ErrorBox message={error} onClose={() => setError(null)} />}
      <img
        src={LogoRiaziNovin}
        alt="logo"
        className="absolute left-[105px] top-[145px] w-[202px] h-[140px]"
      />

      <h2 className="absolute left-[105px] top-[281px] w-[202px] h-[69px] font-bold text-[31px] text-[#080609] text-center leading-[100%]">
        ورود
      </h2>

      <p className="absolute left-[32px] top-[353px] w-[347px] h-[60px] text-center text-[#545454] text-[16px] leading-[24px]">
        لطفا شماره تلفن همراه خود را وارد کنید
      </p>

      <div className="absolute left-[88px] top-[416px] w-[235px] h-[46px] flex items-center justify-center bg-[#F5C6F0] rounded-full px-3">
        <input
          type="text"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="شماره تلفن همراه"
          style={{ padding: "4px 7px" }}
          className="flex-1 text-right text-[16px] font-[BYekan] bg-transparent border-none focus:outline-none"
        />
        <img
          src={TelephoneIcon}
          alt="phone"
          style={{ padding: "4px 10px" }}
          className="w-5 h-5 ml-2"
        />
      </div>

      <button
        onClick={handleOTPLogin}
        className="absolute left-[89px] top-[481px] w-[234px] h-[44px] rounded-full font-bold text-black text-[16px] text-center font-[BYekan]"
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
        className="absolute left-[89px] top-[529px] w-[234px] h-[44px] rounded-[24px] text-[16px] font-[400] text-center border border-black font-[BYekan]"
        style={{ background: "#FEF9FE" }}
      >
        ورود با رمز عبور
      </button>
      {/* لینک ایجاد حساب کاربری > */}
      <div className="absolute left-[178px] top-[585px] w-[129px] h-[20px] text-[13px] leading-[100%] cursor-pointer">
        <p
          className="text-right text-[#00C0D9] text-sm cursor-pointer mt-1 hover:underline"
          style={{ direction: "rtl" }}
          onClick={goToSignUpLogin}
        >
          ایجاد حساب کاربری &gt;
        </p>
      </div>

      <img
        src={Guy}
        alt="Guy"
        className="absolute left-[105px] top-[619px] w-[275px] h-[275px] z-20 object-contain"
      />

      <div className="absolute top-[715px] bottom-0 left-0 w-full">
        <BottomWave />
      </div>
    </div>
  );
}
