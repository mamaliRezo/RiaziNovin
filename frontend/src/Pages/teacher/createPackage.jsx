import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import guguli from "../../assets/guguliVideo.svg";
import upload from "../../assets/upload.webp";
import api from "../../services/api";
import { GRADIENTS, CARD_THEMES } from "../../styles/theme.js";

const inputClass =
  "w-full h-[38px] rounded-[10px] text-[13px] px-3 border border-[#E5E0EA] bg-[#FAF8FB] focus:outline-none focus:border-[#C90BBC] transition-colors font-[byekan]";

export default function CreatePackage() {
  const navigate = useNavigate();

  const [coverFile, setCoverFile] = useState(null);
  const [coverPreview, setCoverPreview] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");

  const [myCourses, setMyCourses] = useState([]);
  const [loadingCourses, setLoadingCourses] = useState(true);
  const [selectedCourseIds, setSelectedCourseIds] = useState([]);

  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    let isMounted = true;
    async function fetchMyCourses() {
      try {
        const res = await api.get("/my-created-courses/");
        if (isMounted) setMyCourses(res.data.data || []);
      } catch {
        // اگه نتونستیم دوره‌ها رو بگیریم، فقط چک‌باکس‌ها خالی می‌مونن
      } finally {
        if (isMounted) setLoadingCourses(false);
      }
    }
    fetchMyCourses();
    return () => {
      isMounted = false;
    };
  }, []);

  const handleCoverChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCoverFile(file);
      setCoverPreview(URL.createObjectURL(file));
    }
  };

  const toggleCourse = (id) => {
    setSelectedCourseIds((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
    );
  };

  const handleSavePackage = async () => {
    if (!title.trim() || !description.trim()) {
      setFormError("عنوان و توضیحات پکیج اجباری هستن.");
      return;
    }
    if (!coverFile) {
      setFormError("تصویر کاور پکیج اجباریه.");
      return;
    }
    setSaving(true);
    setFormError("");
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("thumbnail", coverFile);
      formData.append("price", price ? String(price) : "0");
      selectedCourseIds.forEach((id) => formData.append("course_ids", id));

      await api.post("/packages/create/", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setSuccess(true);
    } catch (err) {
      setFormError(err?.response?.data?.message || "خطا در ذخیره‌ی پکیج. دوباره تلاش کن.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="font-[byekan]" dir="rtl">
      <h2 className="w-[90%] max-w-[348px] lg:max-w-none lg:w-full mx-auto lg:mx-0 mb-4 text-[20px] font-bold text-[#1A1523]">
        ساخت پکیج جدید
      </h2>

      <div className="lg:flex lg:gap-6 lg:items-start">
        {/* ستون کاور */}
        <div className="w-[90%] max-w-[348px] mx-auto lg:mx-0 lg:w-[320px] lg:flex-shrink-0">
          <div className="lg:sticky lg:top-6">
            <div
              className="relative w-full h-[190px] rounded-[16px] overflow-hidden"
              style={{ background: "#EDE8F0" }}
            >
              {coverPreview && (
                <img src={coverPreview} alt="Package Cover" className="w-full h-full object-cover" />
              )}
              <img
                src={guguli}
                alt="package"
                className="absolute top-1/2 left-1/2 w-[40px] -translate-x-1/2 -translate-y-1/2 opacity-90"
              />
            </div>

            <label
              htmlFor="cover-upload"
              className="w-full h-[38px] rounded-[10px] text-white text-[12px] cursor-pointer flex items-center justify-center gap-2 mt-3"
              style={{ background: GRADIENTS.teal }}
            >
              <img src={upload} alt="upload" style={{ width: "14px" }} />
              <span>تصویر کاور پکیج</span>
            </label>

            <input id="cover-upload" type="file" accept="image/*" className="hidden" onChange={handleCoverChange} />
          </div>
        </div>

        {/* فرم اصلی */}
        <div className="w-[90%] max-w-[348px] mx-auto lg:mx-0 lg:flex-1 lg:min-w-0 mt-5 lg:mt-0">
          <div className="rounded-[20px] p-5 bg-white shadow-[0_4px_16px_rgba(26,21,35,0.08)]">
            <label className="text-[11px] font-bold block mb-1">عنوان پکیج</label>
            <input
              type="text"
              className={`${inputClass} mb-3`}
              placeholder="مثلاً پکیج طلایی ریاضی ششم"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            <label className="text-[11px] font-bold block mb-1">توضیحات پکیج</label>
            <textarea
              className={`${inputClass} mb-3`}
              style={{ height: "90px", paddingTop: "8px" }}
              rows={4}
              placeholder="توضیحات پکیج..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />

            <label className="text-[11px] font-bold block mb-1">قیمت پکیج (تومان)</label>
            <input
              type="number"
              min="0"
              step="1000"
              className={inputClass}
              placeholder="مثلاً 150000 — برای رایگان خالی بذار یا صفر بزن"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />

            {formError && (
              <div className="mt-3 text-[13px] text-red-600">{formError}</div>
            )}

            {success ? (
              <div
                className="mt-4 text-[13px] font-bold rounded-[12px] px-4 py-3"
                style={{ background: CARD_THEMES[0].soft, color: CARD_THEMES[0].text }}
              >
                پکیج با موفقیت ساخته شد ✅
              </div>
            ) : (
              <button
                onClick={handleSavePackage}
                disabled={saving}
                className="w-full mt-4 h-[46px] rounded-full text-white text-sm font-bold flex items-center justify-center"
                style={{ background: GRADIENTS.magenta, boxShadow: "0 10px 20px rgba(142,7,134,0.3)", border: "none" }}
              >
                {saving ? "در حال ذخیره..." : "ذخیره پکیج"}
              </button>
            )}

            {success && (
              <button
                onClick={() => navigate("/teacher")}
                className="w-full mt-3 h-[46px] rounded-full text-[#C90BBC] text-sm font-bold flex items-center justify-center"
                style={{ border: "1.5px solid #C90BBC", background: "transparent" }}
              >
                بازگشت به داشبورد
              </button>
            )}
          </div>

          {/* انتخاب دوره‌ها */}
          <div className="rounded-[20px] p-5 bg-white shadow-[0_4px_16px_rgba(26,21,35,0.08)] mt-4">
            <h3 className="text-[15px] font-bold mb-3 text-[#1A1523]">دوره‌های داخل پکیج</h3>

            {loadingCourses && (
              <div className="text-sm text-[#8B8794]">در حال بارگذاری دوره‌های شما...</div>
            )}

            {!loadingCourses && myCourses.length === 0 && (
              <div className="text-sm text-[#8B8794]">
                هنوز هیچ دوره‌ای نساختی. اول از داشبورد یه دوره بساز، بعد می‌تونی توی پکیج بذاریش.
              </div>
            )}

            {!loadingCourses && myCourses.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {myCourses.map((course, i) => {
                  const selected = selectedCourseIds.includes(course.id);
                  const theme = CARD_THEMES[i % CARD_THEMES.length];
                  return (
                    <label
                      key={course.id}
                      className="flex items-center justify-between px-3 py-2.5 rounded-[10px] text-[13px] cursor-pointer transition-colors"
                      style={{
                        background: selected ? theme.soft : "#FAF8FB",
                        color: selected ? theme.text : "#3F3A47",
                        border: `1.5px solid ${selected ? theme.text : "transparent"}`,
                      }}
                    >
                      <span className={selected ? "font-bold" : ""}>{course.title}</span>
                      <input
                        type="checkbox"
                        checked={selected}
                        onChange={() => toggleCourse(course.id)}
                      />
                    </label>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
