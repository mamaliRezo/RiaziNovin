import React, { useEffect, useState } from "react";
import { getTeacherDashboard } from "../../services/api";

export default function TeacherDashboard() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState({ xp: 0, tasksCount: 0, coursesCount: 0 });

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      setLoading(true);
      try {
        const res = await getTeacherDashboard();
        if (!mounted) return;
        setData(res.data || {});
      } catch (e) {
        if (!mounted) return;
        setError(e.message || "Failed to load");
      } finally {
        if (!mounted) return;
        setLoading(false);
      }
    };
    load();
    return () => (mounted = false);
  }, []);

  if (loading)
    return <div style={{ padding: 20 }}>Loading teacher dashboard...</div>;
  if (error) return <div style={{ padding: 20, color: "red" }}>{error}</div>;

  return (
    <div style={{ padding: 20 }}>
      <h2 className="text-xl font-bold">Teacher Dashboard</h2>
      <div style={{ display: "flex", gap: 16, marginTop: 12 }}>
        <div
          style={{
            padding: 12,
            background: "#fff",
            borderRadius: 8,
            boxShadow: "0 1px 4px rgba(0,0,0,0.1)",
          }}
        >
          <div className="text-sm text-gray-500">XP</div>
          <div className="text-lg font-bold">{data.xp}</div>
        </div>
        <div
          style={{
            padding: 12,
            background: "#fff",
            borderRadius: 8,
            boxShadow: "0 1px 4px rgba(0,0,0,0.1)",
          }}
        >
          <div className="text-sm text-gray-500">Tasks</div>
          <div className="text-lg font-bold">{data.tasksCount}</div>
        </div>
        <div
          style={{
            padding: 12,
            background: "#fff",
            borderRadius: 8,
            boxShadow: "0 1px 4px rgba(0,0,0,0.1)",
          }}
        >
          <div className="text-sm text-gray-500">Courses</div>
          <div className="text-lg font-bold">{data.coursesCount}</div>
        </div>
      </div>
    </div>
  );
}
