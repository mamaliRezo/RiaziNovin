import { Outlet } from "react-router-dom";
import AppShell from "../components/layout/AppShell";

export default function StudentLayout() {
  return (
    <AppShell>
      <Outlet />
    </AppShell>
  );
}
