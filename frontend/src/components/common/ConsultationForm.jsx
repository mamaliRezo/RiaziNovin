import { useState } from "react";
import { TitleMD, BodyText } from "../ui/Typography.jsx";
import logo from "../../assets/logo.webp";

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
    <div className="relative w-full h-[121.65px] bg-[#E5A6E6] px-6 py-5 my-5 rounded-xl box-border font-[byekan]">
      {/* لوگو بالا–چپ، بیرون باکس */}
      <div className="absolute top-0 left-3 -translate-y-[45%] z-10">
        <img src={logo} alt="logo" />
      </div>

      {/* عنوان و توضیح با فاصله از لبه */}
      <div className="text-right">
        <TitleMD className="text-Black">جهت دریافت مشاوره رایگان</TitleMD>
        <BodyText className="text-Black text-[8px] mt-1">
          فرم زیر را پر کنید تا کارشناسان ما با شما تماس بگیرند
        </BodyText>
      </div>

      {/* فرم افقی */}
<form onSubmit={handleSubmit} className="flex items-center gap-[10px] justify-end">
  <button
    type="submit"
    className="shrink-0 w-[80px] h-[19.62px] bg-[#00C0D9A3] text-Black rounded-[8px] text-[9px] font-[byekan] font-bold hover:bg-Accent transition-colors border-none"
  >
    مشاوره می‌خواهم
  </button>

  <input
    type="tel"
    placeholder="شماره تماس"
    value={phone}
    onChange={(e) => setPhone(e.target.value)}
    className="w-[129px] h-[20px] rounded-[8px] px-2 text-[9px] text-right font-[byekan] bg-[#FEF9FE] border-none"
    required
  />

  <input
    type="text"
    placeholder="نام و نام خانوادگی"
    value={name}
    onChange={(e) => setName(e.target.value)}
    className="w-[129px] h-[20px] rounded-[8px] px-2 text-[9px] text-right font-[byekan] bg-[#FEF9FE] border-none"
    required
  />
</form>


      {/* پیام موفقیت */}
      {submitted && (
        <p className="text-green-700 text-[9px] mt-3 text-right">
          اطلاعات شما با موفقیت ثبت شد.
        </p>
      )}
    </div>
  );
}
