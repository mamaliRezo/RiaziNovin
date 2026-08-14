import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import HeaderDash from "../../components/section/HeaderDash";
import SearchBox from "../../components/common/SearchBox";
import BottomMenu from "../../components/common/BottomMenu";
import CourseCard from "../../components/common/CourseCard";
import videoCover from "../../assets/videoCover.webp";
import ConsultationForm from "../../components/common/ConsultationForm.jsx";
import ContactFooter from "../../components/section/ContactFooter.jsx";
import api from "../../services/api";

export default function StudentCourses({
  gotoDashboard,
  gotoComingSoon,
  gotoProfile, }) {
  const headerHeight = 100;
  const navigate = useNavigate();

  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;
    async function fetchCourses() {
      try {
        const res = await api.get("/my-enrolled-courses/");
        if (isMounted) setCourses(res.data.data || []);
      } catch {
        if (isMounted) setError("خطا در دریافت دوره‌های شما.");
      } finally {
        if (isMounted) setLoading(false);
      }
    }
    fetchCourses();
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

      {/* بخش اسکرول کارت‌ها */}
      <div
        style={{
          flex: 1,
          overflowY: "auto",
          paddingTop: "60px",
          paddingBottom: "90px",
        }}
      >
        {/* SearchBox */}
        <SearchBox style={{ width: "348px", margin: "0 auto 20px auto" }} />

        {/* کارت‌ها */}
        {loading && (
          <div style={{ textAlign: "center", padding: "20px" }}>
            در حال بارگذاری دوره‌ها...
          </div>
        )}

        {!loading && error && (
          <div style={{ textAlign: "center", padding: "20px", color: "#c00" }}>
            {error}
          </div>
        )}

        {!loading && !error && courses.length === 0 && (
          <div style={{ textAlign: "center", padding: "20px" }}>
            هنوز در هیچ دوره‌ای ثبت‌نام نکرده‌اید.
          </div>
        )}

        {courses.map((course) => (
          <CourseCard
            key={course.id}
            img={course.thumbnail || videoCover}
            title={course.title}
            desc={course.description}
            sessionsCount={course.video_count}
            teacherName={course.teacher_name}
            onClick={() => navigate(`/video/${course.id}`)}
          />
        ))}
      </div>
      
      <div className="relative top-[-20px]">          
        <ConsultationForm/>
        <ContactFooter/>
      </div>

      {/* منوی پایین ثابت */}
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
      <BottomMenu
        gotoDashboard={gotoDashboard}
        gotoComingSoon={gotoComingSoon}
        gotoProfile={gotoProfile}
      />
      </div>
    </div>
  );
}
