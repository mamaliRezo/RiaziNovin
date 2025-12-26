import { TitleLG, TitleMD, TitleSM, BodyText } from "../ui/Typography.jsx";
import etemad from "../../assets/etemad.svg";
import icons from "../../assets/icons.svg";

export default function ContactFooter() {
  return (
    <div className="w-full bg-[#00C0D9A3] p-6 text-right box-border font-[byekan]" dir="rtl">
      <TitleLG className="text-Black mb-2">ریاضی نوین</TitleLG>

      <BodyText className="text-Black leading-5 mb-5 text-[11px]">
        این روزها اینترنت باعث شده که خیلی از کارها راحت‌تر از همیشه پیش بره.
        دسترسی به استادان خبره و کلاس‌ها و دوره‌های با کیفیت یکی از این کارهاست.
        از نظر هزینه مقرون‌به‌صرفه و در کنار این‌ها از جهت آسایش بیشتر،
        دانش‌آموزها کلاس‌های آنلاین ریاضی نوین رو یه انتخاب مناسب و جذاب می‌دونن.
      </BodyText>

      {/* تماس با ما + لوگوی اعتماد در یک خط */}
      <div className="flex items-center justify-start gap-[70px] mb-5">
        <div className="space-y-1">
          <TitleMD className="text-[#080609A3]">تماس با ما</TitleMD>
          <BodyText className="text-[#080609A3] text-[11px]">شیراز، بلوار مدرس، موسسه ریاضی نوین</BodyText>
          <BodyText className="text-[#080609A3] text-[11px]">تلفن تماس: ۰۷۱۲۳۴۵۶</BodyText>
          <BodyText className="text-[#080609A3] text-[11px]">ایمیل: m.mohammadi@gmail.com</BodyText>
        </div>

        <img src={etemad} alt="trust" />
      </div>

      {/* تیتر + آیکون‌ها هم‌تراز و راست‌چین */}
      <div className="flex items-center justify-start gap-[10px] mb-4">
        <TitleSM className="text-[#080609A3]">در صفحات اجتماعی همراه ما باشید</TitleSM>
        <img src={icons} alt="social icons" />
      </div>

    </div>
  );
}
