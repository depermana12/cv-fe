import { createFileRoute, redirect } from "@tanstack/react-router";
import { DashboardLayout } from "../../layouts/DashboardLayout";

export const Route = createFileRoute("/dashboard")({
  beforeLoad: async ({ context, location }) => {
    if (!context.auth.isAuthenticated) {
      throw redirect({
        to: "/auth/signin",
        search: {
          redirect: location.href,
        },
        replace: true,
      });
    }
  },
  component: DashboardLayout,
});
