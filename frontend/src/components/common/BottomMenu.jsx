import { useState } from "react";

import ActiveHome from "../../assets/ActiveHome.svg";
import ActiveProfile from "../../assets/ActiveProfile.png";
import ActiveCourse from "../../assets/myCourses.svg";
import ActiveShop from "../../assets/ActiveShop.svg";

import DeActiveHome from "../../assets/DeActiveHome.svg";
import DeActiveProfileCheck from "../../assets/DeActiveProfileCheck.svg";
import DeActiveShop from "../../assets/DeActiveShop.svg";
import DeActiveCourses from "../../assets/DeActiveCourses.svg";

export default function BottomMenu({ gotoDashboard, gotoComingSoon, gotoProfile }) {
  const [activeItem, setActiveItem] = useState("دوره های من");

  const menuItems = [
    {
      text: "خانه",
      icon: DeActiveHome,
      activeIcon: ActiveHome,
      size: 24,
      onClick: gotoComingSoon,
    },
    {
      text: "دوره های من",
      icon: DeActiveCourses,
      activeIcon: ActiveCourse,
      size: 24,
      onClick: gotoDashboard,
    },
    {
      text: "فروشگاه",
      icon: DeActiveShop,
      activeIcon: ActiveShop,
      size: 20,
      onClick: gotoComingSoon,
    },
    {
      text: "پروفایل",
      icon: DeActiveProfileCheck,
      activeIcon: ActiveProfile,
      size: 24,
      onClick: gotoProfile,
    },
  ];
  
  return (
    <div className="flex justify-center items-center h-full">
      <div className="w-[300px] flex justify-between items-end pb-2">
        {menuItems.map((item, i) => {
          const isActive = activeItem === item.text;

          return (
            <div
              key={i}
              onClick={() => {
                setActiveItem(item.text);
                item.onClick();
              }}
              className="flex flex-col items-center cursor-pointer"
            >
              <img
                src={isActive ? item.activeIcon : item.icon}
                style={{ width: `${item.size}px` }}
                className="mt-1"
                alt={item.text}
              />

              <p
                className={`text-[11px] mt-1 ${
                  isActive ? "text-[#00C0D9] font-bold" : "text-[#C90BBCC9]"
                }`}
              >
                {item.text}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
