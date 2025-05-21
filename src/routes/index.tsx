import { createFileRoute } from "@tanstack/react-router";
import LandingLayout from "../layouts/HomepageLayout";
import HomePage from "../pages/homepage";

export const Route = createFileRoute("/")({
  component: RouteHome,
});

function RouteHome() {
  return (
    <LandingLayout>
      <HomePage />
    </LandingLayout>
  );
}
