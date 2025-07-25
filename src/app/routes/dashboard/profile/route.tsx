import { createFileRoute } from "@tanstack/react-router";
import { ProfilePage } from "@features/dashboard/profile/pages/ProfilePage";

export const Route = createFileRoute("/dashboard/profile")({
  component: ProfilePage,
  staticData: {
    breadcrumb: "profile",
  },
});
