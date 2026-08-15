import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import { resolveMediaUrl } from "../../utils/resolveMedia";
import ContactFooter from "../../components/section/ContactFooter.jsx";
import { useAuth } from "../../contexts/AuthContext.jsx";
import ROLE_ROUTES from "../../config/roleRoutes";

import logo from "../../assets/logoRiazinovin.webp";
import guy from "../../assets/Guy.webp";
import classroomSlide from "../../assets/Slide1.webp";
import videoSymbol from "../../assets/VideoSymbol.webp";
import noteSymbol from "../../assets/NoteSymbol.webp";
import gameSymbol from "../../assets/GameSymbol.webp";
import goldenPackage from "../../assets/GoldenPackage.webp";

const VALUE_PROPS = [
  {
    icon: videoSymbol,
    title: "ویدیوهای آموزشی گام‌به‌گام",
    desc: "هر درس، تدریس‌شده مثل کلاس حضوری — قابل مکث، عقب‌وجلو، و تماشای دوباره تا وقتی جا بیفته.",
  },
  {
    icon: noteSymbol,
    title: "تمرین و جزوه‌ی هر جلسه",
    desc: "بعد از هر ویدیو، تمرین و جزوه‌ی همون درس هست تا دانش‌آموز واقعاً روش کار کنه، نه فقط تماشا.",
  },
  {
    icon: gameSymbol,
    title: "مخصوص دوران ابتدایی",
    desc: "محتوا دقیقاً برای سن و کتاب درسی دانش‌آموزهای ابتدایی طراحی شده، نه یه دوره‌ی عمومی ریاضی.",
  },
];

function PlusSymbol({ style }) {
  return (
    <span
      style={{
        position: "absolute",
        fontFamily: "sans-serif",
        fontWeight: "bold",
        color: "#F5941F",
        opacity: 0.35,
        userSelect: "none",
        ...style,
      }}
    >
      +
    </span>
  );
}

