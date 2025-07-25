import { createFileRoute } from "@tanstack/react-router";
import { DashboardOverviewPage } from "@features/dashboard/overview/pages/DashboardOverviewPage";

const DashboardOverview = () => {
  return <DashboardOverviewPage />;
};

export const Route = createFileRoute("/dashboard/overview/")({
  component: DashboardOverview,
  staticData: {
    breadcrumb: "overview",
  },
});
