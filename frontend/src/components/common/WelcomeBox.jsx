import ProfileAvatar from "../../assets/ProfileAvatar.svg";
import { useAuth } from "../../contexts/AuthContext";
import { BRAND } from "../../styles/theme";

export default function WelcomeBox() {
  const { user } = useAuth();
  const firstName = user?.first_name || "دوست عزیز";

  return (
    <div dir="rtl" className="flex items-center gap-3 px-4 md:px-0">
      <div
        className="flex-shrink-0"
        style={{
          padding: "2px",
          borderRadius: "50%",
          background: `linear-gradient(135deg, ${BRAND.orange}, ${BRAND.magenta})`,
        }}
      >
        <img
          src={ProfileAvatar}
          alt="پروفایل"
          style={{
            width: "52px",
            height: "52px",
            borderRadius: "50%",
            border: "2px solid #FEF9FE",
            display: "block",
          }}
        />
      </div>

      <p style={{ fontFamily: "BYekan", fontWeight: 700, fontSize: "15px", margin: 0, lineHeight: 1.6 }}>
        سلام {firstName} 👋
        <br />
        <span style={{ fontWeight: 400, fontSize: "13px", color: "#6B6470" }}>
          خوش اومدی، امروز چی یاد می‌گیریم؟
        </span>
      </p>
    </div>
  );
}
