import HeaderDash from "../../components/section/HeaderDash.jsx";
import WelcomeBox from "../../components/common/WelcomeBox.jsx";
import SearchBox from "../../components/common/SearchBox.jsx";
import SliderBox from "../../components/common/SliderBox.jsx";
import Card from "../../components/ui/Card.jsx";
import BottomMenu from "../../components/common/BottomMenu.jsx";
import VideoSymbol from "../../assets/VideoSymbol.svg";
import NoteSymbol from "../../assets/NoteSymbol.svg";
import GoldenPackage from "../../assets/GoldenPackage.svg";
import ConsultationForm from "../../components/common/ConsultationForm.jsx";
import ContactFooter from "../../components/section/ContactFooter.jsx";
import { useEffect, useState } from "react";
import { getStudentDashboard } from "../../services/api";

function DashboardSummary() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState({ xp: 0, tasksCount: 0, coursesCount: 0 });

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      setLoading(true);
      try {
        const res = await getStudentDashboard();
        if (!mounted) return;
        setData(res.data || {});
      } catch (e) {
        if (!mounted) return;
        setError(e.message || "Failed to load");
      } finally {
        if (!mounted) return;
        setLoading(false);
      }
    };
    load();
    return () => (mounted = false);
  }, []);

  if (loading) return <div className="text-center">Loading dashboard...</div>;
  if (error) return <div className="text-center text-red-500">{error}</div>;

  return (
    <div className="flex justify-between bg-white p-3 rounded-md shadow-sm">
      <div className="text-center">
        <div className="text-sm text-gray-500">XP</div>
        <div className="text-lg font-bold">{data.xp}</div>
      </div>
      <div className="text-center">
        <div className="text-sm text-gray-500">Tasks</div>
        <div className="text-lg font-bold">{data.tasksCount}</div>
      </div>
      <div className="text-center">
        <div className="text-sm text-gray-500">Courses</div>
        <div className="text-lg font-bold">{data.coursesCount}</div>
      </div>
    </div>
  );
}

export default function StudentDashboard({
  gotoCourses,
  gotoComingSoon,
  gotoDashboard,
  gotoVideo,
  gotoProfile,
  gotoStudentPack,
}) {
  const headerHeight = 150;
  const bottomMenuHeight = 90;

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
        <BottomMenu
          gotoDashboard={gotoDashboard}
          gotoComingSoon={gotoComingSoon}
          gotoProfile={gotoProfile}
        />
      </div>
    </div>
  );
}
