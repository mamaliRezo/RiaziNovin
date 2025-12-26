import HeaderDash from "../../components/section/HeaderDash";
import SearchBox from "../../components/common/SearchBox";
import BottomMenu from "../../components/common/BottomMenu";
import CourseCard from "../../components/common/CourseCard";
import BlogCard1 from "../../assets/BlogCard1.svg";
import BlogCard2 from "../../assets/BlogCard2.svg";
import BlogCard3 from "../../assets/BlogCard3.svg";
import ConsultationForm from "../../components/common/ConsultationForm.jsx";
import ContactFooter from "../../components/section/ContactFooter.jsx";

export default function StudentCourses({   
  gotoDashboard,
  gotoComingSoon,
  gotoProfile, }) {
  const headerHeight = 100;
  return (
    <div
      className="font-[BYekan]"
      style={{
        width: "412px",
        overflow: "hidden",
        position: "relative",
        margin: "0 auto",
        background: "#FEF9FE",
      }}
    >
      {/* هدر sticky */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: "50%",
          transform: "translateX(-50%)",
          width: "412px",
          height: `${headerHeight}px`,
          zIndex: 10,
          background: "#FEF9FE",
        }}
      >
        <HeaderDash />
      </div>

      {/* بخش اسکرول کارت‌ها */}
      <div
        style={{
          flex: 1,
          overflowY: "auto",
          paddingTop: "60px",
          paddingBottom: "90px",
        }}
      >
        {/* SearchBox */}
        <SearchBox style={{ width: "348px", margin: "0 auto 20px auto" }} />

        {/* کارت‌ها */}
        <CourseCard
          img={BlogCard1}
          title="ریاضی ششم دبستان"
          desc="آموزش ریاضی ششم دبستان با حل نمونه سوال اضافه بر کتاب"
          onClick={() => gotoVideo()}
        />

        <CourseCard
          img={BlogCard3}
          title="ریاضی پنجم دبستان"
          desc="آموزش ریاضی پنجم دبستان با حل نمونه سوال اضافه بر کتاب"
          onClick={() => gotoVideo()}
        />

        <CourseCard
          img={BlogCard2}
          title="ریاضی سوم دبستان"
          desc="دوره آموزشی برای یادگیری مفاهیم ریاضی پایه سوم به همراه جزوه درسی"
          onClick={() => gotoVideo()}
        />
      </div>
      
      <div className="relative top-[-20px]">          
        <ConsultationForm/>
        <ContactFooter/>
      </div>

      {/* منوی پایین ثابت */}
      <div
        style={{
          position: "fixed",
          bottom: 0,
          left: "50%",
          transform: "translateX(-50%)",
          width: "412px",
          background: "#FEF9FE",
          zIndex: 20,
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
