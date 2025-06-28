import { createFileRoute } from "@tanstack/react-router";
import { SignUpPage } from "../../features/auth/pages/SignUpPage";
import { authGuard } from "../../features/auth/guards/authRouteGuard";

export const Route = createFileRoute("/auth/signup")({
  beforeLoad: () => {
    // Redirect to dashboard if already authenticated
    authGuard();
  },
  component: SignUpPage,
});
