import { createFileRoute } from "@tanstack/react-router";
import { CVBuilderPage } from "@features/dashboard/cv/pages/CVBuilderPage";

export const Route = createFileRoute("/dashboard/cv/create")({
  component: CVBuilderPage,
  staticData: {
    breadcrumb: "create",
  },
});
