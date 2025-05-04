import { createFileRoute } from "@tanstack/react-router";
import { DashboardLayout } from "../../features/dashboard/layouts/DashboardLayout";

export const Route = createFileRoute("/(dashboard)/dashboard/cv")({
  component: DashboardLayout,
});
