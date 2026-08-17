import { useNavigate, useLocation } from "react-router-dom";
import { useNavItems } from "../../hooks/useNavItems";
import logo from "../../assets/logoRiazinovin.webp";

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const menuItems = useNavItems();

  return (
    <div
      dir="rtl"
      className="h-full flex flex-col gap-1 py-6 px-3"
      style={{ borderLeft: "0.5px solid #0000001a" }}
    >
      <div className="flex items-center gap-2 px-2 pb-6">
        <img src={logo} alt="ریاضی نوین" className="w-8 h-8" />
        <span className="font-bold text-[15px] text-[#080609]">ریاضی نوین</span>
      </div>

      {menuItems.map((item, i) => {
        const isActive = location.pathname === item.path;
        return (
          <div
            key={i}
            onClick={() => navigate(item.path)}
            className="flex items-center gap-3 px-3 py-2.5 rounded-[10px] cursor-pointer transition-colors"
            style={{
              background: isActive ? "#FCE9FC" : "transparent",
              color: isActive ? "#C90BBC" : "#545454",
            }}
          >
            <img
              src={isActive ? item.activeIcon : item.icon}
              style={{ width: "20px" }}
              alt=""
            />
            <span className={`text-[14px] ${isActive ? "font-bold" : ""}`}>
              {item.text}
            </span>
          </div>
        );
      })}
    </div>
  );
}
