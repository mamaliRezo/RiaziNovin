export default function CourseCard({
  img,
  title,
  desc,
  onClick,
  sessionsCount,
  teacherName,
}) {
  return (
    <div
      onClick={onClick} // کلیک روی کل کارت
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
      {/* تصویر بالای کارت */}
      <div style={{ height: "50%", width: "100%" }}>
        <img
          src={img}
          alt={title}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      </div>

      {/* بخش متن */}
      <div style={{ padding: "12px", flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
        <div>
          <h3 style={{ fontSize: "18px", fontWeight: "bold", color: "#000000", margin: 0 }}>
            {title}
          </h3>
          <p style={{ fontSize: "14px", color: "#000000", marginTop: "6px", marginBottom: 0 }}>
            {desc}
          </p>
        </div>

        {/* ردیف پایین کارت: 8 جلسه و مدرس */}
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
          <span style={{direction:"rtl", color: "#C90BBC" }}>{sessionsCount ?? 0} جلسه</span>
          <span style={{ color: "#00C0D9" }}>مدرس: {teacherName || "—"}</span>
        </div>
      </div>
    </div>
  );
}
