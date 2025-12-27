import { useState } from "react";
import HeaderDash from "../../components/section/HeaderDash";
import BottomMenu from "../../components/common/BottomMenu";
import guguli from "../../assets/guguliVideo.svg"; 
import upload from "../../assets/upload.svg";
import pen from "../../assets/editPen.svg";
import ProfileAvatar from "../../assets/ProfileAvatar.svg";
import UserIcon from "../../assets/UserIcon.svg";
import  PlusIcon from "../../assets/UserIcon.svg";
export default function CreateCourse({
  gotoDashboard,
  gotoComingSoon,
  gotoProfile,
}) {
  const headerHeight = 70;
  const bottomMenuHeight = 90;

const [coverPreview, setCoverPreview] = useState(null); 
const [title, setTitle] = useState(""); 
const [courseGoal, setCourseGoal] = useState(""); 
const [score, setScore] = useState(""); 
const [description, setDescription] = useState(""); 
const [totalSessions, setTotalSessions] = useState(""); 
const [totalDuration, setTotalDuration] = useState("");
const [teacherName, setTeacherName] = useState("");
const [studentNumber, setStudentNumber] = useState("");


const handleAddSessionClick = () => {
  document.getElementById("video").click();
};

const handleVideoUpload = (e) => {
  const file = e.target.files[0];
  if (file) {
    gotoEditSession(file);
  }
};

const gotoEditSession = (file) => {
  console.log("رفتن به صفحه ویرایش جلسه با فایل:", file.name);
  // اینجا می‌تونی route بزنی یا state منتقل کنی
};


  const handleCoverChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const previewURL = URL.createObjectURL(file);
      setCoverPreview(previewURL);
      // TODO: این فایل را برای ذخیره/آپلود نگه‌دار (مثلاً در یک state دیگر یا فرم اصلی)
    }
  };

  return (
    <div
      className="font-[byekan]"
      style={{
        width: "412px",
        margin: "0 auto",
        background: "#FEF9FE",
        height: "100vh",
        overflow: "hidden",
        position: "relative",
      }}
    >
      {/* Header */}
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
      </div>

      {/* Scrollable content */}
      <div
        style={{
          position: "absolute",
          top: headerHeight + "px",
          bottom: bottomMenuHeight + "px",
          overflowY: "auto",
          width: "100%",
        }}
      >
        <div style={{ direction: "rtl" }}>
          {/* ------------------ بخش کاور دوره ------------------ */}
          <div className="w-[348px] mx-auto mt-[1px]">
            {/* باکس طوسی نمایش کاور */}
            <div
              className="relative w-[348px] h-[172px] rounded-[8px] overflow-hidden"
              style={{ backgroundColor: "#080609A3" }}
            >
              {coverPreview && (
                <img
                  src={coverPreview}
                  alt="Course Cover"
                  className="w-full h-full object-cover"
                />
              )}

              {/* آیکون پلی وسط */}
              <img
                src={guguli}
                alt="play"
                className="absolute top-1/2 left-1/2 w-[40px] -translate-x-1/2 -translate-y-1/2 opacity-90"
              />
            </div>

            {/* باکس آبی انتخاب تصویر — چسبیده زیر باکس طوسی، راست‌چین با آیکون آپلود */}
            <label
              htmlFor="cover-upload"
              className="w-[348px] h-[20px] rounded-[8px] bg-[#00C0D9A3] text-white text-[12px] cursor-pointer flex items-center justify-start px-2 mt-[0px]"
              style={{ direction: "rtl" }}
            >              
            <img src={upload} alt="upload" />
            <span className="ml-2">تغییر تصویر پیش‌نمایش ویدیو</span>

            </label>

            <input
              id="cover-upload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleCoverChange}
            />
          </div>

          {/* فیلد تیتر دوره ویدیویی */}
          <div className="w-[348px] mx-auto mt-[12px] flex items-center rounded-[8px] px-2">
            <img src={pen} alt="pen"/>
            <input
                type="text"
                className="flex-1 p-2 text-sm bg-[#FEF9FE] border-none text-[19.42px] font-[byekan] focus:outline-none"
                placeholder="تیتر دوره ویدیویی"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          {/* ⭐ ....... (....... امتیاز) */}
            <div className="w-[348px] mx-auto mt-[12px] text-sm text-[#333] flex justify-start items-center gap-1">
            <img src={pen} alt="pen"/>
            <input
                type="text"
                className="w-[30px] px-1 py-[2px] border-none focus:outline-none text-center placeholder:text-[#999] bg-[#FEF9FE]"
                placeholder="......."
                value={score}
                onChange={(e) => setScore(e.target.value)}
            />            
        <span>⭐</span>
        <span>(</span>
        <input
            type="text"
            className="w-[30px] px-1 py-[2px] border-none focus:outline-none text-center placeholder:text-[#999] bg-[#FEF9FE]"
            placeholder="......."
            // value={scoreLabel}
            // onChange={(e) => setScoreLabel(e.target.value)}
        />
        <span>امتیاز)</span>        

        </div>
        <div className="text-right">
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
        </div>
        {/* فیلد توضیحات دوره ویدیویی */}
          <div className="w-[348px] mx-auto mt-[12px] flex items-start rounded-[8px] px-2">
            <img src={pen} alt="pen"/>
            <textarea
                type="text"
                className="flex-1 p-2 text-sm bg-[#FEF9FE] border-none text-[12px] font-[byekan] focus:outline-none"
                rows={4}
                placeholder=".................................................................................................................................................................................................................................................................................................................."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />
          </div>
        <div className="w-[348px] mx-auto mt-[12px] text-sm text-[#333] flex items-center gap-1">
        <span>📌</span>
        <img src={pen} alt="pen"/>
        <span>تعداد جلسات:</span>
        <input
            type="text"
            className="w-[80px] px-1 border-none focus:outline-none text-center placeholder:text-[#999] bg-[#FEF9FE]"
            placeholder=".........."
            value={totalSessions}
            onChange={(e) => setTotalSessions(e.target.value)}
        />
        </div>

        <div className="w-[348px] mx-auto mt-[12px] text-sm text-[#333] flex items-center gap-1">
        <span>⏰</span>
        <img src={pen} alt="pen"/>
        <span>زمان کل دوره:</span>
        <input
            type="text"
            className="w-[80px] px-1 border-none focus:outline-none text-center placeholder:text-[#999] bg-[#FEF9FE]"
            placeholder=".........."
            value={totalDuration}
            onChange={(e) => setTotalDuration(e.target.value)}
        />
        </div>
        <div className="w-[348px] mx-auto mt-[12px] text-sm text-[#333] flex items-center gap-1">
        <span>🎯</span>
        <img src={pen} alt="pen"/>
        <input
            type="text"
            className="w-[123px] px-1 border-none focus:outline-none text-center placeholder:text-[#999] bg-[#FEF9FE]"
            placeholder="............................................"
            value={courseGoal}
            onChange={(e) => setCourseGoal(e.target.value)}
        />
        </div>
                <div
                  className="w-[348px] mx-auto mt-[12px] text-sm text-[#333] flex items-center gap-1"
                  style={{
                    width: "348px",
                    margin: "80px auto 5px auto",
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                  }}
                >
                  <img src={ProfileAvatar} alt="teacherAvatar" />
                  <div style={{ display: "flex" }}>
                    <img src={pen} alt="pen"/>
                    <span style={{ color: "#00C0D9", fontSize: "14px" }}>
                      مدرس:
                    </span>
                    <input
                     type="text"
                     className="w-[100px] px-1 border-none focus:outline-none text-[#00C0D9] text-right placeholder:text-[#999] bg-[#FEF9FE]"
                     placeholder="............."
                     value={teacherName}
                     onChange={(e) => setTeacherName(e.target.value)}
                    />

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
                    <input
                     type="text"
                     className="w-[25px] px-1 border-none focus:outline-none text-[#00C0D9] text-right placeholder:text-[#999] bg-[#FEF9FE]"
                     placeholder="......."
                     value={studentNumber}
                     onChange={(e) => setStudentNumber(e.target.value)}
                    />               
                <span> دانش‌آموز</span>
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


        {/* سطر اضافه کردن جلسه ویدیویی */}
<div
  className="w-[348px] mx-auto mt-[20px] flex items-start justify-start border border-[#080609] rounded-[8px] px-3 py-2 bg-[#E5A6E6]"
  style={{ direction: "rtl" }}
>
  <span
    onClick={handleAddSessionClick}
    className="flex items-start gap-1 text-sm font-bold"
    style={{ cursor: "pointer" }}
  >
    <img src={PlusIcon} alt="add" className="w-[16px]" />
    اضافه کردن یک جلسه ویدیویی
  </span>
</div>

<input
  id="video"
  type="file"
  accept="video/*"
  className="hidden"
  onChange={handleVideoUpload}
/>



        </div>
      </div>

      {/* Bottom Menu */}
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
