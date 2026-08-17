import WelcomeBox from "../../components/common/WelcomeBox.jsx";
import SearchBox from "../../components/common/SearchBox.jsx";
import SliderBox from "../../components/common/SliderBox.jsx";
import Card from "../../components/ui/Card.jsx";
import VideoSymbol from "../../assets/VideoSymbol.webp";
import NoteSymbol from "../../assets/NoteSymbol.webp";
import GoldenPackage from "../../assets/GoldenPackage.webp";
import ConsultationForm from "../../components/common/ConsultationForm.jsx";
import ContactFooter from "../../components/section/ContactFooter.jsx";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getStudentDashboard } from "../../services/api";

function DashboardSummary() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [coursesCount, setCoursesCount] = useState(0);

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      setLoading(true);
      try {
        const res = await getStudentDashboard();
        if (!mounted) return;
        setCoursesCount(res?.data?.statistics?.total_courses ?? 0);
      } catch (e) {
        if (!mounted) return;
        setError(e.message || "Failed to load");
      } finally {
        if (mounted) setLoading(false);
      }
    };
    load();
    return () => (mounted = false);
  }, []);

  if (loading) return <div className="text-center text-[13px] text-[#888]">در حال بارگذاری...</div>;
  if (error) return <div className="text-center text-[13px] text-red-500">{error}</div>;

  const stats = [
    { label: "امتیاز", value: "—", bg: "#FFF3D6", text: "#8A5A00" },
    { label: "تمرین‌ها", value: "—", bg: "#DDF3EC", text: "#0F6E56" },
    { label: "دوره‌ها", value: coursesCount, bg: "#EDEAFB", text: "#3C3489" },
  ];

  return (
    <div className="grid grid-cols-3 gap-3">
      {stats.map((s) => (
        <div
          key={s.label}
          className="rounded-[16px] py-3 text-center"
          style={{ background: s.bg }}
        >
          <div className="text-[12px]" style={{ color: s.text, opacity: 0.8 }}>
            {s.label}
          </div>
          <div className="text-[20px] font-bold" style={{ color: s.text }}>
            {s.value}
          </div>
        </div>
      ))}
    </div>
  );
}

export default function StudentDashboard() {
  const navigate = useNavigate();

  const gotoCourses = () => navigate("/student/courses");
  const gotoComingSoon = () => navigate("/comingsoon");
  // بنر اسلایدر به دوره‌ی خاصی وصل نیست، فعلاً می‌بریم لیست دوره‌ها
  const gotoVideo = () => navigate("/student/courses");
  const gotoStudentPack = () => navigate("/student/packages");

  return (
    <div className="font-[byekan] flex flex-col items-center pb-4">
      <div className="w-full">
        <WelcomeBox />
      </div>

      {/* Dashboard summary (XP / tasks / courses) */}
      <div className="w-[90%] max-w-[348px] md:max-w-full mt-4">
        <DashboardSummary />
      </div>

      {/* slider */}
      <div className="mt-5 w-full flex justify-center">
        <SliderBox onClick={gotoVideo} />
      </div>

      {/* search box */}
      <div className="mt-6 w-[90%] max-w-[348px] md:max-w-[480px]">
        <SearchBox />
      </div>

      {/* golden package */}
      <div
        className="font-[byekan] mt-10 w-[90%] max-w-[348px] md:max-w-full h-[100px] rounded-[16px] flex items-center justify-center px-4 cursor-pointer text-center relative"
        style={{ background: "linear-gradient(90deg, #FFCA28, #F5941F)" }}
        onClick={gotoStudentPack}
      >
        <div>
          <p className="text-[21px] text-white font-bold">
            پکیج‌های طلایی
          </p>
        </div>
        <img src={GoldenPackage} alt="Golden Package" />
      </div>

      {/* cards */}
      <div className="w-[90%] max-w-[348px] md:max-w-full md:w-full mt-6 flex items-start justify-center md:justify-start gap-3">
        <div className="relative">
          <img
            src={VideoSymbol}
            alt=""
            className="absolute -top-3 left-1/2 -translate-x-1/2 w-[80px] h-[70px] pointer-events-none z-10"
          />
          <Card title="ویدیو آموزشی" onClick={gotoCourses} fontSize="16px" style={{ background: "#0F6E56" }} />
        </div>
        <div className="relative">
          <img
            src={NoteSymbol}
            alt=""
            className="absolute -top-2 left-1/2 -translate-x-1/2 w-[65px] h-[55px] pointer-events-none z-10"
          />
          <Card title="نمونه سوال" onClick={gotoComingSoon} fontSize="16px" style={{ background: "#3C3489" }} />
        </div>
      </div>

      <div className="w-full mt-8">
        <ConsultationForm />
        <ContactFooter />
      </div>
    </div>
  );
}
