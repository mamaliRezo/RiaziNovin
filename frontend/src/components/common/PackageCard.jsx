const ACCENTS = [
  { bg: "#FFF3D6", text: "#8A5A00", chip: "#FFE1A3" },
  { bg: "#DDF3EC", text: "#0F6E56", chip: "#A9E5D3" },
  { bg: "#FBE3DB", text: "#993C1D", chip: "#F5C0A9" },
  { bg: "#EDEAFB", text: "#3C3489", chip: "#CECBF6" },
];

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
  const accent = ACCENTS[index % ACCENTS.length];

  return (
    <div
      onClick={onClick}
      className="w-full flex flex-col overflow-hidden cursor-pointer transition-transform hover:-translate-y-0.5"
      style={{
        background: accent.bg,
        borderRadius: "24px",
      }}
    >
      <div style={{ height: "160px", width: "100%" }}>
        <img
          src={img}
          alt={title}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </div>

      <div className="p-4 flex flex-col gap-2 flex-1">
        <h3 style={{ fontSize: "16px", fontWeight: "bold", color: accent.text, margin: 0 }}>
          {title}
        </h3>

        <div style={{ fontSize: "13px", color: accent.text, opacity: 0.85 }}>
          {coursesCount ?? 0} دوره · مدرس: {teacherName || "—"}
        </div>

        {typeof enrolledCount === "number" && (
          <div style={{ fontSize: "12px", color: accent.text, opacity: 0.7 }}>
            {enrolledCount} دانش‌آموز ثبت‌نام کرده
          </div>
        )}

        <div
          className="mt-auto pt-2 flex items-center justify-between"
          style={{ fontSize: "15px", fontWeight: "bold", color: accent.text }}
        >
          <span
            style={{
              background: accent.chip,
              borderRadius: "999px",
              padding: "4px 12px",
              fontSize: "13px",
            }}
          >
            {price > 0 ? `${Number(price).toLocaleString("fa-IR")} تومان` : "رایگان"}
          </span>
        </div>
      </div>
    </div>
  );
}
