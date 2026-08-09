import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import HeaderDash from "../../components/section/HeaderDash";
import SearchBox from "../../components/common/SearchBox";
import BottomMenu from "../../components/common/BottomMenu";
import PackageCard from "../../components/common/PackageCard";
import GoldenPackage from "../../assets/GoldenPackage.svg";
import ConsultationForm from "../../components/common/ConsultationForm.jsx";
import ContactFooter from "../../components/section/ContactFooter.jsx";
import api from "../../services/api";
import { resolveMediaUrl } from "../../utils/resolveMedia";

export default function PackagesList() {
  const headerHeight = 100;
  const navigate = useNavigate();

  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;
    async function fetchPackages() {
      try {
        const res = await api.get("/all-packages/");
        if (isMounted) setPackages(res.data.data || []);
      } catch {
        if (isMounted) setError("خطا در دریافت پکیج‌ها.");
      } finally {
        if (isMounted) setLoading(false);
      }
    }
    fetchPackages();
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div
      className="font-[BYekan]"
      style={{
        width: "412px",
        overflow: "hidden",
        position: "relative",
        margin: "0 auto",
        background: "#FEF9FE",
      }}
    >
      {/* هدر sticky */}
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
          flex: 1,
          overflowY: "auto",
          paddingTop: "60px",
          paddingBottom: "90px",
        }}
      >
        <SearchBox style={{ width: "348px", margin: "0 auto 20px auto" }} />

        <h2
          style={{
            width: "348px",
            margin: "0 auto 15px auto",
            fontSize: "18px",
            fontWeight: "bold",
            color: "#C90BBC",
          }}
        >
          پکیج‌های طلایی
        </h2>

        {loading && (
          <div style={{ textAlign: "center", padding: "20px" }}>
            در حال بارگذاری پکیج‌ها...
          </div>
        )}

        {!loading && error && (
          <div style={{ textAlign: "center", padding: "20px", color: "#c00" }}>
            {error}
          </div>
        )}

        {!loading && !error && packages.length === 0 && (
          <div style={{ textAlign: "center", padding: "20px" }}>
            فعلاً پکیجی موجود نیست.
          </div>
        )}

        {packages.map((pkg) => (
          <PackageCard
            key={pkg.id}
            img={resolveMediaUrl(pkg.thumbnail) || GoldenPackage}
            title={pkg.title}
            teacherName={pkg.teacher_name}
            coursesCount={pkg.courses_count}
            enrolledCount={pkg.enrolled_count}
            onClick={() => navigate(`/student/packages/${pkg.id}`)}
          />
        ))}
      </div>

      <div className="relative top-[-20px]">
        <ConsultationForm />
        <ContactFooter />
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
