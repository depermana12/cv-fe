import { createFileRoute } from "@tanstack/react-router";
import { DashboardLayout } from "../../layouts/DashboardLayout";
import { authProtectedGuard } from "../../features/auth/guards/authProtectedGuard";

export const Route = createFileRoute("/dashboard")({
  beforeLoad: () => authProtectedGuard(),
  component: DashboardLayout,
});
