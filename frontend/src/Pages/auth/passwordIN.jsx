import { useState } from "react";
import LogoRiaziNovin from "../../assets/logoRiazinovin.svg";
import Guy from "../../assets/Guy.svg";
import TopWave from "../../components/section/TopWave.jsx";
import BottomWave from "../../components/section/BottomWave.jsx";
import ErrorBox from "../../components/common/ErrorBox.jsx";

export default function PasswordIN({ phone_email, onSuccess, goToOTP }) {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const BACKEND = "http://localhost:8000";

  const handleLogin = async () => {
    setError(null);

    if (!password.trim()) {
      setError("لطفا رمز عبور را وارد کنید");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(`${BACKEND}/api/verify-password/`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          phone_email,
          password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "خطا");
        setLoading(false);
        return;
      }

      onSuccess();
    } catch {
      setError("مشکل در اتصال به سرور");
    }

    setLoading(false);
  };

  const handleGoToOTP = async () => {
    setError(null);
    setLoading(true);

    try {
      const res = await fetch(`${BACKEND}/api/check-user/`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          phone_email,
          role: "student",
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "خطا");
        setLoading(false);
        return;
      }
      goToOTP({
        phone_email,
        role: "student",
        data,
      });
    } catch (err) {
      console.log(err);
      setError("مشکل در اتصال به سرور");
    }

    setLoading(false);
  };

  return (
    <div className="relative w-[412px] h-[917px] mx-auto overflow-hidden font-[BYekan] bg-[#FEF9FE]">
      <TopWave />
      {error && <ErrorBox message={error} onClose={() => setError(null)} />}

      <img
        src={LogoRiaziNovin}
        alt="logo"
        className="absolute left-[105px] top-[177px] w-[202px] h-[140px]"
      />

      <h2 className="absolute left-[105px] top-[353px] w-[202px] h-[60px] text-[31px] font-bold text-[#080609] text-center leading-[100%]">
        ورود با رمز عبور
      </h2>

      <div className="absolute left-[88px] top-[433px] w-[235px] h-[46px] flex items-center bg-[#F5C6F0] border-none rounded-[24px] px-3">
        <input
          type="password"
          placeholder="رمز عبور"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="flex-1 text-right text-[16px] font-[BYekan] bg-transparent border-none focus:outline-none"
          style={{ padding: "4px 10px" }}
        />
      </div>

      <button
        onClick={handleLogin}
        disabled={loading}
        className="absolute left-[89px] top-[487px] w-[234px] h-[44px] rounded-[18224px] font-[BYekan] font-bold text-black text-[16px] leading-[100%] text-center"
        style={{
          direction: "rtl",
          background: "linear-gradient(154.2deg, #FFCA28 18.04%, #997918 86%)",
          border: "none",
        }}
      >
        {loading ? "در حال بررسی..." : "ورود"}
      </button>
      {/* لینک ورود با کد تایید > */}
      <div className="absolute left-[240px] top-[569px] w-[130px] h-[20px] text-[13px] leading-[100%] cursor-pointer">
        <p
          className="text-right text-[#00C0D9] text-sm cursor-pointer mt-1 hover:underline"
          style={{ direction: "rtl" }}
          onClick={handleGoToOTP}
        >
          ورود با کد تایید &gt;
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
