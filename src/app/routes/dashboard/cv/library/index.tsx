import { createFileRoute } from "@tanstack/react-router";
import { CvLibraryPage } from "@features/dashboard/cv/pages/CvLibraryPage";

export const Route = createFileRoute("/dashboard/cv/library/")({
  component: CvLibraryPage,
});
