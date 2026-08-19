import { themeFor } from "../../styles/theme";

export default function PackageCard({
  img,
  title,
  teacherName,
  coursesCount,
  enrolledCount,
  price,
  index = 0,
  onClick,
}) {
  const theme = themeFor(index);

  return (
    <div
      onClick={onClick}
      className="group w-full flex flex-col overflow-hidden cursor-pointer transition-all duration-200 hover:-translate-y-1"
      style={{
        background: theme.soft,
        borderRadius: "20px",
        boxShadow: "0 2px 10px rgba(26,21,35,0.06)",
      }}
    >
      <div className="relative" style={{ height: "150px", width: "100%" }}>
        <img
          src={img}
          alt={title}
          className="transition-transform duration-300 group-hover:scale-105"
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
        <div
          className="absolute top-3 right-3 flex items-center justify-center"
          style={{
            width: "34px",
            height: "34px",
            borderRadius: "10px",
            background: theme.gradient,
            boxShadow: "0 4px 10px rgba(0,0,0,0.18)",
          }}
        >
          <span style={{ fontSize: "16px" }}>📦</span>
        </div>
      </div>

      <div className="p-4 flex flex-col gap-2 flex-1">
        <h3 style={{ fontSize: "16px", fontWeight: "bold", color: "#1A1523", margin: 0 }}>
          {title}
        </h3>

        <div style={{ fontSize: "12.5px", color: theme.text }}>
          {coursesCount ?? 0} دوره · مدرس: {teacherName || "—"}
        </div>

        {typeof enrolledCount === "number" && (
          <div style={{ fontSize: "11.5px", color: "#8B8794" }}>
            {enrolledCount} دانش‌آموز ثبت‌نام کرده
          </div>
        )}

        <div className="mt-auto pt-2 flex items-center justify-between">
          <span
            style={{
              background: price > 0 ? theme.gradient : "linear-gradient(135deg,#3DDC97,#0F9D6C)",
              color: "#fff",
              borderRadius: "999px",
              padding: "6px 14px",
              fontSize: "13px",
              fontWeight: "bold",
              boxShadow: "0 3px 8px rgba(0,0,0,0.15)",
            }}
          >
            {price > 0 ? `${Number(price).toLocaleString("fa-IR")} تومان` : "رایگان"}
          </span>
        </div>
      </div>
    </div>
  );
}
