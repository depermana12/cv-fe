import { createFileRoute } from "@tanstack/react-router";
import { JobsTrackerPage } from "@features/dashboard/tracker/pages/JobsTrackerPage";

export const Route = createFileRoute("/dashboard/tracker")({
  component: RouteComponent,
  staticData: {
    breadcrumb: "tracker",
  },
});

function RouteComponent() {
  return <JobsTrackerPage />;
}
