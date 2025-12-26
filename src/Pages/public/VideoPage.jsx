import { useState } from "react";
import HeaderDash from "../../components/section/HeaderDash";
import BottomMenu from "../../components/common/BottomMenu";
import ErrorBox from "../../components/common/ErrorBox";

import ProfileAvatar from "../../assets/ProfileAvatar.svg";
import UserIcon from "../../assets/UserIcon.svg";
import VideoIcon from "../../assets/camera.svg";
import videoCover from "../../assets/videoCover.svg";
import guguli from "../../assets/guguliVideo.svg";
import download from "../../assets/download.svg";

import ConsultationForm from "../../components/common/ConsultationForm.jsx";
import ContactFooter from "../../components/section/ContactFooter.jsx";

export default function VideoPage({ 
  gotoDashboard,
  gotoComingSoon,
  gotoProfile, }) 
  
  {
  const [currentVideo, setCurrentVideo] = useState(null);
  const [error, setError] = useState("");
  const headerHeight = 70;
  const bottomMenuHeight = 90;

  const sessions = [
    {
      time: "6:12",
      title: "جلسه اول: توابع",
      videoUrl:
        "https://www.aparat.com/video/video/embed/videohash/Q7cyU/vt/frame",
    },
    {
      time: "4:06",
      title: "جلسه دوم: کسرها",
      videoUrl:
        "https://www.aparat.com/video/video/embed/videohash/hhq6ag9/vt/frame",
    },
    {
      time: "4:56",
      title: "جلسه سوم: تقسیم",
      videoUrl:
        "https://www.aparat.com/video/video/embed/videohash/3RLP0/vt/frame",
    },
    {
      time: "3:09",
      title: "جلسه چهارم: ضرب",
      videoUrl:
        "https://www.aparat.com/video/video/embed/videohash/xkue0cq/vt/frame",
    },
    {
      time: "8:15",
      title: "جلسه پنجم: حد",
      videoUrl:
        "https://www.aparat.com/video/video/embed/videohash/vthuj9k/vt/frame",
    },
    {
      time: "6:13",
      title: "جلسه ششم: مشتق",
      videoUrl:
        "https://www.aparat.com/video/video/embed/videohash/vobcd00/vt/frame",
    },
    {
      time: "3:37",
      title: "جلسه هفتم: اعداد اعشاری",
      videoUrl:
        "https://www.aparat.com/video/video/embed/videohash/qdh8q4b/vt/frame",
    },
    {
      time: "5:42",
      title: "جلسه هشتم: اعداد صحیح",
      videoUrl:
        "https://www.aparat.com/video/video/embed/videohash/q26z1w3/vt/frame",
    },
  ];

  function handleSelectVideo(session) {
    if (!session.videoUrl) {
      setError("لینک این جلسه هنوز ثبت نشده است.");
      return;
    }
    setCurrentVideo(session.videoUrl);
    setError("");
  }

  return (
    <div
      className="font-[BYekan]"
      style={{
        width: "412px",
        margin: "0 auto",
        background: "#FEF9FE",
        position: "relative",
        height: "100vh",
        overflow: "hidden",
      }}
    >
      {error && <ErrorBox message={error} onClose={() => setError("")} />}

      {/* Header */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          margin: "0 auto",
          width: "412px",
          height: `${headerHeight}px`,
          background: "#FEF9FE",
          zIndex: 20,
        }}
      >
        <HeaderDash />
      </div>

      {/* Scroll Content */}
      <div
        style={{
          position: "absolute",
          top: `${headerHeight}px`,
          bottom: `${bottomMenuHeight}px`,
          left: 0,
          right: 0,
          overflowY: "auto",
          textAlign: "right",
        }}
      >
        
        <div style={{ direction: "rtl", textAlign: "right" }}>
        {/* باکس ویدیو */}
        <div
          style={{
            width: "348px",
            height: "190px",
            margin: "0 auto",
            position: "relative",
            overflow: "hidden",
            borderRadius: "8px",
          }}
        >
          {currentVideo ? (
            <iframe
              src={currentVideo}
              width="348px"
              height="190px"
              allowFullScreen
              style={{ border: "none", borderRadius: "8px" }}
              title="video-player"
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
            width: "348px",
            margin: "20px auto 10px auto",
            fontSize: "20px",
            fontWeight: "bold",
            color: "#000",
          }}
        >
        دوره کامل آمورش کتاب ریاضی ششم دبستان 
        </h2>

        <div
          style={{
            width: "348px",
            margin: "0 auto",
            display: "flex",
            alignItems: "center",
            fontSize: "14px",
            color: "#555",
            gap: "8px",
          }}
        >
          ⭐ 4.6 (721 امتیاز)
        </div>

        <p
          style={{
            width: "348px",
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
            width: "348px",
            margin: "15px auto",
            fontSize: "14px",
            color: "#333",
            lineHeight: "24px",
          }}
        >
دوره‌ی ریاضی ششم شامل 8 قسمت آموزشی با مجموع زمان 5 ساعت و ۵۶ دقیقه  است. در این دوره،تمامی فصل های کتاب ریاضی ششم به‌صورت خط به خط و مفهومی تدریس شده و مفاهیم اصلی با مثال‌ها و تمرین‌های کاربردی توضیح داده  می‌شوند<div/>
تا دانش‌آموزان برای امتحانات مدرسه و پایه‌ریزی موفقیت در سال‌های بعد آماده  باشند.
          <br />
          📌 تعداد جلسات: 8
          <br />
          ⏰ زمان کل دوره: 5 ساعت و ۵۶ دقیقه
          <br />
          🎯 پوشش کامل تمام فصل‌های ریاضی ششم
        </p>

        {/* باکس دانلود */}
        <div style={{ width: "278px", height: "32px", position: "absolute", top: "572px", left: "85px", border: "1px solid #000000", borderRadius: "6px", opacity: 1, transform: "rotate(0deg)", display: "flex", alignItems: "center", justifyContent: "flex-start", gap: "8px", paddingRight: "10px", backgroundColor: "#FEF9FE", cursor: "pointer", zIndex: 10, }} >
        {/* آیکون دانلود */}
          <img 
            src={download}
            alt="download"
             />
          <p style={{ fontSize: "13px", color: "#000000", fontWeight: "500" }}>
              دریافت فایل جزوه این جلسه 
          </p>
        </div>

        <div
          style={{
            width: "348px",
            margin: "80px auto 5px auto",
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <img src={ProfileAvatar} alt="teacherAvatar" />
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ color: "#00C0D9", fontSize: "14px" }}>
              مدرس: مریم محمدی
            </span>
          </div>
        </div>

        <div
          style={{
            width: "348px",
            height: "1px",
            background: "#080609",
            margin: "0px auto 10px auto",
          }}
        ></div>

        <div
          style={{
            width: "348px",
            margin: "0 auto 20px auto",
            display: "flex",
            alignItems: "center",
            gap: "6px",
            fontSize: "14px",
            color: "#080609A3",
          }}
        >
          <img src={UserIcon} alt="userIcon" style={{ width: "20px" }} />
          <span>143 دانش‌آموز</span>
        </div>

        <h3
          style={{
            width: "348px",
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
            width: "348px",
            margin: "0 auto 10px auto",
            display: "flex",
            justifyContent: "flex-start",
            gap: "8px",
            fontSize: "12px",
            color: "#000000",
          }}
        >
          <span>8 جلسه</span>
          <span>۶ ساعت آموزش</span>
        </div>

        {/* لیست جلسات */}
        <div
          style={{
            width: "348px",
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
            آموزش ریاضی ششم دبستان
          </div>

          {sessions.map((row, i) => (
            <div
              key={i}
              onClick={() => handleSelectVideo(row)}
              style={{
                background: "#E5A6E6",
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
                <span>{row.title}</span>
              </div>

              <span>{row.time}</span>
            </div>
          ))}
        </div>
        </div>
        <div className="relative top-[180px]">          
          <ConsultationForm/>
          <ContactFooter/>
        </div>
      </div>

      {/* Bottom menu */}
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
          height: `${bottomMenuHeight}px`,
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
