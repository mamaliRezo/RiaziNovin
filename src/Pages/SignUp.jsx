import LogoRiaziNovin from "../assets/logoRiazinovin.svg";
import Guy from "../assets/Guy.svg";

export default function Signup() {
  return (
    <div className="relative w-[412px] h-[917px] mx-auto overflow-hidden bg-[#FEF9FE] font-[IRANYekan]">
      
      {/* لوگو */}
      <img
        src={LogoRiaziNovin}
        alt="logo"
        className="absolute left-[105px] top-[105px] w-[202px] h-[140px] opacity-100"
      />

      {/* تیتر */}
      <h2 className="absolute left-[105px] top-[237px] w-[202px] h-[69px] font-[IRANYekan] font-bold text-[31px] text-[#080609] text-center leading-[100%]">
        ثبت نام
      </h2>

      {/* متن توضیحی */}
      <p className="absolute left-[29px] top-[297px] w-[347px] h-[60px] text-center text-[#545454] text-[16px] leading-[24px]">
        لطفا اطلاعات خود را وارد کنید.
      </p>

      {/* باکس نام */}
      <div
        className="absolute left-[88px] top-[352px] w-[235px] h-[46px] flex items-center bg-[#F5C6F0] border border-white rounded-[24px] px-3"
      >
        <input
          type="text"
          placeholder="نام"
          className="flex-1 text-center text-[16px] bg-transparent focus:outline-none"
        />
      </div>

      {/* باکس نام خانوادگی */}
      <div
        className="absolute left-[89px] top-[408px] w-[235px] h-[46px] flex items-center bg-[#F5C6F0] border border-white rounded-[24px] px-3"
      >
        <input
          type="text"
          placeholder="نام خانوادگی"
          className="flex-1 text-center text-[16px] bg-transparent focus:outline-none"
        />
      </div>

      {/* دکمه ثبت نام */}
      <button
        className="absolute left-[89px] top-[513px] w-[234px] h-[44px] rounded-[18224px] bg-gradient-to-r from-yellow-400 to-yellow-600 font-bold text-black text-[16px] leading-[100%] text-center"
      >
        ثبت نام
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