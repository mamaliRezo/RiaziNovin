import { TitleLG, TitleMD, TitleSM, BodyText } from "../components/ui/Typography.jsx";

export default function ContactFooter({ etemad, icons }) {
  return (
    <div className="w-full bg-Accent/60 p-6 text-right box-border">
      <TitleLG className="text-Black mb-2">ریاضی نوین</TitleLG>
      <BodyText className="text-Black leading-5 mb-5 text-[11px]">
        این روز ها اینترنت باعث شده که خیلی از کارها راحت تر از همیشه پیش بره.
        دسترسی به استادان خبره و کلاس ها و دوره های با کیفیت یکی از این کارهاست.
      </BodyText>

      <div className="space-y-1 mb-5">
        <TitleMD className="text-Black">تماس با ما</TitleMD>
        <BodyText className="text-Black text-[11px]">شیراز ، بلوار مدرس ،موسسه ریاضی نوین</BodyText>
        <BodyText className="text-Black text-[11px]">تلفن تماس :۰۷۱۲۳۴۵۶</BodyText>
        <BodyText className="text-Black text-[11px]">ایمیل: m.mohammadi@gmail.com</BodyText>
      </div>

      <TitleSM className="text-Black mb-4">در صفحات اجتماعی همراه ما باشید</TitleSM>

      <div className="flex flex-col items-center gap-6">
        <img src={icons} alt="social icons" className="w-[120px]" />
        <div className="w-full flex justify-start">
           <img src={etemad} alt="trust" className="w-[60px]" />
        </div>
      </div>
    </div>
  );
}