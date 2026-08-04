import { useState } from "react";
import HeaderDash from "../../components/section/HeaderDash";
import BottomMenu from "../../components/common/BottomMenu";
import guguli from "../../assets/guguliVideo.svg";
import upload from "../../assets/upload.svg";
import pen from "../../assets/editPen.svg";
import PlusIcon from "../../assets/UserIcon.svg";
import api from "../../services/api";

const COURSE_TYPES = [
  { value: "educational", label: "ویدیو آموزشی" },
  { value: "sample_questions", label: "نمونه سوال" },
];

export default function CreateCourse({
  gotoDashboard,
  gotoComingSoon,
  gotoProfile,
}) {
  const headerHeight = 70;
  const bottomMenuHeight = 90;

  // ---- فیلدهای فرم (دقیقا مطابق چیزی که create_course تو بک‌اند می‌خواد) ----
  const [coverFile, setCoverFile] = useState(null);
  const [coverPreview, setCoverPreview] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [courseType, setCourseType] = useState("educational");
  const [grade, setGrade] = useState("");
  const [subject, setSubject] = useState("");

  // ---- وضعیت ذخیره‌ی دوره ----
  const [courseId, setCourseId] = useState(null);
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState("");

  // ---- وضعیت آپلود جلسات ویدیویی (فقط بعد از ساخته‌شدن دوره) ----
  const [uploadingVideo, setUploadingVideo] = useState(false);
  const [videos, setVideos] = useState([]);

  const handleCoverChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCoverFile(file);
      setCoverPreview(URL.createObjectURL(file));
    }
  };

  const handleSaveCourse = async () => {
    if (!title.trim() || !description.trim() || !subject.trim()) {
      setFormError("عنوان، توضیحات و درس اجباری هستن.");
      return;
    }
    setSaving(true);
    setFormError("");
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("course_type", courseType);
      formData.append("grade", grade);
      formData.append("subject", subject);
      if (coverFile) formData.append("thumbnail", coverFile);

      const res = await api.post("/create-course/", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setCourseId(res.data.course_id);
    } catch (err) {
      setFormError(
        err?.response?.data?.message || "خطا در ذخیره‌ی دوره. دوباره تلاش کن."
      );
    } finally {
      setSaving(false);
    }
  };

  const handleAddSessionClick = () => {
    if (!courseId) {
      setFormError("اول باید دوره رو ذخیره کنی، بعد بتونی جلسه اضافه کنی.");
      return;
    }
    document.getElementById("video").click();
  };

  const handleVideoUpload = async (e) => {
    const file = e.target.files[0];
    if (!file || !courseId) return;

    setUploadingVideo(true);
    setFormError("");
    try {
      const formData = new FormData();
      formData.append("title", file.name);
      formData.append("video_file", file);

      const res = await api.post(
        `/courses/${courseId}/add-video/`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      setVideos((prev) => [...prev, { order: res.data.order, title: file.name }]);
    } catch (err) {
      setFormError(err?.response?.data?.message || "خطا در آپلود ویدیو.");
    } finally {
      setUploadingVideo(false);
      e.target.value = "";
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
              <img
                src={guguli}
                alt="play"
                className="absolute top-1/2 left-1/2 w-[40px] -translate-x-1/2 -translate-y-1/2 opacity-90"
              />
            </div>

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

          {/* عنوان دوره */}
          <div className="w-[348px] mx-auto mt-[12px] flex items-center rounded-[8px] px-2">
            <img src={pen} alt="pen" />
            <input
              type="text"
              className="flex-1 p-2 text-sm bg-[#FEF9FE] border-none text-[19.42px] font-[byekan] focus:outline-none"
              placeholder="تیتر دوره ویدیویی"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
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
          <div className="w-[348px] mx-auto mt-[12px] flex items-start rounded-[8px] px-2">
            <img src={pen} alt="pen" />
            <textarea
              className="flex-1 p-2 text-sm bg-[#FEF9FE] border-none text-[12px] font-[byekan] focus:outline-none"
              rows={4}
              placeholder="توضیحات دوره..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          {/* نوع دوره */}
          <div className="w-[348px] mx-auto mt-[12px] text-sm text-[#333] flex items-center gap-2">
            <span>📌</span>
            <span>نوع دوره:</span>
            <select
              className="flex-1 bg-[#FEF9FE] border border-[#00C0D9A3] rounded-[6px] px-2 py-1 focus:outline-none"
              value={courseType}
              onChange={(e) => setCourseType(e.target.value)}
            >
              {COURSE_TYPES.map((t) => (
                <option key={t.value} value={t.value}>
                  {t.label}
                </option>
              ))}
            </select>
          </div>

          {/* پایه تحصیلی */}
          <div className="w-[348px] mx-auto mt-[12px] text-sm text-[#333] flex items-center gap-2">
            <span>🎓</span>
            <span>پایه:</span>
            <input
              type="text"
              className="flex-1 px-2 py-1 border-none focus:outline-none placeholder:text-[#999] bg-[#FEF9FE]"
              placeholder="مثلاً دهم، یازدهم..."
              value={grade}
              onChange={(e) => setGrade(e.target.value)}
            />
          </div>

          {/* درس */}
          <div className="w-[348px] mx-auto mt-[12px] text-sm text-[#333] flex items-center gap-2">
            <span>📚</span>
            <span>درس:</span>
            <input
              type="text"
              className="flex-1 px-2 py-1 border-none focus:outline-none placeholder:text-[#999] bg-[#FEF9FE]"
              placeholder="مثلاً ریاضی، فیزیک..."
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            />
          </div>

          {formError && (
            <div className="w-[348px] mx-auto mt-[12px] text-sm text-red-600">
              {formError}
            </div>
          )}

          {/* دکمه ذخیره دوره */}
          {!courseId ? (
            <button
              onClick={handleSaveCourse}
              disabled={saving}
              className="w-[348px] mx-auto mt-[16px] h-[40px] rounded-[8px] bg-[#00C0D9] text-white text-sm font-bold flex items-center justify-center"
              style={{ display: "flex" }}
            >
              {saving ? "در حال ذخیره..." : "ذخیره دوره"}
            </button>
          ) : (
            <div className="w-[348px] mx-auto mt-[16px] text-sm text-green-700">
              دوره ذخیره شد ✅ حالا می‌تونی جلسات ویدیویی اضافه کنی.
            </div>
          )}

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

          {/* لیست جلسات اضافه‌شده */}
          {videos.length > 0 && (
            <div className="w-[348px] mx-auto mb-[10px] text-sm text-[#333]">
              {videos.map((v) => (
                <div key={v.order} className="flex justify-between py-1 border-b border-[#eee]">
                  <span>جلسه {v.order}</span>
                  <span>{v.title}</span>
                </div>
              ))}
            </div>
          )}

          {/* سطر اضافه کردن جلسه ویدیویی */}
          <div
            className="w-[348px] mx-auto mt-[20px] flex items-start justify-start border border-[#080609] rounded-[8px] px-3 py-2 bg-[#E5A6E6]"
            style={{ direction: "rtl", opacity: courseId ? 1 : 0.5 }}
          >
            <span
              onClick={handleAddSessionClick}
              className="flex items-start gap-1 text-sm font-bold"
              style={{ cursor: "pointer" }}
            >
              <img src={PlusIcon} alt="add" className="w-[16px]" />
              {uploadingVideo
                ? "در حال آپلود..."
                : "اضافه کردن یک جلسه ویدیویی"}
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