const ACCENTS = [
  { bg: "#DDF3EC", text: "#0F6E56" },
  { bg: "#FFF3D6", text: "#8A5A00" },
  { bg: "#EDEAFB", text: "#3C3489" },
  { bg: "#FBE3DB", text: "#993C1D" },
];

export default function CourseCard({
  img,
  title,
  desc,
  onClick,
  sessionsCount,
  teacherName,
  index = 0,
}) {
  const accent = ACCENTS[index % ACCENTS.length];

  return (
    <div
      onClick={onClick}
      className="w-full flex flex-col overflow-hidden cursor-pointer transition-transform hover:-translate-y-0.5"
      style={{ background: accent.bg, borderRadius: "24px" }}
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
        <p style={{ fontSize: "13px", color: accent.text, opacity: 0.85, margin: 0 }}>
          {desc}
        </p>

        <div
          className="mt-auto pt-2 flex items-center justify-between"
          style={{ fontSize: "13px", fontWeight: "bold", color: accent.text }}
        >
          <span>{sessionsCount ?? 0} جلسه</span>
          <span style={{ opacity: 0.85 }}>مدرس: {teacherName || "—"}</span>
        </div>
      </div>
    </div>
  );
}
