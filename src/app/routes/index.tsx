import { createFileRoute } from "@tanstack/react-router";
import LandingLayout from "@layouts/HomepageLayout";
import { HomePage } from "@features/landing/pages/";

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
