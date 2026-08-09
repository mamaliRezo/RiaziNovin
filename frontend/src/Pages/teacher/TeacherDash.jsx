import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";

export default function TeacherDashboard() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      setLoading(true);
      try {
        const res = await api.get("/my-created-courses/");
        if (!mounted) return;
        setCourses(res.data?.data || []);
      } catch (e) {
        if (!mounted) return;
        setError(e?.response?.data?.message || "خطا در دریافت اطلاعات داشبورد");
      } finally {
        if (!mounted) return;
        setLoading(false);
      }
    };
    load();
    return () => (mounted = false);
  }, []);

  const totalCourses = courses.length;
  const totalStudents = courses.reduce(
    (sum, c) => sum + (c.student_count || 0),
    0,
  );
  const totalVideos = courses.reduce((sum, c) => sum + (c.video_count || 0), 0);

  const stats = [
    { label: "دوره‌ها", value: totalCourses, bg: "#00C0D9A3" },
    { label: "دانش‌آموزان", value: totalStudents, bg: "#E5A6E6" },
    { label: "جلسات", value: totalVideos, bg: "#FFCA28A3" },
  ];

  return (
    <div style={{ direction: "rtl" }}>
      {/* عنوان و خوش‌آمد */}
      <div className="w-[348px] mx-auto mt-[16px]">
        <h2
          style={{
            fontSize: "22px",
            fontWeight: "bold",
            color: "#080609",
          }}
        >
          پنل معلم
        </h2>
        <p style={{ fontSize: "13px", color: "#C90BBCC9", marginTop: "2px" }}>
          مدیریت دوره‌های آموزشی شما
        </p>
      </div>

      {/* کارت‌های آماری */}
      <div className="w-[348px] mx-auto mt-[16px] flex gap-2">
        {stats.map((s) => (
          <div
            key={s.label}
            className="flex-1 rounded-[10px] flex flex-col items-center justify-center"
            style={{
              backgroundColor: s.bg,
              height: "72px",
            }}
          >
            <div
              style={{ fontSize: "20px", fontWeight: "bold", color: "#080609" }}
            >
              {loading ? "…" : s.value}
            </div>
            <div style={{ fontSize: "11px", color: "#080609" }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* دکمه‌ی ساخت دوره‌ی جدید */}
      <button
        onClick={() => navigate("/teacher/create")}
        className="w-[348px] mx-auto mt-[16px] h-[44px] rounded-full font-bold text-black text-[15px] flex items-center justify-center"
        style={{
          display: "flex",
          background: "linear-gradient(154.2deg, #FFCA28 18.04%, #997918 86%)",
          border: "none",
        }}
      >
        + ساخت دوره‌ی جدید
      </button>

      {/* عنوان لیست دوره‌ها */}
      <h3
        className="w-[348px] mx-auto"
        style={{
          marginTop: "28px",
          marginBottom: "10px",
          fontSize: "17px",
          fontWeight: "bold",
          color: "#00A7D1",
        }}
      >
        دوره‌های من
      </h3>

      {loading && (
        <div className="w-[348px] mx-auto text-sm text-[#C90BBCC9]">
          در حال بارگذاری...
        </div>
      )}

      {error && (
        <div className="w-[348px] mx-auto text-sm text-red-600">{error}</div>
      )}

      {!loading && !error && totalCourses === 0 && (
        <div
          className="w-[348px] mx-auto rounded-[10px] text-center"
          style={{
            padding: "24px 12px",
            backgroundColor: "#F5C6F0",
            color: "#080609",
            fontSize: "13px",
          }}
        >
          هنوز دوره‌ای نساختی. با دکمه‌ی بالا اولین دوره‌ات رو بساز 🎯
        </div>
      )}

      {!loading && !error && totalCourses > 0 && (
        <div className="w-[348px] mx-auto flex flex-col gap-2 mb-[16px]">
          {courses.map((c) => (
            <div
              key={c.id}
              className="rounded-[10px] px-3 py-2"
              style={{
                backgroundColor: "#fff",
                border: "1px solid #F5C6F0",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <span style={{ fontWeight: "bold", fontSize: "14px" }}>
                  {c.title}
                </span>
                <span
                  style={{
                    fontSize: "11px",
                    color: "#00A7D1",
                    background: "#00C0D91A",
                    borderRadius: "6px",
                    padding: "2px 6px",
                  }}
                >
                  {c.course_type_display}
                </span>
              </div>
              <div
                style={{
                  fontSize: "12px",
                  color: "#666",
                  marginTop: "6px",
                  display: "flex",
                  gap: "10px",
                }}
              >
                <span>🎬 {c.video_count} جلسه</span>
                <span>👥 {c.student_count} دانش‌آموز</span>
                <span>⭐ {c.average_rating || 0}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
