import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ErrorBox from "../../components/common/ErrorBox";
import ConsultationForm from "../../components/common/ConsultationForm.jsx";
import ContactFooter from "../../components/section/ContactFooter.jsx";
import ProfileAvatar from "../../assets/ProfileAvatar.svg";
import GoldenPackage from "../../assets/GoldenPackage.webp";
import api from "../../services/api";
import { resolveMediaUrl } from "../../utils/resolveMedia";

export default function PackageDetail() {
  const { packageId } = useParams();
  const navigate = useNavigate();

  const [pkg, setPkg] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [enrolling, setEnrolling] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    let isMounted = true;
    async function fetchPackage() {
      setLoading(true);
      setError("");
      try {
        const res = await api.get(`/packages/${packageId}/`);
        if (isMounted) setPkg(res.data.data);
      } catch (err) {
        if (isMounted) {
          const status = err?.response?.status;
          setError(
            status === 404
              ? "این پکیج یافت نشد."
              : "خطا در دریافت اطلاعات پکیج."
          );
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    }
    fetchPackage();
    return () => {
      isMounted = false;
    };
  }, [packageId]);

  async function handleEnroll() {
    setEnrolling(true);
    setError("");
    try {
      const res = await api.post(`/packages/${packageId}/enroll/`);
      setMessage(res.data.message || "با موفقیت ثبت‌نام شدید.");
      // رفرش جزئیات پکیج تا وضعیت is_enrolled و لیست دوره‌ها به‌روز بشه
      const refreshed = await api.get(`/packages/${packageId}/`);
      setPkg(refreshed.data.data);
    } catch {
      setError("خطا در ثبت‌نام. دوباره تلاش کنید.");
    } finally {
      setEnrolling(false);
    }
  }

  async function handlePurchase() {
    setEnrolling(true);
    setError("");
    try {
      const res = await api.post(`/packages/${packageId}/purchase/`);
      if (res.data.payment_url) {
        // ریدایرکت کامل مرورگر به درگاه زرین‌پال (نه fetch/axios، چون کاربر باید بره صفحه‌ی درگاه)
        window.location.href = res.data.payment_url;
      } else {
        setMessage(res.data.message || "شما قبلاً این پکیج را تهیه کرده‌اید.");
      }
    } catch (err) {
      setError(
        err?.response?.data?.message || "خطا در اتصال به درگاه پرداخت. دوباره تلاش کنید."
      );
    } finally {
      setEnrolling(false);
    }
  }

  return (
    <div className="font-[BYekan]">
      {error && <ErrorBox message={error} onClose={() => setError("")} />}

      <div
        style={{
          paddingTop: "16px",
          paddingBottom: "16px",
          direction: "rtl",
          textAlign: "right",
        }}
      >
        {loading && (
          <div style={{ textAlign: "center", padding: "20px" }}>
            در حال بارگذاری...
          </div>
        )}

        {!loading && pkg && (
          <>
            <div style={{ padding: "0 20px" }}>
              <img
                src={resolveMediaUrl(pkg.thumbnail) || GoldenPackage}
                alt={pkg.title}
                style={{
                  width: "100%",
                  height: "160px",
                  borderRadius: "12px",
                  objectFit: "cover",
                  marginBottom: "12px",
                }}
              />

              <h2 style={{ fontSize: "18px", fontWeight: "bold", marginBottom: "6px" }}>
                {pkg.title}
              </h2>

              <p style={{ fontSize: "13px", lineHeight: "1.8", color: "#444", marginBottom: "12px" }}>
                {pkg.description}
              </p>

              <div
                style={{
                  fontSize: "17px",
                  fontWeight: "bold",
                  color: pkg.price > 0 ? "#C90BBC" : "#0a8f3c",
                  marginBottom: "12px",
                }}
              >
                {pkg.price > 0
                  ? `${pkg.price.toLocaleString("fa-IR")} تومان`
                  : "رایگان"}
              </div>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  marginBottom: "12px",
                }}
              >
                <img
                  src={resolveMediaUrl(pkg.teacher_image) || ProfileAvatar}
                  alt="teacherAvatar"
                  style={{ width: "32px", height: "32px", borderRadius: "50%" }}
                />
                <span style={{ color: "#00C0D9", fontSize: "14px" }}>
                  مدرس: {pkg.teacher_name}
                </span>
              </div>

              {message && (
                <div style={{ fontSize: "13px", color: "#0a8f3c", marginBottom: "10px" }}>
                  {message}
                </div>
              )}

              {!pkg.is_enrolled ? (
                <button
                  onClick={pkg.price > 0 ? handlePurchase : handleEnroll}
                  disabled={enrolling}
                  style={{
                    width: "100%",
                    padding: "12px",
                    borderRadius: "24px",
                    border: "none",
                    background: "#C90BBC",
                    color: "#fff",
                    fontSize: "15px",
                    fontWeight: "bold",
                    cursor: enrolling ? "default" : "pointer",
                    opacity: enrolling ? 0.7 : 1,
                    marginBottom: "16px",
                  }}
                >
                  {enrolling
                    ? "در حال انتقال به درگاه پرداخت..."
                    : pkg.price > 0
                    ? `پرداخت و خرید پکیج (${pkg.price.toLocaleString("fa-IR")} تومان)`
                    : "ثبت‌نام در پکیج"}
                </button>
              ) : (
                <div
                  style={{
                    width: "100%",
                    padding: "12px",
                    borderRadius: "24px",
                    background: "#E5A6E6",
                    color: "#000",
                    fontSize: "15px",
                    fontWeight: "bold",
                    textAlign: "center",
                    marginBottom: "16px",
                  }}
                >
                  ✅ قبلاً ثبت‌نام کرده‌اید
                </div>
              )}
            </div>

            <div
              style={{
                width: "90%",
                maxWidth: "348px",
                height: "1px",
                background: "#080609",
                margin: "0 auto 16px auto",
              }}
            />

            <div style={{ padding: "0 20px" }}>
              <h3 style={{ fontSize: "15px", fontWeight: "bold", marginBottom: "10px" }}>
                دوره‌های این پکیج ({pkg.courses?.length || 0})
              </h3>

              {(pkg.courses || []).map((course) => (
                <div
                  key={course.id}
                  onClick={() => {
                    if (pkg.is_enrolled || course.is_owned) {
                      navigate(`/video/${course.id}`);
                    }
                  }}
                  style={{
                    background: "#E5A6E6",
                    padding: "12px 10px",
                    marginBottom: "8px",
                    borderRadius: "12px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    fontSize: "14px",
                    cursor: pkg.is_enrolled ? "pointer" : "default",
                    opacity: pkg.is_enrolled ? 1 : 0.7,
                  }}
                >
                  <span>{course.title}</span>
                  <span>{course.video_count || 0} جلسه</span>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      <div className="w-full mt-2">
        <ConsultationForm />
        <ContactFooter />
      </div>
    </div>
  );
}
