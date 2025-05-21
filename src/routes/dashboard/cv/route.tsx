import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/dashboard/cv")({
  component: () => <Outlet />,
  staticData: {
    breadcrumb: " CV Builder",
  },
});
