import ActiveHome from "../assets/ActiveHome.svg";
import DeActiveProfileCheck from "../assets/DeActiveProfileCheck.svg";
import DeActiveShop from "../assets/DeActiveShop.svg";
import DeActiveCourses from "../assets/DeActiveCourses.svg";

export default function BottomMenu({ gotoDashboard }) {
  const menuItems = [
    { icon: ActiveHome, text: "خانه", active: true, onClick: gotoDashboard, size: 32 },
    { icon: DeActiveShop, text: "فروشگاه", active: false, size: 24 },
    { icon: DeActiveProfileCheck, text: "پروفایل", active: false, size: 28 },
  ];

  return (
    <div
      style={{
        position: "fixed", // باید fixed باشه تا همیشه روی صفحه باشه
        bottom: "0",
        left: "0",
        right: "0",
        height: "70px",
        background: "#FEF9FE",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 100, // مطمئن میشه روی همه باشه
      }}
    >
      <div
        style={{
          width: "280px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center"
        }}
      >
        {menuItems.map((item, i) => (
          <div
            key={i}
            onClick={item.onClick} // فعال کردن کلیک
            style={{
              textAlign: "center",
              cursor: item.onClick ? "pointer" : "default",
            }}
          >
            <img
              src={item.icon}
              style={{
                width: `${item.size}px`,
                height: "auto",
                opacity: 1,
              }}
            />
            <p
              style={{
                fontSize: "12px",
                marginTop: "3px",
                color: item.active ? "#00C0D9" : "#C90BBCC9",
                fontWeight: item.active ? "bold" : "normal",
              }}
            >
              {item.text}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
