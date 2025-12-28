import { useState } from "react";
import "./App.css";

// صفحات
import Login from "./Pages/auth/Login.jsx";
import OTP from "./Pages/auth/OTP.jsx";
import SignUp from "./Pages/auth/SignUp.jsx";
import PasswordIN from "./Pages/auth/passwordIN.jsx";
import StudentDashboard from "./Pages/dashboard/StudentDash.jsx";
import StudentCourses from "./Pages/dashboard/StudentCourses.jsx";
import VideoPage from "./Pages/public/VideoPage.jsx";
import ComingSoon from "./Pages/public/ComingSoon.jsx";
import Profile from "./Pages/dashboard/Profile.jsx";
import StudentPack from "./Pages/dashboard/StudentPack.jsx";
import CreateCourse from "./Pages/teacher/createCourse.jsx";
import api from "./services/api";
import CoursesList from "./services/check.jsx";

function App() {
  const [page, setPage] = useState(""); // صفحه فعلی
  const [authPhoneEmail, setAuthPhoneEmail] = useState(null);
  const [authRole, setAuthRole] = useState("student");
  const [fromPage, setFromPage] = useState(null);

  return (
    <>
    <CoursesList />
      {/* -------------------- LOGIN PAGE -------------------- */}
      {page === "login" && (
        <Login
          onOTP={({ phone_email, role }) => {
            setAuthPhoneEmail(phone_email);
            setAuthRole(role);
            setFromPage("login");
            setPage("otp");
          }}
          onSignup={({ phone_email, role }) => {
            setAuthPhoneEmail(phone_email);
            setAuthRole(role);
            setFromPage("login");
            setPage("signup");
          }}
          onPassword={({ phone_email, role }) => {
            setAuthPhoneEmail(phone_email);
            setAuthRole(role);
            setFromPage("login");
            setPage("password");
          }}
        />
      )}

      {/* -------------------- OTP PAGE -------------------- */}
      {page === "otp" && (
        <OTP
          phone_email={authPhoneEmail}
          role={authRole}
          fromPage={fromPage}
          onVerified={() => setPage("dashboard")}
          onToSignup={() => setPage("signup")}
          onToPassword={() => setPage("password")}
        />
      )}

      {/* -------------------- SIGN UP PAGE -------------------- */}
      {page === "signup" && (
        <SignUp
          phone_email={authPhoneEmail}
          role={authRole}
          onSignupComplete={() => {
            setFromPage("signup");
            setPage("otp");
          }}
        />
      )}

      {/* -------------------- PASSWORD LOGIN PAGE -------------------- */}
      {page === "password" && (
        <PasswordIN
          phone_email={authPhoneEmail}
          role={authRole}
          goToOTP={() => setPage("otp")}
          onSuccess={() => setPage("dashboard")}
        />
      )}

      {/* -------------------- DASHBOARD -------------------- */}
      {page === "dashboard" && (
        <StudentDashboard
          gotoCourses={() => setPage("courses")}
          gotoComingSoon={() => setPage("comingsoon")}
          gotoVideo={() => setPage("video")}
          gotoDashboard={() => setPage("dashboard")}
          gotoProfile={() => setPage("profile")}
          gotoStudentPack={() => setPage("package")}
        />
      )}

      {/* -------------------- COURSES PAGE -------------------- */}
      {page === "courses" && (
        <StudentCourses
          gotoDashboard={() => setPage("dashboard")}
          gotoComingSoon={() => setPage("comingsoon")}
          gotoProfile={() => setPage("profile")}
        />
      )}
      {/* -------------------- PackageStudend -------------------- */}
      {page === "package" && (
        <StudentPack
          gotoDashboard={() => setPage("dashboard")}
          gotoComingSoon={() => setPage("comingsoon")}
          gotoProfile={() => setPage("profile")}
        />
      )}
      {/* -------------------- createCourse -------------------- */}
      {page === "create" && (
        <CreateCourse
          gotoDashboard={() => setPage("dashboard")}
          gotoComingSoon={() => setPage("comingsoon")}
          gotoProfile={() => setPage("profile")}
        />
      )}

      {/* -------------------- VIDEO PAGE -------------------- */}
      {page === "video" && (
        <VideoPage
          gotoDashboard={() => setPage("dashboard")}
          gotoComingSoon={() => setPage("comingsoon")}
          gotoProfile={() => setPage("profile")}
        />
      )}

      {/* -------------------- COMING SOON PAGE -------------------- */}
      {page === "comingsoon" && (
        <ComingSoon
          gotoDashboard={() => setPage("dashboard")}
          goBack={() => setPage("dashboard")}
        />
      )}

      {page === "profile" && <Profile />}
    </>
  );
}

export default App;
