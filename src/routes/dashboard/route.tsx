import { createFileRoute, redirect } from "@tanstack/react-router";
import { DashboardPage } from "../../features/dashboard/pages/DashboardPage";
import { PersonalPage } from "../../features/cv/pages/PersonalPage";

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
  component: PersonalPage,
});
