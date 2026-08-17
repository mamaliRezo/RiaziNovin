import { useAuth } from "../contexts/AuthContext";

import ActiveHome from "../assets/ActiveHome.svg";
import ActiveProfile from "../assets/ActiveProfile.png";
import ActiveCourse from "../assets/myCourses.svg";
import ActiveShop from "../assets/ActiveShop.svg";

import DeActiveHome from "../assets/DeActiveHome.svg";
import DeActiveProfileCheck from "../assets/DeActiveProfileCheck.svg";
import DeActiveShop from "../assets/DeActiveShop.svg";
import DeActiveCourses from "../assets/DeActiveCourses.svg";

export function useNavItems() {
  const auth = useAuth();
  const role = auth?.role;

  const homePath = role === "teacher" ? "/teacher" : "/student";
  const coursesPath = role === "teacher" ? "/teacher" : "/student/courses";
  const profilePath = role === "teacher" ? "/teacher/profile" : "/student/profile";
  const shopPath = role === "teacher" ? "/teacher" : "/student/packages";

  return [
    { text: "خانه", icon: DeActiveHome, activeIcon: ActiveHome, size: 24, path: homePath },
    { text: "دوره های من", icon: DeActiveCourses, activeIcon: ActiveCourse, size: 24, path: coursesPath },
    { text: "فروشگاه", icon: DeActiveShop, activeIcon: ActiveShop, size: 20, path: shopPath },
    { text: "پروفایل", icon: DeActiveProfileCheck, activeIcon: ActiveProfile, size: 24, path: profilePath },
  ];
}
