import { useState, useEffect, useMemo } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import SearchBox from "../../components/common/SearchBox";
import CourseCard from "../../components/common/CourseCard";
import videoCover from "../../assets/videoCover.webp";
import ConsultationForm from "../../components/common/ConsultationForm.jsx";
import ContactFooter from "../../components/section/ContactFooter.jsx";
import api from "../../services/api";

export default function StudentCourses() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [query, setQuery] = useState(searchParams.get("q") || "");

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

  const filteredCourses = useMemo(() => {
    const q = query.trim();
    if (!q) return courses;
    return courses.filter(
      (c) =>
        c.title?.includes(q) ||
        c.description?.includes(q) ||
        c.teacher_name?.includes(q)
    );
  }, [courses, query]);

  return (
    <div className="font-[BYekan] flex flex-col items-center pt-4 pb-4">
      <SearchBox
        style={{ width: "90%", maxWidth: "480px", margin: "0 auto 20px auto" }}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="جستجو در دوره‌های من..."
      />

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

      {!loading && !error && courses.length > 0 && filteredCourses.length === 0 && (
        <div style={{ textAlign: "center", padding: "20px", color: "#8B8794" }}>
          هیچ دوره‌ای با «{query}» پیدا نشد.
        </div>
      )}

      {!loading && !error && filteredCourses.length > 0 && (
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 px-4 md:px-0">
          {filteredCourses.map((course, i) => (
            <CourseCard
              key={course.id}
              index={i}
              img={course.thumbnail || videoCover}
              title={course.title}
              desc={course.description}
              sessionsCount={course.video_count}
              teacherName={course.teacher_name}
              onClick={() => navigate(`/video/${course.id}`)}
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
