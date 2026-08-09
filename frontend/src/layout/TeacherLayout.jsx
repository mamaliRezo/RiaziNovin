import { useNavigate, Outlet } from "react-router-dom";
import HeaderDash from "../components/section/HeaderDash";
import BottomMenu from "../components/common/BottomMenu";

export default function TeacherLayout() {
  const navigate = useNavigate();
  const headerHeight = 70;
  const bottomMenuHeight = 90;

  const gotoDashboard = () => navigate("/teacher");
  const gotoComingSoon = () => navigate("/comingsoon");
  const gotoProfile = () => navigate("/comingsoon");

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
      {/* Header ثابت */}
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

      {/* محتوای صفحه (قابل اسکرول) */}
      <div
        style={{
          position: "absolute",
          top: headerHeight + "px",
          bottom: bottomMenuHeight + "px",
          overflowY: "auto",
          width: "100%",
        }}
      >
        <Outlet />
      </div>

      {/* منوی پایین ثابت */}
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
