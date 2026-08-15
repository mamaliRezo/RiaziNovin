export default function PackageCard({
  img,
  title,
  teacherName,
  coursesCount,
  enrolledCount,
  price,
  onClick,
}) {
  return (
    <div
      onClick={onClick}
      style={{
        width: "348px",
        height: "276px",
        background: "#E5A6E6",
        borderRadius: "48px",
        display: "flex",
        flexDirection: "column",
        margin: "-8px 32px 15px auto",
        overflow: "hidden",
        cursor: "pointer",
      }}
    >
      <div style={{ height: "50%", width: "100%" }}>
        <img
          src={img}
          alt={title}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </div>

      <div
        style={{
          padding: "12px",
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <div>
          <h3 style={{ fontSize: "18px", fontWeight: "bold", color: "#000000", margin: 0 }}>
            {title}
          </h3>
        </div>

        <div
          style={{
            marginTop: "12px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: "16px",
            fontWeight: "bold",
            padding: "0 12px",
          }}
        >
          <span style={{ direction: "rtl", color: "#C90BBC" }}>
            {coursesCount ?? 0} دوره
          </span>
          <span style={{ color: "#00C0D9" }}>مدرس: {teacherName || "—"}</span>
        </div>

        {typeof enrolledCount === "number" && (
          <div style={{ fontSize: "13px", color: "#555", marginTop: "4px" }}>
            {enrolledCount} دانش‌آموز ثبت‌نام کرده
          </div>
        )}

        <div
          style={{
            marginTop: "8px",
            fontSize: "16px",
            fontWeight: "bold",
            color: price > 0 ? "#C90BBC" : "#0a8f3c",
          }}
        >
          {price > 0 ? `${price.toLocaleString("fa-IR")} تومان` : "رایگان"}
        </div>
      </div>
    </div>
  );
}
