import ProfileAvatar from "../../assets/ProfileAvatar.svg";
export default function PackageHeader({ data }) {
  if (!data) return null;

  const {
    title,
    description,
    teacher,
    rating,
    ratingCount,
    cover,
  } = data;

  return (
    <div
      style={{
        padding: "20px",
        direction: "rtl",
        textAlign: "right",
      }}
    >
      {/* کاور پکیج */}
      <img
        src={cover}
        alt={title}
        style={{
          width: "100%",
          height: "160px",
          borderRadius: "12px",
          objectFit: "cover",
          marginBottom: "12px",
        }}
      />

      {/* عنوان پکیج */}
      <h2 style={{ fontSize: "16px", fontWeight: "bold", marginBottom: "6px" }}>
        {title}
      </h2>

      {/* امتیاز */}
      <p style={{ fontSize: "13px", color: "#555", marginBottom: "6px" }}>
          {rating}⭐ ({ratingCount} امتیاز)
      </p>
      <p
          style={{
            width: "348px",
            margin: "10px auto",
            fontSize: "15px",
            color: "#C90BBCC9",
            lineHeight: "20px",
          }}
        >
        توضیحات در مورد پکیج:
        </p>

      {/* توضیحات */}
      <p style={{ fontSize: "13px", lineHeight: "1.8", color: "#444" }}>
        {description}
      </p>

      {/* مدرس */}
              <div
                style={{
                  width: "348px",
                  margin: "0px auto 5px auto",
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                }}
              >
                <img src={ProfileAvatar} alt="teacherAvatar" />
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <span style={{ color: "#00C0D9", fontSize: "14px" }}>
                     مدرس: {teacher}
                  </span>
                </div>
              </div>
        <div
          style={{
            width: "348px",
            height: "1px",
            background: "#080609",
            margin: "0px auto -50px auto",
          }}
        ></div>

    </div>
  );
}
