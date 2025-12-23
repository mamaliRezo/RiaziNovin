import ActiveHome from "../assets/ActiveHome.svg";
import DeActiveProfileCheck from "../assets/DeActiveProfileCheck.svg";
import DeActiveShop from "../assets/DeActiveShop.svg";
import DeActiveCourses from "../assets/DeActiveCourses.svg";

export default function BottomMenu({ gotoDashboard }) {
  const menuItems = [
    { icon: ActiveHome, text: "خانه", active: true, onClick: gotoDashboard, size: 24 },
    { icon: DeActiveShop, text: "فروشگاه", active: false, size: 20 },
    { icon: DeActiveProfileCheck, text: "پروفایل", active: false, size: 24 },
  ];

  return (
    <div className="bg-white flex justify-center items-center">
      <div className="w-[280px] flex justify-between items-center">
        {menuItems.map((item, i) => (
          <div
            key={i}
            onClick={item.onClick}
            className="text-center cursor-pointer"
          >
            <img 
              src={item.icon} 
              className="w-auto" 
              style={{ width: `${item.size}px` }} 
            />
            <p className={`
              text-xs mt-1
              ${item.active 
                ? "text-[#00C0D9] font-bold" 
                : "text-[#C90BBCC9]"}
            `}>
              {item.text}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}