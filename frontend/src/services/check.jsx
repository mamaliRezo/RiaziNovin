import { useEffect, useState } from "react";
import api from "./api";

export default function CoursesList() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAllCourses() {
      try {
        const res = await api.get("/all-courses/"); // مسیر درست
        console.log("API response:", res.data); // 🔍 اینو اضافه کن
        setCourses(res.data);
      } catch (err) {
        console.error("API error:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchAllCourses();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h1>All Courses</h1>
      <ul>
        {(courses || []).map((course) => (
          <li key={course.id || course.pk}>{course.title || course.name}</li>
        ))}
      </ul>
    </div>
  );
}
