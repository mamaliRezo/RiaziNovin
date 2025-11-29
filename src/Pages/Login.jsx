import LogoRiaziNovin from "../assets/logoRiazinovin.svg";
import Guy from "../assets/Guy.svg";
import TelephoneIcon from "../assets/TelephoneIcon.svg";

export default function Login() {
  return (
    <div className="relative w-[412px] h-[917px] mx-auto overflow-hidden bg-[#FEF9FE] font-[IRANYekan]">

      {/* لوگو */}
      <img
        src={LogoRiaziNovin}
        alt="logo"
        className="absolute left-[105px] top-[177px] w-[202px] h-[140px] opacity-100"
      />

      {/* تیتر */}
      <h2 className="absolute left-[105px] top-[313px] w-[202px] h-[69px] font-bold text-[31px] text-[#080609] text-center leading-[100%]">
        ورود / ثبت نام
      </h2>

      {/* متن توضیحی */}
      <p className="absolute left-[32px] top-[385px] w-[347px] h-[60px] text-center text-[#545454] text-[16px] leading-[24px]">
        لطفا شماره تلفن همراه خود را وارد کنید.
      </p>

      {/* input شماره تلفن با کانتینر رنگی و border سفید */}
      <div
        className="absolute left-[88px] top-[448px] w-[235px] h-[46px] flex items-center justify-center bg-[#F5C6F0] rounded-full px-3"
        style={{ border: "1px solid #FFFFFF" }}
      >
        <input
          type="text"
          placeholder="شماره تلفن همراه"
          className="flex-1 text-center text-[16px] font-[400] bg-transparent border-none p-0 m-0 placeholder-[#646265] leading-[46px] focus:outline-none"
          style={{ fontFamily: "IRANYekan" }}
        />
        <img src={TelephoneIcon} alt="phone" className="w-5 h-5 ml-2" />
      </div>

      {/* دکمه ورود با رمز یکبار مصرف بدون border */}
      <button
        className="absolute left-[89px] top-[513px] w-[234px] h-[44px] rounded-full font-bold text-black text-[16px] leading-[100%] text-center"
        style={{
          fontFamily: "IRANYekan",
          background: "linear-gradient(154.2deg, #FFCA28 18.04%, #997918 86%)",
          border: "none"
        }}
      >
        ورود با رمز یکبار مصرف
      </button>

      {/* دکمه ورود با رمز عبور با background مشابه صفحه */}
      <button
        className="absolute left-[89px] top-[561px] w-[234px] h-[44px] rounded-[24px] text-[16px] font-[400] text-center"
        style={{
          fontFamily: "IRANYekan",
          background: "#FEF9FE",
          border: "1px solid #000000",
          color: "#000000" // متن مشکی برای خوانایی
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

    </div>
  );
}
