import { createFileRoute } from "@tanstack/react-router";
import { Profile } from "../../../features/cv/components/Profile";

export const Route = createFileRoute("/dashboard/cv/view")({
  component: Profile,
});
