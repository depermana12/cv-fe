import { createFileRoute } from "@tanstack/react-router";
import { DashboardPageIndex } from "../../features/dashboard/pages/DashboardPageIndex";
import { DashboardLayout } from "../../layouts/DashboardLayout";

export const Route = createFileRoute("/(dashboard)/dashboard/")({
  component: DashboardRoot,
});

function DashboardRoot() {
  return (
    <DashboardLayout>
      <DashboardPageIndex />
    </DashboardLayout>
  );
}
