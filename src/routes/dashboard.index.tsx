import { createFileRoute } from "@tanstack/react-router";
import { DashboardPageIndex } from "../features/dashboard/pages/DashboardPageIndex";

export const Route = createFileRoute("/dashboard/")({
  component: DashboardPageIndex,
});
