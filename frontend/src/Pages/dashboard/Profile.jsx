import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import api from "../../services/api";

import profile from "../../assets/profile logo.svg";
import pen from "../../assets/pen logo.svg";
import logOut from "../../assets/exit logo.svg";

export default function Profile() {
  const navigate = useNavigate();
  const { role, logout } = useAuth();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const [nationalCode, setNationalCode] = useState("");
  const [birthYear, setBirthYear] = useState("");
  const [birthMonth, setBirthMonth] = useState("");
  const [birthDay, setBirthDay] = useState("");
  const [grade, setGrade] = useState(""); // دانش‌آموز: مقطع تحصیلی
  const [major, setMajor] = useState(""); // دانش‌آموز: رشته
  const [level, setLevel] = useState(""); // معلم: مقطع تدریس
  const [subject, setSubject] = useState(""); // معلم: درس تدریسی

  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [newPassword, setNewPassword] = useState("");

  useEffect(() => {
    let isMounted = true;
    async function fetchProfile() {
      try {
        const res = await api.get("/profile/");
        const data = res.data.data || {};
        if (!isMounted) return;
        setNationalCode(data.national_code || "");
        setBirthYear(data.birth_year || "");
        setBirthMonth(data.birth_month || "");
        setBirthDay(data.birth_day || "");
        setGrade(data.grade || "");
        setMajor(data.major || "");
        setLevel(data.level || "");
        setSubject(data.subject || "");
      } catch {
        if (isMounted) setError("خطا در دریافت اطلاعات پروفایل.");
      } finally {
        if (isMounted) setLoading(false);
      }
    }
    fetchProfile();
    return () => {
      isMounted = false;
    };
  }, []);

  async function handleSaveAcademic() {
    setSaving(true);
    setError("");
    setMessage("");
    try {
      const formData = new FormData();
      formData.append("national_code", nationalCode);
      if (birthYear) formData.append("birth_year", birthYear);
      if (birthMonth) formData.append("birth_month", birthMonth);
      if (birthDay) formData.append("birth_day", birthDay);
      if (role === "teacher") {
        formData.append("level", level);
        formData.append("subject", subject);
      } else {
        formData.append("grade", grade);
        formData.append("major", major);
      }
      const res = await api.post("/profile/", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setMessage(res.data.message || "اطلاعات با موفقیت ذخیره شد.");
    } catch (err) {
      setError(err?.response?.data?.message || "خطا در ذخیره‌ی اطلاعات.");
    } finally {
      setSaving(false);
    }
  }

  async function handleChangePassword() {
    if (newPassword.length < 8) {
      setError("رمز عبور باید حداقل ۸ کاراکتر باشد.");
      return;
    }
    setSaving(true);
    setError("");
    setMessage("");
    try {
      const formData = new FormData();
      formData.append("password", newPassword);
      const res = await api.post("/profile/", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setMessage(res.data.message || "رمز عبور با موفقیت تغییر کرد.");
      setNewPassword("");
      setShowPasswordForm(false);
    } catch (err) {
      setError(err?.response?.data?.message || "خطا در تغییر رمز عبور.");
    } finally {
      setSaving(false);
    }
  }

  function handleLogout() {
    logout();
    navigate("/login", { replace: true });
  }

  return (
    <div className="font-[byekan]">
      <div dir="rtl" style={{ padding: "16px" }}>
        <div className="rounded-[8px] w-[90%] max-w-[348px] mx-auto p-4 mb-4 shadow-[4px_4px_12px_rgba(0,0,0,0.15)] flex items-center gap-3">
            <img src={profile} alt="پروفایل" className="w-12 h-12" />
            <div className="flex-1">
              <p className="text-[14px] font-bold">پروفایل کاربری</p>
              <p className="text-[11px] text-[#666]">
                {role === "teacher" ? "معلم" : "دانش‌آموز"}
              </p>
            </div>
            <img src={pen} alt="ویرایش" className="w-5 h-5" />
          </div>

          {loading && (
            <p className="text-center text-[13px] text-[#666]">در حال بارگذاری...</p>
          )}

          {!loading && (
            <>
              {message && (
                <div className="w-[90%] max-w-[348px] mx-auto mb-3 text-[13px] text-green-700">
                  {message}
                </div>
              )}
              {error && (
                <div className="w-[90%] max-w-[348px] mx-auto mb-3 text-[13px] text-red-600">
                  {error}
                </div>
              )}

              {/* رمز عبور */}
              <div className="rounded-[8px] w-[90%] max-w-[348px] mx-auto p-4 mb-4 shadow-[4px_4px_12px_rgba(0,0,0,0.15)]">
                <p className="text-[13px] font-bold mb-2">رمز عبور</p>
                {!showPasswordForm ? (
                  <button
                    onClick={() => setShowPasswordForm(true)}
                    className="w-full h-[32px] bg-[#D9D9D9] rounded-[6px] text-[12px] font-bold"
                  >
                    تغییر رمز عبور
                  </button>
                ) : (
                  <div className="flex flex-col gap-2">
                    <input
                      type="password"
                      placeholder="رمز عبور جدید (حداقل ۸ کاراکتر)"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="w-full h-[32px] rounded-[6px] text-[12px] px-3 border border-[#000] bg-white focus:outline-none"
                    />
                    <div className="flex gap-2">
                      <button
                        onClick={handleChangePassword}
                        disabled={saving}
                        className="flex-1 h-[32px] bg-[#00C0D9] text-white rounded-[6px] text-[12px] font-bold"
                      >
                        ذخیره
                      </button>
                      <button
                        onClick={() => {
                          setShowPasswordForm(false);
                          setNewPassword("");
                        }}
                        className="flex-1 h-[32px] bg-[#D9D9D9] rounded-[6px] text-[12px] font-bold"
                      >
                        انصراف
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* اطلاعات تکمیلی */}
              <div className="rounded-[8px] w-[90%] max-w-[348px] mx-auto p-4 mb-4 shadow-[4px_4px_12px_rgba(0,0,0,0.15)]">
                <p className="text-[13px] font-bold mb-1">اطلاعات تکمیلی</p>
                <p className="text-[11px] text-[#666] mb-3 leading-[1.8]">
                  برای تکمیل اطلاعات پروفایل خود، لطفا کد ملی و تاریخ تولد
                  خود را وارد کنید.
                </p>

                <label className="text-[11px] font-bold block mb-1">کدملی</label>
                <input
                  type="text"
                  inputMode="numeric"
                  maxLength={10}
                  value={nationalCode}
                  onChange={(e) => setNationalCode(e.target.value)}
                  className="w-full h-[32px] rounded-[7px] text-[12px] px-3 border border-[#000] bg-white focus:outline-none mb-3"
                />

                <label className="text-[11px] font-bold block mb-1">
                  تاریخ تولد (شمسی)
                </label>
                <div className="flex gap-2 mb-1">
                  <input
                    type="number"
                    placeholder="روز"
                    value={birthDay}
                    onChange={(e) => setBirthDay(e.target.value)}
                    className="flex-1 h-[32px] rounded-[7px] text-[12px] px-2 border border-[#000] bg-white focus:outline-none"
                  />
                  <input
                    type="number"
                    placeholder="ماه"
                    value={birthMonth}
                    onChange={(e) => setBirthMonth(e.target.value)}
                    className="flex-1 h-[32px] rounded-[7px] text-[12px] px-2 border border-[#000] bg-white focus:outline-none"
                  />
                  <input
                    type="number"
                    placeholder="سال"
                    value={birthYear}
                    onChange={(e) => setBirthYear(e.target.value)}
                    className="flex-1 h-[32px] rounded-[7px] text-[12px] px-2 border border-[#000] bg-white focus:outline-none"
                  />
                </div>
              </div>

              {/* اطلاعات تحصیلی */}
              <div className="rounded-[8px] w-[90%] max-w-[348px] mx-auto p-4 mb-4 shadow-[4px_4px_12px_rgba(0,0,0,0.15)]">
                <p className="text-[13px] font-bold mb-1">اطلاعات تحصیلی</p>
                <p className="text-[11px] text-[#666] mb-3 leading-[1.8]">
                  لطفا قبل از ادامه‌ی کار با پنل کاربری‌تان، این اطلاعات را
                  بروزرسانی کنید.
                </p>

                {role === "teacher" ? (
                  <>
                    <label className="text-[11px] font-bold block mb-1">
                      مقطع تدریس
                    </label>
                    <input
                      value={level}
                      onChange={(e) => setLevel(e.target.value)}
                      className="w-full h-[32px] rounded-[7px] text-[12px] px-3 border border-[#000] bg-white focus:outline-none mb-3"
                    />
                    <label className="text-[11px] font-bold block mb-1">
                      درس تدریسی
                    </label>
                    <input
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      className="w-full h-[32px] rounded-[7px] text-[12px] px-3 border border-[#000] bg-white focus:outline-none mb-3"
                    />
                  </>
                ) : (
                  <>
                    <label className="text-[11px] font-bold block mb-1">
                      مقطع تحصیلی
                    </label>
                    <input
                      value={grade}
                      onChange={(e) => setGrade(e.target.value)}
                      className="w-full h-[32px] rounded-[7px] text-[12px] px-3 border border-[#000] bg-white focus:outline-none mb-3"
                    />
                    <label className="text-[11px] font-bold block mb-1">رشته</label>
                    <input
                      value={major}
                      onChange={(e) => setMajor(e.target.value)}
                      className="w-full h-[32px] rounded-[7px] text-[12px] px-3 border border-[#000] bg-white focus:outline-none mb-3"
                    />
                  </>
                )}

                <button
                  onClick={handleSaveAcademic}
                  disabled={saving}
                  className="w-full h-[34px] rounded-[6px] border-none bg-[#FFCA28] font-bold text-[12px]"
                >
                  {saving ? "در حال ذخیره..." : "بروزرسانی اطلاعات"}
                </button>
              </div>

              {/* خروج */}
              <div
                onClick={handleLogout}
                className="rounded-[8px] w-[90%] max-w-[348px] mx-auto p-4 mb-6 shadow-[4px_4px_12px_rgba(0,0,0,0.15)] flex items-center justify-center gap-2 cursor-pointer"
              >
                <img src={logOut} alt="خروج" className="w-5 h-5" />
                <p className="text-[13px] font-bold">خروج از حساب کاربری</p>
              </div>
            </>
          )}
        </div>
    </div>
  );
}
