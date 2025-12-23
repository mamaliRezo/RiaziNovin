import { TitleMD, BodyText } from "../components/ui/Typography.jsx";

export default function ConsultationForm({ logo }) {
  return (
    <div className="relative w-[348px] bg-primary-light p-5 my-5 rounded-xl box-border">
      <img src={logo} alt="logo" className="absolute -top-6 -left-2 w-[70px] z-10" />
      
      <div className="text-right mb-3">
        <TitleMD className="text-Black">درخواست مشاوره</TitleMD>
        <BodyText className="text-Black text-[10px]">فرم زیر را پر کنید تا کارشناسان ما با شما تماس بگیرند</BodyText>
      </div>

      <div className="flex gap-2 items-center justify-between">
        <button className="font-[byekan] w-[80px] h-[25px] bg-Accent/60 text-Black rounded-md text-[8px] font-byekan font-bold hover:bg-Accent transition-colors">
          مشاوره می‌خواهم
        </button>
        <input 
          type="text" 
          placeholder="شماره تلفن" 
          className="flex-1 font-[byekan] h-[25px] rounded-md px-2 text-[9px] text-right bg-White border-none outline-none font-byekan" 
        />
        <input 
          type="text" 
          placeholder="نام و نام خانوادگی" 
          className="flex-1 font-[byekan] h-[25px] rounded-md px-2 text-[9px] text-right bg-White border-none outline-none font-byekan" 
        />
      </div>
    </div>
  );
}