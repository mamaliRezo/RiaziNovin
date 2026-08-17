import { Outlet } from "react-router-dom";
import AppShell from "../components/layout/AppShell";

export default function TeacherLayout() {
  return (
    <AppShell>
      <Outlet />
    </AppShell>
  );
}
