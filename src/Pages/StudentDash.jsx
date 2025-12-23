import HeaderDash from "../components/HeaderDash.jsx";
import WelcomeBox from "../components/WelcomeBox.jsx";
import SearchBox from "../components/SearchBox.jsx";
import SliderBox from "../components/SliderBox.jsx";
import Card from "../components/Card.jsx";
import BottomMenu from "../components/BottomMenu.jsx";
import VideoSymbol from "../assets/VideoSymbol.svg";
import NoteSymbol from "../assets/NoteSymbol.svg";
import logo from "../assets/logo.svg";
import etemad from "../assets/etemad.svg";
import icons from "../assets/icons.svg";
import ConsultationForm from "../components/ConsultationForm.jsx";
import ContactFooter from "../components/ContactFooter.jsx";
import { TitleMD, BodyText } from "../components/ui/Typography.jsx";


export default function StudentDashboard({ gotoCourses, gotoComingSoon, gotoDashboard, gotoVideo }) {
  const headerHeight = 125;
  const bottomMenuHeight = 70;

  return (
    <div className="font-[byekan] w-[412px] h-screen overflow-hidden relative mx-auto bg-White">
      
      {/* هدر ثابت */}
      <div 
        className="fixed top-0 left-1/2 -translate-x-1/2 w-[412px] z-10 bg-White"
        style={{ height: `${headerHeight}px` }}
      >
        <HeaderDash />
        <WelcomeBox />
      </div>

      {/* بخش اسکرول شونده */}
      <div 
        className="absolute left-0 right-0 overflow-y-auto overflow-x-hidden bg-transparent"
        style={{ top: `${headerHeight}px`, bottom: `${bottomMenuHeight}px` }}
      >
        <div className="flex flex-col items-center">
          
          {/* اسلایدر */}
          <div className="mt-5">
            <SliderBox onClick={gotoVideo} />
          </div>

          {/* سرچ باکس */}
          <div className="mt-5 w-[348px]">
            <SearchBox />
          </div>
          {/*کارت ها*/}
          <div className="relative w-full min-h-[220px] mt-10">
            <Card
              title="ویدیو آموزشی"
              style={{ position: "absolute", top: "40px", left: "32px", cursor: "pointer" }}
              onClick={gotoCourses} 
            />
            <Card
              title="نمونه سوال"
              style={{ position: "absolute", top: "40px", left: "250px", cursor: "pointer" }}
              onClick={gotoComingSoon}
            />
            <img src={VideoSymbol} alt="Video" className="absolute top-[-10px] left-[34px] w-[130px] h-[112px] pointer-events-none" />
            <img src={NoteSymbol} alt="Note" className="absolute top-[5px] left-[264px] w-[105px] h-[88px] pointer-events-none" />
          </div>

          <ConsultationForm logo={logo} />
          <ContactFooter etemad={etemad} icons={icons} />
          
        </div>
      </div>

      {/* منوی پایین ثابت */}
{/* منوی پایین با استایل اجباری */}
      <div 
        style={{ 
          position: "fixed",
          bottom: "0px",
          left: "0px",
          width: "100%",
          height: `${bottomMenuHeight}px`,
          zIndex: "9999",
          backgroundColor: "#FEF9FE",
        }}
      >
        <BottomMenu gotoDashboard={gotoDashboard} />
      </div>
    </div>
  );
}