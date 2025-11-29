import HeaderDash from "../components/HeaderDash.jsx";
import WelcomeBox from "../components/WelcomeBox.jsx";
import SearchBox from "../components/SearchBox.jsx";
import SliderBox from "../components/SliderBox.jsx";
import Card from "../components/Card.jsx";
import BottomMenu from "../components/BottomMenu.jsx";

export default function StudentDashboard() {
  return (
    <div
      className="relative mx-auto"
      style={{
        width: "412px",
        minHeight: "917px",
        background: "#FEF9FE",
      }}
    >
      <HeaderDash />
      <WelcomeBox />
      <SliderBox />
      <SearchBox />

      {/* Cards */}
      <div
        className="grid grid-cols-2 gap-4 absolute"
        style={{
          top: "360px",
          left: "30px",
          width: "348px",
        }}
      >
        <Card img="/video.png" title="ویدیو آموزشی" />
        <Card img="/book.png" title="جزوه" />
        <Card img="/game.png" title="بازی" />
        <Card img="/exam.png" title="آزمون" />
      </div>

      {/* <BottomMenu /> */}
    </div>
  );
}
