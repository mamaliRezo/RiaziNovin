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

function App() {
  const [page, setPage] = useState("dashboard"); // صفحه فعلی
  const [authPhoneEmail, setAuthPhoneEmail] = useState(null);
  const [authRole, setAuthRole] = useState("student");

  return (
    <>
      {/* -------------------- LOGIN PAGE -------------------- */}
      {page === "login" && (
        <Login
          onNext={({ phone_email, role }) => {
            setAuthPhoneEmail(phone_email);
            setAuthRole(role);
            setPage("otp");
          }}
          onPassword={({ phone_email, role }) => {
            setAuthPhoneEmail(phone_email);
            setAuthRole(role);
            setPage("password");
          }}
        />
      )}

      {/* -------------------- OTP PAGE -------------------- */}
      {page === "otp" && (
        <OTP
          phone_email={authPhoneEmail}
          role={authRole}
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
          onSignupComplete={() => setPage("otp")}
        />
      )}

      {/* -------------------- PASSWORD LOGIN PAGE -------------------- */}
      {page === "password" && (
        <PasswordIN
          phone_email={authPhoneEmail}
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
    </>
  );
}

export default App;
