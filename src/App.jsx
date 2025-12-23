import { useState } from "react";
import "./App.css";

// صفحات
import Login from "./Pages/Login.jsx";
import OTP from "./Pages/OTP.jsx";
import SignUp from "./Pages/SignUp.jsx";
import PasswordIN from "./Pages/PasswordIN.jsx";
import StudentDashboard from "./Pages/StudentDash.jsx";
import StudentCourses from "./Pages/StudentCourses.jsx";
import VideoPage from "./Pages/VideoPage.jsx";
import ComingSoon from "./Pages/ComingSoon.jsx";
import Profile from "./Pages/Profile.jsx"

function App() {
  const [page, setPage] = useState("dashboard"); // صفحه فعلی
  const [authPhoneEmail, setAuthPhoneEmail] = useState(null);
  const [authRole, setAuthRole] = useState("student");
  const [fromPage, setFromPage] = useState(null);

  return (
    <>
      {/* -------------------- LOGIN PAGE -------------------- */}
      {page === "login" && (
        <Login
          onOTP={({ phone_email, role }) => {
            setAuthPhoneEmail(phone_email);
            setAuthRole(role);
            setFromPage("login");
            setPage("otp");
            
          }}
          onSignup={({phone_email, role})=> {
            setAuthPhoneEmail(phone_email);
            setAuthRole(role);
            setFromPage("login")
            setPage("signup");
          }}
          onPassword={({ phone_email, role }) => {
            setAuthPhoneEmail(phone_email);
            setAuthRole(role);
            setFromPage("login")
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
          onSignupComplete={()=>{
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
        />
      )}

      {/* -------------------- COURSES PAGE -------------------- */}
      {page === "courses" && (
        <StudentCourses
          gotoDashboard={() => setPage("dashboard")}
          gotoVideo={() => setPage("video")}
        />
      )}

      {/* -------------------- VIDEO PAGE -------------------- */}
      {page === "video" && (
        <VideoPage
          gotoDashboard={() => setPage("dashboard")} // اضافه شد
        />
      )}

      {/* -------------------- COMING SOON PAGE -------------------- */}
      {page === "comingsoon" && (
        <ComingSoon
        gotoDashboard={() => setPage("dashboard")}
        goBack={() => setPage("dashboard")}
        />
      )}

      {page=== "profile" && (
        <Profile

        />
      )}
    </>
  );
}

export default App;
