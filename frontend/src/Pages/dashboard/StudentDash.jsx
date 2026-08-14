import HeaderDash from "../../components/section/HeaderDash.jsx";
import WelcomeBox from "../../components/common/WelcomeBox.jsx";
import SearchBox from "../../components/common/SearchBox.jsx";
import SliderBox from "../../components/common/SliderBox.jsx";
import Card from "../../components/ui/Card.jsx";
import BottomMenu from "../../components/common/BottomMenu.jsx";
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

  if (loading) return <div className="text-center">Loading dashboard...</div>;
  if (error) return <div className="text-center text-red-500">{error}</div>;

  return (
    <div className="flex justify-between bg-white p-3 rounded-md shadow-sm">
      {/* XP و Tasks هنوز تو بک‌اند پیاده‌سازی نشدن (فیچر گیمیفیکیشن) */}
      <div className="text-center">
        <div className="text-sm text-gray-500">XP</div>
        <div className="text-lg font-bold">—</div>
      </div>
      <div className="text-center">
        <div className="text-sm text-gray-500">Tasks</div>
        <div className="text-lg font-bold">—</div>
      </div>
      <div className="text-center">
        <div className="text-sm text-gray-500">Courses</div>
        <div className="text-lg font-bold">{coursesCount}</div>
      </div>
    </div>
  );
}

export default function StudentDashboard() {
  const headerHeight = 150;
  const bottomMenuHeight = 90;
  const navigate = useNavigate();

  const gotoCourses = () => navigate("/student/courses");
  const gotoComingSoon = () => navigate("/comingsoon");
  // بنر اسلایدر به دوره‌ی خاصی وصل نیست، فعلاً می‌بریم لیست دوره‌ها
  const gotoVideo = () => navigate("/student/courses");
  // صفحه‌ی پکیج‌ها هنوز رو روتر ثبت نشده (تو اولویت بعدیه)
  const gotoStudentPack = () => navigate("/student/packages");

  return (
    <div
      className="font-[byekan]"
      style={{
        width: "412px",
        margin: "0 auto",
        background: "#FEF9FE",
        position: "relative",
        height: "100vh",
        overflow: "hidden",
      }}
    >
      {/* fixed header (includes WelcomeBox) */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          margin: "0 auto",
          width: "412px",
          height: headerHeight + "px",
          background: "#FEF9FE",
          zIndex: 20,
        }}
      >
        <HeaderDash />
        <div style={{ width: "100%" }}>
          <div style={{ width: "412px", margin: "0 auto" }}>
            <WelcomeBox />
          </div>
        </div>
      </div>

      {/* scrollable middle region */}
      <div
        style={{
          position: "absolute",
          top: headerHeight + "px",
          bottom: bottomMenuHeight + "px",
          left: 0,
          right: 0,
          overflowY: "auto",
        }}
      >
        <div className="flex flex-col items-center">
          {/* Dashboard summary (XP / tasks / courses) */}
          <div className="w-[348px] mt-4">
            <DashboardSummary />
          </div>

          {/* slider */}
          <div className="mt-5">
            <SliderBox onClick={gotoVideo} />
          </div>

          {/* search box */}
          <div style={{ marginTop: "8.97px" }} className="mt-6 w-[348px]">
            <SearchBox />
          </div>

          {/* golden package */}
          <div
            className="font-[byekan] mt-10 w-[348px] h-[100px] rounded-[12px] bg-[#C90BBCC9] shadow-[10px_10px_10px_2px_rgba(0,0,0,0.25)] flex items-center justify-center px-4 cursor-pointer text-center relative"
            style={{ marginTop: "52px" }}
            onClick={gotoStudentPack}
          >
            <div>
              <p className="text-[21px] text-[#FEF9FE] font-bold">
                پکیج‌های طلایی
              </p>
            </div>
            <img src={GoldenPackage} alt="Golden Package" />
          </div>

          {/* cards */}
          <div
            className="relative w-full min-h-[220px] mt-10"
            style={{ marginTop: "12px" }}
          >
            <Card
              title="ویدیو آموزشی"
              style={{
                position: "absolute",
                top: "40px",
                left: "32px",
                cursor: "pointer",
              }}
              onClick={gotoCourses}
            />
            <Card
              title="نمونه سوال"
              style={{
                position: "absolute",
                top: "40px",
                left: "250px",
                cursor: "pointer",
              }}
              onClick={gotoComingSoon}
            />
            <img
              src={VideoSymbol}
              alt="Video"
              className="absolute top-[-10px] left-[34px] w-[130px] h-[112px] pointer-events-none"
            />
            <img
              src={NoteSymbol}
              alt="Note"
              className="absolute top-[5px] left-[264px] w-[105px] h-[88px] pointer-events-none"
            />
          </div>
          <div className="relative top-[127.33px]">
            <ConsultationForm />
            <ContactFooter />
          </div>
        </div>
      </div>

      {/* fixed footer */}
      <div
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          margin: "0 auto",
          width: "412px",
          zIndex: 30,
          background: "#FEF9FE",
          height: bottomMenuHeight + "px",
        }}
      >
        <BottomMenu />
      </div>
    </div>
  );
}
