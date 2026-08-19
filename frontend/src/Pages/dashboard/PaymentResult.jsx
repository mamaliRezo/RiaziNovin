import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import AppShell from "../../components/layout/AppShell";

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
    <AppShell>
      <div
        style={{
          paddingTop: "60px",
          paddingBottom: "20px",
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

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            width: "90%",
            maxWidth: "280px",
            margin: "20px auto 0 auto",
          }}
        >
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
                background: "linear-gradient(135deg, #E356D6 0%, #8E0786 100%)",
                boxShadow: "0 10px 20px rgba(142,7,134,0.3)",
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
                background: "linear-gradient(135deg, #E356D6 0%, #8E0786 100%)",
                boxShadow: "0 10px 20px rgba(142,7,134,0.3)",
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
    </AppShell>
  );
}
