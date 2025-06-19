import { Suspense } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { LoadingOverlay, Stack } from "@mantine/core";
import { DashboardOverviewPage } from "../../../features/dashboard/pages/DashboardOverviewPage";

const DashboardOverview = () => {
  return (
    <Suspense
      fallback={
        <Stack h="100vh" justify="center" align="center">
          <LoadingOverlay visible />
        </Stack>
      }
    >
      <DashboardOverviewPage />
    </Suspense>
  );
};

export const Route = createFileRoute("/dashboard/overview/")({
  component: DashboardOverview,
});