export default function Home() {
  const navigate = useNavigate();
  const { isAuthenticated, role, loading: authLoading } = useAuth();
  const [packages, setPackages] = useState([]);
  const [loadingPackages, setLoadingPackages] = useState(true);

  useEffect(() => {
    if (!authLoading && isAuthenticated && role && ROLE_ROUTES[role]) {
      navigate(ROLE_ROUTES[role], { replace: true });
    }
  }, [authLoading, isAuthenticated, role, navigate]);

  useEffect(() => {
    let isMounted = true;
    async function fetchPackages() {
      try {
        const res = await api.get("/public/packages/");
        if (isMounted) setPackages((res.data.data || []).slice(0, 6));
      } catch {
        // اگه نشد بگیریم، فقط این بخش خالی می‌مونه، بقیه‌ی صفحه مشکلی نداره
      } finally {
        if (isMounted) setLoadingPackages(false);
      }
    }
    fetchPackages();
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="font-[byekan] bg-[#FEF9FE] text-[#080609]" dir="rtl">
      {/* هدر */}
      <header className="flex items-center justify-between max-w-5xl mx-auto px-5 py-4">
        <img src={logo} alt="ریاضی نوین" className="h-12 w-auto" />
        <button
          onClick={() => navigate("/login")}
          className="px-5 py-2 rounded-full border-2 border-[#C90BBC] text-[#C90BBC] font-bold text-sm hover:bg-[#C90BBC] hover:text-white transition-colors"
        >
          ورود / ثبت‌نام
        </button>
      </header>

      {/* هیرو */}
      <section className="relative max-w-5xl mx-auto px-5 pt-8 pb-16 md:pt-16 md:pb-24 overflow-hidden">
        <PlusSymbol style={{ fontSize: "40px", top: "10px", left: "8%" }} />
        <PlusSymbol style={{ fontSize: "26px", top: "60%", left: "2%" }} />
        <PlusSymbol style={{ fontSize: "32px", top: "5%", right: "4%", color: "#00C0D9" }} />

        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-4">
          <div className="flex-1 text-center md:text-right">
            <h1 className="text-[28px] md:text-[38px] font-bold leading-[1.5] mb-4">
              ریاضی ابتدایی رو{" "}
              <span style={{ color: "#F5941F" }}>ساده و جذاب</span> یاد بگیرن
            </h1>
            <p className="text-[15px] md:text-[17px] text-[#444] leading-[1.9] mb-7 max-w-lg mx-auto md:mx-0 md:mr-0">
              دوره‌های ویدیویی ریاضی، مخصوص دانش‌آموزهای دوره‌ی ابتدایی —
              تدریس مفهومی، تمرین کافی، و پیشرفتی که قابل دیدنه.
            </p>
            <button
              onClick={() => navigate("/signup")}
              className="px-8 py-3 rounded-full text-white font-bold text-[16px]"
              style={{ background: "#C90BBC" }}
            >
              شروع کن، رایگانه
            </button>
          </div>

          <div className="flex-1 flex justify-center">
            <img src={guy} alt="" className="w-[220px] md:w-[300px]" />
          </div>
        </div>
      </section>

      {/* چرا ریاضی نوین */}
      <section className="max-w-5xl mx-auto px-5 py-10 md:py-14">
        <h2 className="text-[20px] md:text-[24px] font-bold text-center mb-9">
          چرا <span style={{ color: "#C90BBC" }}>ریاضی نوین</span>؟
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {VALUE_PROPS.map((item) => (
            <div
              key={item.title}
              className="rounded-[24px] p-6 text-center"
              style={{ background: "#E5A6E6" }}
            >
              <img src={item.icon} alt="" className="w-14 h-14 mx-auto mb-4" />
              <h3 className="font-bold text-[16px] mb-2">{item.title}</h3>
              <p className="text-[13px] leading-[1.8] text-[#333]">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* تصویر کلاس */}
      <section
        className="w-full py-10"
        style={{ background: "linear-gradient(135deg, #3a2a5c, #4b2f6b)" }}
      >
        <div className="max-w-5xl mx-auto px-5 flex flex-col md:flex-row items-center gap-6">
          <img
            src={classroomSlide}
            alt="کلاس ریاضی نوین"
            className="rounded-[20px] w-full md:w-[420px]"
          />
          <div className="text-center md:text-right text-white">
            <h2 className="text-[20px] md:text-[24px] font-bold mb-3">
              مثل یه کلاس واقعی، فقط راحت‌تر
            </h2>
            <p className="text-[14px] leading-[1.9] max-w-md mx-auto md:mx-0">
              هر وقت وقت داشتین، از هر جایی، دانش‌آموز می‌تونه درس رو ببینه،
              تمرین کنه، و اگه چیزی جا موند، دوباره برگرده و مرور کنه.
            </p>
          </div>
        </div>
      </section>

      {/* پکیج‌ها */}
      <section className="max-w-5xl mx-auto px-5 py-10 md:py-14">
        <div className="flex items-center justify-center gap-2 mb-9">
          <img src={goldenPackage} alt="" className="w-8 h-8" />
          <h2 className="text-[20px] md:text-[24px] font-bold text-center">
            پکیج‌های آموزشی
          </h2>
        </div>

        {loadingPackages && (
          <p className="text-center text-[14px] text-[#666]">
            در حال بارگذاری پکیج‌ها...
          </p>
        )}

        {!loadingPackages && packages.length === 0 && (
          <p className="text-center text-[14px] text-[#666]">
            به‌زودی پکیج‌های آموزشی اینجا نمایش داده می‌شن.
          </p>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {packages.map((pkg) => (
            <div
              key={pkg.id}
              onClick={() => navigate("/login")}
              className="rounded-[20px] overflow-hidden cursor-pointer"
              style={{ background: "#E5A6E6" }}
            >
              <img
                src={resolveMediaUrl(pkg.thumbnail) || goldenPackage}
                alt={pkg.title}
                className="w-full h-[140px] object-cover"
              />
              <div className="p-4">
                <h3 className="font-bold text-[15px] mb-1">{pkg.title}</h3>
                <p className="text-[12px] text-[#333] mb-3">
                  مدرس: {pkg.teacher_name} — {pkg.courses_count} دوره
                </p>
                <div
                  className="font-bold text-[15px]"
                  style={{ color: pkg.price > 0 ? "#C90BBC" : "#0a8f3c" }}
                >
                  {pkg.price > 0
                    ? `${Number(pkg.price).toLocaleString("fa-IR")} تومان`
                    : "رایگان"}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA پایانی */}
      <section className="text-center py-14 px-5" style={{ background: "#FCE9FC" }}>
        <h2 className="text-[20px] md:text-[24px] font-bold mb-4">
          همین امروز شروع کنید
        </h2>
        <p className="text-[14px] text-[#444] mb-6">
          ثبت‌نام رایگانه، هر وقت خواستین یه پکیج تهیه کنید.
        </p>
        <button
          onClick={() => navigate("/signup")}
          className="px-8 py-3 rounded-full text-white font-bold text-[16px]"
          style={{ background: "#C90BBC" }}
        >
          ساخت حساب کاربری
        </button>
      </section>

      <ContactFooter />
    </div>
  );
}
