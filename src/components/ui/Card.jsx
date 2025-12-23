export default function Card({ title, style, fontSize = "21px", onClick }) {
  return (
    <div
      style={{
        width: "130px",
        height: "131.73px",
        background: "#C90BBC",
        borderRadius: "12px",
        boxShadow: "10px 10px 10px 2px #00000040",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxSizing: "border-box",
        cursor: onClick ? "pointer" : "default", // اگه کلیک داشت pointer باشه
        ...style,
      }}
      onClick={onClick}
    >
      <p
        style={{
          color: "white",
          fontWeight: "bold",
          fontSize: fontSize,
          textAlign: "center",
        }}
      >
        {title}
      </p>
    </div>
  );
}
