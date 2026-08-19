import { TitleLG, TitleSM, BodyText } from "../ui/Typography.jsx";
import etemad from "../../assets/etemad.webp";
import icons from "../../assets/icons.webp";
import logo from "../../assets/logoRiazinovin.webp";

export default function ContactFooter() {
  return (
    <div
      className="w-full rounded-t-[28px] md:rounded-[28px] md:mt-6 p-6 md:p-10 text-right box-border font-[byekan]"
      dir="rtl"
      style={{ background: "#1A1523" }}
    >
      <div className="md:flex md:justify-between md:gap-10">
        <div className="md:max-w-[380px]">
          <div className="flex items-center gap-2 mb-4">
            <img src={logo} alt="" className="w-9 h-9 rounded-full bg-white p-1" />
            <TitleLG className="!text-white">ریاضی نوین</TitleLG>
          </div>

          <BodyText className="!text-[#B9B3C2] leading-6 mb-6 text-[12px]">
            دسترسی به استادان خبره و کلاس‌های باکیفیت، مقرون‌به‌صرفه و از هر
            جایی — ریاضی نوین رو یه انتخاب مناسب برای دانش‌آموزهای ابتدایی
            می‌کنه.
          </BodyText>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-start gap-6 mb-6 md:mb-0">
          <div className="space-y-1.5">
            <TitleSM className="!text-white mb-1">تماس با ما</TitleSM>
            <BodyText className="!text-[#B9B3C2] text-[12px]">شیراز، بلوار مدرس، موسسه ریاضی نوین</BodyText>
            <BodyText className="!text-[#B9B3C2] text-[12px]">تلفن تماس: ۰۷۱۲۳۴۵۶</BodyText>
            <BodyText className="!text-[#B9B3C2] text-[12px]">ایمیل: m.mohammadi@gmail.com</BodyText>
          </div>

          <img src={etemad} alt="نماد اعتماد" className="h-[70px] w-auto self-start" />
        </div>
      </div>

      <div
        className="flex flex-wrap items-center justify-between gap-3 mt-4 pt-4"
        style={{ borderTop: "1px solid rgba(255,255,255,0.1)" }}
      >
        <BodyText className="!text-[#8B8794] text-[11px]">
          © تمامی حقوق برای ریاضی نوین محفوظ است
        </BodyText>
        <div className="flex items-center gap-2">
          <TitleSM className="!text-[#B9B3C2]">شبکه‌های اجتماعی</TitleSM>
          <img src={icons} alt="social icons" className="h-5 w-auto" />
        </div>
      </div>
    </div>
  );
}
