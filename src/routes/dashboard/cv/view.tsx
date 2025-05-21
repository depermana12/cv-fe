import { createFileRoute } from "@tanstack/react-router";
import { Profile } from "../../../features/cv/modules/profile/components/Profile";

export const Route = createFileRoute("/dashboard/cv/view")({
  component: Profile,
});
