import HeaderDash from "../components/HeaderDash.jsx";
import WelcomeBox from "../components/WelcomeBox.jsx";
import SearchBox from "../components/SearchBox.jsx";
import SliderBox from "../components/SliderBox.jsx";
import Card from "../components/Card.jsx";
import BottomMenu from "../components/BottomMenu.jsx";
import VideoSymbol from "../assets/VideoSymbol.svg";
import NoteSymbol from "../assets/NoteSymbol.svg";
import GameSymbol from "../assets/GameSymbol.svg";
import ExamSymbol from "../assets/ExamSymbol.svg";
import logo  from "../assets/logo.svg"
import etemad from "../assets/etemad.svg"
import icons from "../assets/icons.svg"

export default function StudentDashboard({ gotoCourses, gotoComingSoon, gotoDashboard, gotoVideo }) {
  const headerHeight = 125; 
  const bottomMenuHeight = 33;

  return (
    <div className="font-[BYekan]"
      style={{
        width: "412px",
        height: "100vh",
        overflow: "hidden",
        position: "relative",
        margin: "0 auto",
        background: "#FEF9FE",
      }}
    >
      {/* هدر ثابت */}
      <div style={{
          position: "fixed",
          top: 0,
          left: "50%",
          transform: "translateX(-50%)",
          width: "412px",
          height: `${headerHeight}px`,
          zIndex: 10,
          background: "#FEF9FE",
      }}>
        <HeaderDash />
        <WelcomeBox />
      </div>

      {/* بخش اسکرول شونده */}
      <div style={{
          position: "absolute",
          top: `${headerHeight}px`,
          bottom: `${bottomMenuHeight}px`,
          left: 0,
          right: 0,
          overflowY: "auto",
          background: "transparent",
      }}>
        {/* اسلایدر */}
      <SliderBox 
        onClick={gotoVideo}  
        style={{ margin: "0 auto 20px auto" }} 
      />


        {/* SearchBox */}
        <SearchBox style={{ width: "348px", margin: "0 auto 20px auto" }} />

        {/* کارت‌ها */}
        <div style={{ position: "relative", minHeight: "480px" }}>
          <Card
            title="ویدیو آموزشی"
            style={{ position: "absolute", top: "60px", left: "32px", cursor: "pointer" }}
            onClick={gotoCourses} // رفتن به StudentCourses
          />
          <Card
            title="جزوه"
            style={{ position: "absolute", top: "60px", left: "250px", cursor: "pointer" }}
            onClick={gotoComingSoon}
          />
          <Card
            title="بازی"
            style={{ position: "absolute", top: "240px", left: "32px", cursor: "pointer" }}
            onClick={gotoComingSoon}
          />
          <Card
            title="آزمون"
            style={{ position: "absolute", top: "240px", left: "250px", cursor: "pointer" }}
            onClick={gotoComingSoon}
          />

          {/* عکس‌ها روی کارت‌ها */}
          <img src={VideoSymbol} alt="Video" style={{ position: "absolute", top: "15px", left: "34px", width: "130px", height: "112px" }} />
          <img src={NoteSymbol} alt="Note" style={{ position: "absolute", top: "30px", left: "264px", width: "105px", height: "88px" }} />
          <img src={GameSymbol} alt="Game" style={{ position: "absolute", top: "210px", left: "39px", width: "112px", height: "92px" }} />
          <img src={ExamSymbol} alt="Exam" style={{ position: "absolute", top: "210px", left: "267px", width: "105px", height: "84px" }} />
        </div>

        {/* فاصله قبل از فرم */}
        <div style={{ height: "20px" }} />

        {/* فرم درخواست مشاوره */}
        <div
          style={{
            margin: "0 auto 20px auto",
            padding: "20px",
            background: "#E5A6E6",
            boxSizing: "border-box",
          }}
        >
          {/* لوگو */}
          <img
            src={logo}
            alt="logo"
            style={{
              position: "absolute",
              top: "628px",
              left: "-10px",
              zIndex: 5,
             }}
          />

          <h3 style={{ marginBottom: "10px", textAlign: "right" }}>درخواست مشاوره</h3>
          <p style={{ textAlign: "right" }}>فرم زیر را پر کنید تا کارشناسان ما با شما تماس بگیرند</p>

          <div
            style={{
              display: "flex",
              gap: "10px",
              alignItems: "center",
              marginTop: "10px",
            }}
          >             
            <button
              type="submit"
              className="font-[BYekan]"
              style={{
                width: "57px",
                height: "19.62px",
                background: "#00C0D9A3",
                color: "#000000ff",
                borderRadius: "8px",
                border: "none",
                fontSize: "6px",
                cursor: "pointer",
              }}
            >
              مشاوره می خواهم
            </button>            
            <input
              type="text"
              className="font-[BYekan]"
              placeholder="شماره تلفن"
              style={{
                width: "129px",
                height: "19.62px",
                borderRadius: "8px",
                padding: "2px 6px",
                boxSizing: "border-box",
                fontSize: "8px",
                border: "none",           
                outline: "none",           
                background: "#FEF9FE", 
              }}
            />          
            <input
              type="text"
              className="font-[BYekan]"
              placeholder="نام و نام خانوادگی"
              style={{
                width: "130px",
                height: "19.62px",
                borderRadius: "8px",
                padding: "2px 6px",
                boxSizing: "border-box",
                fontSize: "8px",
                border: "none",           
                outline: "none",           
                background: "#FEF9FE", 
              }}
            />
          </div>
        </div>

        {/* فوتر توضیحی */}
        <div
         style={{
          height: "380px",
          margin: "0 auto 20px auto",
          padding: "20px",
          background: "#00C0D9A3",
          textAlign: "right",
          fontSize: "14px",
          color: "#000000",
          boxSizing: "border-box",
          opacity: 1,
        }}
        >
        <h2>ریاضی نوین</h2>
        <p>این روز ها اینترنت باعث شده که خیلی از کارها راحت تر از همیشه پیش بره.
          دسترسی به استادان خبره و کلاس ها و دوره های با کیفیت یکی از این کارهاست.
          از نظر هزینه مقرون به صرفه و درکنار این ها از جهت آسایش بیشتر
          دانش آموز ها کلاس های آنلاین ریاضی نوین یه انتخاب مناسب و جذابه</p>
        <h4>تماس با ما</h4>
        <p>شیراز ، بلوار مدرس ،موسسه ریاضی نوین</p>
        <p>تلفن تماس :07123456</p>
        <span> m.mohammadi@gmail.com :ایمیل</span>
        <p> در صفحات اجتماعی همراه ما باشید</p>

        {/* اعتماد لوگو */}
        <img
          src={etemad}
          alt="etemad"
          style={{
            position: "absolute",
            top: "1065px",
            left: "39px",
            zIndex: 5,
           }}
        />

        {/* آیکونهای تماس باما */}
        <img
          src={icons}
          alt="icons"
          style={{
            position: "absolute",
            top: "1220px",
            left: "140px",
            zIndex: 5,
           }}
        />

        </div>
      </div>

      {/* منوی پایین ثابت */}
      <div style={{
          position: "fixed",
          bottom: 0,
          left: "50%",
          transform: "translateX(-50%)",
          width: "412px",
          height: `${bottomMenuHeight}px`,
          zIndex: 10,
          background: "#FEF9FE",
      }}>
        <BottomMenu gotoDashboard={gotoDashboard} />
      </div>
    </div>
  );
}
