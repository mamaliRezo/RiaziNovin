import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import { resolveMediaUrl } from "../../utils/resolveMedia";
import ContactFooter from "../../components/section/ContactFooter.jsx";
import PackageCard from "../../components/common/PackageCard.jsx";
import { useAuth } from "../../contexts/AuthContext.jsx";
import ROLE_ROUTES from "../../config/roleRoutes";

import logo from "../../assets/logoRiazinovin.webp";
import guy from "../../assets/Guy.webp";
import classroomSlide from "../../assets/Slide1.webp";
import videoSymbol from "../../assets/VideoSymbol.webp";
import noteSymbol from "../../assets/NoteSymbol.webp";
import gameSymbol from "../../assets/GameSymbol.webp";
import goldenPackage from "../../assets/GoldenPackage.webp";
import { VIBRANT_THEMES, DOT_PATTERN } from "../../styles/theme.js";

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
      <header className="max-w-6xl mx-auto px-4 pt-3 pb-1.5 md:px-6 md:py-4">
        <div className="flex items-center justify-between rounded-[18px] border border-[#F2D8F6] bg-white/80 px-3 py-2.5 shadow-[0_8px_24px_rgba(201,11,188,0.06)] backdrop-blur-sm md:px-5 md:py-3">
          <img src={logo} alt="ریاضی نوین" className="h-8 w-auto md:h-9" />

          <div className="hidden items-center gap-8 text-[13px] text-[#4A4A4A] lg:flex">
            <a
              href="#benefits"
              className="hover:text-[#C90BBC] transition-colors"
            >
              مزیت‌ها
            </a>
            <a href="#steps" className="hover:text-[#C90BBC] transition-colors">
              روند یادگیری
            </a>
            <a
              href="#packages"
              className="hover:text-[#C90BBC] transition-colors"
            >
              پکیج‌ها
            </a>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => navigate("/login")}
              className="px-3 py-1.5 rounded-full border border-[#C90BBC] bg-white text-[#C90BBC] text-[11px] font-bold md:px-4 md:py-2 md:text-[12px]"
            >
              ورود
            </button>
            <button
              onClick={() => navigate("/signup")}
              className="px-3 py-1.5 rounded-full text-white text-[11px] font-bold shadow-[0_8px_16px_rgba(201,11,188,0.16)] md:px-4 md:py-2 md:text-[12px]"
              style={{ background: "linear-gradient(135deg, #C90BBC 0%, #E55CCB 100%)" }}
            >
              ثبت‌نام
            </button>
          </div>
        </div>
      </header>

      <section className="relative max-w-6xl mx-auto px-4 pt-1 pb-10 md:px-6 md:pt-4 md:pb-16 overflow-hidden">
        <PlusSymbol style={{ fontSize: "40px", top: "10px", left: "8%" }} />
        <PlusSymbol style={{ fontSize: "26px", top: "60%", left: "2%" }} />
        <PlusSymbol
          style={{ fontSize: "32px", top: "5%", right: "4%", color: "#00C0D9" }}
        />

        <div className="mb-4 flex flex-wrap items-center justify-center gap-1.5 md:justify-start md:gap-2">
          {[
            "جلسات ویدیویی",
            "تمرین‌محور",
            "پیشرفت روزانه",
            "مناسب پایه‌های ابتدایی",
          ].map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-[#F5D5F4] bg-white/85 px-2.5 py-1 text-[10px] md:text-[11px] md:px-3 md:py-1.5 text-[#5E4B5B] shadow-[0_6px_16px_rgba(201,11,188,0.05)]"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="rounded-[28px] border border-[#F3D5F5] bg-white/80 p-3.5 shadow-[0_24px_64px_rgba(136,59,132,0.09)] md:p-7">
          <div className="flex flex-col md:flex-row items-center gap-6 md:gap-12">
            <div className="flex-1 text-center md:text-right">
              <div className="inline-flex items-center gap-2 rounded-full bg-[#FDE9FF] px-2.5 py-1 text-[10px] md:text-[11px] font-bold text-[#C90BBC] shadow-sm md:px-3.5 md:py-1.5">
                <span className="inline-block h-2 w-2 rounded-full bg-[#F5941F]" />
                یادگیری ریاضی برای بچه‌ها، با لذت و نظم
              </div>

              <h1 className="mt-3 text-[26px] leading-[1.5] md:mt-4 md:text-[48px] md:leading-[1.35] font-bold tracking-[-0.02em] text-[#080609]">
                ریاضی ابتدایی رو{" "}
                <span style={{ color: "#F5941F" }}>ساده، جذاب</span> و ماندگار
                یاد بگیر
              </h1>

              <p className="mt-3 text-[13px] md:text-[16px] text-[#4F4F4F] leading-[1.8] md:leading-[1.95] max-w-lg mx-auto md:mx-0">
                دوره‌های ویدیویی ریاضی مخصوص پایه‌های ابتدایی با تدریس مفهومی،
                تمرین هدفمند و پشتیبانی پیوسته.
              </p>

              <div className="mt-5 flex flex-col gap-2.5 sm:flex-row sm:justify-center md:justify-start md:gap-3">
                <button
                  onClick={() => navigate("/signup")}
                  className="group w-full sm:w-auto px-5 py-2.5 rounded-full text-white font-bold text-[13px] md:text-[14px] md:px-6 md:py-3 shadow-[0_16px_32px_rgba(201,11,188,0.28)] transition-transform hover:scale-105 flex items-center justify-center gap-1.5"
                  style={{
                    background:
                      "linear-gradient(135deg, #C90BBC 0%, #E55CCB 100%)",
                  }}
                >
                  شروع رایگان
                  <span className="transition-transform group-hover:-translate-x-1">←</span>
                </button>
                <button
                  onClick={() => navigate("/login")}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-full border border-[#C90BBC] bg-white text-[#C90BBC] font-bold text-[13px] md:text-[14px] md:px-6 md:py-3 hover:bg-[#FFF5FF] transition-colors"
                >
                  مشاهده پکیج‌ها
                </button>
              </div>

              <div className="mt-6 grid grid-cols-3 gap-2 md:gap-3 max-w-lg mx-auto md:mx-0">
                {[
                  ["+1200", "دانش‌آموز"],
                  ["۱۲", "دوره آموزشی"],
                  ["۴.۹", "رضایت کاربران"],
                ].map(([value, label]) => (
                  <div
                    key={label}
                    className="rounded-[16px] border border-[#F3D5F5] bg-[#FFF9FF] px-2 py-2.5 md:px-3 md:py-3 text-center"
                  >
                    <div className="text-[16px] md:text-[18px] font-bold text-[#C90BBC]">
                      {value}
                    </div>
                    <div className="mt-1 text-[8px] md:text-[10px] text-[#5D5D5D]">
                      {label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex-1 flex justify-center relative w-full md:w-auto">
              <div className="absolute left-2 top-6 h-14 w-14 rounded-full bg-[#FFE7A8] blur-2xl opacity-75 md:left-4 md:top-10 md:h-20 md:w-20 md:opacity-80 animate-pulse" />
              <div className="absolute right-4 bottom-6 h-14 w-14 rounded-full bg-[#D7F5FF] blur-2xl opacity-75 md:right-8 md:bottom-10 md:h-20 md:w-20 md:opacity-80 animate-pulse" style={{ animationDelay: "1s" }} />
              <div className="absolute right-10 top-2 h-10 w-10 rounded-full blur-xl opacity-60 md:h-16 md:w-16" style={{ background: "#F4C9F2" }} />

              <img
                src={guy}
                alt="دانش‌آموز"
                className="relative w-[200px] md:w-[320px] drop-shadow-[0_16px_28px_rgba(60,31,56,0.16)]"
              />

              {/* بج شناور روی تصویر، حس محصول مدرن‌تری می‌ده */}
              <div
                className="absolute -left-2 top-4 md:left-0 md:top-8 flex items-center gap-2 rounded-2xl bg-white/95 backdrop-blur-sm px-3 py-2 shadow-[0_12px_28px_rgba(60,31,56,0.16)] border border-white"
                style={{ animation: "float 3.5s ease-in-out infinite" }}
              >
                <span className="text-[16px]">⭐️</span>
                <div className="text-right leading-tight">
                  <div className="text-[12px] font-bold text-[#080609]">۴.۹ از ۵</div>
                  <div className="text-[9px] text-[#8B8794]">رضایت والدین</div>
                </div>
              </div>

              <div
                className="absolute -right-2 bottom-8 md:right-0 md:bottom-14 flex items-center gap-2 rounded-2xl bg-white/95 backdrop-blur-sm px-3 py-2 shadow-[0_12px_28px_rgba(60,31,56,0.16)] border border-white"
                style={{ animation: "float 3.5s ease-in-out infinite 1.2s" }}
              >
                <span
                  className="flex h-7 w-7 items-center justify-center rounded-full text-[13px]"
                  style={{ background: VIBRANT_THEMES[0].gradient }}
                >
                  ✓
                </span>
                <div className="text-right leading-tight">
                  <div className="text-[11px] font-bold text-[#080609]">جلسه ۸</div>
                  <div className="text-[9px] text-[#8B8794]">تکمیل شد</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="benefits" className="max-w-6xl mx-auto px-5 py-8 md:py-12">
        <div className="mb-7 md:mb-8 text-center">
          <p className="text-[12px] md:text-[13px] font-bold text-[#C90BBC]">
            چرا ریاضی نوین؟
          </p>
          <h2 className="mt-2 text-[22px] md:text-[28px] font-bold text-[#080609]">
            آموزش مطمئن برای{" "}
            <span style={{ color: "#C90BBC" }}>پیشرفت واقعی</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-4">
          {VALUE_PROPS.map((item, i) => {
            const v = VIBRANT_THEMES[i % VIBRANT_THEMES.length];
            return (
              <div
                key={item.title}
                className="relative rounded-[24px] md:rounded-[22px] p-5 md:p-4 text-center bg-white border border-[#F1EAF0] transition-transform hover:-translate-y-1"
                style={{ boxShadow: `0 16px 32px rgba(93,58,91,0.07)` }}
              >
                <div
                  className="mx-auto mb-3 md:mb-2.5 flex h-16 w-16 md:h-14 md:w-14 items-center justify-center rounded-[20px] md:rounded-[18px]"
                  style={{ background: v.gradient, boxShadow: `0 10px 22px ${v.glow}` }}
                >
                  <div className="flex h-10 w-10 md:h-9 md:w-9 items-center justify-center rounded-full bg-white/90">
                    <img src={item.icon} alt="" className="w-6 h-6 md:w-5 md:h-5" />
                  </div>
                </div>
                <h3 className="font-bold text-[16px] md:text-[15px] mb-2 md:mb-1.5 text-[#080609]">
                  {item.title}
                </h3>
                <p className="text-[12px] md:text-[12px] leading-[1.8] md:leading-[1.75] text-[#6B6470]">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      <section id="steps" className="max-w-6xl mx-auto px-5 py-8 md:py-12">
        <h2 className="text-[22px] md:text-[28px] font-bold text-center mb-8 md:mb-7">
          از <span style={{ color: "#C90BBC" }}>شروع تا نتیجه</span> چطور پیش
          می‌ره؟
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-4">
          {[
            {
              number: "۱",
              title: "ثبت‌نام ساده",
              text: "فقط با یک حساب کاربری، وارد مسیر یادگیری می‌شوی.",
            },
            {
              number: "۲",
              title: "یادگیری قدم‌به‌قدم",
              text: "ویدیوها، تمرین‌ها و جزوه‌ها به‌صورت منظم کنار هم قرار می‌گیرن.",
            },
            {
              number: "۳",
              title: "پیشرفت واقعی",
              text: "می‌تونی در هر زمان دوباره درس‌ها را ببینی و جلو بروی.",
            },
          ].map((step, i) => (
            <div
              key={step.number}
              className="relative rounded-[24px] md:rounded-[22px] border border-[#F3D5F5] bg-white p-5 md:p-4 text-center shadow-[0_16px_32px_rgba(201,11,188,0.05)] md:shadow-[0_12px_24px_rgba(201,11,188,0.04)] transition-transform hover:-translate-y-1"
            >
              <div
                className="absolute -top-4 md:-top-3.5 right-5 md:right-4 h-10 w-10 md:h-9 md:w-9 rounded-full border-4 border-white flex items-center justify-center text-[17px] md:text-[15px] font-bold text-white shadow-lg"
                style={{
                  background: VIBRANT_THEMES[i % VIBRANT_THEMES.length].gradient,
                }}
              >
                {step.number}
              </div>
              <h3 className="mt-7 md:mt-6 mb-2 md:mb-1.5 text-[16px] md:text-[15px] font-bold text-[#080609]">
                {step.title}
              </h3>
              <p className="text-[12px] md:text-[12px] leading-[1.8] md:leading-[1.75] text-[#444]">
                {step.text}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* تصویر کلاس */}
      <section
        className="relative w-full py-8 md:py-14 overflow-hidden"
        style={{ background: "linear-gradient(135deg, #3a2a5c, #4b2f6b)" }}
      >
        <div
          className="absolute inset-0 opacity-40"
          style={{ backgroundImage: DOT_PATTERN, backgroundSize: "18px 18px" }}
        />
        <div
          className="absolute -left-10 -top-10 h-40 w-40 rounded-full blur-3xl opacity-30"
          style={{ background: "#F5941F" }}
        />
        <div
          className="absolute -right-10 -bottom-10 h-40 w-40 rounded-full blur-3xl opacity-30"
          style={{ background: "#22D3B8" }}
        />

        <div className="relative max-w-5xl mx-auto px-5 flex flex-col md:flex-row items-center gap-5 md:gap-10">
          <div className="relative">
            <img
              src={classroomSlide}
              alt="کلاس ریاضی نوین"
              className="rounded-[20px] md:rounded-[22px] w-full md:w-[380px] shadow-[0_24px_60px_rgba(0,0,0,0.35)]"
            />
            <div
              className="absolute -bottom-4 -right-4 hidden md:flex items-center gap-2 rounded-2xl bg-white px-4 py-2.5 shadow-[0_16px_32px_rgba(0,0,0,0.25)]"
            >
              <span
                className="flex h-8 w-8 items-center justify-center rounded-full text-white text-[14px]"
                style={{ background: VIBRANT_THEMES[1].gradient }}
              >
                ▶
              </span>
              <div className="text-right leading-tight">
                <div className="text-[12px] font-bold text-[#080609]">پخش زنده</div>
                <div className="text-[9px] text-[#8B8794]">در هر لحظه</div>
              </div>
            </div>
          </div>

          <div className="text-center md:text-right text-white">
            <h2 className="text-[18px] md:text-[22px] font-bold mb-2.5 md:mb-3">
              مثل یه کلاس واقعی، فقط راحت‌تر
            </h2>
            <p className="text-[12px] md:text-[14px] leading-[1.8] md:leading-[1.9] max-w-md mx-auto md:mx-0 text-[#E5DCF0]">
              هر وقت وقت داشتین، از هر جایی، دانش‌آموز می‌تونه درس رو ببینه،
              تمرین کنه، و اگه چیزی جا موند، دوباره برگرده و مرور کنه.
            </p>
          </div>
        </div>
      </section>

      <section id="packages" className="relative px-5 py-10 md:py-16 overflow-hidden">
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(180deg, #FDF3FC 0%, #FEF9FE 100%)" }}
        />
        <div
          className="absolute left-[-60px] top-10 h-52 w-52 rounded-full blur-3xl opacity-40"
          style={{ background: "#FFD668" }}
        />
        <div
          className="absolute right-[-60px] bottom-0 h-52 w-52 rounded-full blur-3xl opacity-30"
          style={{ background: "#22D3B8" }}
        />

        <div className="relative max-w-6xl mx-auto">
          <div className="flex flex-col items-center gap-2.5 mb-8 md:mb-10 text-center">
            <div
              className="flex h-12 w-12 md:h-11 md:w-11 items-center justify-center rounded-2xl"
              style={{ background: VIBRANT_THEMES[3].gradient, boxShadow: `0 12px 24px ${VIBRANT_THEMES[3].glow}` }}
            >
              <img src={goldenPackage} alt="" className="w-6 h-6 md:w-6 md:h-6" />
            </div>
            <h2 className="text-[22px] md:text-[30px] font-bold">
              پکیج‌های <span style={{ color: "#C90BBC" }}>آموزشی</span>
            </h2>
            <p className="text-[12.5px] md:text-[14px] text-[#6B6470] max-w-md">
              چند دوره‌ی مرتبط، یک‌جا و با قیمت بهتر — برای پیشرفت پیوسته
            </p>
          </div>

          {loadingPackages && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className="rounded-[20px] overflow-hidden animate-pulse"
                  style={{ background: "#fff", boxShadow: "0 2px 10px rgba(26,21,35,0.06)" }}
                >
                  <div style={{ height: "150px", background: "#F1EAF0" }} />
                  <div className="p-4 flex flex-col gap-2">
                    <div style={{ height: "14px", width: "70%", background: "#F1EAF0", borderRadius: "6px" }} />
                    <div style={{ height: "11px", width: "50%", background: "#F1EAF0", borderRadius: "6px" }} />
                    <div style={{ height: "24px", width: "40%", background: "#F1EAF0", borderRadius: "999px", marginTop: "8px" }} />
                  </div>
                </div>
              ))}
            </div>
          )}

          {!loadingPackages && packages.length === 0 && (
            <div
              className="max-w-md mx-auto rounded-[24px] bg-white p-8 text-center"
              style={{ boxShadow: "0 16px 40px rgba(93,58,91,0.08)" }}
            >
              <div
                className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl"
                style={{ background: VIBRANT_THEMES[3].gradient }}
              >
                <img src={goldenPackage} alt="" className="w-8 h-8" />
              </div>
              <p className="text-[15px] font-bold text-[#080609] mb-1.5">
                پکیج‌ها به‌زودی اضافه می‌شن
              </p>
              <p className="text-[12.5px] text-[#8B8794]">
                همین الان ثبت‌نام کن تا به‌محض آماده شدن پکیج‌ها بهت اطلاع بدیم.
              </p>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {packages.map((pkg, i) => (
              <PackageCard
                key={pkg.id}
                index={i}
                img={resolveMediaUrl(pkg.thumbnail) || goldenPackage}
                title={pkg.title}
                teacherName={pkg.teacher_name}
                coursesCount={pkg.courses_count}
                price={pkg.price}
                onClick={() => navigate("/login")}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-10 md:py-12">
        <div className="max-w-5xl mx-auto rounded-[28px] md:rounded-[26px] border border-[#F1D0F0] bg-gradient-to-r from-[#FEEAFD] via-[#FFF6FF] to-[#EAFDFF] p-6 md:p-8 text-center shadow-[0_20px_48px_rgba(201,11,188,0.07)] md:shadow-[0_16px_40px_rgba(201,11,188,0.06)]">
          <h2 className="text-[22px] md:text-[28px] font-bold mb-2.5 md:mb-2 text-[#080609]">
            همین امروز شروع کنید
          </h2>
          <p className="text-[12px] md:text-[14px] text-[#4E4E4E] leading-[1.85] md:leading-[1.9] max-w-2xl mx-auto mb-6 md:mb-5">
            ثبت‌نام رایگانه و دسترسی به دوره‌های آموزشی، تمرین‌ها و پکیج‌های
            مرتبط فقط با چند کلیک.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-2.5 md:gap-3">
            <button
              onClick={() => navigate("/signup")}
              className="px-6 md:px-8 py-3 md:py-3.5 rounded-full text-white font-bold text-[13px] md:text-[14px] shadow-[0_14px_28px_rgba(201,11,188,0.24)] md:shadow-[0_12px_24px_rgba(201,11,188,0.20)] transition-transform hover:scale-105"
              style={{
                background: "linear-gradient(135deg, #C90BBC 0%, #E55CCB 100%)",
              }}
            >
              ساخت حساب کاربری
            </button>
            <button
              onClick={() => navigate("/login")}
              className="px-6 md:px-8 py-3 md:py-3.5 rounded-full border border-[#C90BBC] bg-white text-[#C90BBC] font-bold text-[13px] md:text-[14px] hover:bg-[#FFF5FF] transition-colors"
            >
              ورود به حساب
            </button>
          </div>
        </div>
      </section>

      <ContactFooter />
    </div>
  );
}
