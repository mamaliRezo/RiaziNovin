import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import HeaderDash from "../../components/section/HeaderDash";
import BottomMenu from "../../components/common/BottomMenu";
import guguli from "../../assets/guguliVideo.svg";
import upload from "../../assets/upload.svg";
import pen from "../../assets/editPen.svg";
import api from "../../services/api";

export default function CreatePackage() {
  const navigate = useNavigate();
  const headerHeight = 70;
  const bottomMenuHeight = 90;

  const [coverFile, setCoverFile] = useState(null);
  const [coverPreview, setCoverPreview] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

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
      selectedCourseIds.forEach((id) => formData.append("course_ids", id));

      await api.post("/packages/create/", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setSuccess(true);
    } catch (err) {
      setFormError(
        err?.response?.data?.message || "خطا در ذخیره‌ی پکیج. دوباره تلاش کن."
      );
    } finally {
      setSaving(false);
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
          {/* کاور پکیج */}
          <div className="w-[348px] mx-auto mt-[1px]">
            <div
              className="relative w-[348px] h-[172px] rounded-[8px] overflow-hidden"
              style={{ backgroundColor: "#080609A3" }}
            >
              {coverPreview && (
                <img
                  src={coverPreview}
                  alt="Package Cover"
                  className="w-full h-full object-cover"
                />
              )}
              <img
                src={guguli}
                alt="package"
                className="absolute top-1/2 left-1/2 w-[40px] -translate-x-1/2 -translate-y-1/2 opacity-90"
              />
            </div>

            <label
              htmlFor="cover-upload"
              className="w-[348px] h-[20px] rounded-[8px] bg-[#00C0D9A3] text-white text-[12px] cursor-pointer flex items-center justify-start px-2 mt-[0px]"
              style={{ direction: "rtl" }}
            >
              <img src={upload} alt="upload" />
              <span className="ml-2">تصویر کاور پکیج</span>
            </label>

            <input
              id="cover-upload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleCoverChange}
            />
          </div>

          {/* عنوان پکیج */}
          <div className="w-[348px] mx-auto mt-[12px] flex items-center rounded-[8px] px-2">
            <img src={pen} alt="pen" />
            <input
              type="text"
              className="flex-1 p-2 text-sm bg-[#FEF9FE] border-none text-[19.42px] font-[byekan] focus:outline-none"
              placeholder="عنوان پکیج"
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
              توضیحات در مورد پکیج:
            </p>
          </div>
          <div className="w-[348px] mx-auto mt-[12px] flex items-start rounded-[8px] px-2">
            <img src={pen} alt="pen" />
            <textarea
              className="flex-1 p-2 text-sm bg-[#FEF9FE] border-none text-[12px] font-[byekan] focus:outline-none"
              rows={4}
              placeholder="توضیحات پکیج..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          {/* انتخاب دوره‌ها */}
          <h3
            style={{
              width: "348px",
              margin: "30px auto 10px auto",
              fontSize: "18px",
              fontWeight: "bold",
              textAlign: "right",
              color: "#00A7D1",
            }}
          >
            دوره‌های داخل پکیج
          </h3>

          {loadingCourses && (
            <div className="w-[348px] mx-auto text-sm text-[#555]">
              در حال بارگذاری دوره‌های شما...
            </div>
          )}

          {!loadingCourses && myCourses.length === 0 && (
            <div className="w-[348px] mx-auto text-sm text-[#555]">
              هنوز هیچ دوره‌ای نساختی. اول از داشبورد یه دوره بساز، بعد
              می‌تونی توی پکیج بذاریش.
            </div>
          )}

          {!loadingCourses && myCourses.length > 0 && (
            <div className="w-[348px] mx-auto mb-[10px]">
              {myCourses.map((course) => (
                <label
                  key={course.id}
                  className="flex items-center justify-between py-2 border-b border-[#eee] text-sm"
                  style={{ cursor: "pointer" }}
                >
                  <span>{course.title}</span>
                  <input
                    type="checkbox"
                    checked={selectedCourseIds.includes(course.id)}
                    onChange={() => toggleCourse(course.id)}
                  />
                </label>
              ))}
            </div>
          )}

          {formError && (
            <div className="w-[348px] mx-auto mt-[12px] text-sm text-red-600">
              {formError}
            </div>
          )}

          {success ? (
            <div className="w-[348px] mx-auto mt-[16px] text-sm text-green-700">
              پکیج با موفقیت ساخته شد ✅
            </div>
          ) : (
            <button
              onClick={handleSavePackage}
              disabled={saving}
              className="w-[348px] mx-auto mt-[16px] h-[40px] rounded-[8px] bg-[#00C0D9] text-white text-sm font-bold flex items-center justify-center"
              style={{ display: "flex" }}
            >
              {saving ? "در حال ذخیره..." : "ذخیره پکیج"}
            </button>
          )}

          {success && (
            <button
              onClick={() => navigate("/teacher")}
              className="w-[348px] mx-auto mt-[12px] h-[40px] rounded-[8px] bg-[#C90BBC] text-white text-sm font-bold flex items-center justify-center"
              style={{ display: "flex" }}
            >
              بازگشت به داشبورد
            </button>
          )}
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
        <BottomMenu />
      </div>
    </div>
  );
}
