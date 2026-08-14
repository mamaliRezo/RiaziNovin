import { useEffect, useState } from "react";

import cover from "../../assets/cover.webp";

import HeaderDash from "../../components/section/HeaderDash";
import SearchBox from "../../components/common/SearchBox";
import BottomMenu from "../../components/common/BottomMenu";
import HorizontalSection from "../../components/common/HorizontalSection";
import PackageHeader from "../../components/packageContent/packageHeader.jsx";

import ConsultationForm from "../../components/common/ConsultationForm.jsx";
import ContactFooter from "../../components/section/ContactFooter.jsx";

export default function StudentPack({   
  gotoDashboard,
  gotoComingSoon,
  gotoProfile, })
{
  const [videos, setVideos] = useState([]);
  const [samples, setSamples] = useState([]);
  const [games, setGames] = useState([]);
  const headerHeight = 70;
  const bottomMenuHeight = 90;

  const packageData = {
  title: "پکیج جامع ریاضی ششم دبستان",
  description:
    "پکیج طلایی ریاضی نوین ویژه‌ی دانش آموزان پایه ششم ابتدایی با هدف تقویت پایه‌ی درسی طراحی شده تا همه‌ی نیازهای آموزشی دانش‌آموز به‌صورت یک‌جا و منظم پوشش داده شود؛ از آموزش مفهومی گرفته تا تمرین، آمادگی برای امتحانات و همچین شرکت در آزمون ها و بازی های مرتبط و متنوع.",
  teacher: "مریم محمدی",
  rating: 4.61,
  ratingCount: 721,
  cover: cover,
 };


  // اینجا بعداً API رو اضافه می‌کنی
  useEffect(() => {
    setVideos([
      { title: "ویدیو آموزش مبحث توابع", img: "/img/v1.png" },
      { title: "ویدیو آموزش مبحث کسرها", img: "/img/v2.png" },
      { title: "ویدیو آموزش اعداد اعشاری", img: "/img/v3.png" },
    ]);

    setSamples([
      { title: "حل نمونه سوالات مبحث توابع", img: "/img/s1.png" },
      { title: "حل نمونه سوالات مبحث کسرها", img: "/img/s2.png" },
      { title: "حل نمونه سوالات مبحث اعداد اعشاری", img: "/img/s3.png" },
    ]);

    setGames([
      { title: "بازی ریاضی", img: "/img/g1.png" },
      { title: "بازی جمع و تفریق", img: "/img/g2.png" },
      { title: "بازی ضرب و تقسیم", img:"/img/g3.png"},
    ]);
  }, []);

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

      {/* SearchBox */}
        <SearchBox style={{ width: "348px", margin: "0 auto 20px auto" }} />
      {/* محتویات پکیج */}
      <PackageHeader data={packageData} />
        <div style={{ padding: "20px", direction: "rtl" }}>

        {/* سکشن ویدیوها */}
        <div style={{ padding: "20px", direction: "rtl" }}>
          <HorizontalSection type="video" items={videos} />
          <HorizontalSection type="sample" items={samples} />
          <HorizontalSection type="game" items={games} />
        </div>
      </div>    
      
      
      <div className="relative top-[50px]">          
        <ConsultationForm/>
        <ContactFooter/>
      </div>
      </div>

      {/* fixed Bottom menu */}
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
      <BottomMenu
        gotoDashboard={gotoDashboard}
        gotoComingSoon={gotoComingSoon}
        gotoProfile={gotoProfile}
      />

      </div>
    </div>
  );
}
