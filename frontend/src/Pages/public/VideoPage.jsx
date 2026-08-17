import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AppShell from "../../components/layout/AppShell";
import ErrorBox from "../../components/common/ErrorBox";
import api from "../../services/api";

import ProfileAvatar from "../../assets/ProfileAvatar.svg";
import UserIcon from "../../assets/UserIcon.svg";
import VideoIcon from "../../assets/camera.svg";
import videoCover from "../../assets/videoCover.webp";
import guguli from "../../assets/guguliVideo.svg";
import download from "../../assets/download.webp";

import ConsultationForm from "../../components/common/ConsultationForm.jsx";
import ContactFooter from "../../components/section/ContactFooter.jsx";

export default function VideoPage() {
  const { courseId } = useParams();
  const navigate = useNavigate();

  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentVideo, setCurrentVideo] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    // اگه توکن نداریم اصلا سمت بک‌اند نریم، مستقیم بفرستیم لاگین
    // (این صفحه چون بیرون از ProtectedRoute هست، خودمون این چک رو انجام میدیم)
    const token = localStorage.getItem("access_token");
    if (!token) {
      navigate("/login", { replace: true });
      return;
    }

    let isMounted = true;
    async function fetchCourse() {
      setLoading(true);
      setError("");
      try {
        const res = await api.get(`/my-courses/${courseId}/`);
        if (isMounted) setCourse(res.data.data);
      } catch (err) {
        if (isMounted) {
          const status = err?.response?.status;
          setError(
            status === 404
              ? "این دوره یافت نشد یا دسترسی به آن ندارید."
              : "خطا در دریافت اطلاعات دوره."
          );
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    }
    fetchCourse();
    return () => {
      isMounted = false;
    };
  }, [courseId, navigate]);

  const sessions = course?.videos || [];

  function handleSelectVideo(video) {
    if (!video.video_file) {
      setError("فایل این جلسه هنوز آپلود نشده است.");
      return;
    }
    setCurrentVideo(video.video_file);
    setError("");
  }

  return (
    <AppShell>
      {error && <ErrorBox message={error} onClose={() => setError("")} />}

      <div style={{ textAlign: "right" }}>
        
        <div style={{ direction: "rtl", textAlign: "right" }}>
        {/* باکس ویدیو */}
        <div
          style={{
            width: "90%",
            maxWidth: "348px",
            height: "190px",
            margin: "0 auto",
            position: "relative",
            overflow: "hidden",
            borderRadius: "8px",
          }}
        >
          {currentVideo ? (
            <video
              key={currentVideo}
              src={currentVideo}
              controls
              autoPlay
              style={{ width: "100%", height: "100%", border: "none", borderRadius: "8px", background: "#000" }}
            />
          ) : (
            <>
              <img
                src={videoCover}
                alt="cover"
                style={{
                  width: "100%",
                  height: "100%",
                  borderRadius: "8px",
                }}
              />
              <img
                src={guguli}
                alt="play"
                onClick={() =>
                  setError("برای تماشا، یک جلسه از لیست انتخاب کنید.")
                }
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  cursor: "pointer",
                  zIndex: 10,
                }}
              />
            </>
          )}
        </div>

        {/* ادامه متن‌ها و توضیحات */}
        <h2
          style={{
            width: "90%",
            maxWidth: "348px",
            margin: "20px auto 10px auto",
            fontSize: "20px",
            fontWeight: "bold",
            color: "#000",
          }}
        >
        {course?.title || (loading ? "در حال بارگذاری..." : "دوره")}
        </h2>

        <div
          style={{
            width: "90%",
            maxWidth: "348px",
            margin: "0 auto",
            display: "flex",
            alignItems: "center",
            fontSize: "14px",
            color: "#555",
            gap: "8px",
          }}
        >
          ⭐ {course?.average_rating || 0} ({course?.ratings_count || 0} امتیاز)
        </div>

        <p
          style={{
            width: "90%",
            maxWidth: "348px",
            margin: "15px auto",
            fontSize: "15px",
            color: "#C90BBCC9",
            lineHeight: "22px",
          }}
        >
          توضیحات در مورد دوره:
        </p>

        <p
          style={{
            width: "90%",
            maxWidth: "348px",
            margin: "15px auto",
            fontSize: "14px",
            color: "#333",
            lineHeight: "24px",
          }}
        >
{course?.description}
          <br />
          📌 تعداد جلسات: {course?.video_count || 0}
          <br />
          ⏰ زمان کل دوره: {course?.total_duration || "00:00"}
        </p>

        {/* باکس دانلود */}
        {course?.handout && (
          <div
            onClick={() => window.open(course.handout, "_blank")}
            style={{ width: "278px", height: "32px", position: "absolute", top: "572px", left: "85px", border: "1px solid #000000", borderRadius: "6px", opacity: 1, transform: "rotate(0deg)", display: "flex", alignItems: "center", justifyContent: "flex-start", gap: "8px", paddingRight: "10px", backgroundColor: "#FEF9FE", cursor: "pointer", zIndex: 10, }} >
          {/* آیکون دانلود */}
            <img
              src={download}
              alt="download"
               />
            <p style={{ fontSize: "13px", color: "#000000", fontWeight: "500" }}>
                دریافت فایل جزوه دوره
            </p>
          </div>
        )}

        <div
          style={{
            width: "90%",
            maxWidth: "348px",
            margin: "80px auto 5px auto",
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <img src={ProfileAvatar} alt="teacherAvatar" />
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ color: "#00C0D9", fontSize: "14px" }}>
              مدرس: {course?.teacher_name || "—"}
            </span>
          </div>
        </div>

        <div
          style={{
            width: "90%",
            maxWidth: "348px",
            height: "1px",
            background: "#080609",
            margin: "0px auto 10px auto",
          }}
        ></div>

        <div
          style={{
            width: "90%",
            maxWidth: "348px",
            margin: "0 auto 20px auto",
            display: "flex",
            alignItems: "center",
            gap: "6px",
            fontSize: "14px",
            color: "#080609A3",
          }}
        >
          <img src={UserIcon} alt="userIcon" style={{ width: "20px" }} />
          <span>{course?.student_count || 0} دانش‌آموز</span>
        </div>

        <h3
          style={{
            width: "90%",
            maxWidth: "348px",
            margin: "30px auto 10px auto",
            fontSize: "24px",
            fontWeight: "bold",
            textAlign: "center",
            color: "#00A7D1",
          }}
        >
          محتوای دوره
        </h3>

        <div
          style={{
            width: "90%",
            maxWidth: "348px",
            margin: "0 auto 10px auto",
            display: "flex",
            justifyContent: "flex-start",
            gap: "8px",
            fontSize: "12px",
            color: "#000000",
          }}
        >
          <span>{course?.video_count || 0} جلسه</span>
          <span>{course?.total_duration || "00:00"} آموزش</span>
        </div>

        {/* لیست جلسات */}
        <div
          style={{
            width: "90%",
            maxWidth: "348px",
            margin: "0 auto",
            borderRadius: "8px",
            overflow: "hidden",
            background: "#ffffff",
            border: "2px solid #080609",
          }}
        >
          <div
            style={{
              background: "#E5A6E6",
              padding: "12px",
              textAlign: "center",
              fontWeight: "bold",
              fontSize: "16px",
              color: "#000",
              borderBottom: "1px solid #080609",
            }}
          >
            {course?.title || "محتوای دوره"}
          </div>

          {loading && (
            <div style={{ padding: "12px", textAlign: "center", fontSize: "14px" }}>
              در حال بارگذاری جلسات...
            </div>
          )}

          {!loading && sessions.length === 0 && (
            <div style={{ padding: "12px", textAlign: "center", fontSize: "14px" }}>
              هنوز جلسه‌ای برای این دوره آپلود نشده است.
            </div>
          )}

          {sessions.map((video) => (
            <div
              key={video.id}
              onClick={() => handleSelectVideo(video)}
              style={{
                background:
                  currentVideo === video.video_file ? "#C90BBC66" : "#E5A6E6",
                padding: "12px 10px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                borderBottom: "1px solid #080609",
                fontSize: "14px",
                color: "#000",
                cursor: "pointer",
              }}
            >
              <div
                style={{ display: "flex", alignItems: "center", gap: "8px" }}
              >
                <img src={VideoIcon} alt="video" style={{ width: "22px" }} />
                <span>جلسه {video.order}: {video.title}</span>
              </div>

              <span>{video.duration}</span>
            </div>
          ))}
        </div>
        <div>
          <ConsultationForm/>
          <ContactFooter/>
        </div>
      </div>
      </div>
    </AppShell>
  );
}
