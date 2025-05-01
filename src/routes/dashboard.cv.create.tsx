import { createFileRoute } from "@tanstack/react-router";
import { CVBuilderPage } from "../features/dashboard/pages/CVBuilderPage";

export const Route = createFileRoute("/dashboard/cv/create")({
  component: CVBuilderPage,
});
