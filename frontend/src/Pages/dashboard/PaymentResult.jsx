import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import HeaderDash from "../../components/section/HeaderDash";
import BottomMenu from "../../components/common/BottomMenu";

const STATUS_CONTENT = {
  success: {
    emoji: "✅",
    title: "پرداخت با موفقیت انجام شد",
    color: "#0a8f3c",
  },
  cancelled: {
    emoji: "⚠️",
    title: "پرداخت لغو شد",
    color: "#b58900",
  },
  failed: {
    emoji: "❌",
    title: "پرداخت ناموفق بود",
    color: "#c00",
  },
  error: {
    emoji: "❌",
    title: "خطایی رخ داد",
    color: "#c00",
  },
};

export default function PaymentResult() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const headerHeight = 70;

  const status = searchParams.get("status") || "error";
  const packageId = searchParams.get("package");
  const refId = searchParams.get("ref_id");
  const content = STATUS_CONTENT[status] || STATUS_CONTENT.error;

  const [redirecting, setRedirecting] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (!token) {
      navigate("/login", { replace: true });
    }
  }, [navigate]);

  return (
    <div
      className="font-[BYekan]"
      style={{
        width: "412px",
        overflow: "hidden",
        position: "relative",
        margin: "0 auto",
        background: "#FEF9FE",
        minHeight: "100vh",
      }}
    >
      <div
        style={{
          position: "fixed",
          top: 0,
          left: "50%",
          transform: "translateX(-50%)",
          width: "412px",
          height: `${headerHeight}px`,
          zIndex: 10,
          background: "#FEF9FE",
        }}
      >
        <HeaderDash />
      </div>

      <div
        style={{
          paddingTop: "120px",
          paddingBottom: "110px",
          direction: "rtl",
          textAlign: "center",
        }}
      >
        <div style={{ fontSize: "48px", marginBottom: "12px" }}>
          {content.emoji}
        </div>

        <h2
          style={{
            fontSize: "18px",
            fontWeight: "bold",
            color: content.color,
            marginBottom: "8px",
          }}
        >
          {content.title}
        </h2>

        {status === "success" && refId && (
          <p style={{ fontSize: "13px", color: "#555", marginBottom: "20px" }}>
            کد پیگیری: {refId}
          </p>
        )}

        <div style={{ display: "flex", flexDirection: "column", gap: "10px", width: "280px", margin: "20px auto 0 auto" }}>
          {status === "success" && packageId && (
            <button
              onClick={() => {
                setRedirecting(true);
                navigate(`/student/packages/${packageId}`);
              }}
              disabled={redirecting}
              style={{
                padding: "12px",
                borderRadius: "24px",
                border: "none",
                background: "#C90BBC",
                color: "#fff",
                fontSize: "15px",
                fontWeight: "bold",
                cursor: "pointer",
              }}
            >
              مشاهده‌ی پکیج
            </button>
          )}

          {status !== "success" && packageId && (
            <button
              onClick={() => navigate(`/student/packages/${packageId}`)}
              style={{
                padding: "12px",
                borderRadius: "24px",
                border: "none",
                background: "#C90BBC",
                color: "#fff",
                fontSize: "15px",
                fontWeight: "bold",
                cursor: "pointer",
              }}
            >
              تلاش دوباره برای خرید
            </button>
          )}

          <button
            onClick={() => navigate("/student")}
            style={{
              padding: "12px",
              borderRadius: "24px",
              border: "1px solid #C90BBC",
              background: "transparent",
              color: "#C90BBC",
              fontSize: "15px",
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
            بازگشت به داشبورد
          </button>
        </div>
      </div>

      <div
        style={{
          position: "fixed",
          bottom: 0,
          left: "50%",
          transform: "translateX(-50%)",
          width: "412px",
          background: "#FEF9FE",
          zIndex: 20,
        }}
      >
        <BottomMenu />
      </div>
    </div>
  );
}
