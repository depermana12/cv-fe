import { createFileRoute } from "@tanstack/react-router";
import { SettingsPage } from "@features/dashboard/settings/pages/SettingsPage";

export const Route = createFileRoute("/dashboard/settings")({
  component: SettingsPage,
  staticData: {
    breadcrumb: "settings",
  },
});
