import LogoRiaziNovin from "../../assets/logoRiazinovin.svg";
import BottomMenu from "../../components/common/BottomMenu";

export default function ComingSoon({ gotoDashboard }) {
  return (
    <div className="relative w-[412px] h-[917px] mx-auto bg-[#FEF9FE] font-[BYekan] flex flex-col items-center justify-center">
      {/* لوگو */}
      <img
        src={LogoRiaziNovin}
        alt="logo"
        className="w-[202px] h-[140px] mb-8"
      />

      {/* تیتر */}
      <h1 className="text-[32px] font-bold text-[#080609] text-center mb-4">
        comming soon!
      </h1>

      {/* توضیح */}
      <p className="text-[16px] text-center text-[#545454] mb-6 px-4">
        این بخش در حال آماده‌سازی است. لطفاً بعداً دوباره بررسی کنید
      </p>

      {/* منوی پایین ثابت */}
      <div
        style={{
          position: "fixed",
          bottom: 0,
          left: "50%",
          transform: "translateX(-50%)",
          width: "412px",
          background: "#FEF9FE",
          zIndex: 20,
        }}
      >
        <BottomMenu gotoDashboard={gotoDashboard} />
      </div>
    </div>
  );
}
