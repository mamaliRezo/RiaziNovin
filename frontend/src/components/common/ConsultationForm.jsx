import { useState } from "react";
import { TitleMD, BodyText } from "../ui/Typography.jsx";
import logo from "../../assets/logo.webp";
import { GRADIENTS } from "../../styles/theme.js";

export default function ConsultationForm() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setName("");
    setPhone("");
  };

  return (
    <div
      dir="rtl"
      className="relative w-full px-6 py-6 my-6 rounded-[20px] box-border font-[byekan] overflow-hidden"
      style={{ background: GRADIENTS.hero }}
    >
      <div className="absolute top-0 right-6 -translate-y-1/2 z-10">
        <img src={logo} alt="logo" className="w-[46px] h-[46px] rounded-full bg-white p-1.5 shadow-[0_4px_10px_rgba(26,21,35,0.15)]" />
      </div>

      <div className="text-right pt-3">
        <TitleMD className="text-[#1A1523]">جهت دریافت مشاوره رایگان</TitleMD>
        <BodyText className="text-[#5B5563] text-[12px] mt-1">
          فرم زیر را پر کنید تا کارشناسان ما با شما تماس بگیرند
        </BodyText>
      </div>

      {submitted ? (
        <p className="text-[#0F9D6C] text-[13px] font-bold mt-4 text-right">
          ✅ اطلاعات شما ثبت شد، به‌زودی باهاتون تماس می‌گیریم.
        </p>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 mt-4">
          <input
            type="text"
            placeholder="نام و نام خانوادگی"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="flex-1 h-[38px] rounded-[10px] px-3 text-[13px] text-right font-[byekan] bg-white border border-transparent focus:outline-none focus:border-[#C90BBC] transition-colors"
            required
          />
          <input
            type="tel"
            placeholder="شماره تماس"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="flex-1 h-[38px] rounded-[10px] px-3 text-[13px] text-right font-[byekan] bg-white border border-transparent focus:outline-none focus:border-[#C90BBC] transition-colors"
            required
          />
          <button
            type="submit"
            className="shrink-0 h-[38px] px-5 text-white rounded-[10px] text-[13px] font-bold border-none"
            style={{ background: GRADIENTS.magenta, boxShadow: "0 6px 14px rgba(142,7,134,0.25)" }}
          >
            مشاوره می‌خواهم
          </button>
        </form>
      )}
    </div>
  );
}
