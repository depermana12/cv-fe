import { createFileRoute } from "@tanstack/react-router";
import LandingLayout from "../layouts/LandingLayout";
import HomePage from "../pages/HomePage";

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
