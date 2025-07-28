import { CvBuilderPage } from "@/features/dashboard/cv/pages/CvBuilderPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/dashboard/cv/library/$cvId")({
  component: CvBuilderPage,
  staticData: {
    breadcrumb: "builder",
  },
});
