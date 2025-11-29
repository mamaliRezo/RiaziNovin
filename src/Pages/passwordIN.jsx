import LogoRiaziNovin from "../assets/logoRiazinovin.svg";
import Guy from "../assets/Guy.svg";

export default function PasswordIN() {
  return (
    <div className="relative w-[412px] h-[917px] mx-auto overflow-hidden bg-[#FEF9FE] font-[IRANYekan]">
      
      {/* لوگو */}
      <img
        src={LogoRiaziNovin}
        alt="logo"
        className="absolute left-[105px] top-[177px] w-[202px] h-[140px] opacity-100"
      />

      {/* تیتر */}
      <h2 className="absolute left-[105px] top-[353px] w-[202px] h-[60px] text-[31px] font-bold text-[#080609] text-center leading-[100%]">
        ورود با رمز عبور
      </h2>

      {/* باکس رمز عبور */}
      <div
        className="absolute left-[88px] top-[433px] w-[235px] h-[46px] flex items-center bg-[#F5C6F0] border border-white rounded-[24px] px-3"
      >
        <input
          type="password"
          placeholder="رمز عبور"
          className="flex-1 text-center text-[16px] bg-transparent placeholder-[#646265] focus:outline-none"
        />
      </div>

        {/* دکمه ورود */}
    <button
        className="absolute left-[89px] top-[487px] w-[234px] h-[44px] rounded-[18224px] bg-gradient-to-r from-yellow-400 to-yellow-600 font-bold text-black text-[16px] leading-[100%] text-center"
    >
        ورود
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