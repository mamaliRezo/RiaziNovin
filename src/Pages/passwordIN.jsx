import LogoRiaziNovin from "../assets/logoRiazinovin.svg";
import Guy from "../assets/Guy.svg";
import TopWave from "../components/TopWave.jsx";
import BottomWave from "../components/BottomWave.jsx";

export default function PasswordIN() {
  return (
    <div className="relative w-[412px] h-[917px] mx-auto overflow-hidden font-[BYekan] bg-[#FEF9FE]">
      <TopWave/>
      {/* لوگو */}
      <img
        src={LogoRiaziNovin}
        alt="logo"
        className="absolute left-[105px] top-[177px] w-[202px] h-[140px] opacity-100"
      />

      {/* تیتر */}
      <h2 className="absolute left-[105px] top-[353px] w-[202px] h-[60px] text-[31px] font-bold text-[#080609]  text-center leading-[100%]">
        ورود با رمز عبور
      </h2>

      {/* باکس رمز عبور */}
      <div
        className="absolute left-[88px] top-[433px] w-[235px] h-[46px] flex items-center bg-[#F5C6F0] border-none border-white rounded-[24px] px-3"
      >
        <input
          type="password"
          placeholder="رمز عبور"
          style={{padding: "4px 10px"}}
          className="flex-1 text-right text-[16px] font-[BYekan] bg-transparent border-none focus:outline-none"
        />
      </div>

        {/* دکمه ورود */}
    <button
        className="absolute left-[89px] top-[487px] w-[234px] h-[44px] rounded-[18224px] bg-gradient-to-r from-yellow-400 to-yellow-600 font-[BYekan] font-bold text-black text-[16px] leading-[100%] text-center"
          style={{
          background: "linear-gradient(154.2deg, #FFCA28 18.04%, #997918 86%)",
          border: "none"
        }}
    >
        ورود
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