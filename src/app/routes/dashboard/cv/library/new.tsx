import { createFileRoute } from "@tanstack/react-router";
import { CvCreatePage } from "@features/dashboard/cv/pages/CvCreatePage";

export const Route = createFileRoute("/dashboard/cv/library/new")({
  component: CvCreatePage,
  staticData: {
    breadcrumb: "new",
  },
});
