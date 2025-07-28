import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/dashboard/cv/library")({
  component: () => <Outlet />,
  staticData: {
    breadcrumb: "library",
  },
});
