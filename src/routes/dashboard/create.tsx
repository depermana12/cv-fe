import { createFileRoute } from "@tanstack/react-router";
import { PersonalPage } from "../../features/cv/pages/PersonalPage";

export const Route = createFileRoute("/dashboard/create")({
  component: PersonalPage,
});
