import { createFileRoute } from "@tanstack/react-router";
import { ProfilePage } from "@features/dashboard/pages/ProfilePage";

export const Route = createFileRoute("/dashboard/profile")({
  component: ProfilePage,
  staticData: {
    breadcrumb: "profile",
  },
});
