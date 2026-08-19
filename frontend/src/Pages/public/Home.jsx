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
                  className="w-full sm:w-auto px-5 py-2.5 rounded-full text-white font-bold text-[13px] md:text-[14px] md:px-6 md:py-3 shadow-[0_16px_32px_rgba(201,11,188,0.28)]"
                  style={{
                    background:
                      "linear-gradient(135deg, #C90BBC 0%, #E55CCB 100%)",
                  }}
                >
                  شروع رایگان
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
              <div className="absolute left-2 top-6 h-14 w-14 rounded-full bg-[#FFE7A8] blur-2xl opacity-75 md:left-4 md:top-10 md:h-20 md:w-20 md:opacity-80" />
              <div className="absolute right-4 bottom-6 h-14 w-14 rounded-full bg-[#D7F5FF] blur-2xl opacity-75 md:right-8 md:bottom-10 md:h-20 md:w-20 md:opacity-80" />
              <img
                src={guy}
                alt="دانش‌آموز"
                className="relative w-[200px] md:w-[320px] drop-shadow-[0_16px_28px_rgba(60,31,56,0.16)]"
              />
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
            const accents = [
              {
                bg: "linear-gradient(135deg, #ECFFF8 0%, #D7F5EC 100%)",
                text: "#0F6E56",
                glow: "rgba(15,110,86,0.12)",
              },
              {
                bg: "linear-gradient(135deg, #FFF9EB 0%, #FFE8C0 100%)",
                text: "#8A5A00",
                glow: "rgba(138,90,0,0.12)",
              },
              {
                bg: "linear-gradient(135deg, #F6F1FF 0%, #E6DCFF 100%)",
                text: "#3C3489",
                glow: "rgba(60,52,137,0.12)",
              },
            ];
            const a = accents[i % accents.length];
            return (
              <div
                key={item.title}
                className="rounded-[24px] md:rounded-[22px] p-5 md:p-4 text-center shadow-[0_16px_32px_rgba(93,58,91,0.07)] border border-white/60 md:shadow-[0_12px_24px_rgba(93,58,91,0.06)]"
                style={{ background: a.bg, boxShadow: `0 16px 32px ${a.glow}` }}
              >
                <div className="mx-auto mb-3 md:mb-2.5 flex h-14 w-14 md:h-12 md:w-12 items-center justify-center rounded-[18px] md:rounded-[16px] bg-white/70 p-2 md:p-2 shadow-sm">
                  <img
                    src={item.icon}
                    alt=""
                    className="w-8 h-8 md:w-7 md:h-7"
                  />
                </div>
                <h3
                  className="font-bold text-[16px] md:text-[15px] mb-2 md:mb-1.5"
                  style={{ color: a.text }}
                >
                  {item.title}
                </h3>
                <p
                  className="text-[12px] md:text-[12px] leading-[1.8] md:leading-[1.75]"
                  style={{ color: a.text, opacity: 0.9 }}
                >
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
          ].map((step) => (
            <div
              key={step.number}
              className="relative rounded-[24px] md:rounded-[22px] border border-[#F3D5F5] bg-white p-5 md:p-4 text-center shadow-[0_16px_32px_rgba(201,11,188,0.05)] md:shadow-[0_12px_24px_rgba(201,11,188,0.04)]"
            >
              <div
                className="absolute -top-4 md:-top-3.5 right-5 md:right-4 h-10 w-10 md:h-9 md:w-9 rounded-full border-4 border-white flex items-center justify-center text-[17px] md:text-[15px] font-bold text-white shadow-lg"
                style={{
                  background: "linear-gradient(135deg, #C90BBC, #F5941F)",
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
        className="w-full py-8 md:py-10"
        style={{ background: "linear-gradient(135deg, #3a2a5c, #4b2f6b)" }}
      >
        <div className="max-w-5xl mx-auto px-5 flex flex-col md:flex-row items-center gap-5 md:gap-8">
          <img
            src={classroomSlide}
            alt="کلاس ریاضی نوین"
            className="rounded-[18px] md:rounded-[16px] w-full md:w-[360px]"
          />
          <div className="text-center md:text-right text-white">
            <h2 className="text-[18px] md:text-[20px] font-bold mb-2.5 md:mb-2">
              مثل یه کلاس واقعی، فقط راحت‌تر
            </h2>
            <p className="text-[12px] md:text-[13px] leading-[1.8] md:leading-[1.85] max-w-md mx-auto md:mx-0">
              هر وقت وقت داشتین، از هر جایی، دانش‌آموز می‌تونه درس رو ببینه،
              تمرین کنه، و اگه چیزی جا موند، دوباره برگرده و مرور کنه.
            </p>
          </div>
        </div>
      </section>

      <section id="packages" className="max-w-6xl mx-auto px-5 py-8 md:py-12">
        <div className="flex items-center justify-center gap-2 mb-7 md:mb-6">
          <img src={goldenPackage} alt="" className="w-8 h-8 md:w-7 md:h-7" />
          <h2 className="text-[22px] md:text-[28px] font-bold text-center">
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
              className="px-6 md:px-8 py-3 md:py-3.5 rounded-full text-white font-bold text-[13px] md:text-[14px] shadow-[0_14px_28px_rgba(201,11,188,0.24)] md:shadow-[0_12px_24px_rgba(201,11,188,0.20)]"
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
