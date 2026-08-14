import LogoRiaziNovin from "../../assets/logoRiazinovin.webp";
import profile from "../../assets/profile logo.svg";
import pen from "../../assets/pen logo.svg";
import logOut from "../../assets/exit logo.svg";
export default function Profile() {
  return (
    <div className="relative overflow-hidden w-[412px] h-[917px] mx-auto bg-[#FEF9FE] font-[BYekan]">
      <div className="rounded-b-[8px] w-[348px] h-[61px] items-center justify-center mx-auto shadow-[4px_4px_12px_rgba(0,0,0,0.25)]">
        <img
          src={LogoRiaziNovin}
          alt="logo"
          className="absolute left-[163px] top-[1px] w-[87px] h-[60px]"
        />
      </div>
      <div className="relative rounded-[8px] w-[348px] h-[92px] top-[20px] items-center justify-center mx-auto shadow-[4px_4px_12px_rgba(0,0,0,0.25)]">
        <img
          src={profile}
          alt="Your-Profile"
          className="relative left-[180px] top-[10px] transition-transform duration-300 hover:scale-108 hover:shadow-lg"
        />
        <img
          src={pen}
          alt="edit"
          className="relative  left-[20px] top-[-15px] transition-transform duration-300 hover:scale-120 hover:shadow-lg"
        />
        <button className="relative w-[58px] h-[20px] left-[30px] top-[25px] bg-[#D9D9D9] rounded-[3px] border text-[8.5px] font-[BYekan] transition-transform duration-300 hover:scale-110 hover:shadow-lg">
          تغییر رمز عبور
        </button>
      </div>
      <div className="relative rounded-[8px] w-[348px] h-[320px] top-[30px] items-center justify-center mx-auto shadow-[4px_4px_12px_rgba(0,0,0,0.25)]">
        <p className=" relative left-[88px] top-[5px] text-[14px]">
          اطلاعات تکمیلی
        </p>
        <p
          dir="rtl"
          className="relative text-right text-[10px] left-[-50px] font-normal"
        >
          برای تکمیل اطلاعات پروفایل خود، لطفا کد ملی و تاریخ تولد خود را
          <br /> وارد کنید.
        </p>
        <p className="relative left-[110px] top-[-5px] text-[11px] font-bold">
          کدملی
        </p>
        <input
          type="password"
          inputMode="numeric"
          maxLength={10}
          className="relative w-[235px] h-[21px] top-[-14px] rounded-[7px] text-[10px] px-3 font-[BYekan] border-1 border-[#000000] bg-[#FFFFFF] focus:outline-none"
        />
        <p className="relative left-[103px] top-[-22px] text-[11px] font-bold">
          سال تولد
        </p>
        <input className="relative  w-[235px] h-[21px] top-[-30px] rounded-[7px] text-[10px] px-3 font-[BYekan] border-1 border-[#000000] bg-[#FFFFFF] focus:outline-none" />
        <p className="relative left-[103px] top-[-40px] text-[11px] font-bold">
          ماه تولد
        </p>
        <input className="relative  w-[235px] h-[21px] top-[-50px] rounded-[7px] text-[10px] px-3 font-[BYekan] border-1 border-[#000000] bg-[#FFFFFF] focus:outline-none" />
        <p className="relative left-[103px] top-[-60px] text-[11px] font-bold">
          روز تولد
        </p>
        <input className="relative  w-[235px] h-[21px] top-[-70px] rounded-[7px] text-[10px] px-3 font-[BYekan] border-1 border-[#000000] bg-[#FFFFFF] focus:outline-none" />

        <button className="relative w-[240px] h-[20px] top-[-60px] rounded-[6px] border-none bg-[#FFCA28] font-[BYekan]">
          ثبت
        </button>
      </div>
      <div className="relative rounded-[8px] w-[348px] h-[240px] top-[40px] items-center justify-center mx-auto shadow-[4px_4px_12px_rgba(0,0,0,0.25)]">
        <p className=" relative left-[85px] top-[5px] text-[14px]">
          اطلاعات تحصیلی
        </p>
        <p
          dir="rtl"
          className="relative text-right text-[10px] left-[-50px] font-normal"
        >
          لطفا قبل از ادامه کار با پنل کاربریتان، رشته و پایه خود را بروزرسانی
          <br /> کنید.
        </p>
        <p className="relative left-[95px] top-[8px] text-[11px] font-bold">
          مقطع تحصیلی
        </p>
        <input className="relative  w-[235px] h-[21px] top-[2px] rounded-[7px] text-[10px] px-3 font-[BYekan] border-1 border-[#000000] bg-[#FFFFFF] focus:outline-none" />
        <p className="relative left-[108px] top-[-5px] text-[11px] font-bold">
          رشته
        </p>
        <input className="relative  w-[235px] h-[21px] top-[-15px] rounded-[7px] text-[10px] px-3 font-[BYekan] border-1 border-[#000000] bg-[#FFFFFF] focus:outline-none" />
        <button className="relative w-[240px] h-[20px] top-[-5px] rounded-[6px] border-none bg-[#FFCA28] font-[BYekan]">
          بروزرسانی اطلاعات
        </button>
      </div>
      <div className="relative rounded-[8px] w-[348px] h-[56px] top-[50px] items-center justify-center mx-auto shadow-[4px_4px_12px_rgba(0,0,0,0.25)]">
        <img
          src={logOut}
          alt="logOut"
          className="relative top-[15px] left-[105px]"
        />
        <p className="relative top-[-30px] left-[72px]">خروج</p>
      </div>
      <div className="relative rounded-t-[8px] w-[348px] h-[228px] top-[95px] items-center justify-center mx-auto shadow-[4px_4px_12px_rgba(0,0,0,0.25)]"></div>
    </div>
  );
}
