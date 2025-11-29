export default function BottomMenu() {
  return (
    <div
      style={{
        position: "absolute",
        bottom: "0px",
        width: "100%",
        height: "70px",
        background: "white",
        display: "flex",
        justifyContent: "space-between",
        padding: "0 40px",
        paddingTop: "10px",
        boxShadow: "0px -2px 6px rgba(0,0,0,0.1)",
      }}
    >
      {[
        { icon: "/home.png", text: "خانه" },
        { icon: "/play.png", text: "دوره‌های من" },
        { icon: "/cart.png", text: "فروشگاه" },
        { icon: "/profile.png", text: "پروفایل" },
      ].map((item, i) => (
        <div key={i} style={{ textAlign: "center" }}>
          <img src={item.icon} style={{ width: "26px" }} />
          <p style={{ fontSize: "12px", marginTop: "3px" }}>{item.text}</p>
        </div>
      ))}
    </div>
  );
}
