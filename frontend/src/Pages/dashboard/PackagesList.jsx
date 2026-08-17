import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SearchBox from "../../components/common/SearchBox";
import PackageCard from "../../components/common/PackageCard";
import GoldenPackage from "../../assets/GoldenPackage.webp";
import ConsultationForm from "../../components/common/ConsultationForm.jsx";
import ContactFooter from "../../components/section/ContactFooter.jsx";
import api from "../../services/api";
import { resolveMediaUrl } from "../../utils/resolveMedia";

export default function PackagesList() {
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
    <div className="font-[BYekan] flex flex-col items-center pt-4 pb-4">
      <SearchBox style={{ width: "90%", maxWidth: "480px", margin: "0 auto 20px auto" }} />

      <h2
        style={{
          width: "90%",
          maxWidth: "348px",
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

      {!loading && !error && packages.length > 0 && (
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 px-4 md:px-0">
          {packages.map((pkg, i) => (
            <PackageCard
              key={pkg.id}
              index={i}
              img={resolveMediaUrl(pkg.thumbnail) || GoldenPackage}
              title={pkg.title}
              teacherName={pkg.teacher_name}
              coursesCount={pkg.courses_count}
              enrolledCount={pkg.enrolled_count}
              price={pkg.price}
              onClick={() => navigate(`/student/packages/${pkg.id}`)}
            />
          ))}
        </div>
      )}

      <div className="w-full mt-4">
        <ConsultationForm />
        <ContactFooter />
      </div>
    </div>
  );
}
