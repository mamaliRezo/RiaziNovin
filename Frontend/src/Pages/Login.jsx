import TopWave from "../components/TopWave";
import BottomWave from "../components/BottomWave";
import LogoRiaziNovin from "../assets/logoRiazinovin.svg";
import Guy from "../assets/Guy.svg";
import TelephoneIcon from "../assets/TelephoneIcon.svg";
import Calculator from "../assets/Calculator.svg";

export default function Login() {
  return (
    <div className="relative w-[412px] h-[917px] mx-auto overflow-hidden bg-[#FEF9FE] font-[IRANYekan]">
      
      {/* TopWave */}
      {/* <TopWave /> */}

      {/* لوگو */}
      <img
        src={LogoRiaziNovin}
        alt="logo"
        className="absolute left-[105px] top-[177px] w-[202px] h-[140px] opacity-100"
      />

      {/* تیتر */}
      <h2 className="absolute left-[105px] top-[313px] w-[202px] h-[69px] font-[IRANYekan] font-bold text-[31px] text-[#080609] text-center leading-[100%]">
        ورود / ثبت نام
      </h2>

      {/* متن توضیحی */}
      <p className="absolute left-[32px] top-[385px] w-[347px] h-[60px] text-center text-[#545454] text-[16px] leading-[24px] font-[IRANYekan]">
        لطفا شماره تلفن همراه خود را وارد کنید.
      </p>

      {/* input شماره تلفن */}
      <div className="absolute left-[88px] top-[448px] w-[235px] h-[46px] flex items-center justify-center bg-[#F5C6F0] border border-white rounded-full px-3">
        <input
          type="text"
          placeholder="شماره تلفن همراه"
          className="flex-1 text-center text-[16px] font-[400] bg-transparent placeholder-[#646265] leading-[100%] focus:outline-none"
          style={{
            fontFamily: "IRANYekan",
          }}
        />
        <img src={TelephoneIcon} alt="phone" className="w-5 h-5 ml-2" />
      </div>

      {/* دکمه ورود با رمز یکبار مصرف */}
      <button
        className="absolute left-[89px] top-[513px] w-[234px] h-[44px] rounded-[18224px] bg-gradient-to-r from-yellow-400 to-yellow-600 font-bold text-black text-[16px] leading-[100%] text-center"
        style={{
          fontFamily: "IRANYekan",
        }}
      >
        ورود با رمز یکبار مصرف
      </button>

      {/* دکمه ورود با رمز عبور */}
      <button
        className="absolute left-[89px] top-[561px] w-[234px] h-[44px] rounded-[24px] border border-black bg-white text-[16px] font-[400] text-center"
        style={{
          fontFamily: "IRANYekan",
        }}
      >
        ورود با رمز عبور
      </button>

      {/* تصویر Guy */}
      <img
        src={Guy}
        alt="Guy"
        className="absolute left-[105px] top-[619px] w-[275px] h-[275px] z-20 object-contain pointer-events-none"
      />

      {/* BottomWave */}
      {/* <BottomWave /> */}
      
    </div>
  );
}
