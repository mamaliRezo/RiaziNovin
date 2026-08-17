import { useNavigate, useLocation } from "react-router-dom";
import { useNavItems } from "../../hooks/useNavItems";

// این کامپوننت فقط رو موبایل/تبلت دیده می‌شه (md:hidden از AppShell میاد)؛
// رو دسکتاپ به‌جاش Sidebar.jsx هست.
export default function BottomMenu() {
  const navigate = useNavigate();
  const location = useLocation();
  const menuItems = useNavItems();

  return (
    <div className="flex justify-center items-center h-full">
      <div className="w-[300px] flex justify-between items-end pb-2">
        {menuItems.map((item, i) => {
          const isActive = location.pathname === item.path;

          return (
            <div
              key={i}
              onClick={() => navigate(item.path)}
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
