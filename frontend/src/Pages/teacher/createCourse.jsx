import { useState } from "react";
import guguli from "../../assets/guguliVideo.svg";
import upload from "../../assets/upload.webp";
import PlusIcon from "../../assets/UserIcon.svg";
import VideoIcon from "../../assets/camera.svg";
import api from "../../services/api";
import { GRADIENTS, CARD_THEMES } from "../../styles/theme.js";

const COURSE_TYPES = [
  { value: "educational", label: "ویدیو آموزشی" },
  { value: "sample_questions", label: "نمونه سوال" },
];

const inputClass =
  "w-full h-[38px] rounded-[10px] text-[13px] px-3 border border-[#E5E0EA] bg-[#FAF8FB] focus:outline-none focus:border-[#C90BBC] transition-colors font-[byekan]";

export default function CreateCourse() {
  const [coverFile, setCoverFile] = useState(null);
  const [coverPreview, setCoverPreview] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [courseType, setCourseType] = useState("educational");
  const [grade, setGrade] = useState("");
  const [subject, setSubject] = useState("");

  const [courseId, setCourseId] = useState(null);
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState("");

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
      setFormError(err?.response?.data?.message || "خطا در ذخیره‌ی دوره. دوباره تلاش کن.");
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

      const res = await api.post(`/courses/${courseId}/add-video/`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setVideos((prev) => [...prev, { order: res.data.order, title: file.name }]);
    } catch (err) {
      setFormError(err?.response?.data?.message || "خطا در آپلود ویدیو.");
    } finally {
      setUploadingVideo(false);
      e.target.value = "";
    }
  };

  return (
    <div className="font-[byekan]" dir="rtl">
      <h2 className="w-[90%] max-w-[348px] lg:max-w-none lg:w-full mx-auto lg:mx-0 mb-4 text-[20px] font-bold text-[#1A1523]">
        ساخت دوره‌ی جدید
      </h2>

      <div className="lg:flex lg:gap-6 lg:items-start">
        {/* ستون کاور (رو دسکتاپ کنار فرم، sticky) */}
        <div className="w-[90%] max-w-[348px] mx-auto lg:mx-0 lg:w-[320px] lg:flex-shrink-0">
          <div className="lg:sticky lg:top-6">
            <div
              className="relative w-full h-[190px] rounded-[16px] overflow-hidden"
              style={{ background: "#EDE8F0" }}
            >
              {coverPreview && (
                <img src={coverPreview} alt="Course Cover" className="w-full h-full object-cover" />
              )}
              <img
                src={guguli}
                alt="play"
                className="absolute top-1/2 left-1/2 w-[40px] -translate-x-1/2 -translate-y-1/2 opacity-90"
              />
            </div>

            <label
              htmlFor="cover-upload"
              className="w-full h-[38px] rounded-[10px] text-white text-[12px] cursor-pointer flex items-center justify-center gap-2 mt-3"
              style={{ background: GRADIENTS.teal }}
            >
              <img src={upload} alt="upload" style={{ width: "14px" }} />
              <span>تغییر تصویر پیش‌نمایش</span>
            </label>

            <input id="cover-upload" type="file" accept="image/*" className="hidden" onChange={handleCoverChange} />
          </div>
        </div>

        {/* فرم اصلی */}
        <div className="w-[90%] max-w-[348px] mx-auto lg:mx-0 lg:flex-1 lg:min-w-0 mt-5 lg:mt-0">
          <div className="rounded-[20px] p-5 bg-white shadow-[0_4px_16px_rgba(26,21,35,0.08)]">
            <label className="text-[11px] font-bold block mb-1">تیتر دوره</label>
            <input
              type="text"
              className={`${inputClass} mb-3`}
              placeholder="مثلاً ریاضی پایه ششم"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            <label className="text-[11px] font-bold block mb-1">توضیحات دوره</label>
            <textarea
              className={`${inputClass} mb-3`}
              style={{ height: "90px", paddingTop: "8px" }}
              rows={4}
              placeholder="توضیحات دوره..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="text-[11px] font-bold block mb-1">نوع دوره</label>
                <select
                  className={inputClass}
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

              <div>
                <label className="text-[11px] font-bold block mb-1">پایه</label>
                <input
                  type="text"
                  className={inputClass}
                  placeholder="مثلاً ششم"
                  value={grade}
                  onChange={(e) => setGrade(e.target.value)}
                />
              </div>

              <div>
                <label className="text-[11px] font-bold block mb-1">درس</label>
                <input
                  type="text"
                  className={inputClass}
                  placeholder="مثلاً ریاضی"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                />
              </div>
            </div>

            {formError && (
              <div className="mt-3 text-[13px] text-red-600">{formError}</div>
            )}

            {!courseId ? (
              <button
                onClick={handleSaveCourse}
                disabled={saving}
                className="w-full mt-4 h-[46px] rounded-full text-white text-sm font-bold flex items-center justify-center"
                style={{ background: GRADIENTS.teal, boxShadow: "0 10px 20px rgba(12,147,168,0.3)", border: "none" }}
              >
                {saving ? "در حال ذخیره..." : "ذخیره دوره"}
              </button>
            ) : (
              <div
                className="mt-4 text-[13px] font-bold rounded-[12px] px-4 py-3"
                style={{ background: CARD_THEMES[0].soft, color: CARD_THEMES[0].text }}
              >
                دوره ذخیره شد ✅ حالا می‌تونی جلسات ویدیویی اضافه کنی.
              </div>
            )}
          </div>

          {/* جلسات */}
          <div className="rounded-[20px] p-5 bg-white shadow-[0_4px_16px_rgba(26,21,35,0.08)] mt-4">
            <h3 className="text-[15px] font-bold mb-3 text-[#1A1523]">محتوای دوره</h3>

            {videos.length > 0 && (
              <div className="flex flex-col gap-2 mb-3">
                {videos.map((v) => {
                  const theme = CARD_THEMES[v.order % CARD_THEMES.length];
                  return (
                    <div
                      key={v.order}
                      className="flex items-center justify-between px-3 py-2 rounded-[10px] text-[13px]"
                      style={{ background: theme.soft, color: theme.text }}
                    >
                      <span className="flex items-center gap-2 font-bold">
                        <img src={VideoIcon} alt="" style={{ width: "16px" }} />
                        جلسه {v.order}
                      </span>
                      <span style={{ opacity: 0.8 }}>{v.title}</span>
                    </div>
                  );
                })}
              </div>
            )}

            <div
              onClick={handleAddSessionClick}
              className="flex items-center justify-center gap-2 rounded-[12px] py-3 cursor-pointer text-sm font-bold transition-opacity"
              style={{
                border: `1.5px dashed ${courseId ? "#C90BBC" : "#D9D3DE"}`,
                color: courseId ? "#C90BBC" : "#B4AFBB",
                opacity: courseId ? 1 : 0.6,
              }}
            >
              <img src={PlusIcon} alt="add" className="w-[16px]" />
              {uploadingVideo ? "در حال آپلود..." : "اضافه کردن یک جلسه ویدیویی"}
            </div>

            <input id="video" type="file" accept="video/*" className="hidden" onChange={handleVideoUpload} />
          </div>
        </div>
      </div>
    </div>
  );
}
