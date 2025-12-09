import { useState } from "react";
import LogoRiaziNovin from "../assets/logoRiazinovin.svg";
import Guy from "../assets/Guy.svg";
import TelephoneIcon from "../assets/TelephoneIcon.svg";
import TopWave from "../components/TopWave.jsx";
import BottomWave from "../components/BottomWave.jsx";
import ErrorBox from "../components/ErrorBox.jsx";

export default function Login({ onNext, onPassword }) {
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const BACKEND = "http://localhost:8000";

  // ----------------------------
  // ورود با رمز یکبار مصرف
  // ----------------------------
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
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          phone_email: phone,
          role: "student",
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "خطا در ارتباط با سرور");
        setLoading(false);
        return;
      }

      onNext({
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

  // ----------------------------
  // رفتن به صفحه رمز عبور
  // ----------------------------
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

  // ----------------------------
  // UI اصلی
  // ----------------------------
  return (
    <div className="relative w-[412px] h-[917px] mx-auto bg-[#FEF9FE] font-[BYekan]">
      <TopWave />
      {/* -------------------- باکس خطا -------------------- */}
      {error && <ErrorBox message={error} onClose={() => setError(null)} />}
      {/* لوگو */}
      <img
        src={LogoRiaziNovin}
        alt="logo"
        className="absolute left-[105px] top-[177px] w-[202px] h-[140px]"
      />

      {/* تیتر */}
      <h2 className="absolute left-[105px] top-[313px] w-[202px] h-[69px] font-bold text-[31px] text-[#080609] text-center leading-[100%]">
        ورود / ثبت نام
      </h2>

      {/* متن توضیحی */}
      <p className="absolute left-[32px] top-[385px] w-[347px] h-[60px] text-center text-[#545454] text-[16px] leading-[24px]">
        !لطفا شماره تلفن همراه خود را وارد کنید
      </p>

      {/* input شماره تلفن */}
      <div
        className="absolute left-[88px] top-[448px] w-[235px] h-[46px] flex items-center justify-center bg-[#F5C6F0] rounded-full px-3"
      >
        <input
          type="text"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="شماره تلفن همراه"
          className="flex-1 text-right text-[16px] font-[BYekan] bg-transparent border-none focus:outline-none"
        />
        <img src={TelephoneIcon} alt="phone" className="w-5 h-5 ml-2" />
      </div>

      {/* دکمه ورود با رمز یکبار مصرف */}
      <button
        onClick={handleOTPLogin}
        className="absolute left-[89px] top-[513px] w-[234px] h-[44px] rounded-full font-bold text-black text-[16px] text-center font-[BYekan]"
        style={{
          background: "linear-gradient(154.2deg, #FFCA28 18.04%, #997918 86%)",
          border: "none",
        }}
      >
        {loading ? "در حال ارسال..." : "ورود با رمز یکبار مصرف"}
      </button>

      {/* دکمه ورود با رمز عبور */}
      <button
        onClick={goToPasswordLogin}
        className="absolute left-[89px] top-[561px] w-[234px] h-[44px] rounded-[24px] text-[16px] font-[400] text-center border border-black font-[BYekan]"
        style={{ background: "#FEF9FE" }}
      >
        ورود با رمز عبور
      </button>

      {/* تصویر گای */}
      <img
        src={Guy}
        alt="Guy"
        className="absolute left-[105px] top-[619px] w-[275px] h-[275px] z-20 object-contain"
      />

      {/* موج پایین چسبیده به ته صفحه */}
      <div className="absolute top-[715px] bottom-0 left-0 w-full">
        <BottomWave />
      </div>
    </div>
  );
}
